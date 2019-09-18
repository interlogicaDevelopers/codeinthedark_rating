import html from '@beyonk/rollup-plugin-html-esm'
import cleaner from 'rollup-plugin-cleaner';
import {terser} from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy'

export default {
    input: ["src/vrmode/index.mjs"],
    output: [
      // ES module version, for modern browsers
      {
        dir: "dist/vrmode",
        format: "es",
        sourcemap: false,
        compact: true
      }
    ],
    plugins: [
        cleaner({
            targets: [
              'dist/'
            ]
        }),
        copy({
            targets: [
              { src: 'src/vrmode/assets/**/*', dest: 'dist/vrmode/assets' },
              { src: 'src/vrmode/libs/**/*', dest: 'dist/vrmode/libs' },
              { src: 'src/vrmode/index.css', dest: 'dist/vrmode' },
              { src: 'src/vrmode/manifest.json', dest: 'dist/vrmode' },
              { src: 'src/v1/**/*', dest: 'dist/v1' },
              { src: 'src/server.js', dest: 'dist' },
            ]
        }),
        /*terser({
          mangle : false
        }),*/
        html({
          // specify template html (optional)
          template: 'src/vrmode/index.tmpl.html',  // Default undefined
          // output filename (optional)
          filename: '../dist/vrmode/index.html', // Default index.html
          // when specified, js src will use absolute path from publicPath (optional)
          publicPath: 'src' // Default undefined
        })
      ]
};