<script setup>
import BadgeComponent from './components/BadgeComponent.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col lg:py-10 lg:px-20 sm:py-10 sm:px-20 py-10 px-5">
    <!--- Set Logo as Header -->
    <div class="lg:flex md:flex sm:flex hidden">
      <img src="./assets/icons/ips-logo.svg" />
    </div>
    <!--- Set Section of Web Page --->
    <div
      class="w-full flex flex-col lg:flex lg:flex-row md:flex md:flex-row lg:my-16 sm:my-20 my-5"
    >
    <!-- First Segment of Section featuring Email Input for notification ---->
      <div class="flex lg:w-1/2 w-full justify-start lg:py-10">
        <div class="flex flex-col flex-grow lg:my-10">
          <div class="w-4/5">
            <badge-component title="New Course" />
            <div class="lg:py-3 py-4">
              <span class="lg:text-6xl md:text-6xl sm:text-4xl text-4xl"> iPhone Photo Academy </span>
            </div>
            <div class="lg:py-2"><span class="lg:text-xl">Sign up now to get notified when this course is available!</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped></style>
