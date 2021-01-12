const scrapeIt = require("scrape-it")
const moment = require("moment");
// Load Product model
const Product = require("../models/Product");
// Load Category model
const Category = require("../models/Category");

const products = async () => {
    console.log('se inicio el scrapping a products')
    const BASE_URL = 'https://www.amazon.com/Best-Sellers/zgbs'
    let CategoriesScrapper = await scrapeIt(BASE_URL, {
        categories: {
            listItem: "#zg_browseRoot > ul > li",
            data: {
                name: "a",
                url: {
                    selector: "a", 
                    attr: "href"
                }
            }
        }
    });
    for(let i = 0; i < CategoriesScrapper.data.categories.length; i++){
        let item = CategoriesScrapper.data.categories[i]
        item = {
            ...item,
            date:moment()
        }
        let category;
        let categoryfind = await Category.findOne({name: item.name }).exec()
        if(categoryfind){
            Category.findByIdAndUpdate({name: item.name},item)
            category = categoryfind
        }else{
            category = new Category(item);
            category.save()
        }
        console.log(category._id)
        const pages = 2;
        for(let a = 0; a < pages; a++){
            const URL = `${item.url}?pg=${a+1}`
            let ProductsScrapper = await scrapeIt(URL,{
                products: {
                    listItem: "#zg-ordered-list > li",
                    data: {
                        name: 'span > div > span > a > div',
                        ranking: 'span > div > div > span > span',
                        sellers: 'span > div > span > .a-icon-row > .a-size-small',
                        url: {
                            selector: "span > div > span > a", 
                            attr: "href"
                        },
                        img: {
                            selector: "span > div > span > a > span > div > img", 
                            attr: "src"
                        }
                    }
                }
            })
            for (let e = 0; e < ProductsScrapper.data.products.length ; e++){
                let iteme = ProductsScrapper.data.products[e]
                if(iteme.name.length || iteme.url.length){
                    let data = {
                        ...iteme,
                        code : iteme.url.split('/dp/')[1].split('/')[0],
                        category : category._id
                    }
                    console.log(data)
                    let productfind = await Product.findOne({code: data.code }).exec()
                    if(productfind){
                        Product.findByIdAndUpdate({code: data.code},data)
                    }else{
                        let product = new Product(data);
                        product.save()
                    }
                }
            }
        }
    }
    console.log('finalizo el scrapping a products')
}
module.exports = products;