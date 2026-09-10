use std::{fs,path::PathBuf,os::unix::fs::symlink};
struct Fixture(PathBuf);
impl Drop for Fixture{fn drop(&mut self){let _=fs::remove_dir_all(&self.0);}}
fn fixture()->Fixture{
    let p=std::env::temp_dir().join(format!("ts-glob-oracle-{}",std::process::id()));
    fs::create_dir(&p).unwrap();fs::create_dir(p.join("real")).unwrap();
    fs::write(p.join("real/item.txt"),"evidence").unwrap();
    symlink("real",p.join("alias")).unwrap();symlink("real/item.txt",p.join("file-link")).unwrap();symlink("missing",p.join("broken")).unwrap();Fixture(p)
}
#[test]
fn wildcard_descends_into_directory_symlinks_and_keeps_file_semantics(){
    let f=fixture();
    let pattern=format!("{}/*/*.txt",f.0.display());
    let mut paths=glob::glob(&pattern).unwrap().collect::<Result<Vec<_>,_>>().unwrap();paths.sort();
    assert_eq!(paths,vec![f.0.join("alias/item.txt"),f.0.join("real/item.txt")]);
    assert_eq!(glob::glob(&format!("{}/file-link/*",f.0.display())).unwrap().filter_map(Result::ok).count(),0);
    assert_eq!(glob::glob(&format!("{}/broken/*",f.0.display())).unwrap().filter_map(Result::ok).count(),0);
}
