import Link from "next/link";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useHeroStore } from "@/store/heroStore";
import { HeroSkeleton } from "../Loaders";
import HeroDialog from "./HeroDialog";
import { usePersonalStore } from "@/store/personalStore";
import EditComponent from "../EditComponent";
import { useAppStore } from "@/store/appStore";
import { HeroType, PersonalInfo } from "@/app/types/portfolio.types";

interface HeroViewProps {
  heroInfo: HeroType;
  personalInfo: PersonalInfo;
}

const HeroView: React.FC<HeroViewProps> = ({ heroInfo, personalInfo }) => {
  return (
    <div className="min-h-[60vh] flex items-center mt-24 flex-col-reverse gap-14 sm:flex-row sm:justify-between ">
      <div className="space-y-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold ">
          {/* Nice to meet you👋 */}
          {heroInfo.message}👋
          <br />{" "}
          <span className="underline underline-offset-8 decoration-green-500">
            {heroInfo.introduction}
            {/* {"I'm Deepak."} */}
          </span>
        </h1>
        <p className="w-[90%] text-l">
          {/* {
            "Based in India, I'm a Fullstack Developer passionate about building a modern web application that users love."
          } */}
          {heroInfo.description}
        </p>
        <Link
          href={`mailto:${personalInfo.email}`}
          className="inline-block group"
        >
          <Title title="Contact Me 📧" />
        </Link>
      </div>
      <div className="w-72 h-72 space-y-3 -rotate-[30deg] ">
        <div className="flex gap-3 translate-x-8">
          <div className="w-32 h-32 rounded-2xl bg-green-500"></div>
          <div className="w-32 h-32 rounded-full bg-indigo-500"></div>
        </div>
        <div className="flex flex-row-reverse gap-3 -translate-x-8">
          <div className="w-32 h-32 rounded-full bg-green-500"></div>
          <div className="w-32 h-32 rounded-2xl bg-indigo-500"></div>
        </div>
        <div className="glow absolute top-[40%] right-1/2"></div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { heroInfo, fetchHeroSection, isLoading, saveHeroInfo } =
    useHeroStore();
  const { personalInfo } = usePersonalStore();
  const { isEditing } = useAppStore();

  useEffect(() => {
    fetchHeroSection();
  }, [fetchHeroSection]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <HeroBasic
      isEditing={isEditing}
      heroInfo={heroInfo}
      saveHeroInfo={saveHeroInfo}
      personalInfo={personalInfo}
    />
  );
};

interface HeroBasicProps {
  isEditing: boolean;
  heroInfo: HeroType;
  saveHeroInfo: (info: HeroType) => void;
  personalInfo: PersonalInfo;
}

const HeroBasic: React.FC<HeroBasicProps> = ({
  isEditing,
  personalInfo,
  heroInfo,
  saveHeroInfo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <HeroView heroInfo={heroInfo} personalInfo={personalInfo} />
      <HeroDialog
        heroInfo={heroInfo}
        saveHeroInfo={saveHeroInfo}
        isOpen={isDialogOpen}
        onOpenChange={(flag: boolean = false) => setIsDialogOpen(flag)}
      />
    </EditComponent>
  );
};

export default Hero;
