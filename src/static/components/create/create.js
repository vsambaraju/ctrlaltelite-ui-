import React, {PureComponent} from "react";
import UserTypeSelector from "./userTypeSelector";
import CreateProfile from "./createProfile";
import PropTypes from "prop-types";

class Create extends PureComponent {

    static propTypes = {
        onBack: PropTypes.func
    };
    static defaultProps  = {
        onBack: null
    };
    state = {
        userType: null
    };

    handleUserTypeSelection = userType => {
        this.setState({userType});
    };

    onBack = () => {
        if(typeof this.props.onBack === "function") this.props.onBack();
    };

    selectNewUserType = () => {
        this.setState({userType: null});
    };

    render() {

        return (
            this.state.userType ?
                <CreateProfile userType={this.state.userType} onBack={this.selectNewUserType}/> :
                <UserTypeSelector handleChange={this.handleUserTypeSelection} onBack={this.onBack}/>
        );
    }
}

export default Create;
