"use client";

import {
  Home,
  ClipboardCheck,
  BookOpen,
  History,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ClipboardCheck, label: "Checklist", href: "/checklist" },
  { icon: BookOpen, label: "Recommendations", href: "/recommendations" },
  { icon: History, label: "History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function BottomNavigation({ currentPath }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const index = navItems.findIndex((item) => item.href === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [currentPath]);

  useEffect(() => {
    if (navRef.current && dotRef.current) {
      const navItem = navRef.current.children[activeIndex];
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();

        setIndicatorStyle({
          left: rect.left - navRect.left + rect.width / 2,
          transition: "all 0.3s ease",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-200 border-t border-red-300 z-10">
      <div
        className="relative flex justify-around items-center h-16 max-w-md mx-auto"
        ref={navRef}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full relative",
                isActive ? "text-red-900" : "text-red-700"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 m-auto w-12 h-12 rounded-full transition-all duration-800",
                  isActive
                    ? "bg-white bg-opacity-50 animate-pulse"
                    : "bg-transparent"
                )}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(0.5)",
                }}
              />
              <Icon className="h-6 w-6 z-10" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
        <div
          ref={dotRef}
          className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-red-900"
          style={{
            transform: `translateX(-50%)`,
            ...indicatorStyle,
          }}
        />
      </div>
    </div>
  );
}
