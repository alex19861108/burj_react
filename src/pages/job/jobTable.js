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
import { getAllJobs } from "../../store/job/actions";
import {Link} from "react-router-dom";
import classNames from "classnames";
import TablePaginationActionsWrapped from "../layouts/tablePaginationActionsWrapped";

const styles = theme => ({
    root: {
        width: '100%',
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
            //data: this.props.jobs.data, //.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 20,
        };
    }

    componentDidMount() {
        if (!this.props.jobs.payload.length) {
            this.props.getAllJobs();
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
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.jobs.payload.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Id</TableCell>
                                <TableCell>Job Name</TableCell>
                                <TableCell>Apk Name</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Update Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.jobs.payload instanceof Array && this.props.jobs.payload.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell><Link to={"/job/" + n.id} className={classNames(classes.link, this.state.active && classes.active)}>{n.id}</Link></TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>{n.Apk.pkgName}</TableCell>
                                        <TableCell>{
                                            n.Tags instanceof Array && n.Tags.map(t => {
                                                return t.mark + " ";
                                            })
                                        }</TableCell>
                                        <TableCell>{(() => {
                                            switch (n.status) {
                                                case 0:  return "PREPARE";
                                                case 1:  return "RUNNING";
                                                case 2:  return "SUCCESS";
                                                case 3:  return "ERROR";
                                                default: return "UNKNOWN";
                                            }
                                        })()}</TableCell>
                                        <TableCell>{n.updateTime}</TableCell>
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
                                    count={this.props.jobs.payload.length}
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
    jobs: PropTypes.object.isRequired,
    getAllJobs: PropTypes.func.isRequired,
};

const JobTable = connect((state, ownProps) => ({
    jobs: state.jobReducer,
}), {
    getAllJobs,
})(withStyles(styles)(CustomPaginationActionsTable));


export default JobTable;