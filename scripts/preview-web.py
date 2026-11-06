#!/usr/bin/env python3
"""Serve only one exported demo locally, with SPA refresh fallback."""
import argparse
import json
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlsplit

APPS = {'termo': 'termo', 'agenda': 'Agenda', 'zookids': 'ZooKids', 'medlive-template': 'MedLive', 'medlive': 'medLiveProjeto/medLive'}
p = argparse.ArgumentParser()
p.add_argument('app', choices=APPS)
p.add_argument('--port', type=int, default=8091)
a = p.parse_args()
configuration = json.loads((Path(__file__).resolve().parents[1] / 'demos.config.json').read_text())
base_path = next(app['basePath'] for app in configuration['apps'] if app['id'] == a.app)
root = Path(__file__).resolve().parents[1] / APPS[a.app] / 'dist'
if not (root / 'index.html').is_file(): p.error('Build ausente: execute npm run build:web na pasta do aplicativo.')
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs): super().__init__(*args, directory=str(root), **kwargs)
    def do_GET(self):
        route = unquote(urlsplit(self.path).path)
        if route == '/':
            self.send_response(302); self.send_header('Location', base_path + '/'); self.end_headers(); return
        if route != base_path and not route.startswith(base_path + '/'):
            self.send_error(404); return
        route = route[len(base_path):] or '/'
        target = (root / route.lstrip('/')).resolve()
        if not target.is_relative_to(root.resolve()): self.send_error(403); return
        self.path = route
        reserved = route.lstrip('/').split('/')[0] in ('assets', '_expo')
        if not target.exists() and not Path(route).suffix and not reserved: self.path = '/index.html'
        super().do_GET()
print(f'Demo local: http://127.0.0.1:{a.port}{base_path}/', flush=True)
ThreadingHTTPServer(('127.0.0.1', a.port), Handler).serve_forever()
