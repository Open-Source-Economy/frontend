import { getDb } from "../databases";
import { ID } from "node-appwrite";
import { DbSchema } from "../migrations/DbSchema";

export class TestModel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json: any): TestModel | Error {
    if (!json.id || typeof json.id !== "string") {
      return new Error("Invalid JSON: id is missing or not a string");
    }
    if (!json.name || typeof json.name !== "string") {
      return new Error("Invalid JSON: name is missing or not a string");
    }

    const id = json.id ? json.id : null;
    return new TestModel(id, json.name);
  }
}

describe("Test", () => {
  const schema = new DbSchema("46cc731e03276ea92204", "My DB Test");

  beforeAll(() => {
    schema.createDatabase();
    schema.createRepository();
  });

  afterAll(() => {
    schema.delete();
  });

  test("list", async () => {
    const db = getDb();
    const response = await db.test.list();
    TestModel.fromJson(response);
    expect(response).toEqual({ documents: [], total: 0 });
  });

  test("create new entry", async () => {
    const db = getDb();
    const payload = { name: "Lauriane" };
    const id = ID.unique();
    const createResponse: TestModel = await db.test.create(id, {
      id: null,
      name: payload.name,
    });
    const getResponse: TestModel = await db.test.get(id);

    const expected = new TestModel(id, "Lauriane");
    expect(TestModel.fromJson(createResponse)).toEqual(expected);
    expect(TestModel.fromJson(expected)).toEqual(expected);
  });
});
