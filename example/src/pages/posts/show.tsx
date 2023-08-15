import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    RefreshButton,
    ListButton,
    EditButton,
    MarkdownField,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";
import { Post } from "../../models/types";

export const PostShow = () => {
    const { queryResult } = useShow<Post>({
        meta: {
            fields: ["id", "title", "content", { "category": [{ "edges": [{ node: ["id", "title"] }] }] }],
        }
    });

    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}
            headerProps={{
                action:
                    <>
                        <ListButton />
                        <EditButton />
                        <RefreshButton onClick={() => queryResult.refetch()} />
                    </>
            }}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    Content
                </Typography>
                <MarkdownField value={record?.content || ""} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>

                <>{record?.category?.edges?.at(0)?.node?.title}</>
            </Stack>
        </Show>
    );
};