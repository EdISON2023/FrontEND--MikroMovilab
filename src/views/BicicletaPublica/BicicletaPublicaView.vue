<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Bicicletas</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          v-model="searchQuery"
        />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Número de Serie</th>
            <th><i class="fas fa-info-circle"></i> Modelo</th>
            <th><i class="fas fa-circle text-danger"></i>Estado</th>
            <th><i class="fas fa-map-marker-alt"></i>Estación</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredPuntos.length === 0">
            <td colspan="6" class="text-center">
              Sin registros de Punto de Interés
            </td>
          </tr>
          <tr v-for="punto in filteredPuntos" :key="punto.bicicletapublicaId">
            <td>{{ punto.createPunto }}</td>
            <td>{{ punto.nombrePunto }}</td>
            <td>{{ punto.descripcionPunto }}</td>
            <td>{{ punto.ubicacionPunto }}</td>
            <td>{{ punto.estadoPunto }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', punto)"></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(punto.puntointeresId)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>
          {{ filteredPuntos.length }} resultados encontrados: Mostrando página 1
          de 100
        </p>
        <button class="add-btn" @click="redirectToCreatePunto">Agregar</button>
        <button>Previous</button>
        <button class="active">1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
    <div :class="['off-canvas', { open: isOffCanvasOpen }]">
      <div class="off-canvas-header">
        <h2>{{ offCanvasTitle }}</h2>
        <button @click="closeOffCanvas" class="close-btn">&times;</button>
      </div>
      <div class="off-canvas-body">
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="nombre_punto" class="form-label"
              >Número de Serie<span class="required">*</span>:</label
            >
            <input
              type="text"
              id="nombre_punto"
              v-model="form.nombrePunto"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="descripcion_punto" class="form-label"
              >Modelo <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="descripcion_punto"
              v-model="form.descripcionPunto"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="ubicacion_punto" class="form-label"
              >Id Estado <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="ubicacion_punto"
              v-model="form.ubicacionPunto"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estadoPunto" class="form-label"
              >Id Estación<span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoPunto"
              v-model="form.estadoPunto"
              class="form-control"
              required
            />
          </div>
          <div class="form-group-button">
            <button type="submit" class="btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Navegation from "@/components/Navegation.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "BicicletaPublicaView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      puntos: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        bicicletapublicaId: null,
        nombrePunto: "",
        descripcionPunto: "",
        ubicacionPunto: "",
        estadoPunto: "",
        createPunto: "",
      },
    };
  },
  computed: {
    filteredPuntos() {
      if (!this.searchQuery) {
        return this.puntos;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.puntos.filter((punto) =>
        punto.nombrePunto.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchPuntos() {
      try {
        const response = await axios.get("http://localhost:4200/bicicletaPublica");
        this.puntos = response.data;
      } catch (error) {
        console.error("Error al obtener las bicicletas:", error);
      }
    },
    openOffCanvas(action, punto = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Bicicleta";
        this.form = { ...punto };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },

// FUNCIÓN PARA ELIMNAR 

    //async handleDeleteClick(puntointeresId) {
    //Swal.fire({
    //  title: '¿Estás seguro?',
    //  text: "¡No podrás revertir esto!",
    //  icon: 'warning',
    //  showCancelButton: true,
    //  confirmButtonColor: '#3085d6',
    //  cancelButtonColor: '#d33',
    //  confirmButtonText: 'Sí, bórralo!'
    //}).then(async (result) => {
    //  if (result.isConfirmed) {
    //    try {
    //      await axios.delete(`http://localhost:4200/puntoInteres/${puntointeresId}`);
    //      this.puntos = this.puntos.filter(punto => punto.puntointeresId !== puntointeresId);
    //      Swal.fire('¡Borrado!', 'El punto de interés ha sido borrado.', 'success');
    //    } catch (error) {
    //      Swal.fire('Error', 'Hubo un error al borrar el punto de interés.', 'error');
    //     console.error('Error al borrar el punto de interés:', error);
    // }
    //  }
    //});
    //},
    async submitForm() {
      try {
        if (this.form.bicicletapubicaId) {
          // Actualizar un punto existente
          await axios.put(
            `http://localhost:4200/bicicletaPublica/${this.form.bicicletapublicaId}`,
            this.form
          );
          const index = this.puntos.findIndex(
            (p) => p.bicicletapublicaId === this.form.bicicletapublicaId
          );
          if (index !== -1) {
            this.puntos[index] = { ...this.form };
            Swal.fire(
              "¡Actualizado!",
              "Bcicleta actualizado.",
              "success"
            );
          }
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un error al guardar la bicicleta.",
          "error"
        );
        console.error("Error al guardar la bicicleta:", error);
      }
    },
    redirectToCreatePunto() {
      this.$router.push("/create/BicicletaPublica");
    },
  },
  mounted() {
    this.fetchPuntos();
  },
};
</script>

<style scoped src="@/assets/styles/puntoInteres/puntoInteresView.css"></style>
