var len;
var mediaID;

var downloadList = new Array();
var allDownloaded = new Array();

var index1 = 0;
var nextItemId;
var loggedIn = false;
var userName = "";

//var rssUrl = 'https://techtime.stage1.accenture.com/mobile-home-page-latestupdates-audio-video.xml'; 
//var rssUrl = 'https://techtime.stage1.accenture.com/rss.xml';


var rssUrlDoc = 'https://techtime.accenture.com/mobile-home-page-latestupdates-documents.xml';

var d = new Date();

var AccURL = "";

var mediaLink;
var selectedCategory;

var downloadFilesCount = 0;
var actualDownloadedCount= 0 ;

var categories = new Array();
var itemsList = new Array();

var keysArr = new Object();
var categoryItemsList = new Array();

var isOnline = false;
var platform;

var sPath;
var localFilePath = "";
var currentPlayingItemId="";
var downloadedItems = new Object();


var screenWidth = screen.width;
var screenHeight = screen.height;

var deviceName = '';

// var deviceName = '';

//var refreshFromCategoryItem = false;

function onBodyLoad()
{
 //   alert("BODY LOAD -----");
    
	document.addEventListener("deviceready", onDeviceReady, false);
    
    window.addEventListener("online", resumeOnline, false);
    window.addEventListener("offline", takeAppOffline, false);
  
    document.addEventListener("orientationchange", doOnOrientationChange);
    deviceDetection();
    doOnOrientationChange();
    
     
    
    console.log('********* onBodyLoad :'+(dd.getTime()/1000));
    
   // console.log("1 **onBodyLoad function called ----->");
    
}



function onDeviceReady() {
    
   // console.log("2 **onDeviceReady function called ----->");
    
    document.addEventListener("backbutton", backKeyDown, false);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS1, errorFileSystem);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSDownloadMain, errorFileSystem);
    checkConnection();
    
}

function timerDownload()
{
    var a = new Date();
    var n = a.getMinutes();
    
   // alert("n-->"+n);
}


/*function doOnOrientationChange()
{
   
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    var switchCase = '';
    
     alert("1");
    
    if(screenHeight > screenWidth)
    {
        switchCase = "portrait";
    }
    else if (screenHeight < screenWidth)
    {
        switchCase = "landscape";
    }
    
    alert("screen.width"+screen.width);
    
    alert("screenHeight"+screen.height);
    
    switch(switchCase)
    {
        case "landscape":
            //alert('landscape screenHeight'+screenHeight+'    screenWidth :'+screenWidth);
            setTimeout(changeLandScape(),600);
            break;
            
        case "portrait":
            //alert('portrait screenHeight'+screenHeight+'    screenWidth :'+screenWidth);
            
            setTimeout(changePotrait(),600);
            //changePotrait();
            break;
            
    }
}*/

function doOnOrientationChange()
{
    switch(window.orientation)
    {
        case -90:
           // alert("-90");
            changeLandScape();
            break;
        case 90:
           // alert("90");
            changeLandScape();
            break;
        case 0:
           // alert("0");
            changePotrait();
            break;
        case 180:
           // alert("180");
            changePotrait();
            break;
        default:
            changePotrait();
            break;
    }
}



function changePotrait()
{
   // alert("THIS");
    var screenWidth = screen.width;
    var screenHeight = screen.height;
   // alert(screenWidth + " " + screenHeight);
   // alert("POTRAIT");
    
    if(deviceName=="iPhone3")
    {
       // alert("1");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '84px');
        
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPhone4")
    {
//                alert("2");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPhone5")
    {
//                alert("3");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '89px');
        
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPad")
    {
//                alert("4");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '92px');
        $('#usernameDisplay').css('margin-left','12px');
    }
    else if(deviceName=="iPadNew")
        {
//                    alert("5");
//                    alert(deviceName);
            $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '186px');
            $('#usernameDisplay').css('margin-left','12px');
        }
    else if(deviceName=="iPhone4s")
    {
//                alert("6");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '84px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    
}

function changeLandScape()
{
    
   // alert("LANDSCAPE");
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    
   //  alert(screenWidth + " " + screenHeight);
    
  //  alert("------> "+deviceName);
    
    if(deviceName=="iPhone3")
    {
//        alert(deviceName);
            //    alert("1-1");
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '93px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPhone4")
    {
            //    alert("2-2");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPhone5")
    {
       //         alert("3-3");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '89px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    else if(deviceName=="iPad")
    {
//                alert("4-4");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '89px');
        $('#usernameDisplay').css('margin-left','12px');
    }
    else if(deviceName=="iPadNew")
    {
//                alert("5-5");
//                alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '180px');
        $('#usernameDisplay').css('margin-left','12px');
    }
    else if(deviceName=="iPhone4s")
    {
          //      alert("6-6");
//         alert(deviceName);
        $('#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateDetailAuthor').css('top', '93px');
        $('#usernameDisplay').css('margin-left','10px');
    }
    
  
}

function deviceDetection()
{
    
  //  console.log("3 **deviceDetection function called ----->");
    
    // alert("asdas:");
    if((screenWidth == 320 && screenHeight == 480) || (screenWidth == 480 && screenHeight == 320))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone3.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone3.png';
        deviceName = "iPhone3";
//        alert(deviceName);
      //  deviceName = ".iPhone3";
        
        //alert("iPhone 3 or 3G --------------> " + imageAccentureLogoSrc);
    } else if((screenWidth == 640 && screenHeight == 960) || (screenWidth == 960 && screenHeight == 640))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone4.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone4.png';
    
        deviceName = "iPhone4s";
//                alert(deviceName);
       // deviceName = ".iPhone4";
        //  alert("iPhone 4 or 4S" + imageAccentureLogoSrc);
    } else if((screenWidth == 640 && screenHeight == 1136) || (screenWidth == 1136 && screenHeight == 640))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone5.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone5.png';
        deviceName = "iPhone5";
//                alert(deviceName);
     //   deviceName = ".iPhone5";
        //alert("iPhone 5 -------------->"  + imageAccentureLogoSrc);
    } else if((screenWidth == 768 && screenHeight == 1024) || (screenWidth == 1024 && screenHeight == 768))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_ipad.png';
        imageHighPerfSrc = 'images/header_highPerformance_ipad.png';
        deviceName = "iPad";
//                alert(deviceName);
               // alert(screenHeight + " " + screenWidth);
    //    deviceName = ".iPad";
        //alert("iPad -------------->"  + imageAccentureLogoSrc);
    } else if((screenWidth == 1576 && screenHeight == 2048) || (screenWidth == 2048 && screenHeight == 1576))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_ipadNew.png';
        imageHighPerfSrc = 'images/header_highPerformance_ipadNew.png';
        
       deviceName = "iPadNew";
//                alert(deviceName);
        
       // alert(screenHeight + " " + screenWidth);
      //  deviceName = ".iPadNew";
        //alert("The New iPad ------------> " + imageAccentureLogoSrc);
    }else if((screenWidth == 320 && screenHeight == 568) || (screenWidth == 568 && screenHeight == 320))
    {
        imageAccentureLogoSrc = 'images/header_accentureRed_iphone3.png';
        imageHighPerfSrc = 'images/header_highPerformance_iphone3.png';
        deviceName = "iPhone4";
//                alert(deviceName);
     //   deviceName = ".iPhone3";
        //  alert("iPhone 4 or 4S" + imageAccentureLogoSrc);
    }
    
    // alert("imageHighPerfSrc"+imageAccentureLogoSrc);
    //$('#accRed').attr("src","images/header_highPerformance_iphone3.png");
    
    // alert(screenWidth + " " + screenHeight);
    
    $('img[id^="accRed"]').attr('src', imageAccentureLogoSrc);
    $('img[id^="accHPD"]').attr('src', imageHighPerfSrc);
    
    
    //     document.getElementById('accRed0').setAttribute('src',imageAccentureLogoSrc);
    //    document.getElementById('accRed').setAttribute('src',imageAccentureLogoSrc);
    //
    //    document.getElementById('accRed1').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed2').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed3').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed4').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed5').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed6').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed7').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed8').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed9').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed10').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed11').setAttribute('src',imageAccentureLogoSrc);
    //      document.getElementById('accRed12').setAttribute('src',imageAccentureLogoSrc);
    
    //     document.getElementById('accHPD').setAttribute('src',imageHighPerfSrc);
    //   // document.getElementById('accHPD0').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD1').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD2').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD3').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD4').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD5').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD6').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD7').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD8').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD9').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD10').setAttribute('src',imageHighPerfSrc);
    //    document.getElementById('accHPD11').setAttribute('src',imageHighPerfSrc);
    //   // document.getElementById('accHPD12').setAttribute('src',imageHighPerfSrc);
    
    
}

function checkConnection() {
    
    //console.log("4 **checkConnection function called ----->");
    
    var dd = new Date();
    console.log('********* checkConnection :'+(dd.getTime()-d.getTime())/1000);
    
    
	var networkState = navigator.network.connection.type;       //console.log('networkState:' + networkState);
    
    //alert(networkState);
    
        if ((networkState != 'unknown') && (networkState != 'No network connection') && (networkState != 'none')) {
            isOnline = true;    
            //$.mobile.changePage("#loginScreen");
        }else {
            isOnline = false;
        }
   // console.log("4 **checkConnection CheckConnection()-->isOnline-->"+isOnline+"<--Network State-->"+networkState);
	loadApplicationState(isOnline);
    
}

function loadApplicationState(state){
    
    console.log("5 **loadApplicationState function called ----->");
    
    var dd = new Date();
    console.log('********* loadApplicationState :'+(dd.getTime()-d.getTime())/1000);
    
    
     createJsonFormat();
   // createDownloadJsonFormat();
    
	if(state){
        getSubscribeRss();            
        
	}else {
        loadDataforOfflineMode();
	}
    
    console.log("5 **loadApplicationState function called ----->"+state);
    
	setApplicationState(state);  
    
}

function gotFS(fileSystem) {
    //alert("FILE SYSTEM");
    
	fileSystem.root.getDirectory("Videos", {
		create : true,
		exclusive : false
	}, getDirectoryEntry, errorFileSystem);
}

function gotFS1(fileSystem) {
        //alert("FILE SYSTEM 1");
    
	fileSystem.root.getFile("data.json", {
								create : true,
								exclusive : false
                            }, getDirectoryEntry1, errorFileSystem);
}

function getDirectoryEntry(entry) {
       // alert("FILE SYSTEM 2");
    
	sPath = entry.fullPath;
}

function getDirectoryEntry1(entry) {}

function errorFileSystem(evt) {
	console.log('Error in errorFileSystem : ' + evt.target.error.code);
}



function resumeOnline(){
    
   // alert("7 **resumeOnline function called ----->");
   // alert("online");
    var pendingDWArray = [];
    
	isOnline = true; 
    setApplicationState(true);
    
//    alert("jsonData.pendingDownloads"+JSON.stringify(jsonData.pendingDownloads));
//    pendingDWArray = jsonData.pendingDownloads;
//    alert("pendingDWArray" +JSON.stringify(pendingDWArray));
//    resumePendingDownloads(pendingDWArray);
    
//    alert('online switch  :');
}

function takeAppOffline(){
  //alert("in take app offline");
	
    console.log("8 **takeAppOffline function called ----->");
    
    
    isOnline = false;
    setApplicationState(false);
    
    changeDownloadLogoutColor();
    //pendingDownloadstoJson();
    
    console.log("Taking APP OFFLINE --------------");
    
//    console.log('1111111111111111 before file write .....')
    
    getFileSystemRefForWriting(jsonData);
    
    console.log("11 **takeAppOffline JSON DATA when APP goes **OFFLINE** function called ----->" + JSON.stringify(jsonData));
    
}

function setApplicationState(value){

    console.log("6 **setApplicationState function called ----->"+value);
    
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
	if($.mobile.activePage.is('#intialPage')){
        
        e.preventDefault();
//        $.mobile.changePage("#businessCategory");
        
    } else if($.mobile.activePage.is('#logoutPage')) {
    	
        e.preventDefault();
        $.mobile.changePage("#logoutPage");
        
    }else if($.mobile.activePage.is('#errorPage')) {
    	
        e.preventDefault();
        $.mobile.changePage("#errorPage");
    
    }else {
        
        navigator.app.backHistory()
    }
}


function stopPlayingMedia()
{
   // alert("will Pause");
    
    if(document.getElementById('videoStream'))
    {
        document.getElementById('videoStream').pause();
    }
    
    if(document.getElementById('audioPlayer'))
    {
        document.getElementById('audioPlayer').pause();
    }
    
}
