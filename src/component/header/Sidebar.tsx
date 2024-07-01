import ArticleIcon from "@mui/icons-material/Article";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface ISidebar {
  open: boolean;
}

export const sidebar = [
  {
    Name: "Home",
    route: "/home",
    icon: <HomeOutlinedIcon />,
  },
  {
    Name: "Services",
    route: "/service",
    icon: <HomeOutlinedIcon />,
  },
  {
    Name: "Language",
    route: "/language",
    icon: <LanguageRoundedIcon />,
  },
  {
    Name: "Career",
    route: "/career",
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    Name: "Enquiry",
    route: "/Enquiry",
    icon: <ArticleIcon />,
  },
  {
    Name: "About Us",
    route: "/aboutus",
    icon: <Diversity3Icon />,
  },
];
export default function Sidebar(props: ISidebar) {
  const theme = useTheme();
  const { open } = props;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

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
                navigate(`${item.route}`);
                if (item.route === "/language") {
                  window.location.reload();
                }
                if (item.route === "/career") {
                  window.location.reload();
                }
                if (item.route === "/service") {
                  window.location.reload();
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 48,
                  cursor: "pointer",
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    location.pathname == item.route ? "#014aad" : "white",
                  color: location.pathname == item.route ? "white" : "gray",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    display: "flex",
                    alignItems: "center",
                    color: location.pathname == item.route ? "white" : "gray",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.Name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
