import re
from pathlib import Path
root = Path('PW2/pokemonQuiz')
count = 0
for path in root.rglob('*.php'):
    text = path.read_text(encoding='utf-8')
    def fix_style(m):
        style = m.group(1)
        fixed = re.sub(r'(background-(?:color|image):[^;"\n]+)(\s+--button-color)', r'\1; \2', style)
        fixed = re.sub(r'(background-color:[^;"\n]+)(--button-color)', r'\1; \2', fixed)
        fixed = re.sub(r'(background-image:[^;"\n]+)(--button-color)', r'\1; \2', fixed)
        return f'style="{fixed}"'
    new_text = re.sub(r'style="([^"]*)"', fix_style, text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        count += 1
        print(f'fixed: {path}')
print(f'updated {count} files')
