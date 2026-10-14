import { createServer } from 'node:http';
import { app } from './app.js';

const PORT = Number(process.env.PORT) || 3001;

const server = createServer((req, res) => {
  void app(req, res).catch((error: unknown) => {
    console.error(error);

    if (!res.headersSent) {
      res.writeHead(500, {
        'Content-Type': 'application/json; charset=utf-8',
      });
    }

    if (!res.writableEnded) {
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});