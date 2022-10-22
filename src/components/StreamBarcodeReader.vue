<template>
  <div class="scanner-container">
    <div v-show="!isLoading && showTorchBtn" class="scanner-ui">
      <ul class="torch">
        <li :class="{ 'leave': !torch, 'enter': torch }" @click="torchChange(!torch)"></li>
      </ul>
    </div>
    <div v-show="!isLoading">
      <video ref="scanner" poster="data:image/gif,AAAA"></video>
      <div class="overlay-element">
        <div v-if="showListCameras && listOfCameras" class="div-buttoms">
          <button
            v-for="(camera, index) in listOfCameras"
            :key="index"
            class="btn-circle"
            :class="{
              'btn-selected': selectedCamera === camera.deviceId,
            }"
            @click="start(camera.deviceId)"
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
} from '@zxing/library';

export default {
  name: 'StreamBarcodeReader',
  props: {
    showListCameras: {
      type: Boolean,
      default: false,
    },
    showTorchBtn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loaded', 'decode'],
  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        'enumerateDevices' in navigator.mediaDevices,
      listOfCameras: [],
      selectedCamera: null,
      torch: false,
    };
  },
  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception('Media Stream API is not supported');
    }
    this.listCameras();
    this.$refs.scanner.oncanplay = () => {
      this.isLoading = false;
      this.$emit('loaded');
    };
  },
  beforeUnmount() {
    this.codeReader.reset();
  },
  methods: {
    start(idCamera) {
      this.isLoading = true;
      this.selectedCamera = idCamera;
      this.codeReader.reset();
      this.codeReader.decodeFromVideoDevice(
        idCamera,
        this.$refs.scanner,
        (result, err) => {
          if (result) {
            this.isLoading = false;
            this.$emit('decode', result.text);
          }
          if (err && !(err instanceof NotFoundException)) {
            throw new Exception(err);
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
            throw new Exception('No cameras found.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    torchChange(value) {
      document.getElementsByTagName('video')[0]
      .srcObject.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: value }] });
      this.torch = value;
    }
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
  align-items: end;
  height: 100%;
  place-content: center;
  padding-bottom: 1rem;
}
/* torch */
.torch {
  position: absolute;
  z-index: 1;
  padding-right: 2rem;
  right: 0;
}
.torch li.enter, .torch li.leave {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 2rem;
  margin: 20px;
  display: inline-block;
  background: #00f7a5;
  box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
}

.torch li.enter {
  animation: flash-1-enter 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
.torch li.leave {
  animation: flash-1-leave 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
.torch {
  animation: appear 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
}
@keyframes flash-1-enter {
  0% {
    background: #a0a0a0;
    box-shadow: 0px 4.6666666667px 24px 3px #999999;
  }
  100% {
    background: #ffffff;
    box-shadow: 0px 4.6666666667px 24px 3px #ffffff;
  }
}
@keyframes flash-1-leave {
  0% {
    background: #ffffff;
    box-shadow: 0px 4.6666666667px 24px 3px #ffffff;
  }
  100% {
    background: #a0a0a0;
    box-shadow: 0px 4.6666666667px 24px 3px #999999;
  }
}
</style>