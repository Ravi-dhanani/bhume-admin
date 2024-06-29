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
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as yup from "yup";
import RichTextEditer from "../common/RichTextEditer";
import ApiServices from "../services/Apiservices";

const schema = yup
  .object({
    title: yup.string().required(),
    language: yup.string().required(),
  })
  .required();
const useStyles = makeStyles((theme: any) => ({
  editorContainer: {
    width: "100%", // Set the width of the container
    height: "440px", // Set the height of the container
  },
}));
export default function TermsCondition() {
  const classes = useStyles();
  const lstLanguage = useQuery({
    queryKey: ["lstLanguage"],
    queryFn: ApiServices.getLstLanguage,
  });

  const [objTermsCondition, setObjTermsCodition] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(null);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const getTitle = async (id: string) => {
    try {
      const res = await ApiServices.getTermsCondition(id);
      setObjTermsCodition(res);
      setValue("title", res.title);
      setId(res._id);
    } catch (err: any) {
      console.log(err);
    }
  };
  const onSubmit = async (data: any) => {
    if (objTermsCondition !== null) {
      await ApiServices.update_TermsCondition(data, id);
      alert("Updated SucceesFully");
    } else {
      await ApiServices.add_TermsCondition(data);
      alert("Added SucceesFully ");
    }
  };
  React.useEffect(() => {
    const res = ApiServices.getLstLanguage();
    setObjTermsCodition(res);
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
            Terms & Condition
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
          <Grid item xs={6}>
            <div>
              <FormControl error={!!errors.language} fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Controller
                  name="language"
                  control={control}
                  defaultValue={
                    objTermsCondition?.title ? objTermsCondition?.title : null
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
                  {errors.language && <span>{errors.language.message}</span>}
                </FormHelperText>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} marginBottom={"20px"}>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <div className={classes?.editorContainer}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <RichTextEditer field={field} />}
              />
            </div>
            <FormHelperText style={{ color: "red" }}>
              {errors.title && <span>{errors.title.message}</span>}
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
