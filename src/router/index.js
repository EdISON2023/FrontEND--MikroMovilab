import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import MantenimientoNew from "@/views/mantenimiento/MantenimientoNew.vue";
import MantenimientoEdit from "@/views/mantenimiento/MantenimientoEdit.vue";
import MantenimientoView from "@/views/mantenimiento/MantenimientoView.vue";


import ViajesBiciEdit from "@/views/viajesBici/ViajesBiciEdit.vue";
import ViajesBiciView from "@/views/viajesBici/ViajesBiciView.vue";
import ViajesBiciNew from "@/views/viajesBici/ViajesBiciNew.vue";


import AlquilerBiciEdit from "@/views/alquilerBici/alquilerBiciEdit.vue";
import AlquilerBiciNew from "@/views/alquilerBici/alquilerBiciNew.vue";
import AlquilerBiciView from "@/views/alquilerBici/alquilerBiciView.vue";


import BicicletaPublicaNew from "@/views/BicicletaPublica/BicicletaPublicaNew.vue";
import BicicletaPublicaEdit from "@/views/BicicletaPublica/BicicletaPublicaEdit.vue";
import BicicletaPublicaView from "@/views/BicicletaPublica/BicicletaPublicaView.vue";


import EstacionBiciNew from "@/views/estacionBici/EstacionBiciNew.vue";
import EstacionBiciEdit from "@/views/estacionBici/EstacionBiciEdit.vue";
import EstacionBiciView from "@/views/estacionBici/EstacionBiciView.vue";


import UserNew from "@/views/user/UserNew";
import UserEdit from "@/views/user/UserEdit";
import UserView from "@/views/user/UserView";


import Dashboard from "@/views/dashboard/Dashboard.vue";


import Register from "@/views/register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  
  {
    path: "/create/Mantenimiento",
    name: "createMantenimiento",
    component: MantenimientoNew,
  },
  {
    path: "/edit/Mantenimiento/:id",
    name: "editMantenimiento",
    component: MantenimientoEdit,
  },
  {
    path: "/view/Mantenimiento",
    name: "viewMantenimiento",
    component: MantenimientoView,
  },

  
  {
    path: "/create/ViajesBici",
    name: "createViajesBici",
    component: ViajesBiciNew,
  },
  {
    path: "/editMensaje/Personalizado/:id",
    name: "editViajesBici",
    component: ViajesBiciEdit,
  },
  {
    path: "/view/ViajesBici",
    name: "viewViajesBici",
    component: ViajesBiciView,
  },

  
  {
    path: "/create/AlquilerBici",
    name: "createAlquilerBici",
    component: AlquilerBiciNew,
  },
  {
    path: "/editGuia/Voz/:id",
    name: "editAlquilerBici",
    component: AlquilerBiciEdit,
  },
  {
    path: "/view/AlquilerBici",
    name: "viewAlquilerBici",
    component: AlquilerBiciView,
  },

  
  {
    path: "/create/BicicletaPublica",
    name: "createBicicletaPublica",
    component: BicicletaPublicaNew,
  },
  {
    path: "/edit/BicicletaPublica/:id",
    name: "editBicicletaPublica",
    component: BicicletaPublicaEdit,
  },
  {
    path: "/view/BicicletaPublica",
    name: "viewBicicletaPublica",
    component: BicicletaPublicaView,
  },

 
  {
    path: "/create/EstacionBici",
    name: "createEstacionBici",
    component: EstacionBiciNew,
  },
  {
    path: "/edit/EstacionBici/:id",
    name: "editEstacionBici",
    component: EstacionBiciEdit,
  },
  {
    path: "/view/EstacionBici",
    name: "viewEstacionBici",
    component: EstacionBiciView,
  },
 
  {
    path: "/create/User",
    name: "createUser",
    component: UserNew,
  },
  {
    path: "/edit/User/:id",
    name: "editUser",
    component: UserEdit,
  },
  {
    path: "/view/User",
    name: "viewUser",
    component: UserView,
  },
  
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  
  {
    path: "/register",
    name: "register",
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
