import firebase from 'firebase/app'; // 파이어베이스 기능 불러오기
import 'firebase/firestore'; // 파이어베이스의 파이어스토어 기능 불러오기
const firebaseConfig = {
        apiKey: "AIzaSyDD907mOE3T-Dnp7Oa0nN0_mqukJKaIEcA",
        authDomain: "my-todo-3e7d6.firebaseapp.com",
        projectId: "my-todo-3e7d6",
        storageBucket: "my-todo-3e7d6.appspot.com",
        messagingSenderId: "94545109040",
        appId: "1:94545109040:web:8b244e07a2dc1591fb4df5"
      };
export const db = firebase.initializeApp(firebaseConfig).firestore();