import nock from "nock";
import { ELIDE_GRAPHQL_ENDPOINT, ELIDE_SERVICE_URL } from "../utils";

nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"mutation ($op: ElideRelationshipOp, $ids: [String]) {\\n      post (op: $op, ids: $ids) {\\n    edges { node { id } }\\n  }\\n    }\",\"variables\":{\"op\":\"DELETE\",\"ids\":[\"5\"]}}"
    )
    .reply(200,
        {
            "data": {
                "post": {
                    "edges": []
                }
            }
        }
    );


nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"mutation ($op: ElideRelationshipOp, $ids: [String]) {\\n      post (op: $op, ids: $ids) {\\n    edges { node { id } }\\n  }\\n    }\",\"variables\":{\"op\":\"DELETE\",\"ids\":[\"55\"]}}"
    )
    .reply(200,
        {
            "timestamp": "2023-08-15T22:42:36.558+00:00",
            "status": 500,
            "error": "Internal Server Error",
            "path": "/graphql/api/v1"
        }
    );