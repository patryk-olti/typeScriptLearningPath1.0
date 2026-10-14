import pool from '../../db/client.js';
import type { User } from './user.types.js';

export async function getUsers(): Promise<User[]> {
  const result = await pool.query<User>('SELECT id, name, email, age FROM users');
  return result.rows;
}

export async function getUserByEmail(email: string): Promise<User | undefined>{

  const result = await pool.query<User>(
    `SELECT id, name, email, age FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}