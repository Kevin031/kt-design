import { defineComponent } from "vue";

const Name = "kt-button";

export default defineComponent({
  name: Name,
  props: {
    msg: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    return () => <div class={Name}>button</div>;
  },
});
