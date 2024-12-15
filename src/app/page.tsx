import { Metadata } from "next";
import HomePage from "./HomePage";
import { fetchPortfolioDetails } from "@/lib/server/fetchPortfolio.service";

export async function generateMetadata({}): Promise<Metadata> {
  const { portfolio, url } = await fetchPortfolioDetails();
  if (portfolio.personalInfo.name) {
    return {
      title: `${portfolio.personalInfo.name} | Portfolio | TemplatesFarm.com`,
      description: portfolio.heroInfo.description,
      keywords: `${portfolio.personalInfo.name} Portfolio, TemplatesFarm.com`,
      // openGraph: {
      //   images: [
      //     {
      //       url: getImageUrl(course?.imageId),
      //     },
      //   ],
      // },
      alternates: {
        canonical: `${url}`,
      },
    };
  }

  return {
    title: "Portfolio | TemplatesFarm",
    description: "Portfolio of a developer",
    keywords: "Portfolio, Developer",
  };
}

export default async function Page() {
  const { portfolio, url } = await fetchPortfolioDetails();
  return <HomePage portfolio={portfolio} url={url} />;
}
