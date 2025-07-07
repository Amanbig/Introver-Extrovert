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
import { Loader2, Info } from "lucide-react";
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
      } else if (value < field.min || value > field.max) {
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

  return (
    <TooltipProvider>
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
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
                        value={formData[field.name as keyof FormData] || ""}
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

              {/* Alerts */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {prediction && (
                <Alert className="border-green-500 bg-green-50">
                  <AlertDescription className="text-green-700">
                    <strong>Result:</strong> You are likely an {prediction.prediction}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto flex-1"
              disabled={loading}
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