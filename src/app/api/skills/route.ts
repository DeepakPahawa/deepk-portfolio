import { databaseRoutes } from "@/lib/contants";
import {
  createOrUpdateDataFromDatabase,
  fetchFileContentFromDatabase,
} from "@/lib/server/githubApi";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const skills = await req.json();

  if (!skills) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Prepare the updated content
    const updatedContent = {
      skills,
    };

    await createOrUpdateDataFromDatabase(databaseRoutes.SKILLS, updatedContent);

    // Update the file in the repository
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.SKILLS
    );

    return NextResponse.json(parsedContent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.SKILLS
    );
    return NextResponse.json(parsedContent, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
