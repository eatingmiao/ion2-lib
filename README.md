## 说明
该目录为个人ionic3常用组件开发封装。

## 目录
- script //gulp打包代码
- lib //通用组件库
- tsconfig-aot.json //aot编译配置

## 命令
- npm run build:esm //打包lib库于./dist
- npm run build:publish //打包lib库并上传到云

更改库的版本、名称、详情等请更改文件./script/package.json

打包后的库在安装时会提示你当前版本ionic，angular版本。
若出现不支持，可尝试更新到与本项目相同版本。

## CoreStore

缓存数据存取方式由应用一方自定义，CoreStore只保持在应用运行中的时段，对CoreStore的成员执行存储操作时可自行定义应用的数据存储操作：

    this.store.onChange.subscribe(data => {
      this.storage.set(data.name, data.value);
    });

可使用APP_INITIALIZER在应用启动时一次性加载缓存数据进CoreStore，以缓解ionicStorage异步带来的回调影响。