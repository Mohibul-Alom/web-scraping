const { chromium } = require('playwright');

(async () => {
    try {

        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto("https://www.shopdutyfree.es/comprar-oferta/wifi-m1-128-gb-plata-barato.html");
        const content = await page.textContent('[id="product-availability"]')
        const hasStock = content === ' ' ? true : false;
        console.log({ content: content, hasStock: hasStock });
        await browser.close();
    } catch (error) {
        console.error(error);
    }
})()


