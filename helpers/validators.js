const { response } = require('express');
const moment = require('moment');

const dateValid = ( date ) => {

    if( !date ){
        throw new Error('No hay fecha en la peticion');
    }

    const dateMoment = moment(date);

    if ( !dateMoment.isValid() ) {
        throw new Error('La fecha es invalida');
    }

    return true;
}

module.exports = {
    dateValid
}