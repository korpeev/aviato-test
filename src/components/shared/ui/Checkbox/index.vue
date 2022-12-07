<template>
  <label
    :for="`checkbox-${props.item.id}`"
    :id="`label-${props.item.id}`"
    class="flex gap-2 px-5 py-2 hover:bg-gray-200/60 cursor-pointer transition-colors items-center group"
  >
    <div
      v-show="!props.item.value"
      class="w-4 h-4 rounded border border-gray-400 group-hover:bg-[url('assets/icons/check-hover.svg')] group-hover:bg-[B9B9B9] bg-center bg-no-repeat transition-colors peer-checked:bg-accent peer-checked:bg-[url('assets/icons/check.svg')]"
    />
    <div
      v-show="props.item.value"
      class="w-4 h-4 rounded border border-gray-400 bg-center bg-no-repeat transition-colors bg-accent bg-[url('assets/icons/check.svg')]"
    />
    <input
      v-model="model"
      :id="`checkbox-${props.item.id}`"
      type="checkbox"
      class="peer hidden"
    />
    <span class="cursor-pointer p-1">{{ props.item.title }}</span>
  </label>
</template>
<script lang="ts" setup>
import { computed } from "vue";

type Item = {
  id: number;
  title: string;
  value: boolean;
};
interface Props {
  item: Item;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
const model = computed({
  get() {
    return props.item.value;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});
</script>
<script lang="ts">
export default {
  name: "AppCheckbox",
};
</script>
