"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import PasswordInput from "@/components/PasswordInput";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import { useAppStore } from "@/store/appStore";

export default function Home() {
  const { isEditing } = useAppStore();
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto p-5">
        {!isEditing && <PasswordInput />}
        {isEditing && (
          <div className="text-center mx-auto text-blue-500 animate-pulse">
            {`Just Refresh the page once you're done with the changes`}
          </div>
        )}
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
