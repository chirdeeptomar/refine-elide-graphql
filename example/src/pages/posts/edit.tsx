import { Edit, ListButton, RefreshButton, useAutocomplete } from "@refinedev/mui";
import { TextField, Box, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { Post } from "../../models/types";

export const PostEdit = () => {
    const {
        saveButtonProps,
        register,
        control,
        refineCore: { queryResult },
        formState: { errors },
    } = useForm<Post, HttpError, Post>({
        refineCoreProps: {
            meta: {
                fields: [
                    "id",
                    "title",
                    "content",
                    { "category": [{ "edges": [{ node: ["id"] }] }] }
                ]
            },
        }
    });

    function selector(data: any) {
        const projection = {
            data: data.data.map((p: any) => p),
            total: data.total
        }
        return projection
    }

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "category",
        defaultValue: queryResult?.data?.data.category?.edges?.flatMap((d) => d?.node?.id),
        meta: {
            fields: ["id", "title"],
        },
        queryOptions: {
            select: selector
        }
    });

    return (
        <Edit saveButtonProps={saveButtonProps} deleteButtonProps={{ size: "medium" }}
            headerProps={{
                action:
                    <>
                        <ListButton />
                        <RefreshButton onClick={() => queryResult?.refetch()} />
                    </>
            }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="on"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Id"
                    name="id"
                    disabled
                />
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Title"
                    name="title"
                />
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.content}
                    helperText={(errors as any)?.content?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label="Content"
                    name="content"
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...categoryAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                if (categoryAutocompleteProps.options.length > 0) {
                                    return (
                                        categoryAutocompleteProps?.options?.find((p) => p?.id?.toString() === item.edges?.at(0)?.node?.id)
                                            ?.title ?? item.title
                                    )
                                }

                            }}
                            isOptionEqualToValue={(option, value) => {
                                return value === undefined || option?.id?.toString() === (value?.id)?.toString() ||
                                    option?.id?.toString() === (value.edges?.at(0).node?.id)?.toString()
                            }
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.category?.id}
                                    helperText={
                                        (errors as any)?.category?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
