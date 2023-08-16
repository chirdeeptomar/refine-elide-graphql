import { DataProvider, BaseRecord } from "@refinedev/core";
import { ClientError, GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";
import { generateFilter, generateSort } from "./utils";
import { GraphQLError } from "graphql";


const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
    return {
        getList: async ({ resource, pagination, sorters, filters, meta }) => {
            const {
                current = 1,
                pageSize = 10,
                mode = "server",
            } = pagination ?? {};

            const sortBy = generateSort(sorters);
            const filterBy = generateFilter(filters);

            const camelResource = camelCase(resource);

            const operation = meta?.operation ?? camelResource;

            const { query, variables } = gql.query([
                {
                    operation,
                    variables: {
                        ...meta?.variables,
                        ...(sorters?.length && { sort: sortBy }),
                        ...(filters?.length && { filter: { value: filterBy, type: "string" } }),
                        ...(mode === "server"
                            ? {
                                after: ((current - 1) * pageSize).toString(),
                                first: pageSize.toString(),
                            }
                            : {}),
                    },
                    fields: [
                        {
                            edges: [{ node: meta?.fields }],
                            pageInfo: [
                                'startCursor',
                                'endCursor',
                                'hasNextPage',
                                'totalRecords'
                            ]
                        }
                    ],
                },
            ]);

            try {
                const response = await client.request<BaseRecord>(query, variables);
                return {
                    'data': response[operation]?.edges.map((e: any) => e.node),
                    'total': response[operation]?.pageInfo?.totalRecords
                }
            }
            catch (error) {
                const err = error as ClientError
                throw (err.message)
            }
        },

        getMany: async ({ resource, ids, meta }) => {
            const camelResource = camelCase(resource);

            const operation = meta?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    ids: {
                        value: ids,
                        type: "[String]",
                    },
                },
                fields: [{ edges: [{ node: meta?.fields }] }],
            });

            try {

                const response = await client.request<BaseRecord>(query, variables);

                return {
                    data: response[operation]?.edges.map((e: any) => e.node),
                };
            }
            catch (error) {
                const err = error as ClientError
                throw (err.message)
            }
        },

        create: async ({ resource, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelCreateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'UPSERT',
                        type: 'ElideRelationshipOp'
                    },
                    data: {
                        value: { ...variables },
                        type: `[${capitalize(singularResource + 'Input')}]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            const response = await client.request<BaseRecord>(query, gqlVariables);

            return {
                data: response[operation]?.edges[0].node
            };
        },

        createMany: async ({ resource, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelCreateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'UPSERT',
                        type: 'ElideRelationshipOp'
                    },
                    data: {
                        value: variables,
                        type: `[${capitalize(singularResource + 'Input')}]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            const response = await client.request<BaseRecord>(query, gqlVariables);

            return {
                data: response[operation]?.edges.map((e: any) => e.node)
            };
        },

        update: async ({ resource, id, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelCreateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'UPDATE',
                        type: 'ElideRelationshipOp'
                    },
                    data: {
                        value: { ...variables },
                        type: `[${capitalize(singularResource + 'Input')}]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            const response = await client.request<BaseRecord>(query, gqlVariables);

            return {
                data: response[operation]?.edges[0].node
            };
        },

        updateMany: async ({ resource, ids, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelUpdateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'UPDATE',
                        type: 'ElideRelationshipOp'
                    },
                    data: {
                        value: variables,
                        type: `[${capitalize(singularResource + 'Input')}]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            const response = await client.request<BaseRecord>(query, gqlVariables);

            return {
                data: response[operation]?.edges.map((e: any) => e.node)
            };
        },

        getOne: async ({ resource, id, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelResource = camelCase(singularResource);

            const operation = meta?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    ids: { value: id, type: "[String]" },
                },
                fields: [
                    { edges: [{ node: meta?.fields }] }
                ],
            });

            try {
                const response = await client.request<BaseRecord>(query, variables);

                return {
                    data: response[operation]?.edges.map((e: any) => e.node)[0],
                };
            } catch (error) {
                const err = error as ClientError
                throw (err.response.errors)
            }
        },

        deleteOne: async ({ resource, id, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'DELETE',
                        type: 'ElideRelationshipOp'
                    },
                    ids: {
                        value: [id],
                        type: `[String]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            try {

                const response = await client.request<BaseRecord>(query, variables);

                return {
                    data: response[operation]
                }

            } catch (error) {
                const err = error as GraphQLError
                throw (err.message)
            }
        },

        deleteMany: async ({ resource, ids, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`${singularResource}`);

            const operation = meta?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    op: {
                        value: 'DELETE',
                        type: 'ElideRelationshipOp'
                    },
                    ids: {
                        value: ids,
                        type: `[String]`,
                    },
                },
                fields: [{ edges: [{ node: ["id"] }] }]
            });

            try {

                const response = await client.request<BaseRecord>(query, variables);

                return {
                    data: response[operation]
                }

            } catch (error) {
                const err = error as GraphQLError
                throw (err.message)
            }
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-graphql data provider.");
        },

        custom: async ({ url, method, headers, meta }) => {
            let gqlClient = client;

            if (url) {
                gqlClient = new GraphQLClient(url, { headers });
            }

            if (meta) {
                if (meta.operation) {
                    if (method === "get") {
                        const { query, variables } = gql.query({
                            operation: meta.operation,
                            variables: meta.variables,
                            fields: [
                                {
                                    edges: [{ node: meta?.fields }],
                                }],
                        });

                        const response = await gqlClient.request<BaseRecord>(
                            query,
                            variables,
                        );

                        return {
                            data: response[meta.operation],
                        };
                    } else {
                        const { query, variables } = gql.mutation({
                            operation: meta.operation,
                            variables: meta.variables,
                            fields: [
                                {
                                    edges: [{ node: meta?.fields }],
                                }],
                        });

                        const response = await gqlClient.request<BaseRecord>(
                            query,
                            variables,
                        );

                        return {
                            data: response[meta.operation],
                        };
                    }
                } else {
                    throw Error("GraphQL operation name required.");
                }
            } else {
                throw Error(
                    "GraphQL need to operation, fields and variables values in meta object.",
                );
            }
        },
    };
};

export default dataProvider;
