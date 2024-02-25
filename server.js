const port = process.env.PORT || 8000;

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

const url = 'https://www.ligue1.fr/classement';


app.get('/', (req,res)=>{
    let clubNameTab = [];
    
    axios(url)
    .then(response => {
        html = response.data;
        //console.log(html);
        const $ = cheerio.load(html);
        clubNameTab = [];
        $('span.GeneralStats-clubName.mobile-item',html).each(function() {
            const clubName = $(this).text();
            clubNameTab.push(clubName);
            //console.log(clubName);

        })
        res.send(clubNameTab);
        res.end();
        console.log(clubNameTab);
        
    }).catch(err => console.log(err))

     
})

app.listen(port , () => console.log(`Server running on PORT ${port}`));

