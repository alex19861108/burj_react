import React from 'react';
import { connect } from 'react-redux';
import ResponsiveDrawer from '../layouts/mainLayout.js';
import {WithStyleNav, WithStyleNavRouter} from '../layouts/navigation/nav.js';

class Job extends React.Component {
    render() {
        return (
            <ResponsiveDrawer title="Burj" navigation={<WithStyleNav/>} components={<WithStyleNavRouter/>}>
            </ResponsiveDrawer>
        );
    }
}

Job.propTypes = {
};

export default connect((state, ownProps) => ({}), {
})(Job);