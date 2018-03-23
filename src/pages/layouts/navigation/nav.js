import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles";
import List from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import BookIcon from 'material-ui-icons/Book';
import ReportIcon from 'material-ui-icons/Report';
import Divider from "material-ui/Divider";
import NavigationItem from "./navItem.js";
import {Route} from "react-router-dom";
import JobTable from "../../job/jobTable";
import JobCreateWithRouter from "../../job/jobCreate";
import JobDetailWithRouter from "../../job/jobDetail";
import NodeTable from "../../node/nodeTable";
import DeviceTable from "../../device/deviceTable";
import NodeDetailWithRouter from "../../node/nodeDetail";

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
};

class Nav extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Divider/>
                <List className={classes.list}>
                    <NavigationItem to={`/job/show`} icon={<InboxIcon/>} primary='查看任务'/>
                    <NavigationItem to={`/job/create`} icon={<DraftsIcon/>} primary="创建任务"/>
                </List>
                <Divider/>
                <List className={classes.list}>
                    <NavigationItem to={`/node/show`} icon={<BookIcon/>} primary='客户端节点'/>
                </List>
                <Divider/>
                <List className={classes.list}>
                    <NavigationItem to={`/device/show`} icon={<BookIcon/>} primary='手机节点'/>
                </List>
                <Divider/>
                <List className={classes.list}>
                    <NavigationItem to={`/help`} icon={<ReportIcon/>} primary='帮助'/>
                </List>
            </div>
        );
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

class NavRouter extends React.Component {
    render() {
        return (
            <div>
                <Route path="/job/show" component={JobTable}></Route>
                <Route path="/job/create" component={JobCreateWithRouter}></Route>
                <Route path="/job/:jid([\w]{10,30})" component={JobDetailWithRouter}></Route>
                <Route path="/node/show" component={NodeTable}></Route>
                <Route path="/device/show" component={DeviceTable}></Route>
                <Route path="/node/:nid([\w]{10,30})" component={NodeDetailWithRouter}></Route>
            </div>
        );
    }
}

var WithStyleNav = withStyles(styles)(Nav);
var WithStyleNavRouter = withStyles(styles)(NavRouter);

export {WithStyleNav, WithStyleNavRouter}