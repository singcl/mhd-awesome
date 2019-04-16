## 结论

### Vue 父组件更新时子组件是否更新

1. 如果传递给子组件的 props 在子组件中没有使用，那么无论 props 是否发生变化子组件始终不会更新

2. 如果传递给子组件的 props 在子组件中有使用：1）如果 props 发生改变则子组件更新 2）如果 props 没有变化则子组件不更新

### 注意与 React 组件更新机制对比

PurComponent

ShouldComponentUpdate
