<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nueva Bicicleta</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombrePunto" class="form-label">Número de Serie<span class="required">*</span>:</label>
          <input type="text" id="nombrePunto" v-model="form.nombrePunto" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcionPunto" class="form-label">Modelo <span class="required">*</span>:</label>
          <textarea id="descripcionPunto" v-model="form.descripcionPunto" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacionPunto" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="ubicacionPunto" v-model="form.ubicacionPunto" class="form-control" required> 
        </div>
        <div class="form-group">
          <label for="estadoPunto" class="form-label">Estación<span class="required">*</span>:</label>
          <input type="text" id="estadoPunto" v-model="form.estadoPunto" class="form-control" required>
        </div> 
        <div class="form-group-button">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'BicicletaPublicaCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombrePunto: '',
        descripcionPunto: '',
        ubicacionPunto: '',
        estadoPunto: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/BicicletaPublica', this.form);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Bicicleta Creada',
          text: 'La bicicleta ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          nombrePunto: '',
          descripcionPunto: '',
          ubicacionPunto: '',
          estadoPunto: ''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear la bicicleta.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear la bicicleta:', error);
      }
    }
  }
};
</script>

<style scoped src="@/assets/styles/puntoInteres/puntoInteresNew.css"></style>