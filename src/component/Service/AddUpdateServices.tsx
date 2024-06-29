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
import React, { useState } from "react";
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
  language: string;
  shortDescription: string;
  LongDescription: string;
  title: string;
}
const schema = yup
  .object()
  .shape({
    language: yup.string().required(),
    title: yup.string().required(),
    shortDescription: yup.string().required(),
    longDescription: yup.string().required(),
  })
  .required();

interface IAddUpdateServicesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objServices: any;
  isEdit?: boolean;
  setIsEdit: (data: boolean) => void;
}
export default function AddUpdateServices(props: IAddUpdateServicesProps) {
  const { objServices, open, setOpen, isEdit } = props;
  const classes = useStyles();
  const [data, setData] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(null);

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

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const onSubmit = async (data: any) => {
    if (!isEdit) {
      await ApiServices.add_Services(data);
      handleClose();
      alert("Added Successfully");
    } else {
      await ApiServices.update_Services(data, objServices._id);

      handleClose();
      alert("Updated Successfully");
    }
    reset();
  };
  const getTitle = async (id: string) => {
    try {
      const res = await ApiServices.getLanguage(id);
      setData(res);
      // setValue("language", res._id);
      setId(res._id);
    } catch (err: any) {
      console.log(err);
    }
  };
  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });
  // React.useEffect(() => {
  //   const res = ApiServices.getLstLanguage();
  //   setData(res);
  // }, []);
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
                Services
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
                    focused
                    fullWidth
                    {...register("title")}
                    helperText={
                      errors.title?.message ? errors.title?.message : ""
                    }
                    defaultValue={isEdit ? objServices.title : null}
                    error={errors.title?.message ? true : false}
                  />
                </div>
                {/* <InputLabel id="demo-simple-select-label">
                  Short Description
                </InputLabel>
                <div className={classes?.editorContainer}>
                  <Controller
                    name="shortDescription"
                    control={control}
                    defaultValue={isEdit ? objServices.shortDescription : null}
                    render={({ field }) => <RichTextEditer field={field} />}
                  />
                </div>
                <FormHelperText style={{ color: "red" }}>
                  {errors.shortDescription && (
                    <span>{errors.shortDescription.message}</span>
                  )}
                </FormHelperText> */}
              </Grid>
              <Grid item xs={6} marginTop={"8px"}>
                <div>
                  <FormControl error={!!errors.language} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Language
                    </InputLabel>
                    <Controller
                      name="language"
                      control={control}
                      defaultValue={
                        objServices.language ? objServices.language : ""
                      }
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
                                    getTitle(item._id);
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
              <Grid item xs={12} marginBottom={"20px"}>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="short Description"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    {...register("shortDescription")}
                    helperText={
                      errors.shortDescription?.message
                        ? errors.shortDescription?.message
                        : ""
                    }
                    defaultValue={isEdit ? objServices.shortDescription : null}
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
                    defaultValue={isEdit ? objServices.shortDescription : null}
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
                    defaultValue={isEdit ? objServices.longDescription : null}
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
