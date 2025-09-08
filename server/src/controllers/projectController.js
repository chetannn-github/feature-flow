import Project from "../models/Project.js";
import Environment from "../models/Environment.js";

export async function createProject(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "name required" });
  const p = await Project.create({ name, owner: req.user.id });
  res.status(201).json(p);
}

export async function getProjects(req, res) {
  const list = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
}

export async function deleteProject(req, res) {
  const { projectId } = req.params;
  const proj = await Project.findOne({ _id: projectId, owner: req.user.id });
  if (!proj) return res.status(404).json({ message: "Not found" });
  await Environment.deleteMany({ project: proj._id });
  await proj.deleteOne();
  res.json({ message: "Project deleted" });
}
