"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCallback, useState } from "react";
import { Loader2, Info, Users, User, Sparkles, CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

interface FormData {
  Time_spent_Alone: number;
  Stage_fear: boolean;
  Social_event_attendance: number;
  Going_outside: number;
  Drained_after_socializing: boolean;
  Friends_circle_size: number;
  Post_frequency: number;
}

interface PredictionResponse {
  prediction: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const FORM_FIELDS = [
  {
    name: "Time_spent_Alone",
    label: "Time Spent Alone",
    placeholder: "Hours spent alone weekly",
    min: 0,
    max: 300,
    unit: "hours/week",
    tooltip: "Average hours spent alone per week (including sleep)",
  },
  {
    name: "Social_event_attendance",
    label: "Social Event Attendance",
    placeholder: "Hours attending social events",
    min: 0,
    max: 150,
    unit: "hours/week",
    tooltip: "Hours spent at social gatherings per week",
  },
  {
    name: "Going_outside",
    label: "Time Outside",
    placeholder: "Hours spent outside",
    min: 0,
    max: 300,
    unit: "hours/week",
    tooltip: "Total hours spent outside home per week",
  },
  {
    name: "Friends_circle_size",
    label: "Social Circle Size",
    placeholder: "Number of close friends",
    min: 0,
    max: 300,
    unit: "people",
    tooltip: "Number of people you regularly interact with",
  },
  {
    name: "Post_frequency",
    label: "Social Media Activity",
    placeholder: "Weekly social media posts",
    min: 0,
    max: 100,
    unit: "posts/week",
    tooltip: "Average number of social media posts per week",
  },
] as const;

const INITIAL_FORM_DATA: FormData = {
  Time_spent_Alone: 0,
  Stage_fear: false,
  Social_event_attendance: 0,
  Going_outside: 0,
  Drained_after_socializing: false,
  Friends_circle_size: 0,
  Post_frequency: 0,
};

const PERSONALITY_IMAGES = {
  extrovert: "https://plus.unsplash.com/premium_photo-1681841110999-4f1e4c88e9c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  introvert: "https://images.unsplash.com/photo-1460904577954-8fadb262612c?q=80&w=1690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ambivert: "https://images.unsplash.com/photo-1528701222226-756c361aa528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  default: "https://plus.unsplash.com/premium_photo-1681841110999-4f1e4c88e9c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const PERSONALITY_DESCRIPTIONS = {
  extrovert: "You are an extrovert! You thrive in social situations, gain energy from being around others, and tend to be outgoing and expressive. You enjoy being the center of attention and are comfortable in large groups.",
  introvert: "You are an introvert! You prefer quiet, low-stimulus environments and often feel drained by social situations. You tend to be thoughtful, reflective, and prefer deep, meaningful conversations over small talk.",
  ambivert: "You are an ambivert! You have a balanced mix of introverted and extroverted traits. You can adapt to different social situations and feel comfortable both in groups and alone, depending on the context.",
  default: "Your personality type has been determined based on your responses to various social and behavioral questions."
};

export default function PredictCard() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};

    FORM_FIELDS.forEach((field) => {
      const value = formData[field.name as keyof FormData];

      if (value === null || value === undefined || value === 0) {
        errors[field.name] = `${field.label} is required`;
      } else if (typeof value === "number" && (value < field.min || value > field.max)) {
        errors[field.name] = `${field.label} must be between ${field.min} and ${field.max} ${field.unit}`;
      }
    });

    return errors;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : Math.max(0, parseFloat(value) || 0),
      }));

      if (validationErrors[name]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validationErrors],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      console.log(formData)
      const response = await axios.post(
        `/api/predict`,
        formData,
      );

      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Failed to generate prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setPrediction(null);
    setError("");
    setValidationErrors({});
  }, []);

  const getPersonalityImage = (predictionType: string) => {
    const type = predictionType.toLowerCase();
    if (type.includes('extrovert')) return PERSONALITY_IMAGES.extrovert;
    if (type.includes('introvert')) return PERSONALITY_IMAGES.introvert;
    if (type.includes('ambivert')) return PERSONALITY_IMAGES.ambivert;
    return PERSONALITY_IMAGES.default;
  };

  const getPersonalityDescription = (predictionType: string) => {
    const type = predictionType.toLowerCase();
    if (type.includes('extrovert')) return PERSONALITY_DESCRIPTIONS.extrovert;
    if (type.includes('introvert')) return PERSONALITY_DESCRIPTIONS.introvert;
    if (type.includes('ambivert')) return PERSONALITY_DESCRIPTIONS.ambivert;
    return PERSONALITY_DESCRIPTIONS.default;
  };

  const getPersonalityIcon = (predictionType: string) => {
    const type = predictionType.toLowerCase();
    if (type.includes('extrovert')) return <Users className="h-8 w-8 text-blue-500" />;
    if (type.includes('introvert')) return <User className="h-8 w-8 text-purple-500" />;
    if (type.includes('ambivert')) return <Sparkles className="h-8 w-8 text-green-500" />;
    return <CheckCircle className="h-8 w-8 text-gray-500" />;
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Result Card - Show when prediction is available */}
        {prediction && (
          <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-green-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center justify-center space-x-3">
                {getPersonalityIcon(prediction.prediction)}
                <CardTitle className="text-2xl text-center">Your Personality Type</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <img
                    src={getPersonalityImage(prediction.prediction)}
                    alt={`${prediction.prediction} personality type`}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-2">
                      {prediction.prediction}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {getPersonalityDescription(prediction.prediction)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleReset}
                variant="outline"
                className="px-6 py-2"
              >
                Take Assessment Again
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Assessment Form */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Personality Assessment</CardTitle>
            <CardDescription className="text-gray-600">
              Answer these questions to discover your personality type based on your social habits.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Numeric Fields Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Habits</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {FORM_FIELDS.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={field.name} className="font-medium">
                          {field.label}
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{field.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={field.min}
                        max={field.max}
                        placeholder={field.placeholder}
                        value={String(formData[field.name as keyof FormData])}
                        onChange={handleChange}
                        className={`${
                          validationErrors[field.name] ? "border-red-500" : ""
                        } transition-colors`}
                        aria-describedby={`${field.name}-error`}
                        aria-invalid={!!validationErrors[field.name]}
                      />
                      <span className="text-sm text-gray-500">{field.unit}</span>
                      {validationErrors[field.name] && (
                        <p id={`${field.name}-error`} className="text-sm text-red-500">
                          {validationErrors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Boolean Fields Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Experiences</h3>
                <div className="space-y-3">
                  {["Stage_fear", "Drained_after_socializing"].map((field) => (
                    <div key={field} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={field}
                        name={field}
                        checked={formData[field as keyof FormData] as boolean}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-gray-300 accent-primary focus:ring-primary"
                        aria-labelledby={`${field}-label`}
                      />
                      <Label
                        id={`${field}-label`}
                        htmlFor={field}
                        className="cursor-pointer text-sm"
                      >
                        {field === "Stage_fear"
                          ? "Do you experience stage fright?"
                          : "Do you feel drained after social events?"}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto flex-1"
              disabled={loading || !!prediction}
              onClick={handleSubmit}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Get Results"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleReset}
              disabled={loading}
            >
              Clear Form
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
}