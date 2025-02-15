import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Search, LogOut, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuizForm from "./QuizForm"; 

// Fetch quizzes
const fetchQuizzes = async () => {
  const response = await axios.get("http://localhost:5000/quizzes");
  return response.data;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null); //  Track quiz for editing
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch Quizzes
  const { data: quizzes = [], isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  // Delete Quiz Mutation
  const deleteMutation = useMutation({
    mutationFn: async (quizId) => {
      await axios.delete(`http://localhost:5000/quizzes/${quizId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });

  const handleDelete = (quizId) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      deleteMutation.mutate(quizId);
    }
  };

  //  Filters quizzes by search term
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">

          {/* Search Input */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Create New Quiz */}
          <QuizForm />
        </div>

        {/* Loading & Error Handling */}
        {isLoading ? (
          <p>Loading quizzes...</p>
        ) : error ? (
          <p className="text-red-500">Error loading quizzes: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-sm p-6 card-hover">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{quiz.questions.length} questions</span>
                  <span>{format(new Date(quiz.updatedAt || quiz.createdAt), "MMM d, yyyy")}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-2">
                  {/* Edit Button */}
                  <QuizForm quiz={quiz} isEditing={true} />

                  {/* Delete Button */}
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(quiz.id)}>
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
