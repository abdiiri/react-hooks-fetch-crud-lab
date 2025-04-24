import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  prompt: string;
  answers: string[];
  correctIndex: number;
}

const API_BASE_URL = "http://localhost:4000/questions";

const QuestionForm = ({
  onAddQuestion,
  onCancel,
  initialValues,
  onUpdateQuestion,
  isEditing,
}: {
  onAddQuestion: (question: Omit<Question, "id">) => void;
  onCancel: () => void;
  initialValues?: Question;
  onUpdateQuestion?: (
    id: number,
    updates: Partial<Omit<Question, "id">>
  ) => void;
  isEditing?: boolean;
}) => {
  const [prompt, setPrompt] = useState(initialValues?.prompt || "");
  const [answers, setAnswers] = useState(
    initialValues?.answers || ["", "", "", ""]
  );
  const [correctIndex, setCorrectIndex] = useState(
    initialValues?.correctIndex || 0
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!prompt.trim()) {
      newErrors.prompt = "Prompt is required";
    }
    if (answers.some((answer) => !answer.trim())) {
      newErrors.answers = "All answers must be provided";
    }
    if (correctIndex < 0 || correctIndex >= answers.length) {
      newErrors.correctIndex = "Correct answer index is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const newQuestion: Omit<Question, "id"> = {
      prompt,
      answers,
      correctIndex,
    };

    if (isEditing && initialValues && onUpdateQuestion) {
      onUpdateQuestion(initialValues.id, {
        prompt,
        answers,
        correctIndex,
      });
    } else {
      onAddQuestion(newQuestion);
    }
    setIsSubmitting(false);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {isEditing ? "Edit Question" : "New Question"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Modify the question details below."
              : "Fill in the details to add a new question."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="prompt" className="block mb-2">
                Prompt
              </Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your question here..."
                className={cn(
                  "w-full",
                  errors.prompt && "border-red-500 focus:ring-red-500"
                )}
                rows={3}
                disabled={isSubmitting}
              />
              {errors.prompt && (
                <p className="text-red-500 text-sm mt-1">{errors.prompt}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">Answers</Label>
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-gray-500">{`(${String.fromCharCode(
                    65 + index
                  )})`}</span>
                  <Input
                    type="text"
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Answer ${String.fromCharCode(65 + index)}`}
                    className={cn(
                      "flex-1",
                      errors.answers && "border-red-500 focus:ring-red-500"
                    )}
                    disabled={isSubmitting}
                  />
                </div>
              ))}
              {errors.answers && (
                <p className="text-red-500 text-sm mt-1">{errors.answers}</p>
              )}
            </div>
            <div>
              <Label htmlFor="correctIndex" className="block mb-2">
                Correct Answer
              </Label>
              <Select
                onValueChange={(value) => setCorrectIndex(parseInt(value, 10))}
                value={correctIndex.toString()}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    errors.correctIndex && "border-red-500 focus:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {answers.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {String.fromCharCode(65 + index)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.correctIndex && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.correctIndex}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="px-6">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const QuestionCard = ({
  question,
  onDeleteQuestion,
  onUpdateQuestion,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: {
  question: Question;
  onDeleteQuestion: (id: number) => void;
  onUpdateQuestion: (
    id: number,
    updates: Partial<Omit<Question, "id">>
  ) => void;
  isEditing: boolean;
  onStartEdit: (question: Question) => void;
  onCancelEdit: () => void;
}) => {
  const [localCorrectIndex, setLocalCorrectIndex] = useState(
    question.correctIndex
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCorrectIndexChange = async (value: string) => {
    setIsUpdating(true);
    const newIndex = parseInt(value, 10);
    setLocalCorrectIndex(newIndex); // Optimistically update the local state.
    await onUpdateQuestion(question.id, { correctIndex: newIndex });
    setIsUpdating(false);
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when delete is clicked.
    setShowConfirmation(true);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full"
      >
        <Card
          className={cn(
            "mb-4 shadow-md transition-all duration-300",
            "hover:shadow-lg hover:scale-[1.01]",
            "border-0"
          )}
          onClick={() => isEditing && onStartEdit(question)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold cursor-pointer">
              {question.prompt}
            </CardTitle>
            <div className="flex gap-2">
              {isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when edit is clicked.
                      onStartEdit(question);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit Question"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={confirmDelete}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {question.answers.map((answer, index) => (
                <p
                  key={index}
                  className={cn(
                    "text-sm",
                    index === localCorrectIndex
                      ? "font-semibold text-green-600"
                      : "text-gray-700"
                  )}
                >
                  {String.fromCharCode(65 + index)}. {answer}
                  {index === localCorrectIndex && (
                    <span className="ml-2 text-green-600 font-bold">
                      (Correct Answer)
                    </span>
                  )}
                </p>
              ))}
              {isEditing && (
                <div className="mt-4">
                  <Label
                    htmlFor={`correctIndex-${question.id}`}
                    className="block mb-2 text-sm"
                  >
                    Correct Answer
                  </Label>
                  <Select
                    onValueChange={handleCorrectIndexChange}
                    value={localCorrectIndex.toString()}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.answers.map((_, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {String.fromCharCode(65 + index)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <Card className="w-full max-w-md shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Confirm Delete
                </CardTitle>
                <CardDescription>
                  Are you sure you want to delete this question? This action
                  cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={cancelDelete}
                    className="px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteQuestion(question.id);
                      setShowConfirmation(false);
                    }}
                    className="px-6"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const QuestionList = ({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: {
  questions: Question[];
  onDeleteQuestion: (id: number) => void;
  onUpdateQuestion: (
    id: number,
    updates: Partial<Omit<Question, "id">>
  ) => void;
  isEditing: boolean;
  onStartEdit: (question: Question) => void;
  onCancelEdit: () => void;
}) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        {isEditing
          ? "No questions available. Add a new question!"
          : "No questions available. Switch to edit mode to manage questions."}
      </div>
    );
  }

  return (
    <motion.div layout className="w-full space-y-4">
      <AnimatePresence>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateQuestion={onUpdateQuestion}
            isEditing={isEditing}
            onStartEdit={onStartEdit}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const QuizManager = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = useCallback(
    async (newQuestion: Omit<Question, "id">) => {
      try {
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        });

        if (!response.ok) {
          throw new Error(`Failed to add question: ${response.status}`);
        }

        const createdQuestion: Question = await response.json();
        setQuestions((prevQuestions) => [...prevQuestions, createdQuestion]);
        setShowForm(false); // Hide form after successful addition
        setEditingQuestion(null);
      } catch (err: any) {
        setError(err.message || "Failed to add question");
      }
    },
    []
  );

  const handleDeleteQuestion = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete question: ${response.status}`);
      }
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete question");
    }
  }, []);

  const handleUpdateQuestion = useCallback(
    async (id: number, updates: Partial<Omit<Question, "id">>) => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error(`Failed to update question: ${response.status}`);
        }
        const updatedQuestion: Question = await response.json();

        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === id ? { ...q, ...updatedQuestion } : q
          )
        );
        setShowForm(false);
        setEditingQuestion(null);
      } catch (err: any) {
        setError(err.message || "Failed to update question");
      }
    },
    []
  );

  const handleStartEdit = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Manager</h1>

      <div className="flex justify-center mb-4">
        <Button
          onClick={() => {
            setIsEditing((prev) => !prev);
            setShowForm(false); // Ensure form is hidden when switching modes.
            setEditingQuestion(null);
          }}
          className="px-6"
        >
          {isEditing ? "View Questions" : "Edit Questions"}
        </Button>
        {isEditing && (
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingQuestion(null); // Clear any existing edit state.
            }}
            className="ml-4 px-6"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Question
          </Button>
        )}
      </div>

      {loading && (
        <div className="text-gray-500 text-center py-8">
          Loading questions...
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8 border border-red-500 rounded-md bg-red-50/50">
          Error: {error}
        </div>
      )}

      {!loading && (
        <>
          <AnimatePresence>
            {showForm && (
              <QuestionForm
                onAddQuestion={handleAddQuestion}
                onCancel={handleCancelEdit}
                initialValues={editingQuestion || undefined}
                onUpdateQuestion={handleUpdateQuestion}
                isEditing={!!editingQuestion}
              />
            )}
          </AnimatePresence>
          <QuestionList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            isEditing={isEditing}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
          />
        </>
      )}
    </div>
  );
};

export default QuizManager;
