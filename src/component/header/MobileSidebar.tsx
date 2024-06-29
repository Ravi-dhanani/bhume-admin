import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebar } from "./Sidebar";
interface IMobileSidebar {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MobileSidebar(props: IMobileSidebar) {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    props.setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sidebar?.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate(`/${item.route}`);
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 48,
                cursor: "pointer",
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  location.pathname == item.route ? "#095192" : "white",
                color: location.pathname == item.route ? "white" : "gray",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: props.open ? 3 : "auto",
                  display: "flex",
                  alignItems: "center",
                  color: location.pathname == item.route ? "white" : "gray",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.Name}
                sx={{ opacity: props.open ? 1 : 0 }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{ marginTop: "50px" }}>
      <Drawer open={props.open} onClose={toggleDrawer(false)}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        {DrawerList}
      </Drawer>
    </div>
  );
}
