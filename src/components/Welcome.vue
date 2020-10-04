<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome to chat</h2>

        <form @submit.prevent="enterChat">
          <label for="name">Enter your name:</label>

          <input type="text" name v-model="name" />

          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn teal">Enter to chat</button>
        </form>
      </div>
    </div>
    <blockquote class="blockquote w3-animate-bottom">
      <p class="mb-0">{{quote}}</p>
      <footer class="blockquote-footer">Albert Einstein</footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      name: "",
      feedback: null,
      quote: ""
    };
  },
  beforeMount() {
    this.getQuote()
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.feedback = "you must enter a name to join";
      }
    },
    getQuote() {
      const rand = Math.floor(Math.random() * 4);
      const quote = [
        "“Anyone who has never made a mistake has never tried anything new.”",
        "“A clever person solves a problem. A wise person avoids it.”",
        "“Try not to become a man of success. Rather become a man of value.”",
        "“Life is like riding a bicycle. To keep your balance, you must keep moving.”"
      ];
      this.quote = quote[rand]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  max-width: 400px;
  margin-top: 100px;
}
.welcome h2 {
  font-size: 3em;
}
.welcome button {
  margin-bottom: 10px;
}
</style>
