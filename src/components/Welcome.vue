<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome to chat</h2>

        <!-- <form @submit.prevent="enterChat"> -->
        <form>
          <!-- <label for="name">Enter your name:</label>

          <input type="text" name v-model="name" /> -->

          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button @click="googleAuth" class="btn amber darken-4">
            Enter to chat by Google
          </button>
          <button @click="socialFacecbookLogin" class="btn light-blue darken-4">
            Enter to chat by Facebook
          </button>

          <!-- <button @click="testBtn" class="btn teal">Enter to chat</button> -->
        </form>
      </div>
    </div>
    <blockquote class="blockquote w3-animate-bottom">
      <p class="mb-0">{{ quote }}</p>
      <footer class="blockquote-footer">Albert Einstein</footer>
    </blockquote>
  </div>
</template>

<script>
import firebase from "firebase";
import { users, databaseURL } from "../firebase/config";
export default {
  name: "Welcome",
  data() {
    return {
      name: "",
      feedback: null,
      quote: "",
    };
  },
  beforeMount() {
    this.getQuote();
  },
  methods: {
    googleAuth() {
      localStorage.removeItem("userData");
      const Firebase = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(Firebase)
        .then(async (result) => {
          let obj = {
            isNewUser: result.additionalUserInfo.isNewUser,
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1,
          };

          let userData = await users
            .orderByChild("email")
            .equalTo(obj.email)
            .once("value")
            .then((snapshot) => {
              snapshot.forEach(function (data) {
                let userDataJson = {
                  email: data.val().email,
                  name: data.val().fullname,
                };
                localStorage.setItem("userData", JSON.stringify(userDataJson));
              });
              return snapshot.val();
            });

          if (userData == null) {
            this.$swal("No Permission !.");
          } else {
            this.$router.push({
              name: "Chat",
              params: { name: obj.fullname },
            });
          }

          // Enable this line code when everyone can use chat room.
          // this.newUser(obj);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    socialFacecbookLogin: function () {
      const provide = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provide)
        .then((result) => {
          // create user in db
          let obj = {
            facebook_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.user.photoURL + "?height=500",
            user_type_id: 1,
          };
          console.log(obj);
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },

    newUser(obj) {
      if (obj.isNewUser) {
        users
          .push(obj)
          .then((newUser) => {
            this.$router.push({
              name: "Chat",
              params: { name: obj.fullname },
            });
          })
          .catch((e) => {
            // console.log(e);
          });
      } else {
        this.$router.push({
          name: "Chat",
          params: { name: obj.fullname },
        });
      }
    },
    enterChat() {
      this.$router.push({ name: "Chat", params: { name: "eiei" } });
    },
    getQuote() {
      const rand = Math.floor(Math.random() * 4);
      const quote = [
        "“Anyone who has never made a mistake has never tried anything new.”",
        "“A clever person solves a problem. A wise person avoids it.”",
        "“Try not to become a man of success. Rather become a man of value.”",
        "“Life is like riding a bicycle. To keep your balance, you must keep moving.”",
      ];
      this.quote = quote[rand];
    },
  },
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
