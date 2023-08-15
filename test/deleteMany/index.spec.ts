import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("deleteMany", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).deleteMany({
            resource: "post",
            ids: ["5", "6"],
            meta: {
                fields: ["id"],
            },
        });
        expect(data.length).toBeFalsy();
    });

    it("correct response id doesn't exist", async () => {
        try {
            await dataProvider(client).deleteMany({
                resource: "post",
                ids: ["55", "56"],
                meta: {
                    fields: ["id"],
                },
            });
        } catch (error) {
            expect(error).toBeTruthy()
        }
    });
})