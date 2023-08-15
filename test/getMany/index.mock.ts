import nock from "nock";
import { ELIDE_SERVICE_URL, ELIDE_GRAPHQL_ENDPOINT } from "../utils";

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($ids: [String]) { category (ids: $ids) { edges { node { id, title } } } }\",\"variables\":{\"ids\":[\"1\",\"2\"]}}"
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
        "{\"query\":\"query ($ids: [String]) { category (ids: $ids) { edges { node { id, title } } } }\",\"variables\":{\"ids\":[\"1\",\"4\"]}}"
    )
    .reply(
        200,
        {
            "errors": [
                {
                    "message": "Exception while fetching data (/category) : Unknown identifier [4] for category",
                    "locations": [
                        {
                            "line": 2,
                            "column": 3
                        }
                    ],
                    "path": [
                        "category"
                    ],
                    "extensions": {
                        "classification": "DataFetchingException"
                    }
                }
            ]
        }
    );
