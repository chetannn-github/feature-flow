import { Router } from "express";
import auth from "../middleware/auth.js";
import { createEnvironment, getEnvironments, rotateKey, upsertData, deleteData, getEnvironmentData, changeDataStatus, updateData, deleteEnvironment } from "../controllers/environmentController.js";
const router = Router();


router.post("/projects/:projectId/environments", auth, createEnvironment);
router.get("/projects/:projectId/environments", auth, getEnvironments);
router.post("/environments/:envId/rotate-key", auth, rotateKey);
router.get("/environments/:envId/data", auth, getEnvironmentData); 
router.post("/environments/:envId/data", auth, upsertData);
router.delete("/environments/:envId", auth, deleteEnvironment);
router.delete("/environments/:envId/data/:key", auth, deleteData);

router.patch("/environments/:envId/data/:key/status", auth, changeDataStatus);
router.put("/environments/:envId/data/:key", auth, updateData);


 


export default router;
