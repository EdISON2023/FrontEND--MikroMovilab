<template>
  <div class="container">
    <div class="image-section">
      <img src="@/img/image.avif" alt="Logo Bicicleta">
    </div>
    <div class="login-section">
      <div class="logo">
        <h1>MIKRO</h1><span class="text">MOVILAB</span>
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
          <span type="button" @click="togglePassword" class="password-toggle">
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <div class="register-link">
          <p>¿Eres nuevo usuario?  <router-link to="/register"> <i></i> Regístrate </router-link></p>
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
  width: 90%;
  height: 100vh;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-section img {
  max-width: 130%;
  max-height: 100%;
}

.login-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: -20%;
}

.logo {
  text-align: center;
  margin-right: -20%;
}

.logo h1 {
  display: inline;
  font-size: 3.5em;
  color: #13d19b;

}

.logo .text {
  display: inline;
  font-size: 3.5em;
  color: gray;


}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-right: -20%;
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #13d19b;
  border-radius: 9px;
  background-color: #ffff;
  width: 300px;
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

button {
  margin-top: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 55px;
  cursor: pointer;
}
</style>
