import React, {PureComponent} from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import AppointmentRequest from "./appointmentRequest";
import AppointmentsView from "./appointmentsView";
import Typography from "@material-ui/core/Typography/Typography";

import Add from '@material-ui/icons/Add';

import ColorPalette from "../../constants/colorPalette";
import PropTypes from "prop-types";

const styles = {
    headerContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "space-between"
    },
    createAppointment: {
        backgroundColor: ColorPalette.PRIMARY,
        color: "white"
    },
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        width: "100%"
    },
    viewContainer: {
        marginBottom: 30
    }
};

class Appointments extends PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired
    };
    state = {
        open: false,
        serviceRequests: [],
        loading: false,
        error: null
    };
    componentDidMount() {
        this.setState({loading: true, error: null});
        this.getServiceRequests();
    }
    getServiceRequests = () => {
        fetch(`/api/servicerequests/${this.props.client.profileType === "Client" ? "client" : "volunteer"}/${this.props.client.id}/`).then(response => {
            return response.json();
        }).then(serviceRequests => {
            debugger;
            this.setState({loading: false, serviceRequests})
        }).catch(error => {
            this.setState({loading: false, error});
        });
    };
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    onSubmit = () => {
        this.setState({open: false});
        this.getServiceRequests();
    };
    render() {
        const {classes, client} = this.props;
        const isClient = this.props.client.profileType === "Client";
        return (
            <div className={classes.container}>
                {
                    this.state.open &&
                    <AppointmentRequest clientId={client.id} onBack={this.handleClose} onSubmit={this.onSubmit} />
                }
                {
                    !this.state.open &&
                    <div className={classes.viewContainer}>
                        <div className={classes.headerContainer}>
                            <Typography component="h2" variant="headline" gutterBottom>
                                Appointments
                            </Typography>
                            {
                                isClient &&
                                <Button className={classes.createAppointment} variant="contained" onClick={this.handleOpen}>
                                    <Add /> Create New
                                </Button>
                            }
                        </div>
                        <AppointmentsView isClient={isClient} serviceRequests={this.state.serviceRequests} />
                    </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Appointments);
