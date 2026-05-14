import { exec } from "child_process";

export const runCommand = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};