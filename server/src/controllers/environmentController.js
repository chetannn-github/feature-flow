import Project from "../models/Project.js";
import Environment from "../models/Environment.js";
import { generatePlainKey, hashKey } from "../utils/generateApiKey.js";

export async function createEnvironment(req, res) {
  const { projectId } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "name required" });
  const proj = await Project.findOne({ _id: projectId, owner: req.user.id });
  if (!proj) return res.status(404).json({ message: "Project not found" });
  const env = await Environment.create({ name, project: proj._id, data: {} });
  res.status(201).json(env);
}

export async function getEnvironments(req, res) {
  const { projectId } = req.params;
  const proj = await Project.findOne({ _id: projectId, owner: req.user.id });
  if (!proj) return res.status(404).json({ message: "Project not found" });
  const envs = await Environment.find({ project: proj._id }).sort({ createdAt: -1 });
  res.json(envs);
}

export async function rotateKey(req, res) {
  const { envId } = req.params;
  const env = await Environment.findById(envId).populate("project");
  if (!env) return res.status(404).json({ message: "Environment not found" });
  if (String(env.project.owner) !== String(req.user.id)) return res.status(403).json({ message: "Forbidden" });
  const plain = generatePlainKey();
  env.apiKey = hashKey(plain);
  await env.save();
  console.log(env);
  res.json({ apiKey: plain, envId: env._id, environment: env.name });
}

export async function upsertData(req, res) {
  try {
    const { envId } = req.params;
    const { key, value, status } = req.body;

    const env = await Environment.findById(envId);
    if (!env) return res.status(404).json({ error: "Environment not found" });

    if (!env.data) env.data = new Map();

    // console.log(key,value, status);
    env.data.set(key, { 
      value: value, 
      status: status || "active" 
    });

    await env.save();
    return res.json({ message: "Upserted", data: env.data.get(key) });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
}



export async function deleteData(req, res) {
  const { envId, key } = req.params;
  const env = await Environment.findById(envId).populate("project");
  if (!env) return res.status(404).json({ message: "Environment not found" });
  if (String(env.project.owner) !== String(req.user.id)) return res.status(403).json({ message: "Forbidden" });
  env.data.delete(key);
  await env.save();
  res.json({ message: "deleted", data: Object.fromEntries(env.data) });
}


export async function getEnvironmentData(req, res) {
  try {
    const { envId } = req.params;
    const env = await Environment.findById(envId);
    if (!env) {
      return res.status(404).json({ error: "Environment not found" });
    }
    return res.json(env.data || {}); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}


export async function changeDataStatus(req, res) {
  try {
    const { envId, key } = req.params;

    const env = await Environment.findById(envId);
    if (!env) return res.status(404).json({ error: "Environment not found" });

    const item = env.data.get(key);
    if (!item) return res.status(404).json({ error: "Key not found" });
    item.status = item.status == "active" ? "inactive" : "active";
   
    await env.save();

    return res.json({ message: "Status updated" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
}


export async function updateData(req, res) {
  try {
    const { envId, key } = req.params;
    const { value } = req.body;

    const env = await Environment.findById(envId);
    if (!env) return res.status(404).json({ error: "Environment not found" });

    const item = env.data.get(key);
    if (!item) return res.status(404).json({ error: "Key not found" });

    // sirf value update karo, status untouched rahega
    item.value = value;

    env.data.set(key, item);
    await env.save();

    return res.json({
      message: "Data value updated",
      key,
      data: item,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
}


export async function deleteEnvironment (req, res) {
  try {
    const { envId } = req.params;

    const env = await Environment.findByIdAndDelete(envId);
    if (!env) {
      return res.status(404).json({ message: "Environment not found" });
    }

    return res.json({ message: "Environment deleted successfully", env });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

