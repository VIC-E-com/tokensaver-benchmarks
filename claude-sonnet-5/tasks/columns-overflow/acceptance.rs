use std::io::Read;
use std::process::{Command, Stdio};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use textwrap::wrap_columns;

const CHILD_MARKER: &str = "TOKENSAVER_ACCEPTANCE_CHILD";
const BEGIN: &str = "TOKENSAVER_CALL_BEGIN";

/// Before the fix, `wrap_columns` panics at once with "attempt to multiply with
/// overflow" while sizing the middle gaps for a huge column count. A fixed build
/// never reaches that panic; it proceeds into the per-column loop, which is
/// unbounded for such inputs, so the call is observed from a child process that
/// is stopped shortly after the call begins.
#[test]
fn huge_column_count_does_not_overflow() {
    if std::env::var_os(CHILD_MARKER).is_some() {
        eprintln!("{BEGIN}");
        let lines = wrap_columns("", usize::MAX / 2 + 2, 80, "", "xx", "");
        let bounded = lines.iter().all(|line| line.chars().count() <= 80);
        std::process::exit(if bounded { 3 } else { 4 });
    }
    let mut child = Command::new(std::env::current_exe().unwrap())
        .args([
            "--exact",
            "huge_column_count_does_not_overflow",
            "--nocapture",
            "--test-threads=1",
        ])
        .env(CHILD_MARKER, "1")
        .stdout(Stdio::null())
        .stderr(Stdio::piped())
        .spawn()
        .unwrap();
    let captured = Arc::new(Mutex::new(String::new()));
    let reader = {
        let captured = Arc::clone(&captured);
        let mut stderr = child.stderr.take().unwrap();
        std::thread::spawn(move || {
            let mut buf = [0u8; 4096];
            loop {
                match stderr.read(&mut buf) {
                    Ok(0) | Err(_) => break,
                    Ok(n) => captured
                        .lock()
                        .unwrap()
                        .push_str(&String::from_utf8_lossy(&buf[..n])),
                }
            }
        })
    };
    let started = Instant::now();
    let mut call_began = None;
    let status = loop {
        if let Some(status) = child.try_wait().unwrap() {
            break Some(status);
        }
        if call_began.is_none() && captured.lock().unwrap().contains(BEGIN) {
            call_began = Some(Instant::now());
        }
        let expired = match call_began {
            Some(at) => at.elapsed() > Duration::from_millis(200),
            None => started.elapsed() > Duration::from_secs(20),
        };
        if expired {
            child.kill().unwrap();
            child.wait().unwrap();
            break None;
        }
        std::thread::sleep(Duration::from_millis(2));
    };
    reader.join().unwrap();
    let stderr = captured.lock().unwrap().clone();
    assert!(
        stderr.contains(BEGIN),
        "child never reached wrap_columns: {stderr}"
    );
    assert!(
        !stderr.contains("overflow"),
        "wrap_columns overflowed for a huge column count: {stderr}"
    );
    match status {
        None => {} // Still computing when stopped: no arithmetic panic occurred.
        Some(status) => assert_eq!(status.code(), Some(3), "unexpected child exit: {stderr}"),
    }
}

#[test]
fn ordinary_wrapping_is_unchanged() {
    assert_eq!(wrap_columns("", 1, 10, "| ", "", " |"), vec!["|        |"]);
    assert_eq!(
        wrap_columns("Foo", 3, 30, "| ", " | ", " |"),
        vec!["| Foo    |        |          |"]
    );
    assert_eq!(
        wrap_columns("Foo Bar Baz Quux", 4, 21, "|", "|", "|"),
        vec!["|Foo |Bar |Baz |Quux|"]
    );
    assert_eq!(
        wrap_columns("Foo Bar Baz Quux", 4, 24, "|", "|", "|"),
        vec!["|Foo |Bar |Baz |Quux   |"]
    );
    assert_eq!(
        wrap_columns("Foo Bar Baz Quux", 4, 25, "|", "|", "|"),
        vec!["|Foo  |Bar  |Baz  |Quux |"]
    );
    assert_eq!(
        wrap_columns("xyz", 2, 10, "----> ", " !!! ", " <----"),
        vec!["----> x !!! z <----", "----> y !!!   <----"]
    );
}

#[test]
#[should_panic]
fn zero_columns_still_panics() {
    wrap_columns("text", 0, 10, "", "", "");
}
