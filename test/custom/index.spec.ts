import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("custom", () => {
    it("correct get query response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "get",
            meta: {
                operation: "post",
                variables: {
                    sort: "id", // use "-id" for desc
                    filter: {
                        value: 'title==1'
                    },
                },
                fields: ["id", "title"],
            },
        });

        expect(response?.data.edges[0].node.id).toBe("9");
        expect(response?.data.edges[0].node.title).toBe("das");
    });

    it("correct get mutation response", async () => {
        const response = await dataProvider(client).custom?.({
            url: "",
            method: "post",
            meta: {
                operation: "post",
                variables: {
                    input: {
                        value: {
                            where: { id: "32" },
                            data: { title: "custom-foo" },
                        },
                        type: "PostInput",
                    },
                },
                fields: [
                    {
                        operation: "post",
                        fields: ["id", "title"],
                        variables: {},
                    },
                ],
            },
        });

        expect(response?.data.edges.node.id).toBe("32");
        expect(response?.data.edges.node.title).toBe("custom-foo");
    });
});