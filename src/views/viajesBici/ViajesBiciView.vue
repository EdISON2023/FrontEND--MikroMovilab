<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Beacons</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar por descripción..."
          v-model="searchQuery"
        />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fa-sharp-duotone fa-solid fa-address-card"></i>Número de Serie</th>
            <th><i class="fas fa-circle text-danger"></i>Estado</th>
            <th><i class="fa-sharp-duotone fa-solid fa-location-dot"></i>Latitud</th>
            <th><i class="fa-sharp-duotone fa-solid fa-location-dot"></i>Longitud</th>
            <!--
            <th><i class="fa-sharp-duotone fa-solid fa-location-dot"></i>Longitud</th>
            -->
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredMensajes.length === 0">
            <td colspan="5" class="text-center">
              Sin registros de Beacons
            </td>
          </tr>
          <tr v-for="mensaje in filteredMensajes" :key="mensaje.mensajeId">
            <td>{{ mensaje.createMensaje }}</td>
            <td>{{ mensaje.mensaje }}</td>
            <td>{{ mensaje.contactoMensaje }}</td>
            <td>{{ mensaje.estadoMensaje }}</td>
            <td>{{ mensaje.longitudMensaje }}</td>
          
            <td class="actions">
              <i
                class="fas fa-edit"
                @click="openOffCanvas('edit', mensaje)"
              ></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(mensaje.mensajeId)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>
          {{ filteredMensajes.length }} resultados encontrados: Mostrando página
          1 de 100
        </p>
        <button class="add-btn" @click="redirectToCreateMensaje">
          Agregar
        </button>
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
            <label for="mensaje" class="form-label"
              >Numero de serie <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="mensaje"
              v-model="form.mensaje"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="contacto" class="form-label"
              >Estado <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="contacto"
              v-model="form.contactoMensaje"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estadoMensaje" class="form-label"
              >Latitud <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoMensaje"
              v-model="form.estadoMensaje"
              class="form-control"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="longitudMensaje" class="form-label"
              >Longitud <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="longitudMensaje"
              v-model="form.longitudMensaje"
              class="form-control"
              required
            />
          </div>
          <!--
          <div class="form-group">
            <label for="estadoMensaje" class="form-label"
              >Estación Fin<span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoMensaje"
              v-model="form.estadoMensaje"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estadoMensaje" class="form-label"
              >Hora Inicio <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoMensaje"
              v-model="form.estadoMensaje"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estadoMensaje" class="form-label"
              >Hora Fin <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoMensaje"
              v-model="form.estadoMensaje"
              class="form-control"
              required
            />
          </div>-->
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
  name: "ViajesBiciView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      mensajes: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        mensajeId: null,
        mensaje: "",
        contactoMensaje: "",
        estadoMensaje: "",
        longitudMensaje:"",
        createMensaje: "",
      },
    };
  },
  computed: {
    filteredMensajes() {
      if (!this.searchQuery) {
        return this.mensajes;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.mensajes.filter((mensaje) =>
        mensaje.mensaje.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchMensajes() {
      try {
        const response = await axios.get(
          "http://localhost:4200/viajesBici"
        );
        this.mensajes = response.data;
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    },
    openOffCanvas(action, mensaje = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Beacons";
        this.form = { ...mensaje };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },

// FUNCIÓN PARA ELIMNAR 

    //async handleDeleteClick(mensajeId) {
    //Swal.fire({
    //title: '¿Estás seguro?',
    //text: "¡No podrás revertir esto!",
    //icon: 'warning',
    //showCancelButton: true,
    //confirmButtonColor: '#3085d6',
    //cancelButtonColor: '#d33',
    //confirmButtonText: 'Sí, bórralo!'
    //}).then(async (result) => {
    //if (result.isConfirmed) {
    //try {
    //await axios.delete(`http://localhost:4200/mensajePersonalizado/${mensajeId}`);
    //this.mensajes = this.mensajes.filter(mensaje => mensaje.mensajeId !== mensajeId);
    //Swal.fire('¡Borrado!', 'El mensaje ha sido borrado.', 'success');
    //} catch (error) {
    //Swal.fire('Error', 'Hubo un error al borrar el mensaje.', 'error');
    //console.error('Error al borrar el mensaje:', error);
    //}
    //}
    //});
    //},
    async submitForm() {
      try {
        if (this.form.mensajeId) {
          // Actualizar un mensaje existente
          await axios.put(
            `http://localhost:4200/viajesBici/${this.form.mensajeId}`,
            this.form
          );
          const index = this.mensajes.findIndex(
            (m) => m.mensajeId === this.form.mensajeId
          );
          if (index !== -1) {
            this.mensajes[index] = { ...this.form };
            Swal.fire(
              "¡Actualizado!",
              "El mensaje ha sido actualizado.",
              "success"
            );
          }
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al guardar el mensaje.", "error");
        console.error("Error al guardar el mensaje:", error);
      }
    },
    redirectToCreateMensaje() {
      this.$router.push("/create/ViajesBici");
    },
  },
  mounted() {
    this.fetchMensajes();
  },
};
</script>

<style scoped src="@/assets/styles/mensajePersonalizado/mensajePersonalizadoView.css"></style>
