<template>
  <div class="flex rounded shadow-xl border w-full md:flex-col md:items-center">
    <div class="flex-1 p-10">
      <div class="flex flex-col">
        <Timeline
          :segments="segments"
          :carrier="ticket.itineraries[0][0].carrier"
          :carrier-name="ticket.itineraries[0][0].carrier_name"
        />
        <div class="flex mt-5">
          <div class="flex space-x-2">
            <span
              class="text-blue-300 border-b border-blue-400 border-dashed cursor-pointer"
              >Детали билета</span
            >
            <span
              class="text-blue-300 border-b border-blue-400 border-dashed cursor-pointer"
              >Детали билета</span
            >
          </div>
          <div
            v-if="ticket.refundable"
            class="flex ml-8 w-1/2 space-x-1 cursor-pointer"
          >
            <img src="@/assets/icons/refundable.svg" />
            <span class="text-gray-400">невозвратный</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 items-center w-[280px] p-5">
        <span class="text-[23px] font-medium">{{ ticket.price }} тг</span>
        <AppButton class="w-full self-baseline">Выбрать</AppButton>
        <span class="text-[12px]">Цена за всех пассажиров</span>
        <div class="flex space-x-2 text-[12px] items-center">
          <span v-if="!hasBagage">Нет багажа</span>
          <span v-else>{{ segments[0].baggage_options[0]?.value }}</span>
          <button class="rounded bg-blue-300/20 text-blue-500 p-1 font-bold">
            + Добавить багаж
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Flights } from "../../models/common.interface";
import { computed } from "vue";

interface Props {
  ticket: Flights;
}
const props = defineProps<Props>();
const segments = computed(() => {
  const [itineraries] = props.ticket.itineraries.flat(2);
  return itineraries.segments;
});
const hasBagage = computed(() =>
  segments.value.some(item =>
    item.baggage_options.some(innerItem => innerItem.value > 0)
  )
);
</script>
<script lang="ts">
import Timeline from "./Timeline/index.vue";
import AppButton from "../shared/ui/Button/index.vue";

export default {
  name: "TicketCard",
  components: { AppButton, Timeline },
};
</script>
