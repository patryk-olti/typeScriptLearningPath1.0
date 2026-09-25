import * as fs from 'fs';
import * as path from 'path';

export function getUsers(): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile("./users.json", "utf-8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
}