
import { collection, setDoc, serverTimestamp, onSnapshot, doc, deleteDoc, updateDoc, getDocs ,getDoc }
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";



export function handleData(db) {

  mainRow(db);
  addProduct(db);
  getProduct(db);
  
}

const mainRow = async (db) => {

  // to get title for all product once in thead (page table of product)
  let mainTitleOfProduct = document.querySelector(".table-product table thead tr");
  const rowVegetableTitleFirst = doc(db, "Vegetables", "Carrot");
  const rowVegetableTitle = await getDoc(rowVegetableTitleFirst);
  let textOfMainTitleProduct = Object.keys(rowVegetableTitle.data()).sort();

  if (location.href.includes("/TableOfProduct.html")) {
    textOfMainTitleProduct.forEach((tableItem) => {
      mainTitleOfProduct.innerHTML += `<td>${tableItem}</td>`
    });
    mainTitleOfProduct.innerHTML += '<td>Buttons</td>'
  };

}

const getProduct = async (db) => {
  // count number for all product
  let countProduct = 0;
  let countTag = document.querySelectorAll(".dashboardPage .content .boxes .welcome .body > div h3")[1];
  // All categories in market (page product)
  const allCategories = collection(db, "categories");
  const datas = await getDocs(allCategories);
  let selectCategory = document.querySelector(".allCategoryInProduct");
  let selectHTML = ``;
  let allCategoriesTOArray = [];
  datas.forEach((data) => {
    // convert object to array
    let mainCategory = Object.values(data.data());
    // add data into select 
    mainCategory.forEach((category, id) => {
      selectHTML += `<option value="${category}" id="${id}">${category}</option>`;
      allCategoriesTOArray.push(category);
    })
  
  })
    
  if (location.href.includes("/Product.html") || location.href.includes("/edit.html")) {
    selectCategory.innerHTML = selectHTML
  }
  // ################################################################################
  // get all data of product in fire store (table of product page)
  let tableHTML = ``;
  let tableOfProduct = document.querySelector(".table-product table tbody");

  for (const category of allCategoriesTOArray) {
    let mainCategory = collection(db, category);
    let datasForMainCategory = await getDocs(mainCategory);

    datasForMainCategory.forEach((singledata) => {
      let data = singledata.data();
      let date = data["Expiry Date"].toDate();

      tableHTML += `
      <tr id="${singledata.id}">
        <td>${data[" Name"]}</td>
        <td>${data[" Price"]}</td>
        <td>${data["Category"]}</td>
        <td>${data["Description"]}</td>
        <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>
        <td>${data["Product Code"]}</td>
        <td>${data["Quantity in store"]}</td>
        <td>${data["Shelf ID"]}</td>
        <td><img src="${data["itemImage"]}"></td>
        <td>${data["itemWeightForThisPrice"]}</td>
        <td>
          <div>
            <a href="edit.html" class="editproduct">Edit</a>
            <button class="deleteProduct" data-id = "${singledata.id}">Delete</button>
          </div>
        </td>
      </tr>
      `
      countProduct++
      if (location.href.includes("/TableOfProduct.html")) {
        tableOfProduct.innerHTML = tableHTML;
      }
      if (location.href.includes("/index.html")) {
        countTag.innerHTML = countProduct;
      }

    })

  }
  // ########################################################
  deleteProduct(db)
  updateProduct(db)


};

const addProduct = async (db) => {
  const productForm = document.querySelector(".Form.addProduct form");
  if (location.href.includes("/Product.html")) {
    productForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let chossenCategory = productForm.category.value;
      let nameOfDoc = productForm.Name.value
      let colRef = collection(db, chossenCategory);
      try {
        let docRef = doc(colRef, nameOfDoc);
        let dateOfProduct = new Date(productForm.ExpiryDate.value);
        await setDoc(docRef, {
          " Name": productForm.Name.value,
          "Product Code": productForm.ProductCode.value,
          "Category": productForm.category.value,
          " Price": productForm.Price.value,
          "itemWeightForThisPrice": productForm.Weight.value,
          "itemImage": productForm.Image.value,
          "Quantity in store": productForm.QuantityInStore.value,
          "Expiry Date": dateOfProduct,
          "Shelf ID": productForm.ShelfID.value,
          "Description": productForm.Description.value
        })
        productForm.reset();
      } catch (error) {
        console.log(error);
      }
  
    })
  }
}

const deleteProduct = async (db) => {
  let deleteBtns = document.querySelectorAll(".deleteProduct");

  for (let btn of deleteBtns) {

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("data-id");
      // const id = e.target.parentElement.parentElement.parentElement.id;
      const category = e.target.parentElement.parentElement.parentElement.children[2].innerHTML;
      const docRef = doc(db, category, id);

      try {
        await deleteDoc(docRef);
        location.reload();
      } catch (error) {
        console.log(error);
      }

    })

  }

}

const updateProduct = async (db) => {
  let editBtns = document.querySelectorAll(".editproduct");

  editBtns.forEach((btn) => {

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      let idForItem = e.target.parentElement.parentElement.parentElement.id;
      const category = e.target.parentElement.parentElement.parentElement.children[2].innerHTML;
      location.assign(`/edit.html?productId=${idForItem}&productCategory=${category}`);
    })

  })

  if (location.href.includes("/edit.html")) {
    // get data and add into form
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const productCategory = urlParams.get('productCategory');
    let collectionData = doc(db,productCategory,productId);
    let product = await getDoc(collectionData);
    let productData = product.data();
    let productForm = document.querySelector(".editProduct form");
    let date = productData["Expiry Date"].toDate()
    let formattedDate = date.toISOString().split('T')[0];
    
    productForm.Name.value = productData[" Name"];
    productForm.ProductCode.value = productData["Product Code"];
    productForm.category.value = productData["Category"];
    productForm.Price.value = productData[" Price"];
    productForm.Weight.value = productData["itemWeightForThisPrice"];
    productForm.Image.value = productData["itemImage"];
    productForm.QuantityInStore.value = productData["Quantity in store"];
    productForm.ExpiryDate.value = formattedDate;
    productForm.ShelfID.value = productData["Shelf ID"];
    productForm.Description.value = productData["Description"];
    
    // transfer data into firebase
    let btnResend = document.querySelector(".editProduct form button");
    let dateOfProduct = new Date(productForm.ExpiryDate.value);
  
    btnResend.addEventListener("click",async (e) => {
      e.preventDefault()
      await updateDoc(collectionData, {
        " Name": productForm.Name.value,
        "Product Code": productForm.ProductCode.value,
        "Category": productForm.category.value,
        " Price": productForm.Price.value,
        "itemWeightForThisPrice": productForm.Weight.value,
        "itemImage": productForm.Image.value,
        "Quantity in store": productForm.QuantityInStore.value,
        "Expiry Date": dateOfProduct,
        "Shelf ID": productForm.ShelfID.value,
        "Description": productForm.Description.value
      })
      location.replace("/TableOfProduct.html");
    })


  }

}