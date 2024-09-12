const http = require('http');
const https = require('https');
const url = require('url');

const BILIBILI_API_URL = 'https://api.bilibili.com/x/relation/stat?vmid=1293593813';

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  if(parseUrl.pathname === '/following')
    {
      https.get(BILIBILI_API_URL, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(data);
        });

      }).on('error', (err) => {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    });
  }
  else
  {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}) 