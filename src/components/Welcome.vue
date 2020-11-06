<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome to chat</h2>

        <!-- <form @submit.prevent="enterChat"> -->
        <div class="row">
          <div class="col s12">
            <label for="name">Email</label>
            <input type="text" v-model="email" />
            <label for="name">Password</label>
            <input type="password" v-model="password" />

            <button
              @click="loginWithEmail"
              class="btn green darken-1"
              name="action"
            >
              Login With email</button
            ><br />
            <router-link to="signup">Sign up with email</router-link>
          </div>
        </div>
        <p v-if="feedback" class="red-text">{{ feedback }}</p>

        <p>Or Login with</p>
        <button @click="googleAuth" class="btn amber darken-4">
          Enter to chat by Google
        </button>
        <button @click="socialFacecbookLogin" class="btn light-blue darken-4">
          Enter to chat by Facebook
        </button>

        <!-- <button @click="testBtn" class="btn teal">Enter to chat</button> -->
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
      email: "",
      password: "",
      feedback: null,
      quote: "",
    };
  },
  beforeMount() {
    this.getQuote();
  },
  methods: {
    loginWithEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (loggedIn) => {
          let userId = loggedIn.user.uid;

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
          } else {
            console.log("OK");
            this.$router.push({
              name: "Chat",
              params: { name: loggedIn.user.displayName },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal(err.message);
        });
    },
    googleAuth() {
      const Firebase = new firebase.auth.GoogleAuthProvider().addScope("email");
      firebase
        .auth()
        .signInWithPopup(Firebase)
        .then(async (result) => {
          if (result.additionalUserInfo.isNewUser) {
            users.push({
              email : result.user.email,
              userId: result.user.uid,
              role: 0,
            });
          }

          let userId = result.user.uid;

          let userData = await users
            .orderByChild("userId")
            .equalTo(userId)
            .once("value")
            .then((snapshot) => {
              return snapshot.val();
            });

          if (userData == null) {
            this.$swal("Please register before signin");
          }

          let keyData = Object.keys(userData)[0];

          if (userData[keyData].role == 0) {
            this.$swal("You not has permission.");
          } else {
            console.log("OK");
            this.$router.push({
              name: "Chat",
              params: { name: loggedIn.user.displayName },
            });
          }
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
  max-width: 500px;
  margin-top: 100px;
}
.welcome h2 {
  font-size: 3em;
}
.welcome button {
  margin-bottom: 10px;
}
</style>
