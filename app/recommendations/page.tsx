"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { recommendationsData } from "@/lib/recommendations-data";

export default function RecommendationsPage() {
  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <p className="p-1 px-2 rounded-[12px] text-xs bg-red-100 text-red-800 mb-6">
        This application provides general health recommendations; however, for
        accurate medical advice and diagnosis, it is recommended to consult a
        qualified physician.
      </p>
      <h1 className="text-2xl font-bold mb-6 text-red-800">Recommendations</h1>

      <div className="space-y-4">
        {recommendationsData.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden bg-red-100 border-red-200"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-red-900 mb-2">
                {post.title}
              </h2>
              <p className="text-red-700 mb-4 line-clamp-2">
                {post.description}
              </p>
              <Link href={`/post?id=${post.id}`}>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Read More
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
