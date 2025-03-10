"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Egg, ChevronRight, BirdIcon as Chicken } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getChickens } from "@/lib/chicken-data";

export default function Home() {
  const [chickens, setChickens] = useState([]);
  const [displayedChickens, setDisplayedChickens] = useState([]);

  useEffect(() => {
    const chickenData = getChickens();
    setChickens(chickenData);
    setDisplayedChickens(chickenData.slice(0, 5));
  }, []);

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-red-800">Welcome to</h1>
          <h2 className="text-3xl font-bold text-red-900 mt-1">Flock Health</h2>
        </div>
        <Link href="/settings" className="mt-4">
          <Button
            variant="outline"
            className="rounded-full px-3 py-2 bg-red-100 border-red-200 hover:bg-red-200"
          >
            <Egg className="h-5 w-5 text-red-600" />
          </Button>
        </Link>
      </div>

      <Card className="mb-6 bg-red-100 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Chicken className="h-10 w-10 text-red-700" />
            <div className="ml-4">
              <p className="text-lg font-medium text-red-900">
                Total Chickens:{" "}
                <span className="font-bold">{chickens.length}</span>
              </p>
              <Link href="/recommendations">
                <Button
                  variant="link"
                  className="p-0 h-auto text-red-600 hover:text-red-800"
                >
                  How to care for them?
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mb-3 text-red-800">Your Chickens</h3>
      <div className="space-y-3 mb-4">
        {displayedChickens.map((chicken, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-red-100 rounded-lg border border-red-200"
          >
            <div className="flex items-center">
              <Chicken
                className={`h-6 w-6 ${
                  chicken.isHealthy ? "text-green-600" : "text-red-600"
                }`}
              />
              <div className="ml-3">
                <p className="font-medium text-red-900">{chicken.id}</p>
                <p
                  className={`text-sm ${
                    chicken.isHealthy ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {chicken.isHealthy ? "Healthy" : "Sick"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/checklist">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          View All Chickens
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
