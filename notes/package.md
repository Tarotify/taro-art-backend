3. nodemon：自动重启 NodeJS 应用
安装方法，npm install -g nodemon，nodemon 是一款监听服务运行时所在的目录源代码变化并自动重启服务的工具，是项目快速迭代时的完美伴侣，因为 nodemon 能帮你把重复工作降到最低。理论上 nodemon 支持各种语言的服务重启，并且支持监听目录和文件的自定义配置。

4. pm2：便捷管理 node 服务进程
安装方法，npm install -g pm2，pm2 是一款非常强大的服务进程管理工具，尤其适合用在生产环境，人人车所有的线上 node 服务都是用他来管理，开箱即用的特性包括：进程监控、负载均衡、内存监控、日志管理、服务管理。并且有需要的同学可以开启他官方的 node 应用监控后台支持：keymetrics.io