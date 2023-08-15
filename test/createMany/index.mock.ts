import nock from "nock";

import { ELIDE_GRAPHQL_ENDPOINT, ELIDE_SERVICE_URL } from "../utils"

nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"mutation ($op: ElideRelationshipOp, $data: [PostInput]) {\\n      post (op: $op, data: $data) {\\n    edges { node { id } }\\n  }\\n    }\",\"variables\":{\"op\":\"UPSERT\",\"data\":[{\"title\":\"foo\",\"content\":\"bar\",\"category\":{\"id\":\"2\",\"title\":\"Python\"}},{\"title\":\"hello\",\"content\":\"world\",\"category\":{\"id\":\"2\",\"title\":\"Python\"}}]}}"
    )
    .reply(200,
        {
            "data": {
                "post": {
                    "edges": [
                        {
                            "node": {
                                "id": 19
                            }
                        },
                        {
                            "node": {
                                "id": 20
                            }
                        }
                    ]
                }
            }
        });
