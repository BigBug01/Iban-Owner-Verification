const { response } = require('express');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require("fs");

    
          
const login = async () => {
  const browser = await puppeteer.launch({headless: false}); // headless true olursa arka planda çalışır.
  const page = await browser.newPage();
  await page.goto('https://isube.kuveytturk.com.tr/Login/InitialLogin'); // KuveytTürk'e göre yapılmıştır.
  //await page.screenshot({ path: 'example.png' });
  await page.reload(); // sayfa yenile
  await page.waitForTimeout(1000)
  await page.keyboard.press('Tab'); // Promosyon ok
  await page.waitForTimeout(1000)
  await page.keyboard.press('Enter'); // promosyon ok
  await page.waitForTimeout(1000)
  await page.click('#IntUserName');
  await page.waitForTimeout(3000)
  var data = fs.readFileSync('data.txt', 'utf-8'); // İban Check STEP 1 consol
  console.log(data)
  await page.keyboard.type("11111111111");  // TC kimlik No
  await page.waitForTimeout(4000) 
  await page.click('#Password');
  await page.waitForTimeout(1000)
  await page.keyboard.type('111223');  // Şifre
  await page.waitForTimeout(2000)
  await page.click('#btnSubmit'); //login button+
  await page.waitForTimeout(2000)
  await page.click('#LoginButton'); // login button
  await page.waitForTimeout(15000)
  await page.click('#rootNode901');
  await page.waitForTimeout(3000)
  await page.click('#NodeSub5747');
  await page.waitForTimeout(3000)
  await page.click('#Menu_IBAN');
  await page.waitForTimeout(3000) 
  while(true){
  await page.evaluate( () => document.getElementById("IBAN").value = " "); // Textboxt Sıfırlanır
  await page.waitForTimeout(2000)
  await page.click('#IBAN');
  await page.waitForTimeout(2000)
  var data = fs.readFileSync('data.txt', 'utf-8'); // Comdate Servisi gelen veriyi data.txt yazar ve veri buraya alınarak kontrol edilir.
  console.log(data)
  await page.keyboard.type(data);
  await page.waitForTimeout(1000)
  await page.keyboard.press('Tab'); // Geçişde kontrol sağlanır.
  await page.waitForTimeout(5000)
  const  [element] = await page.$x('//*[@id="bankImg"]');
  const text = await element.getProperty('textContent');
  if(text == " "){
    console.log("İBAN HATALI");
    continue;
  }
  else{ 
  const name = await text.jsonValue();
  console.log(name.trim());
 if(name.trim() == ""){
    console.log("İBAN HATALI");
    continue;
  }
  else{
  fetch(` İBAN check ok send APİ SERVİS URL `, { // Veriyi APİ servisine request atar.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: data+name.trim()
            })
        }) 
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
  fetch(`APİ REMOVE URL - İBAN COME DEL`) // Tek veri işlemi uyguladığı için api servisini sıfırlamak zorundayız geliştirebilirsiniz. - Burada APİ'yi temizler/siler
   .then(res => {console.log("Silindi")})
  
  }
//   fs.writeFile('cikiban.txt',data + " "+ name.trim(), (err) => {
      
//     // In case of a error throw err.
//     if (err) throw err;
// })
}
await page.evaluate( () => document.getElementById("IBAN").value = " "); // Tekrardan textboxt sıfırlıyoruz
  
  }


  await browser.close(await page.waitForTimeout(25000));
  
};
login();


