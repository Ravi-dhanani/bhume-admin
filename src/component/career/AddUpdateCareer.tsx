import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import RichTextEditer from "../common/RichTextEditer";
import ApiServices from "../services/Apiservices";

import IconButton from "@mui/material/IconButton";
import { useQuery } from "react-query";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const useStyles = makeStyles((theme: any) => ({
  editorContainer: {
    width: "100%", // Set the width of the container
    height: "440px", // Set the height of the container
  },
}));
export interface FormData {
  Date: any;
  language: string;
  title: string;
  shortDescription: string;
  LongDescription: string;
}
const schema = yup
  .object()
  .shape({
    language: yup.string().required(),
    title: yup.string().required(),
    shortDescription: yup.string().required(),
    longDescription: yup.string().required(),
    date: yup.string().required(),
  })
  .required();

interface IAddUpdateCareerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objCareer: any;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}
export default function AddUpdateCareer(props: IAddUpdateCareerProps) {
  const { objCareer, open, setOpen, isEdit } = props;
  const classes = useStyles();

  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const get_About_data = async (id: string) => {
    try {
      const res = await ApiServices.get_career_data(id);
      // setAbout(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  if (isEdit) {
    setValue("language", objCareer.language.title);
  }

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const onSubmit = async (data: any) => {
    if (!isEdit) {
      await ApiServices.add_career(data);
      handleClose();
      alert("Added Successfully");
    } else {
      await ApiServices.update_career(data, objCareer._id);
      handleClose();
      alert("Updated Successfully");
    }
    reset();
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 10 }}
              marginTop={1}
            >
              <Grid item xs={6}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    {...register("title")}
                    helperText={
                      errors.title?.message ? errors.title?.message : ""
                    }
                    defaultValue={isEdit ? objCareer.title : null}
                    error={errors.title?.message ? true : false}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <FormControl error={errors.language ? true : false} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>
                    <Controller
                      name="language"
                      control={control}
                      defaultValue={isEdit ? objCareer?.langauge : ""}
                      render={({ field }) => (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          {...field}
                          label="Language"
                        >
                          {lstLanguage &&
                            lstLanguage?.data?.map(
                              (item: any, index: number) => (
                                <MenuItem
                                  value={item._id}
                                  key={index}
                                  onClick={() => {
                                    get_About_data(item._id);
                                  }}
                                >
                                  {item?.title}
                                </MenuItem>
                              )
                            )}
                        </Select>
                      )}
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {errors.language && (
                        <span>{errors.language.message}</span>
                      )}
                    </FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <TextField
                    type="date"
                    fullWidth
                    {...register("date")}
                    margin="dense"
                    label="Date"
                    helperText={
                      errors.date?.message ? errors.date?.message : ""
                    }
                    defaultValue={isEdit ? objCareer.date : null}
                    error={errors.date?.message ? true : false}
                  />
                </div>
              </Grid>
              <Grid item xs={12} marginBottom={"20px"}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Short Description"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    {...register("shortDescription")}
                    helperText={
                      errors.shortDescription?.message
                        ? errors.shortDescription?.message
                        : ""
                    }
                    defaultValue={isEdit ? objCareer.shortDescription : null}
                    error={errors.shortDescription?.message ? true : false}
                  />
                </div>
                {/* <InputLabel id="demo-simple-select-label">
                  Short Description
                </InputLabel>
                <div className={classes?.editorContainer}>
                  <Controller
                    name="shortDescription"
                    control={control}
                    defaultValue={isEdit ? objCareer.shortDescription : null}
                    render={({ field }) => <RichTextEditer field={field} />}
                  />
                </div>
                <FormHelperText style={{ color: "red" }}>
                  {errors.shortDescription && (
                    <span>{errors.shortDescription.message}</span>
                  )}
                </FormHelperText> */}
              </Grid>
              <Grid item xs={12} marginBottom={"10px"}>
                <InputLabel id="demo-simple-select-label">
                  Long Description
                </InputLabel>
                <div className={classes?.editorContainer}>
                  <Controller
                    name="longDescription"
                    control={control}
                    defaultValue={isEdit ? objCareer.longDescription : null}
                    render={({ field }) => <RichTextEditer field={field} />}
                  />
                </div>
                <FormHelperText style={{ color: "red" }}>
                  {errors.longDescription && (
                    <span>{errors.longDescription.message}</span>
                  )}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#014aad" }}
              type="submit"
            >
              save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
