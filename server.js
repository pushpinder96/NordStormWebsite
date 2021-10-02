const express= require('express');
const cors=require('cors');
const stripe=require('stripe')('sk_test_51JRwvSEfdMNMhmC9CIjrEZSIdMew7V1uiiZjRd0VqTPxjctTusmgUH2g65wXupiNzJDW6UQ8cofZi4lVs20VQOl00008A8WNXe');
const app= express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.get('/',(request,response)=>{
    response.send('helloworld')
})

app.post('/checkoutserve',async(request,response)=>{
let error;
let status;
try{
    const{product,token}=request.body;
    let uuidKey=uuidv4();
    const customer= await stripe.customers.create({
        email:token.email,
        source:token.id,
    }).then(customer=>{ stripe.charges.create({
        amount:product.price,
        currency:'usd',
        customer:token.id,
        receipt_email:token.email,
        description:product.name,
        shipping:{
            name:token.card.name,
            address:{
             line1:token.card.address_line1,
             line2:token.card.address_line2,
             city:token.card.address_city,
             country:token.card.address_country,
             postal_code:token.card.address_zip
           
            }
        }

    },{idempotencyKey:uuidKey})
})
    status='success';

}catch(error){
console.log(error);
status='error payment failed.'
}
response.json({status});
})

app.listen(PORT,()=>{
    console.log(`your app is running on port ${PORT}`);
})
console.log('hello world');