import crypto from "crypto";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest();

export const encryptBuffer = (
  buffer
) => {

  const iv =
    crypto.randomBytes(16);

  const cipher =
    crypto.createCipheriv(
      algorithm,
      key,
      iv
    );

  const encrypted =
    Buffer.concat([
      cipher.update(buffer),
      cipher.final()
    ]);

  return Buffer.concat([
    iv,
    encrypted
  ]);

};

export const decryptBuffer = (
  buffer
) => {

  const iv =
    buffer.slice(0, 16);

  const encrypted =
    buffer.slice(16);

  const decipher =
    crypto.createDecipheriv(
      algorithm,
      key,
      iv
    );

  return Buffer.concat([
    decipher.update(
      encrypted
    ),
    decipher.final()
  ]);

};