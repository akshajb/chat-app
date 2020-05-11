<template>
  <div class="register container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Register</h2>
        <form @submit.prevent="register()" autocomplete="off">
          <label for="name">Enter your email</label>
          <input type="email" name="email" id="email" v-model="email" />
          <label for="password">Enter your Password</label>
          <input type="password" name="password" id="password" v-model="password" />
          <label for="nick">Nickname</label>
          <input type="text" name="nick" id="nick" v-model="nick" />
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      feedback: null,
      nick: null,
      password: null
    };
  },
  methods: {
    register() {
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            db.collection("users")
              .add({
                user_id: cred.user.uid,
                name: this.nick,
                email: cred.user.email
              })
              .then(() => {
                this.$router.push({
                  name: "ListUsers"
                });
              });
          })
          .catch(error => {
            this.feedback = error.message;
          });
      } else {
        this.feedback = "You must enter all the fields to register.";
      }
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin-top: 50px;
}
.register h2 {
  font-size: 3em;
}
.register button {
  margin: 30px auto;
}
</style>