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
    },
    avatarContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    }
});

const LandingPage = ({classes}) => (
    <div>
        <div className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
                <PermPhoneMsg />
            </Avatar>
        </div>
        <Login/>
    </div>
);

export default withStyles(styles, {withTheme: true})(LandingPage);