function onBodyLoad(){document.addEventListener("deviceready",onDeviceReady,false);window.addEventListener("online",resumeOnline,false);window.addEventListener("offline",takeAppOffline,false);document.addEventListener("orientationchange",doOnOrientationChange);deviceDetection();doOnOrientationChange()}function readMoreData(e){if(isOnline){var t=e;var n=window.open(t,"_blank","location=yes");n.addEventListener("loadstart",function(){});n.addEventListener("loadstop",function(){});n.addEventListener("exit",function(){})}else if(!isOnline){jAlert("Please go online to view the content.","Tech Time")}}function onDeviceReady(){window.GA.trackerWithTrackingId("UA-41889841-1");window.GA.trackView("/TechTimeApp-IOS");document.addEventListener("backbutton",backKeyDown,false);window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,errorFileSystem);window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS1,errorFileSystem);window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFSDownloadMain,errorFileSystem);deviceDetails=device.platform;deviceUuid=deviceUDID;checkConnection()}function timerDownload(){var e=new Date;var t=e.getMinutes()}function doOnOrientationChange(){switch(window.orientation){case-90:changeLandScape();break;case 90:changeLandScape();break;case 0:changePotrait();break;case 180:changePotrait();break;default:changePotrait();break}}function changePotrait(){var e=screen.width;var t=screen.height;if(deviceName=="iPhone3"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","84px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPhone4"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","89px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPhone5"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","60px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPad"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","92px");$("#usernameDisplay").css("margin-left","12px");$("#a2").css("height","13%");$("#a3").css("height","13%")}else if(deviceName=="iPadNew"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","186px");$("#usernameDisplay").css("margin-left","12px");$("#a2").css("height","13%");$("#a3").css("height","13%")}else if(deviceName=="iPhone4s"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","84px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}}function changeLandScape(){var e=screen.width;var t=screen.height;if(deviceName=="iPhone3"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","93px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPhone4"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","89px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPhone5"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","89px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}else if(deviceName=="iPad"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","89px");$("#usernameDisplay").css("margin-left","12px");$("#a2").css("height","17%");$("#a3").css("height","17%")}else if(deviceName=="iPadNew"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","180px");$("#usernameDisplay").css("margin-left","12px");$("#a2").css("height","17%");$("#a3").css("height","17%")}else if(deviceName=="iPhone4s"){$("#navigateBusinessCategory, #navigateResultPage, #navigateTAListResult, #navigateSpotlightPage, #navigateUpcomingEventsPage, #navigateSubscribePage, #navigateAboutTectTimePage, #navigateDownloadsPage, #navigateFaqPage, #navigateDetailMediaPage, #navigateTechWatch, #navigateDetailAuthor, #navigatePlaylistItemPage, #navigatePlaylistsPage, #navigateAddToPlaylistPage, #navigateSharePlaylistsPage").css("top","93px");$("#usernameDisplay").css("margin-left","10px");$("#a2").css("height","20%");$("#a3").css("height","20%")}}function deviceDetection(){if(screenWidth==320&&screenHeight==480||screenWidth==480&&screenHeight==320){imageAccentureLogoSrc="images/header_accentureRed_iphone3.png";imageHighPerfSrc="images/header_highPerformance_iphone3.png";deviceName="iPhone3"}else if(screenWidth==640&&screenHeight==960||screenWidth==960&&screenHeight==640){imageAccentureLogoSrc="images/header_accentureRed_iphone4.png";imageHighPerfSrc="images/header_highPerformance_iphone4.png";deviceName="iPhone4s"}else if(screenWidth==640&&screenHeight==1136||screenWidth==1136&&screenHeight==640){imageAccentureLogoSrc="images/header_accentureRed_iphone5.png";imageHighPerfSrc="images/header_highPerformance_iphone5.png";deviceName="iPhone5"}else if(screenWidth==768&&screenHeight==1024||screenWidth==1024&&screenHeight==768){imageAccentureLogoSrc="images/header_accentureRed_ipad.png";imageHighPerfSrc="images/header_highPerformance_ipad.png";deviceName="iPad"}else if(screenWidth==1576&&screenHeight==2048||screenWidth==2048&&screenHeight==1576){imageAccentureLogoSrc="images/header_accentureRed_ipadNew.png";imageHighPerfSrc="images/header_highPerformance_ipadNew.png";deviceName="iPadNew"}else if(screenWidth==320&&screenHeight==568||screenWidth==568&&screenHeight==320){imageAccentureLogoSrc="images/header_accentureRed_iphone3.png";imageHighPerfSrc="images/header_highPerformance_iphone3.png";deviceName="iPhone4"}$('img[id^="accRed"]').attr("src",imageAccentureLogoSrc);$('img[id^="accHPD"]').attr("src",imageHighPerfSrc)}function checkConnection(){var e=navigator.network.connection.type;var t=window.localStorage.getItem("status");if(t=="online"){document.addEventListener("online",resumeOnline,false);document.addEventListener("offline",takeAppOffline,false);if(e!="unknown"&&e!="No network connection"&&e!="none"){isOnline=true;$("#homescreenLogout").removeClass("dynamicDivForLogout");$("#homescreenLogout").addClass("dynamicDiv")}else{isOnline=false}}else{isOnline=false}loadApplicationState(isOnline)}function loadApplicationState(e){var t=new Date;createJsonFormat();if(e){loadAboutTechTimeRss();getSubscribeRss()}else{loadDataforOfflineMode()}setApplicationState(e)}function gotFS(e){rootFolderName=e.root.name;var t=e.root.createReader();t.readEntries(function(e){var t=0;for(t=0;t<e.length;t++){if(e[t].isFile&&e[t].name!="data.json"){var n=e[t].name.split(".");entries.push(n[0])}}jsonData.listOfFiles=entries});entries=uniqueFileList(entries);e.root.getDirectory("TechTime",{create:true,exclusive:false},getDirectoryEntry,errorFileSystem);e.root.getDirectory("Contribute",{create:true,exclusive:false},getContributeDirectoryEntry,errorFileSystem);e.root.getDirectory("images",{create:true,exclusive:false},getImagesDirectoryEntry,errorFileSystem)}function getFileNamesInDirectory(){var e=fileSystem.root.createReader();e.readEntries(function(e){var t=0;for(t=0;t<e.length;t++){if(e[t].isFile&&e[t].name!="data.json"){var n=e[t].name.split(".");entries.push(n[0])}}jsonData.listOfFiles=entries})}function gotFS1(e){e.root.getFile("data.json",{create:true,exclusive:false},getDirectoryEntry1,errorFileSystem)}function getDirectoryEntry(e){var t=e.fullPath.lastIndexOf("/");var n=e.fullPath.substring(0,t);sPath=n+"/";globalPath=sPath;globalPathNew=sPath}function getContributeDirectoryEntry(e){var t=e.fullPath.lastIndexOf("/");var n=e.fullPath.substring(0,t);contributePath=n+"/Contribute/";contributeGlobalPath=contributePath;contributeGlobalPathNew=contributePath}function getImagesDirectoryEntry(e){var t=e.createReader();t.readEntries(function(e){var t=0;for(t=0;t<e.length;t++){var n=e[t].name.substring(0,e[t].name.length);if(n.indexOf("thumb")==-1){downloadedActuals.push(n)}else if(n.indexOf("actual")==-1){downloadedThumbs.push(n)}}})}function getDirectoryEntry1(e){}function errorFileSystem(e){console.log("Error in errorFileSystem : "+e.target.error.code)}function resumeOnline(){$.mobile.fixedToolbars.show(true);var e=[];isOnline=true;setApplicationState(true)}function takeAppOffline(){networkState=navigator.network.connection.type;if(networkState!="unknown"&&networkState!="No network connection"&&networkState!="none"){}var e=$('div[id="showProgressBar"]').html();$('div[id="showProgressBar"]').html("");var e=$('div[id="showProgressBar"]').html();isOnline=false;setApplicationState(false);changeDownloadLogoutColor()}function setApplicationState(e){if(e){$("#downloadFile").removeClass("ui-disabled");$("#btnRefreshRSS").removeClass("ui-disabled");$("#btnRefreshItems").removeClass("ui-disabled");$("#logout").children().text("Logout");$("#logout2").children().text("Logout");$("#logout3").children().text("Logout")}else{$("#downloadFile").addClass("ui-disabled");$("#btnRefreshRSS").addClass("ui-disabled");$("#btnRefreshItems").addClass("ui-disabled");$("#logout").children().text("  Exit  ");$("#logout2").children().text("  Exit  ");$("#logout3").children().text("  Exit  ")}}function backKeyDown(e){}function stopPlayingMedia(){if(document.getElementById("videoStream")){document.getElementById("videoStream").pause()}if(document.getElementById("audioPlayer")){document.getElementById("audioPlayer").pause()}}function resetSearchFlags(){searchFromMediaPage=false;searchFromEventsPage=false;searchFromSpotlightPage=false;searchFromUpcomingEventsPage=false;searchFromTAListResultPage=false;searchFromAuthorDetailPage=false;searchFromDownloadsPage=false;searchFromMainPage=false;searchFromContactUsPage=false;searchFromAboutPage=false;searchFromFaqPage=false;searchFroSubscribPage=false;searchFromTechWatch=false;searchFromtechWatchPage=false;searchFromPlaylistsPage=false;searchFromPlaylistItemsPage=false;searchFromSharePlaylistsPage=false;searchFromAddToPlaylistPage=false;searchFromDigitalPage=false}var len;var mediaID;var deviceDetails="";var index1=0;var nextItemId;var userName="";var d=new Date;var downloadFilesCount=0;var actualDownloadedCount=0;var categories=new Array;var categoryItemsList=new Array;var isOnline=false;var platform;var sPath;var screenWidth=screen.width;var screenHeight=screen.height;var deviceName="";var globalPath="";var globalPathNew="";var backFlag=false;var spotLightFlag=false;var playlistItemsPageFlag=false;var searchFromMediaPage=false;var searchFromRecommendationMediaPage=false;var searchFromEventsPage=false;var searchFromSpotlightPage=false;var searchFromUpcomingEventsPage=false;var searchFromTAListResultPage=false;var searchFromAuthorDetailPage=false;var searchFromDownloadsPage=false;var searchFromMainPage=false;var searchFromContactUsPage=false;var searchFromAboutPage=false;var searchFromFaqPage=false;var searchFroSubscribPage=false;var searchFromTechWatch=false;var searchFromtechWatchPage=false;var searchFromPlaylistsPage=false;var searchFromContributePage=false;var searchFromPlaylistItemsPage=false;var searchFromSharePlaylistsPage=false;var searchFromAddToPlaylistPage=false;var searchFromDigitalPage=false;var rootFolderName="";var entries=[];var downloadedThumbs=[];var downloadedActuals=[];var contributePath="";var contributeGlobalPath="";var contributeGlobalPathNew=""