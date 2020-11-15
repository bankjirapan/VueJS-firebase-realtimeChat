<h1 align="center">
  VueJS-RealtimeChat
</h1>
<h6 align="center">
  VueJs group chat  realtime database firebase 
</h6>


## Repository นี้คืออะไร <br>
VueJS-firebase-realtimeChat คือโปรเจกต์ที่สำหรับทดลองฝึกของผมเอง โดยเป็นการใช้เทคโนโลยีง่ายๆ คือ VueJS2 และ firebase ซึ่งทำขึ้นพื่อมาเรียนรู้การใช้งานเบื้องต้น แต่มันก็สามารถนำไปใช้งานได้จริงเช่นกัน หากมีข้อเสนอแนะเกี่ยวกับโค้ด หรืออยากทำเพิ่มเติม เกี่ยวกับโปรดเจกต์นี้ สามารถส่ง PR ได้เลยครับ

## Repository มีทำไม <br>
ส่วนของ Repository นี้จะเป็นการใช้งาน Firebase กับ VueJS ซึ่งจุดประสงค์หลัก ๆ คือ ได้ทดลองการเขียน โดยเริ่มแรกนั้นทำมาเพื่อส่งงานวิชา Infra ของมหาลัยโดยศึกษาเรื่อง Realtime database ในปี 3 และในปี 4 นั้นได้ต่อยอด เป็นส่วนหนึ่งของวิชา Security จึงมีการเพิ่มเริ่ม Firebase Login เข้าไป <br>

We use [VueJS](https://vuejs.org/)

## 🚀 มาเริ่มติดตั้งกันเลย
1. **ขั้นแรกสามารถดาวน์โหลดไฟล์เป็น Zip. ได้ หรือสามารถ Clone ไปได้เลย
```
  git clone https://github.com/bankjirapan/VueJS-firebase-realtimeChat.git
```

2.  **ติดตั้ง Package**

    The Gatsby CLI helps you create new sites using Gatsby starters (like this one!)

    ```sh
    # install
    npm install
    ```
3. **ตั้งค่า Database
 ก่อนจะตั้งค่าในส่วนนี้อย่าลืมไปสร้าง Project ใน Firebase ก่อนนะครับ ไฟล์ตั้งค่าจะอยู่ที่ `` firebase/config.js ``
 ```
import { initializeApp } from "firebase";

const app = initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
});


export const database = app.database();
export const messages = database.ref("messages");
export const users = database.ref("users");
export const databaseURL = "";

 ```

4.  **Run project** 

    ``` bash
    # install dependencies
    npm install

    # serve with hot reload at localhost:8080
    npm run dev

    # build for production with minification
    npm run build

    # build for production and view the bundle analyzer report
    npm run build --report
    ```
    
## Screenshot <br>
![alt text](https://raw.githubusercontent.com/bankjirapan/VueJS-firebase-realtimeChat/master/img/1.png)
![alt text](https://raw.githubusercontent.com/bankjirapan/VueJS-firebase-realtimeChat/master/img/2.png)
![alt text](https://raw.githubusercontent.com/bankjirapan/VueJS-firebase-realtimeChat/master/img/3.png)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
