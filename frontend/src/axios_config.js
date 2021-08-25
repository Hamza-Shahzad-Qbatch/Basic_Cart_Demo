const axios = require('axios');

const instance = axios.create({
    //baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}/`,
    baseURL: `http://localhost:5000/`,
    headers: { 'Content-Type': 'application/json' }
});

module.exports = instance;
