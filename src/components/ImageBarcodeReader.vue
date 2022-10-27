<template>
  <input @change="onChangeInput" type="file" name="image" accept="image/*" capture="environment" />
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/library";

export default {
  name: "image-barcode-reader",

  data() {
    return {
      codeReader: new BrowserMultiFormatReader(),
    };
  },

  methods: {
    onChangeInput(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.onload = this.processFile;
      reader.readAsDataURL(files[0]);
    },

    processFile(e) {
      this.$el.innerHTML += `<img id="image" src="${e.target.result}"/>`;

      this.codeReader
        .decodeFromImage("image")
        .then((result) => {
          this.$emit("decode", result.text);
          this.$emit("result", result);
        })
        .catch((error) => this.$emit("error", error));
    },
  },
};
</script>
