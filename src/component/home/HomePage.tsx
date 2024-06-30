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
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";
import ApiServices from "../services/Apiservices";
import RichTextEditer from "../common/RichTextEditer";

const schema = yup
  .object({
    title: yup.string().required(),
    language_id: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
const useStyles = makeStyles((theme: any) => ({
  editorContainer: {
    width: "100%", // Set the width of the container
    height: "440px", // Set the height of the container
  },
}));
export default function HomePage() {
  const classes = useStyles();
  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });

  const [objHome, setObjHome] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(null);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getTitle = async (id: string) => {
    try {
      const res = await ApiServices.getTitle(id);
      setObjHome(res);
      setValue("title", res.title);
      setValue("description", res.description);
      setId(res._id);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onSubmit = async (data: any) => {
    if (objHome !== null) {
      await ApiServices.update_title(data, id);
      alert("updated");
    } else {
      await ApiServices.add_title(data);
      alert("Added");
    }
  };
  React.useEffect(() => {
    const res = ApiServices.getLstLanguage();
    setObjHome(res);
  }, []);
  return (
    <React.Fragment>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Home
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 10 }}
          marginTop={2}
        >
          <Grid item xs={6} marginTop={"17px"}>
            <div>
              <FormControl error={!!errors.language_id} fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Controller
                  name="language_id"
                  control={control}
                  defaultValue={
                    objHome?.title ? objHome?.title : objHome?.title
                  }
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
                              getTitle(item._id);
                            }}
                          >
                            {item?.title}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: "red" }}>
                  {errors.language_id && (
                    <span>{errors.language_id.message}</span>
                  )}
                </FormHelperText>
              </FormControl>
            </div>
          </Grid>

          <Grid item xs={12} marginBottom={"10px"}>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.title && <span>{errors.title.message}</span>}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} marginBottom={"20px"}>
            <InputLabel id="demo-simple-select-label">Description</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }} // Apply validation rules
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.description && <span>{errors.description.message}</span>}
            </FormHelperText>
          </Grid>
          <Grid
            item
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
              style={{
                backgroundColor: "#014aad",
              }}
              size="large"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
