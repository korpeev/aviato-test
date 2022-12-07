<script setup lang="ts">
import TicketCard from "./components/TickCard/index.vue";
import MainLayout from "./components/shared/layouts/MainLayout.vue";
import AppCheckbox from "./components/shared/ui/Checkbox/index.vue";
import { computed, onMounted, ref } from "vue";
import AppTooltip from "./components/shared/ui/Tooltip/index.vue";
import FilterContainer from "./components/shared/FilterContainer.vue";
import api from "./services/Api";
import { Airlines, Flights } from "./models/common.interface";

const value = ref(false);
const tariffItems = ref([
  { title: "Только прямые", id: 1, value: false },
  { title: "Только с багажом", id: 2, value: false },
  { title: "Только возвратные", id: 3, value: false },
]);
const airlineItems = ref([{ id: 4, title: "Все", value: true }]);
const flightTickets = ref<Flights[]>([]);
const activeFilters = computed(() =>
  [...airlineItems.value, ...tariffItems.value].filter(item => item.value)
);
const resetFilter = (type: "tariff" | "name") => {
  if (type === "tariff") {
    tariffItems.value = tariffItems.value.map(item => ({
      ...item,
      value: false,
    }));
  } else {
    airlineItems.value = airlineItems.value.map(item => ({
      ...item,
      value: false,
    }));
  }
};
const filteredTickets = computed(() => {
  return flightTickets.value.filter(item =>
    activeFilters.value.length === 0
      ? true
      : activeFilters.value.some(innerItem => {
          switch (innerItem.title) {
            case "Только прямые":
              return item.itineraries[0][0].stops === 0;
            case "Только с багажом":
              return (
                item.itineraries[0][0].segments[0].baggage_options[0].value > 0
              );
            case "Только возвратные":
              return !item.refundable;
            case "Все":
              return true;
            default:
              return innerItem.title === item.itineraries[0][0].carrier_name;
          }
        })
  );
});
onMounted(async () => {
  const flightsResponse = await api.get<Flights>("flights");
  const airlinesResponse = await api.get<Airlines>("airlines");
  flightTickets.value = flightsResponse;
  airlineItems.value = airlineItems.value.concat(
    Object.values(airlinesResponse).map((item, index) => ({
      id: 4 + index + 1,
      title: item as unknown as string,
      value: false,
      field: "carrier_name",
    }))
  );
});
</script>

<template>
  <div class="w-screen h-screen">
    <MainLayout>
      <div class="flex space-x-10 md:flex-col md:items-center">
        <div class="flex-col space-y-5">
          <FilterContainer>
            <div class="flex justify-between px-5">
              <h3 class="font-bold">Опции тарифа</h3>
              <AppTooltip text="Сбросить выбор">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="group cursor-pointer"
                  @click="resetFilter('tariff')"
                >
                  <path
                    class="group-hover:fill-blue-500 transition-colors"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6464 6.64648L13.2929 4.00004L10.6464 1.35359L11.3535 0.646484L14 3.29293L16.6464 0.646484L17.3535 1.35359L14.7071 4.00004L17.3535 6.64648L16.6464 7.35359L14 4.70714L11.3535 7.35359L10.6464 6.64648ZM2.91465 4.00003H8C8 4.34074 8.0284 4.67482 8.08296 5.00003H2.91465C2.70873 5.58263 2.15311 6.00003 1.5 6.00003C0.671573 6.00003 0 5.32846 0 4.50003C0 3.6716 0.671573 3.00003 1.5 3.00003C2.15311 3.00003 2.70873 3.41743 2.91465 4.00003ZM7.91465 8.00003H9.52779C9.86799 8.38014 10.2559 8.71661 10.6822 9.00003H7.91465C7.70873 9.58263 7.15311 10 6.5 10C5.84689 10 5.29127 9.58263 5.08535 9.00003H0.5C0.223858 9.00003 0 8.77617 0 8.50003C0 8.22389 0.223858 8.00003 0.5 8.00003H5.08535C5.29127 7.41743 5.84689 7.00003 6.5 7.00003C7.15311 7.00003 7.70873 7.41743 7.91465 8.00003ZM2.91465 12C2.70873 11.4174 2.15311 11 1.5 11C0.671573 11 0 11.6716 0 12.5C0 13.3285 0.671573 14 1.5 14C2.15311 14 2.70873 13.5826 2.91465 13H14.5C14.7761 13 15 12.7762 15 12.5C15 12.2239 14.7761 12 14.5 12H2.91465Z"
                    fill="#B9B9B9"
                  />
                </svg>
              </AppTooltip>
            </div>
            <AppCheckbox
              :key="tariff.id"
              v-for="tariff of tariffItems"
              :item="tariff"
              v-model="tariff.value"
            />
          </FilterContainer>
          <FilterContainer>
            <div class="flex justify-between px-5">
              <h3 class="font-bold">Авиакомпании</h3>
              <AppTooltip text="Сбросить выбор">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="group cursor-pointer"
                  @click="resetFilter('name')"
                >
                  <path
                    class="group-hover:fill-blue-500 transition-colors"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6464 6.64648L13.2929 4.00004L10.6464 1.35359L11.3535 0.646484L14 3.29293L16.6464 0.646484L17.3535 1.35359L14.7071 4.00004L17.3535 6.64648L16.6464 7.35359L14 4.70714L11.3535 7.35359L10.6464 6.64648ZM2.91465 4.00003H8C8 4.34074 8.0284 4.67482 8.08296 5.00003H2.91465C2.70873 5.58263 2.15311 6.00003 1.5 6.00003C0.671573 6.00003 0 5.32846 0 4.50003C0 3.6716 0.671573 3.00003 1.5 3.00003C2.15311 3.00003 2.70873 3.41743 2.91465 4.00003ZM7.91465 8.00003H9.52779C9.86799 8.38014 10.2559 8.71661 10.6822 9.00003H7.91465C7.70873 9.58263 7.15311 10 6.5 10C5.84689 10 5.29127 9.58263 5.08535 9.00003H0.5C0.223858 9.00003 0 8.77617 0 8.50003C0 8.22389 0.223858 8.00003 0.5 8.00003H5.08535C5.29127 7.41743 5.84689 7.00003 6.5 7.00003C7.15311 7.00003 7.70873 7.41743 7.91465 8.00003ZM2.91465 12C2.70873 11.4174 2.15311 11 1.5 11C0.671573 11 0 11.6716 0 12.5C0 13.3285 0.671573 14 1.5 14C2.15311 14 2.70873 13.5826 2.91465 13H14.5C14.7761 13 15 12.7762 15 12.5C15 12.2239 14.7761 12 14.5 12H2.91465Z"
                    fill="#B9B9B9"
                  />
                </svg>
              </AppTooltip>
            </div>
            <AppCheckbox
              :key="airline.id"
              v-for="airline of airlineItems"
              :item="airline"
              v-model="airline.value"
            />
          </FilterContainer>
        </div>
        <div class="flex flex-col space-y-5 md:space-x-5 md:mt-5">
          <TicketCard
            v-for="ticket of filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
          />
        </div>
      </div>
    </MainLayout>
  </div>
</template>
