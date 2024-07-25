import bcrypt from "bcrypt";

export function generateHashPassword(password: string) {
  return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
}

export function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function getCredentialsByAuthHeader(authHeader: string) {
  const [type, credentials] = authHeader.split(" ");

  if (type !== "Basic") {
    throw new Error("Credentials invalid");
  }

  return Buffer.from(credentials, "base64").toString().split(":");
}
