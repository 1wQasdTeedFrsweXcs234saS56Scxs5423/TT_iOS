var len;
var userName = "";
var categories = new Array();
var categoryItemsList = new Array();

var isOnline = false;

var sPath;

var screenWidth = screen.width;
var screenHeight = screen.height;

var deviceName = '';

var globalPath = '';
var globalPathNew = '';

var backFlag = false;
var spotLightFlag = false;
var playlistItemsPageFlag = false;
var searchFromMediaPage = false;
var searchFromEventsPage = false;
var searchFromSpotlightPage = false;
var searchFromUpcomingEventsPage = false;
var searchFromTAListResultPage = false;
var searchFromAuthorDetailPage = false;
var searchFromDownloadsPage = false;
var searchFromMainPage = false;
var searchFromContactUsPage = false;
var searchFromAboutPage = false;
var searchFromFaqPage = false;
var searchFroSubscribPage = false;
var searchFromTechWatch = false;
var searchFromtechWatchPage = false;
var searchFromPlaylistsPage = false;
var searchFromContributePage = false;
var searchFromPlaylistItemsPage = false;
var searchFromSharePlaylistsPage = false;
var searchFromAddToPlaylistPage = false;
var searchFromDigitalPage = false;
var playFromDownloadsPage = false;

var entries = [];
var downloadedThumbs = [];
var downloadedActuals = [];

function onBodyLoad()
{
	document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("online", resumeOnline, false);
    window.addEventListener("offline", takeAppOffline, false);
    
    document.addEventListener("orientationchange", doOnOrientationChange);
    deviceDetection();
    doOnOrientationChange();
}

function readMoreData(urlToOpen)
{
    if(isOnline)
    {
        var currentUrl = urlToOpen;
        var ref = window.open(currentUrl, '_blank', 'location=yes');
        ref.addEventListener('loadstart', function() { });
        ref.addEventListener('loadstop', function() { });
        ref.addEventListener('exit', function() { });
    } else if(!isOnline)
    {
        jAlert("Please go online to view the content.", "Tech Time");
    }
    
}


function onDeviceReady() {
    
    // Main Account ID
    // window.GA.trackerWithTrackingId("UA-41889841-1");
    // Testing Account ID
    window.GA.trackerWithTrackingId("UA-48298549-1");
    window.GA.trackView("/TechTimeApp-IOS");
    
    document.addEventListener("backbutton", backKeyDown, false);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS1, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSDownloadMain, errorFileSystem);
    deviceUuid = deviceUDID;
  
    checkConnection();
    
}

function timerDownload()
{
    var a = new Date();
    var n = a.getMinutes();
}


function doOnOrientationChange()
{
    switch(window.orientation)
    {
        case -90:
            changeLandScape();
            break;
        case 90:
            changeLandScape();
            break;
        case 0:
            changePotrait();
            break;
        case 180:
            changePotrait();
            break;
        default:
            changePotrait();
            break;
    }
    
}


function changePotrait()
{
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    
    if(deviceName=="iPhone3")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '84px');
        
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPhone4")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPhone5")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '60px');
        
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPad")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '92px');
        $('#usernameDisplay').css('margin-left','12px');
        $('#a2').css('height', '13%');
        $('#a3').css('height', '13%');
    }
    else if(deviceName=="iPadNew")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '186px');
        $('#usernameDisplay').css('margin-left','12px');
        $('#a2').css('height', '13%');
        $('#a3').css('height', '13%');
    }
    else if(deviceName=="iPhone4s")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '84px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    
}

function changeLandScape()
{
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    
    if(deviceName=="iPhone3")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '93px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPhone4")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPhone5")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    else if(deviceName=="iPad")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '89px');
        $('#usernameDisplay').css('margin-left','12px');
        $('#a2').css('height', '17%');
        $('#a3').css('height', '17%');
        
    }
    else if(deviceName=="iPadNew")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '180px');
        $('#usernameDisplay').css('margin-left','12px');
        $('#a2').css('height', '17%');
        $('#a3').css('height', '17%');
    }
    else if(deviceName=="iPhone4s")
    {
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage').css('top', '93px');
        $('#usernameDisplay').css('margin-left','10px');
        $('#a2').css('height', '20%');
        $('#a3').css('height', '20%');
    }
    
    
}

function deviceDetection()
{
    
    
    if((screenWidth == 320 && screenHeight == 480) || (screenWidth == 480 && screenHeight == 320))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone3.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone3.png';
        deviceName = "iPhone3";
        
        
    } else if((screenWidth == 640 && screenHeight == 960) || (screenWidth == 960 && screenHeight == 640))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone4.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone4.png';
        
        deviceName = "iPhone4s";
        
        
    } else if((screenWidth == 640 && screenHeight == 1136) || (screenWidth == 1136 && screenHeight == 640))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone5.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone5.png';
        deviceName = "iPhone5";
        
        
    } else if((screenWidth == 768 && screenHeight == 1024) || (screenWidth == 1024 && screenHeight == 768))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_ipad.png';
        imageHighPerfSrc = 'images/header_highPerformance_ipad.png';
        deviceName = "iPad";
        
        
    } else if((screenWidth == 1576 && screenHeight == 2048) || (screenWidth == 2048 && screenHeight == 1576))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_ipadNew.png';
        imageHighPerfSrc = 'images/header_highPerformance_ipadNew.png';
        
        deviceName = "iPadNew";
        
        
    }else if((screenWidth == 320 && screenHeight == 568) || (screenWidth == 568 && screenHeight == 320))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone3.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone3.png';
        deviceName = "iPhone4";
    }
    
    $('img[id^="accRed"]').attr('src', imageAccentureLogoSrc);
    $('img[id^="accHPD"]').attr('src', imageHighPerfSrc);
    
    
}


function checkConnection() {
    
    var networkState = navigator.network.connection.type;
    
    var usrToggle = window.localStorage.getItem("status");
    
    if(usrToggle == "online")
    {
        document.addEventListener("online", resumeOnline, false);
        document.addEventListener("offline", takeAppOffline, false);
        
        if ((networkState != 'unknown') && (networkState != 'No network connection') && (networkState != 'none')) {
            
            isOnline = true;
            $('#homescreenLogout').removeClass('dynamicDivForLogout');
            $('#homescreenLogout').addClass('dynamicDiv');
            
        }
        else {
            
            isOnline = false;
        }
    }
    else
    {
        isOnline = false;
    }
    
    loadApplicationState(isOnline);
}


function loadApplicationState(state){
    
    var dd = new Date();
    createJsonFormat();
	if(state){
        loadAboutTechTimeRss();
        getSubscribeRss();
        
	}else {
        loadDataforOfflineMode();
	}
    
	setApplicationState(state);
}

function gotFS(fileSystem) {
    var dirReader = fileSystem.root.createReader();
    
    
    dirReader.readEntries(function(results){
                          var i = 0;
                          for(i = 0;i<results.length;i++)
                          {
                            if(results[i].isFile && results[i].name != "data.json")
                                {
                                    var fileName = results[i].name.split(".");
                                    entries.push(fileName[0]);
                                    //alert(fileName[0]);
                                }
                         
                          }
                          
                          jsonData.listOfFiles = entries;
                          //alert(jsonData.listOfFiles.length + " " + jsonData.listOfFiles);
                          });
    
    entries = uniqueFileList(entries);
    
    //alert(entries.length);
    
	fileSystem.root.getDirectory("TechTime", {
                                 create : true,
                                 exclusive : false
                                 }, getDirectoryEntry, errorFileSystem);
    
    fileSystem.root.getDirectory("Contribute", {
                                 create : true,
                                 exclusive : false
                                 }, getContributeDirectoryEntry, errorFileSystem);
    
    fileSystem.root.getDirectory("images", {
                                 create : true,
                                 exclusive : false
                                 }, getImagesDirectoryEntry, errorFileSystem);
    
   /* fileSystem.root.getDirectory("images", {create: false, exclusive: false},
                                 gotImagesDir, errorFileSystem
                                 ); */
}

/*function gotImagesDir(entry)
{
    var dirImagesReader = entry.createReader();
    dirImagesReader.readEntries(function(results){

                          });
} */

function getFileNamesInDirectory()
{
    var dirReader = fileSystem.root.createReader();
    
    dirReader.readEntries(function(results){
                          var i = 0;
                          for(i = 0;i<results.length;i++)
                          {
                          if(results[i].isFile && results[i].name != "data.json")
                          {
                          var fileName = results[i].name.split(".");
                          entries.push(fileName[0]);
                          //alert(fileName[0]);
                          }
                          
                          }
                          
                          jsonData.listOfFiles = entries;
                          //alert(jsonData.listOfFiles.length + " " + jsonData.listOfFiles);
                          });
}

function gotFS1(fileSystem) {    
	fileSystem.root.getFile("data.json", {
                            create : true,
                            exclusive : false
                            }, getDirectoryEntry1, errorFileSystem);
}

function getDirectoryEntry(entry) {
    var lastIndex = entry.fullPath.lastIndexOf("/")
    var str = entry.fullPath.substring(0, lastIndex);
	sPath = str + "/";
    globalPath = sPath;
    globalPathNew = sPath;
}

var contributePath = '';
var contributeGlobalPath = '';
var contributeGlobalPathNew = '';
function getContributeDirectoryEntry(entry)
{
    var lastIndex = entry.fullPath.lastIndexOf("/")
    var str = entry.fullPath.substring(0, lastIndex);
	contributePath = str + "/Contribute/";
    contributeGlobalPath = contributePath;
    contributeGlobalPathNew = contributePath;
    
}

function getImagesDirectoryEntry(entry)
{
    var imagesDirectory = entry.createReader();
    
    downloadedActuals = [];
    downloadedThumbe = [];
    
    imagesDirectory.readEntries(function(results){
                                var i=0;
                                for(i=0;i<results.length;i++)
                                {
                                    var imageName = results[i].name.substring(0, results[i].name.length);
                                
                                    if(imageName.indexOf("thumb") == -1)
                                    {
                                        downloadedActuals.push(imageName);
                                    } else if(imageName.indexOf("actual") == -1)
                                    {
                                        downloadedThumbs.push(imageName);
                                    }
                                }
                                
                  });
    
}

function getDirectoryEntry1(entry) {}

function errorFileSystem(evt) {
	console.log('Error in errorFileSystem : ' + evt.target.error.code);
}



function resumeOnline(){
    
    $.mobile.fixedToolbars.show(true);
    var pendingDWArray = [];
	isOnline = true;
    setApplicationState(true);
}

function takeAppOffline(){
    
    networkState = navigator.network.connection.type;
    if ((networkState != 'unknown') && (networkState != 'No network connection') && (networkState != 'none')) {
    }

    var DivData =  $('div[id="showProgressBar"]').html();
    $('div[id="showProgressBar"]').html('');
    var DivData =  $('div[id="showProgressBar"]').html();
    isOnline = false;
    setApplicationState(false);
    changeDownloadLogoutColor();
    
  //  generateTechWatchShowCaseArticle();
}

function setApplicationState(value){
    
    if(value){
        
        $("#downloadFile").removeClass('ui-disabled');
        $("#btnRefreshRSS").removeClass('ui-disabled');
        $("#btnRefreshItems").removeClass('ui-disabled');
        
        $("#logout").children().text('Logout');
        $("#logout2").children().text('Logout');
        $("#logout3").children().text('Logout');
        
    }else {
        $("#downloadFile").addClass('ui-disabled');
        $("#btnRefreshRSS").addClass('ui-disabled');
        $("#btnRefreshItems").addClass('ui-disabled');
        
        $("#logout").children().text('  Exit  ');
        $("#logout2").children().text('  Exit  ');
        $("#logout3").children().text('  Exit  ');
    }
}

function backKeyDown(event){
    
}


function stopPlayingMedia()
{
    
    if(document.getElementById('videoStream'))
    {
        document.getElementById('videoStream').pause();
    }
    
    if(document.getElementById('audioPlayer'))
    {
        document.getElementById('audioPlayer').pause();
    }
    
}

function resetSearchFlags()
{
    searchFlag = false;
    searchFromMediaPage = false;
    searchFromEventsPage = false;
    searchFromSpotlightPage = false;
    searchFromUpcomingEventsPage = false;
    searchFromTAListResultPage = false;
    searchFromAuthorDetailPage = false;
    searchFromDownloadsPage = false;
    searchFromMainPage = false;
    searchFromContactUsPage = false;
    searchFromAboutPage = false;
    searchFromFaqPage = false;
    searchFroSubscribPage = false;
    searchFromTechWatch = false;
    searchFromtechWatchPage = false;
    searchFromPlaylistsPage = false;
    searchFromContributePage = false;
    searchFromPlaylistItemsPage = false;
    searchFromSharePlaylistsPage = false;
    searchFromAddToPlaylistPage = false;
    searchFromSpotlightPage = false;
    mediaFlag = false;
    playFromDownloadsPage = false;
    isFromDigitalHomePage = false;
    isSpotlightDigital = false;

}
