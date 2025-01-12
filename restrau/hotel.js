let total = 0;
let menu = {
  Pizza: {
    "Chesse Burst Pizza": 500,
    "Veg Pizza": 300,
    "Veg Margrita": 350,
    "Chille Paneer": 400,
  },
  Coffee: {
    "Black Coffee": 100,
    Capachuno: 300,
    Expresso: 200,
  },
  Burger: {
    "Aloo Tiki": 250,
    "Maharaja Burger": 300,
    "Panneer Crispy": 400,
  },
  Tea: {
    "Black Tea": 30,
    "Green Tea": 40,
    Normal: 15,
  },
  Samosa: {
    "Punjabi Samosa": 30,
    "Normal Samosa": 20,
    "Mini Samosa": 15,
  },
};


function printBill(bill)
{
  showBill = ""
  for (const item in bill) {
    if(bill[item]>0)
      showBill+= item+"->"+bill[item]+"\n"
    }

    showBill+="Total = "+total;

    confirm(showBill)
  }


let bill = {
  "Cheese Burst Pizza": 0,
  "Veg Pizza": 0,
  "Veg Margrita": 0,
  "Chille Paneer": 0,
  "Black Coffee": 0,
  Capachuno: 0,
  Expresso: 0,
  "Aloo Tiki": 0,
  "Maharaja Burger": 0,
  "Panneer Crispy": 0,
  "Black Tea": 0,
  "Green Tea": 0,
  Normal: 0,
  "Punjabi Samosa": 0,
  "Normal Samosa": 0,
  "Mini Samosa": 0,
};

let close = true;

function getCount(item) {
  let count = parseInt(prompt("How many " + item + "s do you want?"));
  return count;
}

while (close == true) {
  let choice = parseInt(
    prompt(
      "Welcome to our hotel, What would you like?\n1.Pizza\n2.Coffee\n3.Tea\n4.Burger\n5.Samosa\n6.Generate Bill"
    )
  );

  if (choice == 1) {
    let pizza = parseInt(
      prompt(
        "1. Chesse Burst Pizza:500 \n2.Veg Pizza: 300 \n3.Veg Margrita:350 \n4.Chille Paneer:400\n5.Go Back"
      )
    );
    if (pizza == 1) {
      let count = getCount("Cheese Burst Pizza");
      total += count * menu["Pizza"]["Chesse Burst Pizza"];
      bill["Cheese Burst Pizza"] += count * menu["Pizza"]["Chesse Burst Pizza"];
    } else if (pizza == 2) {
      let count = getCount("Veg Pizza");
      total += count * menu["Pizza"]["Veg Pizza"];
      bill["Veg Pizza"] += count * menu["Pizza"]["Veg Pizza"];
    } else if (pizza == 3) {
      let count = getCount("Veg Margrita");
      total += count * menu["Pizza"]["Veg Margrita"];
      bill["Veg Margrita"] += count * menu["Pizza"]["Veg Margrita"];
    } else if (pizza == 4) {
      let count = getCount("Chille Paneer");
      total += count * menu["Pizza"]["Chille Paneer"];
      bill["Chille Paneer"] += count * menu["Pizza"]["Chille Paneer"];
    }
  } else if (choice == 2) {
    let coffee = parseInt(
      prompt("1. Black Coffee: 100\n2. Capachuno: 300\n3. Expresso: 200\n4. Go Back")
    );
    if (coffee == 1) {
      let count = getCount("Black Coffee");
      total += count * menu["Coffee"]["Black Coffee"];
      bill["Black Coffee"] += count * menu["Coffee"]["Black Coffee"];
    } else if (coffee == 2) {
      let count = getCount("Capachuno");
      total += count * menu["Coffee"]["Capachuno"];
      bill["Capachuno"] += count * menu["Coffee"]["Capachuno"];
    } else if (coffee == 3) {
      let count = getCount("Expresso");
      total += count * menu["Coffee"]["Expresso"];
      bill["Expresso"] += count * menu["Coffee"]["Expresso"];
    }
  } else if (choice == 3) {
    let tea = parseInt(
      prompt("1. Black Tea: 30\n2. Green Tea: 40\n3. Normal: 15\n4. Go Back")
    );
    if (tea == 1) {
      let count = getCount("Black Tea");
      total += count * menu["Tea"]["Black Tea"];
      bill["Black Tea"] += count * menu["Tea"]["Black Tea"];
    } else if (tea == 2) {
      let count = getCount("Green Tea");
      total += count * menu["Tea"]["Green Tea"];
      bill["Green Tea"] += count * menu["Tea"]["Green Tea"];
    } else if (tea == 3) {
      let count = getCount("Normal Tea");
      total += count * menu["Tea"]["Normal"];
      bill["Normal"] += count * menu["Tea"]["Normal"];
    }
  } else if (choice == 4) {
    let burger = parseInt(
      prompt(
        "1. Aloo Tiki: 250\n2. Maharaja Burger: 300\n3. Panneer Crispy: 400\n4. Go Back"
      )
    );
    if (burger == 1) {
      let count = getCount("Aloo Tiki");
      total += count * menu["Burger"]["Aloo Tiki"];
      bill["Aloo Tiki"] += count * menu["Burger"]["Aloo Tiki"];
    } else if (burger == 2) {
      let count = getCount("Maharaja Burger");
      total += count * menu["Burger"]["Maharaja Burger"];
      bill["Maharaja Burger"] += count * menu["Burger"]["Maharaja Burger"];
    } else if (burger == 3) {
      let count = getCount("Panneer Crispy");
      total += count * menu["Burger"]["Panneer Crispy"];
      bill["Panneer Crispy"] += count * menu["Burger"]["Panneer Crispy"];
    }
  } else if (choice == 5) {
    let samosa = parseInt(
      prompt(
        "1. Punjabi Samosa: 30\n2. Normal Samosa: 20\n3. Mini Samosa: 15\n4. Go Back"
      )
    );
    if (samosa == 1) {
      let count = getCount("Punjabi Samosa");
      total += count * menu["Samosa"]["Punjabi Samosa"];
      bill["Punjabi Samosa"] += count * menu["Samosa"]["Punjabi Samosa"];
    } else if (samosa == 2) {
      let count = getCount("Normal Samosa");
      total += count * menu["Samosa"]["Normal Samosa"];
      bill["Normal Samosa"] += count * menu["Samosa"]["Normal Samosa"];
    } else if (samosa == 3) {
      let count = getCount("Mini Samosa");
      total += count * menu["Samosa"]["Mini Samosa"];
      bill["Mini Samosa"] += count * menu["Samosa"]["Mini Samosa"];
    }
  } else if (choice == 6) {
    close = false;
    printBill(bill)
  }
}

confirm("Thank you for visiting!");
