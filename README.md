<h1 align="center">auto-fix-react （大屏自适应容器）</h1>
<div align="center">
 <a href="https://react.dev">
    <img src="https://img.shields.io/badge/react-%3E=16.8.0-green.svg?logo=react&style=flat&colorA=084c61&colorB=f73859" alt="React" />
  </a>
  <a href="https://npmjs.org/package/@jizirui/auto-fix-react">
    <img src="https://img.shields.io/npm/v/@jizirui/auto-fix-react.svg?logo=npm&colorA=87ceeb&colorB=ffb6c1" alt="npm-version" />
  </a>
  <a href="https://npmjs.org/package/@jizirui/auto-fix-react">
    <img src="https://img.shields.io/bundlephobia/min/@jizirui/auto-fix-react.svg?colorA=8a2be2&colorB=00bdaa" alt="min-size" />
  </a>
</div>
<div align="center">
  <a href="https://github.com/Come2BtheOne/auto-fix-react/releases">
    <img src="https://img.shields.io/github/release/Come2BtheOne/auto-fix-react.svg?logo=github&logoColor=181717&colorA=ffa500&colorB=00ff7f" alt="release" />
  </a>  
  <a href="https://github.com/Come2BtheOne/auto-fix-react">
    <img src="https://img.shields.io/github/stars/Come2BtheOne/auto-fix-react.svg" alt="Stars" />
  </a>
</div>
<p align="center" style="margin-top: 40px;">
  <a style="color:#f73859;" href="https://github.com/Come2BtheOne/auto-fix-vue3">Vue 项目看这边</a>
</p>

<br/>

## 安装

### npm

```bash
npm install @jizirui/auto-fix-react
```

### pnpm

```bash
pnpm add @jizirui/auto-fix-react
```

### yarn

```bash
yarn add @jizirui/auto-fix-react
```

<br/>

## 引入方式

### ESM

```js
import { FullScreenContainer } from '@jizirui/auto-fix-react'
```

### CommonJS

```js
const { useAutoFix, FullScreenContainer } = require('@jizirui/auto-fix-react/dist/cjs')
```

### UMD

```html
<script src="https://cdn.staticfile.org/react/16.8.0/umd/react.development.js"></script>
<script src="https://cdn.staticfile.org/react-dom/16.8.0/umd/react-dom.development.js"></script>
<script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
<script src="https://unpkg.com/@jizirui/auto-fix-react/dist/umd/index.js"></script>

<script type="text/babel">
  function PackageName() {
    const { useState } = window.React
    const { useAutoFix, FullScreenContainer } = window.autoFix
    const [name, setName] = useState('auto-fix')
    return (
      <FullScreenContainer width={1920} height={1080}>
        <h1>{name}</h1>
      </FullScreenContainer>
    )
  }
  ReactDOM.render(<PackageName />, document.getElementById('app'))
</script>
```

<br/>

## HTML 部分

```js
<!-- 组件形式 -->
<full-screen-container width={1920} height={1080}>
  <div>柱状图</div>
  <div>饼图</div>
  ...
</full-screen-container>
```

或

```html
<!-- Hook -->
<div
  style={{
    width: `${canvasWidth}px`,
    height: `${canvasHeight}px`,
    ...canvasStyle
  }}
>
  <div>柱状图</div>
  <div>饼图</div>
  ...
</div>
```
