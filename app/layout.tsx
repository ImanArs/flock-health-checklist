"use client";

import type React from "react";

import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Onboarding from "@/components/onboarding";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    setShowOnboarding(!onboardingCompleted);
    setIsLoaded(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-red-50`}>
        {isLoaded && showOnboarding ? (
          <Onboarding onComplete={handleOnboardingComplete} />
        ) : (
          <>
            <main className="pb-20 min-h-screen">{children}</main>
            {pathname !== "/post" && pathname !== "/settings-detail" && (
              <BottomNavigation currentPath={pathname} />
            )}
          </>
        )}
      </body>
    </html>
  );
}
