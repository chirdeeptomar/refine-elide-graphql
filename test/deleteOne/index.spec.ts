import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("deleteOne", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).deleteOne({
            resource: "post",
            id: "5",
            meta: {
                fields: ["id"],
            },
        });
        expect(data.edges.length).toBeFalsy();
    });

    it("correct response id doesn't exist", async () => {
        try {
            await dataProvider(client).deleteOne({
                resource: "post",
                id: "55",
                meta: {
                    fields: ["id"],
                },
            });
        } catch (error) {
            expect(error).toBeTruthy()
        }
    });
});