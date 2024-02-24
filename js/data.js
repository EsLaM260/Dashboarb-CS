
import { collection, addDoc, serverTimestamp, onSnapshot, doc, deleteDoc, updateDoc, getDocs  }
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";



export  function handleData(db) {

  const allCategory = collection(db, "categories");
  // console.log(allCategory);
  getTodo(allCategory)


}


const getTodo = async (allCategory) => {

  // All categories in market
  const datas = await getDocs(allCategory);

  let selectCategory = document.querySelector(".allCategoryInProduct");
  let selectHTML = ``;

  datas.forEach((data) => {
    // convert object to array
    let mainCategory = Object.values(data.data());
    // add data into select 
    mainCategory.forEach((category , id)  => {
      selectHTML += `<option value="${category}" id="${id}">${category}</option>`;
    });
  })

  selectCategory.innerHTML = selectHTML;
  // ########################################################






};
