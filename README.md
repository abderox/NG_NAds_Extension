# NG_NAds (No gain, no ads) Chrome Extension

<p
align="center"
>
<img
src="./icons/icon128.png"
alt="NG_NAds"
width="200"
/>

This extension can be useful for those who wish to remove advertisements from webpages for a cleaner and more focused browsing experience.
Can be benificial to block websites providing adult content.

## Features

- Removes ads elements (of course not  all of them)
- Provides a cleaner and more focused browsing experience
- Filters serving ads domains (preventing redirection)
- Blocks websites offering explicit content services (more than 500 websites included)

## Installation

1. Download the NG_NAds extension.
2. Open Google Chrome and go to chrome://extensions.
3. Enable Developer mode.
4. Click on "Load unpacked" and select the folder containing the extension.

## Usage

1. Navigate to a webpage.
2. The extension will automatically remove elements with "ad" in their classes.


## Demo

- _Before enabling extension_
  
<p
align="center"
>
<img
src="./github/before.png"
alt="before"
/>

- _After enabling extension_

<p
align="center"
>
<img
src="./github/after.png"
alt="after"
/>


[![Watch the video](./github/Screenshot.png)](./github/video.mp4)



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
If you want to update data , just append to the list in `script.js`.

```javascript
query_select_all(
        'div[class$="_ad',
        'div[class^="ad_',
        'div[class*="ad_',
        '...'
    );
```

```Disclaimer```
- This extension is not intended to be used for malicious purposes. The author is not responsible for any damages caused by the use of this extension.
- This extension may result in slow performance.
- Keep in mind that I am still a student , so don't judge my code please.



## License

[MIT](license.txt)
