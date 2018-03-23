import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import {getJobDetail} from '../../store/job/actions';
import {withRouter} from 'react-router';
import JSONTree from 'react-json-tree';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class JobDetail extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    componentDidMount() {
        this.props.getJobDetail(this.props.match.params.jid);
    }

    render() {
        const {classes} = this.props;

        return (
            <JSONTree className={classes.root} data={this.props.jobDetailReducer.payload} shouldExpandNode={function(keyName, data, level){return true;}}/>
        );
    }
}

JobDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    getJobDetail: PropTypes.func.isRequired,
    jobDetailReducer: PropTypes.object.isRequired,
};

const JobDetailWithRouter = withRouter(connect((state) => ({
    jobDetailReducer: state.jobDetailReducer,
}), {
    getJobDetail,
})(withStyles(styles)(JobDetail)));


export default JobDetailWithRouter;