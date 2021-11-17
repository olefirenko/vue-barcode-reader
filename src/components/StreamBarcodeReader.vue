<template>
  <div class="scanner-container">
    <div v-show="!isLoading">
      <video poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="overlay-element">
        <div class="div-buttoms" v-if="listOfCameras">
          <button
            class="btn-circle"
            v-for="(camera, index) in listOfCameras"
            :key="index"
            @click="start(camera.deviceId)"
            v-bind:class="{
              'btn-selected': selectedCamera === camera.deviceId,
            }"
          >
            <span>{{ index + 1 }}</span>
          </button>
        </div>
      </div>
      <div class="laser"></div>
    </div>
  </div>
</template>

<script>
import {
  BrowserMultiFormatReader,
  Exception,
  NotFoundException,
} from "@zxing/library";
export default {
  name: "stream-barcode-reader",
  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        "enumerateDevices" in navigator.mediaDevices,
      listOfCameras: [],
      selectedCamera: null,
    };
  },
  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
    }
    this.listCameras();
    this.$refs.scanner.oncanplay = () => {
      this.isLoading = false;
      this.$emit("loaded");
    };
  },
  beforeDestroy() {
    this.codeReader.reset();
  },
  methods: {
    start(idCamera) {
      this.isLoading = true;
      this.selectedCamera = idCamera;
      this.codeReader.reset();
      console.log("Reseted, new id is: ", idCamera);
      this.codeReader.decodeFromVideoDevice(
        idCamera,
        this.$refs.scanner,
        (result, err) => {
          if (result) {
            this.isLoading = false;
            this.$emit("decode", result.text);
          }
          if (err && !(err instanceof NotFoundException)) {
            console.log("error: ", err);
          }
        }
      );
    },
    listCameras() {
      this.codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length >= 1) {
            this.listOfCameras = videoInputDevices.reverse();
            this.selectedCamera = this.listOfCameras[0].deviceId;
            this.start(this.selectedCamera);
          } else {
            console.log("No cameras found.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
video {
  max-width: 100%;
  max-height: 100%;
}
.scanner-container {
  position: relative;
}
.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 99%;
  background: rgba(30, 30, 30, 0.5);
  -webkit-clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
  clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
}
.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}
@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
.btn-circle {
  width: 2rem;
  height: 2rem;
  padding: 0;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background: #00000071;
  color: #fff;
  border-color: white;
  margin: 1rem;
  cursor: pointer;
  line-height: 1.5;
  border-radius: 2rem;
}
.btn-selected {
  background: #ffffff !important;
  color: #000000 !important;
}
.div-buttoms {
  display: flex;
  align-items: center;
  align-items: end;
  height: 100%;
  place-content: center;
  padding-bottom: 1rem;
}
</style>