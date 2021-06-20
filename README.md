PNG Parse Benchmark
=======================

Compare rust [png][] with WASM and [pngjs][] for [some usage](https://github.com/kui/7dtd-map/issues/15).

* [github pages](https://kui.github.io/png-parse-benchmark/)

[png]: https://crates.io/crates/png
[pngjs]: https://www.npmjs.com/package/pngjs


Build
------

In your terminal:

```
wasm-pack build wasm
npm install
npm run build
```


Dev
------

```
npm run server
```

Then open http://localhost:8080/.
