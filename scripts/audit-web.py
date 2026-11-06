#!/usr/bin/env python3
"""Scan exported textual artifacts for known credential and private-endpoint patterns.
This is a targeted check, not proof that every possible secret is absent.
"""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APPS = ['termo', 'Agenda', 'ZooKids', 'MedLive', 'medLiveProjeto/medLive']
PATTERNS = {
    'google-api-key': r'AIza[0-9A-Za-z_-]{35}',
    'aws-access-key': r'AKIA[0-9A-Z]{16}',
    'private-key': r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
    'github-token': r'gh[pousr]_[A-Za-z0-9]{30,}',
    'private-http-endpoint': r'https?://(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(?::\d+)?',
}
results = []
for app in APPS:
    directory = ROOT / app / 'dist'
    result = {'app': app, 'index': (directory / 'index.html').is_file(), 'findings': [], 'artifacts': []}
    for file in sorted(directory.rglob('*')):
        if not file.is_file(): continue
        raw = file.read_bytes()
        result['artifacts'].append({'path': str(file.relative_to(directory)), 'bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest()})
        if file.suffix in ['.html', '.js', '.json', '.css', '.map']:
            text = raw.decode('utf-8', errors='replace')
            for name, pattern in PATTERNS.items():
                if re.search(pattern, text): result['findings'].append({'file': str(file.relative_to(directory)), 'type': name})
    results.append(result)
output = ROOT / 'docs/evidencias/bundle-audit.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps({'scope': list(PATTERNS), 'results': results}, indent=2) + '\n')
for result in results: print(result['app'], 'index:', result['index'], 'findings:', len(result['findings']), 'files:', len(result['artifacts']))
raise SystemExit(1 if any(not result['index'] or result['findings'] for result in results) else 0)
