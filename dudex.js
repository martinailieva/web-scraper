const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrape (url) {
const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
 
    var products = await page.evaluate(() => {
        var titlesList = document.querySelectorAll('h2');
        var productsArr = [];
        for (var i = 0; i < titlesList.length; i++) {
          productsArr[i] = {
            title: titlesList[i].innerText.trim(),
            imageUrl:titlesList[i].nextElementSibling.innerText.trim(),
            sku: titlesList[i].nextElementSibling.innerText.trim(),
            category: titlesList[i].nextElementSibling.innerText.trim(),
            description: titlesList[i].nextElementSibling.innerText.trim(),
            color: titlesList[i].nextElementSibling.innerText.trim(),
            size: titlesList[i].nextElementSibling.innerText.trim(),
            logo: titlesList[i].nextElementSibling.innerText.trim(),
            price: titlesList[i].nextElementSibling.innerText.trim(),
            attributes: titlesList[i].nextElementSibling.innerText.trim(),
            relatedSku: titlesList[i].nextElementSibling.innerText.trim(),
          };
        }
        return productsArr;
      })
      fs.writeFile("./products.json", JSON.stringify(products, null, 3),  (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Great Success");
    });
   
browser.close()

}

scrape("https://demo-shop.natek.eu/")