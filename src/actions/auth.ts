"use server";

import { lucia } from "@/server/auth";
import { db } from "@/server/db";
import { sessionTable, userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { generateId } from "lucia";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  // const existingUser = db
  //   .prepare("SELECT * FROM user WHERE username = ?")
  //   .get(username) as DatabaseUser | undefined;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username));
  if (existingUser[0]) {
    // const validPassword = await new Argon2id().verify(
    //   existingUser.password,
    //   password,
    // );

    if (existingUser[0].password !== password) {
      return {
        error: "Incorrect password",
      };
    }

    const session = await lucia.createSession(existingUser[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } else
    return {
      error: "Incorrect username",
    };
}

export async function signupAction(formData: FormData) {
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  // const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db
      .insert(userTable)
      .values({ id: userId, userName: username, password });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    await lucia.invalidateSession(userId);

    // const cookiess = lucia.readSessionCookie("username");

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().delete("username");
  } catch (e) {
    // if (e instanceof DrizzleError ) {
    //   return {
    //     error: "Username already used",
    //   };
    // }

    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/");
}

export async function logoutAction() {
  const c = cookies().get("auth_session");

  await db.delete(sessionTable).where(eq(sessionTable.id, c!.value));
  // await lucia.invalidateSession(sessionCookie!);

  cookies().delete("auth_session");

  return redirect("/");
}
