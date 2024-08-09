<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Mantenimientos</h2>
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
            <th><i class="fas fa-calendar-alt"></i> Fecha de Registro</th>
            <th><i class="fa-sharp-duotone fa-solid fa-wrench"></i>Tipo De Mantenimiento</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fa-sharp-duotone fa-solid fa-bicycle"></i>Bicicleta</th>
            <th><i class="fas fa-calendar-alt"></i>Fecha Inicio</th>
            <!--
            <th><i class="fas fa-calendar-alt">Fecha Fin</i></th>-->
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredMantenimiento.length === 0">
            <td colspan="6" class="text-center">Sin registros de Mantenimientos</td>
          </tr>
          <tr v-for="ruta in filteredMantenimiento" :key="ruta.mantenimientoId">
            <td>{{ ruta.createMantenimiento }}</td>
            <td>{{ ruta.nombreRuta }}</td>
            <td>{{ ruta.descripcionRuta }}</td>
            <td>{{ ruta.ubicacionRuta }}</td>
            <td>{{ ruta.estadoRuta }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', ruta)"></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(ruta.rutaId)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>
          {{ filteredMantenimiento.length }} resultados encontrados: Mostrando página 1
          de 100
        </p>
        <button class="add-btn" @click="redirectToCreateMantenimiento">
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
            <label for="nombre_ruta" class="form-label"
              >Tipo De Mantenimiento <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="nombre_ruta"
              v-model="form.nombreRuta"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="descripcion_ruta" class="form-label"
              >Descripción <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="descripcion_ruta"
              v-model="form.descripcionRuta"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="ubicacion_ruta" class="form-label"
              >Bicicleta <span class="required">*</span>:</label
            >
            <input
              type="text"
              id="ubicacion_ruta"
              v-model="form.ubicacionRuta"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estadoRuta" class="form-label"
              >Fecha Inicio<span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoRuta"
              v-model="form.estadoRuta"
              class="form-control"
              required
            />
          </div>
          <!--
          <div class="form-group">
            <label for="estadoRuta" class="form-label"
              >Fecha Fin<span class="required">*</span>:</label
            >
            <input
              type="text"
              id="estadoRuta"
              v-model="form.estadoRuta"
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
import axios from "axios"; // Aquí está el import correcto

export default {
  name: "MantenimientoView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      mantenimiento: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        mantenimientoId: null,
        nombreRuta: "",
        descripcionRuta: "",
        ubicacionRuta: "",
        estadoRuta: true,
      },
    };
  },
  computed: {
    filteredMantenimiento() {
      if (!this.searchQuery) {
        return this.mantenimiento;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.mantenimiento.filter((ruta) =>
        ruta.nombreRuta.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchMantenimiento() {
      try {
        const response = await axios.get("http://localhost:4200/mantenimiento");
        this.mantenimiento = response.data;
      } catch (error) {
        console.error("Error al obtener los mantenimientos:", error);
      }
    },
    openOffCanvas(action, ruta = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Mantenimiento";
        this.form = { ...ruta };
        this.isOffCanvasOpen = true;
      } else if (action === "add") {
        this.offCanvasTitle = "Agregar Mantenimiento";
        this.form = {
          mantenimientoId: null,
          nombreRuta: "",
          descripcionRuta: "",
          ubicacionRuta: "",
          estadoRuta: true,
        };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },

// FUNCIÓN PARA ELIMNAR 

    //    async handleDeleteClick(rutaId) {
    //      Swal.fire({
    //        title: '¿Estás seguro?',
    //        text: "¡No podrás revertir esto!",
    //        icon: 'warning',
    //        showCancelButton: true,
    //        confirmButtonColor: '#3085d6',
    //        cancelButtonColor: '#d33',
    //        confirmButtonText: 'Sí, bórralo!'
    //      }).then(async (result) => {
    //        if (result.isConfirmed) {
    //          try {
    //            await axios.delete(`http://localhost:4200/ruta/${rutaId}`);
    //            this.rutas = this.rutas.filter(ruta => ruta.rutaId !== rutaId);
    //            Swal.fire('¡Borrado!', 'La ruta ha sido borrada.', 'success');
    //          } catch (error) {
    //            Swal.fire('Error', 'Hubo un error al borrar la ruta.', 'error');
    //            console.error('Error al borrar la ruta:', error);
    //          }
    //        }
    //      });
    //    },
    async submitForm() {
      try {
        if (this.form.mantenimientoId) {
          // Actualizar una ruta existente
          await axios.put(
            `http://localhost:4200/mantenimiento/${this.form.mantenimientoId}`,
            this.form
          );
          const index = this.mantenimiento.findIndex(
            (r) => r.mantenimientoId === this.form.mantenimientoId
          );
          if (index !== -1) {
            this.mantenimiento[index] = { ...this.form };
            Swal.fire(
              "¡Actualizado!",
              "El mantenimiento ha sido actualizada.",
              "success"
            );
          }
        } else {
          // Crear una nueva ruta
          const response = await axios.post(
            "http://localhost:4200/mantenimiento",
            this.form
          );
          this.mantenimiento.push(response.data);
          Swal.fire("¡Creada!", "El mantenimiento ha sido creada.", "success");
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al guardar el mantenimiento", "error");
        console.error("Error al guardar el mantenimiento:", error);
      }
    },
    redirectToCreateMantenimiento() {
      this.$router.push("/create/mantenimiento");
    },
  },
  mounted() {
    this.fetchMantenimiento();
  },
};
</script>   


<style scoped src="@/assets/styles/ruta/rutaView.css"></style>
