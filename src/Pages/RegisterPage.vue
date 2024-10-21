<template>
  <body style="background-color: #031c27">
    <div class="container vh-100 d-flex justify-content-center align-items-center">
      <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px; background-color: #002b3e">
        <!-- Logo -->
        <div class="text-center mb-5">
          <img src="@/assets/logo.png" alt="Logo do Projeto" class="img-fluid" style="max-height: 70px" />
        </div>
        <!-- Formulário de Cadastro -->
        <form @submit.prevent="handleRegister">
          <!-- Nome -->
          <div class="mb-3">
            <label for="name" class="form-label text-white">Nome</label>
            <input v-model="name" type="text" class="form-control" id="name" placeholder="Digite seu nome" required />
          </div>
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label text-white">Email</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Digite seu email" required />
          </div>
          <!-- Senha -->
          <div class="mb-5">
            <label for="password" class="form-label text-white">Senha</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Digite sua senha" required />
          </div>
          <div v-if="error" class="text-danger mb-3 text-center">
            {{ error }}
          </div>
          <!-- Botão de Cadastro -->
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-light text-warning fw-medium" :disabled="loading" style="color: #031c27">
              <span v-if="loading" style="color: #031c27">Cadastrando...</span>
              <span v-else style="color: #031c27">Cadastre-se</span>
            </button>
          </div>
          <!-- Frase para Login -->
          <div class="text-center">
            <p class="text-white">
              Já possui uma conta?
              <a @click="$router.push({ name: 'Login' })" class="text-warning" style="color: #daa515; cursor: pointer">Faça seu Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
const API_URL = "https://api.categorymanage.salomao.dev.br/api/";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null,
      loading: false, // Variável para controlar o estado de cadastro
    };
  },
  methods: {
    /*
      Função faz uma requisição register para o servidor com as credenciais fornecidas
      e, em caso de sucesso, redireciona para a página de login.

      @params {none}
      @return {void}
    */
    async handleRegister() {
      this.error = null;
      this.loading = true; // Desabilitar o botão de login
      try {
        await axios.post(API_URL + "register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Redirecionar para a página de login
        this.$router.push("/");
      } catch (error) {
        this.error = "Esse email já está sendo utilizado."; // Exibir mensagem de erro
        console.error(error);
      } finally {
        this.loading = false; // Habilitar o botão de login novamente
      }
    },
  },
};
</script>
