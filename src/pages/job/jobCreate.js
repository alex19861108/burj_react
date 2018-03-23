import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import {createJob, getImageTags} from '../../store/job/actions';
import {
    Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, MenuItem,
    TextField
} from 'material-ui';
import {withRouter} from 'react-router';
import MessageBox from '../layouts/messageBox.js';
import Immutable from 'immutable';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
    menu: {
        width: 200,
    },
    submitButton: {
        margin: theme.spacing.unit,
        width: 100,
    },
    CheckboxesGroup: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
});

class ImageTagsCheckboxesGroup extends React.Component {
    state = {
        labels: Immutable.Map({}),
    };

    componentDidMount() {
        if (!this.props.jobImageTagsReducer.payload.length) {
            this.props.getImageTags();
        }
    }

    handleCheckboxChange = n => (event, checked) => {
        this.setState({ labels: this.state.labels.set([n], checked) });
        this.props.onChangeHandler(n, checked);
    };

    render() {
        const {classes} = this.props;

        return (
            <FormControl component="fieldset" className={classes.CheckboxesGroup}>
                <FormLabel component="legend">Tags</FormLabel>
                <FormGroup>
                    {this.props.jobImageTagsReducer.payload.map( (item, index, input) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.labels.get(item.value)}
                                        onChange={this.handleCheckboxChange(item.value)}
                                        value={item.value}
                                    />
                                }
                                label={item.label}
                                key={item.label}
                            />
                        );
                    })}
                </FormGroup>
                <FormHelperText>图片tags</FormHelperText>
            </FormControl>
        );
    }
}

ImageTagsCheckboxesGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    getImageTags: PropTypes.func.isRequired,
    jobImageTagsReducer: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
};

const ImageTagsCheckboxesGroupWithRouter = withRouter(connect((state) => ({
    jobImageTagsReducer: state.jobImageTagsReducer,
}), {
    getImageTags,
})(withStyles(styles)(ImageTagsCheckboxesGroup)));


class ImageTagsSelectbox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            image_tags: '',
        };
    }

    componentDidMount() {
        if (!this.props.jobImageTagsReducer.payload.length) {
            this.props.getImageTags();
        }
    }

    handleChange = n => event => {
        this.setState({
            [n]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <TextField
                id={'image_tags'}
                select
                label={'Select Image Tags'}
                className={classes.textField}
                value={this.state.image_tags}
                onChange={this.handleChange('image_tags')}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                helperText='选择一个tag'
                margin='normal'
            >
                {this.props.jobImageTagsReducer.payload.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

ImageTagsSelectbox.propTypes = {
    classes: PropTypes.object.isRequired,
    getImageTags: PropTypes.func.isRequired,
    jobImageTagsReducer: PropTypes.object.isRequired,
};

const ImageTagsSelectWithRouter = withRouter(connect((state) => ({
    jobImageTagsReducer: state.jobImageTagsReducer,
}), {
    getImageTags,
})(withStyles(styles)(ImageTagsSelectbox)));


class JobCreateForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: '',
            apkPath: '',
            apkPkgName: '',
            apkClassName: 'MainActivity',
            fireRedirect: false,
            imageTags: Immutable.Map({}),
        };
    }

    componentDidMount() {
        if (!this.props.jobImageTagsReducer.payload.length) {
            this.props.getImageTags();
        }
    }

    handleChange = n => event => {
        this.setState({
            [n]: event.target.value,
        });
    };

    handleCheckboxChange = n => (event, checked) => {
        this.setState({ imageTags: this.state.imageTags.setIn([n], checked) });
    };

    handleSubmit = event => {
        event.preventDefault();
        var image_tags = this.state.imageTags.filter((value, key)=>{
            return value === true;
        }).keySeq().join(',');
        let params = {
            name: this.state.name,
            image_tags: image_tags,
            apk_path: this.state.apkPath,
            apk_pkg_name: this.state.apkPkgName,
            apk_class_name: this.state.apkClassName,
        };
        this.props.createJob(params);
        this.setState({fireRedirect: true});
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                {this.props.jobCreateReducer.error && (<MessageBox msg={JSON.stringify(this.props.jobCreateReducer.payload)} title={"Error"} type={"error"}/>)}
                { this.state.fireRedirect && this.props.jobCreateReducer.meta && this.props.history.push(this.props.jobCreateReducer.meta.redirectTo)}
                <form className={classes.root} noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        id={'name'}
                        label={'Name'}
                        className={classes.textField}
                        defaultValue={this.state.name}
                        onChange={this.handleChange('name')}
                        helperText='任务名称'
                        margin='normal'
                    />
                    <FormControl component="fieldset" className={classes.CheckboxesGroup}>
                        <FormLabel component="legend">Tags</FormLabel>
                        <FormGroup>
                            {this.props.jobImageTagsReducer.payload instanceof Array && this.props.jobImageTagsReducer.payload.map( (item, index, input) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.imageTags.get(item.value)}
                                                onChange={this.handleCheckboxChange(item.value)}
                                                value={item.value}
                                            />
                                        }
                                        label={item.label}
                                        key={item.label}
                                    />
                                );
                            })}
                        </FormGroup>
                        <FormHelperText>图片tags</FormHelperText>
                    </FormControl>
                    <TextField
                        required
                        id={'apkPath'}
                        label={'Apk Package Path'}
                        className={classes.textField}
                        onChange={this.handleChange('apkPath')}
                        helperText='Apk包的http地址'
                        margin='normal'
                    />
                    <TextField
                        required
                        id={'apkPkgName'}
                        label={'Apk Package Name'}
                        className={classes.textField}
                        onChange={this.handleChange('apkPkgName')}
                        helperText='Apk包名'
                        margin='normal'
                    />
                    <TextField
                        required
                        id={'apkClassName'}
                        label={'Apk Class Name'}
                        className={classes.textField}
                        defaultValue='MainActivity'
                        onChange={this.handleChange('apkClassName')}
                        helperText='Apk包启动的类名'
                        margin='normal'
                    />
                    <Button
                        variant='raised'
                        color='primary'
                        type='submit'
                        className={classes.submitButton}
                    >提交</Button>
                </form>
            </div>
        );
    }
}

JobCreateForm.propTypes = {
    classes: PropTypes.object.isRequired,
    createJob: PropTypes.func.isRequired,
    getImageTags: PropTypes.func.isRequired,
    jobImageTagsReducer: PropTypes.object.isRequired,
    jobCreateReducer: PropTypes.object.isRequired,
};

const JobCreateWithRouter = withRouter(connect((state, ownProps) => ({
    jobImageTagsReducer: state.jobImageTagsReducer,
    jobCreateReducer: state.jobCreateReducer,
}), {
    createJob,
    getImageTags,
})(withStyles(styles)(JobCreateForm)));


export default JobCreateWithRouter;