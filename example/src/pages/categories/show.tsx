import { useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    RefreshButton,
    ListButton,
    EditButton,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

export const CategoryShow = () => {
    const { queryResult } = useShow({
        meta: {
            fields: ["id", "title"],
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
            </Stack>
        </Show>
    );
};