const Product = require("../models/Product");


const soldStock = async (productID, stockSoldData) => {

  // Updating sold stock
  try {
    
    const myProductData = await Product.findOne({ _id: productID });
    let myUpdatedStock = myProductData.stock - stockSoldData;

    await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );

  } catch (error) {
    console.error("Error updating sold stock ", error);
  }
};

module.exports = soldStock;
