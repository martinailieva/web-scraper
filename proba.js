const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrape (url) {
    const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url)
     
        var products = await page.evaluate(() => {
            var titlesList = document.querySelectorAll('h2');
            var image = document.querySelectorAll('img');
            var price = document.querySelectorAll('#main > ul > li.product.type-product.post-15.status-publish.instock.product_cat-accessories.has-post-thumbnail.sale.taxable.shipping-taxable.purchasable.product-type-simple > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link > span.price > ins > span > bdi');
            var productsArr = [];
            for (var i = 0; i < titlesList.length; i++) {
              productsArr[i] = {
                title: titlesList[i].innerText.trim(),
                imageUrl: image[i].innerText.trim(),
                sku: titlesList[i].nextElementSibling.innerText.trim(),
                category: titlesList[i].nextElementSibling.innerText.trim(),
                description: titlesList[i].nextElementSibling.innerText.trim(),
                color: titlesList[i].nextElementSibling.innerText.trim(),
                size: titlesList[i].nextElementSibling.innerText.trim(),
                logo: titlesList[i].nextElementSibling.innerText.trim(),
                price: price[i].innerText.trim(),
                attributes: titlesList[i].nextElementSibling.innerText.trim(),
                relatedSku: titlesList[i].nextElementSibling.innerText.trim(),
              };
            }
            return productsArr;
          })         
          fs.writeFile("./produuucts.json", JSON.stringify(products, null, 3),  (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Great Success");
        });
    browser.close()
    
    }
    
    scrape("https://demo-shop.natek.eu/")