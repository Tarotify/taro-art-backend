# Window版本使用supervisor  
1. 安装`npm i supervisor -g`
2. 测试是否能运行 `supervisor index.js`
3. 若失败，打开cmd查看系统安装node的位置`where node`
4. 去到node文件夹目录，新建两个folder; `node_cahce`, `node_global`
5. 然后到计算机右键属性=>高级设置=>添加系统变量；变量名`NODE_PATH`
路径`XXX:\Program Files\nodejs\node_global\node_modules`
6. 编辑用户变量path,添加多一点`XXX:\Program Files\nodejs\node_global\node_modules`即可
7. `npm config set prefix “D:Program Files\nodejs\node_global”`， `npm config set cache “D:Program Files\nodejs\node_cache”` 这里说明此后在命令行输入`npm install express -g `（注：-g表示全局安装即安装到node_global目录下）
8. 完成

>supervisor.ps1 cannot be loaded because running scripts is disabled on this system.  
遇到这个系统安全问题  
1. 右键开始菜单打开Window Power shell
2. cd 到项目根路径
3. 输入`set-ExecutionPolicy RemoteSigned`
4. 输入`Y`
5. 解决