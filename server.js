const port = process.env.PORT || 8000;

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

 url = 'https://www.ligue1.fr/classement';

let clubNameTab = [];

/*
axios(url)
.then(response => {
    const html = response.data;
    //console.log(html);
    const $ = cheerio.load(html);
    $('span.GeneralStats-clubName.mobile-item',html).each(function() {
        const clubName = $(this).text();
        clubNameTab.push(clubName);
        //console.log(clubName);
    })
    //console.log(clubNameTab);
    
}).catch(err => console.log(err))

*/




app.get('/', (req,res)=>{
    
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
