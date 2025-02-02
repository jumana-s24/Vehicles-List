import { NextRequest, NextResponse } from "next/server";
import vehicles from "@/data/vehicles.json";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const vehicle = vehicles.data.find(
    (v) => v.model.replace(/\s+/g, "-").toLowerCase() === id
  );

  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  }

  return NextResponse.json(vehicle, { status: 200 });
}
