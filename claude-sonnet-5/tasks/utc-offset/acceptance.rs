use humantime::{parse_rfc3339,parse_rfc3339_weak};
#[test]
fn explicit_utc_matches_z_for_existing_dates_and_fractions(){
    for date in ["1970-01-01T00:00:00","2000-02-29T12:34:56","2018-02-13T23:08:32","2024-12-31T23:59:59"] {
        for fraction in ["",".1",".000123",".123456789"] {
            let z=format!("{date}{fraction}Z");let offset=format!("{date}{fraction}+00:00");
            assert_eq!(parse_rfc3339(&offset),parse_rfc3339(&z),"{offset}");
            assert_eq!(parse_rfc3339_weak(&offset.replace('T'," ")),parse_rfc3339(&z));
        }
    }
}
#[test]
fn malformed_timezones_and_strict_spaces_remain_rejected(){
    for suffix in ["+00","+","+00:00abcd","+02:00"] {
        assert!(parse_rfc3339(&format!("2018-02-13T23:08:32{suffix}")).is_err());
    }
    assert!(parse_rfc3339("2018-02-13 23:08:32+00:00").is_err());
    assert!(parse_rfc3339_weak("2018-02-13 23:08:32").is_ok());
}
