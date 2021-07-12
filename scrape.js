const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrape(fileName, url, xPath) {
    try {
        const messages = [];
        var hoy = new Date();
        var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1);
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log('ultima vez actualizado: ' + fecha + " a las " + hora);
        const ultimavez = "Ultima vez actualizado: "+fecha.toString()+" "+hora;
        messages.push(ultimavez);

        const browser = await puppeteer.launch({headless: true })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url)
        for (let i of xPath) {
            await page.waitForXPath(i);
            const [getXpath] = await page.$x(i)
            const getMsg = await page.evaluate(name => name.innerText, getXpath);
            console.log(getMsg);
            messages.push(getMsg);
        }
        browser.close();
        fs.writeFile(fileName, `export default ${JSON.stringify(messages)}`, () => {
            console.log('data writed')
        })
    } catch (e) { // Missing this
        console.error(e);
    }
}


const xPathBuyPrice = '//*[@id="root"]/div/div[2]/div[2]/div/div/div[3]/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div/div/div/div/div/div/div/table/tbody/tr[1]/td[2]/span';
const xPathSellPrice = '//*[@id="root"]/div/div[2]/div[2]/div/div/div[3]/div[2]/div/div/div[2]/div[1]/div/div/div[2]/div[1]/div/div/div/div/div/div/div/table/tbody/tr[1]/td[2]/span';
scrape('dataLP.js', 'https://staking.linkpool.io/dex', [xPathBuyPrice, xPathSellPrice]);

//scrape('dataBinance.js', 'https://www.binance.com/en/my/pnl/spot_account', '//*[@id="__APP"]/div[2]/main/main/div[3]/div/div[2]/div[1]/div[1]/div[2]/div[3]');