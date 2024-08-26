interface Collection {
  dbId: string;
  id: string;
  name: string;
}

export const collections: Collection[] = [
  {
    dbId: process.env.REACT_APP_DATABASE_ID as string,
    id: process.env.REACT_APP_COLLECTION_ID_TEST as string,
    name: "test",
  },
];
