import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export async function GET() {
  return Response.json({ fuck: "mylife" });
}

export async function POST() {
  await db.insert(posts).values({ name: "this should be worknig rn" });

  revalidatePath("/");

  return Response.json({ worknig: "justfin" });
}
