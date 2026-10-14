
import type { IncomingMessage, ServerResponse } from 'node:http';
import { userRoutes } from './modules/users/user.routes.js';

export async function app(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const url = new URL(
    req.url ?? '/',
    `http://${req.headers.host ?? 'localhost'}`
  );

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('Hello from backend!');
    return;
  }

  if (await userRoutes(req, res, url)) {
    return;
  }

  if (req.method === 'GET' && url.pathname === '/about') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('About endpoint');
    return;
  }

  res.writeHead(404, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify({ error: 'Route not found' }));
}
