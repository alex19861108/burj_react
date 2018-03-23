import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import {Link} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import {withStyles} from "material-ui/styles";

const styles = {
    link: {
        textDecoration: 'none',
    },
    active: {
        backgroundColor: '#ccc',
    }
};

class NavigationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Link to={this.props.to}
                      className={classNames(classes.link, this.state.active && classes.active)}
                >
                    <ListItem button>
                        <ListItemIcon>
                            {this.props.icon}
                        </ListItemIcon>
                        <ListItemText primary={this.props.primary}/>
                    </ListItem>
                </Link>
            </div>
        );
    }
}

NavigationItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationItem);