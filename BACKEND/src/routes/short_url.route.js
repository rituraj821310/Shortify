import express from "express";

import {
  createShortUrl,
  getHistory,
  deleteShortUrlController,
} from "../controller/short_url.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create URL
router.post("/", createShortUrl);

// Get Logged-in User History
router.get("/history", authMiddleware, getHistory);

// Delete URL
router.delete("/:id", authMiddleware, deleteShortUrlController);

export default router;