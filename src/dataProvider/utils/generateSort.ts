import { CrudSorting } from "@refinedev/core";

export const generateSort = (sorters?: CrudSorting) => {
    if (sorters && sorters.length > 0) {
        const sortQuery = sorters.map((i) => {
            return i.order === 'asc' ? `${i.field}` : `-${i.field}`;
        });

        return sortQuery.join();
    }

    return [];
};

/**
 * @deprecated Please use `generateSort` instead.
 */
export const genereteSort = generateSort;
