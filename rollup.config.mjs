import { defineConfig } from 'rollup'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import pkg from './package.json' assert { type: 'json' } //断言导出json模块
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import typescript from 'rollup-plugin-typescript2'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { rimrafSync } from 'rimraf'
import del from 'rollup-plugin-delete'
import replace from 'rollup-plugin-replace'

rimrafSync('dist') // 删除打包目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig([
  {
    input: 'src/index.ts', //入口文件
    output: [
      {
        dir: pkg.main, //出口文件
        format: 'cjs', //打包成CommonJS模块
        sourcemap: true
      },
      {
        dir: pkg.module, //出口文件
        format: 'es', //打包成es module模块
        sourcemap: true
      },
      {
        name: 'autoFix', //打包成UMD模式，需提供name
        file: pkg.browser, //出口文件,umd不支持代码分割  import()
        format: 'umd', //打包成UMD模块
        sourcemap: true
      }
    ],
    external: ['react'], // 依赖模块
    plugins: [
      /**
       * rollup-plugin-delete：删除dist目录
       */
      del({ targets: 'dist/*' }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      /**
       * @rollup/plugin-json：处理JSON文件,只打包需要的属性
       */
      json(),
      /**
       * @rollup/plugin-terser：压缩文件
       */
      terser({
        compress: {
          drop_console: ['log']
        }
      }),
      /**
       * @rollup/plugin-node-resolve：处理外部依赖，将其打包进来
       */
      resolve(),
      /**
       * @rollup/plugin-alias：路径别名
       */
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
      }),
      /**
       * @rollup/plugin-commonjs：将第三方包CommonJS转ES
       * 如果使用了@rollup/plugin-commonjs，@rollup/plugin-commonjs一定要在@rollup/plugin-babel之前调用
       */
      commonjs(),
      /**
       * @rollup/plugin-typescript2：将ts转换为js
       * 如果使用了@rollup/plugin-node-resolve，要在rollup-plugin-typescript2之前调用
       * 如果使用了@rollup/plugin-babel，要在rollup-plugin-typescript2之前调用，并配置babel扩展
       */
      typescript(),
      /**
       * @rollup/plugin-babel：在 Rollup 打包过程中使用 Babel 进行代码转换
       * @babel/core：babel核心库
       * @babel/preset-env：将ES6转换为向后兼容的JavaScript
       * @babel/plugin-transform-runtime：处理async，await、import()等语法关键字的帮助函数
       * @babel/preset-react：转换react语法
       */
      babel({
        babelHelpers: 'runtime',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'] //增加配置
      })
    ]
  }
])
