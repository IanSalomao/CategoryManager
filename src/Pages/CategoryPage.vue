<template>
  <NavBar />
  <div class="container mt-5 mb-5 col-md-8" style="max-width: 800px">
    <h2>{{ this.$route.params.name }}</h2>
    <p>{{ this.$route.params.description }}</p>
    <button class="btn btn-primary btn-sm p-2 m-2" @click="editCategory(this.$route.params.name, this.$route.params.description)">Editar</button>
    <button class="btn btn-danger btn-sm p-2 m-2" @click="deleteCategory(this.$route.params.id)">Apagar</button>
    <hr />

    <button class="btn btn-success mt-4" @click="openModal">Adicionar Subcategoria</button>
    <!-- Exibe a lista de subcategorias -->
    <div v-if="subCategories.length">
      <div v-for="subCategory in subCategories" :key="subCategory.id" class="card my-3" style="border: none; background-color: #002b3e">
        <div class="card-body" style="color: #fff; border-radius: 15px">
          <h5 class="card-title">{{ subCategory.name }}</h5>
          <p class="card-text">{{ subCategory.description }}</p>
          <button class="btn btn-primary btn-sm p-2 m-2" @click="editSubCategory(subCategory)">Editar</button>
          <button class="btn btn-danger btn-sm p-2 m-2" @click="deleteSubCategory(subCategory.id_subcategory)">Apagar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Categoria -->
    <ModalSubCategory ref="CategoryModal" :subCategory="currentCategory" :isEditing="true" modalId="categoryModal" @save="saveCategory" />

    <!-- Modal de Subcategoria -->
    <ModalSubCategory
      ref="subCategoryModal"
      :subCategory="currentSubCategory"
      :isEditing="isEditing"
      modalId="subCategoryModal"
      @save="saveSubCategory"
    />
  </div>
</template>

<script>
import axios from "axios";
import ModalSubCategory from "@/components/ModalSubCategory.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    ModalSubCategory,
    NavBar,
  },
  data() {
    return {
      category: { id: "", name: "", description: "" }, // Dados da categoria
      subCategories: [], // Lista de subcategorias
      currentSubCategory: { name: "", description: "" }, // Subcategoria atual para edição/criação
      currentCategory: { name: "", description: "" }, // Subcategoria atual para edição/criação
      isEditing: false, // Flag para determinar se está editando ou criando
      BASE_URL: "https://api.categorymanage.salomao.dev.br/api/", // URL base da API
    };
  },
  methods: {
    // Carrega as subcategorias da categoria específica
    async getCategorie() {
      console.log(this.category);
      return this.category;
    },
    async loadCategorie(name, description) {
      this.category = {
        id: this.$route.params.id,
        name: name,
        description: description,
      };
      console.log(this.category);
    },
    // Carrega as subcategorias da categoria específica
    async loadSubCategories() {
      try {
        const response = await axios.get(`${this.BASE_URL}categorys/${this.$route.params.id}/subcategorys`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.subCategories = response.data;
      } catch (error) {
        console.error("Erro ao carregar subcategorias:", error);
      }
    },

    // Abre o modal para adicionar uma nova subcategoria
    openModal() {
      this.currentSubCategory = { name: "", description: "" }; // Limpa o formulário
      this.isEditing = false; // Define como criação
      this.$refs.subCategoryModal.showModal(); // Abre o modal
    },

    // Edita uma subcategoria existente
    editSubCategory(subCategory) {
      this.currentSubCategory = { ...subCategory }; // Carrega a subcategoria no formulário
      this.isEditing = true; // Define como edição
      this.$refs.subCategoryModal.showModal(); // Abre o modal
    },

    // Salva (cria ou edita) a subcategoria
    async saveSubCategory(subCategory) {
      if (this.isEditing) {
        // Edita a subcategoria
        try {
          await axios.put(`${this.BASE_URL}subcategorys/${subCategory.id_subcategory}`, subCategory, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          this.loadSubCategories(); // Recarrega a lista
          this.$refs.subCategoryModal.hideModal(); // Fecha o modal
        } catch (error) {
          console.error("Erro ao editar subcategoria:", error);
        }
      } else {
        // Cria uma nova subcategoria
        try {
          await axios.post(`${this.BASE_URL}categorys/${this.$route.params.id}/subcategorys`, subCategory, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          this.loadSubCategories(); // Recarrega a lista
          this.$refs.subCategoryModal.hideModal(); // Fecha o modal
        } catch (error) {
          console.error("Erro ao adicionar subcategoria:", error);
        }
      }
    },

    // Deleta uma subcategoria
    async deleteSubCategory(id) {
      if (confirm("Tem certeza que deseja apagar esta subcategoria?")) {
        try {
          await axios.delete(`${this.BASE_URL}subcategorys/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          this.loadSubCategories(); // Recarrega a lista
        } catch (error) {
          console.error("Erro ao apagar subcategoria:", error);
        }
      }
    },
    async saveCategory(Category) {
      // Edita a categoria
      try {
        await axios.put(`${this.BASE_URL}categorys/${this.$route.params.id}`, Category, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.$route.params.name = Category.name;
        this.$route.params.description = Category.description;
        this.loadCategorie(Category.name, Category.description);
        this.loadSubCategories();
        this.$refs.CategoryModal.hideModal(); // Fecha o modal
      } catch (error) {
        console.error("Erro ao editar categoria:", error);
      }
    },
    editCategory(name, description) {
      this.currentCategory = { name: name, description: description }; // Carrega a subcategoria no formulário
      this.isEditing = true; // Define como edição
      this.$refs.CategoryModal.showModal(); // Abre o modal
    },
    // Deleta uma subcategoria
    async deleteCategory(id) {
      if (confirm("Tem certeza que deseja apagar esta Categoria?")) {
        try {
          await axios.delete(`${this.BASE_URL}categorys/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          this.$router.push({ name: "Dashboard" });
        } catch (error) {
          console.error("Erro ao apagar categoria:", error);
        }
      }
    },
  },
  mounted() {
    // Carrega os dados da categoria e as subcategorias ao montar o componente
    this.loadCategorie(this.$route.params.name, this.$route.params.description);
    this.loadSubCategories();
  },
};
</script>
