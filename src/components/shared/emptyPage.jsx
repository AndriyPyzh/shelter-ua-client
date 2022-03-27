import { Component } from 'react';

class EmptyPage extends Component {
    componentDidMount() {
        this.props.hideNavbar();
        this.props.hideFooter();
    }

    componentWillUnmount() {
        this.props.showNavbar();
        this.props.showFooter();
    }

    close = () => {
        this.props.showNavbar();
        this.props.showFooter();
        this.props.history.goBack();
    };
}

export default EmptyPage;
