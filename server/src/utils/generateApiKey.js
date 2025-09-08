import crypto from "crypto";
export function generatePlainKey() {
  return crypto.randomBytes(24).toString("base64url");
}
export function hashKey(plain) {
  return crypto.createHash("sha256").update(plain).digest("hex");
}
