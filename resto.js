console.log("====================================");
console.log("SELAMAT DATANG DI BAKSO SATELIT");
console.log("====================================");

const { daftarMenu } = require("./data.js");
const { createInterface } = require("node:readline/promises");

const cart = [];
// cart = [
// {
//   menuName: "nama menu terpilih",
//     price: "harga menu terpilih",
//     count: "banyak menu",
//   },
// ];
async function app() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const menuPage = ["1. Menu Makanan", "2. Checkout", "3. Exit"];

  console.log(menuPage[0]);
  console.log(menuPage[1]);
  console.log(menuPage[2]);

  const choiceMenuPage = await rl.question("\nSilahkan pilih halaman: ");

  switch (choiceMenuPage.trim()) {
    case "1":
      presentMenuPage();
      break;
    case "2":
      console.log("checkout");
      break;
    case "3":
      console.log("exit");
      rl.close();
      break;
    default:
      console.log("Silahkan pilih menu 1,2,3.");
      break;
  }

  function presentMenuPage() {
    console.log("\n---------- DAFTAR MENU----------");
    console.table(daftarMenu);
    const selectedMenuId = 1;
    const selectedMenu = daftarMenu.find((m) => m.id == Number(selectedMenuId));
    const presentSelectedMenu = selectedMenu.name;
    cart.push(selectedMenu);
    const printCart = ``;
    console.log(cart[0]);
  }

  //   rl.question(`${q}: `, function (ans) {
  //     console.log(ans);
  //     rl.close();
  //   });

  rl.close();
}

// app();

function presentMenuPage() {
  console.log("\n---------- DAFTAR MENU----------");
  console.table(daftarMenu);
  const selectedMenuId = 1;
  const selectedMenu = daftarMenu.find((m) => m.id == Number(selectedMenuId));
  const presentSelectedMenu = selectedMenu.name;
  cart.push(selectedMenu);
  const printCart = ``;
  console.log(cart[0]);
}

presentMenuPage();
