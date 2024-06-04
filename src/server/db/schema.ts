// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  datetime,
  int,
  primaryKey,
  boolean,
  tinyint,
  smallint,
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
  imageUrl: varchar("image_url", { length: 511 }),
  github_id: varchar("github_id", { length: 255 }).unique(),
  isMentor: boolean("is_mentor").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .onUpdateNow()
    .default(sql`CURRENT_TIMESTAMP`),
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
    id: varchar("id", { length: 196 }).primaryKey(),
    title: varchar("name", { length: 255 }).notNull(),
    imageUrl: varchar("image_url", { length: 511 }).notNull(),
    lessonsNum: int("lesson_num").$default(() => 0),
    educatorId: varchar("educator_id", { length: 255 })
      .references(() => userTable.id)
      .notNull(),
    level: varchar("level", {
      length: 255,
    }).notNull(),
    category: varchar("category", {
      length: 255,
    }).notNull(),
    briefDescription: varchar("brief_description", {
      length: 1000,
    }).notNull(),
    mainDescription: varchar("main_description", {
      length: 5000,
    }).notNull(),
    courseGoals: varchar("course_goals", {
      length: 5000,
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
export const chapterTable = createTable("chapter", {
  id: varchar("id", { length: 196 }).primaryKey(),
  courseId: varchar("course_id", { length: 196 })
    .references(() => courseTable.id)
    .notNull(),
  name: varchar("chapter_name", { length: 255 }).notNull(),
  index: tinyint("index").notNull().autoincrement().unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .onUpdateNow()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const lessonTable = createTable(
  "lesson",
  {
    id: varchar("id", { length: 196 }).primaryKey(),
    title: varchar("lesson_title", { length: 255 }).notNull(),
    index: tinyint("index").notNull().autoincrement().unique(),
    chapterId: varchar("chapter_id", { length: 196 })
      .references(() => chapterTable.id)
      .notNull(),
    LessonContent: varchar("lesson_content", { length: 196 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .onUpdateNow()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      indexIdx: index("indexIdx").on(table.index),
    };
  },
);
export const fileTable = createTable("file", {
  id: varchar("id", { length: 196 }).primaryKey(),
  name: varchar("lesson_title", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  // lessonId: varchar("lesson_id", { length: 196 })
  //   .references(() => lessonTable.id)
  //   .notNull(),
  userId: varchar("user_id", { length: 196 })
    .references(() => userTable.id)
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .onUpdateNow()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const questionTable = createTable("question", {
  id: varchar("id", { length: 196 }).primaryKey(),
  lessonId: varchar("lesson_id", { length: 196 }).references(
    () => lessonTable.id,
  ),
  question: varchar("question", { length: 255 }).notNull(),
  choice1: varchar("choice_1", { length: 255 }).notNull(),
  choice2: varchar("choice_2", { length: 255 }).notNull(),
  choice3: varchar("choice_3", { length: 255 }).notNull(),
  correctAnswer: varchar("correct_choice", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .onUpdateNow()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const enrolledCoursesTable = createTable(
  "enrolled_Courses",
  {
    courseId: varchar("course_id", { length: 196 })
      .references(() => courseTable.id)
      .notNull(),
    userId: varchar("user_id", { length: 255 })
      .references(() => userTable.id)
      .notNull(),
    progress: int("user_progress")
      .$default(() => 0)
      .notNull(),
    currentLessonId: varchar("current_lesson_id", { length: 196 })
      .references(() => lessonTable.id)
      .notNull(),
    currentLessonIndex: tinyint("current_lesson_index")
      .references(() => lessonTable.index)
      .notNull(),
    score: int("student_score")
      .$default(() => 0)
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .onUpdateNow()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.courseId, table.userId] }),
    };
  },
);

export const commentsTable = createTable("comments", {
  id: varchar("id", { length: 196 }).primaryKey(),
  courseId: varchar("course_id", { length: 196 })
    .references(() => courseTable.id)
    .notNull(),
  userId: varchar("user_id", { length: 196 })
    .references(() => userTable.id)
    .notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  body: varchar("body", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .onUpdateNow()
    .default(sql`CURRENT_TIMESTAMP`),
});
