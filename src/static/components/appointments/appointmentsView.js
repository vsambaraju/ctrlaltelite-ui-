import React, {PureComponent} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

class AppointmentsView extends React.PureComponent {
    render() {
        return (
            <div>
                <Paper style={{marginBottom: 25}}>
                    <Typography>
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
                                <TableCell>10/13/2018 8:47:00 PM</TableCell>
                                <TableCell>Virtual</TableCell>
                                <TableCell>
                                    <div>
                                        <Avatar alt="Joe Smith" src=""/>Joe Smith
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>11/10/2018 12:00:00 PM</TableCell>
                                <TableCell>In Person</TableCell>
                                <TableCell>John Thompson</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper>
                    <Typography>History</Typography>
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
                                <TableCell>10/13/2018 8:47:00 PM</TableCell>
                                <TableCell>Virtual</TableCell>
                                <TableCell>
                                    <div>
                                        <Avatar alt="Joe Smith" src=""/>Joe Smith
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>11/10/2018 12:00:00 PM</TableCell>
                                <TableCell>In Person</TableCell>
                                <TableCell>John Thompson</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default AppointmentsView;