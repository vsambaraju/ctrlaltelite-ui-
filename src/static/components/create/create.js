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
        console.log(this.state.userType);
        return (
            this.state.userType ?
                <CreateProfile/> :
                <UserTypeSelector handleChange={this.handleUserTypeSelection}/>
        );
    }
}

export default Create;
