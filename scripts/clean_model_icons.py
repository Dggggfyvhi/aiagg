#!/usr/bin/env python3
"""Clean model-icons filenames and update code references.

Example mapping:
  cos.lingkeai.vip_claude.svg_d7a9abf750.svg -> claude.svg
  cos.lingkeai.vip_openai_bai.svg_8ace918386.svg -> openai_bai.svg
"""
import os, re, shutil, sys

def normalize_name(filename: str) -> str:
    # Pattern: cos.lingkeai.vip_<base>.svg_<hash>.svg
    #          -> <base>.svg
    m = re.match(r'^cos\.lingkeai\.vip_([^_.][^_]*?)\.svg_([0-9a-f]+)\.svg$', filename, re.IGNORECASE)
    if m:
        return m.group(1) + '.svg'
    # Fallback: just strip the prefix if present
    return re.sub(r'^cos\.lingkeai\.vip_', '', filename, flags=re.IGNORECASE)

def main(root: str):
    icon_dir = os.path.join(root, 'model-icons')
    if not os.path.isdir(icon_dir):
        print('model-icons not found'); return 1
    renames = []
    for old in sorted(os.listdir(icon_dir)):
        if os.path.isdir(os.path.join(icon_dir, old)):
            continue
        new = normalize_name(old)
        if new == old:
            continue
        target = os.path.join(icon_dir, new)
        if os.path.exists(target) and os.path.abspath(old) != os.path.abspath(new):
            print(f'SKIP (target exists) {old}')
            continue
        renames.append((old, new))
        print(f'RENAME {old} -> {new}')
        shutil.move(os.path.join(icon_dir, old), target)
    if not renames:
        print('No renames needed'); return 0
    updated = 0
    for dirpath, dirnames, filenames in os.walk(root):
        if '.git' in dirpath: continue
        for fn in filenames:
            if not fn.lower().endswith(('.js', '.css', '.html')): continue
            path = os.path.join(dirpath, fn)
            try:
                text = open(path, encoding='utf-8').read()
            except Exception:
                continue
            new_text = text
            for old, new in renames:
                new_text = new_text.replace(f'model-icons/{old}', f'model-icons/{new}')
            if new_text != text:
                open(path, 'w', encoding='utf-8').write(new_text)
                updated += 1
                print(f'PATCH {path}')
    print(f'Done: {len(renames)} renames, {updated} files updated')
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else '/root/workspace/deploy/repo'))
