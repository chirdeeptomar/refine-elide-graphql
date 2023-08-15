import React from "react";
import { List, useDataGrid, ShowButton, EditButton, DeleteButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Post, PostConnection } from "../../models/types";

export const PostList = () => {
    const { dataGridProps } = useDataGrid<PostConnection>({
        resource: "post",
        syncWithLocation: true,
        meta: {
            fields: [
                'id',
                'title',
                'content',
                { "category": [{ "edges": [{ node: ["id", "title"] }] }] }
            ],
        },
        sorters: {
            initial: [
                {
                    field: "id", order: "desc"
                }
            ]
        }
    });

    const columns = React.useMemo<GridColDef<Post>[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                headerName: "Title",
                minWidth: 200,
            },
            {
                field: "category",
                headerName: "Category",

                minWidth: 300,
                renderCell: function render({ row }) {
                    return <>{row.category?.edges?.at(0)?.node?.title}</>
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                disableColumnMenu: true,
                renderCell: function render({ row }) {
                    return <>
                        <ShowButton size="small" recordItemId={row.id} color={"success"} hideText />
                        <EditButton size="small" recordItemId={row.id} hideText />
                        <DeleteButton size="small" recordItemId={row.id} hideText />
                    </>
                },
                align: "center",
                headerAlign: "center",
                minWidth: 100,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
