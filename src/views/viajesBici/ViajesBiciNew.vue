<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nuevo Beacons</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="mensaje" class="form-label">Número de Serie<span class="required">*</span>:</label>
          <textarea id="mensaje" v-model="form.mensaje" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="contactoMensaje" class="form-label">Estado<span class="required">*</span>:</label>
          <input type="text" id="contactoMensaje" v-model="form.contactoMensaje" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estadoMensaje" class="form-label">Latitud<span class="required">*</span>:</label>
          <input type="text" id="estadoMensaje" v-model="form.estadoMensaje" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label for="longitudMensaje" class="form-label">Longitud<span class="required">*</span>:</label>
          <input type="text" id="longitudMensaje" v-model="form.longitudMensaje" class="form-control" required>
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
  name: 'ViajesBiciCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        mensaje: '',
        contactoMensaje: '',
        estadoMensaje: '',
        longitudMensaje:''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/viajesBici', this.form);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'beacons Creado',
          text: 'El beacons ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          mensaje: '',
          contactoMensaje: '',
          estadoMensaje: '',
          longitudMensaje:''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el beacons.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear el beacons:', error);
      }
    }
  }
};
</script>



<style scoped src="@/assets/styles/mensajePersonalizado/mensajePersonalizadoNew.css"></style>