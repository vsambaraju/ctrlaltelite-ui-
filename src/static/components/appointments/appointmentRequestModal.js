import React from "react";
import PropTypes from "prop-types";

import ColorPalette from "../ui/constants/colorPalette";

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit
    },
    avatarContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    },
    avatarProfile: {
        margin: "10px",
        color: "white",
        width: "90px",
        height: "90px",
        justifyContent: "middle",
        backgroundColor: ColorPalette.GRAY,
    },
    badge: {
        position: "absolute",
        top: "5px",
        right: "15px"
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row"
    },
    paper: {
        position: 'absolute',
        width: "320px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        display: "flex",
        flexFlow: "column nowrap"
    },
});

class AppointmentRequestModal extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    state = {

    };
    onChange = event => {
        this.setState({gender: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Modal open={this.props.open} onClose={this.props.handleClose}>
                    <div className={classes.paper}>
                        <Typography component="h2" variant="headline" gutterBottom>
                            New Appointment
                        </Typography>
                        <form className={classes.form} autoComplete="off">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="date">Date</InputLabel>
                                <Input id="date" name="date" autoFocus />
                            </FormControl>
                            <div style={{marginTop: 10}}>
                                <InputLabel>Gender</InputLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender"
                                    className={classes.radioGroup}
                                    value={this.state.gender}
                                    onChange={this.onGenderChange}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="nonBinary" control={<Radio />} label="Non Binary" />
                                </RadioGroup>
                            </div>
                            <div style={{marginTop: 10}}>
                                <InputLabel>What is the easiest way to contact You</InputLabel>
                                <RadioGroup
                                    aria-label="contactPreference"
                                    name="contactPreference"
                                    className={classes.radioGroup}
                                    value={this.state.contactPreference}
                                    onChange={this.onContactPreferenceChange}
                                >
                                    <FormControlLabel value="email" control={<Radio name="contactPreference" />} label="Email" />
                                    <FormControlLabel value="sms" control={<Radio name="contactPreference" />} label="Text" />
                                </RadioGroup>
                            </div>
                        </form>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AppointmentRequestModal);