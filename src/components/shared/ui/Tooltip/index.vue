<template>
  <div class="flex flex-col relative group">
    <div
      class="absolute rounded p-2 shadow top-2 left-10 bg-white invisible group-hover:visible"
    >
      {{ props.text }}
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  text: string;
}
const props = defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: "AppTooltip",
};
</script>
