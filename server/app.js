/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
// const product = require('./models/data.model')
const hostname = "localhost";
const url = require("url");
const port = 3035;

const dataFilter = (query) => {
  const regexQuery = new RegExp(query, "g")

  // this list contains non duplicate entries
  let returnList = [];
  data.forEach((item)=>{
    if(item.name.toLowerCase().match(regexQuery)?.length > 0){
      if(!returnList.includes(item)) {
        returnList.push(item)
      }
    }
    if(item.about.toLowerCase().match(regexQuery)?.length > 0 ){
      if(!returnList.includes(item)) {
        returnList.push(item)
      }
    }
    item.tags.forEach((tag)=>{
      if(tag.toLowerCase().match(regexQuery)?.length > 0){
        if(!returnList.includes(item)) {
          returnList.push(item)
        }
      }
    })
  })

  return returnList
};
/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

http
  .createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    const query = url.parse(req.url, true).query.q;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3030");
    res.write(JSON.stringify(dataFilter(query))); // Write out the default response
    res.end(); //end the response
  })
  .listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
