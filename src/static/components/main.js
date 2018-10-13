import React, {PureComponent} from "react";

import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper/Paper";

import LandingPage from "./landingPage/landingPage";
import Create from "./create/create";
import Appointments from "./appointments/appointments";

const styles = theme => ({
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
    }
});

class Main extends PureComponent {
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <LandingPage/>
                </Paper>
                <Paper className={classes.paper}>
                    <Create/>
                </Paper>
                <Paper className={classes.paper}>
                    <Appointments />
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Main);
