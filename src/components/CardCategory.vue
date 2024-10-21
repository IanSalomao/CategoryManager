<template>
  <div class="category card mb-3" style="background-color: #002b3e; cursor: pointer; color: #fff; border: none">
    <div class="card-body">
      <!-- Parte superior do Card: Nome e Descrição -->
      <h5 class="card-title">{{ category.name }}</h5>
      <p>{{ category.description }}</p>

      <!-- Parte inferior do Card: Blocos com Subcategorias -->
      <div v-if="category.subcat.length != 0" class="mt-3">
        <div class="d-flex flex-wrap">
          <span
            v-for="sub in category.subcat"
            :key="sub.id"
            class="badge m-1 p-3"
            style="border: solid #daa515 2px; color: #daa515; border-radius: 10px"
          >
            {{ sub.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
    },
  },
};
</script>
<style>
.category:hover {
  transition: all 300ms;
  background-color: #044b69 !important;
}
</style>
