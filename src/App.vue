<template>
  <div id="app">
    <StreamBarcodeReader
        @decode="(a, b, c) => onDecode(a, b, c)"
    />
  </div>
</template>

<script>
import StreamBarcodeReader from './components/StreamBarcodeReader.vue';

export default {
  name: 'App',
  components: {
    StreamBarcodeReader
  },
  methods: {
    onDecode(...rest) {
      console.log(rest)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>