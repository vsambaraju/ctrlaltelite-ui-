import React, {PureComponent} from "react";
import LandingPage from "./landingPage/landingPage";
import Create from "./create/create";

class Main extends PureComponent {
    render() {
        return (
            <div>
                <LandingPage/>
                <Create/>
            </div>
        );
    }
}

export default Main;
