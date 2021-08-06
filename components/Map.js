import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});
    
    // Transform the search resilts object into the
    //{latitude : 52.516272, longitude : 13.377722}
    //object
    const coordinates = searchResults.map((result) =>({
        longitude : result.long,
        latitude : result.lat,
    }));

    //The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL mapStyle="mapbox://styles/iamgaurav0074/cks0i9yol3pid17pevan2lh13" mapboxApiAccessToken={process.env.mapbox_key} {...viewport} onViewportChange={(nextViewport) => setViewport(nextViewport)}>
            {searchResults.map(result =>(
                <div key={result.long}>
                    <Marker 
                        longitude ={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetRight={-10}>
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">📌</p>
                    </Marker>

                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup onClose={() => setSelectedLocation({})} closeOnClick={true} latitude={result.lat} longitude={result.long}>
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                    
                </div>
            ))}

            
        </ReactMapGL>
    );
}

export default Map;
