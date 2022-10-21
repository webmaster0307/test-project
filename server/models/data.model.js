class Product {
  constructor(_id, isActive, price, picture, name, about, tags, ) {
      this._id = _id
      this.isActive =isActive
      this.price = price
      this.picture = picture
    this.name = name;
    this.about = about
    this.tags = tags
  }

}

// {
//     "_id": "001", // A Number for the product
//     "isActive": "false", // Is the product actively in stock
//     "price": "23.00", // The price of the product in the set currency
//     "picture": "/img/products/N16501_430.png", // The location of the image for the product
//     "name": "Damage Reverse Thickening Conditioner", // The products name
//     "about": "Description for the product...", // Description of the product
//     "tags": [ "ojon", "conditioner" ] // The tags for the product
// }

// export default Product;
