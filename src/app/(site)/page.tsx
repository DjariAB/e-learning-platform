// import { desc } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
// import { db } from "@/server/db";
// import { posts } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { julius } from "../layout";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { lucia } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { sessionTable, userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default function HomePage() {
  // const t = await db.select().from(posts).orderBy(desc(posts.createdAt));

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

          {/* TODO: change this code to be just a link this shit smelly af*/}

          <Link href="/signin">
            <Button
              variant="hover"
              className="w-fit py-7 text-2xl font-semibold hover:-translate-y-1 hover:translate-x-1 hover:scale-110"
            >
              {" "}
              Get Started
            </Button>
          </Link>
        </div>
       

        <div>
          <Image src="/SVGs/Group 6.png" alt=" " width={637} height={763} />
        </div>
      </div>
    </main>
  );
}
