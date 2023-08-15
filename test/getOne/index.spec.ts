import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("getOne", () => {
    it("correct response", async () => {
        const { data } = await dataProvider(client).getOne({
            resource: "category",
            id: "1",
            meta: {
                fields: [
                    "id",
                    "title"
                ],
            },
        });

        expect(data["title"]).toEqual("Java");
    });
});

describe("getOne", () => {
    it("correct response with error", async () => {
        try {
            await dataProvider(client).getOne({
                resource: "category",
                id: "99",
                meta: {
                    fields: [
                        "id",
                        "title"
                    ],
                },
            });
        }
        catch (err) {
            expect(err).toBeTruthy()
            expect(err[0].message).toEqual('Exception while fetching data (/category) : Unknown identifier [99] for category')
        }
    });
});