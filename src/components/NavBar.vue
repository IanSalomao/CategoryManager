<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #002b3e">
    <div class="container-fluid" style="max-width: 800px">
      <a class="navbar-brand">
        <img
          src="@/assets/logo.png"
          alt="Logo do Projeto"
          class="img-fluid"
          style="max-height: 40px; cursor: pointer"
          @click="$router.push({ name: 'Dashboard' })"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" style="cursor: pointer" @click="$router.push({ name: 'Dashboard' })">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      // Lógica de logout, remover o token e redirecionar para login
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
