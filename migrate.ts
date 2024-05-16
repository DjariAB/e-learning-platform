import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createPool } from "mysql2/promise";

const sql = createPool({
  uri: process.env.DATABASE_URL,
  password: "Saif_bakziz3",
});

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./src/server/db/migration",
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
