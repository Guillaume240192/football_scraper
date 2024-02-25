const port = process.env.PORT || 8000;

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

const url = 'https://www.ligue1.fr/classement';



// usefull to allow request from all the websites (*)
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.get('/', (req,res)=>{
    let clubNameTab = [];
 
    axios(url)
    .then(response => {
        html = response.data;
        //console.log(html);
        const $ = cheerio.load(html);
        $('span.GeneralStats-clubName.mobile-item',html).each(function() {
            const clubName = $(this).text();
            clubNameTab.push(clubName);
            //console.log(clubName);
        })
        //console.log(clubNameTab);
        
    }).catch(err => console.log(err))
    res.json(clubNameTab);
     
})

app.listen(port , () => console.log(`Server running on PORT ${port}`));
