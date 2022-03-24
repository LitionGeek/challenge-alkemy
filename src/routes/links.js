const express = require('express');
const router = express.Router();
/* const pool = require('../database') */

router.get('add',(req,res)=>{
    res.send('Form')
})

module.exports = router;