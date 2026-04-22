import re
import sys
from datetime import date
from pathlib import Path

FILES = [
    Path(__file__).parent / "index.html",
]

def update_year(new_year: int) -> None:
    pattern = re.compile(r'(&copy;)\s*\d{4}')
    updated = []
    for path in FILES:
        text = path.read_text(encoding="utf-8")
        new_text, count = pattern.subn(rf'\g<1> {new_year}', text)
        if count:
            path.write_text(new_text, encoding="utf-8")
            updated.append(str(path.name))
    if updated:
        print(f"Updated copyright year to {new_year} in: {', '.join(updated)}")
    else:
        print("No copyright year found to update.")

if __name__ == "__main__":
    year = int(sys.argv[1]) if len(sys.argv) > 1 else date.today().year
    update_year(year)
