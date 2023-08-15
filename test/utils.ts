import { GraphQLClient } from "graphql-request";

export function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const ELIDE_SERVICE_URL = 'http://localhost:8080'
export const ELIDE_GRAPHQL_ENDPOINT = '/graphql/api/v1'

const client = new GraphQLClient(`${ELIDE_SERVICE_URL}${ELIDE_GRAPHQL_ENDPOINT}`);

export default client;