<template>
  <body style="background-color: #031c27">
    <div class="container vh-100 d-flex justify-content-center align-items-center">
      <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px; background-color: #002b3e">
        <!-- Logo -->
        <div class="text-center mb-5">
          <img src="@/assets/logo.png" alt="Logo do Projeto" class="img-fluid" style="max-height: 70px" />
        </div>
        <!-- Formulário de Login -->
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label text-white">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" placeholder="Digite seu email" required />
          </div>
          <!-- Senha -->
          <div class="mb-5">
            <label for="password" class="form-label text-white">Senha</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Digite sua senha" required />
          </div>
          <!-- Feedback de erro -->
          <div v-if="error" class="text-danger mb-3 text-center">
            {{ error }}
          </div>
          <!-- Botão de Login -->
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-light text-warning fw-medium" :disabled="loading" style="color: #031c27">
              <span v-if="loading" style="color: #031c27">Entrando...</span>
              <span v-else style="color: #031c27">Login</span>
            </button>
          </div>
          <!-- Frase para Cadastro -->
          <div class="text-center">
            <p class="text-white">
              Não possui uma conta?
              <a @click="$router.push({ name: 'Register' })" class="text-warning" style="color: #daa515; cursor: pointer">Cadastre-se</a>
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
      email: "",
      password: "",
      error: null,
      loading: false, // Variável para controlar o estado de loading
    };
  },
  methods: {
    /*
      Função faz uma requisição de login para o servidor com as credenciais fornecidas
      e, em caso de sucesso, redireciona para a página de dashboard.

      @params {none}
      @return {void}
    */
    async handleLogin() {
      this.error = null;
      this.loading = true; // Desabilitar o botão de login
      try {
        const response = await axios.post(API_URL + "login", {
          email: this.email,
          password: this.password,
        });

        // Salvando o token no localStorage
        localStorage.setItem("token", response.data.access_token);

        // Redirecionar para a página de dashboard
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = "Login falhou. Verifique suas credenciais."; // Exibir mensagem de erro
        console.error(error);
      } finally {
        this.loading = false; // Habilitar o botão de login novamente
      }
    },
  },
};
</script>
