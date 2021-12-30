let express = require('express')
let getSQL = require('../../db/connectToSqlToGetData')

let router = express.Router()


router.get('/allStatus', async (req, res) => {
    const basicConnect = new getSQL('getAllStatus')
    //console.log("req.body in get",req.body);
    let ans = await basicConnect.execProcedure(req.body)
    console.log("getAll",ans);
    res.json(ans)
})


router.post('/addStatus', async (req, res) => {
    const basicConnect = new getSQL('addstatus')
    let ans = await basicConnect.execToadd(req.body)
    //console.log("req.body",req.body);
    res.json(ans)
})

router.post('/deleteStatus', async (req, res) => {
    //console.log("lll");
    //console.log("hhh");
    const basicConnect = new getSQL('deleteStatus')
    //console.log("iii");
    let ans = await basicConnect.execToadd(req.body)
   // console.log("req.body",req.body);
    res.json(ans)
})

router.post('/updateStatus', async (req, res) => {
    const basicConnect = new getSQL('updateStatus')
    let ans = await basicConnect.execToadd(req.body)
    console.log("req.body in update",req.body);
    res.json(ans)
})



router.get('/reset', async (req, res) => {
    const basicConnect = new getSQL('reset')
    let ans = await basicConnect.execToadd(req.body)
    //console.log("req.body",req.body);
    res.json(ans)
})



module.exports = router