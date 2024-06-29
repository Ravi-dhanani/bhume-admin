import { yupResolver } from "@hookform/resolvers/yup";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ApiServices from "../services/Apiservices";

import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

interface IAddUpdateLanguageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objLanguage: any;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}

export default function AddUpdateLanguage(props: IAddUpdateLanguageProps) {
  const { objLanguage, open, setOpen, isEdit } = props;
  const objForm = useForm<any>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    if (!isEdit) {
      await ApiServices.add_language(data);
      handleClose();
      alert("Add Successfully");
    } else {
      await ApiServices.update_language(data, objLanguage._id);
      handleClose();
      alert("Updated Successfully");
    }
    objForm.reset("");
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          style={{
            backgroundColor: "#095192",
            color: "white",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom style={{ marginBottom: 0 }}>
                Career
              </Typography>
            </div>
            <div>
              <IconButton
                aria-label="delete"
                size="large"
                style={{
                  padding: "5px",
                  border: "1px solid gray",
                  backgroundColor: "white",
                }}
                onClick={() => setOpen(false)}
              >
                <CloseOutlinedIcon style={{ color: "black" }} />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 10 }}
              marginTop={1}
            >
              <Grid item xs={12}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Language"
                    variant="outlined"
                    fullWidth
                    {...objForm.register("title")}
                    helperText={
                      objForm.formState.errors.title?.message
                        ? "language is required field"
                        : ""
                    }
                    defaultValue={isEdit ? objLanguage.title : null}
                    error={
                      objForm.formState.errors.title?.message ? true : false
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#014aad" }}
            >
              save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
}
