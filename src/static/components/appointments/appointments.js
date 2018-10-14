import React, {PureComponent} from "react";
import Button from "@material-ui/core/Button";
import AppointmentRequestModal from "./appointmentRequestModal";
import EditProfile from "../edit/editProfile";
import PropTypes from "prop-types";


class Appointments extends PureComponent {
    static propTypes = {
        client: PropTypes.object.isRequired
    };

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
        const {client} = this.props;
        return (
            <React.Fragment>
                <Button variant="contained" onClick={this.handleOpen}>
                    Create Appointment
                </Button>
                <AppointmentRequestModal open={this.state.open} onClose={this.handleClose}/>

                <EditProfile client={client}/>

            </React.Fragment>
        );
    }
}

export default Appointments;
