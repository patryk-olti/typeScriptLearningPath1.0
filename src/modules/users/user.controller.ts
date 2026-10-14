
import type { IncomingMessage, ServerResponse } from 'node:http';
import * as userService from './user.service.js';

export async function getUsers(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  try {
    const users = await userService.getUsers();

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });

    res.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8',
    });

    res.end(JSON.stringify({
      message: 'Internal server error',
    }));
  }
}

export async function getUserByEmail(
  req: IncomingMessage,
  res: ServerResponse,
  email: string
): Promise<void> {
  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      res.writeHead(404, {
        'Content-Type': 'application/json; charset=utf-8',
      });

      res.end(JSON.stringify({
        message: 'User not found',
      }));

      return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });

    res.end(JSON.stringify(user));
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8',
    });

    res.end(JSON.stringify({
      message: 'Internal server error',
    }));
  }
}
