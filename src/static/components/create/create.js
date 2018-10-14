import React, {PureComponent} from "react";
import UserTypeSelector from "./userTypeSelector";
import CreateProfile from "./createProfile";
import PropTypes from "prop-types";

class Create extends PureComponent {

    static propTypes = {
        onBack: PropTypes.func,
        onCreation: PropTypes.func
    };
    static defaultProps  = {
        onBack: null,
        onCreation: null
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

    onCreation = client => {
        if(typeof this.props.onCreation === "function") this.props.onCreation(client);
    };

    selectNewUserType = () => {
        this.setState({userType: null});
    };

    render() {

        return (
            this.state.userType ?
                <CreateProfile userType={this.state.userType} onCreation={this.onCreation} onBack={this.selectNewUserType}/> :
                <UserTypeSelector handleChange={this.handleUserTypeSelection} onBack={this.onBack}/>
        );
    }
}

export default Create;
