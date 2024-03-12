import { asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default async function HomePage() {
  const t = await db.select().from(posts).orderBy(desc(posts.createdAt));

  const s = await db.query.posts.findMany({
    orderBy: [asc(posts.createdAt)],
  });
  return (
    <main className=" flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pb-10">
        {t.map((t) => (
          <div key={t.id}> {t.name} </div>
        ))}
      </div>

      <form action={action} className="flex gap-2 pb-3">
        <input
          type="text"
          name="name"
          className="block border border-red-800"
        />
        <button
          className="rounded-md bg-green-500 p-1 text-white"
          type="submit"
        >
          add post
        </button>
      </form>
      <form action={remove}>
        <button className="rounded-md bg-red-500 p-1 text-white" type="submit">
          delete all of em
        </button>
      </form>
    </main>
  );
}

async function action(formdata: FormData) {
  "use server";

  if (formdata.has("name")) {
    const nameentry = formdata.get("name")?.toString();
    const name = nameentry ? nameentry : "not working";

    await db.insert(posts).values({ name });
  }

  revalidatePath("/");
}
async function remove() {
  "use server";

  await db.delete(posts);

  revalidatePath("/");
}
