import dataProvider from "../../src/index";
import client from "../utils";
import "./index.mock";

describe("create", () => {
    it("correct created response", async () => {
        const { data } = await dataProvider(client).create({
            resource: "post",
            variables: {
                title: "foo",
                content: "bar",
                category: {
                    id: "2",
                    title: "Python"
                },
            },
            meta: {
                fields: [
                    "id"
                ],
            },
        });

        expect(data.id).toBe(4)
    });

    // it("correct response without meta", async () => {
    //     const { data } = await dataProvider(client).create({
    //         resource: "posts",
    //         variables: {
    //             title: "foo",
    //             content: "bar",
    //             category: "2",
    //         },
    //     });

    //     expect(data["id"]).toEqual("44");
    // });
});
