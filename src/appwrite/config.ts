import { Client, Databases } from "node-appwrite";

export function getClient(): Client {
  if (!process.env.REACT_APP_APP_WRITE_ENDPOINT) {
    throw new Error("REACT_APP_APP_WRITE_ENDPOINT is required");
  } else if (!process.env.REACT_APP_APP_WRITE_PROJECT_ID) {
    throw new Error("REACT_APP_APP_WRITE_PROJECT_ID is required");
  }

  return new Client().setEndpoint(process.env.REACT_APP_APP_WRITE_ENDPOINT).setProject(process.env.REACT_APP_APP_WRITE_PROJECT_ID);
}
export function getDatabases(): Databases {
  return new Databases(getClient());
}
