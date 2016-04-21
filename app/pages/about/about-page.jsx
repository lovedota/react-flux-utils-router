import React from 'react';
import moment from 'moment';
import { Container } from 'flux-utils';
import { autobind } from 'core-decorators';

import { BootstrapModal } from '@common';

import AboutStore from './about-store';
import AboutAction from './about-action';

@autobind
class AboutPage extends React.Component {
    static getStores() {
        return [AboutStore];
    }

    static calculateState() {
        return {
            recentlyCancelDate: AboutStore.at('recentlyCancelDate'),
            recentlyOpenDate: AboutStore.at('recentlyOpenDate')
        };
    }
    
    constructor(props) {
        super(props);    
        
        this.state = {
            stop: true
        };
    }
    
    render() {
        let { recentlyOpenDate, recentlyCancelDate} = this.state,
            formatType = 'YYYY MMMM dddd hh:mm:ss a',
            modal = (
                <BootstrapModal
                    ref="modal"
                    confirm="OK"
                    cancel="Cancel"
                    onCancel={this.handleCancel}
                    onConfirm={this.closeModal}
                    onHidden={this.handleModalDidClose}
                    title="Welcome to Bootstrap Modal Dialog"
                >
                    This is a React component powered by jQuery and Bootstrap! <br/>
                    Recently Open: {moment(recentlyOpenDate).format(formatType)} <br/>
                    Recently Close: {moment(recentlyCancelDate).format(formatType)}
                </BootstrapModal>
            );
        
        return (
            <div className="container">
                <h1>About</h1>
                {modal}
                <button
                    className="btn btn-success"
                    onClick={this.openModal}
                >
                    Open Modal
                </button>
            </div>
        );
    }

    openModal() {
        AboutAction.open();
        this.refs.modal.open();
    }
    
    closeModal() {
        this.refs.modal.close();
    }
    
    handleCancel() {
        AboutAction.cancel();
        this.refs.modal.close();
    }
    
    handleModalDidClose() {
        console.log('The modal has been dismissed!');
    }
}

export default Container.create(AboutPage);;