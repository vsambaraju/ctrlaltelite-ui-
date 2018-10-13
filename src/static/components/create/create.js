import React, {PureComponent} from "react";
import UserTypeSelector from "./userTypeSelector";
import CreateProfile from "./createProfile";

class Create extends PureComponent {

    state = {
        userType: null
    };

    handleUserTypeSelection = userType => {
        this.setState({userType});
    };

    render() {

        return (
            this.state.userType ?
                <CreateProfile userType={this.state.userType}/> :
                <UserTypeSelector handleChange={this.handleUserTypeSelection}/>
        );
    }
}

export default Create;
