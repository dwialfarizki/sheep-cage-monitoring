const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const webDir = path.join(__dirname, 'Front-End', 'dist');
const PORT = process.env.PORT || 5173;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';
  let filePath = path.join(webDir, decodeURIComponent(reqUrl));

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(webDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  STAS-RG Sheep Monitoring Dashboard berjalan!`);
  console.log(`  Buka browser di: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
  exec(`start http://localhost:${PORT}`);
});
