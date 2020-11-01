import { initializeApp } from "firebase";

const app = initializeApp({
  apiKey: "AIzaSyBFbI82cfms_k4vaW7qe1lEEpNi-aJ09Yg",
  authDomain: "simple-chat-92e80.firebaseapp.com",
  databaseURL: "https://simple-chat-92e80.firebaseio.com",
  projectId: "simple-chat-92e80",
  storageBucket: "",
  messagingSenderId: "1078584699381",
});


export const database = app.database();
export const messages = database.ref("messages");
export const users = database.ref("users");
export const databaseURL = "https://simple-chat-92e80.firebaseio.com/.json";
