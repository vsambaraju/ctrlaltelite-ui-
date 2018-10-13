import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";
import Typography from "@material-ui/core/Typography";
import ColorPalette from "../ui/constants/colorPalette";

const styles = {
    avatar: {
        margin: "10px",
        color: "white",
        backgroundColor: ColorPalette.PRIMARY,
    }
};

const LandingPage = ({classes}) => (
    <div>
            <Card >
                <CardContent>
                    <Typography gutterBottom variant="headline">
                        Hello
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <PermPhoneMsg />
                    </Avatar>
                </CardContent>
            </Card>
    </div>
);

export default withStyles(styles)(LandingPage);