# Vue Barcode and QR code scanner

[![npm version](https://badgen.net/npm/v/vue-barcode-reader)](https://www.npmjs.com/package/vue-barcode-reader) [![sponsored_by](https://badgen.net/badge/sponsored%20by/%F0%9F%A4%96Easy-Peasy.AI/f2a)](https://Easy-Peasy.AI/?utm_source=npm&utm_medium=badge&utm_campaign=vue_barcode_reader)

A Vue.js set of components to scan (or upload images) barcodes and QR codes.

## Benefits

- Can scan both barcodes and QR codes
- Uses [ZXing](https://github.com/zxing-js/library) ("zebra crossing"), an open-source, multi-format 1D/2D barcode image processing library implemented in Java, with ports to other languages.

## Demo

[Demo repository](https://github.com/olefirenko/vue-barcode-reader-example) | [Codesandbox](https://codesandbox.io/s/vue-barcode-reader-demo-guj3f) | [Vercel](https://vue-barcode-reader-example-2iiz1fhbf-olefirenko.vercel.app/) | [Netlify](https://stupefied-meitner-58f299.netlify.app/)

Or you can check the library in action on the website [parceltrackingapp.com](https://parceltrackingapp.com/en).

## Installation

The easiest way to use Vue Barcode Reader is to install it from **npm** or **yarn**.

```sh
npm install vue-barcode-reader --save
```

Or

```sh
yarn add vue-barcode-reader
```

### Vue 2.0 support

For Vue 2.0 compatible version please use the `vue-barcode-reader@0.0.3`.

### TypeScript

There are type definitions available for those who work with TypeScript.

```sh
npm install @types/vue-barcode-reader --save-dev
```

Or

```sh
yarn add -D @types/vue-barcode-reader
```

## Usage

The Vue Barcode Reader works out of the box by just including it.

### Using Video Camera

Once a stream from the users camera is loaded, it's displayed and continuously scanned for barcodes. Results are indicated by the decode event.

```js
import { StreamBarcodeReader } from "vue-barcode-reader";
```

In your template you can use this syntax:

```html
<StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
```

### Scanning from Image

The component renders to a simple file picker input element. Clicking opens a file dialog. On supporting mobile devices the camera is started to take a picture. The selected images are directly scanned and positive results are indicated by the `decode` event.

```js
import { ImageBarcodeReader } from "vue-barcode-reader";
```

In your template you can use this syntax:

```html
<ImageBarcodeReader @decode="onDecode" @error="onError"></ImageBarcodeReader>
```

```html
methods: { onDecode (result) { console.log(result) } }
```

## Events

The library emits the following events:

### loaded

When the libraty is loaded and the camera is ready to scan

### decode

When a barcode or QR code is scanned. The result is passed as a parameter to the event handler. The result is the text encoded in the barcode or QR code.

### result

When a barcode or QR code is scanned. The result is passed as a parameter to the event handler. The result is the object with the following properties:
