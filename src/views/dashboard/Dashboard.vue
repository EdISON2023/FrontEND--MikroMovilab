<template>
  <Navegation />
  
  <div class="content">
    <Nav />

    <div class="map-container">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27990657607!2d-74.25986527855468!3d40.697670063015096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2451a1b57a25d%3A0x6e3f4b2f7f8f5bb1!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1604296787341!5m2!1sen!2s" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        aria-hidden="false" 
        tabindex="0">
      </iframe>
    </div>
    <br>
    <div class="info-section">
      <div class="recent-users-container">
        <h2>Usuarios Recientes</h2>
        <div class="user-card" v-for="user in recentUsers" :key="user.id">
          <img :src="user.image" alt="Foto de usuario" class="user-photo"/>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.activityDate }}</p>
          </div>
        </div>
      </div>
      <div class="stations-container">
        <h2>Estaciones</h2>
        <div class="station-card" v-for="station in stations" :key="station.id">
          <img :src="station.image" alt="Foto de estación" class="station-photo"/>
          <div class="station-info">
            <h3>{{ station.name }}</h3>
            <p>{{ station.date }} | {{ station.time }}</p>
          </div>
        </div>
      </div>
      <div class="metro-container">
        <h2>Bicicleta</h2>
        <div class="metro-images">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/BiciQ_139.jpg" alt="Bicicleta Azul"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'HomeView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
      recentUsers: [
        { id: 1, name: 'Leo Jacome', activityDate: '24 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4526/4526169.png' },
        { id: 2, name: 'Andrea Jiron', activityDate: '24 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4202/4202850.png' },
        { id: 3, name: 'Nuria Ortiz', activityDate: '23 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4202/4202850.png' },
        { id: 4, name: 'Andres Gaona', activityDate: '21 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4526/4526169.png' },
      ],
      stations: [
        { id: 1, name: 'La Carolina', date: '16 Agosto, 2024', time: '4:00 PM', image: 'https://img.goraymi.com/2018/07/24/4327da4af2dab9157642503de7aa7eb9_xl.jpg' },
        { id: 2, name: 'El Ejido', date: '16 Agosto, 2024', time: '4:00 PM', image: 'https://ecuadors.live/wp-content/uploads/2023/07/parque-el-ejido-quito-quito-turismo-turismo-ecuador.jpg' },
        { id: 3, name: 'La Colón', date: '16 Agosto, 2024', time: '4:00 PM', image: 'https://www.quitoinforma.gob.ec/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-05-at-10.44.09-e1696528716230-800x445.jpg' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped src="@/assets/styles/dashboard/dashboard.css"></style>
