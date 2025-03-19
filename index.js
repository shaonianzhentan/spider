const express = require('express');

const app = express();
const port = 8128;

// 解析 JSON 请求体
app.use(express.json());

// 定义一个接口来运行浏览器并执行 JS 代码
app.post('/run-script', async (req, res) => {
    const { url, scripts } = req.body;

    if (!url || !scripts) {
        return res.status(400).send('URL and script are required');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log(url)
        await page.goto(url);

        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i]
            const func = page[script.method]
            await func.apply(func, script.args)
        }

        await browser.close();
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});