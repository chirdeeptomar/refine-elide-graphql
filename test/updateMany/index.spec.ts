import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("updateMany", () => {
    it("correct updated response", async () => {
        const { data } = await dataProvider(client).updateMany({
            resource: "post",
            ids: [1, 2],
            variables: [{
                id: 1,
                title: "foo",
                content: "bar"
            },
            {
                id: 2,
                title: "hello",
                content: "world"
            }],
            meta: {
                fields: ['id']
            },
        });

        expect(data.length).toBe(2)
    });
});
