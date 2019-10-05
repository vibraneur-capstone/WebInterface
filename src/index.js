import React from "react";
import {render} from "react-dom";
import Main from "./Components/Main.jsx";

class App extends React.Component {
    render() {
        return (
            <div>
                <Main></Main>
            </div>
        )
    }
}

render(<App/>, document.getElementById("app"));

