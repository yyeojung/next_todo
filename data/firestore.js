// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore, getDocs, collection, getDoc, 
    setDoc, doc, Timestamp , deleteDoc, updateDoc 
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//모든 할 일 가져오기
export async function fetchTodos() {
    const querySnapshot = await getDocs(collection(db, "todos"));

    if (querySnapshot.empty) {
        return [];
    }
    const fetchedTodos = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      const aTodo = {
        id: doc.id,
        title: doc.data()["title"],
        is_done: doc.data()["is_done"],
        created_at: doc.data()["created_at"].toDate(),
      }
      fetchedTodos.push(aTodo);
    });
    return fetchedTodos;
}

// 할일 추가
export async function addATodo({title}) {
    const newTodoRef = doc(collection(db, "todos"));

    const createdAtTimestamp = Timestamp.fromDate(new Date())

    const newTodoData = {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp
    }

    await setDoc(newTodoRef, newTodoData);

    return {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp.toDate()
    }
}

// 단일 할일 조회
export async function fetchATodo(id) {

    if(id === null) {
        return null;
    }

    const todoDocRef = doc(db, "todos", id);
    const todoDocSnap = await getDoc(todoDocRef);

    if (todoDocSnap.exists()) {
        console.log("Document data:", todoDocSnap.data());
        
        const fetchedTodo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            is_done: todoDocSnap.data()["is_done"],
            created_at: todoDocSnap.data()["created_at"].toDate(),
          }
        return fetchedTodo;
    } else {
        // todoDocSnap.data() will be undefined in this case
        console.log("No such document!");

        return null
    }
}

// 단일 할일 삭제
export async function deleteATodo(id) {
    //조회 후 삭제
    const fetchedTodo = await fetchATodo(id);

    if (fetchedTodo === null) {
        return null;
    }
    await deleteDoc(doc(db, "todos", id));
    return fetchedTodo;
}

// 단일 할일 수정
export async function editATodo(id, {title, is_done}) {

    //조회 후 수정
    const fetchedTodo = await fetchATodo(id);

    if (fetchedTodo === null) {
        return null;
    }
    const todoRef = doc(db, "todos", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoRef, {
        title: title,
        is_done: is_done
    });
    return {
        id: id,
        title: title,
        is_done: is_done,
        created_at: fetchedTodo.created_at
    };
}
module.exports = {fetchTodos, addATodo, fetchATodo, deleteATodo, editATodo}
