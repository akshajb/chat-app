<template>
  <div class="chat container">
    <h2 class="center teal-text">Chat with me</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id" class="light-grey">
            <div
              :style="[
                name == message.name
                  ? { 'text-align': 'right' }
                  : { 'text-align': 'left' },
              ]"
            >
              <span class="name teal-text">
                {{ message.name }}
                <br />
              </span>
              <span class="content grey-text text-darken-3">{{ message.content }}</span>
              <div>
                <span class="grey-text time">{{ message.timestamp }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <new-message :collection="collection" :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "../components/NewMessage";
import db from "@/firebase/init.js";
import moment from "moment";
export default {
  name: "Chat",
  components: {
    "new-message": NewMessage
  },
  props: {
    name: {
      Type: String,
      required: true
    },
    fid: {
      Type: String
    },
    uid: {
      Type: String
    }
  },
  data() {
    return {
      messages: [],
      right: "right",
      left: "left",
      collection: null
    };
  },
  methods: {
    getColName() {
      if (this.fid > this.uid) {
        return this.fid + this.uid;
      } else {
        return this.uid + this.fid;
      }
    }
  },
  mounted() {
    this.collection = this.getColName();

    let ref = db.collection(this.collection).orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>

<style scoped>
.chat {
  max-width: 600px;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
li {
  background-color: #fee;
  border-radius: 10px;
  margin-top: 1em;
  padding: 0.8em;
}
li span {
  font-size: 1.4em;
}
.name {
  font-size: 1em;
  text-transform: capitalize;
  font-weight: 700;
}
.content {
  font-size: 1.2em;
}
.time {
  font-size: 0.8em;
}
.left {
  text-align: left;
}
.right {
  /* text-align: right; */
}
</style>
