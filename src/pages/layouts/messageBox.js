import React from "react";
import PropTypes from 'prop-types';
import {Paper, Typography, withStyles} from "material-ui";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class MessageBox extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root} elevation={4}>
                <Typography variant="headline" component="h3">
                { this.props.title }
                </Typography>
                <Typography component="p">
                { this.props.msg }
                </Typography>
            </Paper>
        );
    }
}

MessageBox.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(MessageBox);