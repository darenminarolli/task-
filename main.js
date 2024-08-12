const IPWorks = require("@nsoftware/ipworks");

async function getProducts() {
  const http = new IPWorks.http();
  const json = new IPWorks.json();

  try {
    // task 1
    await http.get('https://dummyjson.com/products');
    
    const rawResponse = http.getTransferredData();

    console.log('All products',rawResponse);

    // task 2
    json.setInputData(rawResponse);

    await json.parse();

    json.setXPath("$.products");


    const products = json.getXChildren();
    const productCount = products.list.elementCount
  
    for (let i = 0; i < productCount; i++) {
      json.setXPath(`$.products[${i}].title`);
      console.log(`Product ${i + 1} title: ${json.getXText()}`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

getProducts();