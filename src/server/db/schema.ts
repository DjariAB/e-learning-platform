// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  datetime,
  bigint,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator(
  (name) => `elearning_platform_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: varchar("id", { length: 196 })
      .primaryKey()
      .default(sql`(uuid())`),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .onUpdateNow()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

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
