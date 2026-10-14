import * as userRepository from './user.repository.js';

export async function getUsers() {
  return userRepository.getUsers();
}

export async function getUserByEmail(email: string) {
  return userRepository.getUserByEmail(email);
}