<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="subCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="subCategoryModalLabel" style="color: black">{{ isEditing ? "Editar" : "Adicionar" }} Subcategoria</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="subCategoryName" class="form-label" style="color: black">Nome da Subcategoria</label>
            <input type="text" class="form-control" id="subCategoryName" v-model="localSubCategory.name" style="color: black" />
          </div>
          <div class="mb-3">
            <label for="subCategoryDescription" class="form-label" style="color: black">Descrição</label>
            <textarea class="form-control" id="subCategoryDescription" v-model="localSubCategory.description" style="color: black"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="onSave">
            {{ isEditing ? "Salvar" : "Adicionar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  props: {
    subCategory: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localSubCategory: { ...this.subCategory }, // Cria uma cópia local da prop
    };
  },
  watch: {
    subCategory: {
      immediate: true,
      handler(newValue) {
        this.localSubCategory = { ...newValue }; // Atualiza a cópia local quando a prop mudar
      },
    },
  },
  methods: {
    onSave() {
      this.$emit("save", this.localSubCategory); // Emite o evento com a cópia local
    },
    showModal() {
      const modalElement = document.getElementById(this.modalId);
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
    hideModal() {
      const modalElement = document.getElementById(this.modalId);
      const modalInstance = Modal.getInstance(modalElement);
      modalInstance.hide();
    },
  },
};
</script>
