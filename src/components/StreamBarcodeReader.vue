<template>
    <div class="scanner-container">
        <div v-show="!isLoading">
            <video poster="data:image/gif,AAAA" ref="scanner"></video>
            <div class="overlay-element"></div>
            <div class="laser"></div>
        </div>
    </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from "@zxing/library";

export default {
    name: "stream-barcode-reader",

    data() {
        return {
            isLoading: true,
            codeReader: new BrowserMultiFormatReader(),
            isMediaStreamAPISupported:
                navigator &&
                navigator.mediaDevices &&
                "enumerateDevices" in navigator.mediaDevices
        };
    },

    mounted() {
        if (!this.isMediaStreamAPISupported) {
            throw new Exception("Media Stream API is not supported");
            return;
        }

        this.start();
        this.$refs.scanner.oncanplay = event => {
            this.isLoading = false;
            this.$emit("loaded");
        };
    },

    beforeUnmount() {
        this.codeReader.reset();
    },

    methods: {
        async start() {
            // Modern phones often have multipe front/rear cameras.
            // Sometimes special purpose cameras like the wide-angle camera are picked
            // by default. Those are not optimal for scanning QR codes but standard
            // media constraints don't allow us to specify which camera we want exactly.
            // However, explicitly picking the first entry in the list of all videoinput
            // devices for as the default front camera and the last entry as the default
            // rear camera seems to be a workaround.
            let selected_device_id = undefined
            const devices = await this.codeReader.listVideoInputDevices()
            if (devices.length > 2) {
              const selectedCamera = devices[devices.length - 1]
              selected_device_id = selectedCamera.deviceId
            }
            this.codeReader.decodeFromVideoDevice(
                selected_device_id,
                this.$refs.scanner,
                (result, err) => {
                    if (result) {
                        this.$emit("decode", result.text);
                    }
                }
            );
        }
    }
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
</style>
