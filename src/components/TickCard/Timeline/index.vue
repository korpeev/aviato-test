<template>
  <div class="flex gap-5 max-w-[700px] w-full justify-between md:flex-col">
    <span class="flex gap-2 items-center">
      <!--      <AirlineIcon />-->
      <img
        width="15"
        height="20"
        :src="`https://aviata.kz/static/airline-logos/80x80/${carrier}.png`"
        alt="KC"
      />
      {{ carrierName }}
    </span>
    <div class="flex flex-1 justify-between gap-5 md:flex-col">
      <div class="flex justify-between">
        <div class="flex flex-col items-center">
          {{ originSegment.origin }}
          <span>{{ parsedSegmentTime.originSegmentDate }}</span>
          <span class="text-2xl font-bold">{{
            parsedSegmentTime.originSegmentTime
          }}</span>
        </div>
        <div class="flex flex-col invisible md:visible">
          {{ originSegment.dest }}
          <span>{{ parsedSegmentTime.destinationSegmentDate }}</span>
          <span class="text-2xl font-bold">{{
            parsedSegmentTime.destinationSegmentTime
          }}</span>
        </div>
      </div>
      <div class="flex flex-col w-full items-center mt-3 md:order-2">
        <div class="flex justify-between w-full items-center border-b">
          <div class="flex-col">
            <span>ALA</span>
            <div
              class="rounded-full h-2 w-2 relative top-1 border border-[##B9B9B9] bg-white"
            />
          </div>
          <div class="flex-col relative">
            <span>{{ airDurations }}</span>
            <div
              class="rounded-full h-2 w-2 relative top-1 -right-6 border border-[##B9B9B9] bg-white"
            />
          </div>
          <div class="flex-col relative">
            <span>TSE</span>
            <div
              class="rounded-full h-2 w-2 relative top-1 -right-5 border border-[##B9B9B9] bg-white"
            />
          </div>
        </div>
        <span v-if="segments.length > 1" class="text-[#FF9900] mt-2"
          >через {{ segments[0].dest }},
          {{ segmentDuration }}
        </span>
      </div>
      <div class="flex flex-col md:hidden">
        {{ originSegment.dest }}
        <span>{{ parsedSegmentTime.destinationSegmentDate }}</span>
        <span class="text-2xl font-bold">{{
          parsedSegmentTime.destinationSegmentTime
        }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Segment } from "@/models/common.interface";
import { computed } from "vue";

interface Props {
  segments: Segment[];
  carrier: string;
  carrierName: string;
}
const props = defineProps<Props>();
const { originSegment, destinationSegment } = computed((): any => {
  const [a, b] = props.segments;
  return { originSegment: a, destinationSegment: b };
}).value;
const parsedSegmentTime = computed(() => {
  const originSegmentTimeArr = originSegment.dep_time.split(" ");
  const destinationSegmentTimeArr =
    destinationSegment?.dep_time.split(" ") ??
    originSegment.arr_time.split(" ");
  return {
    originSegmentDate: originSegmentTimeArr.slice(0, -1).join(" "),
    originSegmentTime: originSegmentTimeArr.at(-1),
    destinationSegmentDate: destinationSegmentTimeArr.slice(0, -1).join(" "),
    destinationSegmentTime: destinationSegmentTimeArr?.at(-1),
  };
});
const airDurations = computed(() => {
  if (!destinationSegment) {
    return segmentDuration.value;
  }
  const originDate = new Date(originSegment.dep_time_iso.split("+")[0]);
  const destinationDate = new Date(
    destinationSegment.dep_time_iso.split("+")[0]
  );
  const elapsedMinutes = Math.floor(
    Math.abs(originDate.getTime() - destinationDate.getTime()) / 60000
  );
  return elapsedMinutes >= 60
    ? `${Math.floor(elapsedMinutes / 60)}ч ${Math.floor(
        Math.abs(Math.floor(elapsedMinutes / 60) * 60 - elapsedMinutes)
      )}м`
    : `0ч ${elapsedMinutes}`;
});
const segmentDuration = computed(() => {
  const originDate = new Date(originSegment.dep_time_iso.split("+")[0]);
  const destinationDate = new Date(originSegment.arr_time_iso.split("+")[0]);

  const elapsedMinutes = Math.floor(
    Math.abs(originDate.getTime() - destinationDate.getTime()) / 60000
  );
  return elapsedMinutes >= 60
    ? `${Math.floor(elapsedMinutes / 60)}ч ${Math.abs(
        Math.floor(elapsedMinutes / 60) * 60 - elapsedMinutes
      )}м`
    : `0ч ${elapsedMinutes}`;
});
</script>
<script lang="ts">
import AirlineIcon from "../../shared/ui/AirlineIcon/index.vue";

export default {
  name: "Timeline",
  components: { AirlineIcon },
};
</script>
