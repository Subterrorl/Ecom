const express = require('express');
const router = express.Router();
//controller
const {create,list,update,remove,listby,searchFilter} = require('../controllers/conProduct');

//Endpoint http://localhost:5000/api/product
router.post('/product', create);
router.get('/products/:count', list);
router.put('/product/:id', update);
router.delete('/product/:id', remove);
router.post('/productby', listby);
router.post('/search/filters', searchFilter);

module.exports = router;