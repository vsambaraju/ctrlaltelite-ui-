import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField";

import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";

import ColorPalette from "../../constants/colorPalette";

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit
    },
    formContainer: {
        display: "flex",
        flexFlow: "column nowrap"
    },
    radioGroup: {
        display: "flex",
        flexFlow: "row nowrap"
    },
    dateSelector: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between"
    },
    date: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    timeRange: {
        marginTop: 10,
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between"
    },
    timePicker: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
});

class VolunteerAvailability extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    state = {
        inPerson: true,
        availability: {
            Sun: false,
            Mon: true,
            Tue: true,
            Wed: false,
            Thu: true,
            Fri: true,
            Sat: false
        },
        hours: ""
    };
    onInPersonChange = event => {
        this.setState({inPerson: event.target.value});
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formContainer}>
                <form className={classes.form} autoComplete="off">
                    <div style={{marginTop: 10}}>
                        <InputLabel>Are you willing to meet in person to preform local translations?</InputLabel>
                        <RadioGroup
                            aria-label="inPerson"
                            name="inPerson"
                            className={classes.radioGroup}
                            value={this.state.inPerson}
                            onChange={this.onInPersonChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </div>
                    <div style={{marginTop: 10}}>
                        <InputLabel>What is your usual availability?</InputLabel>
                        <Typography style={{padding: "8px 0"}} variant="caption" gutterBottom>
                            Don't worry, you aren't locked into anything, we just need a general idea of when you
                            would be able to translate in any given week.
                        </Typography>
                        <div className={classes.dateSelector}>
                            {Object.keys(this.state.availability).map(day => (
                                <div className={classes.date}>
                                    <InputLabel style={{marginBottom: 5}}>{day}</InputLabel>
                                    {
                                        this.state.availability[day] ?
                                            <CheckCircle fontSize="large" style={{color: ColorPalette.PRIMARY}}/> :
                                            <Cancel fontSize="large" style={{color: ColorPalette.GRAY}} />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{marginTop: 20}}>
                        <InputLabel>What hours would you typically be able to translate?</InputLabel>
                        <div className={classes.timeRange}>
                            <TextField
                                id="start"
                                type="time"
                                defaultValue="00:00"
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
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(VolunteerAvailability);