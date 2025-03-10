"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { recommendationsData } from "@/lib/recommendations-data"

export default function PostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      const foundPost = recommendationsData.find((p) => p.id === Number.parseInt(id))
      if (foundPost) {
        setPost(foundPost)
      } else {
        router.push("/recommendations")
      }
    } else {
      router.push("/recommendations")
    }
  }, [searchParams, router])

  if (!post) {
    return <div className="container p-4 text-center">Loading...</div>
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

      <Card className="bg-red-100 border-red-200">
        <div className="relative h-56 w-full">
          <Image
            src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(post.title)}`}
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
        </CardContent>
      </Card>
    </div>
  )
}

