<template>
  <div id="navbar">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a href="/" class="navbar-brand">Buber</a>

      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <i class="fa-solid fa-house"></i>
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cars" class="nav-link">
            <i class="fa-solid fa-car"></i> Cars
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/invoices" class="nav-link">
            <i class="fa-solid fa-file-lines"></i> Invoices
          </router-link>
        </li>
        <li v-if="showManagerBoard" class="nav-item">
          <router-link to="/manager" class="nav-link">Manager Page</router-link>
        </li>
        <li v-if="showManagerBoard" class="nav-item">
          <router-link to="/cars/create" class="nav-link">Create a car</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User Page</router-link>
        </li>
      </div>

      <!-- Right aligned nav items -->
      <div v-if="!currentUser" class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <i class="fa-solid fa-user-plus"></i> Become a driver
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <i class="fa-solid fa-user-lock"></i> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <i class="fa-solid fa-user-shield"></i>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-danger text-light" @click.prevent="logOut">
            <i class="fa-solid fa-circle-xmark"></i> Logout
          </a>
        </li>
      </div>

    </nav>

    <div class="container">
      <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showManagerBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MANAGER');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>