
import { Quiz, User } from "@/types/quiz";

export const mockUser: User = {
  id: "1",
  email: "teacher@example.com",
  name: "John Doe",
};

export const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Mathematics Basics",
    description: "Basic arithmetic and algebra concepts",
    questions: 10,
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "2",
    title: "English Grammar",
    description: "Essential grammar rules and usage",
    questions: 15,
    createdAt: "2024-03-09T15:30:00Z",
    updatedAt: "2024-03-09T15:30:00Z",
  },
  {
    id: "3",
    title: "Science Quiz",
    description: "Basic scientific concepts and theories",
    questions: 12,
    createdAt: "2024-03-08T09:15:00Z",
    updatedAt: "2024-03-08T09:15:00Z",
  },
];
