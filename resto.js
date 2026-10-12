console.log("====================================");
console.log("SELAMAT DATANG DI BAKSO SATELIT");
console.log("====================================");

const { createInterface } = require("node:readline/promises");

const foods = [
  { id: 1, name: "Bakso Urat", price: 13000 },
  { id: 2, name: "Bakso Tetelan", price: 16000 },
  { id: 3, name: "Bakso Iga", price: 18000 },
  { id: 4, name: "Bakso Rudal", price: 20000 },
  { id: 5, name: "Bakso Telor", price: 20000 },
  { id: 6, name: "Bakso Satelit", price: 22000 },
  { id: 7, name: "Bakso Rusuk", price: 28000 },
  { id: 8, name: "Bakso Nuklir 500gr", price: 45000 },
  { id: 9, name: "Mie Ayam", price: 12000 },
  { id: 10, name: "Mie Ayam Bakso", price: 15000 },
  { id: 11, name: "Mie Ayam Balungan", price: 15000 },
  { id: 12, name: "Mie Ayam Telor", price: 15000 },
  { id: 13, name: "Mie Ayam Ceker 250gr", price: 16000 },
  { id: 14, name: "Mie Ayam Kepala 250gr", price: 16000 },
  { id: 15, name: "Mie Ayam Bakso Urat", price: 18000 },
  { id: 16, name: "Mie Ayam Rudal", price: 20000 },
  { id: 17, name: "Mie Ayam Bakso Telur", price: 20000 },
  { id: 18, name: "Mie Ayam Brutal", price: 20000 },
  { id: 19, name: "Mie Ayam Tumpah", price: 22000 },
];

let cart = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function app() {
  let isRunningApp = true;

  while (isRunningApp) {
    const menuPage = [
      "1. Menu Makanan",
      "2. Checkout",
      "3. Lihat daftar pelanggan lain",
      "4. Exit",
    ];

    console.log("\n---------- MENU UTAMA ----------\n");
    let i = 0;
    while (i < menuPage.length) {
      console.log(menuPage[i]);
      i++;
    }

    const choiceMenuPage = await rl.question(
      "\nSilahkan pilih halaman (1-4): ",
    );

    switch (choiceMenuPage.trim()) {
      case "1":
        await orderFood();
        break;
      case "2":
        await checkOut();
        break;
      case "3":
        await showCustomers();
        break;
      case "4":
        console.log("exit");
        rl.close();
        isRunningApp = false;
        break;
      default:
        console.log("Silahkan pilih menu 1,2,3.");
        break;
    }
  }
}

app();

// * Functions
async function orderFood() {
  console.log("\n---------- DAFTAR MENU----------");

  let textMenu = "Daftar Menu:\n\n";
  foods.forEach((menu) => {
    textMenu += `${menu.id}. ${menu.name} - Rp${formatRupiah(menu.price)}\n`;
  });
  console.log(textMenu);

  const foodId = await rl.question(
    "\nMasukkan ID / Nomor Makanan yang ingin dipesan: ",
  );

  const selectedFood = foods.find((food) => food.id == Number(foodId));

  if (!selectedFood) {
    console.log("Menu makanan tidak ditemukan");
    return;
  }

  let quantityFood = await rl.question(
    `Berapa porsi ${selectedFood.name} yang ingin dipesan: `,
  );

  // TODO: handle error kalo ngasih selain angka, "angka"
  Number(quantityFood);

  // TODO: kalo equal to, bakal strict. gmna handle strict ini.
  if (typeof quantityFood !== "number") {
    console.log("Jumlah pesanan tidak valid.");
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
}

async function checkOut() {
  let totalPrice = 0;
  let textCheckout = "\n\n=== STRUK PESANAN ===\n\n";

  if (cart.length == 0) {
    console.log(
      "\nKeranjang Anda masih kosong. Silakan pesan makanan terlebih dahulu.",
    );
    return;
  }

  cart.map((product) => {
    const quantity = product.quantity;
    const name = product.name;
    const price = product.price;

    const subTotal = calculateTotal(quantity, price);

    textCheckout += `${name}\n`;
    textCheckout += `${quantity} porsi x ${formatRupiah(price)} = Rp${formatRupiah(subTotal)}\n\n`;

    totalPrice += subTotal;
  });

  const receipt = {
    data: cart,
    totalPrice,
  };

  textCheckout += `TOTAL BAYAR = ${formatRupiah(receipt.totalPrice)}\n`;
  textCheckout += "=====================\n";
  textCheckout += "Terima kasih atas pesanan Anda!";

  console.log(textCheckout);
}

function formatRupiah(angka) {
  return `Rp ${angka.toLocaleString("id-ID")}`;
}

function calculateTotal(quantity, price) {
  return quantity * price;
}

async function showCustomers() {
  const url = "https://jsonplaceholder.typicode.com/users";

  return fetch(url)
    .then((response) => {
      console.log("\nMengambil data pelanggan dari server...");
      const data = response.json();
      return data;
    })
    .then((data) => {
      data.forEach((customer, index) => {
        console.log(`
${index + 1}. Nama     : ${customer.name}
   Username : ${customer.username}
   Email    : ${customer.email}
   Perusahaan: ${customer.company.name}
   Kota     : ${customer.address.city}
----------------------------------------`);
      });
    })
    .catch((err) => {
      console.log("Gagal mengambil data pelanggan: " + err);
      return err;
    });
}
