#!/usr/bin/env python3
"""Build the public registry from the curated Markdown only. Python standard library."""
from pathlib import Path
from collections import defaultdict
import json, re
SITE=Path(__file__).resolve().parents[1]/'docs/wiki'
pages={};lite={};aliases={};backlinks=defaultdict(list); links={}
for file in sorted((SITE/'pages').rglob('*.md')):
 pieces=file.read_text().split('---',2)
 m=json.loads(pieces[1]);body=pieces[2];pid=m['id']
 r={k:m[k] for k in ['type','label','aliases','tags','description','quality','image'] if k in m}
 r['path']=file.relative_to(SITE/'pages').as_posix()
 r.update(prose_len=len(body),prose_chars=len(re.sub(r'\s','',body)),h2_count=len(re.findall(r'^## ',body,re.M)),pn_count=0,wikilink_count=len(re.findall(r'\[\[',body)),blockquote_count=0,total_refs=0)
 pages[pid]=r;lite[pid]={k:r[k] for k in ['type','label','aliases','path'] if k in r}
 for alias in [pid,m['label']]+m.get('aliases',[]):aliases[alias]=pid
 links[pid]=set(re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]',body))
for pid,targets in links.items():
 for target in targets:
  if target not in pages:raise ValueError(f'Broken wikilink: {pid} -> {target}')
  backlinks[target].append({'id':pid,'label':pages[pid]['label'],'type':pages[pid]['type']})
for name,rs in [('pages.json',pages),('pages.lite.json',lite)]:
 (SITE/name).write_text(json.dumps({'_schema_version':2,'pages':rs,'alias_index':aliases,'page_count':len(rs),'generated':'2026-09-14T00:00:00Z'},ensure_ascii=False,indent=2))
(SITE/'backlinks.json').write_text(json.dumps(dict(backlinks),ensure_ascii=False,indent=2))
print(f'Built {len(pages)} public summaries; all {sum(len(x) for x in links.values())} wikilinks resolve.')
