var filePath;
var id = cordova.createUID();
window.ChildBrowser = ChildBrowser;

function onOpenExternal() {

}

function loadChildBrowser(isInternal, URL) {
    cb = window.plugins.childBrowser;
    
    if(isInternal){
        var strPath = window.location.href;
        var path = strPath.substr(0,strPath.lastIndexOf('/')) + URL;
        Cordova.exec("ChildBrowserCommand.showWebPage", encodeURI(filePath) );
    } 
    else{
        cb.showWebPage(URL);
    }
}


var currDownload = '';
function downloadFileAudioMain(element,isDownloadedFlag,elementAudio,val,isFromSpotlight)
{
    var downloadIdtest = element.id;
    var downloadtitletest = element.title;
    
    if(document.getElementById('videoStream'))
    {
        document.getElementById('videoStream').pause();
    }
    
    if(document.getElementById('audioPlayer'))
    {
        document.getElementById('audioPlayer').pause();
    }
    
    if (typeof (isFromSpotlight) == 'undefined' || (isFromSpotlight) == null) {
        isFromSpotlight = false;
    }
    modifyDownloadsFromSpotlightFlag(downloadIdtest, isFromSpotlight);
    
    downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val);
}
var dwPgflag = false;


function changedwFlag()
{
    dwPgflag = true;
}

function downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val, isFromSpotlight)
{
    dwPgflag = true;
    var alreadyDownloading = 1;
    var downloadId = downloadIdtest;
    var downloadtitle = downloadtitletest;
    var fExt =  downloadtitletest.substr((downloadtitletest.lastIndexOf("."))+1,downloadtitletest.length);
    
 
if(typeof(isFromSpotlight) == 'undefined' || (isFromSpotlight) == null){
        isFromSpotlight = false;
    }
    
    $.each(downloadList, function(key, downloadListItem) {
           if(downloadListItem.elementId == downloadId){
           alreadyDownloading = 0;
           }
           });
    
    if(isDownloadedFlag){
        
        var mediaTypeTemp = (downloadId).substr(1,1);
        
        if(mediaTypeTemp == 'A'){
            downloadFileAudioMainYes(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
        }else if(mediaTypeTemp == 'V'){
            downloadFileVideoMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
        }else{
            downloadFileDocMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
        }
        
    }else if(isOnline){
        
        $.mobile.changePage("#DownloadsPage");
        
        showInProgress();
        
        if(alreadyDownloading){
            
            var tempePath = '';
            var mediaTypeTemp = (downloadId).substr(1,1);
            
            var downloadItem = new Object();
            downloadItem.elementId = downloadId;
            downloadItem.elementTitle = downloadtitle;
            downloadItem.isDownloadedFlag = isDownloadedFlag;
            downloadItem.elementAudio = elementAudio;
            downloadItem.val = val;
            
            if(downloadList.length > 0 && currDownload != ''){
                
                if(mediaTypeTemp == 'A'){
                    tempePath = globalPathNew + "/" +downloadId+ "."+fExt;
                    downloadList.push(downloadItem);
                    showProgress(downloadtitle,downloadId,'audio',elementAudio,val,tempePath);
                }else if(mediaTypeTemp == 'V'){
                    tempePath = globalPathNew + "/" +downloadId+ "."+fExt;
                    downloadList.push(downloadItem);
                    showProgress(downloadtitle,downloadId,'.mp4',elementAudio,val,tempePath);
                }else{
                    tempePath = globalPathNew + "/" +downloadId+ "."+fExt;
                    downloadList.push(downloadItem);
                    showProgress(downloadtitle,downloadId,'Document File..',elementAudio,val,tempePath);
                }
                
            }else{
                downloadList.push(downloadItem);
                
                if(mediaTypeTemp == 'A'){
                    
                    tempePath = globalPathNew + "/" +downloadId+"."+fExt;
                    showProgress(downloadtitle,downloadId,'audio',elementAudio,val,tempePath);
                    downloadFileAudioMainYes(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else if(mediaTypeTemp == 'V'){
                    
                    tempePath = globalPathNew + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'.mp4',elementAudio,val,tempePath);
                    downloadFileVideoMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else{
                    
                    tempePath = globalPathNew + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'Document File..',elementAudio,val,tempePath);
                    downloadFileDocMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                }
            }
            
            
        }else{
            
        }
        
    }else{
        jAlert('Please go online to download file.', 'Tech Time');
    }
    
}


function findNextDownloadItem(element)
{
    var testVar = '1';
    
    if(downloadList.length)
    {
        $.each(downloadList, function(key, downloadListItem) {
               
               if(testVar == '1'){   
               var elementId = downloadListItem.elementId;
               var elementTitle = downloadListItem.elementTitle;
               var isDownloadedFlag = downloadListItem.isDownloadedFlag;
               var elementAudio = downloadListItem.elementAudio;
               var val  = downloadListItem.val;
               
               var mediaTypeTemp = (elementId).substr(1,1);
               document.getElementById('PB'+elementId).style.display = 'block';
               
               var dwStatusOld = $("#P" + elementId + "L").text();
               
               if(mediaTypeTemp == 'A'){
               
               downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else if(mediaTypeTemp == 'V'){
               
               downloadFileVideoMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else{
               
               downloadFileDocMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               }
               
               
               testVar = '0';
               }
               
               if(downloadListItem.elementId == element){
               testVar = '1';
               }
               });
        
    }
    else{
        fileObjAbort = new FileTransfer();
    }
}

function downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    var ft = new FileTransfer();
    var name = elementId;
    var url = elementTitle;
    
    var nItem = name.substring(0,1);
    
    var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
    var gaann = gaan.replace(/_/g,' ').replace(/%20/g,' ').replace(/%5B/g,' ').replace(/%5D/g,' ').split(' ').join(' ');
    
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    currDownload = '';
    currDownload = name;
    
    filePath = globalPathNew+name+ ".mp3";
    
    if(isDownloadedFlag){
        playMedia(filePath, name, 'audio');
    }else if(url!="")
    {   
        if(isOnline){
            
            try{
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
                ft.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        $("#P" + name + "Progress").text(Math.round(100 * (progressEvent.loaded / progressEvent.total)) + "%");
                    } else {
                    }
                };
                
                fileObjAbort = ft;
                
                ft.download(
                            url,
                            filePath,
                            function(entry) {
                            window.GA.trackEventWithCategory("IOS Audios","Audio Downloads",gaann,1);
                            var jsonPost = '{"data":{"username":"'+jsonData.loggedUserName +'","downloadedItems":["'+currDownload+'"],"devicePlatform":"'+device.platform+'","deviceUUID":"'+deviceUDID+'","deviceModel":"'+device.model+'"}}';
                            postUserDownloads(jsonPost);
                            
                            changeIsdownloadStatus(filePath, name,'audio');
                            
                            if(currElementId != '' && currElementId != '' && currElementId != ''){
                            detailPageView(currElementId,currElementtype,currElementcountNum);
                            }
                            
                            var index = -1;
                            
                            $.each(downloadList, function(key,tempItem){
                                   if(tempItem.elementId == elementId){
                                   index = key;
                                   }
                                   });
                            
                            if(index != -1){
                            delete downloadList[index];
                            downloadList.splice(index,1);
                            }
                            findNextDownloadItem(name);
                            if(currDownload == elementId){
                            if(currElementId != '' && currElementId != '' && currElementId != ''){
                            detailPageView(currElementId,currElementtype,currElementcountNum);
                            }
                            }
                                                      
                            deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                          
                            },
                            function(error) {
                            
                            if(isOnline)
                            {
                            var errorString = error.code + ' ' + error.source + ' ' + error.http_status + ' ' + error.body;
                            applicationErrorLogger("File Download: Audio Download", errorString);
                            }
                            
                            console.log("Error Code " + error.code);
                            modifyDownloadsFromSpotlightFlag(elementId, false);
                            if(error.code != 4 || error.code != '4'){
                            jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
                            }
                            }
                            );
                
                
                
            }
            catch(error)
            {
                var txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                console.log('in catch block of audio------>>>>'+txt);
            }
            
        }else{
            jAlert('Please go online to download file.', 'Tech Time');
        }
    }
    
    
    
}


function downloadFileVideoMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    var ftv = new FileTransfer();
    var name = elementId;
    var url = elementTitle;
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
    var gaann = gaan.replace(/_/g,' ').replace(/%20/g,' ').replace(/%5B/g,' ').replace(/%5D/g,' ').split(' ').join(' ');
    
    currDownload = '';
    currDownload = name;
    
    filePath = globalPathNew+name+".mp4";
    
    if(isDownloadedFlag){
        playMedia(filePath, name,'video');
        
    }else if(url!="")
    {
        if(isOnline){
            try{
                filePath = globalPathNew + "/" +name+ "."+fExt;
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = '';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
                
                ftv.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        $("#P" + name + "Progress").text(Math.round(100 * (progressEvent.loaded / progressEvent.total)) + "%");
                    } else {

                    }
                };
                
                
                fileObjAbort = ftv;
                ftv.download(
                             url,
                             filePath,
                             function(entry) {
                             window.GA.trackEventWithCategory("IOS Videos","Video Downloads",gaann,1);
                             
                             var jsonPost = '{"data":{"username":"'+jsonData.loggedUserName +'","downloadedItems":["'+currDownload+'"],"devicePlatform":"'+device.platform+'","deviceUUID":"'+deviceUDID+'","deviceModel":"'+device.model+'"}}';
                             
                             
                             postUserDownloads(jsonPost);
                             
                             changeIsdownloadStatus(filePath, name, 'video');
                             
                             if(currElementId != '' && currElementId != '' && currElementId != ''){
                             detailPageView(currElementId,currElementtype,currElementcountNum);
                             }
                             var index = -1;
                             
                             $.each(downloadList, function(key,tempItem){
                                    if(tempItem.elementId == elementId){
                                    index = key;
                                    
                                    }
                                    });
                             
                             if(index != -1){
                             delete downloadList[index];
                             downloadList.splice(index,1);
                             }
                             findNextDownloadItem(name);
                             
                             if(currDownload == elementId){
                             
                             
                             if(currElementId != '' && currElementId != '' && currElementId != ''){
                             detailPageView(currElementId,currElementtype,currElementcountNum);
                             }
                             
                             }
                             
                             
                             deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                           
                             
                             },
                             function(error) {
                             
                             if(isOnline)
                             {
                             var errorString = error.code + ' ' + error.source + ' ' + error.http_status + ' ' + error.body;
                             applicationErrorLogger("File Download: Video Download", errorString);
                             }
                             
                             modifyDownloadsFromSpotlightFlag(elementId, false);
                             if(error.code != 4 || error.code != '4'){
                             
                             jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');

                             console.log("download error" + error.source);
                             
                             }
                             }
                             );
                
            }
            catch(error)
            {
                var txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                console.log('in catch block of video------>>>>'+txt);
            }
            
            
        }else{
            jAlert('Please go online to download file.', 'Tech Time');
        }
        
    }
    
}


function video(filePath)
{
    playMedia(filePath.title,'name','video');
    
}

function onvideoError(e)
{
    switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
            break;
        case e.target.error.MEDIA_ERR_NETWORK:
            break;
        case e.target.error.MEDIA_ERR_DECODE:
            break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            break;
        default:
            break;
    }
}


function playMedia(filePath,name,mediaType)
{
    document.getElementById('avPlayer').innerHTML = "";
    playFromDownloadsPage = true;
    $('#avPlayer').css("display","block");
    
    $.mobile.changePage("#itemVideo");
    
    if(mediaType == 'audio'){
        
        var audioPlayer = "";
        
        audioPlayer = "<br>"
        +"<audio id ='audioComp' width=auto height=auto controls=controls>"
        +"<source src='' type='audio/mp3'></source>"
        +"Your browser does not support the Audio tag"
        +"</audio><br>";
        
        
        $('#itemTitle').html('Audio Player');
        $('#avPlayer').html(audioPlayer);
        
        
        $("#audioComp").attr("src", filePath);
        
        
        var myAudio= document.getElementsByTagName('audio')[0];
        myAudio.src = filePath;
        myAudio.load();
        myAudio.play();
        
    }
    if(mediaType == 'video'){
        var videoPlayer = "";
    
        videoPlayer = "<br>"
        +"<video id ='videoComp' style='width:100%;height:100%;' controls>"
        +"<source src='' type='video/mp4'></source>"
        +"our browser does not support the video tag."
        +"</video><br>";
        
        $('#itemTitle').html('Video Player');
        $('#avPlayer').html(videoPlayer);
        
        var myVideo = document.getElementById('videoComp');
        myVideo.src = filePath;
        
        myVideo.load();
        myVideo.play();

    }
    
}

var openDeleteDocumentPath = '';
var ftd = new FileTransfer();

function downloadFileDocMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    ftd = new FileTransfer();
    
    var name = elementId;
    var url = elementTitle;
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    var filtyp = name.substring(1,2);
    
    var gaan = elementTitle.substring(elementTitle.lastIndexOf('/') + 1,elementTitle.lastIndexOf('.'));
    var gaann = gaan.replace(/_/g,' ').replace(/%20/g,' ').replace(/%5B/g,' ').replace(/%5D/g,' ').split(' ').join(' ');
    
    currDownload = '';
    currDownload = name;
    
    openDeleteDocumentPath = '';
    
    filePath = globalPathNew + "/" +name+ ".pdf";
    
    if(isDownloadedFlag){
        
        document.getElementById('a1').style.display = 'block';
        document.getElementById('a2').style.display = 'block';
        openDeleteDocumentPath = filePath;
        
    }else if(url!=""){
        
        if(isOnline){
            try{
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
           
                ftd.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        $("#P" + name + "Progress").text(Math.round(100 * (progressEvent.loaded / progressEvent.total)) + "%");
                    } else {
                    }
                };
                
                fileObjAbort = ftd;
                alert(filePath);
                ftd.download(
                             url,
                             filePath,
                             function(entry) {
                             
                             if(filtyp=='P'){
                             window.GA.trackEventWithCategory("IOS Presentations","Presentation Downloads",gaann,1);
                             }else if(filtyp=='D'){
                             
                             window.GA.trackEventWithCategory("IOS Documents","Document Downloads",gaann,1);
                             
                            }else{
                             
                             window.GA.trackEventWithCategory("IOS Transcripts","Transcript Downloads",gaann,1);
                             
                             };
                             
                             changeIsdownloadStatus(filePath, name, 'document');
                             
                             var index = -1;
                             
                             $.each(downloadList, function(key,tempItem){
                                    if(tempItem.elementId == elementId){
                                    index = key;
                                    }
                                    });
                             
                             if(index != -1){
                             delete downloadList[index];
                             downloadList.splice(index,1);
                             }
                             findNextDownloadItem(name);
                            
                             if(currElementId != '' && currElementId != ''){
                             var eleNum = window.localStorage.getItem("detailPagecountNum");
                             var eleCnt = window.localStorage.getItem("detailPageitemCount");
                             
                             detailPageView(currElementId,currElementtype,eleNum, eleCnt);
                             }
                             
                             
                             deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                             
                             },
                             function(error) {
                             if(isOnline)
                             {
                             var errorString = error.code + ' ' + error.source + ' ' + error.http_status + ' ' + error.body;
                             applicationErrorLogger("File Download: Document Download", errorString);
                             }
                             
                             modifyDownloadsFromSpotlightFlag(elementId, false);
                             if(error.code != 4 || error.code != '4'){
                             jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
                             }console.log("upload error code" + error.code);
                             }
                             );
                
                
            }
            catch(error)
            {
                var txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                console.log('in catch block of docuemnt------>>>>'+txt);
            }
            
        }else{
            jAlert('Please go online to download file.', 'Tech Time');
        }
    }
    
    
}

function openDocument()
{
    loadChildBrowser(true,openDeleteDocumentPath);
    hidePopup();
}

function deleteDocument()
{
    var startIndex = '';
    var endIndex = '';
    var substringTemp = '';
    
    startIndex = openDeleteDocumentPath.lastIndexOf('/');
    endIndex = openDeleteDocumentPath.lastIndexOf('.');
    endIndex = endIndex -startIndex;
    substringTemp = openDeleteDocumentPath.substr(startIndex+1,endIndex-1);
    
    deleteFile(openDeleteDocumentPath);
    changeIsdownloadStatus(openDeleteDocumentPath, substringTemp, 'delete');
    hidePopup();
    
    var eleId = '';
    var eleType = '';
    var eleNum = '';
    
    refreshFileSystem();
    
    if (spotLightFlag) {
        
        eleId = window.localStorage.getItem("detailPageelementIdSpot");
        eleType = window.localStorage.getItem("detailPagetypeSpot");
        eleNum = window.localStorage.getItem("detailPagecountNumSpot");
        spotlightDataTypes(eleId, eleType, eleNum);
    } else {
        detailPageView(currElementId, currElementtype, currElementcountNum);
    }
    
}

function openIcsFile(icsUrl){
    
    var root = this;
    var cb = window.plugins.childBrowser;
    var url = icsUrl.title;
    
}

function downloadTechWatchImages(techWatchImage, downloadIndex)
{
    var techWatchImageFilePath = '';
    var fileTransfer = new FileTransfer();
    
    if(isOnline)
    {
        techWatchImageFilePath = globalPathNew + '/images/TechWatchArticle' + downloadIndex + '.png';
        if(techWatchImage != '')
        {
            fileTransfer.download(
                                  techWatchImage,
                                  techWatchImageFilePath,
                                  function(entry){
                                  },
                                  function(error) {
                                  
                                  if(isOnline)
                                  {
                                  var errorString = error.code + ' ' + error.source + ' ' + error.http_status + ' ' + error.body;
                                  applicationErrorLogger("Tech Watch Image Download: Image Download", errorString);
                                  }
                                  
                                  console.log("download error source " + error.source);
                                  }
                                  );
        }
        
    }
    
}


var thumbTestVar = 0;
var actualTestVar = 0;

function showProgress(link,name,type,elementTitle,val,filePath)
{
    var newProgress = '';
    var oldProgress = document.getElementById('showProgressBar').innerHTML;
    var downloadContentType = '';
    
    if(downloadList.length == 1)
    {
        document.getElementById('showProgressBar').innerHTML = '';
    }
 
    if(val == 1)
    {
        downloadContentType = "<img src='images/icon_audio.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 2)
    {
        downloadContentType = "<img src='images/icon_video.png' style='height:20px; width:25px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 3)
    {
        downloadContentType = "<img src='images/icon_presentation.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 4)
    {
        downloadContentType = "<img src='images/icon_transcript.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 5)
    {
        downloadContentType = "<img src='images/icon_document.png'  style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    }
    
    newProgress = newProgress + "<div id='P"+name+"' style='width:100%; border:none; background:#cccccc; color:white; padding-top:5px;'><table border='0' style='width:100%;'><tr>";
    
    newProgress = newProgress + "<td style='width:15%'><label style='margin-left:15px;'>"+downloadContentType+"</label></td>";
    newProgress = newProgress + "<td style='width:75%'><label style='color:#ffffff;'><b> "+ elementTitle +"</b></label></td>";
    newProgress = newProgress + "<td style='width:10%'><img id="+name+" title="+filePath+" src='images/cross_mark.png' style='height:15px; width:15px; float:right; margin-right:20px;' onclick='deleteProgressBar(this)'/>";
    newProgress = newProgress + "</td></tr><tr>";
    newProgress = newProgress + "<td style='width:100%' colspan='4'><label id='P"+name+"L' style='font-size:12px;color:black;margin-left:14px;'> In queue </label><label id='P"+name+"Progress' style='font-size:12px;color:black;margin-left:14px;'>  </label><img id='PB"+name+"' src='images/progressBar.gif' title='PP"+name+"' style='display:none;width:40%; max-width:250px; float:right; padding-right:15%;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:1px;'></div>";
    
    
    $('#showProgressBar').append(newProgress);
    
}

function abortSuccess(event) {
    jAlert('File deleted successfully.', 'Tech Time');
}


function deleteProgressBar(itemDel)
{
    var newItemId = itemDel.id;
    var itemId = 'P' + itemDel.id;
    var dwStatusNew = $("#P" + newItemId + "L").text();
    
    jConfirm('Are you sure you want to delete this item?','Tech Time', function(returnValue){
             
             if(returnValue == true){
    
             document.getElementById(itemId).innerHTML = '';
             document.getElementById('showProgressBarImage').style.display = 'none';
             document.getElementById(itemId).style.visibility = 'hidden';
             
             if(document.getElementById('showProgressBarImage').style.display == 'block')
             {
             document.getElementById('showProgressBarImage').style.display = 'none';
             document.getElementById(itemId).style.visibility = 'hidden';
             document.getElementById('P'+newItemId+'L').innerHTML = '';
             
             }
            
             if(document.getElementById(itemId).style.visibility == 'visible')
             {
             document.getElementById(itemId).style.visibility = 'hidden';
             $('#'+itemId).remove();
             document.getElementById('P'+newItemId+'L').innerHTML = '';
             
             }
             
             var index = -1;
             $.each(downloadList, function(key, tempItem) {
                    
                    if (tempItem.elementId == newItemId) {
                    index = key;
                    }
                    });
             
             if (index != -1) {
             var tindex = index;
             delete downloadList[tindex];
             downloadList.splice(index, 1);
             }
             
             
             if(dwStatusNew == "Downloading...")
             {
             fileObjAbort.abort(abortSuccess, errorDeleteFileSystem);
             findNextDownloadItem(newItemId);
             }
             $('#'+itemId).remove();
             
             }
             });
    
}


function deleteProgress(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    document.getElementById('PB'+itemId).style.display = 'none';
    
    itemId = 'P'+itemId;
    
    $('#'+itemId).hide();
    
    document.getElementById('showProgressBarImage').style.display = 'none';
    document.getElementById(itemId).style.visibilty = 'hidden';
    
    $.each(downloadList, function(key, downloadListItem) {
           
           });
    
}
function pushToAllDownloads(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    var dwnload= '';
    var itemID = itemId.substr(2);
    var itemType = itemId.charAt(1);
    var elementTitle = "ABCD";
   
    $("#P"+itemId).hide();
    
    var Downloadcomplete = new Object();
    Downloadcomplete.elementId = itemID;
    Downloadcomplete.val = val;
    Downloadcomplete.filePath = filePath;
    
    
    var DownStatus = $("#P"+itemId+"L").text();
    
    var downloadContentType = '';
    var type = '';
    
    
    if(val == 1)
    {
        downloadContentType = "images/icon_audio.svg";
        type = 'A';
        
    } else if(val == 2)
    {
        downloadContentType = "images/icon_video.svg";
        type = 'V';
        
        
    } else if(val == 3)
    {
        downloadContentType = "images/icon_presentation.png";
        type = 'P';
        
        
        
    } else if(val == 4)
    {
        downloadContentType = "images/icon_transcript.png";
        type = 'T';
        
        
    } else if(val == 5)
    {
        downloadContentType = "images/icon_document.svg";
        type = 'D';
        
        
    }
    
    
    if(DownStatus=="Download Complete")
    {
        
        dwnload += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' style='text-decoration:none;font-style:normal;color:black;display:block;background : #F0EFED'>";
        dwnload += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        dwnload += "<tr><td id='"+itemID+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        dwnload += "<img src='images/TechTime-AppIcon.png' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        dwnload += "<td style='margin :0px; padding:0px; width:65%;color: orange;padding-left:10px;'><b>"+elementAudio+"</b></td>";
        dwnload += "<td style='margin :0px; padding:0px; width:10%;' rowspan='2' align='right'>";
        dwnload += "<img src='"+downloadContentType+"' style='border:none;padding:0px;margin-right:10px;height:20px;width:20px;'/>";
        dwnload += "</td></tr>";
        dwnload += "<tr>";
        dwnload += "<td id='' style='margin:0px;padding:0px;width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table>";
        dwnload += "<hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
        
        $('#allDownloads').append(dwnload);
        
        
        
    }
    
}

function pendingDownloadstoJson()
{
    jsonData.pendingDownloads = downloadList;
    downloadList = [];
}

function getNextProgress(itemDeltest)
{
    
    var flagTest = 'false';
    
    $.each(downloadList, function(key,tempItem){
           
           if(flagTest == 'true'){
           document.getElementById('PB'+tempItem.elementId).style.display = 'block';
           flagTest = 'false';
           }
           if(tempItem.elementId == itemDeltest){
           flagTest = 'true';
           
           
           }
           });
    
}


function readDownloadedList(finaldwn)
{
    var dwnload = '';
    var filePathDL = '';
    
    $.each(finaldwn, function(key, tItem) {
           
           var dItemId = tItem.id;
           var dTitle = tItem.title;
           var dDate = tItem.ddate;
           
           var val = tItem.val;
           
           
           if(val == "1")
           {
           filePathDL = tItem.path;
           downloadContentType = "images/icon_audio.png";
           type = 'A';
           
           } else if(val == "2")
           {
           filePathDL = tItem.path;
           downloadContentType = "images/icon_video.png";
           type = 'V';
           
           
           } else if(val == "3")
           {
           filePathDL = tItem.path;
           downloadContentType = "images/icon_presentation.png";
           type = 'P';
           
           
           
           } else if(val == "4")
           {
           filePathDL = tItem.path;
           downloadContentType = "images/icon_transcript.png";
           type = 'T';
           
           
           } else if(val == "5")
           {
           filePathDL = tItem.path;
           downloadContentType = "images/icon_document.png";
           type = 'D';
           
           
           }
           var fpSend = filePathDL.substring((filePathDL.lastIndexOf("/"))+1,filePathDL.length);
        
           var pathtoLocImage = "file://"+globalPathNew+"images/"+dItemId+"thumb.png";
           
           if(isOnline)
           {
                if(downloadedThumbs.indexOf(dItemId+"thumb.png") != -1)
                    {
                        pathtoLocImage = "file://"+globalPathNew+"images/"+dItemId+"thumb.png";
                    } else if(downloadedThumbs.indexOf(dItemId+"thumb.png") == -1)
                    {
                        pathtoLocImage = "images/TechTime-AppIcon.png";
                    }
           } else if(!isOnline)
           {
                   if(downloadedThumbs.indexOf(dItemId+"thumb.png") != -1)
                   {
                   pathtoLocImage = "file://"+globalPathNew+"images/"+dItemId+"thumb.png";
                   } else if(downloadedThumbs.indexOf(dItemId+"thumb.png") == -1)
                   {
                   pathtoLocImage = "images/TechTime-AppIcon.png";
                   }
           }
           

           dwnload += "<a id="+dItemId+" title="+fpSend+" onclick='downloadItemClick(this)' data-transition='slide' style='text-decoration:none;font-style:normal;color:black;display:block;background : #F0EFED'>";
           dwnload = dwnload + "<div class='listItemClick'><table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
           dwnload = dwnload + "<tr><td id='"+dItemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='2' >";
           dwnload = dwnload + "<img src='"+pathtoLocImage+"' style='height:75px;width:75px;margin:auto;margin-left:10px;margin-top:2%'></td>";
           dwnload = dwnload + "</td><td id='' style='margin:0px; padding:0px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;padding-top:8px'><b>"+dTitle+"</b></td>";
           dwnload = dwnload + "<td id='' style='margin:0px; padding:0px; width:15%;' align='right'>";
           dwnload = dwnload + "<img src='"+downloadContentType+"' style='border:none;padding:0px;margin-right:8px;height:20px;width:20px;vertical-align:middle'/>";
           dwnload = dwnload + "</td></tr>";
           dwnload = dwnload + "</table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></div></a>";
           
           
           });
    $('#allDownloads').html(dwnload);
}



function downloadItemClick(element)
{
    var dItemId = element.id
    var url = element.title;
    var type = url.charAt(1);
    var tPath = '';
    if(type=="A")
    {
        tPath = globalPathNew+url;
        playMedia(tPath, dItemId,'audio');
        
    }
    else if(type=="V")
    {
        tPath = globalPathNew+url;
        playMedia(tPath, dItemId,'video');
    }
    else
    {
        
        tPath = globalPathNew + "/"+url;
        openDeleteDocumentPath = '';
        openDeleteDocumentPath = tPath;
        filePath = tPath;
        loadChildBrowser(true,tPath);
    }
 
}


function unique(origArr)
{
    var newArr = [], origLen = origArr.length, found, x, y;
    
    for (x = 0; x < origLen; x++) {
        
        found = '';
        
        for (y = 0; y < newArr.length; y++) {
            
            if (origArr[x].path.substring(origArr[x].path.lastIndexOf('/') + 1, origArr[x].path.length) == newArr[y].path.substring(origArr[y].path.lastIndexOf('/') + 1, origArr[y].path.length)) {
                
                found = true;
                
                break;
                
            }
        }
        if (!found) {
            
            newArr.push(origArr[x]);
        }
    }
        readDownloadedList(newArr);
        
    return newArr;
}


function uniqueFileList(origArr)
{
    var newArr = [], origLen = origArr.length, found, x, y;
    
    for (x = 0; x < origLen; x++) {
        
        found = '';
        
        for (y = 0; y < newArr.length; y++) {
            
            if (origArr[x] == newArr[y]) {
                
                found = true;
                
                break;
                
            }
        }
        if (!found) {
            
            newArr.push(origArr[x]);
        }
    }
    
    return newArr;
}


function modifyDownloadsFromSpotlightFlag(elementId,value)
{
    elementId = elementId.substr(2, elementId.length);
    $.each(jsonData.spotLight, function (key, spotItem) {
           if (spotItem.itemId == elementId && !(spotItem.isAudioFromSpotlight == 'true'
                                                 || spotItem.isVideoFromSpotlight == 'true' || spotItem.isTranscriptFromSpotlight == 'true'
                                                 || spotItem.isPresentationFromSpotlight == 'true' || spotItem.isDocumentFromSpotlight == 'true')) {
           if (value) {
           spotItem.isDownloadedFromSpotLight = 'true';
           }
           else {
           spotItem.isDownloadedFromSpotLight = 'false';
           }
           }
           });
    
}



function CheckAllDownloads()
{
    
    var finaldwn = new Array();
    $.each(jsonData.downloadedSpotLightItems, function (key, CheckDownload) {
           if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPathAudio;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           finaldwn.push(tempOBJ);
           
           
           }
           if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPathVideo;
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPathPresentation;
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPathTranscript;
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           
           }
           
           if(CheckDownload.isDownloaded == "true" || CheckDownload.isDownloaded == 'true' || CheckDownload.isDownloaded == true){
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "5";
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPath;
           tempOBJ.ddate = CheckDownload.downloadedDateD;
           finaldwn.push(tempOBJ);
           
           }
           
           });
    
    $.each(jsonData.techConf, function(key, CheckDownload) {
           
           if(entries.indexOf("TA"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/TA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("TV"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/TV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("TP"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/TP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("TT"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/TT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           
           
           });
    
    $.each(jsonData.audio, function(key, CheckDownload) {
           
           
           if(entries.indexOf("AA"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("AV"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("AP"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("AT"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           
           
           });
    
    
    $.each(jsonData.video, function(key, CheckDownload) {
           if(entries.indexOf("VA"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("VV"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("VP"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("VT"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           
           
           
           });
    
    $.each(jsonData.panelDiscussions, function(key, CheckDownload) {
           if(entries.indexOf("PA"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("PV"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("PP"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("PT"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           });
    
    
    $.each(jsonData.interviews, function(key, CheckDownload) {
           
           if(entries.indexOf("IA"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("IV"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("IP"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(entries.indexOf("IT"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           });
    
    
    $.each(jsonData.technologySessions, function(key, CheckDownload) {
           
           if (entries.indexOf("AA"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AA" + CheckDownload.itemId + ".mp3";
           
           tempOBJ.path = createPath;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           
           finaldwn.push(tempOBJ);
           }
           
           if (entries.indexOf("AV"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AV" + CheckDownload.itemId + ".mp4";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           
           if (entries.indexOf("AP"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("AT"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           
           finaldwn.push(tempOBJ);
           }
           });
    
    
    $.each(jsonData.technologySessions, function(key, CheckDownload) {
           
           if (entries.indexOf("VA"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VA" + CheckDownload.itemId + ".mp3";
           
           tempOBJ.path = createPath;
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           
           finaldwn.push(tempOBJ);
           }
           
           if (entries.indexOf("VV"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VV" + CheckDownload.itemId + ".mp4";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           finaldwn.push(tempOBJ);
           }
           
           if (entries.indexOf("VP"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           
           finaldwn.push(tempOBJ);
           }
           if(entries.indexOf("VT"+CheckDownload.itemId) != -1) {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           
           finaldwn.push(tempOBJ);
           }
           });
    
    
    $.each(jsonData.documents, function(key, CheckDownload) {
           if(entries.indexOf("DD"+CheckDownload.itemId) != -1)
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "5";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPath.lastIndexOf("/");
           var createPath = CheckDownload.localPath.substr(0,lastInstance);
           createPath = createPath + "/DD" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           
           tempOBJ.ddate = CheckDownload.downloadedDateD;
           finaldwn.push(tempOBJ);
           }
           });
    
    finaldwn.sort(function(a, b){
                  var dateA1=new Date(a.ddate), dateB1=new Date(b.ddate);
                  return dateB1-dateA1;
                  });
    
    var arrUnique = unique(finaldwn);
    
    
    for(var x=0; x<arrUnique.length; x++)
    {
        var getFilePath = arrUnique[x].path;
        getFilePath = getFilePath.substring(getFilePath.lastIndexOf('/') + 1, getFilePath.length);
        
    }
    
}


function refreshFileSystem()
{
    entries = [];
    entries = new Array();
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    
}