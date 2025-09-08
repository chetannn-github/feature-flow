import { hashKey } from "../utils/generateApiKey.js";
import Environment from "../models/Environment.js";



export default async function envAuth(req, res, next) {
  const key = req.header("x-env-key");
  console.log("key   " + key);
  if (!key) return res.status(401).json({ message: "x-env-key required" });
  const hashed = hashKey(key);
  console.log(hashed);
  const env = await Environment.findOne({ apiKey: hashed }).populate("project");
  if (!env) return res.status(401).json({ message: "Invalid key112" });
  req.env = env;
  next();
}
