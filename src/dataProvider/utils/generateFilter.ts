import { CrudFilters, CrudOperators, LogicalFilter } from "@refinedev/core";


const OPERATOR_RSQL_MAPPING: Record<CrudOperators, Function> = {
    eq: (value: string) => `==${value}`,
    ne: (value: string) => `!=${value}`,
    lt: (value: string) => `<${value}`,
    gt: (value: string) => `>${value}`,
    lte: (value: string) => `<=${value}`,
    gte: (value: string) => `>=${value}`,
    in: (value: string) => `=in=${value}`,
    nin: (value: string) => `=out=${value}`,
    contains: (value: string) => `=in=${value}`,
    ncontains: (value: string) => `=outi=${value}`,
    containss: (value: string) => `=ini=${value}`,
    ncontainss: (value: string) => `=ou=${value}`,
    between: (value: string) => `=between=${value}`,
    nbetween: (value: string) => `=notbetween=${value}`,
    null: (value: string) => `=isnull=${value}`,
    nnull: (value: string) => `=isnull=${value}`,
    startswith: (value: string) => `=ini=${value}*`,
    nstartswith: (value: string) => { throw Error("Unsupported nstartswith") },
    startswiths: (value: string) => `==${value}*`,
    nstartswiths: (value: string) => { throw Error("Unsupported nstartswiths") },
    endswith: (value: string) => `==*${value}`,
    nendswith: (value: string) => { throw Error("Unsupported nendswith") },
    endswiths: (value: string) => `=ini=*${value}`,
    nendswiths: (value: string) => { throw Error("Unsupported nendswiths") },
    or: (value: string) => "",
    and: (value: string) => "",
}

const buildFilter = (filter: LogicalFilter) => `${filter.field}` + OPERATOR_RSQL_MAPPING[`${filter.operator}`](filter.value);

export const generateFilter = (filters?: CrudFilters) => {
    let queryFilters: string = "";

    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or" && filter.operator !== "and" && "field" in filter) {

                if (queryFilters.length > 0)
                    queryFilters += `,${buildFilter(filter)}`;
                else
                    queryFilters += `${buildFilter(filter)}`;

            } else {
                const value = filter.value as LogicalFilter[];

                let orFilters: string = "";

                value.forEach((val) => {
                    if (orFilters.length > 0)
                        orFilters += `,${buildFilter(val)}`;
                    else
                        orFilters += `${buildFilter(val)}`;
                });

                queryFilters += "," + orFilters;
            }
        });
    }

    return queryFilters;
};
