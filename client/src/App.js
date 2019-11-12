import React, { useState, useEffect } from 'react';
import "react-table/react-table.css";
import ReactTable from "react-table";
import {getInitialFlightData} from "./DataProvider";
import { subscribe } from 'mqtt-react';

function App({data}) {
    const [arrivalData, setArrivalData] = useState(getInitialFlightData());

    const updateFlightState = (flightState) => {
        let newData = arrivalData.map(item => {
            if (item.flight === flightState.flight) {
                item.state = flightState.state;
            }
            return item;
        });
        setArrivalData(newData);
    };
    console.log(data);
    useEffect(() => {
        if (data.length > 0 ) {
            const flightData = data[0];
            updateFlightState(flightData);
        };
    }, [data]);

    const startMessaging = () => {
        fetch('/api/start');
    };

    const columns = [
        {
            Header: "Origin",
            accessor: "origin"
        },
        {
            Header: "Flight",
            accessor: "flight"
        },
        {
            Header: "Arrival",
            accessor: "arrival"
        },
        {
            Header: "State",
            accessor: "state"
        }
    ];



    return (
    <div className="App">
        <button onClick={startMessaging.bind(this)}>Start events</button>
        <ReactTable data={arrivalData} columns={columns} />
    </div>
    );
}

export default subscribe({
    topic: 'a13xg0-mqtt-demo/flight-data-1'
})(App);
