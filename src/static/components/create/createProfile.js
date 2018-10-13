import React, {PureComponent} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import ColorPalette from "../ui/constants/colorPalette";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: "100%",
    },
    menuItem: {
        fontWeight: theme.typography.fontWeightRegular
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

class CreateProfile extends React.Component {
    state = {
        languages: [],
    };

    selectLanguages = event => {
        this.setState({ languages: event.target.value });
    };
    render() {
        const {classes} = this.props;
        return (
            <Card >
                <CardContent>
                    <Typography component="h2" variant="display2" gutterBottom>
                        Create Profile
                    </Typography>
                    <form className={classes.root} autoComplete="off">
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
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
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(CreateProfile);