-------------
目录说明：
-------------
├ root
│  └ auth                --登录服务和组件
│ │
│  └ core                 --核心模块
│  │  └ components        --重用组件
│  │  │  └ avatar          --头像组件
│  │  │  
│  │  └ directives         --重用指令
│  │  │  └ menu            --菜单按钮
│  │  │    
│  │  └ providers          --核心服务
│  │  │  └ http.interceptor--请求拦截
│  │  │  └ nav             --布局根页
│  │  │  └ translate       --语言翻译
│  │  │    
│  │  └ core.module.ts    --核心模块入口
│  │  └ core.store.ts     --核心服务缓存
│  │  │
│  │  └ desktop            --三栏式组件


-------------
使用说明：
-------------
/* Desktop三栏设置 */
this.root.popToRoot(options);
this.root.push(Desktop, {
  left: LeftPage,
  content: MiddlePage,
  right: RightPage
}, options);

/* CoreStore使用 */
// 永久性数据存取方式由应用一方自定义
// CoreStore只保持在应用运行中的时段
// 对CoreStore的成员执行存储操作时可自行定义应用的数据存储操作
this.store.onChange.subscribe(data => {
  this.storage.set(data.name, data.value);
});
// 可在应用启动时一次性加载永久性数据进CoreStore以缓解异步带来的回调影响

//消除应用启动时app.component组件的NavView加载白屏
this.root.viewDidEnter.subscribe(data => {
  this.splashScreen.hide();
});





  

