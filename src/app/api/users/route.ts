import { getAll } from "@/services/baseService";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PRIVATE_BASE_URL;

export const GET = async (req: Request, res: Response) => {
  try {
    const collectionName = req.url.split(`${baseUrl}/`)[1];
    console.log("collectionName:**************************", collectionName);
    const response = await getAll(collectionName);
    console.log("collectionName:**************************", response);
    return NextResponse.json({ message: "OK", response }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
