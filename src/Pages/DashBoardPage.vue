<template>
  <div>
    <NavBar />
    <div class="container mt-5">
      <div class="row mb-4">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Pesquisar categoria" v-model="searchTerm" @input="searchCategory" />
        </div>
        <div class="col-md-6 text-end">
          <button class="btn btn-success mt-2 px-4 py-2" @click="showAddCategoryModal">Adicionar Categoria</button>
        </div>
      </div>

      <div class="row">
        <div class="col-12" v-for="category in filteredCategories" :key="category.id_category">
          <CardCategory
            :category="category"
            @click="
              $router.push({ name: 'CategoryPage', params: { id: category.id_category, name: category.name, description: category.description } })
            "
          />
        </div>
      </div>
    </div>

    <!-- Modal para Adicionar/Editar Categoria -->
    <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel" style="color: black">{{ isEditing ? "Editar" : "Adicionar" }} Categoria</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="categoryName" class="form-label" style="color: black">Nome da Categoria</label>
              <input type="text" class="form-control" id="categoryName" required v-model="currentCategory.name" style="color: black" />
            </div>
            <div class="mb-3">
              <label for="categoryDescription" class="form-label" style="color: black">Descrição</label>
              <textarea class="form-control" id="categoryDescription" v-model="currentCategory.description" style="color: black"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveCategory">{{ isEditing ? "Salvar" : "Adicionar" }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import CardCategory from "@/components/CardCategory.vue";
import { Modal } from "bootstrap";

var token = localStorage.getItem("token");
const API_URL = "https://api.categorymanage.salomao.dev.br/api/";

export default {
  components: { NavBar, CardCategory },
  data() {
    return {
      categories: [],
      searchTerm: "",
      currentCategory: { name: "", description: "" },
      isEditing: false,
    };
  },
  computed: {
    filteredCategories() {
      console.log(this);
      if (!this.searchTerm) return this.categories;
      return this.categories.filter((category) => category.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
  },
  methods: {
    /*
      Função para buscar todas as categorias de um usuário.
    */
    fetchCategories() {
      axios
        .get(API_URL + "categorys_sub", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("Erro ao buscar categorias:", error);
        });
    },
    saveCategory() {
      const categoryData = {
        name: this.currentCategory.name,
        description: this.currentCategory.description,
      };

      axios
        .post(API_URL + "categorys", categoryData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.fetchCategories();
        })
        .catch((error) => {
          console.log(localStorage.getItem("token"));
          console.error("Erro ao adicionar categoria:", error);
        });

      const modalElement = document.getElementById("categoryModal");
      const modalInstance = Modal.getInstance(modalElement);
      modalInstance.hide();
    },
    deleteCategory(id) {
      console.log(id);
      axios
        .delete(API_URL + "categorys/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => this.fetchCategories());
    },
    searchCategory() {
      // Implementação adicional para pesquisa se necessário
    },
    showAddCategoryModal() {
      this.isEditing = false;
      this.currentCategory = { name: "", description: "" };
      const modalElement = document.getElementById("categoryModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
    showEditCategoryModal(category) {
      this.isEditing = true;
      this.currentCategory = { ...category };
      const modalElement = document.getElementById("categoryModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
</style>
