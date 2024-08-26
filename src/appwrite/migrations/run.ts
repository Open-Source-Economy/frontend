import { DbSchema } from "./DbSchema";

// node -r ts-node --env-file=.env src/appwrite/migrations/run.ts
// Test
const schema = new DbSchema("46cc731e03276ea92202", "My DB Test");

async function migrate() {
  Promise.resolve("is runing")
  // await schema.createDatabase();
  // await schema.createRepository();
}

migrate()
  .then(() => {
    console.log("Migration complete");
  })
  .catch(e => {
    console.error(e);
  });
