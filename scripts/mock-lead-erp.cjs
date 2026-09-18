// Local-only integration test sink. Never use production contact details.
const http = require('node:http');
http.createServer((req,res)=>{
 let body='';req.on('data',c=>body+=c);req.on('end',()=>{
  res.setHeader('Content-Type','application/json');
  if(req.url==='/failure'){res.writeHead(503);return res.end('{"ok":false}');}
  console.log('TEST_LEAD_RECEIVED', JSON.parse(body).source || 'website');
  res.end('{"ok":true,"id":"local-seo-test"}');
 });
}).listen(4319,'127.0.0.1',()=>console.log('Local lead test sink: 4319'));
