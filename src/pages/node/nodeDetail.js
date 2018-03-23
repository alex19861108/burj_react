import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import {getNodeDetail} from '../../store/job/actions';
import {withRouter} from 'react-router';
import JSONTree from 'react-json-tree';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class NodeDetail extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.nid);
        this.props.getNodeDetail(this.props.match.params.nid);
    }

    render() {
        const {classes} = this.props;

        return (
            <JSONTree className={classes.root} data={this.props.NodeDetailReducer.payload} shouldExpandNode={function(keyName, data, level){return true;}}/>
        );
    }
}

NodeDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    getNodeDetail: PropTypes.func.isRequired,
    NodeDetailReducer: PropTypes.object.isRequired,
};

const NodeDetailWithRouter = withRouter(connect((state) => ({
    NodeDetailReducer: state.nodeDetailReducer,
}), {
    getNodeDetail,
})(withStyles(styles)(NodeDetail)));


export default NodeDetailWithRouter;