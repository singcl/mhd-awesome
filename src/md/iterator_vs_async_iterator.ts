// 这里为了不和nodejs 内部已经定义好的接口冲突，这里接口前我都加一个I
// 同步迭代器对象接口

// 同步迭代结果
interface IIterationResult<T> {
    value: T;
    done: boolean;
}

// 同步迭代器对象
interface IIterator<T> {
    next(value?: any): IIterationResult<T>;
    return?(value?: any): IIterationResult<T>;
    throw?(e?: any): IIterationResult<T>;
}

// 同步可迭代对象
interface IIterable<T> {
    [Symbol.iterator](): IIterator<T>;
}

// [同步生成器对象] 既是同步可迭代对象又是同步迭代器对象
// 非常巧妙的实现
interface IIterableIterator<T> extends IIterator<T> {
    [Symbol.iterator](): IIterableIterator<T>;
}

// 异步迭代器对象接口
// 怎么写？
