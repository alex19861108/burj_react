import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, BrowserRouter} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>Welcome</li>
                    </ul>
                    <hr />
                    <Route exact path="/" component={App}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

const App = () => (
    <h2>Welcom to Blur</h2>
);

export default connect(state => ({}), {})(Home);
