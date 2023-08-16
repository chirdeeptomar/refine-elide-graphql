import nock from "nock";
import { ELIDE_SERVICE_URL, ELIDE_GRAPHQL_ENDPOINT } from "../utils";

nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"query ($sort: String, $filter: String) { post (sort: $sort, filter: $filter) { edges { node { id, title } } } }\",\"variables\":{\"sort\":\"id\",\"filter\":\"title==1\"}}"
    )
    .reply(
        200,
        {
            "data": {
                "post": {
                    "edges": [
                        {
                            "node": {
                                "id": "9",
                                "title": "das"
                            }
                        }
                    ]
                }
            }
        }
    );

nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"mutation ($input: PostInput) {\\n      post (input: $input) {\\n    edges { node { post  { id, title } } }\\n  }\\n    }\",\"variables\":{\"input\":{\"where\":{\"id\":\"32\"},\"data\":{\"title\":\"custom-foo\"}}}}"
    )
    .reply(
        200,
        {
            "data": {
                "post": {
                    "edges":
                    {
                        "node": {
                            "id": "32",
                            "title": "custom-foo"
                        }
                    }

                }
            }
        }
    );
