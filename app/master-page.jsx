import React, { Component } from 'react';
import { Link } from 'react-router';

class RootPage extends Component {
    getLinkClass(link) {
        return this.context.router.isActive(link) ? 'active' : '';
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Project</Link>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className={this.getLinkClass('/about')}>
                                    <Link to="/about">About</Link>
                                </li>
                                <li className={this.getLinkClass('/contact')}>
                                    <Link to="/contact" >Contact</Link>
                                </li>
                            </ul>
                       </div>
                    </div>
                </nav>
                <div className="jumbotron">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

RootPage.contextTypes = {
    router: React.PropTypes.object
};

export default RootPage;
