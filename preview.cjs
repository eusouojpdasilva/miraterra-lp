const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}const target=file===root?path.join(root,'index.html'):file;fs.readFile(target,(error,data)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream'});res.end(data);});}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
