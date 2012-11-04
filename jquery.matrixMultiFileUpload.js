/**
* Squiz Matrix Multiple File Upload (jquery.matrixMultiFileUpload.js)
* version: 0.1 (OCT-29-2012)
* Copyright (C) 2012 Zed Said Studio
* @requires jQuery v1.3 or later
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/


(function( $ ){

	$.fn.matrixMultiFileUpload = function(options) {  
	
		// User changeable defaults
		var defaults = {
			assetId: 			'',
			assetBuilderUrl: 	'',
			assetType:			'image',
			swfUrl: 			'',
			buttonImageUrl: 	'',
			buttonWidth: 		66,
			buttonHeight: 		22,
			onComplete: function () {}
		};
	
		var options = $.extend(defaults, options);
		var _this = this;

		return _this.each(function() {
			
			// Helper stuff
			$(this).before('<p><input type="button" id="createButton" /></p>');
			$(this).append('<div class="log"></div>');
			$(this).before('<div id="holder"></div>');
			var h = $('#holder');
			var i = 1;
			var a = 1;
			var boxWidth = 160;
			
			// Number of files
			var numberOfFiles;
			h.prepend('<p id="numFiles"></p>');
			var n = $('#numFiles');
								
			// Multiple File upload
			var listeners = {
				swfuploadLoaded: function(event) {
					
				},
				fileQueued: function(event, file){
					
					// Add a blank image box
					h.append('<div id="item'+a+'" style="float:left; padding:6px; width:'+boxWidth+'px"><div class="imageHolder" style="height:120px; width:'+boxWidth+'px; overflow:hidden;"></div></div>');
					
					// Create the upload elements
					var imageItem = $('#item'+a);
					imageItem.append('<div class="barHold" style="height: 10px; width: '+boxWidth+'px; background-color: #fff; border:1px solid #a4a4a4; margin: 2px 0;"><div class="progress" style="height: 10px; width: 0%; background-color: #6d84b4;"></div></div>');
					a++;
					
					// Start the upload
					$(this).swfupload('startUpload');
				},
				fileQueueError: function(event, file, errorCode, message){
					$('.log', this).append('<li>File queue error - '+message+'</li>');
				},
				fileDialogStart: function(event){
				},
				fileDialogComplete: function(event, numFilesSelected, numFilesQueued){
					numberOfFiles = numFilesSelected;
					n.text('0 of '+numberOfFiles+' uploaded');
				},
				uploadStart: function(event, file){
					// don't start the upload if this queue is disabled
					if ($('input[name=disabled]:checked', this).length) {
						event.preventDefault();
					}
				},
				uploadProgress: function(event, file, bytesLoaded){
					
					// Progress selector
					var p = '#item'+i+' .progress';
					var percent = parseInt(100 / file.size * bytesLoaded);
					$(p).css('width', percent + '%');
					
				},
				uploadSuccess: function(event, file, serverData){
					// Find the server data image url
					var url = $('<div>'+serverData+'</div>').find('#created').text();
					//$('.log', this).append('<li>'+url+': file '+file.name+' index: '+i+'</li>');
					// Create an image
					var sel = '#item'+i+' div.imageHolder';
					//console.log(sel);
					$(sel).html('<img style="height:auto; width:'+boxWidth+'px;" src="'+url+'" />');
					
					// If we are not done, just make it 100%
					// Progress selector
					var p = '#item'+i+' .progress';
					var percent = 100;
					$(p).css('width', percent + '%');
					
					// Let the users know we uploaded one
					n.text(i+' of '+numberOfFiles+' uploaded');
					
					i++;
					
				},
				uploadComplete: function(event, file){
					// upload has completed, lets try the next one in the queue
					$(this).swfupload('startUpload');
		
				},
				uploadError: function(event, file, errorCode, message){
					$('.log', this).append('<li>Upload error - '+message+' code: '+errorCode+'</li>');
				}
			}; 
		
			$(this).bindAll(listeners);
								
			var action = "AB_"+defaults.assetId+"_ASSET_BUILDER_ACTION";
			var type = "AB_"+defaults.assetId+"_ASSET_BUILDER_CREATE_TYPE";
			
			// Create the post params object
			var params = {};
			params[action] = "create";
			params[type] = defaults.assetType;
			params["asset_action"] = 'create';
			params["asset_ei_screen"] = "details";
			params["sq_lock_release"] = "1";
			params["sq_link_path"] = "";
			params["sq_commit_button"] = "Submit";
			
			// Create the swf object
			$(this).swfupload({
				file_post_name: 'image_0',
				post_params : params,
				upload_url: defaults.assetBuilderUrl,
				file_size_limit : "110240",
				file_types : "*.*",
				file_types_description : "All Files",
				file_upload_limit : "0",
				flash_url : defaults.swfUrl,
				button_image_url : defaults.buttonImageUrl,
				button_width : defaults.buttonWidth,
				button_height : defaults.buttonHeight,
				button_placeholder : $('#createButton')[0],
				button_cursor:SWFUpload.CURSOR.HAND,
				debug: false
			});
		
		});//end each
		
	};//end plugin
	
	
	jQuery.fn.bindAll = function(options) {
		var $this = this;
		jQuery.each(options, function(key, val){
			$this.bind(key, val);
		});
		return this;
	}
	
})( jQuery );
