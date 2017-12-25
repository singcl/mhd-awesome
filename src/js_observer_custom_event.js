// 构造函数创建JS自定义事件，观察者模式实现自定义事件
(function() {
	function EventTarget() {
		this.handlers = {};
	}

	EventTarget.prototype = {
		constructor: EventTarget,
		on: function(type, handler) {
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},
		emit: function(event, data) {
			if (!event.target) {
				event.target = this;
			}
			if (this.handlers[event.type] instanceof Array) {
				var handlers = this.handlers[event.type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](event, data);
				}
			}
		},
		removeHandler: function(type, handler) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
			}
			handlers.splice(i, 1);
		}
	};

	var mye = new EventTarget();
	mye.on('test', function(e, data) {
		console.log(data);
	});

	mye.on('test', function() {
		console.log('test');
	});


	mye.emit({
		type: 'test'
	}, 'hello, world');
})();


//注意以下两个函数handers定义位置不同，输出结果也不一样
//类似工厂方法实现自定义事件 ，观察者模式实现自定义事件
(function() {
	var EventTarget = {
		on: function(type, handler) {
			//在on函数里面定义handlers用不用defineProperty来控制可枚举性好像没什么卵用
			if (!this.handlers) {
				Object.defineProperty(this, 'handlers', {
					value: {},
					enumerable: false,
					configurable: true,
					writable: true
				});
			}
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},
		emit: function(event, data) {
			if (!event.target) {
				event.target = this;
			}
			if (this.handlers[event.type] instanceof Array) {
				var handlers = this.handlers[event.type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					//这里绑定this是为了测试运行时this指向谁，以更好观察handlers中的内容
					//使用时请删除this绑定
					handlers[i].apply(this, [event, data]);
				}
			}
		},
		removeHandler: function(type, handler) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
			}
			handlers.splice(i, 1);
		}
	};

	var p1 = {};
	var p2 = {};

	Object.assign(p1, EventTarget);
	Object.assign(p2, EventTarget);
	p1.on('call1', function() {
		console.log(this);
	});

	p2.on('call2', function() {
		console.log(this);
	});

	p1.emit({
		type: 'call1'
	});
	p1.emit({
		type: 'call2'
	});
	p2.emit({
		type: 'call1'
	});
	p2.emit({
		type: 'call2'
	});
})();


//注意上面和这个函数handers定义位置不同，输出结果也不一样
//类似工厂方法实现自定义事件 ，观察者模式实现自定义事件
(function() {
	var EventTarget = {
		handlers: {},
		on: function(type, handler) {
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},
		emit: function(event, data) {
			if (!event.target) {
				event.target = this;
			}
			if (this.handlers[event.type] instanceof Array) {
				var handlers = this.handlers[event.type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					//这里绑定this是为了测试运行时this指向谁，以更好观察handlers中的内容
					//使用时请删除this绑定
					handlers[i].apply(this, [event, data]);
				}
			}
		},
		removeHandler: function(type, handler) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
			}
			handlers.splice(i, 1);
		}
	};

	var p1 = {};
	var p2 = {};

	Object.assign(p1, EventTarget);
	Object.assign(p2, EventTarget);
	p1.on('call1', function() {
		console.log(this);
	});

	p2.on('call2', function() {
		console.log(this);
	});

	p1.emit({
		type: 'call1'
	});
	p1.emit({
		type: 'call2'
	});
	p2.emit({
		type: 'call1'
	});
	p2.emit({
		type: 'call2'
	});
})();
