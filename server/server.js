import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { PORT, CORS_ORIGIN } from "./src/config.js";
import { connectDB } from "./src/db.js";
import authRoutes from "./src/routes/auth.js";
import projectRoutes from "./src/routes/projects.js";
import environmentRoutes from "./src/routes/environments.js";
import publicRoutes from "./src/routes/public.js";




  const app = express();

  app.use(helmet());
  app.use(cors({ origin: "*" }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));


  const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
  app.use(limiter);



  app.get("/health", (_, res) => res.json({ ok: true }));
  app.use("/auth", authRoutes);
  app.use("/api", projectRoutes);
  app.use("/api", environmentRoutes);
  app.use("/", publicRoutes);


  app.use((err, req, res, next) => {
    console.error("Unhandled error", err);
    res.status(500).json({ message: "Server error" });
  });


  app.listen(PORT, async() =>{
    try {
      await connectDB();
      console.log(`🚀 Server listening on :${PORT}`)
    } catch (error) {
      console.log(error.message);
    }

  });

