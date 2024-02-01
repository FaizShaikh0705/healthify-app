import express from 'express'
import { ObjectId } from 'mongodb';
const router = express.Router()
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from './verifyToken.js'
import Product from '../models/productModel.js';
import Razorpay from 'razorpay';
// const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_5Cals1cn7FB5ME',
  key_secret: 'mzASirpjDMwgWZyVM6pvW4Kf',
});


//CREATE

// router.post("/", verifyTokenAndAdmin, async (req, res) => {
// router.post("/", async (req, res) => {

//     const newProduct = new Product(req.body);

//     try {
//         const savedProduct = await newProduct.save();
//         res.status(200).json(savedProduct);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
router.put("/:id", async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
router.delete("/:id", async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
// router.get("/find/:id", async (req, res) => {
router.get("/find/:id", async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/invoice/:id", async (req, res) => {
    try {
        // var request = require('request');
        // var options = {
        //   'method': 'GET',
        //   'url': 'https://api.razorpay.com/v1/invoices/'+req.params.id,
        //   'headers': {
        //   }
        // };
        // request(options, function (error, response) {

        //   if (error){
        //     console.log(error);
        //   }
        //   res.status(200).json(response);
        // });
        // const product = await Product.findById(req.params.id);

        razorpay.invoices.fetch("inv_NQ2ddJig4shS1X", (err, order) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Failed to create payment order' });
            }
          
            // The 'order' object contains details including 'id' (order ID) and 'amount' among others
            // const paymentLink = "order.short_url";

            console.log(order);
            // console.log(err);
          
            // Send the paymentLink to the client or use it in your application
            res.json(order);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL PRODUCTS
// router.get("/", async (req, res) => {
// router.get("/", async (req, res) => {
router.post("/", async (req, res) => {

    const qNew = req.body;
    // const qCategory = req.query.category;
    // console.log(qNew);
    var line_items = [];
    var pobjIds = [];
    var idsSelVarnt = {};
    var qtysIds = {};

    for (let i = 0; i < req.body.products.length; i++) {
      const elem = req.body.products[i];
      pobjIds.push(new ObjectId(elem["productId"]));
      // idsSelVarnt[elem["productId"]+elem["selectedVariantName"]] = elem["selectedVariantName"];
      // qtysIds[elem["productId"]+elem["selectedVariantName"]] = elem["quantity"];
    }
    // postVariantName1
    // const newArray = req.body.products.map(obj => new ObjectId(obj["productId"]));
    // req.body.products.forEach(element => {
    // const projection = { postTopicName: 1, _id: 1,postVariantName1:1,postVariantName2:1,postPriceName:1,postPriceName2:1 };
    const products = await Product.find({ _id: { $in: pobjIds }});
    // console.log(products);
    for (let i = 0; i < req.body.products.length; i++) {
      const elem = req.body.products[i];
      let dbObj = (products.filter(obj => obj._id == elem.productId))[0];
      // console.log(dbObj);
      let prPric = elem["selectedVariantName"] == dbObj.postVariantName1 ? dbObj.postPriceName : dbObj.postPriceName2;

      line_items.push({
        "name": dbObj.postTopicName,
        "description": elem.selectedVariantName,
        "amount": prPric * 100,
        "currency": "INR",
        "quantity": elem.quantity
      });

      // pobjIds.push(new ObjectId(elem["productId"]));
      // idsSelVarnt[elem["productId"]+elem["selectedVariantName"]] = elem["selectedVariantName"];
      // qtysIds[elem["productId"]+elem["selectedVariantName"]] = elem["quantity"];
    }

    // for (let i = 0; i < products.length; i++) {
    //   const elem = products[i];
    //   let prPric = idsSelVarnt[elem._id] == elem.postVariantName1 ? elem.postPriceName : elem.postPriceName2;

    //   line_items.push({
    //     "name": elem.postTopicName,
    //     "description": idsSelVarnt[elem._id],
    //     "amount": prPric * 100,
    //     "currency": "INR",
    //     "quantity": qtysIds[elem._id]
    //   });
    // }

    //   line_items.push(Product.findById(element.productId));
      
    // });
    // return res.status(200).json(line_items);
    try {

      // address: user.currentUser.address.address,
      // postalCode: user.currentUser.address.postalCode,
      // city: user.currentUser.address.city,
      // state: user.currentUser.address.state,
      // [
      //   {
      //     "name": "Master Cloud Computing in 30 Days",
      //     "description": "Book by Ravena Ravenclaw",
      //     "amount": 3990,
      //     "currency": "INR",
      //     "quantity": 1
      //   },
      //   {
      //     "name": "Python crash course",
      //     "description": "Book by Ravena Ravenclaw",
      //     "amount": 59990,
      //     "currency": "INR",
      //     "quantity": 3
      //   }
      // ]

        const orderOptions = {
            "type": "invoice",
            "description": "New Online Order",
            "partial_payment": false,
            "customer": {
              "name": qNew.userName,
              "contact": qNew.contact,
              "email": qNew.email,
              "billing_address": {
                "line1": qNew.address.address,
                "line2": "",
                "zipcode": qNew.address.postalCode,
                "city": qNew.address.city,
                "state": qNew.address.state,
                "country": "in"
              },
              "shipping_address": {
                "line1": qNew.address.address,
                "line2": "",
                "zipcode": qNew.address.postalCode,
                "city": qNew.address.city,
                "state": qNew.address.state,
                "country": "IN"
              }
            },
            "line_items": line_items,
            "sms_notify": 0,
            "email_notify": 0,
            "currency": "INR",
            "expire_by": parseInt(new Date().getTime() / 1000) + (86400 *30),
            "notes": {
              "key1": "New order placed"
            }
          };
          
          razorpay.invoices.create(orderOptions, (err, order) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Failed to create payment order' });
            }
          
            // The 'order' object contains details including 'id' (order ID) and 'amount' among others
            // const paymentLink = order.short_url;
            // console.log(order);
            // console.log(err);
            // Send the paymentLink to the client or use it in your application
            // res.json({ paymentLink });
            return res.status(200).json(order);
          });
          

        // let products;

        // if (qNew) {
        //     products = await Product.find().sort({ createdAt: -1 }).limit(1);
        // } else if (qCategory) {
        //     products = await Product.find({
        //         categories: {
        //             $in: [qCategory],
        //         },
        //     });
        // } else {
        //     products = await Product.find();
        // }

        // res.status(200).json({"products":"assa"});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router