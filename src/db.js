var db;

// function dbIntialition() {
if (!('indexedDB' in window)) {
  // console.log('This browser does not support IndexedDB');
} else {
  // console.log('In function');
  var openRequest = indexedDB.open('test_db', 1);
  // console.log("OpenRequset", openRequest);
  openRequest.onupgradeneeded = function (e) {
    // console.log('In Open Request');
    var db = e.target.result;
    // console.log('running onupgradeneeded');
    if (!db.objectStoreNames.contains('user')) {
      var storeOS = db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
      storeOS.createIndex("emailId", "emailId", { unique: true });
    }
  };
  openRequest.onsuccess = function (e) {
    console.log('inside open request');
    db = e.target.result;
    console.log("Db in success", db);
  };
  openRequest.onerror = function (e) {

    console.log('onerror!');
    // console.dir(e);
  };
  // console.log("After open request")
}

function addRecipe() {
    // var db = dbIntialition();
    addItem();
  }
  
  function addItem() {
    // var db = dbIntialition();
    var transaction = db.transaction(['user'], 'readwrite');
    var recipe = transaction.objectStore('user');
    var item = {
    //   name: document.getElementById("name").value,
    //   emailId: document.getElementById("emailId").value,
      name: "Anchal",
      emailId: "anchal.c@altius.cc",
      task: "",
      created: new Date().getTime()
    };
    console.log(item);
    var request = recipe.add(item);
  
    request.onerror = function (e) {
      console.log("In error");
      alert("Duplicate email Id");
      // console.log('Error', e.target.error.name);
    };
    request.onsuccess = function (e) {
    //   getListOfRecipe();
    //   document.getElementById("name").value = "";
    //   document.getElementById("emailId").value = "";
      // document.getElementById("task").value = "";
      // location.reload();
      // console.log('Woot! Did it');
    };
  }