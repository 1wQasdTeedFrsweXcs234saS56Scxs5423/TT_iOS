var dataToWrite;
var toShowCategories= false;
var jsonFileData;
var deleteFileName;
var dwnldData;
var lastPageOpen;

function errorFileSystem(event) {
	console.log('Error:' + event.code + "\n" + event.source);
}

function getFileSystemRefForWriting(data) {
    dataToWrite = data;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotRssFileSystem, errorFileSystem);
}
function gotRssFileSystem(fileSystemToWrite) {
	
    fileSystem = fileSystemToWrite;
	fileSystem.root.getFile("data.json", {
		create : true,
		exclusive : false
	}, writeDataToRSSFile, errorFileSystem);

}

function writeDataToRSSFile(fileEntry) {
	fileEntry.createWriter(gotRSSFileWriter, errorFileSystem, false);
}

function gotRSSFileWriter(writer) {
	writer.onwriteend = function(evt) {
        dataToWrite = null;
	};
	writer.seek(0);
	writer.onerror = errorFileSystem;
	writer.write(JSON.stringify(dataToWrite));
    
}


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
	};
	writer.seek(0);
	writer.onerror = errorFileSystem;
	writer.write(JSON.stringify(dwnldData));
}

function getFileSystemRefForReading(showCategories, data) 
{
    toShowCategories = showCategories;
    
    if(!toShowCategories) {    
        dataToWrite = data; 
    }
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFileEntryForReader, errorFileSystem);
}

function getFileEntryForReader(fileSystemForRead) {
	fileSystemForRead.root.getFile("data.json", null, readRSSFileData, errorFileSystem);
}

function readRSSFileData(fileReaderEntry) {
	fileReaderEntry.file(gotReadRssFile, errorFileSystem);

}

function gotReadRssFile(file) {
	readRSSFileJSON(file);
}

function readRSSFileJSON(file) {
    
	var reader = new FileReader();
	reader.onloadend = function(evt) {
        try{
                var obj = $.parseJSON(evt.target.result);
                if(isOnline)
                {
                    if(obj.offlineSubscriptionAction.length == 1)
                    {
                        if(typeof(obj.offlineSubscriptionAction[0]) != 'undefined')
                        {
                            postJSONData(obj.offlineSubscriptionAction[0], "subscribedOffline");
                        }
                        
                    }
                }
                
        }
        catch(error)
        {
        }
        
        if(toShowCategories) {
            createJsonFormatOffline(obj);
            showCategoriesListsagar(obj);
            document.getElementById("lblUserName").innerHTML = (jsonData.loggedUserName).replace(/\_/g,'.');
            lastPageOpen = window.localStorage.getItem("currentPage");
            
            
            if(lastPageOpen == "" || lastPageOpen == null)
            {
                lastPageOpen = 'businessCategory';
                $.mobile.changePage("#businessCategory");
            }
            
            if(lastPageOpen=='aboutTectTimePage')
            {
                showAboutTTArea();
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'contactUsPage')
            {
                contactUsFocus();
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'faqPage')
            {
                showFaqContent();
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'DownloadsPage')
            {
                showInProgress();
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'subscribePage')
            {
                showSubscribeContent();
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'UpcomingEventsPage')
            {
                var eveMnt = window.localStorage.getItem("eventmonth");
                var eveCnt = window.localStorage.getItem("eventcount");
                var currMonthName =  window.localStorage.getItem("currMonth");
                
                showUpcomingEventList(eveMnt,eveCnt,currMonthName);
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'TAListResult')
            {
                var catName = window.localStorage.getItem("currentCategoryOff");
                var catId = window.localStorage.getItem("currentCategoryIdOff");
                showTAListResult(catName, catId);
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == 'TAListResult')
            {
                var catName = window.localStorage.getItem("currentCategoryOff");
                var catId = window.localStorage.getItem("currentCategoryIdOff");
                showTAListResult(catName, catId);
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen =='detailMediaPage')
            {
                var evtFlag = window.localStorage.getItem("eventFlag");
                var sptFlag = window.localStorage.getItem("spotLightFlag");
                var mdFlag = window.localStorage.getItem("mediaFlag");
            
                if(sptFlag == "false" && evtFlag == "false" && mdFlag == "false")
                {
                    $.mobile.changePage("#businessCategory");
                }
                if(evtFlag == "true")
                {
                    var upeveID = window.localStorage.getItem("eventitemId");
                    var eveMnt = window.localStorage.getItem("eventmonth");
                    var eveCnt = window.localStorage.getItem("eventcount");
                    var currMonthName =  window.localStorage.getItem("currMonth");
                    
                    showUpcomingEventList(eveMnt,eveCnt,currMonthName);
                    UpcomingEventsDetail(upeveID);
                    $.mobile.changePage("#"+lastPageOpen);
                }
                else if(sptFlag == "true")
                {
                  
                    showSpotLightContent();
                    $.mobile.changePage("#"+lastPageOpen);
                }
                else if(mdFlag == "true")
                {
                    mediaFlag = true;
                    var eleId = window.localStorage.getItem("detailPageelementId");
                    var eleType = window.localStorage.getItem("detailPagetype");
                    var eleNum = window.localStorage.getItem("detailPagecountNum");
                    var eleCnt = window.localStorage.getItem("detailPageitemCount");
                    detailPageView(eleId,eleType,eleNum,eleCnt);
                    $.mobile.changePage("#"+lastPageOpen);
                }
                
            }
            else if(lastPageOpen == "detailAuthor")
            {
              var aName =  window.localStorage.getItem("aNameFromId");
               
                authornamefromid = aName;
                showAuthorDetailPage(aName);
                
                $.mobile.changePage("#"+lastPageOpen);
            }
            else if(lastPageOpen == "searchResultPage")
            {
                var sEle = window.localStorage.getItem("searchlement");
                var sMed = window.localStorage.getItem("media");
                var vEle = window.localStorage.getItem("valueElement");
                var srEle = window.localStorage.getItem("searchString");
                showSearchResult(sEle,sMed,vEle,srEle);
            $.mobile.changePage("#"+lastPageOpen);
            } else if(lastPageOpen == "techwatchPage")
            {
                var currentTwItemId = window.localStorage.getItem("currentItemId");
                var currentTwItemIndex = window.localStorage.getItem("currentItemIndex");
                
                showTechWatchContent(currentTwItemId, currentTwItemIndex);
                loadShowCaseArticleTechWatch();
                $.mobile.changePage("#"+lastPageOpen);
            } else if(lastPageOpen == "PlaylistsPage")
            {
                resetPlaylistLMRParameters();
                displayPlaylist();
                $.mobile.changePage('#PlaylistsPage');
                resetSearchFlags();
            } else if(lastPageOpen == "playlistsItemPage")
            {
                var lastOpenPlaylistId = window.localStorage.getItem("lastOpenPlaylist");
                displayPlaylistItems(lastOpenPlaylistId);
                $.mobile.changePage("#playlistsItemPage");
                resetSearchFlags();
            } else if(lastPageOpen == "sharePlaylistsPage")
            {
                $.mobile.changePage('#sharePlaylistsPage');
            } else if(lastPageOpen == "addToPlaylistPage")
            {
                mediaFlag = true;
                var eleId = window.localStorage.getItem("detailPageelementId");
                var eleType = window.localStorage.getItem("detailPagetype");
                var eleNum = window.localStorage.getItem("detailPagecountNum");
                var eleCnt = window.localStorage.getItem("detailPageitemCount");
                detailPageView(eleId,eleType,eleNum,eleCnt);
                $.mobile.changePage("#detailMediaPage");
            } else if(lastPageOpen == "ContributePage")
            {
                loadContributePage();
                $.mobile.changePage("#ContributePage");
            }
            else
            {
                $.mobile.changePage("#businessCategory");

                
            }
            
        }
        else{
            jsonFileData = obj;
            
            if(jsonFileData){
                compareAndUpdateJSON1(obj);
                
            }else {
                compareAndUpdateJSON1(jsonData);
                
                if(!toShowCategories) {
                    getFileSystemRefForWriting(dataToWrite);
                }
            }
        }
		
        loadDigitalTab();
	};
    
    
    
	reader.readAsText(file);
}

function gotFSDownloadMain(fileSystemDownload) {
    window.fileSystem = fileSystemDownload;
    fileSystem.root.getDirectory("TechTime", {
                                 create : true,
                                 exclusive : false
                                 }, dirReadyMain, errorFileSystem);
}

function dirReadyMain(entry) {
    window.appRootDir = entry;
    window.appRootDir.fullPath = globalPathNew;
}

function deleteFile(fileName){
    
    deleteFileName = fileName;
    if(device.platform == "Android"){
    	window.resolveLocalFileSystemURI(deleteFileName, deleteFileByFile, errorDeleteFileSystem);
    }else {
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, doDeleteFile, errorFileSystem);
    }
}

function doDeleteFile(fileSystem) {
    fileSystem.root.getFile(deleteFileName, null, deleteFileByFile , errorFileSystem);
}


function deleteFileByFile(file) {
    var deletedFileName = deleteFileName.substring(deleteFileName.lastIndexOf('//') + 2, deleteFileName.length - 4);

    $.each(entries, function(key, item){
                if(item == deletedFileName)
                   {
                        entries.splice(key, 1);
                   }
           });
    
    var a = entries.indexOf(deletedFileName);
    
    file.remove(function() {
        deleteFileName = "";
        jAlert('File deleted successfully.', 'Tech Time');
    },errorDeleteFileSystem);

}


function errorDeleteFileSystem(event) {
    jAlert('Error while deleting File. Please retry again.', 'Tech Time');
}


function readDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
    };
    reader.readAsDataURL(file);
}