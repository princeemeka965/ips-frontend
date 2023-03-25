<script>
import carousel from '../helpers/carousel.js'

export default {
  setup() {
    const { slideImage, imageLength, slideThumbnailImage } = carousel()
    return {
      slideImage,
      imageLength,
      slideThumbnailImage
    }
  },

  data() {
    return {
      red: '77',
      green: '66',
      blue: '49',
      current: 1, // starts with the first image
      thumbnailCurrent: 2, // this shows next image on slide
      fadeOut: false,
      timer: null
    }
  },

  methods: {
    loadedImg() {
      /**
       * This function gets the average colors
       * of images visible on the mobile Mock up design.
       * It is displayed in rgb format
       */
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
        this.$refs.imgScreen.naturalHeight ||
        this.$refs.imgScreen.offsetHeight ||
        this.$refs.imgScreen.height
      width = canvas.width =
        this.$refs.imgScreen.naturalWidth ||
        this.$refs.imgScreen.offsetWidth ||
        this.$refs.imgScreen.width

      context.drawImage(this.$refs.imgScreen, 0, 0)

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

      this.red = rgb.r
      this.green = rgb.g
      this.blue = rgb.b
    },

    stopAutoCarousel() {
      // clear setInterval created on Mounted
      clearInterval(this.timer)
    },

    startAutoCarousel() {
      // start setInterval to active auto slider
      this.timer = setInterval(() => {
        this.slideCarousel()
      }, 5000)
    },

    slideCarousel() {
      /**
       * Increase the value of the `current` variable till it's equal to value of `imageLength` constant
       * Once it's equal, reset the value of the `current` variable to 1
       * Toggle fade in and fade out class of the displayed image
       */

      // fade out current image
      this.fadeOut = true

      // For the preview Image looping
      if (this.current < this.imageLength) {
        setTimeout(() => {
          this.current++;
          this.fadeOut = false
          this.loadedImg()
        }, 1000)
      } else {
        setTimeout(() => {
          this.current = 1;
          this.fadeOut = false
          this.loadedImg()
        }, 1000)
      }

      // For the thumbnail looping, this is for displaying next image to be previewed
      if (this.thumbnailCurrent < this.imageLength) {
        setTimeout(() => {
          this.thumbnailCurrent++;
          this.fadeOut = false
        }, 1000)
      } else {
        setTimeout(() => {
          this.thumbnailCurrent = 1;
          this.fadeOut = false
        }, 1000)
      }

    }
  },

  mounted() {
    /**
     * onMounted, activate automotaic carousel
     */
     this.startAutoCarousel()
  }
}
</script>

<template>
  <div class="lg:flex flex-grow h-full lg:w-1/2 w-full justify-start lg:py-10 lg:pl-10 hidden">
    <div class="w-3/4">
      <div class="phoneContainer absolute rounded-md -mt-16">
        <div
          class="rounded-full"
          :style="`box-shadow: -10px -17px 0px 12px rgba(${red}, ${green}, ${blue}, 1); 
          height : 500px; width : 350px; filter: blur(50px)`"
        />
        <div
          class="p-1 absolute fade-in-image"
          :class="fadeOut ? 'fade-out-image' : 'fade-in-image'"
          style="top: 14.5%"
        >
          <img
            class="device-content p-2"
            style="width: 100%"
            :srcset="slideImage(current).subset"
            :src="slideImage(current).value"
            ref="imgScreen"
            @load="loadedImg"
          />
        </div>
        <div class="lg:w-9 lg:mt-4 lg:mx-6 lg:h-10 absolute"
        :class="fadeOut ? 'thumb-fade-out-image' : 'thumb-fade-in-image'"
        >
          <img
            style="height: 100%; width: 100%"
            :srcset="slideThumbnailImage(current).subset"
            :src="slideThumbnailImage(thumbnailCurrent).value"
            id="thumbnail"
          />
        </div>
        <div
          class="lg:w-12 lg:my-3 lg:mx-6 lg:h-12 border rounded-full cursor-pointer"
          style="left: 33.5%"
          @click="slideCarousel()"
          @mouseenter="stopAutoCarousel()"
          @mouseleave="startAutoCarousel()"
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

.fade-in-image {
  animation: fadeIn 3s;
  -webkit-animation: fadeIn 3s;
  -moz-animation: fadeIn 3s;
  -o-animation: fadeIn 3s;
  -ms-animation: fadeIn 3s;
}

.fade-out-image {
  animation: fadeOut 1s;
  -webkit-animation: fadeOut 1s;
  -moz-animation: fadeOut 1s;
  -o-animation: fadeOut 1s;
  -ms-animation: fadeOut 1s;
}

.thumb-fade-in-image {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
}

.thumb-fade-out-image {
  animation: fadeOut 1s;
  -webkit-animation: fadeOut 1s;
  -moz-animation: fadeOut 1s;
  -o-animation: fadeOut 1s;
  -ms-animation: fadeOut 1s;
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
