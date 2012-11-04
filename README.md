Squiz Matrix File Upload Plugin
=============

Sick and tired of only being able to upload 1 file at a time using an Asset Builder in Squiz Matrix? With this plugin, you get Facebook style multiple file upload capabilities!

![Mat](http://f.cl.ly/items/0f121Q261c1S421m343y/matrix-upload.jpg "ZSPinAnnotation")

How It Works
---

Use jQuery to target a blank div, in this example we use #upload:

```javascript
$(function(){
  
	// Add the uploader
	$('#upload').matrixMultiFileUpload({
		assetId: 			'103593',// Asset ID of the Asset Builder that will create the Image
		assetBuilderUrl: 	'%globals_asset_url:103593%',// Asset Builder URL
		swfUrl: 			'%globals_asset_url:103611%',// URL to SWFUpload file
		buttonImageUrl: 	'%globals_asset_url:56731%'// URL to the upload button image
	});
	
});
```
