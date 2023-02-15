/**
 * @author : https://github.com/abderox
 * @Extension_Name : NG_NAds (No gain , no ads)
 * @Version : 1.0.0
 */


const query_select_all = (...array_of_strings) => {
    var all = [];
    array_of_strings.forEach(element => {
        var temp = document.querySelectorAll(element);
        all = all.concat(temp);
    });
    return all;
}



function start_removig_ads() {
    'use strict';
    query_select_all(
        'div[class$="_ad',
        'div[class^="ad_',
        'div[class*="ad_',
        'div[class*="_ad',
        'div[class*="_ad_',
        'iframe[class^="ad_',
        'iframe[class$="_ad',
        'iframe[class*="ad_',
        'iframe[class*="_ad',
        'iframe[class*="_ad',
        'iframe[class*="ad_',
        'iframe[class*="_ad_',
        'iframe[src*="googleads',
        'iframe[src*="doubleclick',
        'iframe[src*="adnxs',
        'div[class*="Sponsored',
        'div[class*="sponsored',
        'div[class*="Sponsor',
        'div[class*="sponsor',
        'div[class*="Sponsorship',
        'div[class*="sponsorship',
        'div[id*="_ad"]',
        'div[id*="ad_"]',
        'div[id*="_ad_"]',
        'iframe[id*="_ad"]',
        'iframe[id*="ad_"]',
        'iframe[id="ad"]',
        'iframe[class="ad"]',
        'div[id="ad"]',
        'div[class="ad"]',
        'iframe[id*="_ad_"]',
        'div[class*="ad-"]',
        'div[id*="ad_"]',
        'iframe[autoplay]',
        'iframe[allow="autoplay"]',
        'iframe[allow="autoplay;"]',
        'iframe[allow="autoplay; fullscreen"]',
        'iframe[allow="autoplay; fullscreen;"]',
        'iframe[allow="autoplay; fullscreen; encrypted-media"]',
        'iframe[allow="autoplay; fullscreen; encrypted-media;"]',
        'iframe[allow="autoplay; fullscreen; encrypted-media; picture-in-picture"]',
        'iframe[allow="autoplay; fullscreen; encrypted-media; picture-in-picture;"]',
        'iframe[allow*="picture-in-picture;"]',
        'iframe[allow*="picture-in-picture"]',
        'iframe[allow*="autoplay"]',
        'iframe[allow*="autoplay;"]',
        'section[class*="_ad"]',
        'section[id*="_ad"]',
        'section[class*="ad_"]',
        'section[id*="ad_"]',
        'section[class*="_ad_"]',
        'section[id*="_ad_"]',
        'section[class*="video-player"]',
        'section[id*="video-player"]',
        
    ).forEach(element => {
        if (element) {
            element.forEach(item => {
                if (item) {
                    if (
                        item.parentNode
                    ) {
                        item.parentNode.removeChild(item);
                    }
                    else {
                        item.remove();
                    }
                }

            });
        }
    });


    // check if the link is youtube
    // if (window.location.href.includes('youtube')) {

    //     query_select_all(
    //         'ytd-compact-promoted-video-renderer',
    //         'ytd-promoted-video-renderer',
    //         'ytd-promoted-sparkles-web-renderer',
    //         'ytd-promoted-sparkles-text-renderer'
    //     ).forEach(element => {

    //         if (element) {
    //             element.forEach(item => {
    //                 if (item) {
    //                     if (
    //                         item.parentNode
    //                     ) {
    //                         item.parentNode.removeChild(item);
    //                     }
    //                     else {
    //                         item.remove();
    //                     }
    //                 }

    //             });
    //         }
    //     });

    // }



}

start_removig_ads();

timeout = null;
document.addEventListener("DOMSubtreeModified", function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        if (!window.location.href.includes('youtube')) {
        start_removig_ads();
        }
    }, 1000);
}, false);








