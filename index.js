const { chromium } = require('playwright');

const shops = [
    {
        vendor: 'Shopdutyfree',
        url: "https://www.shopdutyfree.es/comprar-oferta/wifi-m1-128-gb-plata-barato.html",
        checkStock: async ({ browser, url }) => {
            const page = await browser.newPage();
            await page.goto(url);
            const content = await page.textContent('[id="product-availability"]');
            const hasStock = content === ' ' ? true : false;
            return hasStock;
        }
    }
];

(async function () {
    const browser = await chromium.launch();
    for (const shop of shops) {
        const { checkStock, vendor, url } = shop;
        const hasStock = await checkStock({ browser, url });
        console.log(`${vendor}: ${hasStock ? "Has Stock 🤪" : "Out of Stock 😥"}`);
    }
    await browser.close();
})()