import { Router } from "express";
import envAuth from "../middleware/envAuth.js";
import { getData } from "../controllers/publicController.js";


const router = Router();
router.get("/v1/data", envAuth, getData);


export default router;
