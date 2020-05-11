<template>
  <nav>
    <div class="blue nav-wrapper">
      <ul id="nav-mobile" class="left">
        <li>
          <router-link v-if="!user" to="/register">Register</router-link>
        </li>
        <li>
          <router-link v-if="!user" to="/login">Login</router-link>
        </li>
        <li>
          <a href="#" v-if="user" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "TheNavbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style scoped>
/* .navbar {
  padding: 30px;
}

.navbar a {
  font-weight: bold;
  color: #eee;
  margin-left: 1em;
}

.navbar a.router-link-exact-active {
  color: #42b983;
} */
</style>