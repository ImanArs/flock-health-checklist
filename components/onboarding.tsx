"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, BookOpen, CheckCircle } from "lucide-react"

const onboardingSteps = [
  {
    icon: Table,
    title: "Create Your Chicken Table",
    description: "Add your chickens to the app and track their health status easily.",
  },
  {
    icon: BookOpen,
    title: "Read Recommendations",
    description: "Learn best practices for chicken care to maximize egg production.",
  },
  {
    icon: CheckCircle,
    title: "Start Tracking",
    description: "Begin your journey to better chicken health management.",
  },
]

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
      <Card className="w-full max-w-md bg-red-100 border-red-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-200 rounded-full opacity-30 animate-pulse" />
              <div className="relative bg-red-200 p-4 rounded-full">
                <Icon className="h-12 w-12 text-red-700" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-red-900 mb-2">{step.title}</h2>
            <p className="text-red-700 mb-8">{step.description}</p>

            <div className="flex space-x-2 mb-6">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-red-600" : "bg-red-300"}`}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="w-full bg-red-600 hover:bg-red-700">
              {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

