import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {connect} from "react-redux";
import { getAllDevices } from "../../store/job/actions";
import {Link} from "react-router-dom";
import classNames from "classnames";
import TablePaginationActionsWrapped from "../layouts/tablePaginationActionsWrapped";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    link: {
        textDecoration: 'none',
    },
    active: {
        backgroundColor: '#ccc',
    }
});

class CustomPaginationActionsTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: 20,
        };
    }

    componentDidMount() {
        if (!this.props.devices.payload.length) {
            this.props.getAllDevices();
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.devices.payload.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Device Serial</TableCell>
                                <TableCell>Device Brand</TableCell>
                                <TableCell>Device Name</TableCell>
                                <TableCell>Device Model</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.devices.payload instanceof Array
                            && this.props.devices.payload.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow key={n.serial}>
                                        <TableCell><Link to={"/device/" + n.serial} className={classNames(classes.link, this.state.active && classes.active)}>{n.serial}</Link></TableCell>
                                        <TableCell>{n.brand}</TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>{n.model}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={this.props.devices.payload.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    Actions={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    devices: PropTypes.object.isRequired,
    getAllDevices: PropTypes.func.isRequired,
};

const DeviceTable = connect((state) => ({
    devices: state.deviceReducer,
}), {
    getAllDevices,
})(withStyles(styles)(CustomPaginationActionsTable));


export default DeviceTable;