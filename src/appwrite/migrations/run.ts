import { DbSchema } from "./DbSchema";

// ts-node -T -r dotenv/config src/appwrite/migrations/run.ts
async function main() {
  const schema = new DbSchema("46cc731e03276ea92202", "My DB Test");

  async function migrate() {
    Promise.resolve("is runing");
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
}

main();
