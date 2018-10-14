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
import VolunteerAvailability from "./volunteerAvailability";

import Avatar from "@material-ui/core/Avatar/Avatar";
import Person from "@material-ui/icons/Person";
import Add from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

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
    };
    static defaultProps = {
        onBack: null
    };
    state = {
        languages: [],
        gender: "male",
        contactPreference: "email"
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
    onBack = () => {
        if(typeof this.props.onBack === "function") this.props.onBack();
    };
    render() {
        const {classes, userType} = this.props;
        return (
            <div className={classes.formContainer}>
                <KeyboardArrowLeft onClick={this.onBack} />
                <Typography style={{marginTop: 10}} component="h2" variant="headline" gutterBottom>
                    Create {userType === UserTypes.VOLUNTEER ? "Volunteer" : ""} Account
                </Typography>
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
                <form className={classes.form} autoComplete="off">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="fname">First Name</InputLabel>
                        <Input id="fname" name="fname" autoComplete="fname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lname">Last Name</InputLabel>
                        <Input id="lname" name="lname" autoComplete="lname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input id="phone" name="phone" autoComplete="phone" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input id="city" name="city" autoComplete="city" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Input id="state" name="state" autoComplete="state" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="zip">Zip</InputLabel>
                        <Input id="zip" name="zip" autoComplete="zip" autoFocus />
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
                    <Divider />
                    {
                        userType === UserTypes.VOLUNTEER &&
                        <VolunteerAvailability />
                    }
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(CreateProfile);