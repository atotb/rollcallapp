import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/neighborhood-transit.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>{data.stationName}</h1>
      <p><strong>Fetch Time:</strong> {new Date(data.fetchTime).toLocaleString()}</p>
      <h2>Best Stop to Bike To:</h2>
      <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <h3>{data.bikeCorridors[0].bestStop.stopName}</h3>
        <p><strong>Route:</strong> {data.bikeCorridors[0].bestStop.bus}</p>
        <p><strong>Arrives In:</strong> {data.bikeCorridors[0].bestStop.minutesToArrival} min</p>
        <p><strong>Bike Time:</strong> {data.bikeCorridors[0].bestStop.bikeTime} min</p>
      </div>
      <h2>Alternative Stops:</h2>
      {data.bikeCorridors[0].alternativeStops.map((stop, index) => (
        <div key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginTop: "10px" }}>
          <h3>{stop.stopName}</h3>
          <p><strong>Route:</strong> {stop.bus}</p>
          <p><strong>Arrives In:</strong> {stop.minutesToArrival} min</p>
          <p><strong>Bike Time:</strong> {stop.bikeTime} min</p>
        </div>
      ))}
    </div>
  );
};

export default App;
