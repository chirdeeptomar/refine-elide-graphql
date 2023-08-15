import client from "../utils";
import dataProvider from "../../src/index";
import "./index.mock";

it("correct many by ids", async () => {
    const response = await dataProvider(client).getMany({
        resource: "category",
        ids: ["1", "2"],
        meta: {
            fields: ["id", "title"],
        },
    });

    expect(response.data.length).toBe(2);
});

it("correct response with non-existing ids", async () => {
    try {
        await dataProvider(client).getMany({
            resource: "category",
            ids: ["1", "4"],
            meta: {
                fields: ["id", "title"],
            },
        });
    } catch (error) {
        expect(error).toBeTruthy();
    }
});