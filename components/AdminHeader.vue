<template>
  <div class="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-4 w-full md:w-auto">
        <button class="text-gray-400 md:block hidden">
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <div class="relative flex-1 md:flex-none">
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search for anything..."
            class="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-full md:w-96 focus:outline-none"
          />
        </div>
      </div>
      <div class="flex items-center justify-end gap-4">
        <button class="text-gray-600">
          <CalendarIcon class="w-6 h-6" />
        </button>
        <button class="text-gray-600">
          <BellIcon class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium hidden md:inline">Admin 1</span>
          <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";
</script>
