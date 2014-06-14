
    var dataToWrite;                        // JSON Data which needs to be write to disk
    var toShowCategories= false;            // Flag used to check weather we need to redirect to showcategories page or just write data to disk.
    var jsonFileData;                       // JSON Data which needs to be write to disk
    var deleteFileName;                     // Global Error Handler
   // window.appRootDirName = "Bhavya";
var dwnldData;


function errorFileSystem(event) {
	console.log('Error:' + event.code + "\n" + event.source);
}


/***************************************************/
//Code starting to write to the data.json file..
/***************************************************/

function getFileSystemRefForWriting(data) {
	console.log('inside getFileSystemRef');
	//alert("WRITING");
    
    dataToWrite = data;
    
    
	//console.log("=======================****" + JSON.stringify(data));
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotRssFileSystem, errorFileSystem);
}

function gotRssFileSystem(fileSystemToWrite) {
	
    fileSystem = fileSystemToWrite;
	console.log('inside gotRssFileSystem');
    
	fileSystem.root.getFile("data.json", {
		create : true,
		exclusive : false
	}, writeDataToRSSFile, errorFileSystem);

}

function writeDataToRSSFile(fileEntry) {
	//console.log("fileEntry:" + fileEntry);
	fileEntry.createWriter(gotRSSFileWriter, errorFileSystem, false);

}

function gotRSSFileWriter(writer) {
	//console.log('gotFileWriter !');
    
    //alert('data to write');
	writer.onwriteend = function(evt) {
		//console.log("write success");
		//alert('data has written Finaly :\n \n '+JSON.stringify(dataToWrite));
        dataToWrite = null;
        
	};
	//console.log("Length = " + writer.length);
	//console.log("Position = " + writer.position);
	writer.seek(0);
	writer.onerror = errorFileSystem;
	writer.write(JSON.stringify(dataToWrite));
     //alert('****** has written Finaly :\n \n '+JSON.stringify(dataToWrite));
}



/**************************************************************************************************/

function getFileSystemRefForWritingDownload(data) {
	dwnldData = data;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotRssFileSystemDownload, errorFileSystem);
    
}

function gotRssFileSystemDownload(fsWrite) {
	fsWrite.root.getFile("download.json", {
                         create : true,
                         exclusive : false
                         }, writeDataToRSSFileDownload, errorFileSystem);
    
}

function writeDataToRSSFileDownload(fileEntry) {
    fileEntry.createWriter(gotRSSFileWriterDownload, errorFileSystem, false);
    
}

function gotRSSFileWriterDownload(writer) {
	writer.onwriteend = function(evt) {
		
		dwnldData = null;
        console.log("dwnldData----"+JSON.stringify(dwnldData));

        
	};
	writer.seek(0);
	writer.onerror = errorFileSystem;
	writer.write(JSON.stringify(dwnldData));
    //alert('****** has written Finaly :\n \n '+JSON.stringify(dataToWrite));
}


/***************************************************/
//Code starting to ready from the data.json file..
/***************************************************/

function getFileSystemRefForReading(showCategories, data) 
{
    toShowCategories = showCategories;
    
    //alert('vikraaaaaaam '+toShowCategories);
    if(!toShowCategories) {
        console.log('toShowCategories= '+toShowCategories)
        
        //alert('in the isShowCategory :'+toShowCategories);
        //alert('Data assign JSON DATA -->\n\n'+JSON.stringify(data));
        
        dataToWrite = data; 
    }
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFileEntryForReader, errorFileSystem);
}

function getFileEntryForReader(fileSystemForRead) {
	console.log('inside getFileEntryForReader');
	fileSystemForRead.root.getFile("data.json", null, readRSSFileData, errorFileSystem);
}

function readRSSFileData(fileReaderEntry) {
	console.log('In readRSSFileData.');
	fileReaderEntry.file(gotReadRssFile, errorFileSystem);

}

function gotReadRssFile(file) {
	console.log('In gotReadRssFile.');
	readRSSFileJSON(file);
}

function readRSSFileJSON(file) {
    
	console.log('In readRSSFileJSON.');
    
   // alert('file data got after offline :'+JSON.stringify(file));
    
	var reader = new FileReader();
	reader.onloadend = function(evt) {
	
    //console.log("Read as data text");
    //console.log(evt.target.result);
		
    
        try{
                var obj = $.parseJSON(evt.target.result);
        }
        catch(error)
        {
            alert('in catch block of------>>>>');
        }
        
       // console.log("===========================*&*&" + JSON.stringify(obj));
        
        if(toShowCategories) {
           //showCategoriesList(obj);
            
            createJsonFormatOffline(obj);
            showCategoriesListsagar(obj); 
            
            console.log('jsonData.loggedUserName :'+jsonData.loggedUserName);
            document.getElementById("lblUserName").innerHTML = (jsonData.loggedUserName).replace(/\_/g,'.');
            
            //alert('---->'+JSON.stringify(obj));
            
        }else{
            jsonFileData = obj;
            
            if(jsonFileData){
               //console.log(jsonFileData);
               //alert('online and then compare :'+jsonFileData);                   // online
                
                compareAndUpdateJSON1(obj);        // mainpageload.js page
                
                //getFileSystemRefForWriting(obj);
                //compareAndUpdateJSON1();
                
            }else {                             // id json file is empty
                //alert('empty json :'+jsonFileData);
                
                console.log('------>>>> Empty JSON Data : Login First Time ------->>>>>>');
                
                startThumbnailDownload();
                
                if(!toShowCategories) {
                 // alert('DDDD');
                    getFileSystemRefForWriting(dataToWrite);
                }
            }
        }
		
	};
	reader.readAsText(file);
}
/***************************************************/
//Code to download media content..
/***************************************************/



function gotFSDownloadMain(fileSystemDownload) {
    console.log("filesystem got main download");
    window.fileSystem = fileSystemDownload;
    fileSystem.root.getDirectory("Videos", {
                                 create : true,
                                 exclusive : false
                                 }, dirReadyMain, errorFileSystem);
}

function dirReadyMain(entry) {
    window.appRootDir = entry;
    console.log("************************************application dir is ready************************************");
    
}


/***************************************************/
//Code to delete file..
/***************************************************/



function deleteFile(fileName){
    
    deleteFileName = fileName;
    console.log("deleteFileName :-->"+deleteFileName);
    
    if(device.platform == "Android"){
    	window.resolveLocalFileSystemURI(deleteFileName, deleteFileByFile, errorDeleteFileSystem);
    }else {
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, doDeleteFile, errorFileSystem);
    }
}

function doDeleteFile(fileSystem) {
    //alert("inside doDeleteFile");
    fileSystem.root.getFile(deleteFileName, null, deleteFileByFile , errorFileSystem);
}


function deleteFileByFile(file) {
    
    //alert("inside deleteFileByFile");
    file.remove(function() {
        deleteFileName = "";
        jAlert('File deleted successfully.', 'Tech Time');
        //updateListAfterDelete();
    },errorDeleteFileSystem);
    
  //  $.mobile.changePage("#detailMediaPage");
    
    
}


function errorDeleteFileSystem(event) {
    jAlert('Error while deleting File. Please retry again.', 'Tech Time');
	//alert('Error while deleting File. Please retry again.'+JSON.stringify(event));
}


function readDataUrl(file) {
    
    //alert('inside read data file')
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        //alert("Read as data URL");
        //alert(evt.target.result);
    };
    reader.readAsDataURL(file);
}

