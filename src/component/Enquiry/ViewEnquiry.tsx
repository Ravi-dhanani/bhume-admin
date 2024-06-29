import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IViewCareerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objInquiry?: any;
}
export default function ViewEnquiry(props: IViewCareerProps) {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth
      >
        <DialogTitle
          sx={{ m: 0, p: 2, bgcolor: "#014aad", color: "white" }}
          id="customized-dialog-title"
        >
          View Enquiry
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
          style={{
            backgroundColor: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1" fontWeight={"600"} gutterBottom>
                    Name:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {props.objInquiry && props.objInquiry.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1" fontWeight={"600"} gutterBottom>
                    Email:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {props.objInquiry && props.objInquiry.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1" fontWeight={"600"} gutterBottom>
                    Mobile No:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {props.objInquiry && props.objInquiry.mobileNo}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1" fontWeight={"600"} gutterBottom>
                    Message:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {props.objInquiry && props.objInquiry.message}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1" fontWeight={"600"} gutterBottom>
                    Date:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {props.objInquiry && props.objInquiry.Date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ color: "#014aad" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
