<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ subCategory.name }}</h5>
      <p class="card-text">{{ subCategory.description }}</p>
      <button class="btn btn-primary" @click="$emit('edit', subCategory.id)">Editar</button>
      <button class="btn btn-danger" @click="$emit('delete', subCategory.id)">Deletar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSubCategory",
  props: {
    subCategory: Object,
  },
};
</script>
