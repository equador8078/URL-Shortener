const generateShortId = require('ssid');
const URL=require('../Model/url')



async function makeShortUrl(req,res){
    const body=req.body;
    console.log(body);
    if(!body.url){
        return res.status(400).json( {msg:'please enter URL'})
    }

    const shortID=generateShortId(8);
    

    try {
        // Create a new document in the database
        const newUrl = await URL.create({
            shortUrl: shortID,
            redirectUrl: body.url,
            visited: [],
            createdBy:req.user._id,
        });

        console.log(newUrl)
        // Return the short ID as a response
        return res.render('home',{Id: shortID})
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'URL already exists' });
        }
        // Handle other potential errors
        return res.status(500).json({ msg: 'Server error', error });
    }
}

async function handelRedirectUrl(req,res){
    const shortID = req.params.shortId;
    console.log(shortID)
    const entry=await URL.findOneAndUpdate(
        {shortUrl:shortID},
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now()
                            }
                }
            
        }
    )

    console.log(entry)
    return res.redirect(entry.redirectUrl);
}

async function handelAnalytics(req,res){
    const shortID=req.params.shortId;
    if(!shortID){
        return res.status(404).json({msg:'Url not found!'})
    }
    const results= await URL.findOne({shortUrl:shortID});
    return res.json({totalClicks:results.visitHistory.length, analytics:results});
}

async function handelDeleteUrl(req, res) {
    const deleteUrl = req.query.deleteUrl; // Correctly get from query string
    console.log('Received delete URL:', deleteUrl);

    if (!deleteUrl) {
        return res.render('home', { msg: 'Please enter URL' });
    }

    try {
        const result = await URL.findOneAndDelete({ redirectUrl: deleteUrl });
        if (!result) {
            console.log('URL not found:', deleteUrl);
            return res.render('home', { msg: 'URL not found' });
        }
        console.log('URL deleted successfully:', deleteUrl);
        return res.render('home', { msg: 'URL deleted successfully' });
    } catch (error) {
        console.error('Error deleting URL:', error);
        return res.status(500).render('home', { msg: 'Server error' });
    }
}


module.exports={
    makeShortUrl,
    handelRedirectUrl,
    handelAnalytics,
    handelDeleteUrl
}