'use strict';

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // Changing nav bar when resize screen
    const openBtn = document.getElementById("openmenu");
    const closeBtn = document.getElementById("closemenu");

    openBtn.addEventListener("click", openmenu);
    closeBtn.addEventListener("click", closemenu);

    //search bar
    if (window.location.href == "file:///Users/phuongvu/Desktop/UW/Winter%202023/CSS%20481/Final%20Project/stock-portfolio-web/html/stockprice.html") {
        //search price    
        const searchPrice = document.getElementById("searchbar-price-button");
        searchPrice.addEventListener("click", handlePriceSubmit);
    }else if (window.location.href == "file:///Users/phuongvu/Desktop/UW/Winter%202023/CSS%20481/Final%20Project/stock-portfolio-web/html/companyinfo.html") {
        //search company info
        const searchInfo = document.getElementById("searchbar-compinfo-button");
        searchInfo.addEventListener("click", handleInfoSubmit);
    } else if (window.location.href == "file:///Users/phuongvu/Desktop/UW/Winter%202023/CSS%20481/Final%20Project/stock-portfolio-web/html/stocknews.html") {
        //search stock news
        const searchNews = document.getElementById("searchbar-news-button");
        searchNews.addEventListener("click", handleNewsSubmit);
    }
}

function openmenu() {
    var sidemenu = document.getElementById("sidemenu");
    sidemenu.style.top = "80px";
}

function closemenu() {
    var sidemenu = document.getElementById("sidemenu");
    sidemenu.style.top = "-500px";
}

function handlePriceSubmit() {
    var input = document.getElementById("searchbar-input");
    var ticker = input.value;
    input.value = "";
    ticker = ticker.toUpperCase();
    fetchPrice(ticker);
}

function handleInfoSubmit() {
    var input = document.getElementById("searchbar-input");
    var ticker = input.value;
    input.value = "";
    ticker = ticker.toUpperCase();
    fetchInfo(ticker);
}

//https://api.polygon.io/v2/reference/news?apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG
async function handleNewsSubmit() {
    let URL = "https://api.polygon.io/v2/reference/news?apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers : {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        }
    };
      
    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            let imgPrev = document.querySelectorAll(".image-preview");
            let imgCard = document.querySelectorAll(".cardimage");
            let title = document.querySelectorAll("div.titlesearch > a");
            let description = document.querySelectorAll(".textsearch");
            let bot = document.querySelectorAll(".bottom");
            let count = 0;
            imgPrev.forEach((img) => {
                img.href= result.results[count].article_url;
                count = count + 1;
            });
            count = 0;
            imgCard.forEach((card) => {
                card.src = result.results[count].image_url;
                count = count + 1;
            });
            count = 0;
            title.forEach((tit) => {
                tit.innerText = result.results[count].title;
                count = count + 1;
            });
            count = 0;
            description.forEach((des) => {
                des.innerHTML = result.results[count].description;
                count = count + 1;
            });
            count = 0;
            bot.forEach((bottom) => {
                let num = 0;
                let html = ``;
                for (let tick of result.results[count].tickers) {
                    if (num < 8) {
                        html += `<span class="bottomticker">${tick}</span>`;
                    }
                    num = num + 1;
                }
                let pub = result.results[count].publisher.name;
                let author = result.results[count].author;
                let time = result.results[count].published_utc;
                html += `<span class="bottomsearchtext">${pub} | ${author} | ${time}</span>`;
                bottom.innerHTML = html;
                count = count + 1;
            });
        })
        .catch(error => console.log('error', error));
}

// API Key: Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG
//https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG
async function fetchPrice(ticker) {
    let base = "https://api.polygon.io/v2/aggs/ticker/";
    let URL = base + ticker + "/prev?adjusted=true&apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers : {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        }
    };
      
    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById("price-ticker-name").innerHTML = result.results[0].T;
            document.getElementById("price-open").innerHTML = result.results[0].o;
            document.getElementById("price-close").innerHTML = result.results[0].c;
            document.getElementById("price-highest").innerHTML = result.results[0].h;
            document.getElementById("price-lowest").innerHTML = result.results[0].l;
            document.getElementById("price-transaction-num").innerHTML = result.results[0].n;
            document.getElementById("price-trade-volumn").innerHTML = result.results[0].v;
            document.getElementById("price-vw").innerHTML = result.results[0].vw;
        })
        .catch(error => console.log('error', error));
}

//https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG
async function fetchInfo(ticker) {
    let base = "https://api.polygon.io/v3/reference/tickers/";
    let URL = base + ticker + "?apiKey=Y7KRszwLIhoC8mM2ZR3TYSodZKYX3VNG";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers : {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        }
    };
      
    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => {
            let address1 = result.results.address.address1;
            let city = result.results.address.city;
            let state = result.results.address.state;
            let zip = result.results.address.postal_code;
            document.getElementById("company-name").innerHTML = result.results.name;
            document.getElementById("company-description").innerHTML = result.results.description;
            document.getElementById("company-address").innerHTML = "" + address1 + ", " + city + ", " + state + " " + zip;
            document.getElementById("company-phone").innerHTML = result.results.phone_number;
            document.getElementById("company-web").innerHTML = result.results.homepage_url;
            document.getElementById("company-employee").innerHTML = result.results.total_employees;
            document.getElementById("company-sic-des").innerHTML = result.results.sic_description;
            document.getElementById("company-ticker").innerHTML = result.results.ticker;
            document.getElementById("company-primary").innerHTML = result.results.primary_exchange;
            document.getElementById("company-first-list").innerHTML = result.results.list_date;
            document.getElementById("company-market-cap").innerHTML = result.results.market_cap;
            document.getElementById("company-outstanding-share-num").innerHTML = result.results.share_class_shares_outstanding;
            document.getElementById("company-weighted-outstanding-share-num").innerHTML = result.results.weighted_shares_outstanding;
        })
        .catch(error => console.log('error', error));
}