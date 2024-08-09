<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nuevo Mantenimiento</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombreRuta" class="form-label">Tipo De Mantenimiento<span class="required">*</span>:</label>
          <input type="text" id="nombreRuta" v-model="form.nombreRuta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcionRuta" class="form-label">Descripción<span class="required">*</span>:</label>
          <textarea id="descripcionRuta" v-model="form.descripcionRuta" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group"> 
          <label for="ubicacionRuta" class="form-label">Bicicleta<span class="required">*</span>:</label>
          <input type="text" id="ubicacionRuta" v-model="form.ubicacionRuta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estadoRuta" class="form-label">Fecha Inicio<span class="required">*</span>:</label>
          <input type="date" id="estadoRuta" v-model="form.estadoRuta" class="form-control" required>
        </div>
        <!--
        <div class="form-group">
          <label for="estadoRuta" class="form-label">Fecha Fin<span class="required">*</span>:</label>
          <input type="text" id="estadoRuta" v-model="form.estadoRuta" class="form-control" required>
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
  name: 'MantenimientoCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombreRuta: '',
        descripcionRuta: '',
        ubicacionRuta: '',
        estadoRuta: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/mantenimiento', this.form);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'mantenimiento Creada',
          text: 'mantenimiento ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          nombreRuta: '',
          descripcionRuta: '',
          ubicacionRuta: '',
          estadoRuta: ''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el mantenimiento.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear el mantenimiento:', error);
      }
    }
  }
};
</script>



<style scoped src="@/assets/styles/ruta/rutaNew.css"></style>