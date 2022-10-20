# Vue Barcode and QR code scanner

> ⚠️ Hello everyone! My name is Dmytro and I am from 🇺🇦 Ukraine. People in Ukraine **ARE DYING RIGHT NOW** because of 🇷🇺 Russia Agression! Please help Ukraine. Donate if you can to: [UKRAINE’S DEFENDERS](https://war.ukraine.ua/donate/), [CHARITABLE FOUNDATION "COME BACK ALIVE"](https://savelife.in.ua/en/donate/). Help to stop Russian aggression 🙏! #StandWithUkraine
> [🇺🇦 IT Army of Ukraine](https://t.me/itarmyofukraine2022)

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
