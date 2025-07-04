
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, CheckCircle, XCircle, Award, Timer, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const difficulties = [
    { level: 'beginner', label: 'Beginner', description: 'Ages 12-14', color: 'bg-green-500' },
    { level: 'intermediate', label: 'Intermediate', description: 'Ages 15-17', color: 'bg-yellow-500' },
    { level: 'advanced', label: 'Advanced', description: 'Ages 18+', color: 'bg-red-500' }
  ];

  const questionSets = {
    beginner: [
      {
        question: "What is the main purpose of the Constitution?",
        options: [
          "To declare independence from Britain",
          "To establish the framework of government and protect rights",
          "To create political parties",
          "To regulate trade"
        ],
        correct: 1,
        explanation: "The Constitution establishes how our government works and protects our fundamental rights."
      },
      {
        question: "How many branches of government are there in the United States?",
        options: ["Two", "Three", "Four", "Five"],
        correct: 1,
        explanation: "There are three branches: Executive (President), Legislative (Congress), and Judicial (Courts)."
      },
      {
        question: "What is the Bill of Rights?",
        options: [
          "A list of government powers",
          "The first 10 amendments to the Constitution",
          "Rules for elections",
          "A declaration of war"
        ],
        correct: 1,
        explanation: "The Bill of Rights contains the first 10 amendments, protecting individual freedoms."
      },
      {
        question: "Who is the head of the Executive Branch?",
        options: ["Supreme Court Chief Justice", "Speaker of the House", "The President", "Senate Majority Leader"],
        correct: 2,
        explanation: "The President leads the Executive Branch and enforces laws."
      },
      {
        question: "What does freedom of speech mean?",
        options: [
          "You can say anything without consequences",
          "You can express your opinions within legal limits",
          "Only government officials can speak publicly",
          "You must get permission to speak"
        ],
        correct: 1,
        explanation: "Freedom of speech allows you to express opinions, but there are some legal limits."
      }
    ],
    intermediate: [
      {
        question: "What is the system of checks and balances?",
        options: [
          "A way to count votes",
          "A method each branch uses to limit the others' power",
          "A banking regulation",
          "A system for federal budgets"
        ],
        correct: 1,
        explanation: "Checks and balances ensure no single branch becomes too powerful."
      },
      {
        question: "What is federalism?",
        options: [
          "The division of power between federal and state governments",
          "A type of political party",
          "The process of making federal laws",
          "A system of voting"
        ],
        correct: 0,
        explanation: "Federalism divides power between national and state governments."
      },
      {
        question: "How can the Constitution be amended?",
        options: [
          "Only by presidential order",
          "By a simple majority vote in Congress",
          "Through a specific process requiring broad consensus",
          "It cannot be changed"
        ],
        correct: 2,
        explanation: "Amendments require a 2/3 majority in both houses of Congress and ratification by 3/4 of states."
      },
      {
        question: "What is judicial review?",
        options: [
          "The President reviewing court decisions",
          "Courts reviewing the constitutionality of laws",
          "Congress reviewing judicial nominations",
          "Citizens reviewing court cases"
        ],
        correct: 1,
        explanation: "Judicial review allows courts to determine if laws violate the Constitution."
      },
      {
        question: "What is the purpose of the Electoral College?",
        options: [
          "To educate voters",
          "To formally elect the President",
          "To train government officials",
          "To register voters"
        ],
        correct: 1,
        explanation: "The Electoral College is the formal system used to elect the President."
      }
    ],
    advanced: [
      {
        question: "What principle is established by Marbury v. Madison (1803)?",
        options: [
          "Separation of powers",
          "Judicial review",
          "Federal supremacy",
          "Due process"
        ],
        correct: 1,
        explanation: "Marbury v. Madison established the Supreme Court's power of judicial review."
      },
      {
        question: "What does the Commerce Clause allow Congress to regulate?",
        options: [
          "Only international trade",
          "Interstate and international commerce",
          "Only state-to-state trade",
          "All business activities"
        ],
        correct: 1,
        explanation: "The Commerce Clause gives Congress power to regulate interstate and foreign commerce."
      },
      {
        question: "What is the difference between civil liberties and civil rights?",
        options: [
          "There is no difference",
          "Civil liberties protect from government, civil rights ensure equal treatment",
          "Civil rights protect from government, civil liberties ensure equal treatment",
          "Both only apply to voting"
        ],
        correct: 1,
        explanation: "Civil liberties protect individual freedoms from government interference; civil rights ensure equal treatment."
      },
      {
        question: "What does the 14th Amendment's Equal Protection Clause require?",
        options: [
          "All laws must be identical",
          "Government must treat similar situations similarly",
          "Only federal laws apply to states",
          "States cannot make any distinctions"
        ],
        correct: 1,
        explanation: "Equal Protection requires government to treat similarly situated people in similar ways."
      },
      {
        question: "What is the significance of McCulloch v. Maryland (1819)?",
        options: [
          "Established judicial review",
          "Affirmed federal supremacy and implied powers",
          "Created the Bill of Rights",
          "Established voting rights"
        ],
        correct: 1,
        explanation: "McCulloch v. Maryland established federal supremacy and the doctrine of implied powers."
      }
    ]
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (selectedDifficulty && questionSets[selectedDifficulty]) {
      setQuestions(questionSets[selectedDifficulty]);
    }
  }, [selectedDifficulty]);

  useEffect(() => {
    if (timeLeft > 0 && selectedDifficulty && !showResult && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, selectedDifficulty, showResult, quizComplete]);

  const handleTimeUp = () => {
    setSelectedAnswer(null);
    handleAnswerSubmit();
  };

  const selectDifficulty = (level) => {
    setSelectedDifficulty(level);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setStreak(0);
    setQuizComplete(false);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;
    
    const newAnswer = {
      question: currentQ.question,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQ.correct,
      isCorrect: isCorrect,
      explanation: currentQ.explanation
    };

    setAnswers([...answers, newAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      toast({
        title: "Correct! 🎉",
        description: currentQ.explanation,
      });
    } else {
      setStreak(0);
      toast({
        title: "Not quite right",
        description: currentQ.explanation,
        variant: "destructive"
      });
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setQuizComplete(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setSelectedDifficulty('');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizComplete(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: "Outstanding! You're a civic education superstar! 🌟", color: "text-green-600" };
    if (percentage >= 70) return { message: "Great job! You have a solid understanding of civics! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Good effort! Keep learning to improve your civic knowledge! 📚", color: "text-yellow-600" };
    return { message: "Keep studying! Every citizen's journey starts with curiosity! 💪", color: "text-red-600" };
  };

  if (!selectedDifficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Civic Knowledge Quiz
                </h1>
                <p className="text-gray-600">Test your understanding of democracy and government</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Brain className="h-16 w-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4">Choose Your Challenge Level</h2>
            <p className="text-gray-600 text-lg">Select the difficulty that matches your experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {difficulties.map((diff) => (
              <Card 
                key={diff.level}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => selectDifficulty(diff.level)}
              >
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${diff.color} flex items-center justify-center`}>
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{diff.label}</CardTitle>
                  <CardDescription className="text-lg">{diff.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600">
                    Start Quiz
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">5 questions • 30s each</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const scoreData = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Quiz Complete!
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <Award className="h-20 w-20 mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
            <p className={`text-xl ${scoreData.color} mb-6`}>
              {scoreData.message}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{score}/{questions.length}</div>
                  <div className="text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{Math.round((score/questions.length)*100)}%</div>
                  <div className="text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{selectedDifficulty}</div>
                  <div className="text-gray-600">Difficulty Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Review Your Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{answer.question}</h4>
                        <p className="text-sm text-gray-600 mb-2">{answer.explanation}</p>
                        <Badge variant={answer.isCorrect ? "default" : "destructive"}>
                          {answer.isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetQuiz} variant="outline" size="lg">
              Try Different Level
            </Button>
            <Button onClick={() => selectDifficulty(selectedDifficulty)} size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-green-600">
              Retake Quiz
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Question {currentQuestion + 1} of {questions.length}
                </h1>
                <p className="text-gray-600 capitalize">{selectedDifficulty} Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Timer className="h-5 w-5 text-orange-600" />
                <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-600' : 'text-orange-600'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Score</div>
                <div className="text-lg font-bold text-green-600">{score}/{currentQuestion + (showResult ? 1 : 0)}</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-3" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ?.question}</CardTitle>
            {streak > 1 && (
              <Badge className="w-fit bg-orange-100 text-orange-800">
                🔥 {streak} correct in a row!
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {currentQ?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left p-4 h-auto justify-start ${
                    showResult && index === currentQ.correct ? 'bg-green-100 border-green-500 text-green-800' :
                    showResult && selectedAnswer === index && index !== currentQ.correct ? 'bg-red-100 border-red-500 text-red-800' :
                    selectedAnswer === index ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="ml-auto h-5 w-5 text-red-600" />
                  )}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQ.explanation}</p>
              </div>
            )}

            {!showResult && selectedAnswer !== null && (
              <Button 
                onClick={handleAnswerSubmit}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600"
                size="lg"
              >
                Submit Answer
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
