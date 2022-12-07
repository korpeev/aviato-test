<template>
  <button
    class="bg-accent text-white font-bold px-10 py-3 rounded-md uppercase"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "click"): void }>();
</script>
<script lang="ts">
export default {
  name: "app-button",
};
</script>
