#!/usr/bin/env python3
"""Check release contents and local references without reading any private source."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'docs/wiki'
registry=json.loads((SITE/'pages.json').read_text())
assert len(registry['pages'])==68, 'Public edition should contain 68 curated summaries'
assert not any(x['type']=='chapter' for x in registry['pages'].values()), 'Original chapters must stay local'
for file in ROOT.rglob('*'):
 if not file.is_file() or '.git' in file.parts:continue
 rel=file.relative_to(ROOT).as_posix()
 assert not file.suffix.lower() in ['.epub','.pdf','.log'], f'Excluded source or log: {rel}'
 assert not any(x in file.parts for x in ['corpus','logs','sentence_index','.claude']), f'Excluded directory: {rel}'
 assert 'fts-index' not in file.name, f'Full-text source index must stay local: {rel}'
 if file.suffix in ['.md','.html','.json','.js','.css','.py','.yml']:
  txt=file.read_text()
  assert not re.search('/'+'Users'+'/'+r'[A-Za-z0-9._-]+/',txt), f'Private machine path: {rel}'
for pid,r in registry['pages'].items():
 file=SITE/'pages'/r['path'];assert file.exists(),f'Missing page: {pid}'
 body=file.read_text().split('---',2)[2]
 assert not re.search(r'^\[\d{3}-\d{3}\]',body,re.M),f'Looks like a source chapter: {pid}'
 for src in re.findall(r'(?:src|srcset)="([^"]+)"',body):
  for part in src.split(','):
   path=part.strip().split(' ')[0]
   if path.startswith('images/'):assert (SITE/path).exists(),f'Missing image: {path}'
for img in ['01-home.png','02-character.png','03-timeline.png','04-story-scene.png','05-visual-bible.png']:
 assert (ROOT/'assets/screenshots'/img).is_file(),f'Missing actual screenshot: {img}'
print('Public bundle verified: 68 summaries, no source chapters or private paths; page, image, and screenshot files present.')
