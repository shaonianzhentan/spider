const puppeteer = require('puppeteer');

module.exports = async (url, scripts) => {
    try {
        const browser = await puppeteer.launch({ args: ['--lang=zh-CN']});
        const page = await browser.newPage();
        console.log(url);
        await page.goto(url);
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (typeof page[script.method] === 'function') {
                console.log(`${script.method}${JSON.stringify(script.args)}`);
                await page[script.method].apply(page, script.args);
            } else {
                console.error(`Method ${script.method} does not exist on page object`);
            }
        }
        await browser.close();
    } catch (error) {
        console.error(error);
    }
};