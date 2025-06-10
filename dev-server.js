// dev-server.js
import http from 'http';
import handler from './api/generateExe.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Only handle GET / requests
  if (req.method === 'GET' && (req.url === '/' || req.url === '/api/generateExe')) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`✅ Dev server listening at http://localhost:${PORT}`);
});
