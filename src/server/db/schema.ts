// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `${name}`);

export const userTable = createTable("user", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userName: varchar("username", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }),
  github_id: varchar("github_id", { length: 255 }).unique(),
});

export const sessionTable = createTable("session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 255,
  })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});
export const courseTable = createTable(
  "courses",
  {
    id: varchar("id", { length: 196 })
      .primaryKey()
      .default(sql`(uuid())`),
    title: varchar("name", { length: 256 }).notNull(),
    imageUrl: varchar("image_url", { length: 511 }).notNull(),
    educatorId: varchar("educator_id", { length: 256 })
      .references(() => userTable.id)
      .notNull(),
    level: varchar("level", {
      length: 256,
      enum: ["beginner", "intermediate", "advanced"],
    }).notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .onUpdateNow()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.title),
  }),
);
