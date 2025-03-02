import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function compareHashes(
  password: string,
  hash: string,
): Promise<boolean> {
  const hashedPassword = await bcrypt.compare(password, hash);
  return hashedPassword;
}
