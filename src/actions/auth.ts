"use server";

import { lucia, validateRequest } from "@/server/auth";
import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { type ActionResult } from "@/lib/Form";

export async function loginAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid User Name",
      type: "userName",
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
      type: "password",
    };
  }

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username));
  if (existingUser[0]) {
    if (existingUser[0].password !== password) {
      return {
        error: "Incorrect password",
        type: "password",
      };
    }
    const sessionId = generateId(7);

    const session = await lucia.createSession(
      existingUser[0].id,
      {},
      { sessionId },
    );
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/courses");
  } else
    return {
      error: "Incorrect User Name",
      type: "userName",
    };
}

export async function signupAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid User Name",
      type: "userName",
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
      type: "password",
    };
  }

  // const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(7);
  try {
    await db
      .insert(userTable)
      .values({ id: userId, userName: username, password });
    const sessionId = generateId(7);

    const session = await lucia.createSession(userId, {}, { sessionId });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().delete("username");
  } catch (e) {
    return {
      error: "User Name already used",
      type: "userName",
    };
  }
  return redirect("/courses");
}

export async function logoutAction(): Promise<{ error: string }> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function mentorSignupAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid User Name",
      type: "userName",
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
      type: "password",
    };
  }

  // const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(7);
  try {
    await db
      .insert(userTable)
      .values({ id: userId, userName: username, password, isMentor: true });
    const sessionId = generateId(7);

    const session = await lucia.createSession(userId, {}, { sessionId });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().delete("username");
  } catch (e) {
    return {
      error: "User Name already used",
      type: "userName",
    };
  }
  return redirect("/dashboard");
}

export async function mentorLoginAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid User Name",
      type: "userName",
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
      type: "password",
    };
  }

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username));
  if (existingUser[0]) {
    if (existingUser[0].password !== password) {
      return {
        error: "Incorrect password",
        type: "password",
      };
    }
    if (!existingUser[0].isMentor) {
      return {
        error: "Incorrect User Name",
        type: "userName",
      };
    }
    const sessionId = generateId(7);

    const session = await lucia.createSession(
      existingUser[0].id,
      {},
      { sessionId },
    );
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/dashboard");
  } else
    return {
      error: "Incorrect User Name",
      type: "userName",
    };
}
