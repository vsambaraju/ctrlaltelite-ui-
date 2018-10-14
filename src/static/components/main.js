import React, {PureComponent} from "react";

import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper/Paper";

import Create from "./create/create";
import Appointments from "./appointments/appointments";
import Login from "./login/login";

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

const WorkflowSteps = {
    LOGIN: "Login",
    REGISTER: "REGISTER",
    CREATE: "Create",
    APPOINTMENTS: "Appointments"
};

class Main extends PureComponent {
    state = {
        step: WorkflowSteps.LOGIN,
        loading: false,
        client: null,
        error: null
    };
    onLogin = (email) => {
        this.setState({loading: true, error: null});
        fetch(`/api/clients/email/${email}/`, {method: "POST"}).then(response => {
            return response.json();
        }).then(client => {
            this.setState({loading: false, client, step: WorkflowSteps.APPOINTMENTS})
        }).catch(error => {
            this.setState({loading: false, error});
        })
    };
    createNewAccount = () => {
        this.setState({step: WorkflowSteps.REGISTER})
    };
    backToLogin = () => {
        this.setState({step: WorkflowSteps.LOGIN})
    };
    onNewAccountCreation = client => {
        this.setState({client, step: WorkflowSteps.APPOINTMENTS});
    };
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    {
                        this.state.step === WorkflowSteps.LOGIN &&
                        <Login error={this.state.error} loading={this.state.loading} onLogin={this.onLogin} onNewAccountSelect={this.createNewAccount} />
                    }
                    {
                        this.state.step === WorkflowSteps.REGISTER &&
                        <Create onBack={this.backToLogin} onCreation={this.onNewAccountCreation}/>
                    }
                    {
                        this.state.step === WorkflowSteps.APPOINTMENTS &&
                        <Appointments client={this.state.client} />
                    }
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Main);
