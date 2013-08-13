Squiz Matrix Multiple File Upload Plugin
=============

Sick and tired of only being able to upload 1 file at a time using an Asset Builder in Squiz Matrix? With this plugin, you get Facebook style multiple file upload capabilities!

![Mat](http://f.cl.ly/items/2m2Q1V0g0W3D1Z1n091F/Screen%20Shot%202013-02-06%20at%2011.27.44%20AM.png "Matrix Upload")
![Mat2](http://f.cl.ly/items/120K0F2v1T0q1V1e0s3w/Screen%20Shot%202013-02-06%20at%2011.20.15%20AM.png "File Upload")

Upload Files
---

 - jquery.matrixMultiFileUpload.js 
 - swfupload.swf 
 - upload.png (Or your own
   upload button image)

Create Assets
---

 - Create a Standard Page asset
 - Create an Asset Builder
 - Configure asset builder to create your file type and set the create location to where ever you want the files uploaded. (This can also be dynamic)
 - Make the Asset Builder Live and give it Public Read permissions. (You can use the logged in body copy to prevent the public from using the asset builder)
 - Add `<div id="created">%created_asset_url%</div>` to the `Created` bodycopy of the Asset Builder. (If you are uploading images)
 - Add `<div id="upload-errors">%create_error%</div>` to the `Logged in` bodycopy to catch and display errors from Matrix (mainly caused by problems)

Standard Page
---

Make sure to use `script` tags for jQuery and `jquery.matrixMultiFileUpload.js` and then insert the `matrixMultiFileUpload` function:

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script src="path/to/jquery.matrixMultiFileUpload.js"></script>
<script type="text/javascript">
$(function(){
  
	// Add the uploader
	$('#upload').matrixMultiFileUpload({
		assetBuilderId: 	'103593',// Asset ID of the Asset Builder that will create the file
		assetBuilderUrl: 	'%globals_asset_url:103593%',// Asset Builder URL
		swfUrl: 			'%globals_asset_url:103611%',// URL to SWFUpload file
		buttonImageUrl: 	'%globals_asset_url:56731%',// URL to the upload button image
		assetType:			'pdf_file'// Optional parameter for file type, defaults to image
	});
	
});
</script>
<div id="upload"></div>
```

Preview
---

Preview the Standard Page and you should see the upload button. Click this and then you can select multiple files (holding down shift) and upload them!
