<template>
  <div class="chat container">
    <div class="center teal-text">
      <h2>Chat Room</h2>
    </div>

    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li :key="key" v-for="(message, key) in messages">
            <span class="gray-text time">{{
              message.timestamp | moment("DD MMM YYYY, hh:mm:ss")
            }}</span>
            <span class="teal-text">{{ message.name }}</span>
            <span class="gray-text text-darken-3">{{ message.content }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
    <!-- <h2>Chat {{ this.name }}</h2> -->
    <div align="right">    <button class="btn red" @click="logout">Logout</button></div>

  </div>
</template>

<script>
import moment from "moment";
import NewMessage from "@/components/NewMessage";
import firebase from "firebase";
import { messages, users } from "../firebase/config";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: {},
    };
  },
  beforeMount() {
    this.isAuth();
  },
  created() {
    messages.on("value", (snapshot) => {
      this.messages = snapshot.val();
    });
  },
  methods: {
    async isAuth() {
      await firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          let userId = user.uid;

          let userData = await users
            .orderByChild("userId")
            .equalTo(userId)
            .once("value")
            .then((snapshot) => {
              return snapshot.val();
            });

          let keyData = Object.keys(userData)[0];

          if (userData[keyData].role == 0) {
            this.$swal("You not has permission.");
            this.$router.push({
              name: "Welcome",
            });
          }
        } else {
          console.log("object");
          // No user is signed in.
          this.$router.push({
            name: "Welcome",
          });
        }
      });
    },
    logout(){
      firebase.auth().signOut().then((loggedOut) =>{
          this.$router.push({
            name: "Welcome",
          });
      })
    }
  },
};
</script>


<style scoped>
.chat h2 {
  font-size: 2.6;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
}
.chat .time {
  color: rgb(97, 97, 97);
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px !important;
}
.messages::-webkit-scrollbar-track {
  background: #ddd !important;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa !important;
}
</style>