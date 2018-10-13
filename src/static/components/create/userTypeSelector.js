import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";
import ColorPalette from "../../constants/colorPalette";
import UserTypes from "../../constants/userTypes";

const styles = theme => ({
    avatar: {
        margin: "10px",
        marginBottom: "48px",
        color: "white",
        width: "40px",
        height: "40px",
        backgroundColor: ColorPalette.PRIMARY,
    },
    container: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    button: {
        margin: theme.spacing.unit * 3,
        width: "220px",
        backgroundColor: ColorPalette.PRIMARY
    }
});

const UserTypeSelector = ({classes, handleChange}) => (
    <div className={classes.container}>
        <Avatar className={classes.avatar}>
            <PermPhoneMsg />
        </Avatar>
        <Typography gutterBottom variant="headline" align="center">
            Hello! It's nice to meet you.
            <br/>
            <br/>
            Tell us what brought you here.
        </Typography>
        <Button style={{color: "white"}} variant="contained" className={classes.button} onClick={(event) => handleChange(UserTypes.CLIENT, event)}>
            I need translation help.
        </Button>
        <Button style={{color: "white"}} variant="contained" className={classes.button} onClick={(event) => handleChange(UserTypes.VOLUNTEER, event)}>
            I want to volunteer my language skills.
        </Button>
    </div>
);

UserTypeSelector.propTypes = {
    handleChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(UserTypeSelector);