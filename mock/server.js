const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

app.use(koaBody())
 

//登录
var loginInfo = require('./user/l.js');
router.post('/api/login', ctx =>{
    console.log("登录成功--返回数据");
    console.log(ctx.request.body)
    ctx.body = loginInfo;
})

//首页
var statistic = require('./home/statistic.js')
router.get('/api/statistic',ctx =>{
    console.log("首页数据");
    ctx.body = statistic;
})

//退出登录
var logoutData = require('./user/logout.js');
router.post('/api/logout', ctx =>{
    console.log("退出登录"+ ctx.request.body);
    ctx.body = logoutData;
})

//用户列表页
var userList = require('./user/list.js');
router.post('/api/list',ctx =>{
    console.log("用户列表第几"+ctx.request.body.pageNum+"页");
    ctx.body = userList;
})

//商品列表
var productList = require('./product/list.js');
router.post('/api/productList',wtx =>{
    console.log("商品列表数据");
    wtx.body = productList;
})

//品类列表
var categroyList = require('./product/categroyList.js');
router.post('/api/category/get_category', ctx =>{
    console.log("获取品类列表数据");
    ctx.body = categroyList;
})

//订单列表
var orderList = require('./order/orderList.js');
router.post('/api/orderList',ctx =>{
    console.log("成功获取订单列表数据");
    ctx.body = orderList;
})

// 订单详情
var orderDetail = require('./order/orderDetail');
router.post('/api/orderDetail',ctx =>{
    console.log("订单详情数据");
    ctx.body = orderDetail;
}) 

//开启服务并访问路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(5001);