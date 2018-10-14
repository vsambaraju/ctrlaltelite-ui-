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
    tableContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        flexGrow: 0
    },
    history: {
        marginTop: 30
    },
    tableCell: {
        padding: 5
    }
});

class AppointmentsView extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Typography variant="title" gutterBottom>
                    Upcoming
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Translator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tableCell}>10/13/2018 8:47:00 PM</TableCell>
                            <TableCell className={classes.tableCell}>Virtual</TableCell>
                            <TableCell className={classes.tableCell}>
                                <div className={classes.avatarContainer}>
                                    <Avatar className={classes.avatarProfile}>
                                        <Person />
                                    </Avatar>
                                    <span>Joe Smith</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>11/10/2018 12:00:00 PM</TableCell>
                            <TableCell className={classes.tableCell}>In Person</TableCell>
                            <TableCell className={classes.tableCell}>
                                <div className={classes.avatarContainer}>
                                    <Avatar className={classes.avatarProfile}>
                                        <Person />
                                    </Avatar>
                                    <span>John Thompson</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Typography className={classes.history} variant="title" gutterBottom>
                    History
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Translator</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tableCell}>10/13/2018 8:47:00 PM</TableCell>
                            <TableCell className={classes.tableCell}>Virtual</TableCell>
                            <TableCell className={classes.tableCell}>
                                <div className={classes.avatarContainer}>
                                    <Avatar className={classes.avatarProfile}>
                                        <Person />
                                    </Avatar>
                                    <span>Joe Smith</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>11/10/2018 12:00:00 PM</TableCell>
                            <TableCell className={classes.tableCell}>In Person</TableCell>
                            <TableCell className={classes.tableCell}>
                                <div className={classes.avatarContainer}>
                                    <Avatar className={classes.avatarProfile}>
                                        <Person />
                                    </Avatar>
                                    <span>John Thompson</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(AppointmentsView);