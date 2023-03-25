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
      progressIndex: 0, // this sets the first progress bar
      barWidth: 0, // sets initial width of progress bar
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

    startAutoCarousel() {
      // start setInterval to active auto slider
      /**
       * First we increase the width of the progress bar starting with the first.
       * Once it's 100%, we activate the slideCarousel function to move to next image
       * Once all the width of each progress bar is 100%, we do a reset to continue from start
       * Note that the number of progress bar is equivalent to number of images available on the slide
       */
      setInterval(() => {
        if (this.progressIndex < this.imageLength) {
          // If we haven't set the width of all progress bar to 100%
          this.barWidth += 20
          this.$refs.progressBar[this.progressIndex].style.width = `${this.barWidth}%`
          this.$refs.mobileProgressBar[this.progressIndex].style.width = `${this.barWidth}%`

          if (this.$refs.progressBar[this.progressIndex].style.width === '100%' && this.$refs.mobileProgressBar[this.progressIndex].style.width === '100%') {
            // Move to the next progress bar if the width in the previous one has been filled to 100%
            this.progressIndex++
            this.barWidth = 0

            // Activate slideCarousel to move to next image
            this.slideCarousel()
          }
        } else {
          // If all the progree bar have width set to 100%
          // reset the progress bar target to be the first progress bar
          this.progressIndex = 0
          // reset the width of all the filled progress bar back to 0%
          for (var i = 0; i < this.imageLength; i++) {
            this.$refs.progressBar[i].style.width = '0%';
            this.$refs.mobileProgressBar[i].style.width = '0%'
          }
        }
      }, 1000)
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
          this.current++
          this.fadeOut = false
          this.loadedImg()
        }, 1000)
      } else {
        setTimeout(() => {
          this.current = 1
          this.fadeOut = false
          this.loadedImg()
        }, 1000)
      }

      // For the thumbnail looping, this is for displaying next image to be previewed
      if (this.thumbnailCurrent < this.imageLength) {
        setTimeout(() => {
          this.thumbnailCurrent++
          this.fadeOut = false
        }, 1000)
      } else {
        setTimeout(() => {
          this.thumbnailCurrent = 1
          this.fadeOut = false
        }, 1000)
      }
    },

    moveNextCarousel() {
      this.$refs.progressBar[this.progressIndex].style.width = `100%`;
      this.$refs.mobileProgressBar[this.progressIndex].style.width = '100%'
      this.progressIndex++
      this.barWidth = 0
      this.slideCarousel()
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
  <div class="flex-grow lg:w-1/2 w-full lg:justify-start justify-center flex lg:py-10 lg:pl-10 py-1">
    <div class="lg:w-3/4 lg:justify-start w-full flex justify-center">
      <div class="phoneContainer absolute rounded-md lg:-mt-16 mt-5">
        <div
          class="lg:rounded-full lg:flex hidden"
          :style="`box-shadow: -10px -17px 0px 18px rgba(${red}, ${green}, ${blue}, 1); 
          height : 500px; width : 350px; filter: blur(50px)`"
        />

        <div
          class="rounded-full flex lg:hidden"
          :style="`box-shadow: -10px -10px 0px 10px rgba(${red}, ${green}, ${blue}, 1); 
          height : 300px; width : 318px; filter: blur(50px)`"
        />

        <div class="p-1 absolute" style="top: 14.5%">
          <div :class="fadeOut ? 'fade-out-image' : 'fade-in-image'">
            <!-- displays large screen image -->
            <img
              class="device-content p-2"
              style="width: 100%"
              :srcset="slideImage(current).subset"
              :src="slideImage(current).value"
              ref="imgScreen"
              @load="loadedImg"
            />
          </div>
          <!-- displays the resolution banner -->
          <img
            class="absolute p-2"
            style="width: 50%; top: 80%; left: 24%"
            src="../assets/icons/screen-resolution.svg"
          />
        </div>
        <!--- Thumbnail for Large Screens --->
        <div
          class="lg:w-9 lg:mt-4 lg:mx-6 lg:h-10 lg:absolute lg:block hidden"
          :class="fadeOut ? 'thumb-fade-out-image' : 'thumb-fade-in-image'"
        >
          <img
            style="height: 100%; width: 100%"
            class="rounded-sm"
            :srcset="slideThumbnailImage(thumbnailCurrent).subset"
            :src="slideThumbnailImage(thumbnailCurrent).value"
            id="thumbnail"
          />
        </div>

        <!--- Thumbnail for Small Screens --->
        <div
          class="w-9 mx-6 h-9 absolute lg:hidden" style="top: 83.6%"
          :class="fadeOut ? 'thumb-fade-out-image' : 'thumb-fade-in-image'"
        >
          <img
            style="height: 100%; width: 100%"
            class="rounded-sm"
            :srcset="slideThumbnailImage(thumbnailCurrent).subset"
            :src="slideThumbnailImage(thumbnailCurrent).value"
            id="thumbnail"
          />
        </div>

        <!-- Circle Home Button for larger screens, when clicked, moves to next image on slide --->
        <div
          class="lg:w-12 lg:my-3 lg:mx-6 lg:h-12 border rounded-full cursor-pointer lg:block hidden"
          style="left: 33.5%"
          @click="moveNextCarousel()"
        ></div>

        <!-- Circle Home Button for smaller screens, when clicked, moves to next image on slide --->
        <div
          class="w-12 mx-6 h-12 rounded-full cursor-pointer lg:hidden border"
          style="left: 33.5%; top: 34%"
          @click="moveNextCarousel()"
        ></div>

        <!--- Carousel Progress Bar --->
        <div class="lg:w-4/5 lg:mx-8 lg:mt-20 lg:-mb-20 lg:flex hidden">
          <div
            v-for="(imgBorder, index) in imageLength"
            :key="index"
            class="flex flex-grow mx-2 w-full"
            style="border-radius: 3px; height: 2px; background-color: #3a3a3a"
          >
            <div class="bg-grey-white" :ref="`progressBar`" style="border-radius: 3px" />
          </div>
        </div>

        <!--- Carousel Progress Bar for smaller screens --->
        <div class="w-4/5 mx-8 h-10 mb-20 flex lg:hidden" style="top : 50%">
          <div
            v-for="(imgBorder, index) in imageLength"
            :key="index"
            class="flex flex-grow mx-2 w-full"
            style="border-radius: 3px; height: 2px; background-color: #3a3a3a"
          >
            <div class="bg-grey-white" :ref="`mobileProgressBar`" style="border-radius: 3px" />
          </div>
        </div>

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

.bg-grey-white {
  background-color: #eeecec;
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
