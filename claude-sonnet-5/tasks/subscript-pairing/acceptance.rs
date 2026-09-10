use pulldown_cmark::{html, Options, Parser};

fn render(markdown: &str, options: Options) -> String {
    let mut out = String::new();
    html::push_html(&mut out, Parser::new_ext(markdown, options));
    out
}

#[test]
fn double_tilde_runs_stay_literal_when_only_subscript_is_enabled() {
    let sub = Options::ENABLE_SUBSCRIPT;
    assert_eq!(
        render("~~This ~is~~ stricken.~\n", sub),
        "<p>~~This ~is~~ stricken.~</p>\n"
    );
    assert_eq!(
        render("a ~[x](https://x)~\n", sub),
        "<p>a <sub><a href=\"https://x\">x</a></sub></p>\n"
    );
    assert_eq!(
        render("b ~~[x](https://x)~~\n", sub),
        "<p>b ~~<a href=\"https://x\">x</a>~~</p>\n"
    );
    assert_eq!(
        render("d ~~x ~[x](https://x)~ x~~\n", sub),
        "<p>d ~~x <sub><a href=\"https://x\">x</a></sub> x~~</p>\n"
    );
}

#[test]
fn later_inline_content_is_neither_dropped_nor_duplicated() {
    let sub = Options::ENABLE_SUBSCRIPT;
    let out = render("b ~~[x](https://x)~~ tail *em* end\n", sub);
    assert_eq!(out.matches("<a href=\"https://x\">x</a>").count(), 1, "{out}");
    assert!(out.contains("tail <em>em</em> end"), "{out}");
}

#[test]
fn strikethrough_and_mixed_extensions_keep_their_behavior() {
    let strike = Options::ENABLE_STRIKETHROUGH;
    assert_eq!(render("~~gone~~\n", strike), "<p><del>gone</del></p>\n");
    let both = Options::ENABLE_STRIKETHROUGH | Options::ENABLE_SUBSCRIPT;
    assert_eq!(render("~sub~ and ~~del~~\n", both), "<p><sub>sub</sub> and <del>del</del></p>\n");
    assert_eq!(render("^sup^\n", Options::ENABLE_SUPERSCRIPT), "<p><sup>sup</sup></p>\n");
    assert_eq!(render("~plain~\n", Options::empty()), "<p>~plain~</p>\n");
}
