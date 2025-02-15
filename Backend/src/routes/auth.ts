import { Router } from "express";
import { ENV } from "../config/env";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ENV.ADMIN_USERNAME && password === ENV.ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
