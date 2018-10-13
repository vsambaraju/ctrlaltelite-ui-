import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ColorPalette from "../ui/constants/colorPalette";

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit
    },
    formContainer: {
        display: "flex",
        flexFlow: "column nowrap"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        color: ColorPalette.PRIMARY
    }
});

const Login = ({classes}) => (
    <div className={classes.formContainer}>
        <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
            </FormControl>
            <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
            >
                Sign in
            </Button>
        </form>
    </div>
);

export default withStyles(styles, {withTheme: true})(Login);