const puppeteer = require('puppeteer');
const fs = require('fs');

(async function main() {
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://demo-shop.natek.eu/')
        await page.waitForSelector('.widget-area');

        //selecting the sidebar's class name
        const hierarchy = await page.$$('.cat-item');
        var linkArr = [];
            
        for(let i = 0; i < hierarchy.length; i++){
            const path = hierarchy[i];
            const link = await path.$$('a');
            linkArr[i] = link;
        }
        console.log(linkArr);
        
        var productlinkArr = [];
        
        for(let i = 0; i<linkArr.length; i++){
            const path = linkArr[i];
            const productLink = await path.$$('#main > ul > li.product.type-product.post-23.status-publish.first.instock.product_cat-music.has-post-thumbnail.downloadable.virtual.taxable.purchasable.product-type-simple > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link');
            console.log(linkTitle);
            linkArr[i].click();

            productlinkArr[i] = productLink;
        }
        console.log(productlinkArr);

        var titlesList = document.querySelectorAll('h2');
        
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
        

    }catch (e){
        console.log('our error', e)
    }
    })();