<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">{{name}} typing message and enter to send message:</label>
      <input type="text" name="new-message" v-model="newMessage" />
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import { messages, databaseURL } from "../firebase/config";
export default {
  name: "NewMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        messages
          .push({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });

          this.newMessage = null
          this.feedback = null


    
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
      // console.log(this.newMessage,this.name,Date.now());
    }
  }
};
</script>