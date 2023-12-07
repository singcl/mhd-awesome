interface My {
    a: string;
    b?: number;
    c?: number;
    d: string;
}

// 获取T中可选字段
type GetPartial<T> = {
    [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};
// 获取T中必选字段
type GetRequired<T> = {
    [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};
// 使T中部分指定字段可选
type PartPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 使T中部分指定字段必选
type PartRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// 模板字符串类型
type AddString<T> = {
    [P in keyof T as `sing_${Capitalize<P & string>}`]: T[P];
};
// 模板字符串类型
type AddString2<T> = {
    [P in keyof T as Capitalize<`sing_${P & string}`>]: T[P];
};

//
let x: GetRequired<My>["a"];
let x2: GetPartial<My>["b"];
let x3: PartPartial<My, "a">["a"];
let x4: PartRequired<My, "b">["b"];
let x5: AddString<My>["sing_A"];
let x6: AddString2<My>["Sing_a"];

// 提取数组元素类型
type UnArray<T> = T extends Array<infer U> ? U : any;

// 提取Promise值类型
type Await<T> = T extends Promise<infer U> ? U : T;
