import { getDatabases } from "./config";
import { collections } from "./collections";

interface Database {
  create: (id: string, payload: any, permissions?: any) => Promise<any>;

  update: (id: string, payload: any, permissions: any) => Promise<any>;

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

  collections.forEach(col => {
    db[col.name] = {
      create: (id: string, payload, permissions) => databases.createDocument(col.dbId, col.id, id, payload, permissions),
      update: (id, payload, permissions) => databases.updateDocument(col.dbId, col.id, id, payload, permissions),
      delete: id => databases.deleteDocument(col.dbId, col.id, id),
      list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
      get: id => databases.getDocument(col.dbId, col.id, id),
    };
  });

  return db;
}
