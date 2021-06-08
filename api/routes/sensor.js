const express = require ('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling / request'
    });
});


router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling / Post request'
    });
});

router.patch('/:sensorId',(req,res,next)=>{
    res.status(200).json({
        message:'updated product'
    });
});

router.delete('/:sensorId',(req,res,next)=>{
    res.status(200).json({
        message:'updated product'
    });
});

module.exports = router;
