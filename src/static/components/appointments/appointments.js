import React, {PureComponent} from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import AppointmentRequestModal from "./appointmentRequestModal";
import AppointmentsView from "./appointmentsView";
import Typography from "@material-ui/core/Typography/Typography";

import Add from '@material-ui/icons/Add';

import ColorPalette from "../../constants/colorPalette";

const styles = {
    headerContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30
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
};

class Appointments extends PureComponent {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppointmentRequestModal open={this.state.open} onClose={this.handleClose}/>
                <div className={classes.container}>
                    <div className={classes.headerContainer}>
                        <Typography component="h2" variant="headline" gutterBottom>
                            Appointments
                        </Typography>
                        <Button className={classes.createAppointment} variant="contained" onClick={this.handleOpen}>
                            <Add /> Create New
                        </Button>
                    </div>
                    <AppointmentsView />
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(Appointments);
