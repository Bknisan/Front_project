import {GoogleApiWrapper} from 'google-maps-react';
import {GoogleMap, Marker} from '@react-google-maps/api';
import React, {Component} from "react";
import Search from "./Search";
import "./css/List.css"
import {PlaceDetails} from "./PlaceDetails";

const mapStyles = {
    width: '80%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginLeft: '20%'
};
const mapOptions = {fullscreenControl: false, mapTypeControl: false};

export class Map_ChoosePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            center: {
                lat: 51.509865
                , lng: -0.118092
            },
            place_id: null,
            search_lat: null,
            search_lon: null
        }
    }

    // Create and display Markers on screen
    displayMarkers = () => {
        return this.state.markers.map((mark, index) => {
            return <Marker
                key={index}
                id={index}
                position={{lat: mark.lat, lng: mark.lng}}
            />
        })
    };

    // Focus on new searched place and show details
    searchClick = (latLng, place_id) => {
        this.setState({
            center: {lat: latLng.lat, lng: latLng.lng},
            place_id: place_id,
            search_lat: latLng.lat,
            search_lon: latLng.lng
        });
    };

    // Handle list item click
    itemClick = (clickedItem) => {
        const markers = this.state.markers.filter((marker) => {
            return (marker.name === clickedItem)
        });

        this.setState({center: {lat: markers[0].lat, lng: markers[0].lng}});
    };

    // Delete list item
    deleteItem = (name) => {
        const markers = this.state.markers.filter((marker) => {
            return (marker.name !== name)
        });
        this.setState({markers})
    };

    // Display list item
    displayNames = () => {
        return this.state.markers.map((marker) => {
            return <div id="flex" key={marker.name}>
                <button type="button" className="btn btn-danger"
                        style={{margin: '5px'}}
                        onClick={this.deleteItem.bind(this, marker.name)}>Delete
                </button>
                <li className='list-group-item' id="name" onClick={this.itemClick.bind(this, marker.name)}
                    key={marker.name}>
                    {marker.name}
                </li>

            </div>
        });
    };

    newPlace = (lat, lon, name, place_id) => {
        this.state.markers.push({lat: lat, lng: lon, name: name});
        const markers = this.state.markers;
        this.setState({markers, center: {lat: lat, lng: lon}, place_id: place_id});
    };

    render() {
        return (
            <div>
                <GoogleMap
                    zoom={14}
                    mapContainerStyle={mapStyles}
                    initialCenter={this.state.center}
                    center={this.state.center}
                    options={mapOptions}
                >
                    {this.state.place_id !== null && <Marker
                        position={{lat: this.state.search_lat, lng: this.state.search_lon}}
                        label={'?'}
                    />}
                    {this.displayMarkers()}
                </GoogleMap>
                {this.state.place_id !== null &&
                <PlaceDetails place_id={this.state.place_id} addPlace={this.newPlace}/>}
                <div id="list">
                    <h1 style={{marginTop: '10px'}}>UserName</h1>
                    <hr/>
                    <br/>
                    <h5>Destinations List</h5>
                    <ul className="list-group">
                        {this.displayNames()}
                    </ul>
                    <div className="btn-group" id="button-bottom-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary">Back</button>
                        <button type="button" className="btn btn-secondary">Next</button>
                    </div>
                </div>
                <Search setNewMarker={this.searchClick}/>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB-5ZqhQMi_GAqi6zNnHEujTCc8zO_Nmp0'
})(Map_ChoosePlaces, Search);