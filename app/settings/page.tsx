"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, HelpCircle, Shield } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <p className="p-1 px-2 rounded-[12px] text-xs bg-red-100 text-red-800 mb-6">
        This application provides general health recommendations; however, for
        accurate medical advice and diagnosis, it is recommended to consult a
        qualified physician.
      </p>
      <h1 className="text-2xl font-bold mb-6 text-red-800">Settings</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Link href="/settings-detail?type=privacy">
          <Card className="h-full bg-red-100 border-red-200 hover:bg-red-200 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-4 h-full">
              <Shield className="h-8 w-8 text-red-700 mb-2" />
              <h2 className="text-center font-medium text-red-900">
                Privacy Policy
              </h2>
            </CardContent>
          </Card>
        </Link>

        <Link href="/settings-detail?type=terms">
          <Card className="h-full bg-red-100 border-red-200 hover:bg-red-200 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-4 h-full">
              <FileText className="h-8 w-8 text-red-700 mb-2" />
              <h2 className="text-center font-medium text-red-900">
                Terms of Use
              </h2>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
