<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New message (enter to add)</label>
      <input type="text" name="new-message" id="new-message" v-model="newMessage" />
      <p class="red-text">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
export default {
  name: "NewMessage",
  props: {
    name: {
      Type: String
    },
    collection: {
      Type: String
    }
  },
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        db.collection(this.collection)
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(error => {
            console.log(error);
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter a message to send";
      }
    }
  }
};
</script>

<style scoped>
</style>