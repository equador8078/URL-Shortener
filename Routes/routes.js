const express=require('express')
const {makeShortUrl,handelRedirectUrl,handelAnalytics,handelDeleteUrl}=require('../Controller/function')

const router=express.Router();

router.route('/')
.post(makeShortUrl)

router
.get('/delete',handelDeleteUrl)
.get('/:shortId',handelRedirectUrl)
.get('/analytics/:shortId',handelAnalytics)



module.exports=router;