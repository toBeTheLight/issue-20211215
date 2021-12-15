When one page require some output from more than one entry，only hmr of the entry which is latest be required work in webpack5.

## introduction

first.js is the file be required fisrt.
second.js is the file be required latest.

`npm run enties` require two file from same complier.
`npm run compliers` require two file form two compliers.

webpack5 hmr of first.js doesn't work.
webpack4 all work.

## behavior

In webpack5，after first.js changed，only request second.[hash].hot-update.json，only request second.[hash].hot-update.js.

## reason

In webpack4，each file has its own context of hmr server and own context of module hot repalce. In webpack5, context will be overwritten by next file.

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