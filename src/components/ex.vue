<template>
  
  <div class="container">
      <div class="image-section">
          <img src="@/img/fondo.jpg" alt="Logo Bicicleta">
      </div>
      <div class="login-section">
          <div class="logo">
              <h1>Mikro<span class="blind">Movilab</span></h1>
              <p>Movilidad sustentable para Quito</p>
          </div>
          <form @submit.prevent="login">
            <div class="input">
              <label for="correoUsuario"><span class="required"></span></label>
              <input
                id="correoUsuario"
                type="email"
                placeholder="Correo"
                required
                v-model="form.correoUsuario"
              />
      </div>
      <div class="input">
        <label for="contrasenaUsuario"><span class="required"></span></label>
        <input
          id="contrasenaUsuario"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Contraseña"
          required
          v-model="form.contrasenaUsuario"
        />
        <button type="button" @click="togglePassword" class="password-toggle">
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </button>
      </div>
      <button type="submit">Iniciar Sesión</button>
      <div class="register-link">
        <p>¿Eres nuevo usuario?</p>
        <router-link to="/register"> <i></i> Regístrate </router-link>
      </div>
    </form>
  </div>
</div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        correoUsuario: "",
        contrasenaUsuario: "",
      },
      passwordVisible: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:4200/usuario/login",
          this.form
        );
        // Suponemos que el estado 200 indica éxito
        Swal.fire("Éxito", "Inicio de sesión exitoso", "success");

        // Guardar el nombre del usuario y el token en localStorage
        const { usuario, token } = response.data;
        localStorage.setItem("user", JSON.stringify(usuario));
        localStorage.setItem("token", token);

        // Redirigir a /dashboard
        this.$router.push("/dashboard");
      } catch (error) {
        // Manejo de errores
        Swal.fire("Error", "Credenciales incorrectas", "error");
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
/* Estilos CSS específicos para este componente */


body {
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
    
}

.container {
    display: flex;
    width: 100%;
    height: 100vh;
}

.image-section {
    flex: 3;
    display: flex;
    justify-content: center;
}

.image-section img {
    max-width: 130%;
    max-height: 100%;
}

.login-section {
    flex: 1.2;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: -20%;
}

.logo {

    margin-right: -20%;
    margin-left: 40%;
}

.logo h1 {
    font-size:4em;

}
.logo blind {
  font-size:4em;
  color:#d6d6d6;
}


form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin-right: -20%;
    margin-left: 50% ;
}

input {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 9px;
    background-color: #dadada;
    width:100%,
}

.password-toggle {
  position: absolute;
  top: 59%;
  right: 161px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
}

.register-link {
    margin-top: 20px;
    text-align: center;
}

.register-link a {
    color: #007bff;
    text-decoration: none;
}

.register-link a:hover {
    text-decoration: underline;
}
/* Estilos CSS del boton */
button {
    margin-top: 10px;
    padding: 10px;
    background-color: #57ca6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

</style>
