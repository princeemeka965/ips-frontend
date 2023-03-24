<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
})
</script>

<template>
<div class="py-2 px-4 rounded-full badge-bg max-w-max">
<span class="uppercase text-xs">
{{title}}
</span>
</div>
</template>

<style scoped>
.badge-bg {
  background-color: #2B5341;
}
</style>
