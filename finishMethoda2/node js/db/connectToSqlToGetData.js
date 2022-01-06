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
           
            const connection = await sql.connect(config)
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
          
        }
        catch (err) {
            return "בעיה בחיבור"
        }
       if (result.recordset.length == 0)
             return "undefined"
        return result.recordset;
    }


    this.execToadd = async (obj) => {
       
        let result;
        const parameters = castParametrim(obj)
       
        try {
          
            const connection = await sql.connect(config)
            result = await connection.request().query(`EXEC ${procedore} ${parameters}`)
          
        }
        catch (err) {
            return "בעיה בחיבור"
        }
    
    }
}