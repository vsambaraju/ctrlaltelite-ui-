import React from "react";
import PropTypes from "prop-types";

import ColorPalette from "../../constants/colorPalette";

import {withStyles} from "@material-ui/core/styles";
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

import Avatar from "@material-ui/core/Avatar/Avatar";
import Person from "@material-ui/icons/Person";

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

class EditProfile extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    state = {
        client: null,
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        zip: "",
        spokenLanguages: [],
        gender: "",
        contactMethod: "",
        loading: false
    };
    componentDidMount() {
        this.setState({loading: true});
        fetch("/api/clients/email/Dave.woo@gmail.com/", {method: "POST"}).then(response => {
            return response.json();
        }).then(this.loadClientData);
    }
    loadClientData = client => {
        const spokenLanguages = client && client.languages && client.languages.split(",") || [];
        this.setState({
            client,
            fname: client.firstName,
            lname: client.lastName,
            email: client.emailAddress,
            phone: client.phoneNumber,
            city: client.city,
            state: client.state,
            zip: client.postalCode,
            spokenLanguages,
            gender: client.gender,
            contactMethod: client.contactMethod
        })
    };
    onGenderChange = event => {
        this.setState({gender: event.target.value});
    };
    onContactPreferenceChange = event => {
        this.setState({contactPreference: event.target.value});
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formContainer}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatarProfile}>
                        <Person style={{fontSize: 60}} />
                    </Avatar>
                </div>
                <form className={classes.form} autoComplete="off">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="fname">First Name</InputLabel>
                        <Input id="fname" name="fname" value={this.state.fname} autoComplete="fname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lname">Last Name</InputLabel>
                        <Input id="lname" name="lname" value={this.state.fname} autoComplete="lname" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" name="email" value={this.state.email} autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input id="phone" name="phone" value={this.state.phone} autoComplete="phone" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input id="city" name="city" value={this.state.city} autoComplete="city" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="state">State</InputLabel>
                        <Input id="state" name="state" value={this.state.state} autoComplete="state" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="zip">Zip</InputLabel>
                        <Input id="zip" name="zip" autoComplete="zip" value={this.state.zip} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="language-spoken">Languages Spoken</InputLabel>
                        <Select
                            multiple
                            autoWidth
                            value={this.state.spokenLanguages}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {languages.map(language => (
                                <MenuItem key={language} value={language}>
                                    <Checkbox checked={this.state.spokenLanguages.indexOf(language) > -1} />
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
                            value={this.state.contactMethod}
                        >
                            <FormControlLabel value="Email" control={<Radio name="contactPreference" />} label="Email" />
                            <FormControlLabel value="SMS" control={<Radio name="contactPreference" />} label="Text" />
                        </RadioGroup>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(EditProfile);