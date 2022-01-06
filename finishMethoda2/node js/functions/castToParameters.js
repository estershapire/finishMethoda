module.exports = function castToParameters(obj) {
    let parameters = "";
    for (let item in obj){
        parameters = parameters +`'`+ obj[item] +`'`+ ', '}
    parameters = parameters.substr(0, parameters.length - 2)
    return parameters
} 