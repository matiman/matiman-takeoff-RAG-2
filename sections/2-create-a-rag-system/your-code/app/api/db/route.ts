import { db } from "@/db";
import { factsTable } from "@/db/schema/facts-schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const facts = await db.select().from(factsTable);
    return NextResponse.json(facts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch facts" }, { status: 500 });
  }
} 