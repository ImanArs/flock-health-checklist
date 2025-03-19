"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { recommendationsData } from "@/lib/recommendations-data";

export default function PostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const foundPost = recommendationsData.find(
        (p) => p.id === Number.parseInt(id)
      );
      if (foundPost) {
        setPost(foundPost);
      } else {
        router.push("/recommendations");
      }
    } else {
      router.push("/recommendations");
    }
  }, [searchParams, router]);

  if (!post) {
    return <div className="container p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/recommendations")}
        className="mb-4 text-red-700 hover:text-red-900 hover:bg-red-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Recommendations
      </Button>
      <p className="p-1 px-2 rounded-[12px] text-xs bg-red-100 text-red-800 mb-6">
        This application provides general health recommendations; however, for
        accurate medical advice and diagnosis, it is recommended to consult a
        qualified physician.
      </p>
      <Card className="bg-red-100 border-red-200">
        <div className="relative h-56 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-red-900 mb-4">{post.title}</h1>
          <div className="prose prose-red max-w-none">
            <p className="text-red-800 whitespace-pre-line">{post.content}</p>
          </div>
          {post.info && (
            <div className="mt-4 text-sm text-red-700">
              Source:{" "}
              <a
                href={post.info}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-red-900 text-wrap break-all"
              >
                {post.info}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
