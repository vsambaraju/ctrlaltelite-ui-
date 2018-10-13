import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";
import ColorPalette from "../ui/constants/colorPalette";
import Login from "./login";

const styles = theme => ({
    avatar: {
        margin: "10px",
        color: "white",
        width: "90px",
        height: "90px",
        backgroundColor: ColorPalette.PRIMARY,
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        color: ColorPalette.PRIMARY
    }
});

const LandingPage = ({classes}) => (
    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <PermPhoneMsg />
            </Avatar>
            <Login/>
        </Paper>
    </main>
);

export default withStyles(styles, {withTheme: true})(LandingPage);