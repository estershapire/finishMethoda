let express = require('express')
let getSQL = require('../../db/connectToSqlToGetData')

let router = express.Router()


router.get('/alltransition', async (req, res) => {
    const basicConnect = new getSQL('getAllTransition')
    let ans = await basicConnect.execProcedure(req.body)
    res.json(ans)
})


router.post('/addTransition', async (req, res) => {
    const basicConnect = new getSQL('addTransition')
    let ans = await basicConnect.execToadd(req.body)
    res.json(ans)
})


router.post('/deleteTransition', async (req, res) => {
    const basicConnect = new getSQL('deleteTransition')
    let ans = await basicConnect.execToadd(req.body)
    res.json(ans)
})


module.exports = router