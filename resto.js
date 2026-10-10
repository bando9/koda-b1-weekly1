console.log("====================================");
console.log("SELAMAT DATANG DI BAKSO SATELIT");
console.log("====================================");

const { foods } = require("./data.js");
const { createInterface } = require("node:readline/promises");

let cart = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function app() {
  let isRunningApp = true;
  while (isRunningApp) {
    const menuPage = ["1. Menu Makanan", "2. Checkout", "3. Exit"];

    console.log("\n---------- MENU UTAMA ----------\n");
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

  const productId = cart.find((product) => product.id == selectedFood.id);

  if (typeof productId == "undefined") {
    // * ======= CREATE =======
    const newOrderFood = {
      ...selectedFood,
      quantity: Number(quantityFood),
    };

    const newCart = [...cart, newOrderFood];
    cart = newCart;

    // console.log("\n---------- DAFTAR MENU----------");
  } else {
    // * ======= UPDATE =======
    const updateCart = cart.map((product) => {
      if (product.id == selectedFood.id) {
        const totalQuantity = Number(quantityFood) + product.quantity;
        const updateProduct = {
          ...product,
          quantity: totalQuantity,
        };
        return updateProduct;
      }
      return product;
    });
    cart = updateCart;
  }
  // console.log("\n---------- DAFTAR MENU----------");
}

async function checkOut() {
  let totalPrice = 0;
  let textCheckout = "=== STRUK PESANAN ===\n\n";

  cart.map((product) => {
    const quantity = product.quantity;
    const name = product.name;
    const price = product.price;

    const subTotal = calculateTotal(quantity, price);

    textCheckout += `${name}\n`;
    textCheckout += `${quantity} porsi x Rp${price} = Rp${subTotal}\n\n`;

    totalPrice += subTotal;
  });

  const receipt = {
    data: cart,
    totalPrice,
  };

  textCheckout += `TOTAL BAYAR = Rp${receipt.totalPrice}\n`;
  textCheckout += "=====================\n";
  textCheckout += "Terima kasih atas pesanan Anda!";

  console.log(textCheckout);
}

function calculateTotal(quantity, price) {
  return quantity * price;
}
