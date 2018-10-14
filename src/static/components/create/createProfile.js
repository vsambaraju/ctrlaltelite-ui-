import React from "react";
import PropTypes from "prop-types";

import ColorPalette from "../../constants/colorPalette";
import UserTypes from "../../constants/userTypes";

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar/Avatar";
import Person from "@material-ui/icons/Person";
import Add from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit
    },
    formContainer: {
        display: "flex",
        flexFlow: "column nowrap"
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
    headerContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "space-between"
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
    buttons: {
        marginTop: 15,
        display: "flex",
        flexFlow: "row nowrap"
    },
    button: {
        margin: theme.spacing.unit,
    }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const languages = [
    'English',
    'Spanish',
    'German',
    'French',
    'Italian'
];

{/*<FormControlLabel*/}
    {/*control={<Checkbox value={this.state.meetInPerson} onChange={this.onMeetInPersonChange} />}*/}
    {/*label="Can Meet In Person"*/}
{/*/>*/}

class CreateProfile extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        userType: PropTypes.oneOf(UserTypes.values),
        onBack: PropTypes.func,
        onCreation: PropTypes.func,
    };
    static defaultProps = {
        onBack: null,
        onCreation: null
    };
    state = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        zip: "",
        languages: [],
        gender: "Male",
        contactPreference: "Email",
        inPerson: "yes",
        days: {
            Sun: false,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false
        },
        loading: false,
        error: null
    };
    onFieldChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    onGenderChange = event => {
        this.setState({gender: event.target.value});
    };
    onContactPreferenceChange = event => {
        this.setState({contactPreference: event.target.value});
    };
    selectLanguages = event => {
        this.setState({languages: event.target.value});
    };
    onInPersonChange = event => {
        this.setState({inPerson: event.target.value});
    };
    onBack = () => {
        if(typeof this.props.onBack === "function") this.props.onBack();
    };
    handlers = {};
    changeDate = (day) => {
        if(!this.handlers) this.handlers = {};
        if(!this.handlers[day]) this.handlers[day] = () => {
            const days = {...this.state.days};
            days[day] = !days[day];
            this.setState({days})
        };
        return this.handlers[day];
    };
    onSubmit = event => {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const newProfile = {
            "firstName": this.state.fname,
            "lastName": this.state.lname,
            "languages": this.state.languages.join(","),
            "city": this.state.city,
            "state": this.state.state,
            "postalCode": this.state.zip,
            "emailAddress": this.state.email,
            "phoneNumber": this.state.phone,
            "gender": this.state.gender,
            "contactMethod": this.state.contactPreference,
            "meetInPerson": this.props.userType === UserTypes.VOLUNTEER ? this.state.inPerson === "yes" : false,
            "username": "",
            "streetAddress1": "",
            "streetAddress2": "",
            "averageRating": 0,
            "photoLocation": "",
            "age": 0,
        };
        debugger;
        this.setState({loading: true, error: null});
        fetch(
            `/api/${this.props.userType === UserTypes.VOLUNTEER ? "volunteers" : "clients"}/`,
            {method: "POST", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(newProfile)}
        ).then(response => {
            return response.json();
        }).then(client => {
            debugger;
            this.setState({loading: false});
            if(typeof this.props.onCreation === "function") this.props.onCreation(client);
        }).catch(error => {
            debugger;
            this.setState({loading: false, error});
        })
    };
    render() {
        const {classes, userType} = this.props;
        return (
            <div className={classes.formContainer}>
                <div className={classes.headerContainer}>
                    <KeyboardArrowLeft style={{cursor: "pointer"}} onClick={this.onBack} />
                    <Typography style={{marginTop: 10}} component="h2" variant="headline" gutterBottom>
                        Create {userType === UserTypes.VOLUNTEER ? "Volunteer" : ""} Account
                    </Typography>
                </div>
                <Typography variant="subheading" gutterBottom>
                    We just need some basic information to get you all set up
                </Typography>
                <div className={classes.avatarContainer}>
                    <Badge color="primary" badgeContent={<Add />} classes={{badge: classes.badge}}>
                        <Avatar className={classes.avatarProfile}>
                            <Person style={{ fontSize: 60 }} />
                        </Avatar>
                    </Badge>
                    <Typography variant="subheading" gutterBottom>
                        Add Profile Image
                    </Typography>
                </div>
                <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="fname">First Name</InputLabel>
                        <Input id="fname" name="fname" value={this.state.fname} onChange={this.onFieldChange} autoComplete="fname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lname">Last Name</InputLabel>
                        <Input id="lname" name="lname" value={this.state.lname} onChange={this.onFieldChange} autoComplete="lname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" value={this.state.email} onChange={this.onFieldChange} autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input id="phone" name="phone" value={this.state.phone} onChange={this.onFieldChange} autoComplete="phone" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input id="city" name="city" value={this.state.city} onChange={this.onFieldChange} autoComplete="city" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Input id="state" name="state" value={this.state.state} onChange={this.onFieldChange} autoComplete="state" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="zip">Zip</InputLabel>
                        <Input id="zip" name="zip" value={this.state.zip} onChange={this.onFieldChange} autoComplete="zip" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="language-spoken">Languages Spoken</InputLabel>
                        <Select
                            multiple
                            autoWidth
                            value={this.state.languages}
                            onChange={this.selectLanguages}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {languages.map(language => (
                                <MenuItem key={language} value={language}>
                                    <Checkbox checked={this.state.languages.indexOf(language) > -1} />
                                    <ListItemText primary={language} />
                                </MenuItem>
                            ))}
                        </Select>
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
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="NonBinary" control={<Radio />} label="Non Binary" />
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
                            <FormControlLabel value="Email" control={<Radio name="contactPreference" />} label="Email" />
                            <FormControlLabel value="SMS" control={<Radio name="contactPreference" />} label="Text" />
                        </RadioGroup>
                    </div>
                    <Divider />
                    {
                        userType === UserTypes.VOLUNTEER &&
                        <div>
                            <div style={{marginTop: 10}}>
                                <InputLabel>Are you willing to meet in person to preform local translations?</InputLabel>
                                <RadioGroup
                                    aria-label="inPerson"
                                    name="inPerson"
                                    className={classes.radioGroup}
                                    value={this.state.inPerson}
                                    onChange={this.onInPersonChange}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </div>
                            <div style={{marginTop: 10}}>
                                <InputLabel>What is your usual availability?</InputLabel>
                                <Typography style={{padding: "8px 0"}} variant="caption" gutterBottom>
                                    Don't worry, you aren't locked into anything, we just need a general idea of when you
                                    would be able to translate in any given week.
                                </Typography>
                                <div className={classes.dateSelector}>
                                    {Object.keys(this.state.days).map(day => (
                                        <div style={{cursor: "pointer"}} onClick={this.changeDate(day)} className={classes.date}>
                                            <InputLabel style={{marginBottom: 5}}>{day}</InputLabel>
                                            {
                                                this.state.days[day] ?
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
                        </div>
                    }
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

export default withStyles(styles)(CreateProfile);