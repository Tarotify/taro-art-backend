const express = require('express')
const router = express.Router()
const superagent = require('superagent')  //是个 http 方面的库，可以发起 get 或 post 请求。
const cheerio = require('cheerio')  // 一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

const duoNao = (res, page, size, crawlResult,className) => {
  superagent.get(`https://duonaolive.com/list?type=1&page=${page}&class=${className}&area=&year=&lang=&order=&filter=True`)
  .end(function(err, result){
    // 2.错误处理判断
    if(err) {
      return next(err)
    }
    // 3. result.text 里面存储着网页的 html 内容，
    // 4. 将爬到的内容传给 cheerio.load(result.text)方法进行节点读取
    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
    // 剩下就都是 jquery的操作获取节点的值了

    let $ = cheerio.load(result.text)
    let data1 = []
    let data2 = []
    $('.video_poster .img img').each(function (index, element) {
      let $element = $(element);
      data1.push({
        name: $element.attr('alt'),
        imgsrc: $element.attr('src')
      })
    })

    $('.title_box a').each(function (index, element){
      let $element = $(element);
      data2.push({
        href: 'https://duonaolive.com/'+$element.attr('href')
      })
    })

    let data_merge = data1.map((item,index) => {
      return {...item, ...data2[index]}
    })
    // 爬不到了
    if(data_merge.length === 0){
      res.send(crawlResult)
    }
    crawlResult = crawlResult.concat(data_merge)
    page++;
    if (page <= size) {
      duoNao(res, page, size, crawlResult) //递归
    }else {
      let total = crawlResult.length
      let result = {
        'data': crawlResult,
        'totoal':total
      }
      res.send(result)  // 返回结果
    }
  })
}

router.get('/duonao', function(req,res,next){
  let page = 1;
  let size = 1;
  let actionMovieResult = []
  // 中文字转换成utf-8
  let className = encodeURI('动作片');
  duoNao(res, page, size, actionMovieResult, className)
})


















const shan = (res, shanResult) => {
  superagent.get(`https://fs2694.github.io/Portfolio2.0/`)
  .end(function(err, result){
    if(err){
      next(err)
    }
    let $ = cheerio.load(result.text)
    $('.col-md-4 img').each(function(index,element) {
      let $element = $(element);
      shanResult.push({
        imgsrc: `https://fs2694.github.io/Portfolio2.0/`+ $element.attr('src'),
        name: $element.attr('alt')
      })
    })
    res.send(shanResult)
  })
}

router.get('/shan',function(req,res,next){
  let shanResult =[]
  shan(res,shanResult)
})


module.exports = router

/*
** 递归
*/
// function a (n) {
//   if(n === 1){
//     return 1
//   }
//   else return n+a(n-1)
// }

