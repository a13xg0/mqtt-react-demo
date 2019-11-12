const express = require('express');
const path = require('path');

const mosca = require('mosca');

const moscaSettings = {
    port: 1883,			//mosca (mqtt) port
    backend: {}

};

const mqttServer = new mosca.Server(moscaSettings);	//here we start mosca
mqttServer.on('ready', () => {
    console.log('📡 MQTT ready');
});

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/start', (req,res) => {
    setTimeout(() => {
        mqttServer.publish(message = {
            topic: 'a13xg0-mqtt-demo/flight-data-1',
            payload: '{"flight": "I768", "state": "landing"}', // or a Buffer
            qos: 0, // 0, 1, or 2
            retain: false // or true
        }, () => {
                console.log('💣 pubished: a13xg0-mqtt-demo/flight-data-1');
        });

    }, 1000);

    setTimeout(() => {
        mqttServer.publish(message = {
            topic: 'a13xg0-mqtt-demo/flight-data-1',
            payload: '{"flight": "I768", "state": "landed"}', // or a Buffer
            qos: 0, // 0, 1, or 2
            retain: false // or true
        }, () => {
            console.log('💣 pubished: a13xg0-mqtt-demo/flight-data-1');
        });
    }, 3000);

    setTimeout(() => {
        mqttServer.publish(message = {
            topic: 'a13xg0-mqtt-demo/flight-data-2',
            payload: '{"flight": "D654", "state": "landing"}', // or a Buffer
            qos: 0, // 0, 1, or 2
            retain: false // or true
        }, () => {
            console.log('💣 pubished: a13xg0-mqtt-demo/flight-data-2');
        });
    }, 5000);

    setTimeout(() => {
        mqttServer.publish(message = {
            topic: 'a13xg0-mqtt-demo/flight-data-2',
            payload: '{"flight": "D654", "state": "landed"}', // or a Buffer
            qos: 0, // 0, 1, or 2
            retain: false // or true
        }, () => {
            console.log('💣 pubished: a13xg0-mqtt-demo/flight-data-2');
        });
    }, 8000);

    res.sendStatus(200);
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
const server = app.listen(port);

// Serve MQTT
mqttServer.attachHttpServer(server, '/mqtt');

console.log('App is listening on port ' + port);
