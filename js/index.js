import { PNG } from 'pngjs/browser';

async function main() {
    const wasmPng = await import('wasm-png');
    const wasmPngBg = await import('wasm-png/wasm_png_bg.wasm');
    console.log("wasm mem size: %d", wasmPngBg.memory.buffer.byteLength);

    const response = await fetch('splat3_processed.png');
    const data = new Uint8Array(await response.arrayBuffer());

    console.time('pngjs');
    const p1 = await pngjs(data);
    console.timeEnd('pngjs');
    console.log(p1);

    console.time('wasm-png');
    const p2 = wasmPng.decode(data);
    console.timeEnd('wasm-png');
    console.log("wasm mem size: %d", wasmPngBg.memory.buffer.byteLength);
    console.log(p2);

    console.log("size: pngjs=%d, wasm-png=%d", p1.data.length, p2.dataLength());

    new OffscreenCanvas
}

async function decodedPngData(decodedPng) {
    const wasm = await import('wasm-png/wasm_png_bg.wasm');
    return new Uint8Array(wasm.memory.buffer, decodedPng.dataPtr(), decodedPng.dataLength());
}

async function pngjs(data) {
    return new Promise((resolve, reject) => {
        new PNG({ deflateChunkSize: 1024 * 1024 }).parse(data, (err, png) => {
            if (err) reject(err);
            else resolve(png);
        });
    });
}

main();
