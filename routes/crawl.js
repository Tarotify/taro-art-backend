const express = require('express')
const router = express.Router()
const superagent = require('superagent')  //是个 http 方面的库，可以发起 get 或 post 请求。
const cheerio = require('cheerio')  // 一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

router.get('/', function(req,res,next){
  // 1.用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://duonaolive.com/list?type=1&page=1&class=1&area=&year=&lang=&order=&filter=True')
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
      let items = []
      $('.video_poster .img img').each(function (index, element) {
        let $element = $(element);
        items.push({
          imgsrc: $element.attr('src'),
          name: $element.attr('alt')
        })
      })
      res.send(items)
    })
})

module.exports = router
