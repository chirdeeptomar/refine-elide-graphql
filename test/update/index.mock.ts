import nock from "nock";

import { ELIDE_GRAPHQL_ENDPOINT, ELIDE_SERVICE_URL } from "../utils"

nock(ELIDE_SERVICE_URL)
    .post(ELIDE_GRAPHQL_ENDPOINT,
        "{\"query\":\"mutation ($op: ElideRelationshipOp, $data: [PostInput]) {\\n      post (op: $op, data: $data) {\\n    edges { node { id } }\\n  }\\n    }\",\"variables\":{\"op\":\"UPDATE\",\"data\":{\"id\":1,\"title\":\"foo\",\"content\":\"bar\"}}}"
    )
    .reply(200,
        { "data": { "post": { "edges": [{ "node": { "id": 4 } }] } } }
    );
