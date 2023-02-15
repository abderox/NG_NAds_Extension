/**
 * @author : https://github.com/abderox
 * @Extension_Name : NG_NAds (No gain , no ads)
 * @Version : 1.0.0
 */


try {

    chrome.action.onClicked.addEventListner((tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['script.js'],
        });
    }
    )

} catch (error) {
    console.log(error);
}





const serving_ad_domains = [
    'doubleclick.net',
    'googlesyndication.com',
    'googleadservices.com',
    'adnxs.com',
    'adzerk.net',
    'rubiconproject.com',
    'openx.net',
    'pubmatic.com',
    'appnexus.com',
    'criteo.com',
    'taboola.com',
    'outbrain.com',
    'amazon-adsystem.com',
    'connatix.com',
    'distroscale.com',
    'freestar.com',
    'liveramp.com',
    'mediavine.com',
    'onetag.com',
    'sharethrough.com',
    'triplelift.com',
    'yieldmo.com',
    'yieldlab.net',
    'zedo.com'
];





// ! old version 2
// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//       if (details.initiator === undefined || details.initiator === null) {
//         // Block the request if it was not initiated by the user
//         return { cancel: true };
//       }

//       // Check if the request is for an ad-serving domain
//       var adDomainRegex = new RegExp('^https?://([^.]+\\.)?(' + serving_ad_domains.join('|') + ')/.*$');
//       if (adDomainRegex.test(details.url)) {
//         // Block the request if it matches an ad-serving domain
//         return { cancel: true };
//       }
//     },
//     {urls: ["<all_urls>"]},
//     ["blocking"]
//   ); 

// function hashCode(str) {
//     // A simple hash function to generate a unique identifier for each domain
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//         hash = ((hash << 5) - hash) + str.charCodeAt(i);
//         hash |= 0;
//     }
//     return hash;
// }

String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}


// chrome.declarativeNetRequest.getDynamicRules(rules => {
//     const existingDomains = new Set();
//     for (const rule of rules) {
//         const filter = rule.condition.urlFilter;
//         const matches = filter.match(/^https?:\/\/([^/]+)/);
//         if (matches) {
//             existingDomains.add(matches[1]);
//         }
//     }

//     const newRules = [];
//     serving_ad_domains.forEach(domain => {
//         if (!existingDomains.has(domain)) {
//             const id = Math.floor(Math.random() * 1e9);
//             const rule = {
//                 id,
//                 priority: Math.floor(Math.random() * 99999),
//                 action: { type: 'block' },
//                 condition: {
//                     urlFilter: `*://${domain}/*`,
//                     initiator: {
//                         type: 'user'
//                     }
//                 }

//             };
//             newRules.push(rule);
//         }
//     });

//     if (newRules.length > 0) {
//         chrome.declarativeNetRequest.updateDynamicRules({ addRules: newRules }, () => {
//             console.log('Rules updated.');
//         });
//     }
// });


const filter = ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket', 'other']



chrome.declarativeNetRequest.getDynamicRules((rules) => {
    const existingDomains = new Set();
    for (const rule of rules) {
        const filter = rule.condition.urlFilter;
        const matches = filter.match(/^https?:\/\/([^/]+)/);
        if (matches) {
            existingDomains.add(matches[1]);
        }
    }

    const newRules = serving_ad_domains.filter(domain => !existingDomains.has(domain)).map((domain, index) => {
        return {
            id: Math.floor(Math.random() * 1e9),
            priority: Math.floor(Math.random() * 99999),
            action: { type: 'block' },
            condition: {
                urlFilter: `*://${domain}/*`,
            }
        };
    });

    fetch('./sites_json.json')
        .then(response => response.json())
        .then(data => {

            console.log(data.length)
            const rules = data.filter(site => !existingDomains.has(site.domain)).map((site, index) => {
                return {
                    id: Math.floor(Math.random() * 1e9),
                    priority: Math.floor(Math.random() * 999999),
                    action: {
                        type: 'redirect',
                        redirect: { url: 'https://www.youtube.com/watch?v=MrSGjDpfGcA' }
                    },
                    condition: {
                        urlFilter: `*://${site}/*`,
                        resourceTypes: filter
                    }
                };
            });
            newRules.push(...rules);

            if (newRules.length > 0) {
                chrome.declarativeNetRequest.updateDynamicRules({ addRules: newRules }, () => {
                    console.log('Rules added.');
                });
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });


});


