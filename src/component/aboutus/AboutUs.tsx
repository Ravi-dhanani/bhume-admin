import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";
import RichTextEditer from "../common/RichTextEditer";
import ApiServices from "../services/Apiservices";

const useStyles = makeStyles((theme: any) => ({
  editorContainer: {
    width: "100%", // Set the width of the container
    height: "440px", // Set the height of the container
  },
}));
const schema = yup.object({
  language: yup.string().required(),
  title: yup.string().required(),
  shortDescription: yup.string().required(),
  section1: yup.string().required(),
  section2: yup.string().required(),
  section3: yup.string().required(),
});
export default function AboutUs() {
  const classes = useStyles();
  const [objAbout, setAbout] = React.useState<any>("");
  const [id, setId] = React.useState("");
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const get_About_data = async (id: string) => {
    try {
      const res = await ApiServices.get_about_data(id);
      setAbout(res);
      setValue("section1", res.section1);
      setValue("section2", res.section2);
      setValue("section3", res.section3);
      setValue("title", res.title);
      setValue("shortDescription", res.shortDescription);
      setId(res._id);
    } catch (err: any) {
      console.log(err);
    }
  };
  const onSubmit = async (data: any) => {
    if (objAbout !== null) {
      try {
        await ApiServices.update_about(data, id);
        alert("Update Successfully");
      } catch (err: any) {
        console.log(err);
      }
    } else {
      await ApiServices.add_About(data);
      alert("Added Successfully");
    }
  };
  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });

  return (
    <React.Fragment>
      <Box>
        <Box>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 10 }}
          marginTop={2}
        >
          <Grid item xs={6}>
            <div>
              <TextField
                id="outlined-basic"
                label="titles"
                variant="outlined"
                focused
                {...register("title")}
                fullWidth
                defaultValue={objAbout?.title ? objAbout?.title : ""}
                helperText={errors.title ? errors.title.message : null}
                error={errors.title ? true : false}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <FormControl error={errors.language ? true : false} fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Controller
                  name="language"
                  control={control}
                  defaultValue={objAbout?.language ? objAbout.language : ""}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...field}
                      label="Language"
                    >
                      {lstLanguage &&
                        lstLanguage?.data?.map((item: any, index: number) => (
                          <MenuItem
                            value={item._id}
                            key={index}
                            onClick={() => {
                              get_About_data(item._id);
                            }}
                          >
                            {item?.title}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: "red" }}>
                  {errors.language && <span>{errors.language.message}</span>}
                </FormHelperText>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} marginBottom={"2px"}>
            <InputLabel id="demo-simple-select-label">
              Sort Description
            </InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="shortDescription"
                control={control}
                defaultValue={
                  objAbout?.shortDescription ? objAbout?.shortDescription : ""
                }
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.shortDescription && (
                <span>{errors.shortDescription.message}</span>
              )}
            </FormHelperText>
          </Grid>
          <Grid item xs={6} marginBottom={"20px"}>
            <InputLabel id="demo-simple-select-label">Section 1</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="section1"
                control={control}
                // defaultValue={objAbout?.section1 ? objAbout?.section1 : ""}
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.section1 && <span>{errors.section1.message}</span>}
            </FormHelperText>
          </Grid>

          <Grid item xs={6} marginBottom={"20px"}>
            <InputLabel id="demo-simple-select-label">Section 2</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="section2"
                control={control}
                // defaultValue={objAbout?.section1 ? objAbout?.section1 : ""}
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.section2 && <span>{errors.section2.message}</span>}
            </FormHelperText>
          </Grid>
          <Grid item xs={6} marginBottom={"20px"}>
            <InputLabel id="demo-simple-select-label">Section 3</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="section3"
                control={control}
                // defaultValue={objAbout?.section1 ? objAbout?.section1 : ""}
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.section3 && <span>{errors.section3.message}</span>}
            </FormHelperText>
          </Grid>

          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#014aad" }}
              size="large"
            >
              save
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
