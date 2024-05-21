# 弹幕式todoList

## 项目介绍

todoList 任务管理。弹幕式todoList，一件件的任务或事件以弹幕的形式展现。
由于发生某种类似懒惰拖延的情况，未完成的任务会随着时间的推移变得越来越重要。要不及时解决，todoList会变得非常糟糕。

### 数据的结构

```js

todoList: [
    { id: '001', context: 'vue', isDone: true, date: '1715443200000' },
    { id: '002', context: 'react', isDone: false, date: '1715529600000' },
    { id: '003', context: 'angular', isDone: false, date: '1715616000000' },
]
```

id：唯一标识

context：todolist的内容，即将要做的事

isDone：是否已完成

date：时间戳，单位：毫秒

## 项目依赖

vue3, nanoid ，pinia

vue3：快速搭建项目

nanoid：生成id唯一标识

pinia：状态管理，主要是组件间的通信和事件处理

## 版本0.0.0

1. 实现todoList的增 删 改 查 操作；

2. 以弹幕的形式展现。

3. 兼容pc端和移动端

## 版本0.0.1

1. 修复edit操作出现的bug，修复移动端双击事件不起作用

2. 新增暗色主题切换

## 版本0.0.2

1. 根据系统主题切换白天/黑夜

2. 增加tip功能：给用户操作后提示。
