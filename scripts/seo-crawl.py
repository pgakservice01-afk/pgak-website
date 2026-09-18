"""Audit public sitemap HTML without submitting forms. python3 scripts/seo-crawl.py [origin] [output]"""
import concurrent.futures, json, sys, urllib.request, urllib.error, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
origin = sys.argv[1] if len(sys.argv)>1 else 'https://www.pgak.co.in'
out = Path(sys.argv[2] if len(sys.argv)>2 else 'docs/seo/evidence/crawl-before.json')
class Page(HTMLParser):
 def __init__(self):
  super().__init__(); self.ids=[]; self.title=''; self.h1=[]; self.canonical=[]; self.description=[]; self.robots=[]; self.links=[]; self.schemas=[]; self.in_title=False; self.in_h1=False; self.in_schema=False; self.script=''; self.images=0; self.missing_alt=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'): self.ids.append(a['id'])
  if tag=='title': self.in_title=True
  if tag=='h1': self.in_h1=True; self.h1.append('')
  if tag=='meta':
   if a.get('name')=='description': self.description.append(a.get('content',''))
   if a.get('name') in ('robots','googlebot'): self.robots.append(a.get('content',''))
  if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
  if tag=='a': self.links.append(a.get('href',''))
  if tag=='img': self.images+=1; self.missing_alt+=int('alt' not in a)
  if tag=='script' and a.get('type')=='application/ld+json': self.in_schema=True; self.script=''
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_h1:self.h1[-1]+=data
  if self.in_schema:self.script+=data
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='h1':self.in_h1=False
  if tag=='script' and self.in_schema:
   try:self.schemas.append(json.loads(self.script))
   except ValueError:self.schemas.append({'invalid':True})
   self.in_schema=False
urls=[n.text for n in ET.fromstring(urllib.request.urlopen(origin+'/sitemap.xml').read()).iter() if n.tag.endswith('loc')]
def audit(url):
 path=url.removeprefix('https://www.pgak.co.in'); target=origin+path
 try:
  with urllib.request.urlopen(target,timeout=30) as r: html=r.read().decode(); status=r.status; final=r.url
  p=Page();p.feed(html)
  return dict(url=url,status=status,final_url=final,title=p.title,h1=p.h1,canonical=p.canonical,description=p.description,robots=p.robots,links=p.links,schemas=p.schemas,images=p.images,missing_alt=p.missing_alt,html_bytes=len(html),ids=p.ids)
 except Exception as e:return dict(url=url,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: results=list(pool.map(audit,urls))
out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(results,indent=2))
print(json.dumps({'pages':len(results),'errors':[r for r in results if 'error'in r],'bad_h1':[r['url']for r in results if 'error'not in r and len(r['h1'])!=1],'missing_canonical':[r['url']for r in results if 'error'not in r and len(r['canonical'])!=1],'invalid_schema':[r['url']for r in results if any(s.get('invalid')for s in r.get('schemas',[]))]},indent=2))
