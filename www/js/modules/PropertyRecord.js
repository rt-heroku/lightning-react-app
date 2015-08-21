import React from 'react';
import Router from 'react-router';

import * as propertyService from './services/PropertyService';

import {RecordHeader, HeaderField} from './components/PageHeader';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return {property:{}};
    },

    componentDidMount() {
        let propertyId = this.context.router.getCurrentParams().propertyId;
        propertyService.findById(propertyId).then((property) => {
            this.setState({property});
        });
    },

    saveHandler(property) {
        propertyService.updateItem(property).then(() => {
            console.log('property saved');
        });
    },

    editHandler() {
        window.location.hash= '#property/' + this.state.property.property_id + '/edit';
    },

    render() {
        return (
            <div>
                <RecordHeader type="Property" icon="user" title={this.state.property.address} onEdit={this.editHandler}>
                    <HeaderField label="City" value={this.state.property.city}/>
                    <HeaderField label="Type" value="Single Family"/>
                    <HeaderField label="Date Listed" value="Aug 1st 2015"/>
                    <HeaderField label="Asking Price" value={this.state.property.price}/>
                </RecordHeader>
                <RouteHandler property={this.state.property} saveHandler={this.saveHandler}/>
            </div>
        );
    }
});