import React from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

const Map = ({ location }) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {location && location.length === 2 && (
                <Marker position={location}>
                    <Popup>Hello from Kolkata 🇮🇳</Popup>
                </Marker>
            )}
        </MapContainer>
    )
}

export default Map
