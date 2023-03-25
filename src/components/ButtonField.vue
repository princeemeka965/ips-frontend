<script>
export default {
  setup() {},
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Please Notify Me'
    },
    width: {
      type: String,
      default: 'lg:w-1/2 w-full'
    }
  }
}
</script>

<template>
  <div
    class="justify-center flex p-3 rounded-md"
    :class="disabled ? `disable-bg ${width}` : `enabled-bg ${width}`"
  >
    <button type="submit" :disabled="disabled" class="text-base" @click="$emit('onSubmit', true)">
      {{ text }}
    </button>
  </div>
</template>

<style scoped>
.disable-bg {
  background: linear-gradient(135deg, #370c14 0%, #280c23 100%);
}

.enabled-bg {
  background: linear-gradient(135deg, #62051c 0%, #440c3a 100%);
}
</style>
