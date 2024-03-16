import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { julius } from "../layout";
import Image from "next/image";

export default async function HomePage() {
  const t = await db.select().from(posts).orderBy(desc(posts.createdAt));

  // const s = await db.query.posts.findMany({
  //   orderBy: [asc(posts.createdAt)],
  // });
  return (
    <main className=" flex items-center justify-start ">
      {/* <div className="flex flex-col items-center justify-center pb-10">
        {t.map((t) => (
          <div key={t.id}> {t.name} </div>
        ))}
      </div>

      <form action={action} className="flex gap-2 pb-3">
        <Input type="text" name="name" placeholder="Post name" />
       

        <Button type="submit"> add a post </Button>
      </form>
      <form action={remove}>
      
        <Button type="submit" variant="outline">
          {" "}
          delete all of em
        </Button>
      </form> */}
      <div className="flex w-full  justify-between pl-16">
        <div className="flex flex-col gap-12 pt-44">
          <h1 className={`text-7xl  text-[#1E1E1E] ${julius.className}`}>
            Max your potential <br /> With{" "}
            <span className=" text-neutral-500"> Skillmaxxing</span>{" "}
          </h1>
          <p className=" text-2xl font-light leading-tight">
            Explore endless possibilities and ignite your curiosity <br /> with
            our interactive learning experience. <br /> Ready to embark on your
            learning journey?
          </p>

          <Button className="w-fit py-9 text-2xl font-semibold">
            {" "}
            Get Started
          </Button>
        </div>

        <div>
          <Image src="/SVGs/Group 6.png" alt=" " width={637} height={763} />
        </div>
      </div>
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
