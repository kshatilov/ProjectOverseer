import { createServer } from 'https';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

const server = createServer({
  cert: readFileSync('myTest.cert.pem'),
  key: readFileSync('myTest.private.key')
});

const wss = new WebSocketServer(
  {
    server: server
  }
);

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

server.listen(1488);