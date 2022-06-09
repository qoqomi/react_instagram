// widgets.js
import { db } from "../../shared/firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// Actions
const LOAD = "wish/LOAD";
const CREATE = "wish/CREATE";

// Action Creators
export function loadWish(wish_list) {
  return { type: LOAD, wish_list };
}

export function createWish(data) {
  console.log("액션생성🎉");
  console.log(data);
  return { type: CREATE, data };
}

//middleWares
export const LoadWishFB = () => {
  return async function (dispatch) {
    const data = await getDocs(collection(db, "add"));

    let wish_list = [];

    data.forEach((doc) => {
      wish_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadWish(wish_list));
  };
};

export const addWishFB = (instaram) => {
  return async function (dispatch) {
    console.log("addWish");
    await addDoc(collection(db, "add"), instaram);
    // const _instagram = await getDoc(doc);
    const data = { id: instaram.id, ...instaram };

    dispatch(createWish(data));
  };
};

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "wish/LOAD": {
      return { list: action.wish_list };
    }
    case "wish/CREATE": {
      const new_instagram = [...state.list, action.data];
      return { list: new_instagram };
    }
    default:
      return state;
  }
}
