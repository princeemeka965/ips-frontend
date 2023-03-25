<script>
import ButtonField from '../components/ButtonField.vue'
export default {
  components: { ButtonField },
    setup() {
    },
}
</script>

<template>
    <div class="w-full h-screen">
        <div class="w-full lg:w-1/3 flex flex-col justify-center absolute p-7" style="top: 0; left: 0; bottom: 0; right: 0; margin: auto">
          <span class="text-3xl w-full text-center">
            Thank You!
          </span>
          <span class="my-1 text-lg w-full lg:text-start text-center">
            You will get notified when iPhone Photo Academy becomes available
          </span>
          <span class="my-1 w-full text-center">
            <a href="https://www.youtube.com/user/iPhonePS?sub_confirmation=1" target="_blank">
            <ButtonField :disabled="false" :text="`Subscribe To Our Youtube Channel`" :width="`lg:w-full md:w-1/2 w-full`" />
            </a>
          </span>
        </div>
    </div>
</template>