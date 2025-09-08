import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProject, getProjects, deleteProject } from "../controllers/projectController.js";


const router = Router();
router.post("/projects", auth, createProject);
router.get("/projects", auth, getProjects);
router.delete("/projects/:projectId", auth, deleteProject);



export default router;
