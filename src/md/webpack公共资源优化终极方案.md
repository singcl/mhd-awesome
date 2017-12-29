
## Webpack 打包SPA的正确姿势
---
 前言：在现代前端工程中，模块化已经成了前端项目组织文件的标配，网站上前都会把需要的相关模块预先打包、处理一番。然而打包的方式多种多样，如何才能最优雅的分离业务代码和依赖库、如何才能最高效的利用缓存？本文将会和大家分享饿了么前端团队总结的各方案优劣、踩过的坑，以及最终的解决方案。
众所周知，对于一个站点而言，网站的加载时间一直都是一个很重要的指标。网页加载时间的长短直接影响到了站点的访问量。试想，正在看这篇文章的你，会有多少耐心等待一个网页慢悠悠的打开呢？

对于前端而言，缩短网页加载时间的常见方式有：

* 合并文件以减少网络请求数量。
* 对静态文件设置长达一年的缓存，让浏览器直接从缓存里读取文件。

为了让更改过的文件能够生效，我们还会给每个文件的文件名里加上一段根据文件内容计算出的 hash。每当文件内容改变时，这段 hash 也会随之改变，所以浏览器会通过网络下载更新过的文件，但没有更新过的文件仍然会从缓存里读取，从而缩短加载时间。

同理，在开发一个单页面应用的时候，我们通常会将应用的 js 代码打包成两个文件：一个用于存放内容很少更改的第三方依赖库，这部分代码的体积一般会比较大；另一个存放更改比较频繁的业务逻辑代码，但它的体积一般比第三方依赖小。为了方便描述，我们可以分别称这两个文件为 vendor.js 与 app.js。

有了优化方案，接下来就该选择打包工具了。毫无疑问，时下最流行的就是 Webpack 了。Webpack 在文档里提供了一段简单易懂的配置，用于将项目中的 js 代码打包成 vendor.js 与 app.js 这两个文件，并分别在它们的文件名里加上一段根据文件内容生成的 hash，就像前面说的那样：

```javascript
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
```
但是，几乎所有使用类似配置的人都遇到了一个问题：每当更改了业务逻辑代码时，都会导致 vendor.js 的 hash 发生变化。这意味着用户仍然要重新下载 vendor.js，即使这部分代码并没有变过。

为此，[开源社区里有人给 Webpack 指出了这个问题](https://github.com/webpack/webpack/issues/1315)，并吸引了很多人一同讨论，一时之间涌出了很多解决的办法，但这些办法既有人说有用，也有人说没用，而官方却迟迟没有给出一个定论。

为了得到一个准确的答案，我们尝试了社区里几乎所有的方案。接下来，本文会依次给大家介绍我们尝试过的种种办法，并在文章的最后给出行之有效的解决方案。

### 一、使用 webpack-md5-hash 插件
社区有人提供了这个插件用来替换 Webpack 生成的 chunkhash：
```javascript
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
```
它的原理是：根据模块打包前的代码内容生成 hash，而不是像 Webpack 那样根据打包后的内容生成 hash。经简单测试，在修改业务代码后，它确实能保证 vendor.js 的 hash 不被改变，于是我们满心欢喜的将它用到了正式环境，但网站却在上线之后变成了一片空白。

随后，我们对比了两次编译生成的 vendor.js，发现代码里的模块 id 已经变了，但由于 hash 没有更新，所以项目上线后，浏览器直接从缓存里读取了上次上线时的旧版 vendor.js 文件，但此时新版的 app.js 里引用的 id 为 41 的模块，在旧版里其实是 40，从而引用了错误的模块导致发生了错误，中断了代码的运行。

不久之后，[社区里也有人提出了这个问题](https://github.com/erm0l0v/webpack-md5-hash/issues/5)。

### 二、从 vendor.js 中抽离出 Webpack 的运行时代码
有人指出，Webpack 的 CommonsChunkPlugin 会在第一个 entry 里注入一些运行时代码。按照模块的依赖关系，第一个 entry 当然就是 vendor.js 了。这段运行时代码里包含了最终编译出来的 app.js 的文件名，而 app.js 的文件名里包含的 hash 在每次更改业务代码后都会变，所以包含了这段代码的 vendor.js 的内容也会改变，这才导致它的 hash 总是不固定。所以，我们需要从 vendor.js 里抽离出这段运行时代码，才能避免 vendor.js 的 hash 受到影响。

除此之外，我们还需要用到 OccurenceOrderPlugin，将模块按照一定的顺序排序，这才能保证每次编译时模块的 id 都是相同的，否则模块 id 一旦改变，就会引起文件内容的变化并影响到 hash。

最终的 Webpack 配置就像下面这样：
```javascript
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 抽离出 Webpack 的运行时代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}
```
这个方法确实有效，但我们发现，在删除或新增业务代码中的模块时，vendor.js 的 hash 偶尔还是会受到影响。[Webpack 的作者也提到了这一点](https://github.com/webpack/webpack/issues/1315#issuecomment-158677302)，原文大意如下：

默认情况下，模块的 id 是这个模块在模块数组中的索引。OccurenceOrderPlugin 会将引用次数多的模块放在前面，在每次编译时模块的顺序都是一致的...如果你修改代码时新增或删除了一些模块，这将会影响到所有模块的 id。
所以，这个方案也不能完全保证 vendor.js 的 hash 不受到业务代码的影响。

### 三、使用 NamedModulesPlugin
在尝试过第二个解决方案后，我们意识到问题的根源在于 Webpack 使用模块的引用顺序作为模块的 id，这样就不能避免新增或删除模块对其他模块的 id 产生影响。

不过，Webpack 提供了 NamedModulesPlugin 插件，它使用模块的相对路径作为模块的 id，所以只要我们不重命名一个模块文件，那么它的 id 就不会变，更不会影响到其他模块了：

```javascript
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
```
但是，相对路径比数字 id 要长了很多。

社区对比了使用这个插件后文件的大小，结论是在 gzip 压缩后，文件并没有大多少。然而我们在项目里实际使用之后，虽然 vendor.js 只比以前大了 1KB，但 app.js 却大了近 15%。

所以，我们对于这个解决方案仍然不是很满意。

### 四、使用 DllPlugin
有没有什么既能使用数字作为模块的 id、又不会让 vendor.js 和 app.js 的 hash 相互影响的办法呢？可能只有将第三方依赖和业务代码分开编译了。

Webpack 提供了 DllPlugin 来帮助我们做这件事情，但这个插件使用起来比较麻烦：你需要准备两份 Webpack 配置。

一份用于编译 vendor.js：
```javascript
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib']
  },
  output: {
    filename: '[name].[chunkhash].js',
    library: 'vendor_libs',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_libs',
      path: './vendor-manifest.json',
    })
  ]
}
```
另一份用于编译 app.js：
```javascript
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./vendor-manifest.json')
    })
  ]
}
```
这个插件会在编译完第三方依赖库之后，生成一个模块相对路径到模块 id 的映射表，然后在编译业务代码时使用 DllReferencePlugin 导入这个映射表，业务代码就能找到第三方依赖里的对应模块了。这样一来，即使 app.js 里的模块 id 变了也不会影响到 vendor.js 的模块 id，从而也就不会改变 vendor.js 的 hash 了。但有一点要注意的是，如果 vendor.js 里新增或删除了一个模块，它内部的模块 id 就会发生变化，所以 app.js 里也要相应的更改 vendor.js 里模块的 id——也就是说，这个时候就变成 vendor.js 影响 app.js 的 hash 了。不过一般情况下，升级第三方依赖版本的时候应该也更改过业务代码了，所以这个问题影响不大。

我们几乎以为我们找到最完美的解决方案了——直到有一天，我们用到了 Webpack 的 Code Splitting 功能。

我们项目里的其中一个页面用到了一个体积很大的第三方依赖库，但若直接将它打包在 vendor.js 里很不值得，因为并不是所有用户都会打开这个页面。所以，我们使用 Webpack 提供的 Code Splitting 功能，只在用户进入到了这个页面的时候才开始异步加载这个模块，这样既减少了网站首次打开时要下载的文件体积，又能保证功能不受到影响。

但是，这个异步加载的文件的 hash 会在更改了业务代码之后发生变化——"身经百战"的我们一眼就看出来，又是模块的数字 id 搞的鬼。

### 五、最终解决方案
在经历了上面的尝试之后，我们总结了一下，得出以下两个结论：

* 需要使用插件替换默认的数字类型的模块 id，避免增加或删除模块对其他模块的 id 产生影响，例如使用 NamedModulesPlugin
* 需要从 vendor.js 中抽离出 Webpack 的运行时代码，保证 vendor.js 的 hash 不会受到影响。

与此同时，我们发现 Webpack 的作者介绍了一个新的插件：[HashedModuleIdsPlugin](https://github.com/webpack/webpack/blob/master/lib/NamedModulesPlugin.js)。这个插件会根据模块的相对路径生成一个长度只有四位的字符串作为模块的 id，既隐藏了模块的路径信息，又减少了模块 id 的长度。虽然这个插件包含在 Webpack 2.x 中，但它也是可以直接在 Webpack 1.x 中使用的。
```javascript
const webpack = require('webpack')
// 这个插件不在 Webpack 1.x 中，所以我们需要将这个文件复制到我们的项目里
const HashedModuleIdsPlugin = require('./path/to/HashedModuleIdsPlugin')

module.exports = {
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}
```
为了保证这个解决方案的可行性，我们在真实的项目里测试了修改、增加或删除业务代码模块等多种情形，并对比了每次编译后的文件的 hash，结论是：每次编译后，只有 app.js 和 manifest.js（被抽离出来的 Webpack 的运行时代码）的 hash 会发生变化，而 vendor.js 和异步加载的文件的 hash 都没有改变。

解决了这个问题之后，我们终于可以放心的使用 vue-router 提供的 [Lazy Loading Routes ](https://router.vuejs.org/en/advanced/lazy-loading.html)功能了。想象一下，如果你只改变了其中一个异步加载的路由里的代码，那么只有这个异步加载的文件的 hash 会改变，所以项目下次上线时，浏览器仍然会直接从缓存里读取其他文件，首次加载时间完全不会受到影响。

**最后，我们提供了一个[最小示例项目](https://github.com/lmk123/webpack-stable-hash-example)用来展示这个解决方案，你可以基于这个项目调整你的 Webpack 配置并检查 hash 的变化。**
**或者使用vue-cli脚手架vue init webpack [your project name]生成项目后查看webpack.prod.conf.js 里面的plugins配置**
