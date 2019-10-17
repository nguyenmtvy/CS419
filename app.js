var Crawler = require("js-crawler");
 
var crawler = new Crawler().configure({ignoreRelative: false, depth: 1});

var cherrio = require("cheerio");

var includes = require("array-includes");
 
stopwordList = require("./src/list.js");

    crawler.crawl({
        url: "https://github.com",
        success: function(page) {
          const $ = cherrio.load(page.content)
          console.log($("a").text());
          filterStopword($("a").text());
        },
        failure: function(page) {
          //console.log(page.status);
        },
        finished: function(crawledUrls) {
          //console.log(crawledUrls);
        }
      });

// export async function loadPage() {
//     var crawler = new Crawler("http://www.example.com/");
  
//       const searchUrl = `https://github.com`;
//       const response = await fetch(searchUrl);
//       const htmlString = await response.text();
//       const $ = cherrio.load(htmlString);
   
//       //return $("a").text();
//           // .map((_, li) => ({
//           // asin: $(li).data("asin"),                   
//           // title: $("h2", li).text(),                
//           // price: $("span.a-color-price", li).text(),
//           // rating: $("span.a-icon-alt", li).text(),
//           // imageUrl: $("img.s-access-image").attr("src")
//           // }));
//       return filterStopword($('a').text());
//   }
function filterStopword(text) {
    var my_str = text.split(" ");
    var filterd_str = [];
    for (i=0; i<my_str.length; i++){
        if (!includes(stopwordList, my_str[i]) && !includes(filterd_str, my_str[i])){
        filterd_str.push(my_str[i]);
        }
    }
    console.log(filterd_str.join(''));
    return filterd_str.join(' ');
}
