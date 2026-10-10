console.log("====================================");
console.log("SELAMAT DATANG DI BAKSO SATELIT");
console.log("====================================");

// const { daftarMenu } = require("./data.js");
const { createInterface } = require("node:readline/promises");

const foods = [
  { id: 1, name: "Mie Ayam Biasa", price: 15000 },
  { id: 2, name: "Mie Ayam Bakso", price: 20000 },
  { id: 3, name: "Mie Ayam Ceker", price: 18000 },
];

const cart = [
  {
    id: 0,
    name: "Mie Ayam Biasa",
    price: 15000,
    quantity: 2,
    // subTotal: cart.price * cart.quantity,
  },
];

function calculateTotal(quantity, price) {
  return quantity * price;
}
// console.log(cart);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function app() {
  let isRunningApp = true;
  while (isRunningApp) {
    const menuPage = ["1. Menu Makanan", "2. Checkout", "3. Exit"];

    let i = 0;
    while (i < menuPage.length) {
      console.log(menuPage[i]);
      i++;
    }

    const choiceMenuPage = await rl.question(
      "\nSilahkan pilih halaman (1-3): ",
    );

    switch (choiceMenuPage.trim()) {
      case "1":
        await orderFood();
        break;
      case "2":
        await checkOut();
        break;
      case "3":
        console.log("exit");
        rl.close();
        isRunningApp = false;
        break;
      default:
        // kembali ke case 1
        console.log("Silahkan pilih menu 1,2,3.");
        break;
    }
  }
}

app();

async function orderFood() {
  console.log("\n---------- DAFTAR MENU----------");
  console.table(foods);

  const foodId = await rl.question("\nSilahkan pilih menu makanan: ");

  const selectedFood = foods.find((food) => food.id == Number(foodId));

  if (!selectedFood) {
    console.log("Menu makanan tidak ditemukan");
    // TODO: kembali ke menu makanan!
    rl.close();
    return;
  }

  let quantityFood = await rl.question(
    `\nMau pesan ${selectedFood.name} berapa: `,
  );
  Number(quantityFood);

  if (typeof quantityFood == "number") {
    console.log("masukan angka id pada menu makanan !!");
    rl.close();
    return;
  }

  const newFood = {
    ...selectedFood,
    quantity: Number(quantityFood),
  };

  const newCart = [...cart, newFood];

  console.log(newCart);
  console.log("\n---------- Menu Halaman ----------\n\n");
}

// orderFood();

async function checkOut() {
  console.log("checkout");
}
