<template>
  <div id="app">
    <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
      <div class="logo">
        <h1>
          <span class="mikro" v-if="!isCollapsed">Mikro</span>
          <span class="movilab" v-if="!isCollapsed">MoviLab</span>
          <span v-if="isCollapsed" class="logo-collapsed">
            <span class="mikro-collapsed">M</span>
            <span class="movilab-collapsed">M</span>
          </span>
        </h1>
      </div>
      <button @click="toggleSidebar" class="toggle-btn">
        <i :class="['fas', isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left']"></i>
      </button>
      <nav>
        <ul>
          <li>
            <router-link to="/dashboard" class="active">
              <i class="fa-sharp-duotone fa-solid fa-house"></i>
              <span v-if="!isCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/User" class="active">
              <i class="fa-sharp-duotone fa-solid fa-address-card"></i>
              <span v-if="!isCollapsed">Usuario</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/EstacionBici">
              <i class="fa-sharp-duotone fa-solid fa-warehouse"></i>
              <span v-if="!isCollapsed">Estaciones</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/BicicletaPublica">
              <i class="fa-sharp-duotone fa-solid fa-bicycle"></i>
              <span v-if="!isCollapsed">Bicicletas</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/Mantenimiento">
              <i class="fa-sharp-duotone fa-solid fa-wrench"></i>
              <span v-if="!isCollapsed">Mantenimiento</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/ViajesBici">
              <i class="fa-sharp-duotone fa-solid fa-route"></i>
              <span v-if="!isCollapsed">Beacons</span>
            </router-link>
          </li>
          <li>
            <router-link to="/view/AlquilerBici">
              <i class="fa-sharp-duotone fa-solid fa-file-signature"></i>
              <span v-if="!isCollapsed">Alquiler</span>
            </router-link>
          </li>
          <!-- <li class="submenu">
            <router-link to="/dashboard">
              <i class="fa-sharp-duotone fa-solid fa-rotate-right"></i>
              <span v-if="!isCollapsed">Historial</span>
            </router-link>
            <ul v-if="!isCollapsed">
              <li><router-link to="/view/user"><i class="fa-sharp-duotone fa-solid fa-address-card"></i>Usuarios</router-link></li>
              <li><router-link to="/view/EstacionBici"><i class="fa-sharp-duotone fa-solid fa-warehouse"></i>Estaciones</router-link></li>
              <li><router-link to="/view/BicicletaPublica"><i class="fa-sharp-duotone fa-solid fa-bicycle"></i>Bicicletas</router-link></li>
              <li><router-link to="/view/ViajesBici"><i class="fa-sharp-duotone fa-solid fa-route"></i>Beacons</router-link></li>
              <li><router-link to="/view/Mantenimiento"><i class="fa-sharp-duotone fa-solid fa-wrench"></i>Mantenimientos</router-link></li>
              <li><router-link to="/view/AlquilerBici"><i class="fa-sharp-duotone fa-solid fa-file-signature"></i>Alquiler</router-link></li>
            </ul>
          </li> -->
        </ul>
      </nav>
    </aside>
    <router-view />
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  min-height: 100vh;
  background-color: #e9e9e9;
}

.sidebar {
  flex: 0 0 215px;
  background-color: #124354;
  padding-top: 25px;
  transition: width 0.3s ease, left 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  flex: 0 0 60px;
}

.logo {
  text-align: center;
  padding-bottom: 20px;
}

.logo h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.5em;
}

.logo .mikro {
  font-weight: bold;
  color: rgb(255, 255, 255); 
  font-size: 1em;
  display: block;
  line-height: 0.8em;
}

.logo .movilab {
  color: rgb(182, 234, 183); 
  font-size: 1em;
  display: block;
  margin-left:60px; 
  margin-top: 5px; 
}

.logo .mikro-collapsed {
  font-weight: bold;
  color: rgb(248, 248, 248); 
  font-size: 1.2em;
  display: block;
  line-height: 0.8em;
}

.logo .movilab-collapsed {
  color: rgb(137, 226, 144); /* Gris */
  font-size: 1.2em;
  display: block;
}

.sidebar-collapsed .logo .mikro,
.sidebar-collapsed .logo .movilab {
  display: none;
}

.sidebar-collapsed .logo .logo-collapsed {
  display: inline-block;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  padding: 10px;
  padding-left: 20px;
  transition: transform 0.3s ease;
}

nav ul li a {
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 16px;
}

nav ul li a i {
  margin-right: 10px;
}

nav ul li:hover {
  transform: translateX(10px);
}

nav ul li a:hover {
  background-color: #e9ecef2e;
  border-radius: 4px;
}

.submenu ul {
  display: none;
  padding-left: 20px;
}

.submenu:hover ul {
  display: block;
}

.submenu ul li {
  position: relative;
  padding-left: 20px;
  margin-top: 5px;
}

.submenu ul li::before {
  content: '-';
  position: absolute;
  left: 0;
  color: #000000;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 20px;
}

/* Estilos responsivos */
@media (max-width: 1024px) {
  .sidebar {
    flex: 0 0 180px;
  }

  .logo h1 {
    font-size: 1.8em;
  }

  .logo .mikro, .logo .movilab,
  .logo .mikro-collapsed, .logo .movilab-collapsed {
    font-size: 0.9em;
  }

  nav ul li {
    padding-left: 15px;
  }

  nav ul li a {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    flex: 0 0 140px;
  }

  .logo h1 {
    font-size: 1.5em;
  }

  .logo .mikro, .logo .movilab,
  .logo .mikro-collapsed, .logo .movilab-collapsed {
    font-size: 0.8em;
  }

  nav ul li {
    padding-left: 10px;
  }

  nav ul li a {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    position: fixed;
    left: -215px;
    width: 215px;
    height: 100%;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .sidebar.sidebar-collapsed {
    left: 0;
  }

  .toggle-btn {
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 1001;
  }

  nav ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  nav ul li {
    width: 100%;
  }

  nav ul li a {
    width: 100%;
    justify-content: flex-start;
  }

  .sidebar-collapsed nav ul li a span {
    display: none;
  }

  .logo h1 {
    font-size: 1.2em;
  }

  .logo .mikro, .logo .movilab,
  .logo .mikro-collapsed, .logo .movilab-collapsed {
    font-size: 1em;
  }
}
</style>

