<template>
  <div class="login container">
    <div class="card">
      <div class="card-content">
        <h2 class="center deep-purple-text">Login</h2>
        <form @submit.prevent="login">
          <div class="field">
            <label for="name">Enter your email</label>
            <input type="email" name="email" id="email" v-model="email" />
          </div>
          <div class="field">
            <label for="password">Enter your Password</label>
            <input type="password" name="password" id="password" v-model="password" />
          </div>
          <p class="red-text" v-if="feedback">{{feedback}}</p>
          <div class="field center">
            <button class="btn deep-purple">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            let ref = db.collection("users");
            ref
              .where("user_id", "==", cred.user.uid)
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  // this.$router.push({
                  //   name: "Chat",
                  //   params: { name: doc.data().name }
                  // });
                  console.log(doc);
                  this.$router.push({ name: "ListUsers" });
                });
              });
          })
          .catch(error => {
            this.feedback = error.message;
          });
      } else {
        this.feedback = "Enter both email and password";
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin-top: 50px;
}
h2 {
  font-size: 3em;
  margin-top: 0;
}
.card {
  padding: 2em;
}
button {
  margin-top: 1.5em;
}
</style>