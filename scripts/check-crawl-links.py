"""Check canonical sitemap and all internal HTML links, including fragment targets."""
import json,sys,urllib.parse,urllib.request,concurrent.futures
from html.parser import HTMLParser
from collections import Counter
rows=json.load(open(sys.argv[1])); origin=sys.argv[2]
class IDs(HTMLParser):
 def __init__(self):super().__init__();self.ids=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.add(a['id'])
links=set()
for row in rows:
 for href in row.get('links',[]):
  u=urllib.parse.urlparse(urllib.parse.urljoin(row['url'],href))
  if u.netloc=='www.pgak.co.in':links.add((u.path or '/',u.fragment))
def check(path):
 try:
  with urllib.request.urlopen(origin+path,timeout=30) as r: body=r.read().decode();status=r.status
  p=IDs();p.feed(body);return path,(status,p.ids)
 except Exception as e:return path,(str(e),set())
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:pages=dict(pool.map(check,{p for p,f in links}))
bad=[{'path':p,'fragment':f,'status':pages[p][0]} for p,f in sorted(links) if pages[p][0]!=200 or (f and f not in pages[p][1])]
report={'pages':len(rows),'internal_targets':len(links),'broken_links':bad,'duplicate_titles':[k for k,v in Counter(r.get('title')for r in rows).items()if v>1],'noncanonical':[r['url']for r in rows if r.get('canonical') != [r['url']] and r.get('canonical') != [r['url']+'/']], 'missing_alt':[r['url']for r in rows if r.get('missing_alt')], 'noindex_in_sitemap':[r['url']for r in rows if any('noindex'in x for x in r.get('robots',[]))]}
print(json.dumps(report,indent=2))
