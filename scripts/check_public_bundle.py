#!/usr/bin/env python3
"""Check release contents and local references without reading any private source."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
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
 assert (ROOT/'docs/assets/screenshots'/img).is_file(),f'Missing actual screenshot: {img}'
class References(HTMLParser):
 def __init__(self):super().__init__();self.urls=[]
 def handle_starttag(self,tag,attrs):
  for key,value in attrs:
   if key in ('href','src') and value:self.urls.append(value)
for page in (ROOT/'docs').rglob('*.html'):
 parser=References();parser.feed(page.read_text())
 for url in parser.urls:
  parsed=urlsplit(url)
  if parsed.scheme or parsed.netloc or not parsed.path:continue
  target=(page.parent/unquote(parsed.path)).resolve()
  assert target.is_relative_to(ROOT/'docs'),f'Link leaves published site: {page.name}: {url}'
  assert target.exists(),f'Missing local link: {page.name}: {url}'
  if target.is_dir():assert (target/'index.html').is_file(),f'Missing entry page: {url}'
for slug in ('fish','tea','becoming'):
 file=ROOT/'docs/works'/slug/'data.json'
 data=json.loads(file.read_text())
 entries=data['entries'];ids={e['id'] for e in entries}
 assert entries and len(ids)==len(entries),f'Empty or duplicate entries: {slug}'
 for entry in entries:
  assert entry['type'] not in ('chapter','meta','overview','list'),f'Source or internal entry: {slug}'
  assert entry['summary'] and len(entry['summary'])<=220,f'Summary size: {slug}/{entry["id"]}'
  assert set(entry['related'])<=ids,f'Broken related link: {slug}/{entry["id"]}'
 assert f'works/{slug}/' in (ROOT/'docs/index.html').read_text(),f'Series link missing: {slug}'
print('Public bundle verified: main case, three summary readers, local links, images, and related entries; no source chapters or private paths.')
