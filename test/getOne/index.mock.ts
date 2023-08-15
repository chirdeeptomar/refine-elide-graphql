import nock from "nock";
import { ELIDE_SERVICE_URL, ELIDE_GRAPHQL_ENDPOINT } from "../utils";

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($ids: [String]) { category (ids: $ids) { edges { node { id, title } } } }\",\"variables\":{\"ids\":\"1\"}}")
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
                        }
                    ]
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL, { encodedQueryParams: true })
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($ids: [String]) { category (ids: $ids) { edges { node { id, title } } } }\",\"variables\":{\"ids\":\"99\"}}")
    .reply(
        200,
        {
            "data": {
                "category": null
            },
            "errors": [
                {
                    "message": "Exception while fetching data (/category) : Unknown identifier [99] for category",
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