<template>
  <div class="container">
    <div class="image-section">
      <img src="@/img/fondo.jpg" alt="Logo Bicicleta">
    </div>
    <div class="login-section">
      <div class="logo">
        <h1>MIKRO<span class="text">MOVILAB</span></h1>
        <p>Movilidad sustentable para Quito</p>
      </div>
      <form @submit.prevent="register">
        <div class="name-group">
          <div class="input">
            <label for="nombreUsuario">Nombre <span class="required">*</span></label>
            <input id="nombreUsuario" type="text" placeholder="Nombre" required v-model="form.nombreUsuario">
          </div>
          <div class="input">
            <label for="apellidoUsuario">Apellidos <span class="required">*</span></label>
            <input id="apellidoUsuario" type="text" placeholder="Apellidos" required v-model="form.apellidoUsuario">
          </div>
        </div>
        <div class="input">
          <label for="correoUsuario">Correo <span class="required">*</span></label>
          <input id="correoUsuario" type="email" placeholder="Correo" required v-model="form.correoUsuario">
        </div>
        <div class="input password-input">
          <label for="contrasenaUsuario">Contraseña <span class="required">*</span></label>
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
        <div class="input">
          <label for="telefonoUsuario">Teléfono <span class="required">*</span></label>
          <input id="telefonoUsuario" type="number" placeholder="Teléfono" required v-model="form.telefonoUsuario">
        </div>
        <div class="input">
          <label for="fechaNacimientoUsuario">Fecha de Nacimiento <span class="required">*</span></label>
          <input id="fechaNacimientoUsuario" type="date" placeholder="Fecha de Nacimiento" required v-model="form.fechaNacimientoUsuario">
        </div>
        <button type="submit" class="custom-btn">Registrarse</button>
        <router-link to="/" class="register-link">
          <i></i> <span class="register-button">Iniciar Sesión</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        nombreUsuario: '',
        apellidoUsuario: '',
        correoUsuario: '',
        contrasenaUsuario: '',
        telefonoUsuario: '',
        fechaNacimientoUsuario: ''
      },
      passwordVisible: false
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:4200/usuario/crear', this.form);
        if (response.status === 200) {
          Swal.fire('Éxito', 'Usuario creado con éxito', 'success');
          this.$router.push('/');
        } else {
          Swal.fire('Error', 'Error al registrar el usuario', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al registrar el usuario', 'error');
      }
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
};
</script>


<style scoped src="@/assets/styles/register.css"></style>