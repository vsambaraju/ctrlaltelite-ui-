import React, {PureComponent} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppointmentRequestModal from "./appointmentRequestModal";


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

        return (
            <React.Fragment>
                <Typography>
                    This is where the Appointments will go.
                </Typography>
                <Button variant="contained" onClick={this.handleOpen}>
                    Create Appointment
                </Button>
                <AppointmentRequestModal open={this.state.open} onClose={this.handleClose}/>
            </React.Fragment>
        );
    }
}

export default Appointments;
