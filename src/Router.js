import { createMemoryHistory, createRouter } from "vue-router";
import LoginPage from "./Pages/LoginPage.vue";
import DashBoardPage from "./Pages/DashBoardPage.vue";
import CategoryPage from "./Pages/CategoryPage.vue";
import RegisterPage from "./Pages/RegisterPage.vue";

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
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
router.beforeEach((to, from, next) => {
  const isLoggedIn = isAuthenticated();

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
