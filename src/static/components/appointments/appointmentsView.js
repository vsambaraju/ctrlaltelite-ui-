import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

import Person from "@material-ui/icons/Person";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

import ColorPalette from "../../constants/colorPalette";


const styles = theme => ({
    avatarProfile: {
        margin: "10px",
        color: "white",
        width: "25",
        height: "25",
        justifyContent: "middle",
        backgroundColor: ColorPalette.GRAY,
    },
    avatarContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "middle",
        alignItems: "center"
    },
    ratingContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "middle",
    },
    tableContainer: {
        display: "flex",
        flexFlow: "column nowrap"
    },
    history: {
        marginTop: 30
    },
    tableCell: {
        padding: "0 5px"
    }
});

class AppointmentsView extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        serviceRequests: PropTypes.array,
        isClient: PropTypes.bool
    };
    static defaultProps = {
        serviceRequests: [],
        isClient: false
    };
    getRating = (ratings) => {
        const stars = [];
        for(let i=0; i < 5; i++) {
            if(ratings > i) stars.push(<Star key={i} style={{fontSize: 12}} />);
            else stars.push(<StarBorder key={i} style={{fontSize: 12}} />)
        }
        return stars;
    };
    render() {
        const {classes, serviceRequests, isClient} = this.props;
        const upcoming = serviceRequests.filter(request => request && request.status === "Pending");
        const history = serviceRequests.filter(request => request && request.status !== "Pending");
        return (
            <div className={classes.tableContainer}>
                <Typography variant="title" gutterBottom>
                    Upcoming
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Date</TableCell>
                            <TableCell className={classes.tableCell}>Type</TableCell>
                            <TableCell className={classes.tableCell}>{isClient ? "Translator" : "Client"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            upcoming.length > 0 ?
                                upcoming.map((request, index) => {
                                    let date;
                                    if(request.appointmentFrom) date = new Date(request.appointmentFrom);

                                    return <TableRow key={index}>
                                        <TableCell className={classes.tableCell}>{date ? `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}` : "Not Available"}</TableCell>
                                        <TableCell className={classes.tableCell}>{request.inPerson ? "In Person" : "Virtual"}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <div className={classes.avatarContainer}>
                                                <Avatar className={classes.avatarProfile}>
                                                    <Person />
                                                </Avatar>
                                                <div className={classes.ratingContainer}>
                                                    <span>{isClient && request.volunteerId && request.volunteerName || !isClient && request.clientId && request.clientName || "Not Available"}</span>
                                                    {
                                                        isClient && request.ratings &&
                                                        <span>
                                                            {this.getRating(request.ratings)}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>;
                                })
                            :
                                <TableRow>
                                    <TableCell colSpan={3}>No Upcoming Requests</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
                <Typography className={classes.history} variant="title" gutterBottom>
                    History
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Date</TableCell>
                            <TableCell className={classes.tableCell}>Type</TableCell>
                            <TableCell className={classes.tableCell}>{isClient ? "Translator" : "Client"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            history.length > 0 ?
                                history.map((request, index) => {
                                    let date;
                                    if(request.appointmentFrom) date = new Date(request.appointmentFrom);

                                    return <TableRow key={index}>
                                        <TableCell className={classes.tableCell}>{date ? `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}` : "Not Available"}</TableCell>
                                        <TableCell className={classes.tableCell}>{request.inPerson ? "In Person" : "Virtual"}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <div className={classes.avatarContainer}>
                                                <Avatar className={classes.avatarProfile}>
                                                    <Person />
                                                </Avatar>
                                                <div className={classes.ratingContainer}>
                                                    <span>{isClient && request.volunteerId && request.volunteerName || !isClient && request.clientId && request.clientName || "Not Available"}</span>
                                                    {
                                                        isClient && request.ratings &&
                                                        <span>
                                                            {this.getRating(request.ratings)}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>;
                                })
                                :
                                <TableRow>
                                    <TableCell colSpan={3}>You have not made any requests yet.</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(AppointmentsView);