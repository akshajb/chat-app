<template>
  <div class="list-users container">
    <div class="card">
      <div class="card-content">
        <h2 class="purple-text">Users</h2>
        <ul class="collection list">
          <li
            class="collection-item"
            @click="chatRedirect(user)"
            v-for="user in users"
            :key="user.user_id"
          >{{user.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "ListUsers",
  data() {
    return {
      users: [],
      currentUser: null,
      currentUserName: null
    };
  },
  methods: {
    chatRedirect(user) {
      console.log(user);
      this.$router.push({
        name: "Chat",
        params: {
          name: this.currentUserName,
          fid: user.user_id,
          uid: this.currentUser.uid
        }
      });
    }
  },
  created() {
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser.uid);
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data().user_id);
          if (this.currentUser.uid != doc.data().user_id) {
            this.users.push(doc.data());
          } else {
            this.currentUserName = doc.data().name;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
h2 {
  font-size: 2em;
  margin-top: 0;
}
</style>