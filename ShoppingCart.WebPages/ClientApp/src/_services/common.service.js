import axios from 'axios';
import config from '../config/config';

export const commonService = {
    getAll,
    getSingle,
    addData,
    updateData,
    deleteData
};
function getAll(apiEndpoint) {
    return axios.get(config.baseUrl + apiEndpoint, getOptions())
        .then((response) => {
            return response;
        }).catch((err) => {
            console.log(err);
        })
}
function getSingle(apiEndpoint,id) {
    return axios.get(config.baseUrl + apiEndpoint, getParameterisedOptions(id))
        .then((response) => {
            return response;
        }).catch((err) => {
            console.log(err);
        })
}
function addData(apiEndpoint, payload) {

    return axios.post(config.baseUrl + apiEndpoint, payload, getParameterisedOptions(0))
        .then((response) => {
            return response;
        }).catch((err) => {
            return err;
            console.log(err);
        })
}
function updateData(apiEndpoint, payload, id) {

    return axios.put(config.baseUrl + apiEndpoint, payload, getParameterisedOptions(id))
        .then((response) => {
            return response;
        }).catch((err) => {
            console.log(err);
        })
}
function deleteData(apiEndpoint, id) {
    return axios.delete(config.baseUrl + apiEndpoint, getParameterisedOptions(id))
        .then((response) => {
            return response;
        }).catch((err) => {
            console.log(err);
        })
}
function getOptions() {
    let options = {};
    if (localStorage.getItem('token')) {
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    }
    return options;
}

function getParameterisedOptions(id) {
    let options = {};
    if (localStorage.getItem('token')) {
        options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json' };
        if (id != 0)
            options.parameters = { "id": id };
    }
    return options;
}