import { getCurrentUser, getDataFromDoc } from "./utils.js";

let $app = document.getElementById('app');

let root = null;
let useHash = true;

let hash = '#'


let router = new Navigo(root, useHash, hash);

// đăng ký
router.on('/sign-up', function () {
    $app.innerHTML = `<form-register></form-register>`;
}).resolve();
// đăng nhập
router.on('/sign-in', function () {
    $app.innerHTML = `<form-login></form-login>`;
}).resolve();

router.on("/student-profile", async function () {
    let currentUser = getCurrentUser();
    let result = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.id)
        .get();
    // console.log(getDataFromDoc(result));

    let studentProfileData = getDataFromDoc(result);
    $app.innerHTML = `<student-profile id="${studentProfileData.id}"></student-profile>`;
});
window.router = router;

router.on("/object-list",async function(){
    let currentUser = getCurrentUser();
    let result = await firebase
        .firestore()
        .collection("ObjectList")
        .where("owner","==",currentUser.id)
        .get();
    
    console.log(getDataFromDoc(result.docs[0]));

    let ObjectListData = getDataFromDoc(result.docs[0]);

    let $objectList = document.createElement("object-list");
    $objectList.setAttribute("id",ObjectListData.id);
    $objectList.setObjects(ObjectListData.objects);
    $app.appendChild($objectList);
    // app.innerHTML = `<object-list></object-list`;

}).resolve();

router.on("/object-manager",async function(){
    // let currentUser = getCurrentUser();
    let result = await firebase
        .firestore()
        .collection("ObjectManager")
        .where("owner","==","admin")
        .get();

    // console.log(result.docs[0]);
    console.log(getDataFromDoc(result.docs[0]));

    let ObjectManagerData = getDataFromDoc(result.docs[0]);

    let $objectManager = document.createElement("object-manager");
    $objectManager.setAttribute("id",ObjectManagerData.id);
    $objectManager.setObjects(ObjectManagerData.Objects);
    $app.appendChild($objectManager);

}).resolve();

window.router = router;
