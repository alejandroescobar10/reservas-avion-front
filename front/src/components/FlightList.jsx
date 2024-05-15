import '../styles/FlightList.css'; 
import React, { useState, useEffect } from 'react';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const apiUrl = "https://reservas-avion-back.vercel.app/";


    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch(`${apiUrl}/v1/listarViajes`);
                if (response.ok) {
                    const data = await response.json();
                    setFlights(data);
                } else {
                    console.error('Error al obtener la lista de vuelos');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
        };

        fetchFlights();
    }, []);
    return (
        <div className="flightListContainer">
            <h2 className="flightListTitle">Lista de Vuelos</h2>
            <ul className="flightList">
                {flights.map((flight, index) => (
                    <li key={index} className="flightListItem">
                        Origen: <span className="flightDetail">{flight.origen}</span>, Destino: <span className="flightDetail">{flight.destino}</span>, Día: <span className="flightDetail">{flight.dia}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FlightList;    