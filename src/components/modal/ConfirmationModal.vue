<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  city: String
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmDelete = () => {
  emit('confirm', props.city)
}

const cancelDelete = () => {
  emit('cancel')
}
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <p>Ви впевнені, що хочете видалити місто з обраного?</p>
      <button class="yes" @click="confirmDelete">Так</button>
      <button class="no" @click="cancelDelete">Ні</button>
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
  margin: 10px;
  border-radius: 5%;
  color: white;
  border: none;
  cursor: pointer;
  width: 44%;

}

.yes{
  background-color: #4caf50;
}

.yes:hover {
  background-color: #45a049;
}

.yes:active {
  background-color: #2f6b32;
}


.no{
  background-color: #af4c4c;
}

.no:hover {
  background-color: #a04545;
}

.no:active {
  background-color: #471f1f;
}

</style>
