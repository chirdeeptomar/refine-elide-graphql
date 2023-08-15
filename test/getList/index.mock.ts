import nock from "nock";
import { ELIDE_SERVICE_URL, ELIDE_GRAPHQL_ENDPOINT } from "../utils";

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($after: String, $first: String) { category (after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "1",
                                "title": "Java"
                            }
                        },
                        {
                            "node": {
                                "id": "2",
                                "title": "Python"
                            }
                        },
                        {
                            "node": {
                                "id": "3",
                                "title": "Big data"
                            }
                        },
                        {
                            "node": {
                                "id": "4",
                                "title": ".NET"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 4,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "4"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($sort: String, $after: String, $first: String) { category (sort: $sort, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"sort\":\"-id\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "4",
                                "title": ".NET"
                            }
                        },
                        {
                            "node": {
                                "id": "3",
                                "title": "Big data"
                            }
                        },
                        {
                            "node": {
                                "id": "2",
                                "title": "Python"
                            }
                        },
                        {
                            "node": {
                                "id": "1",
                                "title": "Java"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 4,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "4"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($filter: string, $after: String, $first: String) { category (filter: $filter, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"filter\":\"id==4\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "4",
                                "title": ".NET"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 4,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "4"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($filter: string, $after: String, $first: String) { category (filter: $filter, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"filter\":\"id!=4\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "1",
                                "title": "Java"
                            }
                        },
                        {
                            "node": {
                                "id": "2",
                                "title": "Python"
                            }
                        },
                        {
                            "node": {
                                "id": "3",
                                "title": "Big data"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 3,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "3"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($filter: string, $after: String, $first: String) { category (filter: $filter, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"filter\":\"id!=4,title=ini=P*\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "2",
                                "title": "Python"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 1,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "1"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($sort: String, $filter: string, $after: String, $first: String) { category (sort: $sort, filter: $filter, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"sort\":\"title\",\"filter\":\"title=ini=P*\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "category": {
                    "edges": [
                        {
                            "node": {
                                "id": "2",
                                "title": "Python"
                            }
                        }, {
                            "node": {
                                "id": "2",
                                "title": "Perl"
                            }
                        }
                    ],
                    "pageInfo": {
                        "totalRecords": 2,
                        "hasNextPage": false,
                        "startCursor": "0",
                        "endCursor": "2"
                    }
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($filter: string, $after: String, $first: String) { category (filter: $filter, after: $after, first: $first) { edges { node { id, title } }, pageInfo { startCursor, endCursor, hasNextPage, totalRecords } } }\",\"variables\":{\"filter\":\"id==500\",\"after\":\"0\",\"first\":\"10\"}}"
    )
    .reply(
        200,
        {
            "errors": [
                {
                    "message": "No such association ids for type category\nNo such association ids for type category"
                }
            ]
        }
    );