"use client";

import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

interface Language {
  value: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { value: "en", label: "English", flag: "/images/en.png" },
  { value: "zh", label: "中文", flag: "/images/zh.png" },
  { value: "ur", label: "اردو", flag: "/images/ur.png" },
  { value: "ar", label: "العربية", flag: "/images/ar.png" },
  { value: "hi", label: "हिंदी", flag: "/images/hi.png" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("language="))
      ?.split("=")[1];
    if (savedLanguage) setLocale(savedLanguage);
  }, []);

  const handleChange = (selectedOption: Language) => {
    setLocale(selectedOption.value);
    setCookie("language", selectedOption.value, { path: "/" });
    router.refresh();
  };

  return (
    <div className={`${poppins.className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center text-black gap-1 bg-transparent p-0 shadow-none hover:bg-transparent h-0">
            <Image
              src={LANGUAGES.find((lang) => lang.value === locale)?.flag || "/images/en.png"}
              alt="flag"
              width={25}
              height={25}
              className="rounded-full"
            />
            <MdKeyboardArrowDown/>

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4">
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.value}
              onClick={() => handleChange(lang)}
              className={`${poppins.className} flex items-center gap-2 text-[18px]`}
            >
              <Image src={lang.flag} alt="flag" width={25} height={25} className="rounded-full" />
              <span className="ml-2">{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

