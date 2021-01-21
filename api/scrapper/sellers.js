const scrapeIt = require("scrape-it")
// Load Seller model
const Seller = require("../models/Seller");
const sellers = async () => {
    const PAGES = 25
    console.log('Se inicio el scraping a sellers')
    for(let a = 0; a < PAGES; a++){
        let page = `&page=${a+1}`
        const BASE_URL = 'https://www.sellerratings.com'
        const BASE_AMAZON_URL = 'https://www.amazon.com/sp?seller='
        // Promise interface
        const URL = BASE_URL + '/amazon/usa?sort=feedback_lifetime'+page
        let SellersScrapper = await scrapeIt(URL, {
            sellers: {
                listItem: 'tbody > tr',
                data: {
                    name:'a',
                    url: {
                        selector: "a", 
                        attr: "href"
                    },
                    ranking:{
                        listItem:'td.number'
                    }
                }
            }
        });
        console.log(`Encontrados en: ${a+1}` ,SellersScrapper.data.sellers.length)
        let map = []
        for(let i = 0; i < SellersScrapper.data.sellers.length; i++){
            let item = SellersScrapper.data.sellers[i]
            console.log('vuelta: ',i+1)
            console.log('url: '+ BASE_URL + item.url)
            if(item.name.length > 0){
                const URL_P = BASE_URL + item.url
                let IdScrapper = await scrapeIt(URL_P, {
                    content: {
                        listItem:'div.content > .grid',
                        data:{
                            url:{
                                selector:'a',
                                attr:'href'
                            }
                        }
                    },
                });
                let ID_URL = IdScrapper.data.content.find(item => item.url.length > 1)
                if(ID_URL){
                    console.log('encontro el id',BASE_AMAZON_URL + ID_URL.url.split('=')[1])
                    let AmazonScrapper = await scrapeIt(BASE_AMAZON_URL + ID_URL.url.split('=')[1], {
                        th : {
                            listItem:'#feedback-summary-table > tr > th'
                        },
                        td : {
                            listItem:'#feedback-summary-table > tr > td'
                        }
                    });
                    var summary = {
                        positive:{},
                        neutral:{},
                        negative:{},
                        count:{}
                    }
                    AmazonScrapper.data.td.forEach( ( item ,index ) => {
                        if(index == 1){
                            summary.positive.treinta = item
                        }
                        if(index == 2){
                            summary.positive.noventa = item
                        }
                        if(index == 3){
                            summary.positive.anual = item
                        }
                        if(index == 4){
                            summary.positive.vida = item
                        }
                        if(index == 6){
                            summary.neutral.treinta = item
                        }
                        if(index == 7){
                            summary.neutral.noventa = item
                        }
                        if(index == 8){
                            summary.neutral.anual = item
                        }
                        if(index == 9){
                            summary.neutral.vida = item
                        }
                        if(index == 11){
                            summary.negative.treinta = item
                        }
                        if(index == 12){
                            summary.negative.noventa = item
                        }
                        if(index == 13){
                            summary.negative.anual = item
                        }
                        if(index == 14){
                            summary.negative.vida = item
                        }
                        if(index == 16){
                            summary.count.treinta = item
                        }
                        if(index == 17){
                            summary.count.noventa = item
                        }
                        if(index == 18){
                            summary.count.anual = item
                        }
                        if(index == 19){
                            summary.count.vida = item
                        }
                    })
                    let data = {
                        name:item.name,
                        url:BASE_AMAZON_URL + ID_URL.url.split('=')[1],
                        ranking:item.ranking[1].split(',').join(''),
                        id:ID_URL.url.split('=')[1],
                        summary:summary
                    }
                    let sellerfind = await Seller.findOne({id:data.id}).exec()
                    if(sellerfind){
                        Seller.findByIdAndUpdate({id:data.id},data)
                    }else{
                        let seller = new Seller(data);
                        seller.save()
                    }
                }
            }
        }
    }
    console.log('finalizo el scraping')
    return map
}
module.exports = sellers;