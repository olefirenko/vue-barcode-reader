import { BrowserMultiFormatReader as s, Exception as h } from "@zxing/library";
import { openBlock as d, createElementBlock as c, withDirectives as _, createElementVNode as n, vShow as u, pushScopeId as f, popScopeId as g } from "vue";
const m = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [o, a] of t)
    r[o] = a;
  return r;
}, v = {
  name: "image-barcode-reader",
  data() {
    return {
      codeReader: new s()
    };
  },
  methods: {
    onChangeInput(e) {
      const t = e.target.files || e.dataTransfer.files;
      if (!t.length)
        return;
      const r = new FileReader();
      r.onload = this.processFile, r.readAsDataURL(t[0]);
    },
    processFile(e) {
      this.$el.innerHTML += `<img id="image" src="${e.target.result}"/>`, this.codeReader.decodeFromImage("image").then((t) => {
        this.$emit("decode", t.text), this.$emit("result", t);
      }).catch((t) => this.$emit("error", t));
    }
  }
};
function $(e, t, r, o, a, i) {
  return d(), c("input", {
    onChange: t[0] || (t[0] = (...l) => i.onChangeInput && i.onChangeInput(...l)),
    type: "file",
    name: "image",
    accept: "image/*",
    capture: "environment"
  }, null, 32);
}
const D = /* @__PURE__ */ m(v, [["render", $]]);
const I = {
  name: "stream-barcode-reader",
  data() {
    return {
      isLoading: !0,
      codeReader: new s(),
      isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices
    };
  },
  mounted() {
    if (!this.isMediaStreamAPISupported)
      throw new h("Media Stream API is not supported");
    this.start(), this.$refs.scanner.oncanplay = (e) => {
      this.isLoading = !1, this.$emit("loaded");
    };
  },
  beforeUnmount() {
    this.codeReader.reset();
  },
  methods: {
    start() {
      this.codeReader.decodeFromVideoDevice(void 0, this.$refs.scanner, (e, t) => {
        e && (this.$emit("decode", e.text), this.$emit("result", e));
      });
    }
  }
}, p = (e) => (f("data-v-ec9cd3e6"), e = e(), g(), e), R = { class: "scanner-container" }, S = {
  poster: "data:image/gif,AAAA",
  ref: "scanner"
}, w = /* @__PURE__ */ p(() => /* @__PURE__ */ n("div", { class: "overlay-element" }, null, -1)), x = /* @__PURE__ */ p(() => /* @__PURE__ */ n("div", { class: "laser" }, null, -1));
function A(e, t, r, o, a, i) {
  return d(), c("div", R, [
    _(n("div", null, [
      n("video", S, null, 512),
      w,
      x
    ], 512), [
      [u, !a.isLoading]
    ])
  ]);
}
const F = /* @__PURE__ */ m(I, [["render", A], ["__scopeId", "data-v-ec9cd3e6"]]);
export {
  D as ImageBarcodeReader,
  F as StreamBarcodeReader
};
