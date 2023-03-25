<script>
import BadgeComponent from '../components/BadgeComponent.vue'
import PhoneTemplate from '../components/PhoneTemplate.vue'
import InputText from '../components/InputText.vue'
import ButtonField from '../components/ButtonField.vue'

export default {
  setup() {},
  components: {
    BadgeComponent,
    PhoneTemplate,
    InputText,
    ButtonField
  },

  data() {
    return {
      btnDisabled: true // sets submit button to be disabled by default
    }
  },

  methods: {
    toggleSubmitBtn(value) {
      /**
       * This enables the submit button to be enabled or disabled 
       * If validation of email input field is successful, button is enabled and vice-versa
       */
      if(value) {
        // validation of email input field is successful
        // enable submit button
        this.btnDisabled = false
      }
      else {
        // validation of email input field is not successful
        // disable submit button
        this.btnDisabled = true
      }
    }
  }
}
</script>

<template>
  <div class="w-full h-screen flex flex-col lg:py-10 lg:pl-32 sm:py-10 sm:px-20 py-10 px-5">
    <!--- Set Logo as Header -->
    <div class="lg:flex md:flex sm:flex hidden">
      <img src="../assets/icons/ips-logo.svg" />
    </div>
    <!--- Set Section of Web Page --->
    <div
      class="w-full flex flex-col lg:flex lg:flex-row md:flex lg:my-16 sm:my-20 my-5"
      style="min-height : 85vh"
    >
      <!-- First Segment of Section featuring Email Input for notification ---->
      <div class="flex lg:w-1/2 lg:flex-grow flex-col lg:flex-wrap w-full justify-start lg:py-20">
        <div class="flex flex-col lg:flex-grow lg:my-10">
          <div class="lg:w-4/5 w-full">
            <badge-component title="New Course" />
            <div class="lg:py-3 sm:py-4 pt-5 pb-3">
              <span class="lg:text-6xl md:text-6xl sm:text-4xl text-4xl">
                iPhone Photo Academy
              </span>
            </div>
            <div class="lg:py-2 w-full">
              <span class="lg:text-xl text-xl"
                >Sign up now to get notified when this course is available!</span
              >
            </div>
            <div class="py-2">
              <InputText @validate="toggleSubmitBtn($event)" />
            </div>
            <div class="py-2">
              <ButtonField :disabled="btnDisabled" @onSubmit="$router.push({name : 'ThankYou'})" />
            </div>
          </div>
        </div>
      </div>

      <!-- Second Segment of Section featuring Mock Up Phone design ---->
      <phone-template />

    </div>
  </div>
</template>