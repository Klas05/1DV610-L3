import express from "express";
import { renderHomePage } from "../controllers/qrController.js";

const router = express.Router();

router.get("/", renderHomePage);

export default router;
