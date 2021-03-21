const fetch = require('node-fetch');
const moment = require('moment');

const URL = 'https://his.bg/bg/reservation/schedule';
const hospitals = require('./data.json');

(async () => {
    try {
        for (let hospital of hospitals.data) {
            // this needs to be changed if the website is update (suck I know)
            let startDate = new Date(2021,3, 28);
            // look 2 weeks from start date
            for (let i = 0; i < 14; i++) {
                let formattedDate = moment(startDate).format('DD.MM.YYYY');
                console.log(`checking ${hospital.t} on ${formattedDate}`)
                let body = `center=${hospital.v}&fordate=${formattedDate}`;
                let response = await fetch(URL, {method: 'POST', body: body});
                let data = await response.json();
                let res = data.flat().filter(item=>item.fill<5).map(item=>item.hour);
                if (res.length>0){
                    console.log(`${hospital.t} has availability on date ${formattedDate} ${res} \n`);
                }
                startDate.setDate(startDate.getDate() + 1);
            }
        }

    } catch (error) {
        console.log(error);
    }
})();