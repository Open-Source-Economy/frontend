import { ID } from "appwrite";
import { getDatabases } from "./config";

interface Collection {
  dbId: string;
  id: string;
  name: string;
}

interface Database {
  create: (name: any, permissions?: any) => Promise<any>;

  update: (id: string, name: any, permissions: any) => Promise<any>;

  delete: (id: string) => Promise<any>;

  list: (queries?: any[]) => Promise<any>;

  get: (id: string) => Promise<any>;
}

interface DB {
  [key: string]: Database;
}

export function getDb(): DB {
  const databases = getDatabases();
  const db: DB = {};

  const collections: Collection[] = [
    {
      dbId: process.env.REACT_APP_DATABASE_ID as string,
      id: process.env.REACT_APP_COLLECTION_ID_TEST as string,
      name: "test",
    },
  ];

  collections.forEach(col => {
    db[col.name] = {
      create: (name, permissions) => databases.createDocument(col.dbId, col.id, ID.unique(), name, permissions),

      update: (id, name, permissions) => databases.updateDocument(col.dbId, col.id, id, name, permissions),

      delete: id => databases.deleteDocument(col.dbId, col.id, id),

      list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

      get: id => databases.getDocument(col.dbId, col.id, id),
    };
  });

  return db;
}
