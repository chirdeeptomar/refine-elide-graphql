import { Edit, ListButton, RefreshButton } from "@refinedev/mui";
import { TextField, Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError } from "@refinedev/core";
import { Category } from "../../models/types";

export const CategoryEdit = () => {
    const {
        saveButtonProps,
        register,
        refineCore: { queryResult },
        formState: { errors },
    } = useForm<Category, HttpError, Category>({
        refineCoreProps: {
            meta: {
                fields: ["id", "title"]
            },
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
                autoComplete="off"
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
            </Box>
        </Edit>
    );
};