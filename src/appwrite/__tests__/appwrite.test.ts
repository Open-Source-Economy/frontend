import {getDb} from "./databases";


type Response = {
    documents: [];
    body: string;
};

// type Metadata = {
//     "$collectionId": "66c9d98c000481b7cb8f",
//     "$createdAt": "2024-08-26T10:38:51.094+00:00",
//     "$databaseId": "66c9d9760018da59ef2f",
//     "$id": "66cc5b3a0030272018b3",
//     "$permissions": [],
//     "$tenant": "190051",
//     "$updatedAt": "2024-08-26T10:38:51.094+00:00",
// }


export class Test {
    id: number | null;
    name: string;

    constructor(id: number | null, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json: any): Test | Error {
        if (!json.name || typeof json.name !== "string") {
            return new Error("Invalid JSON: name is missing or not a string");
        }

        const id = json.id ? json.id : null;
        return new Test(id, json.name);
    }
}


describe('Test', () => {
    test('list', async () => {
        const db = getDb();
        const response = await db.test.list();
        Test.fromJson(response);
        expect(response).toEqual({"documents": [], "total": 0});
    });

    test('should throw error if no recipients are provided', async () => {
        const db = getDb();
        const payload = { name: "Lauriane" };
        const response: Test = await db.test.create(
            {
                id: null,
                name: payload.name,
            }
        );
        const test = Test.fromJson(response);
        expect(test).toEqual(new Test(null, "Lauriane"));
    });
});