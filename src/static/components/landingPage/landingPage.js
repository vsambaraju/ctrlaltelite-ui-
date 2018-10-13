import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";
import ColorPalette from "../ui/constants/colorPalette";
import Login from "./login";

const styles = () => ({
    avatar: {
        margin: "10px",
        color: "white",
        width: "90px",
        height: "90px",
        backgroundColor: ColorPalette.PRIMARY,
    }
});

const LandingPage = ({classes}) => (
    <div>
        <Avatar className={classes.avatar}>
            <PermPhoneMsg />
        </Avatar>
        <Login/>
    </div>
);

export default withStyles(styles, {withTheme: true})(LandingPage);