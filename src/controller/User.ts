import pool from '../../db.js';
import type { User } from '../types/User.js';

export async function getUsers(): Promise<User[]> {
  const result = await pool.query<User>('SELECT id, name, age FROM users');
  return result.rows;
}