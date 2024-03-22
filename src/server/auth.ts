import { Lucia, type Session, type User } from "lucia";
import { db } from "./db";
import { sessionTable, userTable } from "./db/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { cache } from "react";
import { cookies } from "next/headers";
import { GitHub } from "arctic";

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      githubId: attributes.github_id,
      user: attributes,
    };
  },
});

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//   }
// }

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
);

// github.createAuthorizationURL()

interface DatabaseUserAttributes {
  github_id: number;
  userName: string;
}
