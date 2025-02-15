import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";
import axios from "axios";

const QuizForm = ({ quiz = null, isEditing = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizData, setQuizData] = useState({ title: "", description: "" });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEditing && quiz) {
      setQuizData({ title: quiz.title, description: quiz.description });
    }
  }, [isEditing, quiz]);

  // Mutation for Creating or Updating
  const quizMutation = useMutation({
    mutationFn: async () => {
      if (isEditing) {
        await axios.put(`http://localhost:5000/quizzes/${quiz.id}`, quizData);
      } else {
        await axios.post("http://localhost:5000/quizzes", { ...quizData, questions: [] });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      setIsModalOpen(false);
      setQuizData({ title: "", description: "" });
    },
  });

  const handleSubmit = () => {
    if (!quizData.title.trim() || !quizData.description.trim()) {
      alert("Title and Description are required!");
      return;
    }
    quizMutation.mutate();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Create Quiz
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{isEditing ? "Edit Quiz" : "Create a New Quiz"}</DialogTitle>
        <DialogDescription>Enter the quiz details below.</DialogDescription>

        <Input
          type="text"
          placeholder="Quiz Title"
          value={quizData.title}
          onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Quiz Description"
          value={quizData.description}
          onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
          required
        />
        <Button onClick={handleSubmit} disabled={quizMutation.status === "pending"}>
          {quizMutation.status === "pending" ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Quiz" : "Create Quiz"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default QuizForm;
