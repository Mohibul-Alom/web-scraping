const { chromium } = require('playwright');

const shops = [
    {
        vendor: 'Shopdutyfree',
        item: "IPAD PRO 11 M1",
        url: "https://www.shopdutyfree.es/comprar-oferta/wifi-m1-128-gb-plata-barato.html",
        checkStock: async ({ page }) => {
            const content = await page.textContent('[id="product-availability"]');
            return content === ' ' ? true : false;
        }
    },

];

(async function () {
    const browser = await chromium.launch();
    for (const shop of shops) {
        const { checkStock, vendor, url, item } = shop;
        const page = await browser.newPage();
        await page.goto(url);
        const hasStock = await checkStock({ page });

        console.log(`${vendor}: [${item}]  ${hasStock ? "Has Stock 🤪" : "Out of Stock 😥"}`);
    }
    await browser.close();
})()