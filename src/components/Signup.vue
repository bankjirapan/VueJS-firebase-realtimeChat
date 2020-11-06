<template>
  <div>
    <div class="welcome container">
      <div class="card">
        <div class="card-content center-align">
          <h2 class="teal-text">Signup to Chat</h2>

          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="name"
                id="name"
                type="text"
                class="validate"
                placeholder="name"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="email"
                id="email"
                type="email"
                class="validate"
                placeholder="email"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="password"
                id="password"
                type="password"
                class="validate"
                placeholder="password"
              />
            </div>
          </div>
          <button
            class="btn green darken-1"
            @click="registerUser"
            name="action"
          >
            Register</button
          ><br />
          <router-link to="/">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { users } from "../firebase/config";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    async registerUser() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((registed) => {
          registed.user.updateProfile({
            displayName: name,
          });

          users.push({
            email: registed.user.email,
            userId: registed.user.uid,
            role: 0,
          });

          this.$router.push({
            name: "Welcome",
          });
        })
        .catch((err) => {
          if (err.code == "auth/email-already-in-use") {
            this.$swal("This email already exists");
          } else {
            this.$swal(err.message);
          }
        });
    },
  },
};
</script>
<style scoped>
.welcome {
  max-width: 600px;
  margin-top: 100px;
}
.welcome h2 {
  font-size: 3em;
}
.welcome button {
  margin-bottom: 10px;
}
</style>