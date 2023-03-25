<script>
export default {
  setup() {},

  data() {
    return {
      validationResponse: { error: false, message: '' }
    }
  },

  methods: {
    changeInput(event) {
      if (event.target.value !== '') {
        // Input field value is not empty
        this.$refs.label.classList.remove('text-base')
        this.$refs.label.classList.add('text-xs')
        this.$refs.label.classList.remove('py-1')
        this.$refs.label.classList.add('-mt-1')
        this.$refs.input.classList.add('h-4')
        this.$refs.input.classList.add('mt-3')
        this.$refs.label.style.color = '#3A3A3A'

        // validate email input
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
          this.validationResponse.error = false
          this.validationResponse.message = ''
          this.$refs.label.style.color = '#3A3A3A'

          // emit success validation to keep the submit Button enabled
          this.$emit('validate', true);
        } else {
          // Invalid email input
          this.validationResponse.error = true
          this.validationResponse.message = 'Please enter a valid email'
          this.$refs.label.style.color = '#D41C3D'

          // emit error validation to keep the submit Button disabled
          this.$emit('validate', false);
        }
      } else {
        // Input field value is empty, restore to default
        this.$refs.label.classList.add('text-base')
        this.$refs.label.classList.remove('text-xs')
        this.$refs.label.classList.add('py-1')
        this.$refs.label.classList.remove('-mt-1')
        this.$refs.input.classList.remove('h-4')
        this.$refs.input.classList.remove('mt-3')
        this.$refs.label.style.color = null
        this.validationResponse.error = false
        this.validationResponse.message = ''
      }
    }
  }
}
</script>

<template>
  <div class="my-3 lg:my-1 w-full">
    <div
      class="lg:w-8/12 flex w-full py-3 px-4 rounded-md"
      :class="validationResponse.error ? 'err-input-border' : 'input-border'"
      style="background-color: #171715"
    >
      <input
        type="email"
        id="email"
        autocomplete="off"
        ref="input"
        style="background-color: transparent; width: 100%"
        @input="changeInput($event)"
      />
      <label for="email" class="label text-base absolute py-1 px-1" ref="label">{{
        validationResponse.error ? validationResponse.message : 'Enter your Email Address'
      }}</label>
      <div class="pl-2 pr-3 py-1">
        <img src="../assets/icons/email.svg" width="24" height="24" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-border {
  border: 1px solid #3a3a3a;
}

.err-input-border {
  border: 1px solid #d41c3d;
}

input {
  outline: none;
}

label {
  color: #eeececb7;
  pointer-events: none;
  left: 10px;
}
</style>
