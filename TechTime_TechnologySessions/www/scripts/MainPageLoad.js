var noSubscribe = "false";
var subscribeCatList = '';

var jsonData = new Object();

var mainCategoryList = new Array();

var audioVideoItemId = new Array();
var eventItemId = new Array();
var documentItemId = new Array();

var subscribeCategoryId = new Array();
var isSubscribeDocument = "no";
var isSubscribePodcast = "no";
var isSubscribeEvent = "no";

var rssUrl = "https://techtime.stage2.accenture.com/techno-areas/1+2/audio-video-listing-view";
var documentRss = "https://techtime.stage2.accenture.com/techno-areas/1+2/documents-listing-view";
var eventsRss = "https://techtime.stage2.accenture.com/techno-areas/1+2/events-listing-view";

var selectedCategoryId='';
var selectedCategoryName='';

var resFinal = new Array();

var currentTechWatchItemId = '';
var currentTechWatchItemIndex = '';
var techWatchTraverseIndex = '';

function createJsonFormat()
{
    jsonData.category =new Array();
    jsonData.audio =new Array();
    jsonData.video =new Array();
    jsonData.events =new Array();
    jsonData.panelDiscussions =new Array();
    jsonData.interviews =new Array();
    jsonData.documents =new Array();
    jsonData.techConf =new Array();
    jsonData.technologySessions =new Array();
    jsonData.techWatchMultiple = new Array();
    jsonData.techWatchQuotesMultiple = new Array();
    jsonData.spotLight = new Array();
    jsonData.contributor = new Array();
    jsonData.aboutTechTime = new Array();
    jsonData.contributions = new Array();
    jsonData.faq = new Array();
    jsonData.loggedUserName = '';
    jsonData.pendingDownloads = new Array();
    jsonData.imagesToDownload = new Array();
    
    // CHANGE: Lookup
    jsonData.lookUpItemsList = new Array();
    
    jsonData.offlineCommentsPosted = new Array();
    
    jsonData.downloadedSpotLightItems = new Array();
    
    jsonData.listOfFiles = new Array();
    
    jsonData.playlists = new Array();
    jsonData.recommendations = new Array();
    
    jsonData.digitalAreas = new Array();
    jsonData.digitalAreasItems = new Array();
    
    var dd = new Date();
    d = dd;
    
    
}



function getSubscribeRss()
{
    var dd = new Date();
    d = dd;
    
    var uName = document.getElementById("lblUserName").innerHTML;
    uName = uName.replace(/\./g, '_');
    jsonData.loggedUserName = uName;
    
   var subscribeRss = "https://techtime.stage2.accenture.com/techtimemobile/subscribe-service/uid=";
  //  subscribeRss = "http://localhost:8888/spotlight/subscriptions.xml";
    subscribeRss = subscribeRss + uName;
    $.ajax({
           type : "GET",
           url : subscribeRss,
           dataType : "xml",
           success : subscribeTA,
           error : function(xhr, textStatus, errorThrown) {
           console.log('In Failure'+JSON.stringify(xhr));
           }
           });
    
    
    updateUserVersion("iOS", uName, "3.5.0 on "+dd);
    loadTechWatchMultipleUrl();
    loadPlaylistsData();
}


function updateUserVersion(operatingSystem, loggedUserName, version)
{
    
    if(operatingSystem == "iOS")
    {
        window.GA.trackEventWithCategory("iOS Users", loggedUserName, version,1);
    } else if(operatingSystem == "Android")
    {
        window.GA.trackEventWithCategory("Android Users", loggedUserName, version,1);
    } else if(operatingSystem == "Windows")
    {
        window.GA.trackEventWithCategory("Windows Users", loggedUserName, version,1);
    }
    
}

function subscribeTA(xml)
{
    subscribeCatList = "";
    subscribeCategoryId = new Array();
    subscribeCategoryId = [];
    var dd = new Date();
    d = dd;
    var flag = 0;
    
    newAppVersion = $(xml).find('item').attr('availableAppVersion');
    
    $(xml).find('item').each(function(){
                             var scategoryid = $(this).find('categoryid').text();
                             var asset_type =   $(this).find('asset_type').text();
                             var scategoryname =   $(this).find('categoryname').text();
                             
                             if(jsonData.digitalAreas.indexOf(scategoryid) != -1 && jsonData.digitalAreas.length != 0 && jsonData.digitalAreas.length > 0)
                             {
                                $('#digitalAreaHomePageTab').css('display', 'block');
                                //window.localStorage.setItem("displayDigitalTab", true);
                             }
                             
                             
                             if((scategoryid != "") && (flag == "1")){
                             subscribeCategoryId.push(scategoryid);
                             
                             if(subscribeCatList == ''){
                             subscribeCatList = scategoryid;
                             }else{
                             subscribeCatList = subscribeCatList + '+' + scategoryid;
                             }
                             }
                             if(($(this).find('asset_type').text()) && (asset_type == "documents")){
                             isSubscribeDocument = "yes";
                             }
                             if(($(this).find('asset_type').text()) && (asset_type == "podcast")){
                             isSubscribePodcast = "yes";
                             }
                             if(($(this).find('asset_type').text()) && (asset_type == "events")){
                             isSubscribeEvent = "yes";
                             }
                             flag = 1;
                             });
    
    if(subscribeCatList == ""){
        subscribeCatList = '0';
    }else{
        rssUrl = "";
        eventsRss = "";
        documentRss = "";
        
        rssUrl = "https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/audio-video-listing-view";
       // rssUrl = "https://techtime.stage2.accenture.com/technologySession.xml";
        eventsRss = "https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/events-listing-view";
        documentRss = "https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/documents-listing-view";
    }
    
    loadtechnologyAreaListUrl();
}


function loadtechnologyAreaListUrl() {
    
    var technologyAreaListUrl = "https://techtime.stage2.accenture.com/techtimemobile/subscribe-service/all";
    
	$.ajax({
           type:"GET",
           url:technologyAreaListUrl,
           dataType: "xml",
           success:displayTAList,
           error:function(xhr, textStatus, errorThrown) {
           console.log('In Failure'+JSON.stringify(xhr));
           }
           });
    
    technologyAreaListUrl = '';
}

function displayTAList(xml)
{
    mainCategoryList = new Array();
    mainCategoryList = [];
    var dd = new Date();
    d = dd;
    
    $(xml).find('item').each(function(){
                             var toPrint = $(this).find('parentcategoryid').text();
                             if($(this).find('parentcategoryid').text() == '0'){
                             
                             var flagId = "false";
                             var id = $(this).find('categoryid').text();
                            
                             $.each(subscribeCategoryId, function(index, catid) {
                                    if(catid == id){
                                    flagId = "true";
                                    noSubscribe = "true";
                                    }
                                    });
                             
                             if(flagId == "true"){
                             
                             var mainCat = new Object();
                             mainCat.categoryid = $(this).find('categoryid').text();
                             mainCat.categoryname = $(this).find('categoryname').text();
                             mainCat.subCategoryCount = '';
                             mainCat.subCategory = '';
                             mainCat.subscribe = 'yes';
                             mainCat.subscribeDocuments = isSubscribeDocument;
                             mainCat.subbscribePodcast = isSubscribePodcast;
                             mainCat.subbscribeEvent = isSubscribeEvent;
                             
                             
                             mainCategoryList.push(mainCat);
                             }else{
                             
                             var mainCat = new Object();
                             mainCat.categoryid = $(this).find('categoryid').text();
                             mainCat.categoryname = $(this).find('categoryname').text();
                             mainCat.subCategoryCount = '';
                             mainCat.subCategory = '';
                             mainCat.subscribe = 'no';
                             mainCat.subscribeDocuments = 'no';
                             mainCat.subbscribePodcast = 'no';
                             mainCat.subbscribeEvent = 'no';
                             
                             mainCategoryList.push(mainCat);
                             }
                             }
                             });
    
    //TODO: Change TS
    
    $.each(mainCategoryList, function(index, item) {
           
           var subCategoryList = new Array();
           
           var subCat = new Object();
           subCat.categoryid = item.categoryid;
           subCat.parentcategoryid = item.categoryid;
           subCat.subCategoryName = item.categoryname;
           subCat.audio = new Array();
           subCat.video = new Array();
           subCat.interviews = new Array();
           subCat.panelDiscussions = new Array();
           subCat.techConf = new Array();
           subCat.technologySessions = new Array();
           subCat.document = new Array();
           subCat.event = new Array();
           subCat.contributor = new Array();
           
           subCategoryList.push(subCat);
           
           $(xml).find('item').each(function(){
                                    
                                    if($(this).find('parentcategoryid').text() == item.categoryid){
                                    
                                    var subCat = new Object();
                                    subCat.categoryid = $(this).find('categoryid').text();
                                    subCat.parentcategoryid = $(this).find('parentcategoryid').text();
                                    subCat.subCategoryName = $(this).find('categoryname').text();
                                    
                                    subCat.audio = new Array();
                                    subCat.video = new Array();
                                    subCat.interviews = new Array();
                                    subCat.panelDiscussions = new Array();
                                    subCat.techConf = new Array();
                                    subCat.technologySessions = new Array();
                                    subCat.document = new Array();
                                    subCat.event = new Array();
                                    subCat.contributor = new Array();
                                    
                                    subCategoryList.push(subCat);
                                    }
                                    
                                    });
           
           item.subCategory = subCategoryList;
           item.subCategoryCount = subCategoryList.length;
           });

    $.each(mainCategoryList, function(index, item) {
           jsonData.category.push(item);
           });
    loadAudioVideoURL();
    // loadPlaylistsData();
    
}

function loadAudioVideoURL() {
    
    var dd = new Date();
    d = dd;
    
    $.ajax({
           type : "GET",
           url : rssUrl,
           dataType : "xml",
           success : getAudioVideoItem,
           error : function(xhr, textStatus, errorThrown) {
           console.log('In Failure'+JSON.stringify(xhr));
           }
           });
}

function getAudioVideoItem(xml)
{
    var dd = new Date();
    d = dd;
    
    $(xml).find('item').each(function(){
                             
                             try{
                             var audioLength = '';
                             var videoLength = '';
                             var presentationLength = '';
                             var transcriptLength = '';
                             
                             var scategory = $(this).find('category').text();
                             
                             var sguid = $(this).find('contentid').text();
                             
                             /* var categoryIdArray = scategory.split('|');
                             
                             for(i=0;i<categoryIdArray.length;i++)
                             {
                                    categoryIdArray[i] = categoryIdArray[i].split('-')[1];
                                    if(jsonData.digitalAreas.indexOf(categoryIdArray[i]) != -1)
                                    {
                                        jsonData.digitalAreasItems.push(sguid);
                                        alert(jsonData.digitalAreasItems.length);
                                    }
                             } */
                             
                             var sTitle = $(this).find('title').text();
                             sTitle = sTitle.replace(/'/g,'');
                                                     
                                                     var sFormat =  $(this).find('pods_formattype').text();
                                                     
                                                     if(sFormat == "Audios" || sFormat == "Videos")
                                                     {
                                                        sFormat = "Technology Sessions";
                                                     }
                                                     
                                                     var sauthor = $(this).find('author').text().replace(/\|/g,',');
                                                     var spubDate = $(this).find('pods_date').text();
                                                     var sdescription = $(this).find('description').text();
                                                     var sqna = $(this).find('qna').text();
                                                     
                                                     var imgThumb = $(this).find('thumb').text();
                                                     var imgActual = $(this).find('actual').text();
                                                     
                                                     var audioUrl = $(this).find('audio').text();
                                                     var videoUrl = $(this).find('video').text();
                                                     var transcriptUrl = $(this).find('transcript').text();
                                                     var presentationUrl = $(this).find('presentation').text();
                                                     var lang  = $(this).find('Content_lang').text();
                                                     
                                                     
                                                     $(this).find('audio').each(function() {
                                                                                audioLength = $(this).attr('length');
                                                                                });
                                                     
                                                     $(this).find('video').each(function() {
                                                                                videoLength = $(this).attr('length');
                                                                                });
                                                     
                                                     $(this).find('transcript').each(function() {
                                                                                     transcriptLength = $(this).attr('length');
                                                                                     });
                                                     
                                                     $(this).find('presentation').each(function() {
                                                                                       presentationLength = $(this).attr('length');
                                                                                       });
                                                     
                                                     
                                                     var authorArray = new Array();
                                                     var authorTextArray = sauthor.split(",");
                                                     
                                                     for(i=0;i<authorTextArray.length;i++){
                                                     authorArray.push(authorTextArray[i]);
                                                     }
         
                                                     if (jQuery.inArray(sguid,audioVideoItemId)== -1) {
                                                     audioVideoItemId.push(sguid);
                                                     var tempMedia = new Object();
                                                     
                                                     tempMedia.itemId = sguid;
                                                     tempMedia.category = scategory;
                                                     tempMedia.title = sTitle;
                                                     tempMedia.type = sFormat;
                                                     
                                                     tempMedia.author = authorArray;
                                                     tempMedia.publishedDate = spubDate;
                                                     tempMedia.description = sdescription;
                                                     tempMedia.qna = sqna;
                                                     
                                                     tempMedia.thumb = imgThumb;
                                                     tempMedia.actual = imgActual;
                                                     
                                                     tempMedia.audioUrl = audioUrl;
                                                     tempMedia.audioLength = audioLength;
                                                     tempMedia.audioIsDownloaded ="false";
                                                     
                                                     tempMedia.isDownloadedAudio = 'false';
                                                     tempMedia.localPathAudio = '';
                                                     tempMedia.downloadedDateA = '';
                                                     
                                                     
                                                     tempMedia.videoUrl = videoUrl;
                                                     tempMedia.videoLength = videoLength;
                                                     tempMedia.videoIsDownloaded ="false";
                                                     
                                                     tempMedia.isDownloadedVideo = 'false';
                                                     tempMedia.localPathVideo  = '';
                                                     tempMedia.downloadedDateV = '';
                                                     
                                                     
                                                     tempMedia.transcriptUrl = transcriptUrl;
                                                     tempMedia.transcriptLength = transcriptLength;
                                                     tempMedia.transcriptIsDownloaded ="false";
                                                     
                                                     tempMedia.isDownloadedTranscript = 'false';
                                                     tempMedia.localPathTranscript = '';
                                                     tempMedia.downloadedDateT = '';
                                                     
                                                     tempMedia.presentationUrl = presentationUrl;
                                                     tempMedia.presentationLength = presentationLength;
                                                     tempMedia.presentationIsDownloaded ="false";
                                                     
                                                     tempMedia.isDownloadedPresentation = 'false';
                                                     tempMedia.localPathPresentation = '';
                                                     tempMedia.downloadedDateP = '';
                                                     
                                                     tempMedia.thumbLocal = '';
                                                     tempMedia.actualLocal = '';
                                                     
                                                     tempMedia.selLanguage = lang;
                                                     
                                                     
                                                     //TODO: Change TS
                                                     if(sFormat == "Audios"){
                                                     jsonData.technologySessions.push(tempMedia);
                                                     
                                                     }
                                                     else if(sFormat == "Videos"){
                                                     
                                                     jsonData.technologySessions.push(tempMedia);
                                                     
                                                     } else if(sFormat == "Panel Discussions"){
                                                     
                                                     jsonData.panelDiscussions.push(tempMedia);
                                                     
                                                     }
                                                     else if(sFormat == "Technology Conferences"){
                                                     jsonData.techConf.push(tempMedia);
                                                     }
                                                     else if(sFormat == "Interviews")
                                                     {
                                                     jsonData.interviews.push(tempMedia);
                                                     } else if(sFormat == "Technology Sessions")
                                                     {
                                                     jsonData.technologySessions.push(tempMedia);
                                                     }
                                                     
                                                     
                                                     // CHANGE: Lookup
                                                     jsonData.lookUpItemsList[sguid] = tempMedia;
                                                     
                                                     var str = JSON.stringify(scategory);
                                                     
                                                     str =   str.substring(1,str.length-1);
                                                     
                                                     var beg, end, temp, tempSubId;
                                                     var len = str.length;
                                                     
                                                     beg = 0;
                                                     
                                                     while (len != 0 && end != 0 && str != "")
                                                     {
                                                     
                                                     str = str.substring(0, str.length);
                                                     var n=str.split("|");
                                                     end = str.indexOf("-") + 1;
                                                     beg = str.indexOf("|");
                                                     len = str.length;
                                                     
                                                     temp = str.substring(0,end-1);
                                                     
                                                     $.each(jsonData.category, function(index, item) {
                                                            
                                                            $.each(item.subCategory, function(index, item) {
                                                                   
                                                                   for(var i = 0; i < n.length;i++)
                                                                   {
                                                                   var tempSubId = n[i].substring(n[i].indexOf("-")+1,n[i].length);
                                                                   
                                                                   if(tempSubId == item.categoryid && item.subCategoryName == temp)
                                                                   {
                                                                   //TODO: Change TS
                                                                   
                                                                   if(sFormat == "Audios"){
                                                                   item.technologySessions.push(sguid);
                                                                   }else if(sFormat == "Videos"){
                                                                   item.technologySessions.push(sguid);
                                                                   }else if(sFormat == "Panel Discussions"){
                                                                   item.panelDiscussions.push(sguid);
                                                                   } else if(sFormat=="Technology Conferences"){
                                                                   item.techConf.push(sguid);
                                                                   }else if(sFormat == "Interviews"){
                                                                   item.interviews.push(sguid);
                                                                   } else if(sFormat == "Technology Sessions"){
                                                                   item.technologySessions.push(sguid);
                                                                   }
                                                                   }
                                                                   }
                                                                   });
                                                            
                                                            
                                                            });
                                                     
                                                     if(beg == -1 ){
                                                     len = 0;
                                                     }
                                                     
                                                     if(end == 0 ){
                                                     len = 0;
                                                     }
                                                     
                                                     temp = str.substring(beg+1,str.length);
                                                     str = temp;
                                                     
                                                     }
                                                     
                                                     }else{

                                                     }
                                                     
                                                     }
                                                     catch(error)
                                                     {
                                                     var txt="There was an error on this page.\n\n";
                                                     txt+="Error description: " + err.message + "\n\n";
                                                     txt+="Click OK to continue.\n\n";
                                                     }
                                                     });
                             
                             
                             loadEventsRss();
                             
                             }
                             
                             
                             function loadEventsRss() {
                             
                             $.ajax({
                                    type : "GET",
                                    url : eventsRss,
                                    dataType : "xml",
                                    success : getEventItem,
                                    error : function(xhr, textStatus, errorThrown) {
                                    console.log('In Failure'+JSON.stringify(xhr));
                                    }
                                    });
                             }
                             
                             function getEventItem(xml)
                             {
                             var dd = new Date();
                             d = dd;
                             var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                             
                             $(xml).find('item').each(function() {
                                                      
                                                      try{
                                                      
                                                      var thumbLength, actualLength;
                                                      
                                                      var scategory = $(this).find('category').text();
                                                      var sicsfile = $(this).find('icsfile').text();
                                                      
                                                      var sguid = $(this).find('contentid').text();
                                                      var sTitle = $(this).find('title').text();
                                                      var sFormat =  $(this).find('content_type').text(); 
                                                      
                                                      var sauthor_count = $(this).find('author_count').text();
                                                      var sauthor = $(this).find('author').text().replace(/\|/g,',');
                                                      var sdescription = $(this).find('description').text();
                                                      
                                                      var sdate = $(this).find('event_sdate').text();
                                                      var sstart_date = $(this).find('event_sdate').text();
                                                      var send_date = $(this).find('event_edate').text();
                                                      
                                                      var sThumb = $(this).find('thumb').text();
                                                      var sActual = $(this).find('actual').text();
                                                      
                                                      var etime = $(this).find('etime').text();
                                                      
                                                      $(this).find('thumb').each(function() {
                                                                                 thumbLength = $(this).attr('length');
                                                                                 });
                                                      
                                                      $(this).find('actual').each(function() {
                                                                                  actualLength = $(this).attr('length');
                                                                                  });
                                                   
                                                      var authorArray = new Array();
                                                      var authorTextArray = sauthor.split(",");
                                                      
                                                      for(i=0;i<authorTextArray.length;i++){
                                                      authorArray.push(authorTextArray[i]);
                                                      }
                                                      
                                                      
                                                      if (jQuery.inArray(sguid,eventItemId)== -1) {
                                                      
                                                      eventItemId.push(sguid);
                                                      
                                                      var tempMedia = new Object();
                                                      
                                                      tempMedia.itemId = sguid;
                                                      tempMedia.title = sTitle;
                                                      tempMedia.type = sFormat;
                                                      
                                                      tempMedia.icsfile = sicsfile;
                                                      tempMedia.category = scategory;
                                                      
                                                      tempMedia.publishedDate = sdate;
                                                      tempMedia.startDate = sstart_date;
                                                      tempMedia.endDate = send_date;
                                                      
                                                      tempMedia.author = authorArray;
                                                      tempMedia.authorCount = sauthor_count;
                                                      tempMedia.description = sdescription;
                                                      
                                                      tempMedia.thumb = sThumb;
                                                      tempMedia.thumbLength = thumbLength;
                                                      
                                                      tempMedia.actual = sActual;
                                                      tempMedia.actualLength = actualLength;
                                                      
                                                      tempMedia.etime = etime;
                                                      
                                                      tempMedia.thumbLocal = '';
                                                      tempMedia.actualLocal = '';
                                                      
                                                      
                                                      jsonData.events.push(tempMedia);
                                                      jsonData.lookUpItemsList[sguid] = tempMedia;
                                                      
                                                      
                                                      var str = JSON.stringify(scategory);
                                                      
                                                      str =   str.substring(1,str.length);
                                                      
                                                      var beg, end, temp;
                                                      var len = str.length;
                                                      
                                                      beg = 0;
                                                      
                                                      while (len !== 0 && end != 0 && str != "")
                                                      {
                                                      end = str.indexOf("-") + 1;
                                                      beg = str.indexOf("|");
                                                      len = str.length;
                                                      
                                                      temp = str.substring(0,end-1);
                                                      
                                                      $.each(jsonData.category, function(index, item) {
                                                             
                                                             $.each(item.subCategory, function(index, item) {
                                                                    
                                                                    if(item.subCategoryName == temp){
                                                                    
                                                                    item.event.push(sguid);
                                                                    }
                                                                    });
                                                             });
                                                      
                                                      if(beg == -1 ){
                                                      len = 0;
                                                      }
                                                      
                                                      if(end == 0 ){
                                                      len = 0;
                                                      }
                                                      
                                                      temp = str.substring(beg+1,str.length);
                                                      str = temp;
                                                      }
                                                      
                                                      }else{
                                                      }
                                                      
                                                      }
                                                      catch(error)
                                                      {
                                                      var txt="There was an error on this page.\n\n";
                                                      txt+="Error description: " + err.message + "\n\n";
                                                      txt+="Click OK to continue.\n\n";
                                                     // alert("Event " + txt);
                                                      }
                                                      });
                             
                             loadDocumentRss();
                             }
                             
                             function loadDocumentRss()
                             {
                             $.ajax({
                                    type : "GET",
                                    url : documentRss,
                                    dataType : "xml",
                                    success : getDocumentItem,
                                    error : function(xhr, textStatus, errorThrown) {
                                    }
                                    });
                             }
                             
                             function getDocumentItem(xml)
                             {
                             var dd = new Date();
                             d = dd;
                             
                             $(xml).find('item').each(function() {
                                                      
                                                      try{
                                                      
                                                      var thumbLength, actualLength,spdfLength;
                                                      
                                                      var scategory = $(this).find('category').text();
                                                      
                                                      var sguid = $(this).find('contentid').text();
                                                      var sTitle = $(this).find('title').text();
                                                      var sdescription = $(this).find('description').text();
                                                      
                                                      var sFormat =  $(this).find('content_type').text();
                                                      var sauthor = $(this).find('author').text().replace(/\|/g,',');
                                                      var lang  = $(this).find('Content_lang').text();
                                                      var sstart_date = $(this).find('document_date').text();
                                                      
                                                      var sThumb = $(this).find('thumb').text();
                                                      var sActual = $(this).find('actual').text();
                                                      
                                                      var spdf = $(this).find('document_pdf').text();
                                                      
                                                      $(this).find('thumb').each(function() {
                                                                                 spdfLength = $(this).attr('length');
                                                                                 });
                                                      
                                                      $(this).find('thumb').each(function() {
                                                                                 thumbLength = $(this).attr('length');
                                                                                 });
                                                      
                                                      $(this).find('actual').each(function() {
                                                                                  actualLength = $(this).attr('length');
                                                                                  });
                                                      
                                                      
                                                      
                                                      if (jQuery.inArray(sguid,documentItemId)== -1) {
                                                      
                                                      documentItemId.push(sguid);
                                                      
                                                      var authorArray = new Array();
                                                      var authorTextArray = sauthor.split(",");
                                                      
                                                      for(i=0;i<authorTextArray.length;i++){
                                                      authorArray.push(authorTextArray[i]);
                                                      }
                                                      
                                                      
                                                      var tempMedia = new Object();
                                                      
                                                      tempMedia.itemId = sguid;
                                                      tempMedia.title = sTitle;
                                                      tempMedia.description = sdescription;
                                                      
                                                      tempMedia.publishedDate = sstart_date;
                                                      
                                                      tempMedia.type = sFormat;
                                                      tempMedia.author = authorArray;
                                                      tempMedia.category = scategory;
                                                      
                                                      tempMedia.thumb = sThumb;
                                                      tempMedia.thumbLength = thumbLength;
                                                      
                                                      tempMedia.actual = sActual;
                                                      tempMedia.actualLength = actualLength;
                                                      
                                                      tempMedia.pdf = spdf;
                                                      tempMedia.apdfLength = spdfLength;
                                                      
                                                      tempMedia.isDownloaded = 'false';
                                                      tempMedia.localPath = '';
                                                      
                                                      tempMedia.thumbLocal = '';
                                                      tempMedia.actualLocal = '';
                                                      tempMedia.downloadedDateD = '';
                                                      tempMedia.selLanguage = lang;
                                                      
                                                      jsonData.documents.push(tempMedia);
                                                      jsonData.lookUpItemsList[sguid] = tempMedia;
                                                      
                                                      var str = JSON.stringify(scategory);
                                                      
                                                      str =   str.substring(1,str.length);
                                                      
                                                      var beg, end, temp;
                                                      var len = str.length;
                                                      
                                                      beg = 0;
                                                      
                                                      while (len !== 0 && end != 0 && str != "")
                                                      {
                                                      end = str.indexOf("-") + 1;
                                                      beg = str.indexOf("|");
                                                      len = str.length;
                                                      
                                                      temp = str.substring(0,end-1);
                                                      
                                                      $.each(jsonData.category, function(index, item) {
                                                             
                                                             $.each(item.subCategory, function(index, item) {
                                                                    
                                                                    if(item.subCategoryName == temp){
                                                                    
                                                                    item.document.push(sguid);
                                                                    }
                                                                    });
                                                             });
                                                      
                                                      if(beg == -1 ){
                                                      len = 0;
                                                      }
                                                      if(end == 0 ){
                                                      len = 0;
                                                      }
                                                      
                                                      temp = str.substring(beg+1,str.length);
                                                      str = temp;
                                                      
                                                      }
                                                      }else{
                                                      }
                                                      
                                                      }
                                                      catch(error)
                                                      {
                                                      var txt="There was an error on this page.\n\n";
                                                      txt+="Error description: " + err.message + "\n\n";
                                                      txt+="Click OK to continue.\n\n";
                                                     // alert(txt);
                                                      }
                                                      });
                             
                             loadContributorRss();
                             
                             isDataLoaded = true;
                             
                             
                            if(isAppUpgradeAvailable == false)
                             {
                                $.mobile.changePage("#businessCategory");
                             
                             $('#applicationUpgradeTab').css('display', 'none');
                             $('#applicationUpdateButton').css('display', 'none');
                             // $('#applicationUpdateVersion').html(newAppVersion);

                             } else if(isAppUpgradeAvailable == true && setCancelAction == true)
                             {
                                $.mobile.changePage("#businessCategory");
                             
                                $('#applicationUpgradeTab').css('display', 'block');
                                $('#applicationUpdateButton').css('display', 'block');
                                // $('#applicationUpdateVersion').html(newAppVersion);
                             }
                                                          
                             $("#imgRefreshProgress").hide();
                             
                            // generateTechWatchShowCaseArticle();
                             
                             
                             }
                             
                             function loadContributorRss() {
                             var contributorRss = "https://techtime.stage2.accenture.com/mobile-contributor-listing.xml";
                             $.ajax({
                                    type : "GET",
                                    url : contributorRss,
                                    dataType : "xml",
                                    success : loadContributorData,
                                    error : function(xhr, textStatus, errorThrown) {
                                    console.log('In Failure'+JSON.stringify(xhr));
                                    }
                                    });
                             
                             
                             contributorRss = '';
                             
                             loadSpotlightUrl();
                             
                             loadFaqRss();
                             downloadThumbImagesOnLogin();
                             
                             }
                             
                             function loadContributorData(xml)
                             {
                             var dd = new Date();
                             d = dd;
                             
                             $(xml).find('item').each(function(){
                                                      
                                                      try{
                                                      var sTitle = $(this).find('title').text();
                                                      var sguid = $(this).find('guid').text();
                                                      
                                                      var scategory = $(this).find('category').text();
                                                      var sdescription = $(this).find('description').text();
                                                      
                                                      var sContributor = $(this).find('contributor').text();
                                                      var sDate = $(this).find('date').text();
                                                      
                                                      var sThumb = $(this).find('thumb').text();
                                                      var sActual = $(this).find('actual').text();
                                                      
                                                      var sEmail = $(this).find('email').text();
                                                      
                                                      var itemContributor = new Object();
                                                      itemContributor.itemId = sguid;
                                                      itemContributor.title = sTitle;
                                                      itemContributor.category = scategory;
                                                      itemContributor.description = sdescription;
                                                      itemContributor.contributor = sContributor;
                                                      itemContributor.date = sDate;
                                                      itemContributor.type = "contributor";
                                                      
                                                      itemContributor.thumb = sThumb;
                                                      itemContributor.actual = sActual;
                                                      
                                                      itemContributor.thumbLocal = '';
                                                      itemContributor.actualLocal = '';
                                                      itemContributor.email = sEmail;
                                                      
                                                      jsonData.contributor.push(itemContributor);
                                                      }
                                                      catch(error)
                                                      {
                                                      var txt="There was an error on this page.\n\n";
                                                      txt+="Error description: " + err.message + "\n\n";
                                                      txt+="Click OK to continue.\n\n";
                                                     // alert(txt);
                                                      }
                                                      });
                             
                             if(isOnline) {
                                getFileSystemRefForWriting(jsonData);
                             }
                             
                             }
                             
                             function loadTechWatchMultipleUrl()
                             {
                             
                             var techWatchRss = "https://techtime.stage2.accenture.com/mobile-tech-watch";
                            
                             var dd = new Date();
                             d = dd;
                             
                             $.ajax({
                                    type : "GET",
                                    url : techWatchRss,
                                    dataType : "xml",
                                    success : loadTechWatchMultipleData,
                                    error : function(xhr, textStatus, errorThrown) {
                                    }
                                    });
                             
                             techWatchRss = '';
                             
                             }
                             
                             
                             function loadTechWatchMultipleData(techWatchXml) {
                             
                             
                             
                             //  alert($(techWatchXml).find('techwatch').length);
                             
                             $(techWatchXml).find('techwatch').each(
                                                                   // var b = new Date();
                                                                   // console.log("TW BREAKS ------ > " +  b);
                                                                    
                                                                    function(index, element) {
                                                                    //console.log("GETTING ITEM " + index);
                                                                    
                                                                    try{
                                                                    var techWatchPublicationObject = new Object();
                                                                    var techWatchPublicationType = $(this).attr('type');
                                                                    var techWatchPublicationId = $(this).attr('id');
                                                                    var techWatchPublicationDate = $(this).attr('publishedDate');
                                                                    
                                                                    if(techWatchPublicationType == "current")
                                                                    {
                                                                    
                                                                    // alert("GOT CURRENT TW " + techWatchPublicationType);
                                                                    
                                                                    currentTechWatchItemId = techWatchPublicationId;
                                                                    currentTechWatchItemIndex = index;
                                                                    
                                                                    window.localStorage.setItem("currentTechWatchItemId", currentTechWatchItemId);
                                                                    window.localStorage.setItem("currentTechWatchItemIndex", currentTechWatchItemIndex);
                                                                    
                                                                    //alert(currentTechWatchItemId + " " + currentTechWatchItemIndex);
                                                                    }
                                                                    
                                                                    
                                                                    
                                                                    techWatchPublicationObject.techWatchPublicationType = techWatchPublicationType;
                                                                    techWatchPublicationObject.techWatchPublicationId = techWatchPublicationId;
                                                                    techWatchPublicationObject.techWatchPublicationDate = techWatchPublicationDate;
                                                                    techWatchPublicationObject.techWatchPublicationIndex = index;
                                                                    techWatchPublicationObject.techWatchPublicationDateString = getFormattedDate(techWatchPublicationDate);
                                                                   /* techWatchPublicationObject.showcaseArticlePubIndex = '';
                                                                    techWatchPublicationObject.showcaseArticlePubId = '';
                                                                    techWatchPublicationObject.showcaseArticleIndex = '';
                                                                    techWatchPublicationObject.showcaseArticleTitle = '';
                                                                    techWatchPublicationObject.showcaseArticleUrl = '';
                                                                    techWatchPublicationObject.showcaseArticleDescriprions = ''; */
                                                                    //alert(techWatchPublicationObject.techWatchPublicationDateString);
                                                                    
                                                                    var techWatchPublicationItems = new Array();
                                                                    var itemArticleIndex = 1;
                                                                    $(this).find('item').each(function(){
                                                                                              
                                                                                              var itemArticleArray = new Array();
                                                                                              
                                                                                              var itemTitle = $(this).find('title').text();
                                                                                              var itemType = $(this).find('type').text();
                                                                                              var itemArticle = $(this).find('article');
                                                                                              
                                                                                              itemArticle.each(function(articleIndex, article){
                                                                                                               
                                                                                                               var articleDetails = new Object();
                                                                                                               articleDetails.articleTitle = $(this).find('article_title').text();
                                                                                                               articleDetails.articleUrl = $(this).find('article_url').text();
                                                                                                               articleDetails.articleDescription = $(this).find('article_description').text();
                                                                                                               articleDetails.articleType = $(this).attr('type');
                                                                                                               
                                                                                                               if(articleDetails.articleType == 'showcase')
                                                                                                               {
                                                                                                                    var showcaseArticle = new Object();
                                                                                                                    showcaseArticle.techwatchPubIndex = index;
                                                                                                                    showcaseArticle.techwatchPubId = techWatchPublicationId;
                                                                                                                    showcaseArticle.articleIndex = itemArticleIndex;
                                                                                                                    showcaseArticle.articleTitle = articleDetails.articleTitle;
                                                                                                                    showcaseArticle.articleUrl = articleDetails.articleUrl;
                                                                                                                    showcaseArticle.articleDescription = articleDetails.articleDescription;
                                                                                                               
                                                                                                                    window.localStorage.setItem("techwatchPubIndex", index);
                                                                                                                    window.localStorage.setItem("techwatchPubId", techWatchPublicationId);
                                                                                                                    window.localStorage.setItem("articleIndex", itemArticleIndex);
                                                                                                                    window.localStorage.setItem("articleTitle", articleDetails.articleTitle);
                                                                                                                    window.localStorage.setItem("articleUrl", articleDetails.articleUrl);
                                                                                                                    window.localStorage.setItem("articleDescription", articleDetails.articleDescription);
                                                                                                                    window.localStorage.setItem("articleType", itemType);
                                                                                                               
                                                                                                               //alert(window.localStorage.getItem("techwatchPubIndex"));
                                                                                                                  /* techWatchPublicationObject.showcaseArticlePubIndex = index;
                                                                                                                   techWatchPublicationObject.showcaseArticlePubId = techWatchPublicationId;
                                                                                                                   techWatchPublicationObject.showcaseArticleIndex = articleIndex;
                                                                                                                   techWatchPublicationObject.showcaseArticleTitle = articleDetails.articleTitle;
                                                                                                                   techWatchPublicationObject.showcaseArticleUrl = articleDetails.articleUrl;
                                                                                                                   techWatchPublicationObject.showcaseArticleDescriprions = articleDetails.articleDescription; */
                                                                                                                   // alert("Article Index " + JSON.stringify(showcaseArticle));
                                                                                                               
                                                                                                               }
                                                                                                               
                                                                                                               itemArticleIndex = itemArticleIndex + 1;
                                                                                                               itemArticleArray.push(articleDetails);
                                                                                                               });
                                                                                              
                                                                                              var techWatchObject = new Object();
                                                                                              techWatchObject.itemTitle = itemTitle;
                                                                                              techWatchObject.itemType = itemType;
                                                                                              techWatchObject.itemArticleArray = itemArticleArray;
                                                                                              
                                                                                              techWatchPublicationItems.push(techWatchObject);
                                                                                              });
                                                                    
                                                                    techWatchPublicationObject.techWatchPublicationItems = techWatchPublicationItems;
                                                                    
                                                                    
                                                                    
                                                                    jsonData.techWatchMultiple.push(techWatchPublicationObject);
                                                                    
                                                                    }
                                                                    catch (error) {
                                                                    var txt = "There was an error on this page.\n\n";
                                                                    txt += "Error description: " + error.message + "\n\n";
                                                                    txt += "Click OK to continue.\n\n";
                                                                   // alert(txt);
                                                                    }
                                                                    
                                                                    });
                             //console.log("*TECHWATCH* " + JSON.stringify(jsonData.techWatchMultiple));
                             
                             // alert("NO OF TW ARTICLES " + jsonData.techWatchMultiple.length);
                             
                             
                             if(jsonData.techWatchMultiple.length == 100)
                             {
                             var dd = new Date();
                             // alert('********* TECHWATCH END LOAD :'+(dd.getTime()-d.getTime())/1000);
                             d = dd;
                             }
                             
                             
                             
                             }
                             
                             
                             function loadSpotlightUrl()
                             {
                             var spotlightRss = "https://techtime.stage2.accenture.com/mobile-spotlight-feeds.xml";
                             
                             $.ajax({
                                    type : "GET",
                                    url : spotlightRss,
                                    dataType : "xml",
                                    success : loadSpotlightGeneral,
                                    error : function(xhr, textStatus, errorThrown) {
                                    console.log('In Failure SPOTLIGHT '+JSON.stringify(xhr));
                                    }
                                    });
                             
                             spotlightRss = '';
                             }
                             
                             function loadFaqRss()
                             {
                             var faqRss = "https://techtime.stage2.accenture.com/mobile-faq-rss/faq.xml";
                             $.ajax({
                                    type : "GET",
                                    url : faqRss,
                                    dataType : "xml",
                                    success : loadFaq,
                                    error : function(xhr, textStatus, errorThrown) {
                                    console.log('In Failure'+JSON.stringify(xhr));
                                    }
                                    });
                             faqRss = '';
                             }
                             
                             function loadFaq(xml)
                             {
                             var dd = new Date();
                             d = dd;
                             
                             $(xml).find('item').each(function(){
                                                      
                                                      try{
                                                      var sTitle = $(this).find('title').text();
                                                      var qOrder = $(this).find('question_order').text();
                                                      var sdescription = $(this).find('description').text();
                                                      
                                                      var sImage1 = $(this).find('image1').text();
                                                      var sImage2 = $(this).find('image2').text();
                                                      
                                                      var faqItem = new Object();
                                                      faqItem.title = sTitle;
                                                      faqItem.qOrder = qOrder;
                                                      faqItem.sImage1 = sImage1;
                                                      faqItem.sImage2 = sImage2;
                                                      faqItem.description = sdescription;
                                                      
                                                      jsonData.faq.push(faqItem);
                                                      
                                                      }
                                                      catch(error)
                                                      {
                                                      var txt="There was an error on this page.\n\n";
                                                      txt+="Error description: " + err.message + "\n\n";
                                                      txt+="Click OK to continue.\n\n";
                                                      //alert(txt);
                                                      }
                                                      
                                                      });
                             
                             if(isAppUpgradeAvailable == false)
                             {
                             $.mobile.changePage("#businessCategory");
                             } else if(isAppUpgradeAvailable == true && setCancelAction == true)
                             {
                             $.mobile.changePage("#businessCategory");
                             }
                             
                             }
                             
                             
                             function loadAboutTechTimeRss()
                             {
                               var aboutTechTimeRss = "https://techtime.stage2.accenture.com/mobile-about-us/aboutus.xml";
                              // var aboutTechTimeRss = "http://localhost:8888/spotlight/AboutTechTime.xml";
                             
                             $.ajax({
                                    type : "GET",
                                    url : aboutTechTimeRss,
                                    dataType : "xml",
                                    success : loadAboutTechTime,
                                    error : function(xhr, textStatus, errorThrown) {
                                    }
                                    });
                             aboutTechTimeRss = '';
                             }
                             
                             function loadAboutTechTime(xml)
                             {
                             var dd = new Date();
                             d = dd;
                             
                             jsonData.digitalAreas = $(xml).find('digitalAreas').text().split('|');
                             
                             newAppVersion = $(xml).find('iosAppVersion').text();
                             var customUpdateMessage = $(xml).find('updateMessage').text();
                             $('#customUpdateMessage').html(customUpdateMessage);
                             
                             checkForApplicationUpgradeAvailability();
                             
                             $(xml).find('item').each(function(){
                                                      
                                                      try{
                                                      var sTitle = $(this).find('title').text();
                                                      var sImage = $(this).find('image').text();
                                                      var sdescription = $(this).find('description').text();
                                                      
                                                      var aboutTechTimeItem = new Object();
                                                      aboutTechTimeItem.title = sTitle;
                                                      aboutTechTimeItem.description = sdescription;
                                                      aboutTechTimeItem.image = sImage;
                                                      
                                                      jsonData.aboutTechTime.push(aboutTechTimeItem);
                                                      
                                                      }
                                                      catch(error)
                                                      {
                                                      var txt="There was an error on this page.\n\n";
                                                      txt+="Error description: " + err.message + "\n\n";
                                                      txt+="Click OK to continue.\n\n";
                                                     // alert(txt);
                                                      }
                                                      
                                                      });
                             
                             }
                             
                             
                                                        
                             function createJsonFormatOffline(Obj)
                             {
                             jsonData = Obj;
                             
                             if(Obj){
                             
                             noSubscribe = 'true';
                             
                             $("#imgRefreshProgress").hide();
                             
                             }else{
                             $('#errormsg').html('If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.');
                             
                             $.mobile.changePage("#loggedOutPage");
                             $("#imgRefreshProgress").hide();
                             
                             }
                             
                             }     
                             
                             function backnav(pageId)
                             {
                                backPage(pageId);
                             }
                             
                             function backPage(pageIdnew) {
                             var sptFlagGlobal = window.localStorage.getItem("spotLightFlag");
                             stopPlayingMedia();
                             
                             if(pageIdnew == "digitalAreaHomePage")
                             {
                                    $.mobile.changePage("#businessCategory");
                                    loadDigitalTab();
                             
                             } else if (pageIdnew == "detailMediaPage") {
                             if (eventsFlag) {
                                 var eveMnt = window.localStorage.getItem("eventmonth");
                                 var eveCnt = window.localStorage.getItem("eventcount");
                                 var currMonthName = window.localStorage.getItem("currMonth");
                                 
                                 showUpcomingEventList(eveMnt, eveCnt, currMonthName);
                                 
                                 $.mobile.changePage("#UpcomingEventsPage");
                             } else if (mediaFlag) {
                                 if (!spotLightFlag) {
                                     var catName = window.localStorage.getItem("currentCategoryOff");
                                     var catId = window.localStorage.getItem("currentCategoryIdOff");
                                     selectedCategoryId = catId;
                                     selectedCategoryName = catName;
                                     $.mobile.changePage("#TAListResult", {
                                                         transition: "none"
                                                         });
                                 } else {

                                     $.mobile.changePage("#businessCategory", {
                                                         transition: "none"
                                                         });
                                 }
                             
                             } else if (searchFromMainPage) {
                                $.mobile.changePage("#searchResultPage");
                             } else {
                                 $(".navigateBackBtn").hide();
                                if(sptFlagGlobal)
                                    {
                                       $(".navigateBackBtn").show();
                                    }
                                 $.mobile.changePage("#businessCategory");
                             }
                             } else if (pageIdnew == 'TAListResult' || pageIdnew == 'UpcomingEventsPage' || pageIdnew == 'aboutTectTimePage' || pageIdnew == 'contactUsPage' || pageIdnew == 'faqPage') {
                             
                                    
                                             defaultNavigate();
                                             $(".navigateBackBtn").hide();
                                             $.mobile.changePage("#businessCategory");
                                                                     
                             } else if (pageIdnew == 'subscribePage') {
                                     defaultNavigate();
                                     $(".navigateBackBtn").hide();
                                     $("#subscribePageDiv").hide();
                                     $.mobile.changePage("#businessCategory");
                             } else if (pageIdnew == 'DownloadsPage') {
                             
                                gotFS(fileSystem);
                             
                                if (dwPgflag && !playlistItemsPageFlag) {
                                     if (spotLightFlag) {
                                     
                                         eleId = window.localStorage.getItem("detailPageelementIdSpot");
                                         eleType = window.localStorage.getItem("detailPagetypeSpot");
                                         eleNum = window.localStorage.getItem("detailPagecountNumSpot");
                                         spotlightDataTypes(eleId, eleType, eleNum);
                             } else {
                                         var eleId = window.localStorage.getItem("detailPageelementId");
                                         var eleType = window.localStorage.getItem("detailPagetype");
                                         var eleNum = window.localStorage.getItem("detailPagecountNum");
                                         
                                         detailPageView(eleId, eleType, eleNum);
                                     }
                                     $.mobile.changePage("#detailMediaPage");
                                 } else if(dwPgflag && playlistItemsPageFlag)
                                 {
                                        $.mobile.changePage("#playlistsItemPage");
                                 } else {
                                         defaultNavigate();
                                         $(".navigateBackBtn").hide();
                                         $.mobile.changePage("#businessCategory");
                                     }
                             
                             } else if (pageIdnew == 'techwatchPage') {
                                 defaultNavigate();
                                 $.mobile.changePage("#businessCategory");
                                 
                                 currentTechWatchItemId = window.localStorage.getItem("currentTechWatchItemId");
                                 currentTechWatchItemIndex = window.localStorage.getItem("currentTechWatchItemIndex");
                             
                             } else if (pageIdnew == 'detailAuthor' && sptFlagGlobal != "true") {
                                 var evtFlag = window.localStorage.getItem("eventFlag");
                                 var sptFlag = window.localStorage.getItem("spotLightFlag");
                                 var mdFlag = window.localStorage.getItem("mediaFlag");
                                 
                                 if(evtFlag == "true")
                                 {
                                     var upeveID = window.localStorage.getItem("eventitemId");
                                     
                                     UpcomingEventsDetail(upeveID);
                                     
                                     $.mobile.changePage("#detailMediaPage");
                                     }
                                     else if(mdFlag == "true")
                                     {
                                     var eleId = window.localStorage.getItem("detailPageelementId");
                                     var eleType = window.localStorage.getItem("detailPagetype");
                                     var eleNum = window.localStorage.getItem("detailPagecountNum");
                                     var eleCnt = window.localStorage.getItem("detailPageitemCount");
                                     
                                     detailPageView(eleId,eleType,eleNum,eleCnt);
                                     $.mobile.changePage("#detailMediaPage");
                                 } 
                                 else
                                 {
                                 $.mobile.changePage("#businessCategory");
                                 }
                                 
                                 
                             
                             } else if(pageIdnew == 'detailAuthor' && sptFlagGlobal == "true"){
                             $.mobile.changePage("#businessCategory");
                             
                             } else if (pageIdnew == 'itemVideo') {
                                 if (mediaFlag) {
                                     var eleId = window.localStorage.getItem("detailPageelementId");
                                     var eleType = window.localStorage.getItem("detailPagetype");
                                     var eleNum = window.localStorage.getItem("detailPagecountNum");
                                     var eleCnt = window.localStorage.getItem("detailPageitemCount");
                                     
                                     detailPageView(eleId, eleType, eleNum, eleCnt);
                                     $.mobile.changePage("#detailMediaPage");
                                 } else {
                                     $.mobile.changePage("#DownloadsPage");
                                 }
                             } else if (pageIdnew == 'qnaPage')
                             {
                                 var eleId = '';
                                 var eleType = '';
                                 var eleNum = '';
                                 if (spotLightFlag) {
                                 eleId = window.localStorage.getItem("detailPageelementIdSpot");
                                 eleType = window.localStorage.getItem("detailPagetypeSpot");
                                 eleNum = window.localStorage.getItem("detailPagecountNumSpot");
                                 
                                 spotlightDataTypes(eleId, eleType, eleNum);
                                 } else {
                                 var eleId = window.localStorage.getItem("detailPageelementId");
                                 var eleType = window.localStorage.getItem("detailPagetype");
                                 var eleNum = window.localStorage.getItem("detailPagecountNum");
                                 
                                 detailPageView(eleId, eleType, eleNum);
                                 }
                                     $.mobile.changePage("#detailMediaPage");
                             
                             } else if (pageIdnew == 'searchResultPage')
                             {
                                 if (searchFromMediaPage) {
                                 
                                     if (spotLightFlag) {
                                         eleId = window.localStorage.getItem("detailPageelementIdSpot");
                                         eleType = window.localStorage.getItem("detailPagetypeSpot");
                                         eleNum = window.localStorage.getItem("detailPagecountNumSpot");
                                         
                                         spotlightDataTypes(eleId, eleType, eleNum);
                             } else {
                                         var eleId = window.localStorage.getItem("detailPageelementId");
                                         var eleType = window.localStorage.getItem("detailPagetype");
                                         var eleNum = window.localStorage.getItem("detailPagecountNum");
                                         
                                         detailPageView(eleId, eleType, eleNum);
                                     }
                                } else if(searchFromDigitalPage){
                                    $.mobile.changePage("#digitalAreaHomePage");
                                }else if (searchFromEventsPage)
                                 {
                                     var upeveID = window.localStorage.getItem("eventitemId");
                                     UpcomingEventsDetail(upeveID);
                                     $.mobile.changePage("#detailMediaPage");
                                 } else if (searchFromSpotlightPage)
                                 {
                                     showSpotLightContent();
                                     $.mobile.changePage("#detailMediaPage");
                                 } else if (searchFromUpcomingEventsPage)
                                 {
                                     var eveMnt = window.localStorage.getItem("eventmonth");
                                     var eveCnt = window.localStorage.getItem("eventcount");
                                     var currMonthName = window.localStorage.getItem("currMonth");
                                     
                                     showUpcomingEventList(eveMnt, eveCnt, currMonthName);
                                     $.mobile.changePage("#UpcomingEventsPage");
                                 } else if(searchFromContributePage)
                                    {
                                        resetSelfRecordingForms();
                                        resetAssistedRecordingForms();
                                        $.mobile.changePage("#ContributePage");
                                    }
                                else if (searchFromTAListResultPage)
                                     {
                                     var catName = window.localStorage.getItem("currentCategoryOff");
                                     var catId = window.localStorage.getItem("currentCategoryIdOff");
                                     selectedCategoryId = catId;
                                     selectedCategoryName = catName;
                                     
                                     showTAListResult(catName, catId);
                                     $.mobile.changePage("#TAListResult");
                                 } else if (searchFromAuthorDetailPage)
                                 {
                                     var authorN = window.localStorage.getItem("aNameFromId");
                                     showAuthorDetailPage(authorN);
                                     $.mobile.changePage("#detailAuthor");
                                 } else if (searchFromDownloadsPage)
                                 {
                                     showInProgress();
                                     $.mobile.changePage("#DownloadsPage");
                                 } else if (searchFromContactUsPage)
                                 {
                                     contactUsFocus();
                                     $.mobile.changePage("#contactUsPage");
                                 } else if (searchFromAboutPage)
                                 {
                                     showAboutTTArea();
                                     $.mobile.changePage("#aboutTectTimePage");
                                 } else if (searchFromFaqPage)
                                 {
                                     showFaqContent();
                                     $.mobile.changePage("#faqPage");
                                 } else if (searchFroSubscribPage)
                                 {
                                     showSubscribeContent();
                                     $.mobile.changePage("#subscribePage");
                                     $.mobile.changePage("#subscribePage");
                                 } else if (searchFromtechWatchPage)
                                 {
                                     showTechWatchContent(currentItemId, currentItemIndex);
                                     $.mobile.changePage("#techwatchPage", {
                                                         transition: "none"
                                                         });
                                 } else if(searchFromPlaylistsPage)
                                 {
                                     resetPlaylistLMRParameters();
                                     displayPlaylist();
                                     $.mobile.changePage('#PlaylistsPage');
                                    resetSearchFlags();
                                 } else if(searchFromPlaylistItemsPage)
                                 {
                                     $.mobile.changePage("#playlistsItemPage");
                                    resetSearchFlags();
                                 } else if(searchFromSharePlaylistsPage)
                                 {
                                     resetSharePlaylistForm();
                                     resetSharePlaylistParameters();
                                     $.mobile.changePage("#sharePlaylistsPage");
                                 } else if(searchFromAddToPlaylistPage)
                                 {
                                    $.mobile.changePage("#addToPlaylistPage");
                                 } else {
                                     $(".navigateBackBtn").hide();
                                     $.mobile.changePage("#businessCategory");
                             
                                    // Reset Flags @ home page
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
                                 }
                             } else if(pageIdnew == "sharePlaylistPage")
                             {
                                resetPlaylistLMRParameters();
                                displayPlaylist();
                                $.mobile.changePage('#PlaylistsPage');
                             resetSharePlaylistParameters();
                             } else if(pageIdnew == "playlistPage")
                             {
                                $.mobile.changePage('#businessCategory');
                             } else if(pageIdnew == "addToPlaylistPage")
                             {
                                $.mobile.changePage('#detailMediaPage');
                             } else if(pageIdnew == "playlistItemPage")
                             {
                                resetPlaylistLMRParameters();
                                 displayPlaylist();
                                document.getElementById('playlistItemPlayer').pause();
                                 $.mobile.changePage('#PlaylistsPage');
                             
                             }else if(pageIdnew == "contributePage")
                             {
                                $.mobile.changePage('#businessCategory');
                             }
                             
                             
                             }
                             
                             
                             function compareAndUpdateJSON1(data)
                             {
                             
                             document.getElementById("showProgressBar").innerHTML = '';
                             
                             $.each(data.contributions, function(key, oldItem){
                                        jsonData.contributions.push(oldItem);
                                    });

                            if(data.offlineCommentsPosted.length > 0)
                             {
                                 $.each(data.offlineCommentsPosted, function(key, oldItem){
                                        jsonData.offlineCommentsPosted.push(oldItem);
                                        });
                                 
                                 postOfflineComments();
                             }
                             
                             $.each(data.downloadedSpotLightItems, function (key, oldItem) {
                                    jsonData.downloadedSpotLightItems.push(oldItem);
                                    });
                             
                             
                                 if(isOnline)
                                 {
                                 generateUserDownloadsJson();
                                 }
                             
                             }
                             
                             function generateUserDownloadsJson()
                             {
                             var localDownloadedData = '{"data":{"username":"'+jsonData.loggedUserName +'","downloadedItems":[';
                             var downloadId = '';
                             
                             var downloadArray = new Array();
                             
                             for(i=0;i<entries.length;i++)
                             {
                             downloadArray.push('\"'+entries[i]+'\"');
                             }
                             
                             localDownloadedData = localDownloadedData + downloadArray+'],"devicePlatform":"'+device.platform+'","deviceUUID":"'+deviceUDID+'","deviceModel":"'+device.model+'"}}';
                             
                             postUserDownloads(localDownloadedData);
                             
                             }
                             
                             
                             function postUserDownloads(userDownloadsJson)
                             {
                             var localDownloadedData = userDownloadsJson;
                             
                             var linkUserDownloads = 'https://techtime.stage2.accenture.com/techtimemobile/mobiletrack';
                             if(isOnline){
                             $.ajax({
                                    
                                    type: 'POST',
                                    url: linkUserDownloads,
                                    data: localDownloadedData,
                                    dataType: 'text',
                                    contentType: 'application/json',
                                    success: function(data){
                                    },
                                    error: function(xhr, textStatus, error){
                                    console.log('*****In Failure***'+JSON.stringify(xhr));
                                    }
                                    
                                    });
                             
                             
                             }
                             }
                             
                             function showCategoriesListsagar(data)
                             {
                             var strHTMLCategory = "";
                             if((!isOnline) && (data == null) ) {
                             $("#errorString").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content. Please close the application and connect to Internet.");
                             
                             $.mobile.changePage("#errorPage");
                             return;
                             }else {
                             jsonData = data;
                             changeDownloadLogoutColor();
                             strHTMLCategory = '';
                             var dd = new Date();
                             d = dd;
                             }
                             }
                             
                             
                             function downloadedListload(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
                             {
                             if(val == 1)
                             {
                             type = 'A';
                             
                             } else if(val == 2)
                             {
                             type = 'V';
                             } else if(val == 3)
                             {
                             type = 'P';
                             
                             } else if(val == 4)
                             {
                             type = 'T';
                             
                             
                             } else if(val == 5)
                             {
                             type = 'D';
                             
                             }
                             
                             var tempMedia = new Object();
                             
                             tempMedia.itemId = itemId;
                             tempMedia.title = elementAudio;
                             tempMedia.publishedDate = '';
                             tempMedia.type = type;
                             tempMedia.author = '';
                             tempMedia.isDownloaded = isDownloadedFlag;
                             tempMedia.localPath = filePath;
                             tempMedia.val = val;
                             
                             }
                             
                             
                             function resumePendingDownloads(JData)
                             {
                             document.getElementById("showProgressBar").innerHTML = '';
                             $.each(JData, function(key, newItem) {
                                    
                                    var downloadIdtest = newItem.elementId;
                                    var downloadtitletest = newItem.elementTitle;
                                    var isDownloadedFlag = newItem.isDownloadedFlag;
                                    var elementAudio = newItem.elementAudio;
                                    var val = newItem.val;
                                    if (isOnline) {
                                    downloadFile(downloadIdtest, downloadtitletest, isDownloadedFlag,elementAudio, val);
                                    }
                                    
                                    });
                             }
                             
                             
                             function jsonPostAfterDownload(currentDownload)
                             {
                             var jsonPost = '{"data":{"username":"'+jsonData.loggedUserName +'", "downloadedItems":['+currentDownload+']}}';
                             postUserDownloads(jsonPost);
                             }
                             
                             
 
                             
                             function getFormattedDate(input) {
                             var dateFormat = input.replace(/-/g, '/');
                             // alert(dateFormat);
                             var pattern=/(.*?)\/(.*?)\/(.*?)$/;
                             var result = dateFormat.replace(pattern, function (match, p1, p2, p3) {
                                                             var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                                                             if(Math.floor(p1/10) != 1)
                                                             {
                                                             //alert(Math.floor(p1 / 10));
                                                             if (Math.floor(p1%10) == 1) {
                                                             return p1 + "st " + months[(p2 - 1)] + ", " + p3;
                                                             }
                                                             else if (Math.floor(p1%10) == 2) {
                                                             return p1 + "nd " + months[(p2 - 1)] + ", " + p3;
                                                             }
                                                             else if (Math.floor(p1%10) == 3) {
                                                             return p1 + "rd " + months[(p2 - 1)] + ", " + p3;
                                                             }
                                                             else
                                                             {
                                                             return  p1 + "th " + months[(p2 - 1)] + ", " + p3;
                                                             }
                                                             }
                                                             else {
                                                             return p1 + "th " + months[(p2 - 1)] + ", " + p3;
                                                             }
                                                             
                                                             });
                             //alert(result);
                             
                             return result;
                             }
                             
                             
var showCaseArticleObject = new Object();
function generateTechWatchShowCaseArticle()
                             {
//                             techWatchPublicationObject.showcaseArticle
                             
                             /*    var techWatchPubIndex = window.localStorage.getItem("techwatchPubIndex");
                                 var techwatchPubId = window.localStorage.getItem("techwatchPubId");
                                 var articleIndex = window.localStorage.getItem("articleIndex");
                                 var articleTitle = window.localStorage.getItem("articleTitle");
                                 var articleUrl = window.localStorage.getItem("articleUrl");
                                 var articleDescription = window.localStorage.getItem("articleDescription");*/
                             
                                var showcaseArticleTechWatchPubIndex = window.localStorage.getItem("techwatchPubIndex");
                                var showcaseArticleTechWatchPubId = window.localStorage.getItem("techwatchPubId");
                                var articleIndex = window.localStorage.getItem("articleIndex");
                                var articleTitle = window.localStorage.getItem("articleTitle");
                                var articleUrl = window.localStorage.getItem("articleUrl");
                                var articleDescription = window.localStorage.getItem("articleDescription")
                                var articleType = window.localStorage.getItem("articleType")
                             

                                showCaseArticleObject.showcaseArticleTechWatchPubIndex = showcaseArticleTechWatchPubIndex;
                                showCaseArticleObject.showcaseArticleTechWatchPubId = showcaseArticleTechWatchPubId;
                                showCaseArticleObject.articleIndex = articleIndex;
                                showCaseArticleObject.articleTitle = articleTitle;
                                showCaseArticleObject.articleUrl = articleUrl;
                                showCaseArticleObject.articleDescription = articleDescription;
                                showCaseArticleObject.articleType = articleType;
                             
                                //alert(JSON.stringify(showCaseArticleObject));
                             
                                var techwatchShowcaseArticleHTML = '';
                             
                                 techwatchShowcaseArticleHTML += "<div id='techWatchShowcaseArticleHeader' style='width:100%;padding-left:2%;' onclick='loadShowCaseArticleTechWatch()'>";
                                 techwatchShowcaseArticleHTML += "<label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:20px;display:table-cell;'>TechWatch - Showcase Article:</label>";
                                 techwatchShowcaseArticleHTML += "</div>";
                                 techwatchShowcaseArticleHTML += "<div id='techwatchShowcaseArticleTitle' style='width:100%;padding-left:2%;padding-right:2%;margin-top:0px;'><label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:18px;display:table-cell;word-wrap:break-word;'>"+articleTitle;
                                 techwatchShowcaseArticleHTML += "</label></div>";
                             techwatchShowcaseArticleHTML += "<div id='techwatchShowcaseArticleDescription' style='margin-left:1%;margin-bottom:5px;width:96%;padding-top:3px;padding-bottom:3px;padding-left:2%;background-color:white;border-radius:15px;'><label style='word-wrap:break-word;color:black;font-family:Arial;font-weight:bold;font-size:15px;font-style:italic;display:table-row;text-align:left;'>"+articleDescription;
                                 techwatchShowcaseArticleHTML += "</label></div><div style='witdh:100%;text-align:right;padding-right:2%;'><a class='linkeffect' onclick='readMoreData(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:white;font-size:14px;'><b>Read more</b></a></div>";
                             
//                             techwatchShowcaseArticleHTML +="<div class='linkeffect' style='float:right;text-align:right;width:auto;padding-left:2%;padding-right:2%;'><a onclick='readMoreData(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:orange;font-size:14px;'><b>Read more</b></a></div>";
                             
                             $('#myShowcaseArticleDiv').html(techwatchShowcaseArticleHTML);
                             
                             }
                             

function loadShowCaseArticleTechWatch()
                             {
                             var showCaseArticleDivId = '#articleTitleDiv' + showCaseArticleObject.articleIndex;
                             var showCaseArticleDivClass = '.articleTitleDiv' + showCaseArticleObject.articleIndex;
                             
                             showTechWatchContent(showCaseArticleObject.showcaseArticleTechWatchPubId, showCaseArticleObject.showcaseArticleTechWatchPubIndex);
                             $.mobile.changePage('#techwatchPage');
                             
                             
                             //var articleDivs = $("div[id^='articleTitleDiv']").length;
                             //alert($(showCaseArticleDivId).length);
                             
                             if(showCaseArticleObject.articleType == 'povs')
                                {
                                $('.articleTitlePoVDiv'+showCaseArticleObject.articleIndex).addClass('showCaseArticlePoVDiv');
                                $(showCaseArticleDivId).addClass('showCaseArticleDiv');
                                $(showCaseArticleDivClass).addClass('showCaseArticleDiv');
                                } else{
                                $(showCaseArticleDivId).addClass('showCaseArticleDiv');
                                $(showCaseArticleDivClass).addClass('showCaseArticleDiv');
                                }
                              
                             
                             }
                            
                             

                             function downloadThumbImagesOnLogin()
                             {
                             $.each(jsonData.documents, function(key, oldItem) {
                                        if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                        {
                                            
                                            var imageToDownloadThumb = new Object();
                                            imageToDownloadThumb.itemId = oldItem.itemId;
                                            imageToDownloadThumb.url = oldItem.thumb;
                                            imageToDownloadThumb.type = 'thumb';
                                            
                                            jsonData.imagesToDownload.push(imageToDownloadThumb);
                                        }
                                    
                                        if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                        {
                                            
                                            var imageToDownloadActual = new Object();
                                            imageToDownloadActual.itemId = oldItem.itemId;
                                            imageToDownloadActual.url = oldItem.actual;
                                            imageToDownloadActual.type = 'actual';
                                            
                                            jsonData.imagesToDownload.push(imageToDownloadActual);
                                        }
                                    
                                    });
                             
                             $.each(jsonData.spotLight, function(key, oldItem){
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    
                                    });
                             
                             
                             $.each(jsonData.panelDiscussions, function(key, oldItem) {
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             $.each(jsonData.interviews, function(key, oldItem) {
                                    
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             $.each(jsonData.techConf, function(key, oldItem) {
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             
                             $.each(jsonData.technologySessions, function(key, oldItem) {
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             
                             $.each(jsonData.contributor, function(key, oldItem) {
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             $.each(jsonData.events, function(key, oldItem) {
                                    if(downloadedThumbs.indexOf(oldItem.itemId + 'thumb.png') == -1)
                                    {
                                      
                                    var imageToDownloadThumb = new Object();
                                    imageToDownloadThumb.itemId = oldItem.itemId;
                                    imageToDownloadThumb.url = oldItem.thumb;
                                    imageToDownloadThumb.type = 'thumb';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadThumb);
                                    }
                                    if(downloadedActuals.indexOf(oldItem.itemId + 'actual.png') == -1)
                                    {
                                      
                                    var imageToDownloadActual = new Object();
                                    imageToDownloadActual.itemId = oldItem.itemId;
                                    imageToDownloadActual.url = oldItem.actual;
                                    imageToDownloadActual.type = 'actual';
                                    
                                    jsonData.imagesToDownload.push(imageToDownloadActual);
                                    }
                                    });
                             
                             console.log(thumbCounter);
                             
                             if(jsonData.imagesToDownload.length != 0 && jsonData.imagesToDownload.length > 0)
                             {
                             downloadAllRequiredImages();
                             }
                             }
                             
                             var downloadAllRequiredImagesCounter = 0;
                             var downloadAllRequiredImagesLength;
                             
                             function downloadAllRequiredImages()
                             {
                             downloadAllRequiredImagesLength = jsonData.imagesToDownload.length;
                             
                             var imageItemId = jsonData.imagesToDownload[downloadAllRequiredImagesCounter].itemId;
                             var imageItemUrl = jsonData.imagesToDownload[downloadAllRequiredImagesCounter].url;
                             var imageItemType = jsonData.imagesToDownload[downloadAllRequiredImagesCounter].type;
                             
                             if(imageItemType == 'thumb')
                             {
                             downloadThumbImages(imageItemId, imageItemType, imageItemUrl, 'Interviews');
                             } else if(imageItemType == 'actual')
                             {
                             downloadThumbImages(imageItemId, imageItemType, imageItemUrl, 'Interviews');
                             }
                             
                             }
                             
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
                             
                             filePath = globalPathNew + "images/"+ thumbId+imageName + ".png";
                             
                             if(url!="" ){
                             
                             fileTransfer.download(
                                                   url,
                                                   filePath,
                                                   function(entry){
                                                   refreshFileSystem();
                                                   downloadAllRequiredImagesCounter = downloadAllRequiredImagesCounter + 1;
                                                   if(downloadAllRequiredImagesCounter < downloadAllRequiredImagesLength)
                                                   {
                                                   downloadAllRequiredImages();
                                                   }
                                                   },
                                                   function(error) {
                                                   
                                                   downloadAllRequiredImagesCounter = downloadAllRequiredImagesCounter + 1;
                                                   
                                                   if(downloadAllRequiredImagesCounter < downloadAllRequiredImagesLength)
                                                   {
                                                   downloadAllRequiredImages();
                                                   }
                                                   }
                                                   );
                             }
                             }
                             }


