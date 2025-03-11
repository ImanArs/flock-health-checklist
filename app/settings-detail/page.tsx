"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { settingsData } from "@/lib/settings-data";

export default function SettingsDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && settingsData[type]) {
      setContent(settingsData[type]);
    } else {
      router.push("/settings");
    }
  }, [searchParams, router]);

  if (!content) {
    return <div className="container p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push("/settings")}
        className="mb-4 text-red-700 hover:text-red-900 hover:bg-red-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Settings
      </Button>

      <Card className="bg-red-100 border-red-200">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            {content.title}
          </h1>
          <div className="prose prose-red max-w-none">
            {content.title === "Support" && (
              <p>
                If the form does not load,{" "}
                <a
                  href="https://sites.google.com/view/flockhealthchecklist/support-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  click here
                </a>{" "}
                to open it in a new tab.
              </p>
            )}
            <iframe
              src={content.content}
              frameBorder="0"
              className="w-full rounded-md h-[60vh]"
              sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
