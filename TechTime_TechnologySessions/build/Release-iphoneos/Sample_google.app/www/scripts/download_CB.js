
var filePath;
var id = cordova.createUID();
window.ChildBrowser = ChildBrowser;

function onCloseBrowser() {
    console.log("browser closed");
}
function locChanged(loc) {
    console.log("location changed " + loc);
}
function onOpenExternal() {
    console.log("onOpenExternal!");
}

//function openPdf()
//{
//    loadChildBrowser(false, "http://www.gradsch.ohio-state.edu/Depo/ETD_Tutorial/lesson2.pdf");
//}

function loadChildBrowser(isInternal, URL) {
    cb = window.plugins.childBrowser;
    
    if(isInternal){
        var strPath = window.location.href;
        var path = strPath.substr(0,strPath.lastIndexOf('/')) + URL;
        //alert("filePath"+filePath);
        
       // alert("path"+path);
        Cordova.exec("ChildBrowserCommand.showWebPage", encodeURI(filePath) );
    }
    else{
        cb.showWebPage(URL);
    }
}


var currDownload = '';
var downloadList = new array();


function downloadFileAudioMain(element,isDownloadedFlag,elementAudio,val)
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
    
  //  alert("ALERT"+downloadIdtest+" "+downloadtitletest+" "+isDownloadedFlag);
    downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val);
    
    //  alert("ID----> " + downloadIdtest + "FLAG -----> " + isDownloadedFlag + "elementAudio ----> " + elementAudio);
}

function downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val)
{
    
    var alreadyDownloading = 1;
    var downloadId = downloadIdtest;
    var downloadtitle = downloadtitletest;
    var fExt =  downloadtitletest.substr((downloadtitletest.lastIndexOf("."))+1,downloadtitletest.length);
    
    
    console.log('-->Initial length :'+downloadList.length);
    
    $.each(downloadList, function(key, downloadListItem) {
           console.log('Item Id:-->'+downloadListItem.elementId);
           if(downloadListItem.elementId == downloadId){
           alreadyDownloading = 0;
           }
           });
    console.log('List complete ... ');
    
    //alert("INSIDE DOWNLOAd FILE FN -----> " + isDownloadedFlag);
    
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
                
                //                    console.log('-->downloadList Not of zero length ');
                
                if(mediaTypeTemp == 'A'){
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'audio',elementAudio,val,tempePath);
                    downloadList.push(downloadItem);
                    
                }else if(mediaTypeTemp == 'V'){
                    
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+ "."+fExt;
                    //  alert("TEMP PATH ---------> " + tempePath);
                    showProgress(downloadtitle,downloadId,'.mp4',elementAudio,val,tempePath);
                    downloadList.push(downloadItem);
                    
                }else{
                    
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'Document File..',elementAudio,val,tempePath);
                    downloadList.push(downloadItem);
                }
                
            }else{
                console.log('-->downloadList zero length ');
                downloadList.push(downloadItem);
                
                if(mediaTypeTemp == 'A'){
                    
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+"."+fExt;
                    showProgress(downloadtitle,downloadId,'audio',elementAudio,val,tempePath);
                    downloadFileAudioMainYes(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else if(mediaTypeTemp == 'V'){
                    
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'.mp4',elementAudio,val,tempePath);
                    // alert("SINGLE VIDEO DOWNLOAD");
                    downloadFileVideoMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                    
                }else{
                    
                    tempePath = window.appRootDir.fullPath + "/" +downloadId+ "."+fExt;
                    showProgress(downloadtitle,downloadId,'Document File..',elementAudio,val,tempePath);
                    downloadFileDocMain(downloadId,downloadtitle,isDownloadedFlag,elementAudio,val);
                }
            }
            
            
        }else{
            
            //alert('already downloading media');
        }
        //       console.log(' after single item inserted');
        
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
               
            //   console.log('after complete previus download :'+key);
              // console.log('Next Download started :--------->'+key+'  Item Id----->'+downloadListItem.elementId);
               
               var elementId = downloadListItem.elementId;
               var elementTitle = downloadListItem.elementTitle;
               var isDownloadedFlag = downloadListItem.isDownloadedFlag;
               var elementAudio = downloadListItem.elementAudio;
               var val  = downloadListItem.val;
               
               var mediaTypeTemp = (elementId).substr(1,1);
               document.getElementById('PB'+elementId).style.display = 'block';
               
               if(mediaTypeTemp == 'A'){
               
               downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else if(mediaTypeTemp == 'V'){
               
               downloadFileVideoMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               
               }else{
               
               downloadFileDocMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val);
               }
               
               
               testVar = '0';
               }
               
               
               //           console.log('compare downloadListItem.elementId -->'+downloadListItem.elementId+'-------with------element'+element);
               
               if(downloadListItem.elementId == element){
               testVar = '1';
               //               console.log(' item found in array :------------------->>>>'+key);
               }
               });
        
    }
}


//downloadFileAudioMainYes(element,isDownloadedFlag,elementAudio,val)

function downloadFileAudioMainYes(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    
    //    console.log('---> '+elementId);console.log('---> '+elementTitle);console.log('---> '+isDownloadedFlag);console.log('---> '+elementAudio);console.log('---> '+val);
    
    var ft = new FileTransfer();
    var name = elementId;
    var url = elementTitle;
    var nItem = name.substring(0,1);
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    currDownload = '';
    currDownload = name;
    
    filePath = window.appRootDir.fullPath + "/" +name+ "."+fExt;
    
    //    console.log('-------------------------------------------------------------------------->');
    
    if(isDownloadedFlag){
        
        playMedia(filePath, name, 'audio');
        
        
    }else if(url!="")
    {
        //alert('Downloaded audio starteddddddd');
        
        if(isOnline){
            
            try{
                
                
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
                
                ft.onprogress = function(progressEvent) {
                    console.log("In Progress doc"+progressEvent.lengthComputable);
                    if (progressEvent.lengthComputable) {
                        //downloadcompleteStatus =  Math.round(100 * (progressEvent.loaded / progressEvent.total));
                        $("#P" + name + "L").text("Downloading..."+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        console.log("------progressEvent if doc------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                    } else {
                        console.log("------progressEvent else------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        //loadingStatus.increment();
                    }
                };
                
                
                ft.download(
                                      url,
                                      filePath,
                                      function(entry) {
                                      
                                      console.log('filePath----'+filePath);
                                      
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
                                      
                                      findNextDownloadItem(name);
                                      
                                      if(currDownload == elementId){
                                      
                                      //changeIsdownloadStatus(filePath,name, 'delete');
                                      
                                      if(currElementId != '' && currElementId != '' && currElementId != ''){
                                      detailPageView(currElementId,currElementtype,currElementcountNum);
                                      }
                                      }
                                      
                                      console.log('**********************Audio*****************************');
                                      console.log('-->delete element id:'+elementId);
                                      console.log('-->index Position:'+index);
                                      console.log('-->before delete Length Array :'+downloadList.length);
                                      if(index != -1){
                                      delete downloadList[index];
                                      downloadList.splice(index,1);
                                      }
                                      console.log('-->after delete Length Array :'+downloadList.length);
                                      console.log('***************************************************');
                                      
                                      //                                    playMedia(filePath, name,'audio');
                                      //loadChildBrowser(true,filePath);
                                      
                                      console.log("JSON DATA AFTER DOWNLOAD COMPLETE --> " + JSON.stringify(jsonData));
                                      
                                      
                                      getFileSystemRefForWriting(jsonData);
                                      
                                      deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                                      
                                      // Code added
                                      // getFileSystemRefForWriting(jsonData);
                                      },
                                      function(error) {
                                      jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
                                      console.log("download error" + error.source);
                                      //                                      console.log("download error source " + error.source);
                                      //                                      console.log("download error target " + error.target);
                                      //                                      console.log("upload error code" + error.code);
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
    
    //    console.log('1111111---> '+elementId);console.log('---> '+elementTitle);console.log('---> '+isDownloadedFlag);console.log('---> '+elementAudio);console.log('---> '+val);
    
    
    var ftv = new FileTransfer();
    var name = elementId;
    var url = elementTitle;
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    // alert("VIDEO FILE URL  ---------- > " + url);
    
    //    alert(url);
    
    currDownload = '';
    currDownload = name;
    
    //        console.log('url -->'+url);
    
    filePath = window.appRootDir.fullPath + "/" +name+ "."+fExt;
    
    // alert("DOWNLOADED FLAG ----> " + isDownloadedFlag);
    
    if(isDownloadedFlag){
        
        //                console.log('already downloaded : '+filePath);
        //  alert("FILEPATH -------> EXIST OR NOT" + filePath);
        
        playMedia(filePath, name,'video');
        
        
    }else if(url!="")
    {
        //                console.log('video Downloaded video starteddddddd');
        // alert("URL NOT NULL" + url);
        
        if(isOnline){
            //  alert("DEVICE is ONLINE" + isOnline);
            try{
                filePath = window.appRootDir.fullPath + "/" +name+ "."+fExt;
                //     alert("SAVING VIDEO AT ------> " + filePath);
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
                
                ftv.onprogress = function(progressEvent) {
                    console.log("In Progress doc"+progressEvent.lengthComputable);
                    if (progressEvent.lengthComputable) {
                        //downloadcompleteStatus =  Math.round(100 * (progressEvent.loaded / progressEvent.total));
                        $("#P" + name + "L").text("Downloading..."+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        console.log("------progressEvent if doc------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                    } else {
                        console.log("------progressEvent else------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        //loadingStatus.increment();
                    }
                };
                
                
                
                ftv.download(
                                      url,
                                      filePath,
                                      function(entry) {
                                      
                                      // alert("download complete: " + entry.fullPath);
                                      //                                      console.log('video entry.fullPath------'+entry.fullPath);
                                      //                                      console.log('video filePath ----'+filePath);
                                      
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
                                      
                                      findNextDownloadItem(name);
                                      //  alert("DOWNLOADED ------> ");
                                      if(currDownload == elementId){
                                      
                                      //changeIsdownloadStatus(filePath,name, 'delete');
                                      
                                      if(currElementId != '' && currElementId != '' && currElementId != ''){
                                      detailPageView(currElementId,currElementtype,currElementcountNum);
                                      }
                                      
                                      }
                                      
                                      
                                      console.log('*********************Video******************************');
                                      console.log('-->delete element id:'+elementId);
                                      console.log('deleteProgressindex Position:'+index);
                                      console.log('-->before delete Length Array :'+downloadList.length);
                                      if(index != -1){
                                      delete downloadList[index];
                                      downloadList.splice(index,1);
                                      }
                                      console.log('-->before delete Length Array :'+downloadList.length);
                                      console.log('***************************************************');
                                      
                                      
                                      //                                      playMedia(filePath, name,'video');
                                      
                                      
                                      // Code added
                                      getFileSystemRefForWriting(jsonData);
                                      
                                      deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                                      // Code added
                                      // getFileSystemRefForWriting(jsonData);
                                      
                                      },
                                      function(error) {
                                      jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
                                      console.log("download error" + error.source);
                                      //                                      console.log("download error source " + error.source);
                                      //                                      console.log("download error target " + error.target);
                                      //                                      console.log("upload error code" + error.code);
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
    
    //  alert('-------------->'+filePath);
    //  alert('-------------->' + filePath.title);
    
    console.log('PATH'+filePath.title);
    
    
    playMedia(filePath.title,'name','video');
    
}

function onvideoError(e)
{
    //    alert(e);
    switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
            //            alert('You aborted the video playback.');
            break;
        case e.target.error.MEDIA_ERR_NETWORK:
            //            alert('A network error caused the video download to fail part-way.');
            break;
        case e.target.error.MEDIA_ERR_DECODE:
            //            alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
            break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            //            alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
            break;
        default:
            //            alert('An unknown error occurred.');
            break;
    }
}


function playMedia(filePath, name,mediaType)
{
    document.getElementById('avPlayer').innerHTML = "";
    
    $('#avPlayer').css("display","block");
    
    $.mobile.changePage("#itemVideo");
    
    //    console.log('----->----->----->----->----->----->----->----->----->');
    //    console.log('-->filePath  :'+filePath);
    //    console.log('-->name      :'+name);
    //    console.log('-->mediaType :'+mediaType);
    
    
    
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
        
        //alert('Playing audio');
        
    }
    if(mediaType == 'video'){
      //  alert("filePath"+filePath);
        var videoPlayer = "";
        
        /* videoPlayer = "<br>"
         +"<video id ='videoComp' width='auto' height='auto' controls='controls' autobuffer error='onvideoError(event)'>"
         +"<source src='' type='video/wmv'></source>"
         +"our browser does not support the video tag."
         +"</video><br>";*/
        videoPlayer = "<br>"
        +"<video id ='videoComp' width='auto' height='auto' controls>"
        +"<source src='' type='video/mp4'></source>"
        +"our browser does not support the video tag."
        +"</video><br>";
        
        $('#itemTitle').html('Video Player');
        $('#avPlayer').html(videoPlayer);
        
        var myVideo = document.getElementById('videoComp');
        myVideo.src = filePath;
        
        //  alert(myVideo.src);
        myVideo.load();
        myVideo.play();
        //            myVideo.error = onvideoError()
        //            myVideo.addEventListener('onerror',onvideoError,false);
        //        console.log('filePath :-->'+filePath);
        
        //alert('Playing video');
    }
    
}

var openDeleteDocumentPath = '';
var ftd = new FileTransfer();

function downloadFileDocMain(elementId,elementTitle,isDownloadedFlag,elementAudio,val)
{
    //    console.log('---> '+elementId);console.log('---> '+elementTitle);console.log('---> '+isDownloadedFlag);console.log('---> '+elementAudio);console.log('---> '+val);
    
    
    ftd = new FileTransfer();
    
    var name = elementId;
    var url = elementTitle;
    var fExt =  url.substr((url.lastIndexOf("."))+1,url.length);
    currDownload = '';
    currDownload = name;
    
    openDeleteDocumentPath = '';
    
    filePath = window.appRootDir.fullPath + "/" +name+ "."+fExt;
    
    if(isDownloadedFlag){
        
        document.getElementById('a1').style.display = 'block';
        document.getElementById('a2').style.display = 'block';
        //alert("filePath"+filePath);
        openDeleteDocumentPath = filePath;
        //loadChildBrowser(true,filePath);
        
    }else if(url!=""){
        
        if(isOnline){
            
            try{
                
                document.getElementById('PB'+name).style.display = 'block';
                document.getElementById('P'+name+'L').innerHTML = 'Downloading...';
                
                ftd.onprogress = function(progressEvent) {
                    console.log("In Progress doc"+progressEvent.lengthComputable);
                    if (progressEvent.lengthComputable) {
                        //downloadcompleteStatus =  Math.round(100 * (progressEvent.loaded / progressEvent.total));
                        $("#P" + name + "L").text("Downloading..."+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        console.log("------progressEvent if doc------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                    } else {
                        console.log("------progressEvent else------->%"+Math.round(100 * (progressEvent.loaded / progressEvent.total)));
                        //loadingStatus.increment();
                    }
                };
                                
            
                
                ftd.download(
                                      url,
                                      filePath,
                                      function(entry) {
                                      
                                      //                            console.log('entry.fullPath------'+entry.fullPath);
                                      //                            console.log('filePath ----'+filePath);
                                      
                                      
                                      changeIsdownloadStatus(filePath, name, 'document');
                                      
                                      //                                       console.log(' document after chaneisdownload');
                                      
//                                      
//                                      if(currElementId != '' && currElementId != '' && currElementId != ''){
//                                      
//                                      detailPageView(currElementId,currElementtype,currElementcountNum);
//                                      
//                                      }
                             
                                      //                             console.log('document after detail page change');
                                      
                                      var index = -1;
                                      
                                      $.each(downloadList, function(key,tempItem){
                                             if(tempItem.elementId == elementId){
                                             index = key;
                                             }
                                             });
                                      
                                      //                                       console.log('document after check n array');
                                      
                                      
                                      //                                       console.log('document after chaneisdownload');
                                      
                                     // if(currDownload == elementId){
                                      //alert('donwload complete :'+elementId+'--> currDownload'+currDownload);
                                      //changeIsdownloadStatus(filePath,name, 'delete');
                                      
                                      if(currElementId != '' && currElementId != '' && currElementId != ''){
                                      detailPageView(currElementId,currElementtype,currElementcountNum);
                                      }
                                      
                                    //  }
                                      
                             findNextDownloadItem(name);

                             
                                      console.log('***********************Document****************************');
                                      console.log('-->delete element id:'+elementId);
                                      console.log('-->index Position:'+index);
                                      console.log('-->before delete Length Array :'+downloadList.length);
                                      if(index != -1){
                                      delete downloadList[index];
                                      downloadList.splice(index,1);
                                      }
                                      console.log('-->after delete Length Array :'+downloadList.length);
                                      console.log('***************************************************');
                                      
                                      //                            loadChildBrowser(true,filePath);
                                      
                                      // Code added
                                      getFileSystemRefForWriting(jsonData);
                                      
                                      deleteProgress(name,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
                                      
                                      
                                      },
                                      function(error) {
                                      jAlert('Download was not completed due to lost internet connection. Please connect to the Internet and re-download.', 'Tech Time');
                                      console.log("download error source " + error.source);
                                      //                            console.log("download error target " + error.target);
                                      //                            console.log("upload error code" + error.code);
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


// Download was not completed due to lost internet connection. Please connect to the Internet and re-download.

function openDocument()
{
    alert("openDeleteDocumentPath"+openDeleteDocumentPath);
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
    
    //    console.log('substringTemp -->'+substringTemp);
    
    deleteFile(openDeleteDocumentPath);
    changeIsdownloadStatus(openDeleteDocumentPath, substringTemp, 'delete');
    detailPageView(currElementId,currElementtype,currElementcountNum);
    hidePopup();
    
}

function updateListAfterDelete(changeIsDownloade,mediaTypetoDelete) {
    
    
    //    console.log('changeIsDownloade --> :'+changeIsDownloade);
    //    console.log('mediaTypetoDelete-->  :'+mediaTypetoDelete);
}


function openIcsFile(icsUrl){
    
    var root = this;
    var cb = window.plugins.childBrowser;
    var url = icsUrl.title;
    
    //alert('----------------->');
    //alert('.ICS : '+url);
    
    //    if(cb != null) {
    //        cb.onLocationChange = function(loc){ root.locChanged(loc); };
    //        cb.onClose = function(){root.onCloseBrowser(); };
    //        cb.onOpenExternal = function(){root.onOpenExternal(); };
    //        cb.showWebPage(url);
    //    }else{
    //        console.log("childbrowser is null");
    //    }
    
    //alert('2'+url);
    
}

//downloadThumbImages(sguid,'actual',imgActual)


var thumbTestVar = 0;
var actualTestVar = 0;

function downloadThumbImages(thumbId,imageName,imageLink,mediaType)
{
    var url = '';
    url = imageLink;
    
    var name = '';
    name = imageName;
    
    var valueReturn = '';
    valueReturn = 'false';
    
    var filePath = '';
    filePath = '';
    
    var fileTransfer = new FileTransfer();
    
    
    if(isOnline){
        
        filePath = window.appRootDir.fullPath + "/images/"+ thumbId+imageName + ".png";
        
        if(url!=""){
            
            fileTransfer.download(
                                  url,
                                  filePath,
                                  function(entry){
                                  
                                
                                  
                                  if(imageName == 'thumb'){
                                  
                                  thumbTestVar++;
                                  
                                  }else{
                                  
                                  actualTestVar++;
                                  }
                                  
                                  //                                          console.log('Thumnail downloaded thumbTestVar--->'+thumbTestVar);
                                  //                                          console.log('ACTUAL downloaded actualTestVar --->'+actualTestVar);
                                  
                                  
                                  //                              alert("download complete: " + entry.fullPath);
                                  //                              console.log('Images entry.fullPath------'+entry.fullPath);
                                  //                              console.log('Images filePath ----'+filePath);
                                  
                                  changePath(thumbId,name,mediaType,filePath);
                                  
                                  },
                                  function(error) {
                                  console.log("download error source " + error.source);
                                  //                              console.log("download error target " + error.target);
                                  //                              console.log("upload error code" + error.code);
                                  
                                  }
                                  );
            
        }
    }
    
    
}


//          changePath(thumbId,name,mediaType,filePath);


function changePath(elementId,imageType,typeMedia,localPath)
{
    
    if(typeMedia == "Audios"){
        
        $.each(jsonData.audio, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                        console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               
               });
        
    }
    
    else if(typeMedia == "Videos"){
        
        $.each(jsonData.video, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                       console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
        
        
    }else if(typeMedia == "Interviews"){     // Interviews
        
        $.each(jsonData.interviews, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                       console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
        
    }else if(typeMedia == "Panel Discussions"){
        
        $.each(jsonData.panelDiscussions, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                       console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
        
    }else if(typeMedia == "documents"){
        
        $.each(jsonData.documents, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                   console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                   console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
        
        
        
    }else if(typeMedia == "events"){
        
        
        $.each(jsonData.events, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n--------------ankit ankit ankit --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                       console.log('\n\n--------------bhavya bhavya bhavya --------------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
        
    }else if(typeMedia == "contributor"){
        
        $.each(jsonData.contributor, function(index, item){
               
               if(item.itemId == elementId){
               
               if(imageType == 'thumb'){
               
               item.thumbLocal = localPath;
               //                       console.log('\n\n-------C-------ankit ankit ankit -------C-------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               if(imageType == 'actual'){
               
               item.actualLocal = localPath;
               //                       console.log('\n\n-------C-------bhavya bhavya bhavya ------C--------\n-->'+elementId+'\n-->'+imageType+'\n-->'+typeMedia+'\n-->'+localPath+'\n');
               }
               }
               });
    }
    
}




function showProgress(link,name,type,elementTitle,val,filePath)
{
    
   
  
    var newProgress = '';
    var oldProgress = document.getElementById('showProgressBar').innerHTML;
    var downloadContentType = '';
    

    
    // 1 == Audio
    // 2 == Video
    // 3 == Presentation
    // 4 == Transcript
    // 5 == Docs
    
    if(val == 1)
    {
        downloadContentType = "<img src='images/icon_audio.svg' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 2)
    {
        downloadContentType = "<img src='images/icon_video.svg' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 3)
    {
        downloadContentType = "<img src='images/icon_presentation.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 4)
    {
        downloadContentType = "<img src='images/icon_transcript.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    } else if(val == 5)
    {
        downloadContentType = "<img src='images/icon_document.svg'  style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
        
    }
    
    
    newProgress = newProgress + "<div id='P"+name+"' style='width:100%; border:none; background:#cccccc; color:white; padding-top:5px;'><table border='0' style='width:100%;'><tr>";
    
    newProgress = newProgress + "<td style='width:15%'><label style='margin-left:15px;'>"+downloadContentType+"</label></td>";
    newProgress = newProgress + "<td style='width:75%'><label style='color:#ffffff;'><b> "+ elementTitle +"</b></label></td>";
    //   newProgress = newProgress + "<td style='width:30%'><label></label></td>";
    newProgress = newProgress + "<td style='width:10%'><img id="+name+" title="+filePath+" src='images/cross_mark.png' style='height:15px; width:15px; float:right; margin-right:20px;' onclick='deleteProgressBar(this)'/>";
    newProgress = newProgress + "</td></tr><tr>";
    newProgress = newProgress + "<td style='width:100%' colspan='4'><label id='P"+name+"L' style='font-size:12px;color:black;margin-left:14px;'> In queue </label><img id='PB"+name+"' src='images/progressBar.gif' title='PP"+name+"' style='display:none;width:50%; max-width:250px; float:right; padding-right:15%;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:1px;'></div>";
    
    
    $('#showProgressBar').append(newProgress);
    //document.getElementById('showProgressBarImage').style.display = 'block';
    
}

function deleteProgressBar(itemDel)
{
    
    var newItemId = itemDel.id;
    var itemId = 'P' + itemDel.id;
    
    jConfirm('Are you sure you want to delete this item?','Tech Time', function(returnValue){
             
             if(returnValue == true){
             
             
             document.getElementById(itemId).innerHTML = '';
             document.getElementById('showProgressBarImage').style.display = 'none';
             document.getElementById(itemId).style.visibility = 'hidden';
             

             
             if(document.getElementById('showProgressBarImage').style.display == 'block')
             {
             //alert("block");
             document.getElementById('showProgressBarImage').style.display = 'none';
             document.getElementById(itemId).style.visibility = 'hidden';
             document.getElementById('P'+newItemId+'L').innerHTML = '';

             }
             
             // alert("itemId :"+itemId);
             if(document.getElementById(itemId).style.visibility == 'visible')
             {
             //alert("visibilty");
             document.getElementById(itemId).style.visibility = 'hidden';
             $('#'+itemId).remove();
             document.getElementById('P'+newItemId+'L').innerHTML = '';

             }

             //alert("After visible block");
             
             var index = -1;
             $.each(downloadList, function(key, tempItem) {
                    
                    if (tempItem.elementId == newItemId) {
                    index = key;
                    }
                    });
             
             //alert("After index = key;");
             
    
             if (index != -1) {
             var tindex = index;
             delete downloadList[tindex];
             downloadList.splice(index, 1);
             }
             
             // setTimeout(changeIsdownloadStatusAfterDelete(link, newItemId, 'delete'),500);
             $('#'+itemId).remove();
             findNextDownloadItem(newItemId);
             }
             });
    
}

function deleteProgress(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    //    console.log('delete progress ---->>>>>>>--->>>>>'+itemId);
    
    //  alert("DELETE PRG " + itemId + " " + val + " " + filePath);
    
    document.getElementById('P'+itemId+'L').innerHTML = 'Download Complete';
    
    
    //pushToAllDownloads(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath);
    
    document.getElementById('PB'+itemId).style.display = 'none';
    
    itemId = 'P'+itemId;
    
    $('#'+itemId).hide();
    
    document.getElementById('showProgressBarImage').style.display = 'none';
    document.getElementById(itemId).style.visibilty = 'hidden';
    
    
    console.log('-->Initial length :'+downloadList.length);
    
    $.each(downloadList, function(key, downloadListItem) {
           console.log('Item Id:-->'+downloadListItem.elementId);
           
           
           });
    
}
function pushToAllDownloads(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    //  alert("PUSH TO ALL DWNld " + itemId + " " + val + " " + filePath);
    var dwnload= '';
    var itemID = itemId.substr(2);
    var itemType = itemId.charAt(1);
    var elementTitle = "ABCD";
    
    //alert("ID ------------> " + itemID);
    //alert("ITEM TYPE -------> " + itemId.charAt(0));
    
    
    
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
        allDownloaded.push(Downloadcomplete);
        //alert("Downloadcomplete---"+JSON.stringify(Downloadcomplete));
        
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
        
        //  downloadedListload(itemId,elementAudio,type,isDownloadedFlag,filePath);
        
        
        //document.getElementById("showProgressBar").innerHTML = '';
        
        //        $.each(data.FinalDownload, function(key,newItem){
        //
        //               var downloadIdtest = newItem.elementId;
        //               var downloadtitletest = newItem.elementTitle;
        //               var isDownloadedFlag = newItem.isDownloadedFlag;
        //               var elementAudio = newItem.elementAudio;
        //               var val = newItem.val;
        //
        //
        //               //downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val);
        //
        
        
        
    }
    
}

function pendingDownloadstoJson()
{
  //  alert("pendingDWArray" +JSON.stringify(downloadList));
    jsonData.pendingDownloads = downloadList;
    downloadList = [];
    //alert("pendingDWArray" +JSON.stringify(jsonData.pendingDownloads));
    console.log("10 **pendingDownloadstoJson function called ----->" + JSON.stringify(jsonData.pendingDownloads));
}

function getNextProgress(itemDeltest)
{
    
    var flagTest = 'false';
    
    console.log('-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->');
    //console.log('-->'+JSON.stringify(downloadList));
    console.log('-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->');
    
    $.each(downloadList, function(key,tempItem){
           
           
           console.log('check item in queue :'+tempItem.elementId);
           
           if(flagTest == 'true'){
           console.log('Next item in array --->>>>'+tempItem.elementId);
           document.getElementById('PB'+tempItem.elementId).style.display = 'block';
           flagTest = 'false';
           }
           if(tempItem.elementId == itemDeltest){
           flagTest = 'true';
           
           
           }
           });
    
    //    delete downloadList[key-1];
    //    downloadList.splice(key-1,1);
    
}


function readDownloadedList(finaldwn)
{
    var dwnload = '';
    var filePathDL = '';
    // alert('downloadedItems.finalDownload-----readdownloadedlist'+JSON.stringify(finaldwn));
    //alert("downloaded list length"+finaldwn.length);
    $.each(finaldwn, function(key, tItem) {
           
   // alert('tItem----readdownloadedlist'+JSON.stringify(tItem));
           
           var dItemId = tItem.id;
           var dTitle = tItem.title;
           var dDate = tItem.ddate;
           
           var val = tItem.val;
           
           
           
           //var itemID = dItemId.substr(2);
           //alert('tItem'+JSON.stringify(tItem)+':::::::::::::::::::::val'+val);
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
           
           var pathtoLocImage = "file://"+window.appRootDir.fullPath + "/images/" +dItemId+"thumb.png";
           
           
           //alert("pathtoLocImage"+pathtoLocImage);
           
           
           dwnload += "<a id="+dItemId+" title="+fpSend+" onclick='downloadItemClick(this)' data-transition='slide' style='text-decoration:none;font-style:normal;color:black;display:block;background : #F0EFED'>";
           dwnload = dwnload + "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
           dwnload = dwnload + "<tr><td id='"+dItemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='2' >";
           dwnload = dwnload + "<img src='"+pathtoLocImage+"' style='height:75px;width:75px;border:solid 1px;margin:auto;margin-left:10px;margin-top:2%'></td>";
           dwnload = dwnload + "</td><td id='' style='margin:0px; padding:0px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;padding-top:8px'><b>"+dTitle+"</b></td>";
           dwnload = dwnload + "<td id='' style='margin:0px; padding:0px; width:15%;' align='right'>";
           dwnload = dwnload + "<img src='"+downloadContentType+"' style='border:none;padding:0px;margin-right:8px;height:20px;width:20px;vertical-align:middle'/>";
           dwnload = dwnload + "</td></tr>";
           dwnload = dwnload + "</table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a>";
           
           
           });
    $('#allDownloads').html(dwnload);
}



function downloadItemClick(element)
{
   // alert('dItemId  :'+element.id);
    var dItemId = element.id
    //var type = element.id.charAt(1);
    var url = element.title;
    var type = url.charAt(1);
    var tPath = '';
    
    //  alert('URL--'+url);
    if(type=="A")
    {
        
        tPath = window.appRootDir.fullPath + "/" +url;
        
        //alert(tPath);
        
        playMedia(tPath, dItemId,'audio');
        
    }
    else if(type=="V")
    {
        tPath = window.appRootDir.fullPath + "/" +url;
        
        //alert("tPath"+tPath);
        
        playMedia(tPath, dItemId,'video');
    }
    else
    {
        
        tPath = window.appRootDir.fullPath + "/"+url;
        //alert("tPath"+tPath);
        //tPath= tPath.substring(8);
        //openDeleteDocumentPath = tPath;
        //downloadPDF(tPath);
        openDeleteDocumentPath = '';
        openDeleteDocumentPath = tPath;
        filePath = tPath;
        loadChildBrowser(true,tPath);
       // openDocument();
        
       // alert(tPath);
    }
    
    
    
}



function CheckAllDownloads()
{
    var finaldwn = new Array();
    
    // localPathAudio
    // localPathVideo
    // localPathPresentation
    // localPathTranscript
    
    
    $.each(jsonData.audio, function(key, CheckDownload) {
           
          // alert(CheckDownload.aURL);
          // console.log("CHECK DOWNLOAD** --------> " + JSON.stringify(CheckDownload));
           
         //  alert(CheckDownload.audioUrl);
           
           if(CheckDownload.isDownloadedAudio == "true" && CheckDownload.audioUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
          
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
          // alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           console.log("AUDIO A--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedVideo == "true" && CheckDownload.videoUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
          // alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
          // console.log("AUDIO V--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedPresentation == "true" && CheckDownload.presentationUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           // /Users/administrator/Library/Application Support/iPhone Simulator/6.0/Applications/4C42C928-EB79-4B61-9E80-A3C93A4272E0/Documents/Videos/VP569.pdf
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
           
           //console.log("AUDIO P--------> " + createPath);
           
           //CheckDownload.val = "1";
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           finaldwn.push(tempOBJ);
           }
           
           if(CheckDownload.isDownloadedTranscript == "true" && CheckDownload.transcriptUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/AT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
         //  console.log("AUDIO T--------> " + createPath);

           //CheckDownload.val = "1";
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           finaldwn.push(tempOBJ);
           }
           
           
           });
    //alert("finaldwn.audios"+finaldwn.length);
    
    
    $.each(jsonData.video, function(key, CheckDownload) {
           if(CheckDownload.isDownloadedAudio == "true" && CheckDownload.audioUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
        //   alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
         //  console.log("VIDEO A--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedVideo == "true" && CheckDownload.videoUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
         //  alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           //console.log("VIDEO V--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedPresentation == "true" && CheckDownload.presentationUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           //tempOBJ.path = CheckDownload.localPathPresentation;
          
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
          // console.log("VIDEO P--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           if(CheckDownload.isDownloadedTranscript == "true" && CheckDownload.transcriptUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           // tempOBJ.path = CheckDownload.localPathTranscript;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
        
           tempOBJ.path = createPath;
          // console.log("VIDEO T--------> " +CheckDownload.itemId+ " " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           
           
           });
    //alert("finaldwn.video"+finaldwn.length);
    
    $.each(jsonData.panelDiscussions, function(key, CheckDownload) {
           if(CheckDownload.isDownloadedAudio == "true" && CheckDownload.audioUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
         //  alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           //console.log("PD A--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateA;
           
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedVideo == "true" && CheckDownload.videoUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
          // alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
           //console.log("PD V--------> "+CheckDownload.itemId+" " + createPath);
           

           tempOBJ.ddate = CheckDownload.downloadedDateV;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           if(CheckDownload.isDownloadedPresentation == "true" && CheckDownload.presentationUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
           
          // console.log("PD P--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           if(CheckDownload.isDownloadedTranscript == "true" && CheckDownload.transcriptUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/PT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;

          // console.log("P T--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           });
    
    //alert("finaldwn.panelDiscussions"+finaldwn.length);
    
    
    $.each(jsonData.interviews, function(key, CheckDownload) {
          
           if(CheckDownload.isDownloadedAudio == "true" && CheckDownload.audioUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
         //  alert("-------------> " + extractFormatType);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IA" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
          // console.log("INT A--------> "+CheckDownload.itemId+" " + createPath);
           

           tempOBJ.ddate = CheckDownload.downloadedDateA;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
          
           if(CheckDownload.isDownloadedVideo == "true" && CheckDownload.videoUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
          
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
        //   alert("-------------> " + extractFormatType);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IV" + CheckDownload.itemId + extractFormatType;
           
           tempOBJ.path = createPath;
           
          // console.log("INT V--------> "+CheckDownload.itemId+" " + createPath);
           
           tempOBJ.ddate = CheckDownload.downloadedDateV;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           if(CheckDownload.isDownloadedPresentation == "true" && CheckDownload.presentationUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IP" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
       // console.log("INT P--------> "+CheckDownload.itemId+" " + createPath);
           
           
           tempOBJ.ddate = CheckDownload.downloadedDateP;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           if(CheckDownload.isDownloadedTranscript == "true" && CheckDownload.transcriptUrl != "")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = CheckDownload.localPathTranscript.substr(0,lastInstance);
           createPath = createPath + "/IT" + CheckDownload.itemId + ".pdf";
           
           tempOBJ.path = createPath;
       // console.log("INT T--------> "+CheckDownload.itemId+" " + createPath);
           
           
           tempOBJ.ddate = CheckDownload.downloadedDateT;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           });
    //     alert("finaldwn.interviews"+finaldwn.interviews.length);
    
    
    $.each(jsonData.documents, function(key, CheckDownload) {
           
           if(CheckDownload.isDownloaded == "true")
           {
        //   if(CheckDownload.isDownloadedAudio == "true")
           {
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "5";
           tempOBJ.title = CheckDownload.title;
           tempOBJ.path = CheckDownload.localPath;
           tempOBJ.ddate = CheckDownload.downloadedDateD;
           //CheckDownload.val = "1";
           finaldwn.push(tempOBJ);
           }
           
           }
           });
    
    
    
   // console.log("FINAL DOWNLOADS$$ ---------> " + JSON.stringify(finaldwn));
    
    
  //  console.log("unsorted"+JSON.stringify(finaldwn));
    finaldwn.sort(function(a, b){
                  var dateA1=new Date(a.ddate), dateB1=new Date(b.ddate);
                  return dateB1-dateA1 // sort by date ascending
                  });
   // console.log("sorted** ---------> "+JSON.stringify(finaldwn));
    readDownloadedList(finaldwn);
    
}





