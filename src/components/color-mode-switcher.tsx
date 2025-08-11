"use client";

import { Leaf, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ColorModeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <>
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className="dark:hidden"
      >
        <Moon className="h-5 w-5" />
      </Button>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
          Light
        </span>
      </div>
      
      <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className="hidden dark:flex"
      >
        <Leaf className="h-5 w-5" />
      </Button>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
          Dark
        </span>
      </div>
    </>
  );
}