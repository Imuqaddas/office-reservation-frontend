/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyIcon from "@mui/icons-material/Key";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Face from "@mui/icons-material/Face";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

function Sidebar() {
  return (
    <div>
      <Toolbar>
        <img
          src={`https://officereservation.s3.eu-central-1.amazonaws.com/${window.location.hostname.split(".")[0]}`}
          css={css`
            height: 65px;
          `}
          alt="logo"
        ></img>
      </Toolbar>
      <Divider />
      <List>
        <Link component={RouterLink} to="/">
          <ListItem button key={"Dashboard"}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link component={RouterLink} to="/buildings">
          <ListItem button key={"Buildings"}>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Buildings" />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/offices">
          <ListItem button key={"Offices"}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Offices" />
          </ListItem>
        </Link>
        <Link component={RouterLink} to="/rentings">
          <ListItem button key={"Rentings"}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Rentings" />
          </ListItem>
        </Link>
        <ListItem button key={"Bookings"}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItem>
        <ListItem button key={"Customers"}>
          <ListItemIcon>
            <Face />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"Finance"}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Finance" />
        </ListItem>
        <ListItem button key={"Company"}>
          <ListItemIcon>
            <CorporateFareIcon />
          </ListItemIcon>
          <ListItemText primary="Company" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"Settings"}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
