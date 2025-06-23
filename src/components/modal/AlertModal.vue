<script setup>
const props = defineProps({
  isVisible: Boolean,
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="props.isVisible" class="modal-overlay">
    <div class="modal">
      <p>Ви можете вибрати не більше 5 міст.</p>
      <button @click="closeModal">Закрити</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #af4c4c;
  border-radius: 5%;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #a04545;
}

button:active {
  background-color: #471f1f;
}
</style>
