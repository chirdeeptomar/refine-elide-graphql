import client from "../utils";
import dataProvider from "../../src/index";
import "./index.mock";

describe("getList", () => {
    it("correct all response", async () => {

        const { data } = await dataProvider(client)
            .getList({
                resource: "category",
                meta: {
                    fields: ["id", "title"],
                },
            });
        expect(data.length).toBe(4)
        expect(data[0]["id"]).toBe("1");
        expect(data[0]["title"]).toBe("Java");
    });

    it("correct sorted response", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "category",
            sorters: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data[0]["id"]).toBe("4");
        expect(data[0]["title"]).toBe(".NET");
    });

    it("correct filter response: eq", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "category",
            filters: [
                {
                    field: "id",
                    operator: "eq",
                    value: "4",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.length).toBe(1)
        expect(data[0]["title"]).toBe(".NET")
    });

    it("correct filter response: ne", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "category",
            filters: [
                {
                    field: "id",
                    operator: "ne",
                    value: "4",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.length).toBe(3)
    });

    it("correct filter response: ne, startswith", async () => {
        const { data } = await dataProvider(client).getList({
            resource: "category",
            filters: [
                {
                    field: "id",
                    operator: "ne",
                    value: "4",
                },
                {
                    field: "title",
                    operator: "startswith",
                    value: "P"
                }
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(data.length).toBe(1)
    });

    it("correct filter and sort response", async () => {
        const response = await dataProvider(client).getList({
            resource: "category",
            filters: [
                {
                    field: "title",
                    operator: "startswith",
                    value: "P",
                },
            ],
            sorters: [
                {
                    field: "title",
                    order: "asc",
                },
            ],
            meta: {
                fields: ["id", "title"],
            },
        });

        expect(response.data.length).toBe(2);
    });

    it("correct filter with no response", async () => {
        try {
            const response = await dataProvider(client).getList({
                resource: "category",
                filters: [
                    {
                        field: "id",
                        operator: "eq",
                        value: "500",
                    },
                ],
                meta: {
                    fields: ["id", "title"],
                },
            });
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});
