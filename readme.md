When the page require output bundles from multiple entries，only hmr of the entry which is latest be required work in webpack5.

## introduction

first.js is the output bundle first be required in html.
second.js is the output bundle latest be required in html.

`npm run entries` require two output bundles from single complier.
`npm run compliers` require two output bundles form multiple compliers.

hmr of first.js doesn't work in webpack5.
All work in webpack4.

## behavior

In webpack5，after changed first.js and second.js，only second.js has been replaced.

Single complier and multiple compilers are both not work, although there are some difference when fetching xx.[hash].hot-update.json.

## reason

In webpack4，each file has its own context of hmr server and own context of module hot repalce. 
I guess, in webpack5, context will be overwritten by next file.

For example，in webpack5：
```js
var currentUpdatedModulesList;
var waitingUpdateResolves = {};
function loadUpdateChunk(chunkId) {
	return new Promise((resolve, reject) => {
		waitingUpdateResolves[chunkId] = resolve;
		var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
		var error = new Error();
		var loadingEnded = (event) => {
      // ......
		};
		__webpack_require__.l(url, loadingEnded);
	});
}

self["webpackHotUpdatewebpack5"] = (chunkId, moreModules, runtime) => {
  // ......
	if(waitingUpdateResolves[chunkId]) {
		waitingUpdateResolves[chunkId]();
		waitingUpdateResolves[chunkId] = undefined;
	}
};
```

After files loaded，first.js and second.js are all declared waitingUpdateResolves，but waitingUpdateResolves in `self["webpackHotUpdatewebpack5"]` will be the one from file second.js .

## solution

When two files are from same complier, using `optimization.runtimeChunk` can resolve this bug. This make code using same context.
But When two files from two compliers, can't use this solution.

## relevant

https://github.com/webpack/webpack/issues/423