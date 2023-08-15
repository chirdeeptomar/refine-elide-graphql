import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("create", () => {
    it("correct created many response", async () => {
        const { data } = await dataProvider(client).createMany({
            resource: "post",
            variables: [
                {
                    title: "foo",
                    content: "bar",
                    category: {
                        id: "2",
                        title: "Python"
                    }
                },
                {
                    title: "hello",
                    content: "world",
                    category: {
                        id: "2",
                        title: "Python"
                    }
                }
            ],
            meta: {
                fields: [
                    "id"
                ],
            },
        });

        expect(data.length).toBe(2)
    });
}
);