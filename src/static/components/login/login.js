import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";

import ColorPalette from "../../constants/colorPalette";
import Avatar from "@material-ui/core/Avatar";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";

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
    },
    avatar: {
        margin: "10px",
        color: "white",
        width: "90px",
        height: "90px",
        backgroundColor: ColorPalette.PRIMARY,
    },
    avatarContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    },
    createAccount: {
        marginTop: "20px",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    },
    error: {
        color: ColorPalette.SECONDARY,
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center"
    }
});

class Login extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func,
        onNewAccountSelect: PropTypes.func,
        error: PropTypes.object,
        loading: PropTypes.bool
    };
    static defaultProps  = {
        onLogin: null,
        onNewAccountSelect: null,
        error: null,
        loading: false
    };
    state = {
        email: "",
        password: ""
    };
    logIn = event => {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if(typeof this.props.onLogin === "function") this.props.onLogin(this.state.email);
    };
    onNewAccountSelect = () => {
        if(typeof this.props.onNewAccountSelect === "function") this.props.onNewAccountSelect();
    };
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render() {
        const {classes, error, loading} = this.props;
        return (
            <div className={classes.formContainer}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>
                        <PermPhoneMsg />
                    </Avatar>
                </div>
                <form className={classes.form} onSubmit={this.logIn}>
                    <FormControl disabled={loading} margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" value={this.state.email} onChange={this.onChange} autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl disabled={loading} margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <FormControlLabel
                        disabled={loading}
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />
                    {
                        error &&
                        <span className={classes.error}>Invalid Email or Password!</span>
                    }
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        {
                            loading ? "Saving..." : "Sign in"
                        }
                    </Button>
                </form>
                <div className={classes.createAccount}>
                    <Typography onClick={!loading ? this.onNewAccountSelect : null} variant="subheading" gutterBottom>
                        <a href="#">Create Account</a>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Login);