use humantime::{parse_duration, DurationError};
use std::time::Duration;
#[test]
fn overflow_is_an_error_not_a_panic() {
    for suffix in ["1000ms", " 999999999ns 1ns", " 500ms 500ms", " 1s", " 1000000000ns"] {
        let text=format!("{}s{suffix}",u64::MAX);
        let result=std::panic::catch_unwind(||parse_duration(&text));
        assert!(matches!(result,Ok(Err(DurationError::NumberOverflow))),"{text}: {result:?}");
    }
}
#[test]
fn valid_carry_and_boundary_values_survive() {
    for seconds in [0,1,99,u64::MAX-1] {
        for suffix in [" 1000ms"," 999999999ns 1ns"," 250ms 750ms"] {
            assert_eq!(parse_duration(&format!("{seconds}s{suffix}")),Ok(Duration::new(seconds+1,0)));
        }
    }
    assert_eq!(parse_duration(&format!("{}s 999999999ns",u64::MAX)),Ok(Duration::new(u64::MAX,999999999)));
}
