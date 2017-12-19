/**
 * 底层基本函数：随机产生[min, max]区间的整数
 * @param  {Number} min 最小整数
 * @param  {Numer} max 最大整数
 * @return {Number}     最终输出的随机整数
 */
function rInt(min, max) {
	var gap = max - min;
	var random = Math.floor(min + Math.random() * (gap + 1));
	return random;
}

/**
 * 检查是否是Number数据类型或者能转化为Number的String类型
 * @param  {Number|String} num 数字或者字符串数字
 * @return {Number}     [数字]
 */
function typeofNum(num) {
	if (typeof num === 'number') {
		return num;
	} else if (typeof num === 'string' && !isNaN(+num)) {
		return +num;
	} else {
		throw new Error('函数参数类型错误:参数必须为Number!');
	}
}

/**
 * 随机产生[min, max]区间的整数
 * @param  {Number} min 最小整数
 * @param  {Numer} max 最大整数
 * @return {Number}     最终输出的随机整数
 */
function randomInt(min, max) {
	var minx = 0;
	var maxx = 0;
	//输入参数数量兼容
	var rt = arguments.length;
	switch (rt) {
		case 0:
			throw new Error('函数参数不能为空！');
			// break;
		case 1:
			minx = 0;
			maxx = arguments[0];
			break;
		case 2:
			minx = min;
			maxx = max;
			break;
		default:
			throw new Error('函数参数最大为2个！');
			// break;
	}

	// 输入参数类型校验
	minx = typeofNum(minx);
	maxx = typeofNum(maxx);

	return rInt(minx, maxx);
}

/**
 * node端模块封装
 */
exports.randomInt = randomInt;

function randomIntRange(n, min, max) {
	// 参数校验
	// 参数个数校验
	if (arguments.length !== 3) throw new Error('参数个数必须为：3');
	// 参数类型校验
	var nx = typeofNum(n);
	var minx = typeofNum(min);
	var maxx = typeofNum(max);
	// 参数范围校验
	if (nx > maxx - minx + 1) throw new Error('最多只能生成' + (maxx - minx + 1) + '随机数！');
	// 核心逻辑代码
	var res = [];
	var random;
	// 核心逻辑代码实现：方法一
	// for (var i = 0; i < nx; i++) {
	// 	do {
	// 		random = randomInt(minx, maxx);
	// 	} while (res.indexOf(random) !== -1);
	// 	res.push(random);
	// }

	// 核心逻辑代码实现：方法二
	// for (var i = 0; i < nx; i++) {
	// 	do {
	// 		random = randomInt(minx, maxx);
	// 	} while (res.some(function(item) {
	// 			return item === random;
	// 		}));
	// 	res.push(random);
	// }

	// 核心逻辑代码实现：方法三
	// while (res.length < nx) {
	// 	random = randomInt(minx, maxx);
	// 	if (res.indexOf(random) === -1) res.push(random);
	// 	// 或者是
	// 	// if (res.every(function(item) {
	// 	// 		return item !== random;
	// 	// 	})) {
	// 	// 	res.push(random);
	// 	// }
	// }

	// 核心逻辑代码实现：方法四
	for (var i = 0; i < nx; i++) {
		random = randomInt(minx, maxx);
		if (res.indexOf(random) !== -1) {
			i--
		} else {
			res.push(random);
		}
	}

	// 核心逻辑代码实现五思路:先生成一个数组,再从数组中取数，取走的用null占位。
	// 核心逻辑代码实现六思路:先生成一个数组,再sort(function() {return 0.5 - Math.random()});

	return res;
}

/**
 * node端模块封装
 */
exports.randomIntRange = randomIntRange;