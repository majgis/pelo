const http = require('http')
const fs = require('fs')

const createApp = require('./app')
const html = require('./html')

const app = createApp(html)

function layout(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Hello</title>
        <style>
          body {
            font-family: sans-serif;
            font-size: 32px;
          }
        </style>
      </head>
      <body>
        <div id="root">
          ${content}
        </div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

const server = http.createServer((req, res) => {
  if (req.url === '/bundle.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    })
    fs.createReadStream('./bundle.js').pipe(res)
    return;
  }

  const content = app.render()
  const body = layout(content)
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(body)
})
server.listen(8080)
