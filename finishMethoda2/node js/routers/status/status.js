let express = require('express')
let getSQL = require('../../db/connectToSqlToGetData')

let router = express.Router()


router.get('/allStatus', async (req, res) => {
    const basicConnect = new getSQL('getAllStatus')
    let ans = await basicConnect.execProcedure(req.body)
    res.json(ans)
})


router.post('/addStatus', async (req, res) => {
    const basicConnect = new getSQL('addstatus')
    let ans = await basicConnect.execToadd(req.body)
    res.json(ans)
})

router.post('/deleteStatus', async (req, res) => {
    const basicConnect = new getSQL('deleteStatus')
    let ans = await basicConnect.execToadd(req.body)
    res.json(ans)
})

router.post('/updateStatus', async (req, res) => {
    const basicConnect = new getSQL('updateStatus')
    let ans = await basicConnect.execToadd(req.body)
    res.json(ans)
})



router.get('/reset', async (req, res) => {
    const basicConnect = new getSQL('reset')
    let ans = await basicConnect.execToadd(req.body)
    //console.log("req.body",req.body);
    res.json(ans)
})



module.exports = router