const chrome = require('./chrome')

chrome('https://www.baidu.com', [
    { method: 'screenshot', args: [{ "path": "example.png" }] }
])