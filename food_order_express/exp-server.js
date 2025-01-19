const express = require('express');
const app = express();
const port = 3001;
app.use(express.static('public'));

//routes

app.get('/',(req,res)=>{
    res.sendFile('public/index.html',{root:__dirname});
})
app.get('/products',(req,res)=>{
    res.sendFile('public/products.html',{root:__dirname});
})
app.get('/cart',(req,res)=>{
    res.sendFile('public/cart.html',{root:__dirname});
})
app.get('/images/search.svg',(req,res)=>{
    res.sendFile('images/search.svg',{root:__dirname});
})
app.get('/images/shopping-bag-svgrepo-com.svg',(req,res)=>{
    res.sendFile('images/shopping-bag-svgrepo-com.svg',{root:__dirname});
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})