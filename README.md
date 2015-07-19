# seajs-grunt
基于seajs的模块化方案，配合grunt构建配置

主要用到了grunt的grunt-cmd-transport、grunt-cmd-concat、grunt-contrib-uglify、grunt-contrib-copy 这几个模块，实现模块依赖分析，模块合并，代码压缩等功能

使用用法很简单，下载代码之后

进入/statics/assets/dev/

```
npm install
```

然后

```
grunt
```

即可完成dev以及生产环境的构建

# demo

使用demo在/test/sea.html

注意路径问题，demo采用的是基于网站根目录的绝对路径

# todo

1. 整合一下combo来合并请求
2. 引入更多地基础模块和业务模块
3. 引入更多地grunt模块满足开发需求





