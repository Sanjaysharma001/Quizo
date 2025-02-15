import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth";
import quizRoutes from "./routes/quizzes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/quizzes", quizRoutes);

app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
