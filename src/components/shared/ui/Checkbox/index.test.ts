import { beforeEach, describe, expect, test } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import AppCheckbox from "./index.vue";

let wrapper: VueWrapper;
beforeEach(() => {
  wrapper = mount(AppCheckbox, {
    props: {
      item: {
        id: 1,
        title: "Только прямые",
        value: false,
      },
    },
  });
});
describe("Checkbox", () => {
  test("check is mount", () => {
    expect(wrapper).toBeDefined();
  });
  test("check v model ", async () => {
    const label = wrapper.find("#label-1");
    await label.trigger("click");
    await wrapper.setProps({
      item: {
        id: 1,
        title: "Только прямые",
        value: true,
      },
    });
    expect(wrapper.props().item.value).toEqual(true);
  });
});
