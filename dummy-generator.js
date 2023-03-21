const Product = require("./models/Product");
const fs = require("fs");
const connectDatabase = require("./helpers/database/Database")
const dotenv = require("dotenv");


const path = "./dummy/";


const products = JSON.parse(fs.readFileSync(path + "products.json"));


dotenv.config({
  path: "./config/env/config.env",
});

connectDatabase();

const importAllData = async function () {
  try {
    
    
    for (let i=0;i<products.length;i++){
        const item=await Product.findOne({name:products[i].name})
        if (!item){
          await Product.create(products[i])
        }else{
          item.stack=parseInt(item.stack)+parseInt(products[i].stack)
          item.price=products[i].price
          await item.save()
        }
       
       
    }
    console.log("Import Process Successful");
  } catch (err) {
    console.log(err);
    console.err("There is a problem with import process");
  } finally {
    process.exit();
  }
};



if (process.argv[2] == "--import") {
    importAllData()
} 