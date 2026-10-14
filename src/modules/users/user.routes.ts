
import type { IncomingMessage, ServerResponse } from 'node:http';
import * as userController from './user.controller.js';

export async function userRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
): Promise<boolean> {
  if (req.method === 'GET' && url.pathname === '/users') {
    await userController.getUsers(req, res);
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/user') {
    const email = url.searchParams.get('email');

    if (!email) {
      res.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      res.end(JSON.stringify({ error: 'Email is required' }));
      return true;
    }

    await userController.getUserByEmail(req, res, email);
    return true;
  }

  return false;
}
