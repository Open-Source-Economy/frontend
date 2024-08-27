import { Client, Databases, Permission, Role } from "node-appwrite";

export class DbSchema {
  databaseId: string;
  databaseName: string;
  databases: Databases;

  constructor(databaseId: string, databaseName: string) {
    this.databaseId = databaseId;
    this.databaseName = databaseName;
    this.databases = new Databases(DbSchema.getClient());
  }

  private static getClient() {
    if (!process.env.REACT_APP_APP_WRITE_ENDPOINT) {
      throw new Error("REACT_APP_APP_WRITE_ENDPOINT is required");
    } else if (!process.env.REACT_APP_APP_WRITE_PROJECT_ID) {
      throw new Error("REACT_APP_APP_WRITE_PROJECT_ID is required");
    } else if (!process.env.REACT_APP_APP_WRITE_API_KEY) {
      throw new Error("REACT_APP_APP_WRITE_API_KEY is required");
    }

    return new Client()
      .setEndpoint(process.env.REACT_APP_APP_WRITE_ENDPOINT)
      .setProject(process.env.REACT_APP_APP_WRITE_PROJECT_ID)
      .setKey(process.env.REACT_APP_APP_WRITE_API_KEY);
  }

  async createDatabase() {
    return this.databases.create(this.databaseId, this.databaseName);
  }

  async createRepository(): Promise<void> {
    if (!process.env.REACT_APP_APP_WRITE_REPOSITORY_COLLECTION_ID) {
      throw new Error("REACT_APP_APP_WRITE_REPOSITORY_COLLECTION_ID is required");
    }

    const collectionId = process.env.REACT_APP_APP_WRITE_REPOSITORY_COLLECTION_ID;

    //appwrite.io/docs/references/cloud/server-nodejs/databases#databasesCreateCollection
    https: await this.databases.createCollection(
      this.databaseId,
      collectionId,
      "Repository",
      [
        Permission.read(Role.any()), // Anyone can view this document
        Permission.create(Role.any()),
        Permission.write(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
        // Permission.update(Role.team("writers")),      // Writers can update this document
        // Permission.update(Role.team("admin")),        // Admins can update this document
        // Permission.delete(Role.user("5c1f88b42259e")), // User 5c1f88b42259e can delete this document
        // Permission.delete(Role.team("admin"))          // Admins can delete this document
      ],
      // false, // documentSecurity (optional)
      // false, // enabled (optional)
    );

    await this.databases.createStringAttribute(this.databaseId, collectionId, "name", 200, false);
  }

  async delete() {
    return this.databases.delete(this.databaseId);
  }
}
