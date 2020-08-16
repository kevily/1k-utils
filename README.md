# 1k-utils

A simple and efficient Web development kit。

[docs](https://kevily.github.io/1k-utils/)

## npm install

```shell
npm install 1k-utils
```

## yarn instatll

```shell
yarn add 1k-utils
```

## Usage

```javascript
import { storage } from '1k-utils'
storage('local').set('1', { key: '1' })
```

## [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

```json
[
    "import",
    {
        "libraryName": "1k-utils",
        "camel2DashComponentName": false
    },
    "1k-utils"
]
```
