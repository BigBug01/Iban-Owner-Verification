const { default: axios } = require("axios");
var {asyncsleep, sleep} = require('s1eep');
const fs = require('fs')




const base_url = `BACK İBAN APİ ADRESS`; // APİ'ye gönderilen İBAN burada alınır ve data.txt olarak işlenerek puppetere aktarılır.
async function start(){
  while(true){
    await asyncsleep(3000)
    axios.get(base_url)
    .then(response => response.data)
    .then(commits => {
      if (commits.length > 0) {
        console.log(commits[0].title)
        fs.writeFileSync('data.txt', commits[0].title)
        console.log("Veri alındı")
      }
      else {
        fs.writeFileSync('data.txt', "")
        console.log("Veri boş")
      }
    })
  }
}

start()