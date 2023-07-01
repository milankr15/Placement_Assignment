import mongoose from "mongoose";
import * as argon2 from "argon2";
import User from "./models/user.schema.js";
import Product from "./models/product.schema.js";
import Cart from "./models/cart.schema.js";
import Order from "./models/order.schema.js";

const users = [{
    username: "Admin User",
    email: "admin@user.com",
    password: await argon2.hash("Admin12345"),
    isAdmin: true
}, {
    username: "John Doe",
    email: "john@doe.com",
    password: await argon2.hash("John12345"),
    isAdmin: false
}]

const products = [
    {
        title: 'Vintage Cruise T-Shirt',
        desc: 'This is a vintage cruise t-shirt',
        img: 'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
        categories: ['shirt'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Denim Jacket',
        desc: 'This is a denim jacket',
        img: 'https://www.pngarts.com/files/2/Denim-Jacket-PNG-Download-Image.png',
        categories: ['jacket'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Prada Shirt',
        desc: 'This is a prada shirt',
        img: 'https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png',
        categories: ['shirt'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Shirt Transparent',
        desc: 'This is a transparent shirt',
        img: 'https://www.pngarts.com/files/1/T-Shirt-Transparent-Image.png',
        categories: ['shirt'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Fabric Bag',
        desc: 'This is a fabric bag',
        img: 'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
        categories: ['bag'],
        size: ['S', 'M', 'L'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Vintage Cap',
        desc: 'This is a vintage cap',
        img: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
        categories: ['cap'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Vintage Jacket',
        desc: 'This is a vintage jacket',        
        img: 'https://www.pngarts.com/files/1/Jacket-PNG-Picture.png',
        categories: ['jacket'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: true
    },
    {
        title: 'Women Jacket',
        desc: 'Women Winter Long Sleeve Jacket',
        img: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
        categories: ['jacket'],
        size: ['S', 'M', 'L', 'XL'],
        color: ['Black', 'White', 'Blue', 'Red'],
        price: 200,
        inStock: false
    }
];

const seed = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/lamashop");

    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
        return { ...product, user: adminUser }
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
};

const destroy = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/lamashop");

    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed!");
};

if (process.argv[2] === "-d") {
    await destroy();
    process.exit(0);
}

if (process.argv[2] === "-i") {
    await seed();
    process.exit(0);
}