var launchingMode = 'online';
var downloadList = new Array();
var currentMode = ''
var mySelection;
var status = '';
var currentPage;
var fileObjAbort;
var nv = ''

var searchInputFlag = false;

var deviceUDID = '';


$(document).ready(function() {
                  
                  $.mobile.hashListeningEnabled = false;
                  $.mobile.pushStateEnabled = false;
                  $.mobile.changePage.defaults.changeHash = false;
                  
                  
                  $.mobile.changePage("#intialPage");
                  
                  
                  mySelection = window.localStorage.getItem("status");
                  
                  if(mySelection == "" || mySelection == null)
                  {
                  mySelection = "online";
                  }
                  
                  if (mySelection == "online") {
                  
                  $('.abc').attr('checked',true);
                  $('.xyz').attr('checked',false);
                  
                  } else {
                  $('.abc').attr('checked',false);
                  $('.xyz').attr('checked',true);
                  
                  }
                  
                  
                  
                  
                  $(document).on("pageshow", "div[data-role=page]", function(event){

                                 });
                  
                  $("input[type='radio']").click(function() {
                                                 
                                                 var lastVisitedPage = $(this).parents('div').last().attr('id');
                                                 
                                                 window.localStorage.setItem("currentPage",lastVisitedPage);
                                                 
                                                 
                                                 currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");
                                                 currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");
                                                 mySelection = $(this).val();
                                                 
                                                 if (mySelection == "online") {
                                                 $('.abc').attr('checked',true);
                                                 $('.xyz').attr('checked',false);
                                                 usrToggle = true;
                                                 
                                                 $('#homescreenLogout').removeClass('dynamicDivForLogout');
                                                 $('#homescreenLogout').addClass('dynamicDiv');
                                                 
                                                 window.localStorage.setItem("status", "online");
                                                 
                                                 parent.window.location.href = "https://techtime.stage2.accenture.com/mobile/index.php";
                                                 
                                                 } else {
                                                 
                                                 $('.abc').attr('checked',false);
                                                 $('.xyz').attr('checked',true);
                                                 window.localStorage.setItem("status", "offline");
                                                 
                                                 $('#homescreenLogout').removeClass('dynamicDiv');
                                                 $('#homescreenLogout').addClass('dynamicDivForLogout');
                                                 
                                                 var srEle = window.localStorage.getItem("searchString");
                                                 window.localStorage.setItem("searchString",srEle);
                                                 
                                                 window.localStorage.setItem("eventFlag", eventsFlag);
                                                 window.localStorage.setItem("spotLightFlag", spotLightFlag);
                                                 window.localStorage.setItem("mediaFlag",mediaFlag);
                                                 
                                                 stopPlayingMedia();
                                                 
                                                 usrToggle = false;
                                                 isOnline = false;
                                                 if(fileObjAbort)
                                                 {
                                                 fileObjAbort.abort(abortSuccess, errorDeleteFileSystem);
                                                 downloadList = [];
                                                 var chk =  document.getElementById('showProgressBar').innerHTML;
                                                 document.getElementById('showProgressBar').innerHTML = " ";
                                                 }
                                                 
                                                 if($('#playlistItemPlayer').attr('src').indexOf('techtime.stage2.accenture') != -1)
                                                 {
                                                 displayPlaylistItems(currentOpenPlaylist);
                                                 //  $('#playlistItemPlayer').attr('src', '');
                                                 
                                                 //alert($('#playlistItemPlayer').attr('src'));
                                                 }
                                                 
                                                 onDeviceReady();
                                                 
                                                 }
                                                 
                                                 $("input[type='radio']").checkboxradio();
                                                 $("input[type='radio']").checkboxradio("refresh");
                                                 
                                                 
                                                 });
                  
                  
                  var form1Var = $('#frmLogin');
                  
                  $('#logout,#logout2,#logout3').on('click', function() {
                                                    
                                                    userName = "";
                                                    
                                                    $('#avPlayer').html('');
                                                    logoutApp();
                                                    
                                                    });
                  
                  $('#audioBack').on('click', function() {
                                     document.getElementById('avPlayer').innerHTML = "";
                                     });
                  
                  $('#downloadFile').on('click', function() {
                                        downloadMedia();
                                        });
                  
                  $('#btnDeleteItem').on('click', function() {
                                         
                                         $('#avPlayer').css("display","none");
                                         deleteCurrentPlayingFile();
                                         });
                  
                  $('#imgBack').on('click', function() {
                                   
                                   $.mobile.changePage("#businessCategory");
                                   });
                  
                  $('#TAListResult').on('click', function() {
                                        getList();
                                        setFlag('media');
                                        });
                  
                  $('#BackPlayer').on('click', function() {
                                      
                                      $.mobile.changePage("#categoryItem");
                                      document.getElementById('avPlayer').innerHTML = "";
                                      });
                  
                  
                  
                  $('#searchTAListResult, #searchDetailMediaPage, #searchTechWatch,#searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage').focus(function(){
                                                                                                                                                                                                                                                                                                        $("#searchBusinessCategory").val('');
                                                                                                                                                                                                                                                                                                        if($(this).attr('placeholder') == ' Search'){
                                                                                                                                                                                                                                                                                                        $(this).attr('placeholder', '');
                                                                                                                                                                                                                                                                                                        }else if($(this).attr('placeholder') == currentSearchKey)
                                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                        $(this).attr('placeholder', currentSearchKey);
                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                        });
                  
                  
                  $('#searchTAListResult, #searchDetailMediaPage, #searchTechWatch, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage').blur(function(){
                                                                                                                                                                                                                                                                                                        if($(this).val() == ''){
                                                                                                                                                                                                                                                                                                        $(this).attr('placeholder', ' Search');
                                                                                                                                                                                                                                                                                                        searchInputFlag = false;
                                                                                                                                                                                                                                                                                                        }                                                                                                                                                 });
                  
                  
                  $('#searchBusinessCategory, #searchTAListResult, #searchDetailMediaPage, #searchTechWatch, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage').bind('keypress keydown keyup', function(e){
                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                 if(e.type == 'keypress' || e.type == 'keydown' || e.type == 'keyup')
                                                                                                                                                                                                                                                                                                                                 {
                                                                                                                                                                                                                                                                                                                                 searchInputFlag = true;
                                                                                                                                                                                                                                                                                                                                 } else if(e.type != 'keypress' || e.type != 'keydown' || e.type != 'keyup'){
                                                                                                                                                                                                                                                                                                                                 searchInputFlag = false;
                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                 });
                  
                                    });




function reloginToTechTime()
{
    $('.abc').attr('checked',true);
    $('.xyz').attr('checked',false);
    usrToggle = true;
    parent.window.location.href = "https://techtime.stage2.accenture.com/mobile/index.php";
    window.localStorage.setItem("status", "online");
}


function setAttributes()
{
    
    if(launchingMode == 'online')
    {
        $("div[id^='onlineModeDiv']").removeAttr("onclick");
        $("div[id^='offlineModeDiv']").attr("onclick","changeMode('offline')");
        
        $("div[id^='onlineModeDiv']").addClass("checkedOnlineMode");
        $("div[id^='onlineModeDiv']").addClass("addSelectedModeGradientOnline");
        $("label[id^='onlineMode']").addClass("addShadow");
        $("label[id^='currentModeDisplay']").text("Online Mode");
        
    } if(launchingMode == 'offline')
    {
        $("div[id^='offlineModeDiv']").removeAttr("onclick");
        $("div[id^='onlineModeDiv']").attr("onclick","changeMode('online')");
        $("div[id^='offlineModeDiv']").addClass("checkedOfflineMode");
        $("div[id^='offlineModeDiv']").addClass("addSelectedModeGradientOffline");
        $("label[id^='offlineMode']").addClass("addShadow");
        $("label[id^='currentModeDisplay']").text("Offline Mode");
        
    }
    
    
}

function stopStreaming(state, player) {
    
    $.each($('video'), function () {
           var a = this.poster;
           if(isOnline == false || isOnline == 'false')
           {
           this.poster = a;
           this.src = " ";
           
           this.load();
           jAlert('Please go online to view the video.', 'Tech Time');
           
           }
           });
}


function changeMode(mode)
{
    
    
    
    
}

function switchModeControls(mode)
{
    
    
}

function logoutApp() {
    $.mobile.changePage('#logoutPage');
}

function setUserInfo(value)
{
    if(value.length){
        
        var username = (value.substr(10,value.length)).split("@")[0];
        document.getElementById("lblUserName").innerHTML = username.replace(/\./g, '.');
        window.localStorage.setItem("username",username);
	}
}

function setUDIDInfo(udidString)
{
    deviceUDID = udidString;
}


function loadDataforOfflineMode()
{
    var userName = window.localStorage.getItem("userName");
	getFileSystemRefForReading(true, null);
}

var isDownloadOn = false;


function getFileSize(bytes) {
	if(bytes != 0 && bytes > 1024) {
		var mb = 1024*1024;
		return (bytes/mb).toFixed(1);
	} else {
		return bytes;
	}
}

function deleteCurrentPlayingFile() {
    if(document.getElementById('videoComp'))
    {
        document.getElementById('videoComp').pause();
    }
    
    if(document.getElementById('audioComp'))
    {
        document.getElementById('audioComp').pause();
    }
    jConfirm('The file will be permanently deleted from your device.', 'Tech Time', function(returnValue) {
             if( returnValue == true ){
             confirmDeleteFile();
             refreshFileSystem();
             } else {
             if(document.getElementById('videoComp'))
             {
             document.getElementById('videoComp').play();
             }
             
             if(document.getElementById('audioComp'))
             {
             document.getElementById('audioComp').play();
             }
             $('#avPlayer').css("display","block");
             
             }
             });
    
}

function confirmDeleteFile() {
    
    var fileNameToDelete = "";
    var changeIsDownloade = "";
    var mediaTypetoDelete = "";
    
    if(document.getElementById('videoComp') ){
        fileNameToDelete = document.getElementById('videoComp').src;
        changeIsDownloade = document.getElementById('videoComp').src;
        
        mediaTypetoDelete = 'video';
    }
    if(document.getElementById('audioComp')){
        fileNameToDelete = document.getElementById('audioComp').src;
        changeIsDownloade = document.getElementById('audioComp').src;
        
        mediaTypetoDelete = 'audio';
    }
    
    $('#avPlayer').html("");
    
    var n = fileNameToDelete.lastIndexOf("/")+1;
    fileNameToDelete = fileNameToDelete.substring(n,fileNameToDelete.length);
    deleteFile(sPath+"/"+fileNameToDelete);
    
    var lastIndex = fileNameToDelete.lastIndexOf('.');
    fileNameToDelete = fileNameToDelete.substr(0,lastIndex);
    changeIsDownloade = changeIsDownloade.substr(7,(changeIsDownloade.length));
    
    changeIsdownloadStatus(changeIsDownloade, fileNameToDelete, 'delete');
    
    //startSync();
    CheckAllDownloads();
    
    // Refresh File System and update your files list
    
    if (spotLightFlag) {
        
        var currElementId = window.localStorage.getItem("detailPageelementIdSpot");
        var currElementtype = window.localStorage.getItem("detailPagetypeSpot");
        var currElementcountNum = window.localStorage.getItem("detailPagecountNumSpot");
        
        if (currElementIdSpot != '' && currElementtypeSpot != '' && currElementcountNumSpot != '')
        {
           
            spotlightDataTypes(currElementIdSpot, currElementtypeSpot, currElementcountNumSpot);
        }
    } else if(playlistItemsPageFlag)
    {
        $.mobile.changePage('#DownloadsPage');
    } else {
        var currElementId = window.localStorage.getItem("detailPageelementId");
        var currElementtype = window.localStorage.getItem("detailPagetype");
        var currElementcountNum = window.localStorage.getItem("detailPagecountNum");
        
        if (currElementId != '' && currElementtype != '' && currElementcountNum != '')
        {
            detailPageView(currElementId,currElementtype,currElementcountNum);
        }
    }
    
}