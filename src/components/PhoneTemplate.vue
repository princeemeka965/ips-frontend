<script>
import { ref } from 'vue'
const imgScreen = ref(null)

export default {
  setup() {},

  data() {
    return {
      red: '77',
      green: '66',
      blue: '49'
    }
  },

  methods: {
    loadedImg() {
      /**
       * This function gets the average colors
       * of images visible on the mobile Mock up design.
       * It is displayed in rgb format
       */

      if (imgScreen.value) {
        var blockSize = 5,
          defaultRGB = { r: 77, g: 66, b: 49 }, // rgb values gotten from first image
          canvas = document.createElement('canvas'),
          context = canvas.getContext && canvas.getContext('2d'),
          data,
          width,
          height,
          i = -4,
          length,
          rgb = { r: 77, g: 66, b: 49 },
          count = 0

        if (!context) {
          // context identifier not supported, returns default rgb color
          return defaultRGB
        }

        /**
         * If context identifier is supported, this means a drawing context was returned in the canvas
         */
        height = canvas.height =
          imgScreen.value.naturalHeight || imgScreen.value.offsetHeight || imgScreen.value.height
        width = canvas.width =
          imgScreen.value.naturalWidth || imgScreen.value.offsetWidth || imgScreen.value.width

        context.drawImage(imgScreen.value, 0, 0)

        try {
          data = context.getImageData(0, 0, width, height)
        } catch (e) {
          return defaultRGB
        }

        length = data.data.length

        while ((i += blockSize * 4) < length) {
          ++count
          rgb.r += data.data[i]
          rgb.g += data.data[i + 1]
          rgb.b += data.data[i + 2]
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count)
        rgb.g = ~~(rgb.g / count)
        rgb.b = ~~(rgb.b / count)

        return rgb
      }
    }
  }
}
</script>

<template>
  <div class="lg:flex flex-grow h-full lg:w-1/2 w-full justify-start lg:py-10 lg:pl-10 hidden">
    <div class="w-3/4">
      <div class="phoneContainer absolute rounded-md -mt-16">
        <div
          class="rounded-full"
          :style="`box-shadow: -20px -50px 0px 28px rgba(${red}, ${green}, ${blue}, .5); 
          height : 500px; width : 350px; filter: blur(50px)`"
        />
        <div class="p-1 absolute" style="top: 14.5%">
          <img
            class="device-content p-2"
            style="width: 100%"
            srcset="../assets/icons/carousel-photo-01@2x.jpg 2x ../assets/icons/carousel-photo-01@3x.jpg 3x"
            src="../assets/icons/carousel-photo-01.jpg"
            ref="imgScreen"
            @load="loadedImg"
          />
        </div>
        <div class="lg:w-9 lg:mt-4 lg:mx-6 lg:h-10 absolute">
          <img
            style="height: 100%; width: 100%"
            srcset="../assets/icons/small-carousel-photo-01@2x.jpg 2x ../assets/icons/small-carousel-photo-01@3x.jpg 3x"
            src="../assets/icons/small-carousel-photo-01.jpg"
          />
        </div>
        <div
          class="lg:w-12 lg:my-3 lg:mx-6 lg:h-12 border rounded-full cursor-pointer"
          style="left: 33.5%"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phoneContainer {
  background-image: url('../assets/icons/iPhone-mokup.png');
  background-image: -webkit-image-set(
    url('../assets/icons/iPhone-mokup.png') 1x,
    url('../assets/icons/iPhone-mokup@2x.png') 2x,
    url('../assets/icons/iPhone-mokup@3x.png') 3x
  );
  background-image: image-set(
    url('../assets/icons/iPhone-mokup.png') 1x,
    url('../assets/icons/iPhone-mokup@2x.png') 2x,
    url('../assets/icons/iPhone-mokup@3x.png') 3x
  );
  background-size: contain;
  height: 619px;
  width: 300px;
}
</style>
