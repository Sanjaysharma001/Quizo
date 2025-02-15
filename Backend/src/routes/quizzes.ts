import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create Quiz 
router.post("/", async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const formattedQuestions = Array.isArray(questions) ? questions : [];
    const newQuiz = await prisma.quiz.create({
      data: { title, description, questions: JSON.stringify(formattedQuestions) },
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch Quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch Quiz by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await prisma.quiz.findUnique({
        where: { id: Number(id) }, // Ensure ID is a number
      });
  
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  
// Update Quiz
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;
  try {
    const quiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: { title, description, questions },
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Error updating quiz" });
  }
});

// Delete Quiz
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting quiz" });
  }
});

export default router;
