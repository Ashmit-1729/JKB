const books = [
  { name: "The Great Gatsby", price: 15 },
  { name: "1984", price: 10 },
  { name: "To Kill a Mockingbird", price: 12 },
  { name: "Pride and Prejudice", price: 8 },
  { name: "Moby Dick", price: 20 },
  { name: "War and Peace", price: 25 },
  { name: "The Catcher in the Rye", price: 10 },
  { name: "Crime and Punishment", price: 18 },
  { name: "The Odyssey", price: 14 },
  { name: "The Brothers Karamazov", price: 22 },
];

function getBookList() {
  let booklist = "";
  books.forEach((item, index) => {
    booklist += `${index + 1}. ${item.name} \t ${item.price}\n`;
  });

  return booklist;
}

function searchBook(bookList,book)
{
    let result = false;
   bookList.forEach((item)=>{
    if(item.name===book.name)
        result = true;
   })
   return result;
}


function printBill(pickedBooks)
{
  let display = "Your Bill-\n";
  let total = 0;

  pickedBooks.forEach((item)=>{
    display+=`${item.name} :  ${item.no_days} Days x ₹${item.price} = ₹${item.total} (Return by: ${item.return_date})\n`;
    total += item.total;
  })

  display+=`Total = ₹${total}`;
  return display;
} 


let pickedBooks = [];

while (true) {
  let option = parseInt(
    prompt("Which Books you want to pick?(11 to generate bill)\n" + getBookList() + "11.Bill")
  );
  if (option == 11) {
    if(pickedBooks)
    {
      let bill =printBill(pickedBooks);
      alert(bill);

    }
    break;
  }
  option = option - 1;
  if(searchBook(pickedBooks,books[option]))
  {
    alert("You have already picked this book!\n Please pick another one")
    continue;
  }
  let days = parseInt(prompt("How many days will you keep the book?"));
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + days);
  let order = {
    name: books[option].name,
    price: books[option].price,
    no_days: days,
    total : days*books[option].price,
    return_date: returnDate.toLocaleDateString()
  }
  pickedBooks.push(order);
  
}
