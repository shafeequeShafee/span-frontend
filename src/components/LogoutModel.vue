<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>{{ titles }}</h3>
      <p>{{ messages }}</p>
      <div class="modal-actions">
        <button @click="confirm">Yes</button>
        <button @click="close">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    title: String,
    message: String,
  },
  emits: ["close", "confirm"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    const confirm = async () => {
      emit("confirm");
    };

    const messages = ref(props.message);
    const titles = ref(props.title);
    return {
      confirm,
      close,
      messages,
      titles,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
