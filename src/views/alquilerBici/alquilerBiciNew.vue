<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo">
        <h1>Crear Nuevo Alquiler</h1>
      </div>
      <br>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="descripcionGuiaVoz" class="form-label">Usuario<span class="required">*</span>:</label>
          <textarea id="descripcionGuiaVoz" v-model="form.descripcionGuiaVoz" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="audioUrlGuiaVoz" class="form-label">Bicicleta<span class="required">*</span>:</label>
          <input type="text" id="audioUrlGuiaVoz" v-model="form.audioUrlGuiaVoz" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="idiomaGuiaVoz" class="form-label">Estado<span class="required">*</span>:</label>
          <input type="text" id="idiomaGuiaVoz" v-model="form.idiomaGuiaVoz" class="form-control" required>
        </div>
        <!--
        <div class="form-group">
          <label for="estadoGuiaVoz" class="form-label">Estación Inicio<span class="required">*</span>:</label>
          <input type="text" id="estadoGuiaVoz" v-model="form.estadoGuiaVoz" class="form-control" required> 
        </div>
        <div class="form-group">
          <label for="estadoGuiaVoz" class="form-label">Estación Fin<span class="required">*</span>:</label>
          <input type="text" id="estadoGuiaVoz" v-model="form.estadoGuiaVoz" class="form-control" required> 
        </div>
        <div class="form-group">
          <label for="estadoGuiaVoz" class="form-label">Fecha Inicio<span class="required">*</span>:</label>
          <input type="text" id="estadoGuiaVoz" v-model="form.estadoGuiaVoz" class="form-control" required> 
        </div>
        <div class="form-group">
          <label for="estadoGuiaVoz" class="form-label">Fecha Fin<span class="required">*</span>:</label>
          <input type="text" id="estadoGuiaVoz" v-model="form.estadoGuiaVoz" class="form-control" required> 
        </div>-->
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
  name: 'AlquilerBiciCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        descripcionGuiaVoz: '',
        audioUrlGuiaVoz: '',
        idiomaGuiaVoz: '',
        estadoGuiaVoz: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/alquilerBici', this.form);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'alquiler Credo',
          text: 'alquiler ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          descripcionGuiaVoz: '',
          audioUrlGuiaVoz: '',
          idiomaGuiaVoz: '',
          estadoGuiaVoz: ''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear alquieler.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear alquiler:', error);
      }
    }
  }
};
</script>


<style scoped src="@/assets/styles/guiaVoz/guiaVozNew.css"></style>