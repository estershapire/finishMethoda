const sql = require('mssql')
const castParametrim = require('../functions/castToParameters')




 config = {
    user: 'aaa',
    password: '111',
    server: 'DESKTOP-DM144K9',
    database: 'methoda',
    trustserverCertificate: true,
    autoLoadEntities: true,
    synchronize: true,
    options: { encrypt: false },

};



module.exports = function getData(procedore) {
    this.execProcedure = async (obj) => {
        let result;
        const parameters = castParametrim(obj)
        try {
            //console.log(`EXEC ${procedore} ${parameters}`);

            const connection = await sql.connect(config)
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
           // console.log(result);
        }
        catch (err) {
            return "בעיה בחיבור"
        }
       if (result.recordset.length == 0)
             return "undefined"
        return result.recordset;
    }


    this.execToadd = async (obj) => {
       // console.log("obj",obj);

        let result;
        const parameters = castParametrim(obj)
        //console.log("parameters",parameters);
        try {
            console.log(`EXEC ${procedore} ${parameters}`);

            const connection = await sql.connect(config)
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
           // console.log(result);
        }
        catch (err) {
            return "בעיה בחיבור"
        }
    //    if (result.recordset.length == 0)
    //          return "undefined"
    //     return result.recordset;
    }
}