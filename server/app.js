
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const createApp = () => { 
  const app = express();
  app.use(express.json());

  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return app;
};