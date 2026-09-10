use url::Url;

#[test]
fn caret_in_path_is_percent_encoded() {
    let url = Url::parse("http://localhost/a^b").unwrap();
    assert_eq!(url.path(), "/a%5Eb");
    let url = Url::parse("https://example.com/x/y^z/w?q=^#f^").unwrap();
    assert_eq!(url.path(), "/x/y%5Ez/w");
    assert_eq!(url.query(), Some("q=^"));
    assert_eq!(url.fragment(), Some("f^"));
    let url = Url::parse("foo://host/^").unwrap();
    assert_eq!(url.path(), "/%5E");
}

#[test]
fn other_path_set_members_and_userinfo_are_unchanged() {
    for (raw, encoded) in [
        (" ", "%20"),
        ("\"", "%22"),
        ("<", "%3C"),
        (">", "%3E"),
        ("`", "%60"),
        ("{", "%7B"),
        ("}", "%7D"),
    ] {
        let url = Url::parse(&format!("http://localhost/a{raw}b")).unwrap();
        assert_eq!(url.path(), format!("/a{encoded}b"), "{raw:?}");
    }
    let url = Url::parse("http://user^name:pa^ss@localhost/").unwrap();
    assert_eq!(url.username(), "user%5Ename");
    assert_eq!(url.password(), Some("pa%5Ess"));
    let mut url = Url::parse("http://localhost/").unwrap();
    url.path_segments_mut().unwrap().push("a^b/c");
    assert_eq!(url.path(), "/a%5Eb%2Fc");
}
