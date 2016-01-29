![esko](https://www.esko.com/design/esko/img/logo-esko-new.png "Esko") Service Cloud scripts
====== 
## A few userscripts  to workaround ServiceCloud's annoyances in Esko's support environment ##

These scripts will be useful for anyone at esko being annoyed by ServiceCloud's limitations (_at least that's the hope_).

The scripts are what is called "userscripts". This is a specfic type of JavaScript, meant to be exectuted via a browser extension and that can interact with and/or modify web pages.

Their use is recommended via these extensions:
+ TamperMonkey :thumbsup: (Chrome, Safari, Opera) see http://tampermonkey.net/
+ Greasemonkey :thumbsup: (Firefox) see https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
+ NinjaKit (Chrome, Opera) see https://github.com/os0x/NinjaKit

In theory, modern extensions should detect the script as userscript if you click on the install links (:floppy_disk:) on this page and offer to install the script. On the other hand, the view link (:page_with_curl:) will take you to the beautified source code.

***

###At the moment we have the following scripts:
+ ServiceCloud Refresh List [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Refresh List.user.js "Install the script") [:page_with_curl:](./ServiceCloud Refresh List.user.js "See the source")
  ------

  **description:** refreshes any list view every 30 sec (configurable via a smal edit in the script)
  
  **status:** :heavy_check_mark: _(working fine)_
  
  **todo:** add a GUI for config


+ ServiceCloud Local Links [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Local Links.user.js "Install the script") [:page_with_curl:](./ServiceCloud Local Links.user.js "See the source")
  ------

  **description:**changes jobfolder links to direct system links (file:// or smb://)
  
  **status:** :heavy_check_mark: _(working fine)_
  
  **todo:** more testing

+ ServiceCloud Multi Downloader [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Multi Downloader.user.js "Install the script") [:page_with_curl:](./ServiceCloud Multi Downloader.user.js "See the source")
  ------

  **description:**allows for downloading all of the of attachements from an email view in one click
  
  **status:** :wavy_dash: _**(work in progress, may be unstable)**_
  At the moment, this works only with Chrome, Safari will open tabs and Firefow won't do a thing. 
  
  **todo:** support for other browsers => if anyone has experience with GreaseMonkey's GM_download or with this polyfill https://gist.github.com/ccloli/832a8350b822f3ff5094 I'd be interested.

+ ServiceCloud Email Signature [:floppy_disk:](https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud Email Signature.user.js "Install the scripts") [:page_with_curl:](./ServiceCloud Email Signature.user.js "See the source")
  ------

  **description:**automatically adds a signature in a mail composer
  
  **status:** :heavy_multiplication_x: _**(work in progress, doesn't work at all)**_
  
  **todo:** make it work

***
  
  
  
This is a secret _ninja_ project brought to you by bevi@esko.com
