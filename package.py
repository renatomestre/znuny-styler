from pathlib import Path
from shutil import copy2
import json
from zipfile import ZIP_DEFLATED, ZipFile


def main():
    project_root = Path(__file__).resolve().parent
    dist_directory = project_root / "dist"

    dist_directory.mkdir(exist_ok=True)

    for target in ["chrome", "firefox"]:
        package_target(project_root, dist_directory, target)

def package_target(project_root, dist_directory, target):
    archive_path = dist_directory / f"znuny-styler-{target}.zip"
    files_to_package = ["background.js", "README.md"]
    target_directory = dist_directory / target
    target_directory.mkdir(parents=True, exist_ok=True)

    for file_name in files_to_package:
        copy2(project_root / file_name, target_directory / file_name)

    icons_directory = target_directory / "icons"
    icons_directory.mkdir(exist_ok=True)
    if target == "firefox":
        (icons_directory / "icon-128.png").unlink(missing_ok=True)
    for icon in (project_root / "icons").iterdir():
        if icon.is_file() and not (target == "firefox" and icon.name == "icon-128.png"):
            copy2(icon, icons_directory / icon.name)

    manifest = json.loads((project_root / "manifest.json").read_text(encoding="utf-8"))
    if target == "chrome":
        manifest.pop("browser_specific_settings", None)
        manifest["background"].pop("scripts", None)
    elif target == "firefox":
        manifest["background"].pop("service_worker", None)
        manifest["icons"].pop("128", None)
    (target_directory / "manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )

    with ZipFile(archive_path, "w", ZIP_DEFLATED) as archive:
        for file in target_directory.rglob("*"):
            if file.is_file():
                archive.write(file, file.relative_to(target_directory))

    print(f"Created {archive_path}")


if __name__ == "__main__":
    main()