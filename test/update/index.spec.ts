import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("update", () => {
    it("correct updated response", async () => {
        const { data } = await dataProvider(client).update({
            resource: "post",
            id: 1,
            variables: {
                id: 1,
                title: "foo",
                content: "bar"
            },
            meta: {
                fields: ['id']
            },
        });

        expect(data.id).toBe(4)
    });
});
