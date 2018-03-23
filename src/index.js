import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './store/store.js';
import Job from './pages/home/index.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

class Index extends React.Component{
    componentDidMount(){
        document.title = "Burj"
    }

    render(){
        return(
            <MuiThemeProvider theme={createMuiTheme()}>
                <Provider store={store}>
                    <AppContainer>
                        <Job/>
                    </AppContainer>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);

registerServiceWorker();
