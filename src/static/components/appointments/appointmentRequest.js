import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import ColorPalette from "../../constants/colorPalette";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import UserTypes from "../../constants/userTypes";


const styles = theme => ({
    formContainer: {
        display: "flex",
        flexFlow: "column nowrap"
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit
    },
    headerContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "space-between"
    },
    timeRange: {
        marginTop: 10,
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between"
    },
    languages: {
        display: "flex",
        flexDirection: "row"
    },
    timePicker: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row"
    },
    buttons: {
        marginTop: 15,
        display: "flex",
        flexFlow: "row nowrap"
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const languages = [
    'English',
    'Spanish',
    'German',
    'French',
    'Italian'
];

class AppointmentRequest extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        clientId: PropTypes.object.isRequired,
        onSubmit: PropTypes.func,
        onBack: PropTypes.func
    };
    static defaultProps = {
        onBack: null
    };
    state = {
        date: "2018-10-14",
        startTime: "00:00",
        endTime: "00:00",
        requestType: "Virtual",
        appointmentDetails: "",
        fromLanguage: "",
        toLanguage: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: ""
    };

    onBack = () => {
        if(typeof this.props.onBack === "function") this.props.onBack();
    };
    onDateChange = event => {
        this.setState({date: event.target.value});
    };
    onStartTimeChange = event => {
        this.setState({startTime: event.target.value});
    };
    onEndTimeChange = event => {
        this.setState({endTime: event.target.value});
    };
    onFieldChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };
    onRequestTypeChange = event => {
        this.setState({requestType: event.target.value});
    };
    onAppointmentDetailsChange = event => {
        this.setState({appointmentDetails: event.target.value});
    };
    onFromLanguageChange = event => {
        this.setState({fromLanguage: event.target.value});
    };
    onToLanguageChange = event => {
        this.setState({toLanguage: event.target.value});
    };
    onSubmit = event => {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const fromDate = new Date(`${this.state.date}T${this.state.startTime}:00`);
        const toDate = new Date(`${this.state.date}T${this.state.endTime}:00`);
        const serviceRequest = {
            "clientId" : this.props.clientId,
            "languageTo" : this.state.toLanguage,
            "languageFrom" : this.state.fromLanguage,
            "zipCode" : this.state.zipCode,
            "city" : this.state.city,
            "state" : this.state.state,
            "streetAddress" : this.state.streetAddress,
            "isInPerson" : (this.state.requestType === "InPerson"),
            "appointmentFrom": fromDate.toISOString(),
            "appointmentTo": toDate.toISOString()
        };
        this.setState({loading: true, error: null});
        fetch(
            `/api/servicerequests/`,
            {method: "POST", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(serviceRequest)}
        ).then(() => {
            if(typeof this.props.onSubmit === "function") this.props.onSubmit();
        }).catch(error => {
            this.setState({loading: false, error});
        })
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formContainer}>
                <div className={classes.headerContainer}>
                    <KeyboardArrowLeft style={{cursor: "pointer"}} onClick={this.onBack} />
                    <Typography style={{marginTop: 10}} component="h2" variant="headline" gutterBottom>
                        New Appointment
                    </Typography>
                </div>
                <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                    <div style={{marginTop: 20}}>
                        <TextField
                            autoFocus
                            fullWidth
                            id="date"
                            label="Date"
                            type="date"
                            onChange={this.onDateChange}
                            defaultValue="2018-10-14"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <InputLabel>Time</InputLabel>
                        <div className={classes.timeRange}>
                            <TextField
                                id="start"
                                type="time"
                                defaultValue="00:00"
                                onChange={this.onStartTimeChange}
                                className={classes.timePicker}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <span>to</span>
                            <TextField
                                id="end"
                                type="time"
                                defaultValue="00:00"
                                onChange={this.onEndTimeChange}
                                className={classes.timePicker}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>
                    </div>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="streetAddress">Street Address</InputLabel>
                        <Input id="streetAddress" name="streetAddress" value={this.state.streetAddress} onChange={this.onFieldChange} autoComplete="streetAddress" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input id="city" name="city" value={this.state.city} onChange={this.onFieldChange} autoComplete="city" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Input id="state" name="state" value={this.state.state} onChange={this.onFieldChange} autoComplete="state" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="zipCode">Zip Code</InputLabel>
                        <Input id="zipCode" name="zipCode" value={this.state.zipCode} onChange={this.onFieldChange} autoComplete="zipCode" />
                    </FormControl>
                    <div style={{marginTop: 20}}>
                        <InputLabel>Translation Needed</InputLabel>
                        <div className={classes.languages}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="fromLanguage">From</InputLabel>
                                <Select
                                    value={this.state.fromLanguage}
                                    onChange={this.onFromLanguageChange}
                                    inputProps={{
                                        name: 'fromLanguage',
                                        id: 'fromLanguage',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {languages.filter(language => language !== this.state.toLanguage).map(language => (
                                        <MenuItem key={language} value={language}>
                                            {language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="toLanguage">To</InputLabel>
                                <Select
                                    value={this.state.toLanguage}
                                    onChange={this.onToLanguageChange}
                                    inputProps={{
                                        name: 'toLanguage',
                                        id: 'toLanguage',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {languages.filter(language => language !== this.state.fromLanguage).map(language => (
                                        <MenuItem key={language} value={language}>
                                            {language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{marginTop: 10}}>
                        <InputLabel>Type of Request</InputLabel>
                        <RadioGroup
                            aria-label="requestType"
                            name="requestType"
                            className={classes.radioGroup}
                            value={this.state.requestType}
                            onChange={this.onRequestTypeChange}
                        >
                            <FormControlLabel value="Virtual" control={<Radio name="requestType" />} label="Virtual" />
                            <FormControlLabel value="InPerson" control={<Radio name="requestType" />} label="In Person" />
                        </RadioGroup>
                    </div>
                    <TextField
                        id="appointmentDetails"
                        label="Appointment Details"
                        fullWidth
                        multiline
                        rowsMax="4"
                        value={this.state.appointmentDetails}
                        onChange={this.onAppointmentDetailsChange}
                        margin="normal"
                    />
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            style={{backgroundColor: ColorPalette.PRIMARY}}
                            fullWidth
                            variant="contained"
                            className={classes.button}
                        >
                            Save
                        </Button>
                        <Button
                            style={{backgroundColor: ColorPalette.GRAY}}
                            fullWidth
                            variant="contained"
                            onClick={this.onBack}
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(AppointmentRequest);