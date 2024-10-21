import { createMemoryHistory, createRouter } from "vue-router";
import LoginPage from "./Pages/LoginPage.vue";
import DashBoardPage from "./Pages/DashBoardPage.vue";
import CategoryPage from "./Pages/CategoryPage.vue";
import RegisterPage from "./Pages/RegisterPage.vue";
// import axios from "axios";

async function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  // try {
  //   const response = await axios.get("http://127.0.0.1:8001/api/validate-token", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.status === 200) {
  //     return true;
  //   } else {
  //     localStorage.removeItem("token");
  //     return false;
  //   }
  // } catch (error) {
  //   console.error("Erro ao validar o token:", error);
  //   localStorage.removeItem("token");
  //   return false;
  // }

  return true;
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/category/:id/:name/:description",
    component: CategoryPage,
    name: "CategoryPage",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

// Guardião de navegação para verificar autenticação antes de cada rota
router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await isAuthenticated(); // Aguarda a verificação da autenticação

  // Se a rota exige autenticação e o usuário não está logado, redireciona para o login
  if (to.matched.some((route) => route.meta.requiresAuth) && !isLoggedIn) {
    next({ name: "Login" });
  }
  // Se o usuário já está logado e tenta acessar a página de login, redireciona para o dashboard
  else if (to.name === "Login" && isLoggedIn) {
    next({ name: "Dashboard" });
  }
  // Caso contrário, permite o acesso à rota
  else {
    next();
  }
});

export default router;
