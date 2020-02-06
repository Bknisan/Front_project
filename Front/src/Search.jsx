import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const input_style = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `100%`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    top: '10px',
    right: '10px',
    backgroundColor: 'white',
    borderColor:'black'
};


export default function Search({setNewMarker}) {

    const [address, setAddress] = React.useState("");

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const place_id = results[0].place_id;
        const latLng = await getLatLng(results[0]);
        setNewMarker(latLng, value, place_id);
    };
    return (
        <div style={{
            position: 'absolute',
            marginLeft: '20%',
            top: '0',
            width: '19.25%'
        }}>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input ref="input" style={input_style} {...getInputProps({placeholder: "Type address"})} />
                        <div>
                            {loading ? <div>loading...</div> : null}
                            {suggestions.map(suggestion => {

                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                    border: '2px solid #dfdfdf',
                                    fontSize: `14px`
                                };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {style})}>
                                        <i className="material-icons"
                                           style={{marginRight: '5px'}}>{getIcon(suggestion.types)}</i>
                                        <strong>
                                            {suggestion.formattedSuggestion.mainText}
                                        </strong>{' '}
                                        <small style={{marginRight: '5px'}}>
                                            {suggestion.formattedSuggestion.secondaryText}
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
}

function getIcon(typesList) {
    switch (true) {
        case (typesList.includes('lodging')):
            return 'hotel';
        case (typesList.includes('airport')):
            return 'local_airport';
        case (typesList.includes('restaurant')):
            return 'restaurant';
        case (typesList.includes('store')):
            return 'local_mall';
        case (typesList.includes('art_gallery')):
            return 'color_lens';
        case (typesList.includes('bar')):
            return 'local_bar';
        case (typesList.includes('cafe')):
            return 'local_cafe';
        case (typesList.includes('casino')):
            return 'casino';
        case (typesList.includes('museum')):
            return 'museum';
        case (typesList.includes('park')):
            return 'eco';
        case (typesList.includes('mall')):
            return 'local_mall';
        case (typesList.includes('spa')):
            return 'spa';
        case (typesList.includes('stadium')):
            return 'sports_soccer';
        case (typesList.includes('subway_station')):
            return 'subway';
        case (typesList.includes('zoo')):
            return 'pets';
        default:
            return 'place';
    }
}
