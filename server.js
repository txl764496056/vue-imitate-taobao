const jsonServer = require('json-server')
const server = jsonServer.create();
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

// 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares)

/**
 * 你需要使用一个body-parser来处理POST,PUT和PATCH
 * 你可以使用JSON Server使用的那个
 */
server.use(jsonServer.bodyParser)

// 登录
server.get('/login', (req, res) => {
  let data = {
    code:200,
    result:"成功！"
  };
  res.jsonp({
      ...data
  })
  
});

// 使用默认路由
// server.use(router)
server.listen(3200, () => {
  console.log('JSON Server is running')
});