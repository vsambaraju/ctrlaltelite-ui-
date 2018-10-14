import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from "@material-ui/icons/Person";
import Search from '@material-ui/icons/Search';

import Appointments from "../appointments/appointments";
import EditProfile from "../edit/editProfile";
import ColorPalette from "../../constants/colorPalette";

const styles = {
    navigationContainer: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between"
    },
    content: {
        display: "flex",
        alignItems: "flex-start"
    },
    bottomNavigation: {
        display: "flex",
        alignItems: "flex-end",
        backgroundColor: ColorPalette.PRIMARY,
        height: "60px"
    },
    bottomNavigationAction: {
        color: ColorPalette.GRAY
    },
    selected: {
        color: "white"
    }
};
const navigation = {
    APPOINTMENTS: 0,
    PROFILE: 1,
    SEARCH: 2
};

class SimpleBottomNavigation extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired
    };
    state = {
        value: navigation.APPOINTMENTS
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, client} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.navigationContainer}>
                <div className={classes.content}>
                    {
                        this.state.value === navigation.APPOINTMENTS &&
                        <Appointments client={client} />
                    }
                    {
                        this.state.value === navigation.PROFILE &&
                        <EditProfile client={client}/>
                    }
                </div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.bottomNavigation}
                >
                    <BottomNavigationAction
                        value={navigation.APPOINTMENTS}
                        className={classes.bottomNavigationAction}
                        classes={{selected: classes.selected}}
                        label="Appointments"
                        icon={<CalendarToday style={{color: ColorPalette.GRAY}} />}
                    />
                    <BottomNavigationAction
                        value={navigation.PROFILE}
                        className={classes.bottomNavigationAction}
                        classes={{selected: classes.selected}}
                        label="Profile"
                        icon={<Person style={{color: ColorPalette.GRAY}} />}
                    />
                    <BottomNavigationAction
                        value={navigation.SEARCH}
                        className={classes.bottomNavigationAction}
                        classes={{selected: classes.selected}}
                        label="Search"
                        icon={<Search style={{color: ColorPalette.GRAY}} />}
                    />
                </BottomNavigation>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleBottomNavigation);