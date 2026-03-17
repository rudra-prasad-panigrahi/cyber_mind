import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AttackMap = ({ history }) => {
  // We use precise [Latitude, Longitude] coordinates.
  // In a real production system, an IP Geolocation API (like ip-api.com) 
  // would automatically convert the attacker's IP into these exact coordinates!
  const locations = {
    'Russia': [55.7558, 37.6173],     // Moscow
    'China': [39.9042, 116.4074],     // Beijing
    'USA': [38.9072, -77.0369],       // Washington DC
    'Brazil': [-23.5505, -46.6333],   // Sao Paulo
    'India': [20.5937, 78.9629]       // Central India SOC Node
  };

  const targetCoords = locations['India'];
  const activeAttacks = history ? history.filter(threat => threat.attack_type !== 'Normal') : [];

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #c0c4c8' }}>
      
      <MapContainer 
        center={[25, 50]} // Centers the map beautifully between the continents
        zoom={3}          // Starting zoom level
        minZoom={2}
        maxZoom={19}      // This allows you to zoom ALL the way down to the streets!
        style={{ height: "100%", width: "100%", background: '#e5e3df' }}
      >
        
        {/* 🔥 THIS IS THE MAGIC LINE: Pulls the exact Google Maps visual style 🔥 */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution="&copy; Google Maps"
        />

        {/* The Target Node (Your SOC at GIET) */}
        <CircleMarker 
          center={targetCoords} 
          radius={8} 
          pathOptions={{ color: '#1e3a8a', fillColor: '#2563eb', fillOpacity: 0.8 }}
        >
          <Tooltip permanent direction="bottom" offset={[0, 10]} opacity={0.9}>
            <strong style={{ color: '#1e3a8a' }}>SOC NODE</strong>
          </Tooltip>
        </CircleMarker>

        {/* Draw the Attacks & Attackers */}
        {activeAttacks.map((threat, index) => {
          const originCoords = locations[threat.origin_country] || locations['Russia'];
          
          return (
            <React.Fragment key={index}>
              {/* Draw the dashed attack route */}
              <Polyline
                positions={[originCoords, targetCoords]}
                pathOptions={{ color: '#ef4444', weight: 2, dashArray: '5, 5' }}
              />
              
              {/* Draw the Attacker's origin point and IP */}
              <CircleMarker 
                center={originCoords} 
                radius={6} 
                pathOptions={{ color: '#b91c1c', fillColor: '#ef4444', fillOpacity: 0.8 }}
              >
                <Tooltip permanent direction="top" offset={[0, -10]} opacity={0.9}>
                  <span style={{ fontFamily: "monospace", color: "#b91c1c", fontWeight: "bold" }}>
                    {threat.source_ip}
                  </span>
                </Tooltip>
              </CircleMarker>
            </React.Fragment>
          );
        })}
        
      </MapContainer>
    </div>
  );
};

export default AttackMap;