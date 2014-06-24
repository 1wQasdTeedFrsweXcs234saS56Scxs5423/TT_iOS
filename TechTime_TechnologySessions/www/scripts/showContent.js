var eventsFlag = false;
var mediaFlag = false;

var currD = new Date();
var currM = 0;
var currY = 0;

var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var resUpcomingEvents = new Array();
var searchResultArray = new Array();

var isAudioStreaming = 'false';

var audioURL = '';

var itemCounter = 0;

function showUpcomingEventList(viewMonth,viewCount,monthName)
{
    window.localStorage.setItem("eventmonth",viewMonth);
    window.localStorage.setItem("eventcount",viewCount);
    defaultNavigate();
    
    $('#detailPageArea').html('');
    
    
    var tempEvemnts = new Array();
    var strHTMLshowTAList = '';
    resUpcomingEvents = [];
    
    var arrayOfCategoryNames = new Array();
    var arrayOfCategories = new Array();
    var stringIWant = '';
    
    $('#UpcomingEventsContentArea').html('');
    $('#noUpcomingEventsContentArea').html('');
    
    $.each(jsonData.events, function(key, item) {
           tempEvemnts.push(item);
           });
    
    
    
    tempEvemnts.sort(function(a, b){
                     var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
                     return dateA-dateB
                     });
    
    $.each(tempEvemnts, function(key, item) {
           var s = new Date(item.publishedDate);
           s = s.getMonth();
           });
    
    
    if(monthName != null)
    {
        currD = new Date();
        currM =  currD.getMonth();
        currY = currD.getFullYear();
        document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthName + " " +currY;
        
        for(var a = 0; a<=monthArr.length;a++)
        {
            if(monthArr[a] == monthName)
            {
                currM = a;
            }
        }
        
        $.each(tempEvemnts, function(key, item) {
               
               var M = new Date(item.publishedDate);
               var c = M.getFullYear();
               var s = M.getMonth();
               if((currM == s) && (currY == c)){
               resUpcomingEvents.push(item);
               }
               });
        
        
        
    } else{
        
        if(viewMonth == 'curr'){
            
            currD = new Date();
            currM =  currD.getMonth();
            currY = currD.getFullYear();
            
            document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthArr[currM] + " " +currY;
            window.localStorage.setItem("currMonth",monthArr[currM]);
            
            $.each(tempEvemnts, function(key, item) {
                   
                   var s = new Date(item.publishedDate);
                   var c = s.getFullYear();
                   s = s.getMonth();
                   if((currM == s) && (currY == c)){
                   resUpcomingEvents.push(item);
                   }
                   
                   });
            
        }else if(viewMonth == 'prev'){
            
            currM =  currD.getMonth();
            currD.setMonth(currM-1);
            
            currM =  currD.getMonth();
            currY = currD.getFullYear();
            
            document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthArr[currM] + " "+currY;
            window.localStorage.setItem("currMonth",monthArr[currM]);
            
            $.each(tempEvemnts, function(key, item) {
                   
                   var s = new Date(item.publishedDate);
                   var c = s.getFullYear();
                   s = s.getMonth();
                   
                   if(currM == s && currY == c){
                   resUpcomingEvents.push(item);
                   }
                   
                   });
            
        }else{
            currD.setMonth(currM+1);
            currM =  currD.getMonth();
            currY = currD.getFullYear();
            document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthArr[currM] + " "+currY;
            window.localStorage.setItem("currMonth",monthArr[currM]);
            
            $.each(tempEvemnts, function(key, item) {
                   
                   var s = new Date(item.publishedDate);
                   var c = s.getFullYear();
                   s = s.getMonth();
                   
                   if(currM == s && currY == c){
                   resUpcomingEvents.push(item);
                   }
                   
                   });
        }
    }
    resUpcomingEvents.sort(function(a, b){
                           var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate);
                           return dateB-dateA;
                           });
    
    if(resUpcomingEvents.length){
        
        $.each(resUpcomingEvents, function(key, itemRes) {
               
               var s = new Date(itemRes.publishedDate);
               s = s.getMonth();
               
               var actualThumb = '';
               actualThumb = '';
               
               if(isOnline && itemRes.thumbLocal == '')
               {
               actualThumb = itemRes.thumb;
               }
               else if(isOnline && itemRes.thumbLocal != '')
               {
               actualThumb = "file://"+globalPathNew + "/images/" +itemRes.itemId+"thumb.png";
               }
               else if(!isOnline && itemRes.thumbLocal == '')
               {
               actualThumb = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemRes.thumbLocal != '')
               {
               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
               }
               else
               {
               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
               }
               
               var authoNames = '';
               $.each(itemRes.author, function(key, itemAuthor) {
                      if(key == 0){
                      authoNames = authoNames + itemAuthor;
                      }else if(key <= (itemRes.author.length-1)){
                      authoNames = authoNames + ', ' + itemAuthor;
                      }else{
                      authoNames = authoNames + ' ' + itemAuthor;
                      }
                      });
               
               
               var tempId = "upcoming"+(key+1);
               
               stringIWant = '';
               var stringIGet = itemRes.category;
               
               arrayOfCategories = stringIGet.split("|");
               
               for(var i=0;i<arrayOfCategories.length;i++)
               {
               var getCategoryName = new Array();
               getCategoryName = arrayOfCategories[i].split("-");
               
               if(i==arrayOfCategories.length - 1)
               {
               stringIWant += getCategoryName[0];
               } else {
               stringIWant += getCategoryName[0] + ", ";
               }
               }
               
               var finalStringToDisplay = stringIWant;
               
               if(key < 5){
               strHTMLshowTAList += "<div style='width:100%;' class='listItemClick'><a id='"+tempId+"' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"+itemRes.itemId+"') style='text-decoration:none;font-style:normal;color:black;display:block'>";
               }else{
               strHTMLshowTAList += "<div style='width:100%;' class='listItemClick'><a id='"+tempId+"' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"+itemRes.itemId+"') style='text-decoration:none;font-style:normal;color:black;display:none'>";
               }
               strHTMLshowTAList = strHTMLshowTAList + "<table border=0 style=';width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;margin-right: 2px;' cellpadding='0' cellspacing='0'>";
               
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td style='margin:0px;padding:0px;width:25%;'>";
               
               
               if(itemRes.authorCount == 1){
               strHTMLshowTAList = strHTMLshowTAList + "<div style='width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
               }else if(itemRes.authorCount == 2){
               if(actualThumb == "images/TechTime-AppIcon.png")
               {
               strHTMLshowTAList = strHTMLshowTAList + "<div style='width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
               }
               else
               {
               strHTMLshowTAList = strHTMLshowTAList + "<div style='width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
               }
               
               }else{
               
               if(actualThumb == "images/TechTime-AppIcon.png")
               {
               strHTMLshowTAList = strHTMLshowTAList + "<div style='width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
               }
               else
               {
               strHTMLshowTAList = strHTMLshowTAList + "<div style='width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></div></td>";
               }
               
               }
               
               strHTMLshowTAList = strHTMLshowTAList + "<td class='eventsListingTA'><b><div style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis;max-width:40%;'><label style='padding-left:11px'>"+finalStringToDisplay+"</label></div></b></td></tr></table>";
               
               strHTMLshowTAList = strHTMLshowTAList + "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;;margin-right: 2px;' cellpadding='0' cellspacing='0'>";
               
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
               
               if(itemRes.authorCount == 1){
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
               }else if(itemRes.authorCount == 2){
               
               if(actualThumb == "images/TechTime-AppIcon.png")
               {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
               }
               else
               {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
               }
               }else{
               if(actualThumb == "images/TechTime-AppIcon.png")
               {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
               }
               else
               {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
               }
               }
               
               
               
               strHTMLshowTAList = strHTMLshowTAList + "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;'><b>"+itemRes.title+"</b></td>";
               strHTMLshowTAList = strHTMLshowTAList + "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
               strHTMLshowTAList = strHTMLshowTAList + "<img src='images/icon_event.png' style='height:15px;width:15px;border:none;padding:0px;margin-right:43%'/>";
               strHTMLshowTAList = strHTMLshowTAList + "</td></tr><tr><td id='' style='margin:0px; padding:0px;width:65%;color: orange;font-style:normal;padding-left:10px;font-size:14px;font-weight:100;'>"+authoNames+"</td></tr>";
               
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='' style='margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-size:16px;font-weight:100;'>"+itemRes.publishedDate+"</td>";
               strHTMLshowTAList = strHTMLshowTAList+"<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='100%' height='20px;' style='margin-right:15px;'/></td></tr>";
               
               strHTMLshowTAList = strHTMLshowTAList+"</table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a></div>";
               
               
               });
        
        
        
        if(resUpcomingEvents.length > 5){
            
            strHTMLshowTAList += "<div class='linkTransition' id='loadmoreUpcoming' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresult(this)'><b>Load More Results</b></div>";
        }
        
        
        
        $('#UpcomingEventsContentArea').html('');
        $('#UpcomingEventsContentArea').html(strHTMLshowTAList);
        
    }else{
        
        strHTMLshowTAList = "<label style='background:none;margin-left:14px;'>There are no events scheduled in this month.<label>";
        $('#noUpcomingEventsContentArea').html(strHTMLshowTAList);
        
    }
    
}

function showmoreresult(variable){
    
    var titleCount = parseInt(variable.title) + 5;
    document.getElementById('loadmoreUpcoming').title = titleCount;
    
    if(resUpcomingEvents.length){
        $.each(resUpcomingEvents, function(key, itemRes) {
               if((key+1) < titleCount){
               document.getElementById('upcoming'+(key+1)).style.display = "block";
               }
               });
    }
    if((resUpcomingEvents.length - titleCount) < 0){
        document.getElementById('loadmoreUpcoming').style.display = "none";
    }
}




var authornamefromid;

function UpcomingEventsDetail(itemId)
{
    
    $(".toggleButtonDiv").show();
    $(".navigateBackBtn").show();
    
    window.localStorage.setItem("eventitemId",itemId);
    
    var strHTMLDetail = '';
    strHTMLDetail = '';
    var arrayOfCategoryNames = new Array();
    var arrayOfCategories = new Array();
    var stringIWant = '';

    spotLightFlag = false;
    playlistItemsPageFlag = false;
    eventsFlag = true;
    mediaFlag = false;
    
    window.localStorage.setItem("eventFlag", eventsFlag);
    window.localStorage.setItem("spotLightFlag", spotLightFlag);
    window.localStorage.setItem("mediaFlag",mediaFlag);
    var strHTML = '';
    strHTML = '';
    
    var prev ='false';
    var next ='false';
    var index = 'false'
    
    if(resUpcomingEvents.length == '1'){
        prev = next = 'false';
    }
    
    $.each(resUpcomingEvents, function(key, eventItem) {
           if(eventItem.itemId == itemId){
           var actualLocal = '';
           actualLocal = '';
           
           if(eventItem.actualLocal != ''){
           actualLocal = "file://"+eventItem.actualLocal;
           
           }else{
           actualLocal = eventItem.thumb;
           }
           
           index = key;
           
           stringIWant = '';
           var stringIGet = eventItem.category;
           
           arrayOfCategories = stringIGet.split("|");
           
           for(var i=0;i<arrayOfCategories.length;i++)
           {
           var getCategoryName = new Array();
           getCategoryName = arrayOfCategories[i].split("-");
           if(i==arrayOfCategories.length - 1)
           {
           stringIWant += getCategoryName[0];
           } else {
           stringIWant += getCategoryName[0] + ", ";
           }
           }
           
           if(stringIWant.length > 35)
           {
           stringToDisplay = stringIWant.substring(0,32);
           var trimmedCatDisplay = stringToDisplay + "...";
           stringIWant =  trimmedCatDisplay;
           }
        
           strHTMLDetail +=  "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
           
           if(eventItem.authorCount == 1){
           strHTMLDetail += "<img id='docImg' src='"+actualLocal+"' style='border:none; width:100px; height:150px;  margin:20px 20px;'/><br></td>";
           
           }else if(eventItem.authorCount == 2){
           strHTMLDetail += "<img id='docImg' src='"+actualLocal+"' style='border:none; width:200px; height:150px;  margin:20px 20px;'/><br></td>";
           
           }else{
           strHTMLDetail += "<img id='docImg' src='"+actualLocal+"' style='border:none; width:200px; height:150px;  margin:20px 20px;'/><br></td>";
           }
           
           strHTMLDetail +="<td style='width : 50%'><br>";
           strHTMLDetail += "<div id='"+eventItem.itemId+"' title= '"+eventItem.icsfile+"' onclick= 'openIcsFile(this)' style='border:none;width:33%;height:40px;z-index:100;'><img src='images/btn_addtoCalender.svg' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' hidden='true'></div><br><br>";
           
           
           strHTMLDetail += "<tr><td style='width : 100%' colspan='2'style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+stringIWant+"</td> </tr>";
           
           strHTMLDetail += "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_event.png' style='height:20px; width:20px; border:none;margin:5px; '/>";
           strHTMLDetail += "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+eventItem.title+"</label><br>";
           
           $.each(eventItem.author, function(key, tempAuthor) {
                  authornamefromid = tempAuthor;
                  strHTMLDetail += "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id)'  >";
                  strHTMLDetail += "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                  
                  });
           
           var tempDate = '';
           if(eventItem.sstart_date == eventItem.send_date){
           tempDate = eventItem.startDate;
           }else{
           tempDate = eventItem.startDate + ' - ' +eventItem.send_date;
           }
           strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+tempDate+"</label><br>";
           
           strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"+eventItem.etime+"</label><br><br><br>";
           strHTMLDetail += "<label id='videoDescription' style='font-size: 14px;'>"+eventItem.description+"</label>";
           strHTMLDetail += "<br><br></td></tr></table>";
           }
           
           });
    
    var nextItem = 'false';
    
    $.each(resUpcomingEvents, function(key, eventItem) {
           
           if(key<index){
           prev = eventItem.itemId;
           }
           if(nextItem == 'true'){
           next = eventItem.itemId;
           nextItem = 'false';
           }
           if(eventItem.itemId == itemId){
           nextItem = 'true';
           }
           }); 
    
    strHTML += "<div style='background-color: white; width: 100%; height: 30px'>";
    strHTML += "<table style='width: 100%;'><tr>";
    strHTML += "<td id='prevBtn' style='padding-left:3%; padding-top:7px; vertical-align:middle; width:50%' align='left'>";
    
    if(prev != 'false'){
        strHTML += "<div onclick=UpcomingEventsDetail('"+prev+"') style='border:none;height:100%; width:30%'><img class='prevNextButton' src='images/btn_previous.png' style='height: 20%'/></div>";
    }
    
    strHTML += "</td><td id='nextBtn' style='padding-right:3%; padding-top:7px; vertical-align:middle;width:40%' align='right'>";
    
    if(next != 'false'){
        strHTML += "<div onclick=UpcomingEventsDetail('"+next+"') style='border:none;height:100%; width:30%;padding-right:15%;'><img class='prevNextButton' src='images/btn_next.png' style='height: 20%;'/></div>";
    }
    
    strHTML += "</td></tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
    
    $('#detailPageArea').html(strHTMLDetail);
    $('#prevNextContentArea').html(strHTML);
    
    
}

function showSpotData()
{
    $('#detailPageArea').html('');
    document.getElementById('spotItemContent').style.display = "block";
    $.mobile.changePage("#detailMediaPage");
}

function setFlag(a)
{
    
    if(a == "spotlight")
    {
        mediaFlag = false;
        spotLightFlag = true;
        playlistItemsPageFlag = false;
    }
    else
    {
        mediaFlag = true;
        spotLightFlag = false;
        playlistItemsPageFlag = false;
    }
    eventsFlag = false;
    
    window.localStorage.setItem("eventFlag", eventsFlag);
    window.localStorage.setItem("spotLightFlag", spotLightFlag);
    window.localStorage.setItem("mediaFlag",mediaFlag);
}

function getList()
{   
	var strHTMLCategory = "";
    $('#TAcontentArea').empty('');
    var showDigitalTab = false;
    
    document.getElementById('noSubscribeDiv').style.display = "none";
    
    $.each(jsonData.category, function(key, item){
               if((jsonData.digitalAreas.indexOf(item.categoryid) != -1) && (item.subscribe == "yes") && (jsonData.digitalAreas.length != 0) && (jsonData.digitalAreas.length > 0))
               {
                    showDigitalTab = true;
               }
           });
    
    if(showDigitalTab)
    {
        strHTMLCategory = strHTMLCategory + "<div id='digitalAreaHomePageTab' class=dynamicDivList><li><a class='anchorCategory' data-transition='slide' href='#digitalAreaHomePage' onclick='loadDigitalContents();resetSearchBar(currentSearchKey);isFromDigitalHomePage = false;'>";
        strHTMLCategory = strHTMLCategory+ "<div style='color:white;'>Digital<img src='images/icon_whiteRight.png' style='float:right;height:20px; width:20px;padding-right:12px;' onclick='loadDigitalContents();resetSearchBar(currentSearchKey);isFromDigitalHomePage = false;'/>";
        strHTMLCategory = strHTMLCategory+ "</div></a></li></div>";
    } else if(!showDigitalTab)
    {
        strHTMLCategory = "";
    }
    
    if(noSubscribe == "true"){
        
        $.each(jsonData.category, function(key, item) {
               
               if(item.subscribe == "yes" && jsonData.digitalAreas.indexOf(item.categoryid) == -1){
               
               strHTMLCategory = strHTMLCategory + "<div class=dynamicDivList><li><a id="+ item.categoryname+" class='anchorCategory' data-transition='slide' href='#TAListResult' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+");resetSearchBar(currentSearchKey);isFromDigitalHomePage = false;'>";
               strHTMLCategory = strHTMLCategory+ "<div style='color:white;'> "+item.categoryname+"<img src='images/icon_whiteRight.png' style='float:right;height:20px; width:20px;padding-right:12px;' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+");isFromDigitalHomePage = false;resetSearchBar(currentSearchKey);'/>";
               strHTMLCategory = strHTMLCategory+ "</div></a></li></div>";
               }
               });
    }else{
        document.getElementById('noSubscribeDiv').style.display = "block";
    }
    $('#TAcontentArea').html(strHTMLCategory);
    strHTMLCategory = '';

}
function showTAListResult(currentCategory,currentCategoryId)
{
    window.GA.trackEventWithCategory("IOS Technology Area","Technology Area visits",currentCategory,1);
    
    showSortedTAListing(currentCategoryId,currentCategory,'false','false','false','false');
    changeDropDown("language","All","All");
    changeDropDown("type","All","All");
    itemCounter = 0;
    
    window.localStorage.setItem("currentCategoryOff",currentCategory);
    window.localStorage.setItem("currentCategoryIdOff",currentCategoryId);
    
    document.getElementById('type').innerHTML = 'All';
    document.getElementById('topic').innerHTML = 'Topic';
    
    
}

function refreshList()
{
    showSortedTAListing(selectedCategoryId,selectedCategoryName,'false','false','false','false');
    changeDropDown('type', 'All', 'All');
    changeDropDown('language', 'All', 'All');
}


var currElementId = '';
var currElementtype = '';
var currElementcountNum = '';

// Earlier 1400 Now 400 LOC
function detailPageView(elementId,type,countNum,itemCount)
{   
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    
    var newlastPageOpen1 = $.mobile.activePage.attr('id');    
    $(".toggleButtonDiv").show();
    $(".navigateBackBtn").show();
    
    $('.searchTDTAListResult').show();
    
    window.localStorage.setItem("detailPageelementId",elementId);
    window.localStorage.setItem("detailPagetype",type);
    window.localStorage.setItem("detailPagecountNum",countNum);
    window.localStorage.setItem("detailPageitemCount",itemCount);
    
    currElementId = elementId;
    currElementtype = type;
    currElementcountNum = countNum;
    
    resetSearchBar(currentSearchKey);
    
    var strHTMLDetail = '';
    var strHTML = '';
    
    var fileNameAudio = '';
    var fileNameVideo = '';
    var fileNamePresentation = '';
    var fileNameTranscript = '';
    
    var typeThumbIcon = '';
    
    if(type == 'Technology Conferences' || type == 'TechnologyConferences')
    {
        fileNameAudio = 'TA' + elementId;
        fileNameVideo = 'TV' + elementId;
        fileNamePresentation = 'TP' + elementId;
        fileNameTranscript = 'TT' + elementId;
        
        typeThumbIcon = 'images/icon_techConf.png';
    } else if(type == 'Audios')
    {
        fileNameAudio = 'AA' + elementId;
        fileNameVideo = 'AV' + elementId;
        fileNamePresentation = 'AP' + elementId;
        fileNameTranscript = 'AT' + elementId;
        
        typeThumbIcon = 'images/icon_video.png';
    } else if(type == 'Videos')
    {
        fileNameAudio = 'VA' + elementId;
        fileNameVideo = 'VV' + elementId;
        fileNamePresentation = 'VP' + elementId;
        fileNameTranscript = 'VT' + elementId;
        
        typeThumbIcon = 'images/icon_video.png';
    } else if(type == 'Technology Sessions' || type == 'TechnologySessions' || type == 'technologySessions')
    {
        fileNameAudio = 'VA' + elementId;
        fileNameVideo = 'VV' + elementId;
        fileNamePresentation = 'VP' + elementId;
        fileNameTranscript = 'VT' + elementId;
        
        typeThumbIcon = 'images/icon_video.png';
    } else if(type == 'Panel Discussions' || type == 'PanelDiscussions' || type == 'panelDiscussions')
    {
        fileNameAudio = 'PA' + elementId;
        fileNameVideo = 'PV' + elementId;
        fileNamePresentation = 'PP' + elementId;
        fileNameTranscript = 'PT' + elementId;
        
        typeThumbIcon = 'images/icon_panelDiscussion.png';
    } else if(type == 'Interviews')
    {
        fileNameAudio = 'IA' + elementId;
        fileNameVideo = 'IV' + elementId;
        fileNamePresentation = 'IP' + elementId;
        fileNameTranscript = 'IT' + elementId;
        
        typeThumbIcon = 'images/icon_interview.png';
    }

    
    if(type == 'Technology Conferences' || type == 'TechnologyConferences' || type == 'Audios' || type == 'Videos' || type == 'Technology Sessions' || type == 'TechnologySessions' || type == 'technologySessions' || type == 'Panel Discussions' || type == 'PanelDiscussions' || type == 'panelDiscussions' || type == 'Interviews')
    {
               var detailPageItemContent = jsonData.lookUpItemsList[elementId];
               if(detailPageItemContent.itemId == elementId){
               
               var cId= detailPageItemContent.itemId;
               var aURL = detailPageItemContent.audioUrl;
               var vURL = detailPageItemContent.videoUrl;
               var pURL = detailPageItemContent.presentationUrl;
               var tURL = detailPageItemContent.transcriptUrl;
               
               var titleE = JSON.stringify(detailPageItemContent.title);
               var author = detailPageItemContent.author;
               var date = detailPageItemContent.publishedDate;
            
               var actualLocal = '';
                             
               if(isOnline && detailPageItemContent.actualLocal == '')
               {
               actualLocal = detailPageItemContent.actual;
               }
               else if(isOnline && detailPageItemContent.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +detailPageItemContent.itemId+"actual.png";
               }
               else if(!isOnline && detailPageItemContent.actualLocal == '')
               {
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && detailPageItemContent.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +detailPageItemContent.itemId+"actual.png";
               }
               else
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +detailPageItemContent.itemId+"actual.png";
               }
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               if(vURL != ""){
               if(entries.indexOf(fileNameVideo) != -1){
               strHTMLDetail = strHTMLDetail + "<img id='"+fileNameVideo+"' title='"+detailPageItemContent.localPathVideo+"' onclick='downloadFileAudioMain(this,true,"+titleE+",2)' src='"+actualLocal+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
               
               }else{
               var getstatus = window.localStorage.getItem("status");
               if(getstatus =="offline")
               {
               strHTMLDetail = strHTMLDetail + "<img id='videoStreamImg' style='border:none; width:150px; height:100px; margin:20px 20px;' src='"+actualLocal+"'></image>";
               }
               else
               {
               strHTMLDetail = strHTMLDetail + "<video id='videoStream' style='border:none; width:150px; height:100px; margin:20px 20px;' poster='"+actualLocal+"' controls><source src='"+vURL+"' type='video/mp4'>Your browser does not support the video tag.</video>";
               }
               }
               }else if(vURL == "" && aURL != "")
               {
               strHTMLDetail = strHTMLDetail + "<div id='audioStreamer'><img id='"+fileNameVideo+"' title='"+vURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/></div>";
               
               var getstatus = window.localStorage.getItem("status");
               if(getstatus =="offline")
               {
               strHTMLDetail = strHTMLDetail + "<img id='videoStreamImg' style='border:none; width:150px; height:100px; margin:20px 20px;' src='"+actualLocal+"'></image>";
               }
               else
               {
               strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='width:150px; height:20px;margin:0px 20px 0px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
               }
               
               }
               
               strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%;vertical-align: top'><br>";
               
               if(aURL != ""){
               
               if(entries.indexOf(fileNameAudio) != -1){
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameAudio+"' title='"+detailPageItemContent.localPathAudio+"' onclick='downloadFileAudioMain(this,true,"+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameAudio+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,false,"+titleE+",1)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               if(pURL != ""){
               
               if(entries.indexOf(fileNamePresentation) != -1){
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNamePresentation+"' title= '"+detailPageItemContent.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,true,"+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNamePresentation+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",3)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(tURL != ""){
               
               if(entries.indexOf(fileNameTranscript) != -1){
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameTranscript+"' title= '"+detailPageItemContent.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,true,"+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameTranscript+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(vURL != ""){
               
               if(entries.indexOf(fileNameVideo) != -1){
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameVideo+"' title= '"+detailPageItemContent.localPathVideo+"' onclick='downloadFileAudioMain(this,true,"+titleE+",2)'  style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='"+fileNameVideo+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               
               strHTMLDetail = strHTMLDetail + "<div id='playlistItem"+fileNameVideo+"' data-playlistItemId='"+fileNameVideo+"' data-playlistItemTitle='"+detailPageItemContent.title+"' data-playlistItemDate='"+detailPageItemContent.publishedDate+"' data-playlistItemAuthor='"+detailPageItemContent.author+"' data-playlistItemUrl='"+vURL+"' data-playlistItemThumb='"+detailPageItemContent.thumb+"' style='width:100px;height:40px;z-index:100;' onclick='getAddToPlaylistItemDetails(this);showAddToPlaylist();'><img class='detailMediaPageButton' src='images/btn_addToPlaylist.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;'/></div><br>";
               }
               
               if(detailPageItemContent.qna != ""){
               
               strHTMLDetail = strHTMLDetail + "<a data-transition='slide' style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
               
               strHTMLDetail = strHTMLDetail + "<div id='"+detailPageItemContent.title+"' title='"+detailPageItemContent.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";
               
               }

               strHTMLDetail = strHTMLDetail + "</td></tr>";
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='"+typeThumbIcon+"' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+detailPageItemContent.title+"</label><br>";
               
               $.each(detailPageItemContent.author, function(key, tempAuthor) {
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id)'  >";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               
               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+detailPageItemContent.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+detailPageItemContent.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='width: 100%; height: 20px;background-color:white;border:none'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
               {
               strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='100' src='images/btn_previous.svg'></img></td>";
               strHTML = strHTML + "<td id='nextBtn'  style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='60px' src='images/btn_next.svg'></img></td>";
               }
               
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'>";
               
               }
               
    }
    
    
    if(type == 'documents' || type == 'Documents'){
        
                var documentItem = jsonData.lookUpItemsList[elementId];
               var  cId= documentItem.itemId;
               var dURL = documentItem.pdf;
               var lURL = documentItem.localPath;
               
               var titleE = JSON.stringify(documentItem.title);
               var actualLocal = '';
               
               if(isOnline && documentItem.actualLocal == '')
               {
               actualLocal = documentItem.actual;
               }
               else if(isOnline && documentItem.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }
               else if(!isOnline && documentItem.actualLocal == '')
               {
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && documentItem.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }
               else
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+actualLocal+"' style='border:none; height:150px; width:100px; margin:20px 20px;'/><br><br></td>";
               
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               
               
               if(entries.indexOf("DD"+cId) != -1){
               
               strHTMLDetail = strHTMLDetail + "<div id='DD"+cId+"' title= '"+documentItem.localPath+"' onclick= 'downloadFileAudioMain(this,true,"+titleE+",5)' style='width:120px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewPDF.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               strHTMLDetail = strHTMLDetail + "<div id='DD"+cId+"' title= '"+dURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",5)' style='border:none;width:120px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/button_downloadPDF.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_document.png' style='height:20px; width:20px; border:none;;margin:5px;'/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+documentItem.title+"</label><br>";
               
               $.each(documentItem.author, function(key, tempAuthor) {
                      authornamefromid = tempAuthor;
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id)'  >";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+documentItem.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+documentItem.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
               
               strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='100' src='images/btn_previous.svg'></img></td>";
               strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='60px' src='images/btn_next.svg'></img></td>";
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               
        
    }
    
    if(type == 'events'){
        var stringIWant = '';
        
        $.each(jsonData.spotLight, function(key, eventItem) {
               
               stringIWant = '';
               var stringIGet = eventItem.category;
               
               arrayOfCategories = stringIGet.split("|");
               
               for(var i=0;i<arrayOfCategories.length;i++)
               {
               var getCategoryName = new Array();
               getCategoryName = arrayOfCategories[i].split("-");
               if(i==arrayOfCategories.length - 1)
               {
               stringIWant += getCategoryName[0];
               } else {
               stringIWant += getCategoryName[0] + ", ";
               }
               }
               
               if(stringIWant.length > 35)
               {
               stringToDisplay = stringIWant.substring(0,32);
               var trimmedCatDisplay = stringToDisplay + "...";
               stringIWant =  trimmedCatDisplay;
               }
               
               });
   

               var eventItem = jsonData.lookUpItemsList[elementId];
               var cId= eventItem.itemId;
               var eURL = eventItem.icsfile;
               
               var actualLocal = '';
               if(isOnline && eventItem.actualLocal == '')
               {
               actualLocal = eventItem.actual;
               }
               else if(isOnline && eventItem.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
               }
               else if(!isOnline && eventItem.actualLocal == '')
               {
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && eventItem.actualLocal != '')
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
               }
               else
               {
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
               }
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               if(eventItem.authorCount == 1){
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+actualLocal+"' style='border:none; width:100px; height:150px;  margin:20px 20px;'/><br></td>";
               }else if(eventItem.authorCount == 2){
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+actualLocal+"' style='border:none; width:200px; height:150px;  margin:20px 20px;'/><br></td>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+actualLocal+"' style='border:none; width:200px; height:150px;  margin:20px 20px;'/><br></td>";
               
               }
             
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cId+"' title= '"+eURL+"' onclick= 'openIcsFile(this)' style='border:none;width:33%;height:40px;z-index:100;'><img src='images/btn_addtoCalender.svg' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' hidden='true'></div><br><br>";
               
               if(stringIWant!= ""){
               strHTMLDetail += "<tr><td style='width : 100%' colspan='2'style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+stringIWant+"</td> </tr>";
               }
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_event.png' style='height:20px; width:20px; border:none;margin:5px; '/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+eventItem.title+"</label><br>";
               
               $.each(eventItem.author, function(key, tempAuthor) {
                      authornamefromid = tempAuthor;
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id)'  >";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               var tempDate = '';
               
               strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"+eventItem.startDate+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+eventItem.etime+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+eventItem.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
               
               strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='100' src='images/btn_previous.svg'></img></td>";
               strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img class='prevNextButton' width='60px' src='images/btn_next.svg'></img></td>";
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
    }
    
    document.getElementById('spotItemContent').style.display = "none";
    
    $('#detailPageArea').html(strHTMLDetail);
    $('#prevNextContentArea').html(strHTML);
    
    if(countNum == 0){
        
        document.getElementById('prevBtn').style.display = "none";
        
    }
    if(countNum == -1){
        
        document.getElementById('nextBtn').style.display = "none";
    }
    
    if(countNum == -100){
        
        document.getElementById('prevBtn').style.display = "none";
        document.getElementById('nextBtn').style.display = "none";
    }
    
    strHTMLDetail = '';
    strHTML = '';
    $('video').bind('play', stopStreaming);
    
}


function showAuthorDetailPage(a)
{
    
    $("#navigateDetailAuthor").hide();
    
    resetSearchBar(currentSearchKey);
    
    window.localStorage.setItem("aNameFromId",a);
    var strHTMLDetail = "";
    var author = a;
    var asdas = window.localStorage.getItem("a");
    var authorName ='';
    
    
    $('#AuthorContentArea').html('');
    
    $.each(jsonData.contributor, function(key, itemContributor) {
            if(itemContributor.title == author){
           
           var actualLocal = '';
           
           if(isOnline && itemContributor.actualLocal == '')
           {
           actualLocal = itemContributor.actual;
           }
           else if(isOnline && itemContributor.actualLocal != '')
           {
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           else if(!isOnline && itemContributor.actualLocal == '')
           {
           actualLocal = 'images/TechTime-AppIcon.png';
           }
           else if(!isOnline && itemContributor.actualLocal != '')
           {
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           else
           {
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           if(spotLightFlag)
           {
            actualLocal = "file://"+window.appRootDir.fullPath + "/images/"+itemContributor.itemId+"actual.png";
           }
           
           strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
           strHTMLDetail = strHTMLDetail + "<img id='videoImg' src='"+actualLocal+"' style='border:none; height:150px; width:100px; margin:20px 20px;'/><br></td>";
           strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
           strHTMLDetail = strHTMLDetail + "</td></tr>";
           
           
           strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'>";
           
           strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemContributor.title+"</label><br>";
           
           if(itemContributor.email != "")
           {
           strHTMLDetail = strHTMLDetail + "<label id='emailAuthor' style='font-size: 14px;font-family: AgfaRotisSans;'>"+itemContributor.email+"</label><br>";
           }
           strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:black'>"+itemContributor.contributor+"</label><br><br><br>";
           strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemContributor.description+"</label>";
           strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table></div>";
           authorName = itemContributor.title;
           
           }
           
           });
    
    $('#AuthorContentArea').html(strHTMLDetail);
    $.mobile.changePage('#detailAuthor');
}


var flagSubscribeCount = 0;
var atleastOneAssetTypeChecked = 'false';
var atleastOneTAChecked = 'false';


function showSubscribeContent()
{
    $('#detailPageArea').html('');
    $("#subscribePageDiv").show();
    
    defaultNavigate();
    
    var xmlArr = '';
    
    
    if(deviceName == "iPad" || deviceName == "iPadNew")
    {
        $(".techAreasLabel").css('font-size','16px');
    } else{
        $(".myTD").css('padding-left','25px');
        $(".techAreasLabel").css('font-size','12px');
        
    }
    
    flagSubscribeCount = '0';
    atleastOneAssetTypeChecked = 'false';
    
    var flagPodcast = "false";
    var flagDocument = "false";
    var flagEvent = "false";
    
    $('#subscribePageContentArea').html('');
    
    xmlArr += '<table id="technologyAreas" border="0" style="width: 100%; margin: 0px; padding: 0px; background : #F0EFED">';
    xmlArr += '<tr><td style="width: 55%;background : #F0EFED">';
    xmlArr += '<fieldset id="techAreasCB" data-role="controlgroup" name="technologyAreasCheck" style="background : #F0EFED">';
    xmlArr += '<legend style="font-style: bold; font-size:16px;background : #F0EFED;width:100%"><label style="background : #F0EFED"><b>Areas<b>:</label></legend>';
    
    $.each(jsonData.category, function(key, item) {
           
           xmlArr += '<table style="background:#F0EFED;">';
           
           if(item.subscribe == "yes"){
           
           xmlArr += '<tr><td><div style="width:100%; background:#F0EFED;"><input type="checkbox" data-role="none" name="category'+item.categoryid+'" id="checkbox'+item.categoryid+'"  class="techAreasCheckBox" checked="checked"/></td><td class="myTD"><label class="techAreasLabel" style="font-weight:100">'+item.categoryname+'</label></div></td></tr>';
           
           flagSubscribeCount++;
           
           }else{
           
           xmlArr += '<tr><td><div style="width:100%; background:#F0EFED;"><input type="checkbox" data-role="none" name="category'+item.categoryid+'" id="checkbox'+item.categoryid+'" class="techAreasCheckBox" /></td><td class="myTD"><label class="techAreasLabel" style="font-weight:100">'+item.categoryname+'</label></div></td></tr>';
           
           }
           
           xmlArr += '</table>';
           
           if(item.subbscribePodcast == "yes"){
           flagPodcast = "yes";
           atleastOneAssetTypeChecked = 'true';
           }
           if(item.subscribeDocuments == "yes"){
           flagDocument = "yes";
           atleastOneAssetTypeChecked = 'true';
           }
           if(item.subbscribeEvent == "yes"){
           flagEvent = "yes";
           atleastOneAssetTypeChecked = 'true';
           }
           
           });
    
    
    xmlArr += '</fieldset></td>';
    xmlArr += '<td id="cellAT" style="width: 45%" valign="top">';
    xmlArr += '<fieldset id="assetTypesCB" data-role="controlgroup" style="background : #F0EFED">';
    xmlArr += '<legend style="font-style: bold; font-size:16px;background : #F0EFED;;width:100%"><b>Asset Types<b>:</legend>';
    
    xmlArr += '<table style="background:#F0EFED;">';
    
    
    if((flagPodcast == "yes" && flagDocument == "yes" && flagEvent == "yes") || (flagPodcast != "yes" && flagDocument != "yes" && flagEvent != "yes"))
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
        
    } else if(flagPodcast == "yes" && flagDocument == "yes" && flagEvent != "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox"/></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
    } else if(flagPodcast == "yes" && flagDocument != "yes" && flagEvent == "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
        
    } else if(flagPodcast == "yes" && flagDocument != "yes" && flagEvent != "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
        
    } else if(flagPodcast != "yes" && flagDocument == "yes" && flagEvent == "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
    } else if(flagPodcast != "yes" && flagDocument == "yes" && flagEvent != "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
    } else if(flagPodcast != "yes" && flagDocument != "yes" && flagEvent == "yes")
    {
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel">Audio/Videos</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox17" id="documents" class="assetTypeCheckBox" /></td><td><label class="techAreasLabel" >Documents</label></div></td></tr>';
        xmlArr += '<tr><td><div style="width:100%;background : #F0EFED;"><input type="checkbox" data-role="none" name="checkbox18" id="events" class="assetTypeCheckBox" checked/></td><td><label class="techAreasLabel" >Events</label></div></td></tr>';
    }
    
    xmlArr += '</table>';
    
    xmlArr += '</fieldset><label id="selectAllAssetTypes" style="color: orange; padding-left: 4px" onclick="subAllAssetTypes()" ><b><div class="linkeffect" >Select All</div></b></label></td></tr></table>';
    
    xmlArr += '<table style="width: 100%"><tr>';
    xmlArr += '<td style="width: 60%"><label id="selectAllTechAreas" style="color: orange; padding-left: 5px"  onclick="subAllTechAreas()" ><b><div class="linkeffect" >Select All</div></b></label></td>';
    xmlArr += '<td style="width: 40%"></td>';
    xmlArr += '</tr></table>';
    
    
    xmlArr += '<div id="actionButtons" style="padding-right: 15px;"><br>';
    xmlArr += '<table style="width:100%"><tr><td style="width:60%;height:60px;">';
    xmlArr += '<div style="height:100%;">';
    xmlArr += '<img id="clearAllSelections" class="detailMediaPageButton" src="images/btn_clearAll.png" style="float:left;margin-left:1%;width:100px;"/>';
    xmlArr += '</div></td>';
    xmlArr += '<td style="width:40%;height:60px;">';
    xmlArr += '<div style="height:100%;">';
    xmlArr += '<img id="subnscribeNow" class="detailMediaPageButton" src="images/btn_subscribeNow.png" style="margin-left:2%;width:100px;" onclick="showa(this)"/>';
    xmlArr += '</div></td></tr></table></div>';
    
    
    if(flagSubscribeCount)
    {
        xmlArr += '</div>';
    }
    
    
    xmlArr += '<br><div style="width:100%;padding-left: 10px" onclick="unsubscribeFunction()" class="linkeffect"><a data-mini="true" data-inline="true" style="text-decoration:none;float:left;color:orange"><div id="unsubnscribeNow">How to Un-subscribe?</div></a></div><br><br>';
    
    
    $('#subscribePageContentArea').html(xmlArr);
    
    xmlArr = '';
    
    
}

function unsubscribeFunction()
{
    jAlert('To unsubscribe, un-select the Area or Asset Type and select "Subscribe Now".', 'Tech Time');
}

function subAllTechAreas()
{
    $('.techAreasCheckBox').attr('checked', true);
}

function subAllAssetTypes()
{
    $('.assetTypeCheckBox').attr('checked', true);
}

$("#clearAllSelections").live("click",function(event){
                              
                              $('.assetTypeCheckBox').attr('checked', false);
                              $('.techAreasCheckBox').attr('checked', false);
                              
                              });

function showa(mode)
{
    var csMode = '';
    
    if(mode.id == 'subnscribeNow'){
        csMode = 'subscribe';
    }else{
        csMode = 'unsubscribe';
    }
    
    var technologyAreas = $('.techAreasCheckBox');
    var assetTypes = $('.assetTypeCheckBox');
    
    flagSubscribeCount = atleastOneAssetTypeChecked = 'false';
    
    technologyAreas.each(function(){
                         if($(this).is(':checked')){
                         flagSubscribeCount = "true";
                         }
                         });
    
    assetTypes.each(function(){
                    if($(this).is(':checked')){
                    atleastOneAssetTypeChecked = "true";
                    }
                    });
    
    if(flagSubscribeCount == "false" && atleastOneAssetTypeChecked == "true")
    {
        jAlert('You should select at least one area.', 'Tech Time');
        
        flagSubscribeCount = "false;"
        atleastOneAssetTypeChecked = "false";
        
    }else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "false"){
        jAlert('You should select at least one asset type.', 'Tech Time');
        
        flagSubscribeCount = "false;"
        atleastOneAssetTypeChecked = "false";
        
    }else if(flagSubscribeCount == "false" && atleastOneAssetTypeChecked == "false"){
        jAlert('You should select at least one area and one asset type.', 'Tech Time');
        
        flagSubscribeCount = "false;"
        atleastOneAssetTypeChecked = "false";
        
    }else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "true" && csMode == "subscribe"){
        
        checkedCategoryList(csMode);
        
    } else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "true" && csMode == "unsubscribe"){
        
        checkedCategoryList(csMode);
    }
    
    
}

function checkedCategoryList(mode)
{
    var checkedArray = $('#techAreasCB :checkbox:checked');
    var categoryId = [];
    var clMode = mode;
    
    checkedArray.each(function(){
                      
                      var categoryName = $(this).attr("name");
                      var categoryNumber = categoryName.slice(8);
                      
                      categoryId.push(categoryNumber);
                      });
    
    prepareJSON(categoryId, clMode)
}

function prepareJSON(technologyAreas, mode)
{
    var localTechnologyAreas = technologyAreas;
    var localMode = mode;
    
    
    var JSONData = [];
    
    if(localMode == "subscribe")
    {
        JSONData += '{"data":{"mode" : "subscribe","technologyareas":[';
        
    }else if(localMode == "unsubscribe"){
        
        JSONData += '{"data":{"mode" : "unsubscribe","technologyareas":[';
        
    }
    
    
    for(i=0; i<localTechnologyAreas.length; i++)
    {
        if(i < localTechnologyAreas.length-1)
        {
            JSONData += localTechnologyAreas[i]+',';
            
        } else{
            
            JSONData += localTechnologyAreas[i];
        }
    }
    
    var typeAV = $('#audioVideo');
    var typeDoc = $('#documents');
    var typeEvent = $('#events');
    
    if(typeAV.is(':checked') && typeDoc.is(':checked') && typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast","documents","events"]}}';
    } else if(typeAV.is(':checked') && typeDoc.is(':checked') && !typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast","documents"]}}';
    } else if(typeAV.is(':checked') && !typeDoc.is(':checked') && typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast","events"]}}';
    } else if(typeAV.is(':checked') && !typeDoc.is(':checked') && !typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast"]}}';
    } else if(!typeAV.is(':checked') && typeDoc.is(':checked') && typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["documents","events"]}}';
    } else if(!typeAV.is(':checked') && typeDoc.is(':checked') && !typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["documents"]}}';
    } else if(!typeAV.is(':checked') && !typeDoc.is(':checked') && typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":["events"]}}';
    } else if(!typeAV.is(':checked') && !typeDoc.is(':checked') && !typeEvent.is(':checked'))
    {
        JSONData += '],"assettypes":[]}}';
    }
    
    postJSONData(JSONData, localMode);
}

function postJSONData(localJSONData, postMode)
{
    var uName = document.getElementById("lblUserName").innerHTML;
    uName = uName.replace(/\./g, '_');
    
    var linkSubscribe = 'https://techtime.stage2.accenture.com/techtimemobile/subscribe-service/uid=';
    linkSubscribe = linkSubscribe + uName;
    var localJSONData1 = {"data" :{"mode" : "logout"}};
    
    if(postMode == 'logout'){
        
        localJSONData = JSON.stringify(localJSONData1);
    }
    
    if(window.localStorage.getItem("status") == "online")
    {
        isOnline = true;
    } else if(window.localStorage.getItem("status") == "offline")
    {
        isOnline = false;
    }
    
    if(isOnline){
        $.ajax({
               
               type: 'POST',
               url: linkSubscribe,
               data: localJSONData,
               dataType: 'xml',
               contentType: 'application/json',
               success: function(data) {
               
               if(postMode == 'subscribe' || postMode == 'subscribedOffline'){
               if(postMode != 'subscribedOffline')
               {
                    jAlert('Thank you for your Subscription to Tech Time.', 'Tech Time');
               }
                getFileSystemRefForWriting(jsonData);
               }else if(postMode == 'logout'){
               jAlert('Logged Out Successfully.', 'Tech Time');
               $.mobile.changePage("#loggedOutPage");
               
               }else{
               jAlert('Thank you for your Un-Subscription to Tech Time.', 'Tech Time');
               }
               
               },
               error: function(xhr, textStatus, error){
               //parent.window.location.href = "https://techtime.stage2.accenture.com/mobile/index.php";
               jAlert('Could not subscribe you to the selected Areas. Please try again.', 'Tech Time');
               console.log('In Failure'+JSON.stringify(xhr));
               }
               
               });
    }else{
        
        if(postMode == 'logout'){
                        
        }else{
            getFileSystemRefForWriting(jsonData);
            //jAlert('To \"Subscribe\" or \"Unsubscribe"\, please go online.', 'Tech Time');
            jAlert('You are currently Offline. Your subscriptions will be updated once you are Online or internet connection is available.', 'Tech Time');
        }
    }
}

function changeDownloadLogoutColor()
{
    document.getElementById('logoutLabelHomescreen').style.color = "grey";
    document.getElementById('homescreenLogout').style.background = "grey";
}


var isCommentEntered = "false";
var isSubmitHit = "false";

function setTextArea()
{
    $('#commentTextArea').val('Enter Your Comments Here');
}

function contactUsFocus()
{
    
    $('#detailPageArea').html('');
    
    
    var textAreaRefresh = "false";
    
    $('#commentTextArea').focus(function(){
                                
                                if($(this).val() == 'Enter Your Comments Here')
                                {
                                $(this).val('');
                                textAreaRefresh = "true";
                                } else {
                                $(this).val() = $(this).val();
                                }
                                });
    
    
    $('#clearText').click(function(){
                          $('#commentTextArea').val('');
                          });
    
    
    
    
}

var postCommentIndex = 0;

function postOfflineComments()
{
    if((postCommentIndex < jsonData.offlineCommentsPosted.length) && (jsonData.offlineCommentsPosted.length != 0))
    {
        postOfflineCommentServiceCall(postCommentIndex);
    }
}

function postOfflineCommentServiceCall(commentIndex)
{
    
    var commentSubmit = '';
    var commentJSON = '{"data":{"comment":"';
    
    var uName = document.getElementById('lblUserName').innerHTML;
    uName = uName.replace(/\./g,'_');
    
    var linkContact = 'https://techtime.stage2.accenture.com/techtimemobile/contactus/uid=';
    linkContact = linkContact + uName;
    
    commentSubmit = jsonData.offlineCommentsPosted[postCommentIndex].commentSubmit;
    
    commentSubmit = commentSubmit.replace(/(\r\n|\n|\r)/gm," ");
    
    commentJSON = commentJSON + commentSubmit + '"}}';
            
            $.ajax({
                   
                   type: 'POST',
                   url: linkContact,
                   data: commentJSON,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   postCommentIndex = postCommentIndex + 1;
                   // jAlert('Thank you for contacting Tech Time.', 'Tech Time');
                   // setTextArea();
                       if((postCommentIndex < jsonData.offlineCommentsPosted.length) && (jsonData.offlineCommentsPosted.length != 0))
                       {
                            postOfflineCommentServiceCall(postCommentIndex);
                       } else if((postCommentIndex == jsonData.offlineCommentsPosted.length) && (jsonData.offlineCommentsPosted.length != 0))
                        {
                            jAlert('All your offline comments have been posted.', 'Tech Time');
                            jsonData.offlineCommentsPosted = [];
                            getFileSystemRefForWriting(jsonData);
                        }
                   },
                   error: function(xhr, textStatus, error){
                   jAlert('Could not post your comment. Please try again.', 'Tech Time');
                   postCommentIndex = postCommentIndex + 1;
                   if((postCommentIndex < jsonData.offlineCommentsPosted.length) && (jsonData.offlineCommentsPosted.length != 0))
                   {
                   postOfflineCommentServiceCall(postCommentIndex);
                   } else if((postCommentIndex == jsonData.offlineCommentsPosted.length) && (jsonData.offlineCommentsPosted.length != 0))
                   {
                   jAlert('All your offline comments have been posted.', 'Tech Time');
                   setTextArea();
                   jsonData.offlineCommentsPosted = [];
                   getFileSystemRefForWriting(jsonData);
                   }
                   console.log(''+JSON.stringify(xhr));
                   
                   }
                   });
            
        
    
}

function contactUsArea()
{
    
    var commentSubmit = '';
    var commentJSON = '{"data":{"comment":"';
    
    var commentEntered = 'false';
    
    var uName = document.getElementById('lblUserName').innerHTML;
    uName = uName.replace(/\./g,'_');
    
    
    var linkContact = 'https://techtime.stage2.accenture.com/techtimemobile/contactus/uid=';
    linkContact = linkContact + uName;
    
    commentSubmit = $('#commentTextArea').val();
    
    commentSubmit = commentSubmit.replace(/(\r\n|\n|\r)/gm," ");
    
    isSubmitHit = "true";
    
    if(commentSubmit == '' || commentSubmit == 'Enter Your Comments Here' || (commentSubmit.length>0 && commentSubmit.trim().length==0))
    {
        jAlert('Please enter some comments to Submit.', 'Tech Time');
        commentEntered = 'false';
    } else {
        commentJSON = commentJSON + commentSubmit + '"}}';
        commentEntered = 'true';
    }
    
    if(commentEntered == 'true')
    {   
        if(isOnline){
            
            $.ajax({
                   
                   type: 'POST',
                   url: linkContact,
                   data: commentJSON,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   jAlert('Thank you for contacting Tech Time.', 'Tech Time');
                   setTextArea();
                   },
                   error: function(xhr, textStatus, error){
                   jAlert('Could not post your comment. Please try again.', 'Tech Time');
                   console.log(''+JSON.stringify(xhr));
                   
                   }
                   });
            
        }else{
            var offlineCommentToBePosted = new Object();
            offlineCommentToBePosted.commentId = jsonData.offlineCommentsPosted.length + 1;
            offlineCommentToBePosted.commentSubmit = commentSubmit;
            
            jsonData.offlineCommentsPosted.push(offlineCommentToBePosted);
            setTextArea();
            getFileSystemRefForWriting(jsonData);
            jAlert('You are currently offline. Your comment would be posted once you come online.', 'Tech Time');
        }
        
    }
    
}



function showAboutTTArea()
{   
    $('#detailPageArea').html('');
    
    defaultNavigate();
    
    var strHTMLAboutTT = "";
    
    $('#aboutTectTimeContentArea').empty('');
    
    $.each(jsonData.aboutTechTime, function(key, ATTitem) {
           
           strHTMLAboutTT = strHTMLAboutTT + ATTitem.title;
           strHTMLAboutTT = strHTMLAboutTT + ATTitem.description;
           
           if(ATTitem.image != ''){
           
           if(isOnline){
           strHTMLAboutTT = strHTMLAboutTT + "<img src='"+ATTitem.image+"' style='width:90%'/>";
           }else{
           strHTMLAboutTT = strHTMLAboutTT + "<img src='images/aboutTechtime.png' style='width:90%'/>";
           }
           
           }
           });
    
    $('#aboutTectTimeContentArea').html(strHTMLAboutTT);
    
}


function showHideFaq(element)
{
    var bTemp = $('#'+element.id+'Content').is(':visible');
    
    if(!bTemp){
        $('#'+element.id+'Content').show('fast');
        document.getElementById(element.id).innerHTML = "Hide Answer";
        $("#"+element.id).addClass("linkeffect");
    }
    else{
        $('#'+element.id+'Content').hide('fast');
        document.getElementById(element.id).innerHTML = "Show Answer";
        $("#"+element.id).addClass("linkeffect");
    }
}



function showFaqContent()
{
    $('#detailPageArea').html('');
    $('#faqContentArea').empty('');
    
    defaultNavigate();
    var strHTMLCategory = "";
    
    $.each(jsonData.faq, function(index, item) {
           var indexTemp = item.qOrder + "Index";
           var titleTemp = item.qOrder + "Toggle";
           var tmpImage1 = item.qOrder + "ToggleContent";
           var tmpImage2 = item.qOrder + "ToggleContent";
           var displayTemp = item.qOrder +"ToggleContent";
           var image1 = item.sImage1;
           var image2 = item.sImage2;
           
           strHTMLCategory = strHTMLCategory + "<table border=0 style='width:98%; margin :0px; padding:0px; margin-left:15px; border:none;' cellpadding='0' cellspacing='0'>";
           
           if(image1 !="" || image2 !=""){
           
           strHTMLCategory = strHTMLCategory + "<td id="+indexTemp +" style='margin:0px; padding:0px; background:none; width:5%; border:none;text-indent: 1%' align='left'>"+item.qOrder+".</td>";
           strHTMLCategory = strHTMLCategory + "<td id="+item.qOrder+" style=margin :0px; padding 0px; background:none; width:75%; border:none; text-indent: 2%'><b>"+item.title+"</b></td>";
           strHTMLCategory = strHTMLCategory + "<td id="+titleTemp+" style='margin:0px; padding:0px; background:none; width:20%; border:none;color:orange' onclick='showHideFaq(this)' align='left'>Show Answer</td></tr>";
           strHTMLCategory = strHTMLCategory + "<tr><td style='margin :0px; padding 0 px;background:none ; width : 100%;border:none' colspan='3'><hr style='color:red;width:95%'></td></tr><tr>";
           strHTMLCategory = strHTMLCategory + "<td id="+displayTemp+" style='margin :0px; padding:0px; background:none; width:100%; display:none; border:none;' colspan='3'><div style='width:90%;margin-left:10px;' align='left'>"+item.description+"<br><br>";
           strHTMLCategory = strHTMLCategory + "<img src="+image1+" style = ' margin-left: 15%' /><br>";
           strHTMLCategory = strHTMLCategory + "<br><img src="+image2+" style = ' margin-left: 15%' /></div></td></tr></table><br>";
           
           
           }
           else
           {
           
           strHTMLCategory = strHTMLCategory + "<td id="+indexTemp +" style='margin:0px; padding:0px; background:none; width:5%; border:none;text-indent: 1%' align='left'>"+item.qOrder+".</td>";
           strHTMLCategory = strHTMLCategory + "<td id="+item.qOrder+" style=margin :0px; padding 0px; background:none; width:75%; border:none; text-indent: 2%'><b>"+item.title+"</b></td>";
           strHTMLCategory = strHTMLCategory + "<td id="+titleTemp+" style='margin:0px; padding:0px; background:none; width:20%; border:none;color:orange' onclick='showHideFaq(this)' align='left'>Show Answer</td></tr>";
           strHTMLCategory = strHTMLCategory + "<tr><td style='margin :0px; padding 0 px;background:none ; width : 100%;border:none' colspan='3'><hr style='color:red;width:95%'></td></tr><tr>";
           strHTMLCategory = strHTMLCategory + "<td id="+displayTemp+" style='margin :0px; padding:0px; background:none; width:100%; display:none; border:none;' colspan='3'><div style='width:90%; margin-left:10px;' align='left'>"+item.description+"</td></tr></table><br>";
           
           }
           
           });
    
    $('#faqContentArea').html(strHTMLCategory);
    
}

function changeIsdownloadStatus(tempfilePath, itemId, type)
{
    itemId = itemId.substr(2,itemId.length);
    var tempfilePathLocal = tempfilePath;
    
    var flag = 'true';
    var testChar = tempfilePath.lastIndexOf('/');
    var tempMedia = tempfilePath.substr(testChar+1,1);
    var tempDocument = tempfilePath.substr(testChar+2,1);

    if(type == 'delete'){
        tempfilePathLocal = '';
        flag = 'false';
    }
    
    if(tempMedia == 'D'){
        
        $.each(jsonData.spotLight, function (key, documentItemSpot) {
                   if (documentItemSpot.itemId == itemId) {
                       if (tempDocument == 'D') {
                       documentItemSpot.isDownloaded = flag;
                       documentItemSpot.localPath = tempfilePath;
                       documentItemSpot.downloadedDateD = new Date();
                       
                           if(documentItemSpot.isDownloadedFromSpotLight == 'true')
                           {
                            documentItemSpot.isDocumentFromSpotlight = flag;
                           }
                       }
                   }
               });
    }
    
    if(tempMedia == 'A'){
        
        $.each(jsonData.spotLight, function (key, audioItemSpot) {
               
               if (audioItemSpot.itemId == itemId) {
               
               if (tempDocument == 'A') {
               audioItemSpot.localPathAudio = tempfilePath;
               audioItemSpot.isDownloadedAudio = flag;
               audioItemSpot.downloadedDateA = new Date();
               
               if (audioItemSpot.isDownloadedFromSpotLight == 'true')
               audioItemSpot.isAudioFromSpotlight = flag;
               }
               
               if (tempDocument == 'V') {
               audioItemSpot.localPathVideo = tempfilePath;
               audioItemSpot.isDownloadedVideo = flag;
               audioItemSpot.downloadedDateV = new Date();
               
               if (audioItemSpot.isDownloadedFromSpotLight == 'true')
               audioItemSpot.isVideoFromSpotlight = flag;
               }
               if (tempDocument == 'T') {
               audioItemSpot.localPathTranscript = tempfilePath;
               audioItemSpot.isDownloadedTranscript = flag;
               audioItemSpot.downloadedDateT = new Date();
               
               if (audioItemSpot.isDownloadedFromSpotLight == 'true')
               audioItemSpot.isTranscriptFromSpotlight = flag;
               }
               if (tempDocument == 'P') {
               audioItemSpot.localPathPresentation = tempfilePath;
               audioItemSpot.isDownloadedPresentation = flag;
               
               audioItemSpot.downloadedDateP = new Date();
               
               if (audioItemSpot.isDownloadedFromSpotLight == 'true')
               audioItemSpot.isPresentationFromSpotlight = flag;
               }
               }
               });
    }
    
    if(tempMedia == 'V'){
               
        $.each(jsonData.spotLight, function (key, videoItemSpot) {
               
               if (videoItemSpot.itemId == itemId) {
               
               if (tempDocument == 'A') {
               videoItemSpot.localPathAudio = tempfilePath;
               videoItemSpot.isDownloadedAudio = flag;
               videoItemSpot.downloadedDateA = new Date();
               
               if (videoItemSpot.isDownloadedFromSpotLight == 'true')
               videoItemSpot.isAudioFromSpotlight = flag;
               
               }
               if (tempDocument == 'V') {
               videoItemSpot.localPathVideo = tempfilePath;
               videoItemSpot.isDownloadedVideo = flag;
               videoItemSpot.downloadedDateV = new Date();
               
               if (videoItemSpot.isDownloadedFromSpotLight == 'true')
               videoItemSpot.isVideoFromSpotlight = flag;
               }
               if (tempDocument == 'T') {
               videoItemSpot.localPathTranscript = tempfilePath;
               videoItemSpot.isDownloadedTranscript = flag;
               videoItemSpot.downloadedDateT = new Date();
               
               if (videoItemSpot.isDownloadedFromSpotLight == 'true')
               videoItemSpot.isTranscriptFromSpotlight = flag;
               }
               if (tempDocument == 'P') {
               videoItemSpot.localPathPresentation = tempfilePath;
               videoItemSpot.isDownloadedPresentation = flag;
               videoItemSpot.downloadedDateP = new Date();
               
               if (videoItemSpot.isDownloadedFromSpotLight == 'true')
               videoItemSpot.isPresentationFromSpotlight = flag;
               }
               }
               });
    }
    
    if(tempMedia == 'I'){
                
        $.each(jsonData.spotLight, function (key, interviewItemSpot) {
               
               if (interviewItemSpot.itemId == itemId) {
               
               if (tempDocument == 'A') {
               interviewItemSpot.localPathAudio = tempfilePath;
               interviewItemSpot.isDownloadedAudio = flag;
               interviewItemSpot.downloadedDateA = new Date();
               
               if (interviewItem.isDownloadedFromSpotLight == 'true')
               interviewItem.isAudioFromSpotlight = flag;
               }
               if (tempDocument == 'V') {
               interviewItemSpot.localPathVideo = tempfilePath;
               interviewItemSpot.isDownloadedVideo = flag;
               interviewItemSpot.downloadedDateV = new Date();
               
               if (interviewItem.isDownloadedFromSpotLight == 'true')
               interviewItem.isVideoFromSpotlight = flag;
               }
               if (tempDocument == 'T') {
               interviewItemSpot.localPathTranscript = tempfilePath;
               interviewItemSpot.isDownloadedTranscript = flag;
               interviewItemSpot.downloadedDateT = new Date();
               
               if (interviewItem.isDownloadedFromSpotLight == 'true')
               interviewItem.isTranscriptFromSpotlight = flag;
               }
               if (tempDocument == 'P') {
               interviewItemSpot.localPathPresentation = tempfilePath;
               interviewItemSpot.isDownloadedPresentation = flag;
               interviewItemSpot.downloadedDateP = new Date();
               
               if (interviewItem.isDownloadedFromSpotLight == 'true')
               interviewItem.isPresentationFromSpotlight = flag;
               }
               }
               });
    }
    
    
    if(tempMedia == 'P'){
                $.each(jsonData.spotLight, function (key, panelDiscussionsItemSpot) {
               
               if (panelDiscussionsItemSpot.itemId == itemId) {
               
               if (tempDocument == 'A') {
               panelDiscussionsItemSpot.localPathAudio = tempfilePath;
               panelDiscussionsItemSpot.isDownloadedAudio = flag;
               panelDiscussionsItemSpot.downloadedDateA = new Date();
               
               
               if (panelDiscussionsItemSpot.isDownloadedFromSpotLight == 'true')
               panelDiscussionsItemSpot.isAudioFromSpotlight = flag;
               }
               
               if (tempDocument == 'V') {
               panelDiscussionsItemSpot.localPathVideo = tempfilePath;
               panelDiscussionsItemSpot.isDownloadedVideo = flag;
               panelDiscussionsItemSpot.downloadedDateV = new Date();
               
               if (panelDiscussionsItemSpot.isDownloadedFromSpotLight == 'true')
               panelDiscussionsItemSpot.isVideoFromSpotlight = flag;
               }
               if (tempDocument == 'T') {
               panelDiscussionsItemSpot.localPathTranscript = tempfilePath;
               panelDiscussionsItemSpot.isDownloadedTranscript = flag;
               panelDiscussionsItemSpot.downloadedDateT = new Date();
               
               if (panelDiscussionsItemSpot.isDownloadedFromSpotLight == 'true')
               panelDiscussionsItemSpot.isTranscriptFromSpotlight = flag;
               }
               if (tempDocument == 'P') {
               panelDiscussionsItemSpot.localPathPresentation = tempfilePath;
               panelDiscussionsItemSpot.isDownloadedPresentation = flag;
               panelDiscussionsItemSpot.downloadedDateP = new Date();
               
               if (panelDiscussionsItemSpot.isDownloadedFromSpotLight == 'true')
               panelDiscussionsItemSpot.isPresentationFromSpotlight = flag;
               }
               }
               });
    }
    
    
    if(tempMedia == 'T'){
        $.each(jsonData.spotLight, function (key, ConfItemSpot) {
               
               if (ConfItemSpot.itemId == itemId) {
               
               if (tempDocument == 'A') {
               ConfItemSpot.localPathAudio = tempfilePath;
               ConfItemSpot.isDownloadedAudio = flag;
               ConfItemSpot.downloadedDateA = new Date();
               
               if (ConfItemSpot.isDownloadedFromSpotLight == 'true')
               ConfItemSpot.isAudioFromSpotlight = flag;
               }
               
               if (tempDocument == 'V') {
               ConfItemSpot.localPathVideo = tempfilePath;
               ConfItemSpot.isDownloadedVideo = flag;
               ConfItemSpot.downloadedDateV = new Date();
               
               if (ConfItemSpot.isDownloadedFromSpotLight == 'true')
               ConfItemSpot.isVideoFromSpotlight = flag;
               }
               if (tempDocument == 'T') {
               ConfItemSpot.localPathTranscript = tempfilePath;
               ConfItemSpot.isDownloadedTranscript = flag;
               ConfItemSpot.downloadedDateT = new Date();
               
               if (ConfItemSpot.isDownloadedFromSpotLight == 'true')
               ConfItemSpot.isTranscriptFromSpotlight = flag;
               }
               if (tempDocument == 'P') {
               ConfItemSpot.localPathPresentation = tempfilePath;
               ConfItemSpot.isDownloadedPresentation = flag;
               ConfItemSpot.downloadedDateP = new Date();
               
               if (ConfItemSpot.isDownloadedFromSpotLight == 'true')
               ConfItemSpot.isPresentationFromSpotlight = flag;
               }
               }
               });
    }
    
    $.each(jsonData.downloadedSpotLightItems, function (key, modifyItem) {
           if (modifyItem.itemId == itemId)
           {
           $.each(jsonData.spotLight, function (key, item) {
                  if (item.itemId == itemId) {
                  modifyItem.isDownloadedAudio = item.isDownloadedAudio;
                  modifyItem.localPathAudio = item.localPathAudio;
                  modifyItem.downloadedDateA = item.downloadedDateA;
                  
                  modifyItem.isDownloadedVideo = item.isDownloadedVideo;
                  modifyItem.localPathVideo = item.localPathVideo;
                  modifyItem.downloadedDateV = item.downloadedDateV;
                  
                  modifyItem.isDownloadedTranscript = item.isDownloadedTranscript;
                  modifyItem.localPathTranscript = item.localPathTranscript;
                  modifyItem.downloadedDateT = item.downloadedDateT;
                  
                  modifyItem.isDownloadedPresentation = item.isDownloadedPresentation;
                  modifyItem.localPathPresentation = item.localPathPresentation;
                  modifyItem.downloadedDateP = item.downloadedDateP;
                  
                  modifyItem.isDownloaded = item.isDownloaded;
                  modifyItem.localPath = item.localPath;
                  modifyItem.downloadedDateD = item.downloadedDateD;
                  
                  modifyItem.isDownloadedFromSpotLight = item.isDownloadedFromSpotLight;
                  modifyItem.isAudioFromSpotlight = item.isAudioFromSpotlight;
                  modifyItem.isVideoFromSpotlight = item.isVideoFromSpotlight;
                  modifyItem.isTranscriptFromSpotlight = item.isTranscriptFromSpotlight;
                  modifyItem.isPresentationFromSpotlight = item.isPresentationFromSpotlight;
                  modifyItem.isDocumentFromSpotlight = item.isDocumentFromSpotlight;
                  }
                  });
           }
           });
    
    if (jsonData.spotLight.length > 0 && flag == 'true') {
        copyAndAddCurrentSpotlight();
    }
    
    getFileSystemRefForWriting(jsonData);
    
}


function copyAndAddCurrentSpotlight() {
    
    $.each(jsonData.spotLight, function (key, item) {
           if (item.isDownloadedFromSpotLight =='true' && (item.isAudioFromSpotlight == 'true'
                                                           || item.isVideoFromSpotlight == 'true' || item.isTranscriptFromSpotlight == 'true'
                                                           || item.isPresentationFromSpotlight == 'true' || item.isDocumentFromSpotlight == 'true')) {
           var spotlightObject = new Object();
           spotlightObject.itemId = item.itemId;
           spotlightObject.type = item.type;
           spotlightObject.formattype = item.formattype;
           spotlightObject.category = item.category;
           spotlightObject.title = item.title;
           spotlightObject.description = item.description;
           spotlightObject.lang = item.lang;
           spotlightObject.author = item.author;
           spotlightObject.authorCount = item.authorCount;
           spotlightObject.audio = item.audio;
           spotlightObject.video = item.video;
           spotlightObject.transcript = item.transcript;
           spotlightObject.presentation = item.presentation;
           spotlightObject.qna = item.qna;
           spotlightObject.document = item.document;
           spotlightObject.publishedDateStart = item.publishedDateStart;
           spotlightObject.publishedDateEnd = item.publishedDateEnd;
           spotlightObject.contributorId = item.contributorId;
           spotlightObject.techArea = item.techArea;
           spotlightObject.thumb = item.thumb;
           spotlightObject.thumbLength = item.thumbLength;
           spotlightObject.actual = item.actual;
           spotlightObject.actualLength = item.actualLength;
           
           spotlightObject.thumbLoc = item.thumbLoc;
           spotlightObject.actualLoc = item.actualLoc;
           
           spotlightObject.specialAds = item.specialAds;
           spotlightObject.saImage = item.saImage;
           spotlightObject.saURL = item.saURL;
           spotlightObject.saText = item.saText;
           
           
           spotlightObject.isDownloadedAudio = item.isDownloadedAudio;
           spotlightObject.localPathAudio = item.localPathAudio;
           spotlightObject.downloadedDateA = item.downloadedDateA;
           
           spotlightObject.isDownloadedVideo = item.isDownloadedVideo;
           spotlightObject.localPathVideo = item.localPathVideo;
           spotlightObject.downloadedDateV = item.downloadedDateV;
           
           spotlightObject.isDownloadedTranscript = item.isDownloadedTranscript;
           spotlightObject.localPathTranscript = item.localPathTranscript;
           spotlightObject.downloadedDateT = item.downloadedDateT;
           
           spotlightObject.isDownloadedPresentation = item.isDownloadedPresentation;
           spotlightObject.localPathPresentation = item.localPathPresentation;
           spotlightObject.downloadedDateP = item.downloadedDateP;
           
           spotlightObject.isDownloaded = item.isDownloaded;
           spotlightObject.localPath = item.localPath;
           spotlightObject.downloadedDateD = item.downloadedDateD;
           
           spotlightObject.isDownloadedFromSpotLight = item.isDownloadedFromSpotLight;
           spotlightObject.isAudioFromSpotlight = item.isAudioFromSpotlight;
           spotlightObject.isVideoFromSpotlight = item.isVideoFromSpotlight;
           spotlightObject.isTranscriptFromSpotlight = item.isTranscriptFromSpotlight;
           spotlightObject.isPresentationFromSpotlight = item.isPresentationFromSpotlight;
           spotlightObject.isDocumentFromSpotlight = item.isDocumentFromSpotlight;
           
           jsonData.downloadedSpotLightItems.push(spotlightObject);
           
           }
           });
}

function showmoreresultTAlist(variable){
    
    var titleCount = parseInt(variable.title) + 5;
    document.getElementById('loadmoreTAList').title = titleCount;
    
    if(resFinal.length){
        $.each(resFinal, function(key, itemRes) {
               if((key+1) <= titleCount){
               document.getElementById('techAreaList'+(key+1)).style.display = "block";
               }
               });
    }
    if(titleCount>=resFinal.length){
        document.getElementById('loadmoreTAList').style.display = "none";
    }
    
    
}


/* SWIPE LEFT RIGHT FEATURE */

 $(document).ready(function(){
                  $('#detailPageArea').on('swipeleft', swipeleftHandler);
                  $('#detailPageArea').on('swiperight', swiperightHandler);
                  
                  });


function swipeleftHandler()
{
    showNextItem(currElementId,currElementcountNum);
}

function swiperightHandler()
{
    showpreItem(currElementId, currElementcountNum);
} 
 
function showpreItem(elementId, countItem)
{
    var prevId = '';
    var prevType = '';
    
    var count = 0;
    var keyTemp = resFinal.length-1;
    stopPlayingMedia();
    $.each(resFinal, function(key, resItem) {
           
           if(key == 0){
           count = 0;
           }else if(key == keyTemp){
           count = key;
           }else{
           count = key;
           }
           
           if(resItem.itemId == elementId && key >0){
           detailPageView(prevId,prevType,count-1,countItem);
           
           }else{
           prevId = resItem.itemId;
           prevType = resItem.type;
           
           }
           
           });
}

function showNextItem(elementId,countItem)
{
    
    var nextIndex = '-1';
    var testVar = '-1';
    
    var count = 0;
    var keyTemp = resFinal.length-1;
    
    stopPlayingMedia();
    
    $.each(resFinal, function(key, resItem) {
           
           if(key == 0){
           count = 0;
           }else if(key == keyTemp){
           count = -1;
           }else{
           count = key;
           }
           
           
           if(resItem.itemId == elementId && key <= resFinal.length){
           testVar = key;
           
           }
           
           
           if(nextIndex != '-1'){
           detailPageView(resItem.itemId,resItem.type,count,countItem);
           nextIndex = '-1';
           testVar = '-1';
           }
           nextIndex = testVar;
           });
}


function showPreviousNextTw(direction, indexItem)
{
    var itemIndex = indexItem;
    var itemId = '';
    
    $.each(jsonData.techWatchMultiple, function(index,element){
           if(index == indexItem)
           {
           itemId = element.techWatchPublicationId;
           }
           });
    
    showTechWatchContent(itemId,itemIndex);
    
}


function generateTechWatchPublicationList()
{
    //alert("Div Generate");
    $.mobile.changePage('#techwatchSelectIssuePage');
    var currentTechWatchPublicationId = '';
    var currentTechWatchPublicationIndex = '';
    var currentTechWatchPublicationDate = '';
    
    var displayTechWatchPublicationsHTML = '';
    
    $.each(jsonData.techWatchMultiple, function(key, techWatchItem){
           currentTechWatchPublicationId = techWatchItem.techWatchPublicationId;
           currentTechWatchPublicationIndex = techWatchItem.techWatchPublicationIndex;
           currentTechWatchPublicationDate = techWatchItem.techWatchPublicationDate;
           currentTechWatchPublicationDateString = techWatchItem.techWatchPublicationDateString;
           
           displayTechWatchPublicationsHTML += "<div id='techWatchPublication"+currentTechWatchPublicationId+"' data-techWatchPubId='"+currentTechWatchPublicationId+"' data-techWatchPubDate='"+currentTechWatchPublicationDate+"' data-techWatchPubIndex='"+currentTechWatchPublicationIndex+"' style='width:100%;border-style:solid;border:1px solid;border-top-color:#7C7B7F;border-bottom-color:#7C7B7F;border-right:0px; border-left:0px;' onclick='loadTechWatchPublication(this);'>";
           displayTechWatchPublicationsHTML += "<div id='techWatchPublicationIdDiv' style='width:15%;background:white;float:left;text-align:center;padding-top:25px;padding-bottom:25px;'>";
           displayTechWatchPublicationsHTML += "<label style='font-size:20px;font-family:AgfaRotisSans;font-weight:bolder;color:#343338;'>#"+currentTechWatchPublicationId+"</label>";
           displayTechWatchPublicationsHTML += "</div>";
           displayTechWatchPublicationsHTML += "<div id='techWatchPublicationDateDiv' style='width:75%;background:white;float:left;text-align:left;padding-top:25px;padding-bottom:25px;'>";
           displayTechWatchPublicationsHTML += "<label style='font-size:20px;font-family:AgfaRotisSans;font-weight:bolder;color:#343338;padding-left:2%;'>"+currentTechWatchPublicationDateString+"</label>";
           displayTechWatchPublicationsHTML += "</div>";
           displayTechWatchPublicationsHTML += "<div id='techWatchPublicationIconDiv' style='width:10%;background:white;float:left;text-align:left;padding-top:28px;padding-bottom:25px;'>";
           displayTechWatchPublicationsHTML += "<img src='images/orange_icon_right1.png' width='20px' height='20px;'/>";
           displayTechWatchPublicationsHTML += "</div>";
           displayTechWatchPublicationsHTML += "<br/><br/><br/><br/>";
           displayTechWatchPublicationsHTML += "</div>";
           
           
           });
    
    $('#techWatchPublicationsList').html(displayTechWatchPublicationsHTML);
    
}


function loadTechWatchPublication(techWatchPublication)
{
    var selectedTechWatchElementId = techWatchPublication.id;
    var selectedTechWatchPubId = '';
    var selectedTechWatchPubDate = '';
    var selectedTechWatchPubIndex = '';
    
    selectedTechWatchPubId = document.getElementById(techWatchPublication.id).getAttribute('data-techWatchPubId');
    selectedTechWatchPubDate = document.getElementById(techWatchPublication.id).getAttribute('data-techWatchPubDate');
    selectedTechWatchPubIndex = document.getElementById(techWatchPublication.id).getAttribute('data-techWatchPubIndex');
    
    //alert("selectedTechWatchPubId " + selectedTechWatchPubId + " selectedTechWatchPubIndex" + selectedTechWatchPubIndex);
    showTechWatchContent(selectedTechWatchPubId, selectedTechWatchPubIndex);
    
    $.mobile.changePage('#techwatchPage');
    
}


function showQnA(elementDetail)
{
    var ida = elementDetail.id;
    var data = elementDetail.title;
    
    $('#qnaTitle').html('');
    $('#qnaPageContentArea').html('');
    
    ida = "Q & A For " + ida;
    
    $('#qnaTitle').html(ida);
    $('#qnaPageContentArea').html(data);
    
    $.mobile.changePage('#qnaPage');
    
}


function showSearchResult(element, media, valueElement,a)
{
    window.localStorage.setItem("searchlement",element);
    window.localStorage.setItem("media",media);
    window.localStorage.setItem("valueElement",valueElement);
    
    saveSearchKey(element);
    
    $('.navigateBackBtn').show();
    
    if(document.getElementById('videoStream'))
    {
        document.getElementById('videoStream').pause();
    }
    
    if(document.getElementById('audioPlayer'))
    {
        document.getElementById('audioPlayer').pause();
    }
    
    var searchString = '';
    
    var sortByMediaType = '';
    sortByMediaType = media;
    
    searchResultArray = [];
    
    var searchResult = new Array();
    searchResult = [];
    
    
    var displaySearchString = '';
    
    if(element == 'prevSearch'){
        searchString = document.getElementById('searchLabel').innerHTML;
    }else{
        searchString = document.getElementById(element).value;
    }
    if(a != "null")
    {
        searchString = a;
    }
    searchString = searchString.trim();
    
    displaySearchString = searchString;
    
    searchString = searchString.replace(/[^a-zA-Z0-9 ]/g, "");
    
    if(searchString == '')
    {
        searchInputFlag = false;
    }
    
    document.getElementById('searchLabel').innerHTML = displaySearchString;
    document.getElementById('typeS').innerHTML = valueElement;
    
    $('#searchResultDiv').html('');
    $('#nosearchResultDiv').html('');
    
    window.localStorage.setItem("searchString",searchString);
    
    //TODO: Change TS
    if((searchString.length && searchString.trim() != 'Search') || (searchInputFlag)){
        
        if(sortByMediaType == 'audio' || sortByMediaType == 'Audio' || sortByMediaType == 'All'){
            $.each(jsonData.audio, function(key, item) {
                   searchResult.push(item);
                   
                   });
        }
        
        if(sortByMediaType == 'video' || sortByMediaType == 'Video' || sortByMediaType == 'All'){
            $.each(jsonData.video, function(key, item) {
                   searchResult.push(item);
                   });
        }
        
        if(sortByMediaType == 'panelDiscussion' || sortByMediaType == 'PanelDiscussion' || sortByMediaType == 'All'){
            $.each(jsonData.panelDiscussions, function(key, item) {
                   searchResult.push(item);
                   });
        }
        
        if(sortByMediaType == 'technologySessions' || sortByMediaType == 'Technology Sessions' || sortByMediaType == 'TechnologySessions' || sortByMediaType == 'All'){
            $.each(jsonData.technologySessions, function(key, item) {
                   searchResult.push(item);
                   });
        }
        
        if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews' || sortByMediaType == 'All'){
            $.each(jsonData.interviews, function(key, item) {
                   searchResult.push(item);
                   });
        }
        
        if(sortByMediaType == 'document' || sortByMediaType == 'Documents' || sortByMediaType == 'All'){
            $.each(jsonData.documents, function(key, item) {
                   searchResult.push(item);
                   });
        }
        if(sortByMediaType == 'TechnologyConferences' || sortByMediaType == 'Technology Conferences' || sortByMediaType == 'All'){
            $.each(jsonData.techConf, function(key, item) {
                   searchResult.push(item);
                   });
        }
        
        var searchKeys = [];
        searchKeys = searchString.split(" ");
        
        var searchResultItemIds = [];
        
        $.each(searchResult, function(key, item) {
               
               var flag = 'false';
               var titleSearch = item.title.search( new RegExp(""+searchString+"","gi"));
               
               if(titleSearch != "-1"){
               flag = 'true';
               }
               
               $.each(item.author, function(key, itemAuthor) {
                      
                      var authorSearch = itemAuthor.search( new RegExp(""+searchString+"","gi"));
                      
                      if(authorSearch != "-1"){
                      flag = 'true';
                      }
                      });
               
               
               
               $.each(item.description, function(key, itemDescription) {
                      
                      var descriptionSearch = itemDescription.search( new RegExp(""+searchString+"","gi"));
                      
                      if(descriptionSearch != "-1"){
                      flag = 'true';
                      }
                      });
               
               if(flag == 'true'){
//               console.log("THIS -----> " + searchResultItemIds.indexOf(item.itemId) + " " + item.itemId);
                   if(searchResultItemIds.indexOf(item.itemId) == -1)
                   {
                        searchResultArray.push(item);
                        searchResultItemIds.push(item.itemId);
                   }
               }
               });
        
        if(searchKeys.length > 1)
        {
            for(var searchKeyIndex = 0; searchKeyIndex < searchKeys.length; searchKeyIndex++)
            {
                $.each(searchResult, function(key, item) {
                       var flag = 'false';
                       var titleSearch = item.title.search( new RegExp(""+searchKeys[searchKeyIndex]+"","gi" ));
                       
                       if(titleSearch != "-1"){
                       flag = 'true';
                       }
                       
                       $.each(item.author, function(key, itemAuthor) {
                              
                              var authorSearch = itemAuthor.search( new RegExp(""+searchKeys[searchKeyIndex]+"","gi" ));
                              
                              if(authorSearch != "-1"){
                              flag = 'true';
                              }
                              });
                       
                       $.each(item.description, function(key, itemDescription) {
                              
                              var descriptionSearch = itemDescription.search( new RegExp(""+searchKeys[searchKeyIndex]+"","gi" ));
                              
                              if(descriptionSearch != "-1"){
                              flag = 'true';
                              }
                              });
                       
                       if(flag == 'true'){
                         //   console.log("THAT -----> " + searchResultItemIds.indexOf(item.itemId) + " " + item.itemId);
                           if(searchResultItemIds.indexOf(item.itemId) == -1)
                           {
                                searchResultArray.push(item);
                                searchResultItemIds.push(item.itemId);
                           }
                       }
                       });
                
            }
        }
        
        
        $.mobile.changePage("#searchResultPage");
        
        var textHtml = '';
        var test = '';
        
        
        var searchDateColor = document.getElementById('sortByDateSearchField').style.color;
        
        if(searchDateColor == 'orange'){
            
            searchResultArray.sort(function(a, b){
                                   var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
                                   return dateA-dateB
                                   });
        }else{
            searchResultArray.sort(function(a, b){
                                   var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)           
                                   return dateB-dateA
                                   });
        }
        
        $.each(searchResultArray, function(key, item) {
               
               test = '';
               test = getListElement(item,-100,"searchList"+(key+1),key);
               textHtml = textHtml + test;
               
               });
        
        if(searchResultArray.length > 5){
            
            textHtml += "<div class='linkTransition' id='loadmoreSearch' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresultSearch(this)'><b>Load More Results</b></div>";
        }
        searchInputFlag = false;
        
    }else {
        
        jAlert('Please enter some valid keywords.', 'Tech Time');
        searchInputFlag = false;
    }
        
    if(searchResultArray.length){
        $('#searchResultDiv').html(textHtml);
    }else{
        $('#nosearchResultDiv').html("<br><br><br><label style='margin-left:14px;'>No items found for the search criteria.</label>");
    }
    
}


function showmoreresultSearch(variable){
    
    var titleCount = parseInt(variable.title) + 5;
    document.getElementById('loadmoreSearch').title = titleCount;
    
    if(searchResultArray.length){
        $.each(searchResultArray, function(key, itemRes) {
               if((key+1) <= titleCount){
               document.getElementById('searchList'+(key+1)).style.display = "block";
               }
               });
    }
    if((searchResultArray.length - titleCount) < 0){
        document.getElementById('loadmoreSearch').style.display = "none";
    }
}


function getListElement(itemRes,count,itemId,itemIndex)
{
    var strHTMLshowTAList = '';
    
    var authoNames = '';
    
    var iconType = '';
    
    var itemType = '';
    
    if(itemRes.type == "Audios"){
        iconType ='images/icon_audio.png';
        itemType = 'Audios';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
    
    if(itemRes.type == "Videos"){
        iconType ='images/icon_video.png';
        itemType = 'Videos';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
        
    }
    if(itemRes.type == "Panel Discussions"){
        iconType = 'images/icon_panelDiscussion.png';
        itemType = 'PanelDiscussions';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
    if(itemRes.type == "Interviews"){
        iconType = 'images/icon_interview.png';
        itemType = 'Interviews';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
    if(itemRes.type == "documents"){
        itemType = 'Documents';
        iconType = 'images/icon_document.png';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
    if(itemRes.type == "Technology Conferences"){
        itemType = 'TechnologyConferences';
        iconType = 'images/icon_techConf.png';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
    
    if(itemRes.type == "Technology Sessions"){
        itemType = 'TechnologySessions';
        iconType = 'images/icon_video.png';
        itemCounter = itemCounter + 1;
        strHTMLshowTAList += renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter);
        
    }
 
    renderItemCount(itemCounter);
    return strHTMLshowTAList;
}

function renderItemCount(itemCounter)
{
   
}

function renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter)
{
    
    window.localStorage.setItem("eventFlag", eventsFlag);
    window.localStorage.setItem("spotLightFlag", spotLightFlag);
    window.localStorage.setItem("mediaFlag",mediaFlag);
    
    var evtFlag = window.localStorage.getItem("eventFlag");
    var sptFlag = window.localStorage.getItem("spotLightFlag");
    var mdFlag = window.localStorage.getItem("mediaFlag");    
    var actualThumb = '';
    
    var contentType ='';
    
    
    
    if(isOnline && itemRes.thumbLocal == '')
    {
        actualThumb = itemRes.thumb;
    }
    else if(isOnline && itemRes.thumbLocal != '')
    {
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    else if(!isOnline && itemRes.thumbLocal == '')
    {
        actualThumb = 'images/TechTime-AppIcon.png';
    }
    else if(!isOnline && itemRes.thumbLocal != '')
    {
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    else
    {
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    
    var authoNames = '';
    $.each(itemRes.author, function(key, itemAuthor) {
           if(key == 0){
           authoNames = authoNames + itemAuthor;
           }else if(key <= (itemRes.author.length-1)){
           authoNames = authoNames + ', ' + itemAuthor;
           }else{
           authoNames = authoNames + ' ' + itemAuthor;
           }
           });
    
    var listItemHTML ='';
    
    if(totalItemCount == 1)
    {
        $('#numberOfItems').html("("+totalItemCount+" Item)");
    } else if(totalItemCount > 1){
        $('#numberOfItems').html("("+totalItemCount+" Items)");
    } else if(totalItemCount == 0)
    {
        
        $('#numberOfItems').html("(No Items)");
    }
    
    
    if(itemIndex < 5){
        
        listItemHTML += "<div class='listItemClick'><a id="+itemId+" href='#detailMediaPage' data-transition='none' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
    
    }else{
        
        listItemHTML += "<div class='listItemClick'><a id="+itemId+" href='#detailMediaPage' data-transition='none' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
    }
    
    listItemHTML += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
    listItemHTML += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
    listItemHTML += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
    listItemHTML += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
    listItemHTML += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
    
    if(iconType == 'images/icon_video.png')
    {
        listItemHTML += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:25px;'/>";
    } else
    {
        listItemHTML += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
    }
    
    listItemHTML += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
    listItemHTML += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
    listItemHTML += showDownloadedIcons(itemRes)+ "</td>";
    
    listItemHTML += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><img src='images/orange_icon_right1.png' width='20px' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a></div>";
    
    return listItemHTML;
}


function showDownloadedIcons(itemRes)
{
    var aURL = itemRes.audioUrl;
    var vURL = itemRes.videoUrl;
    var pURL = itemRes.presentationUrl;
    var tURL = itemRes.transcriptUrl;
    
    var itemId = itemRes.itemId;
    var itemType = '';
   
    if(itemRes.type == 'Panel Discussions')
    {
        itemType = 'P';
    } else if(itemRes.type == 'Interviews')
    {
        itemType = 'I';
    } else if(itemRes.type == 'Technology Conferences')
    {
        itemType = 'T';
    } else if(itemRes.type == 'Audios')
    {
        itemType = 'A';
    } else if(itemRes.type == 'Videos')
    {
        itemType = 'V';
    } else if(itemRes.type == 'Technology Sessions')
    {
        itemType = 'V';
    } else if(itemRes.type == 'Documents')
    {
        itemType = 'D';
    }
    
    
    var appendIconsHTML = '';
    
    if(entries.indexOf(itemType + 'A' + itemId) != -1 && aURL != "")
    {
        appendIconsHTML += "<img src='images/icon_audio.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(entries.indexOf(itemType + 'V' + itemId) != -1 && vURL != "")
    {
        appendIconsHTML += "<img src='images/icon_video.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(entries.indexOf(itemType + 'P' + itemId) != -1 && pURL != "")
    {
        appendIconsHTML += "<img src='images/icon_presentation.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(entries.indexOf(itemType + 'T' + itemId) != -1 && tURL != "")
    {
        appendIconsHTML += "<img src='images/icon_transcript.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(entries.indexOf(itemType + 'D' + itemId) != -1)
    {
        appendIconsHTML += "<img src='images/icon_document.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    return appendIconsHTML;
    
}




function showAudioStreaming(cId)
{
    if(isAudioStreaming == 'false')
    {
        document.getElementById('audioPlayer').play();
        
        isAudioStreaming = 'true';
    } else if(isAudioStreaming == 'true')
    {
        document.getElementById('audioPlayer').pause();
        
        isAudioStreaming = 'false';
    }
    
}


function clearDetailPage()
{
    
    
    $('#detailPageArea').html('');
    $('#prevNextContentArea').html('');
    
}


var nextItemIndex = '';
var previousItemIndex = '';
var currentItemIndex = '';
var currentItemId = '';

function showTechWatchContent(itemId, itemIndex)
{   
    var publicationsLength = jsonData.techWatchMultiple.length;
    
    $('#detailPageArea').html('');
    
    if(!isOnline && itemId == '' && itemIndex == '')
    {
        
        $.each(jsonData.techWatchMultiple, function(index, itemMain){
               if(itemMain.techWatchPublicationType == 'current')
               {
               
               currentTechWatchItemId = itemMain.techWatchPublicationId;
               currentTechWatchItemIndex = index;
               
               window.localStorage.setItem("currentTechWatchItemId", currentTechWatchItemId);
               window.localStorage.setItem("currentTechWatchItemIndex", currentTechWatchItemIndex);
               
               itemId = currentTechWatchItemId;
               itemIndex = currentTechWatchItemIndex;
               }
               });
        
    }
    
    
    nextItemIndex = parseInt(itemIndex) + 1;
    previousItemIndex = parseInt(itemIndex) - 1;
    currentItemIndex = parseInt(itemIndex);
    currentItemId = parseInt(itemId);
    
    window.localStorage.setItem("currentItemId",currentItemId);
    window.localStorage.setItem("currentItemIndex",currentItemIndex);
    
    
    var headerHtml = '';
    
    if(deviceName == "iPhone4" || deviceName == "iPhone5" || deviceName == "iPhone4s" || deviceName == "iPhone4" || deviceName == "iPhone" || deviceName == "iPhone3")
    {
        
        headerHtml += "<div style='display:inline-block;width:43%;' ><br/><label style='font-size:24px;padding-left:8px;font-family:AgfaRotisSans;font-weight:bolder;'>Tech Watch</label></div>";
        headerHtml += "<div align='right' style='display:inline-block;width:55%;'>";
        headerHtml += "<img class='prevNextButton' id='previousTechWatchButton' width='65px' src='images/btn_prevCropped.png' onclick='showPreviousNextTw(\"previous\",\""+previousItemIndex+"\");'></img>";
        headerHtml += "<img class='prevNextButton' id='nextTechWatchButton' width='65px' style='padding-bottom:2px;margin-left:3%' src='images/btn_nextCropped.png' onclick='showPreviousNextTw(\"next\",\""+nextItemIndex+"\");'></img>";
        headerHtml += "</div>";
    } else {
        headerHtml += "<div style='display:inline-block;width:38%;' ><br/><label style='font-size: 24px; padding-left: 15px;font-family:AgfaRotisSans;font-weight:bolder;'>Tech Watch</label></div>";
        headerHtml += "<div align='right' style='display:inline-block;width:60%;'>";
        headerHtml += "<img class='prevNextButton' id='previousTechWatchButton' width='100' src='images/btn_previous.svg' onclick='showPreviousNextTw(\"previous\",\""+previousItemIndex+"\");'></img>";
        headerHtml += "<img class='prevNextButton' id='nextTechWatchButton' style='margin-left:3%' width='62' src='images/btn_next.svg' onclick='showPreviousNextTw(\"next\",\""+nextItemIndex+"\");'></img>";
        headerHtml += "</div>";
    }
    
    
    
    $('#techWatchHeader').html(headerHtml);
    
    if(nextItemIndex >= publicationsLength)
    {
        $('#nextTechWatchButton').css('visibility','hidden');
    } else if(nextItemIndex < publicationsLength)
    {
        $('#nextTechWatchButton').css('visibility','visible');
    }
    
    if(previousItemIndex < 0)
    {
        $('#previousTechWatchButton').css('visibility','hidden');
    } else if(previousItemIndex >= 0)
    {
        $('#previousTechWatchButton').css('visibility','visible');
    }
    
    
    headerHtml = '';
    
    defaultNavigate();
    $("#navigateTechWatch").hide();
    resetSearchBar(currentSearchKey);
    
    var strTechWatchHtml = '';
    
    $.each(jsonData.techWatchMultiple, function(index, itemMain){
           
           if(index == itemIndex)
           {
           
           $('#techWatchPubDateLabel').text(' ' + itemMain.techWatchPublicationDate);
            var itemArticleIndex = 0;
           $.each(itemMain.techWatchPublicationItems, function(index, item){
                  
                  var itemType = item.itemType;
                  var itemTitle = item.itemTitle;
                  
                  if(itemType == 'normal')
                  {
                  strTechWatchHtml += "<div style='width:100%;'>";
                  strTechWatchHtml += "<div style='width:100%;background:#555555;color:orange;font-weight:bolder;font-size:17px;padding-left:2%;padding-right:2%;padding-top:5px;padding-bottom:4px;'>"+itemTitle+"</div><br/>";
                  $.each(item.itemArticleArray, function(index, itemArticle){
                         var articleUrl = itemArticle.articleUrl;
                         var articleDescription = itemArticle.articleDescription;
                         var articleTitle = itemArticle.articleTitle;
                         
                         itemArticleIndex = itemArticleIndex + 1;
                         
                         strTechWatchHtml += "<div id='articleTitleDiv"+itemArticleIndex+"'><div class='linkeffect' class='articleTitleDiv"+itemArticleIndex+"' style='width:100%;padding-left:2%;padding-right:2%;'><a onclick='readMoreData(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:orange;font-size:16px;'><b>"+articleTitle+"</b></a></div>";
                         //strTechWatchHtml += "";
                         
                         strTechWatchHtml += "<div style='width:98%;padding-left:2%;padding-right:3%;display:inline-block;'>"+articleDescription+"<div align='right' class='linkeffect' style='float:right;text-align:right;width:auto;padding-left:2%;padding-right:2%;display:inline-block;'><a onclick='readMoreData(\""+articleUrl+"\");' href='#' style='text-decoration:none;color:orange;font-size:14px;'><b>Read more</b></a></div></div><br/></div><br/>";
                         
                         
                         });
                  
                  strTechWatchHtml += "</div><br/>";
                  
                  } else if(itemType == 'povs')
                  {
                  
                  strTechWatchHtml += "<hr align='center' width='96%' size=1px><br/><div style='width:98%;background:#FF9900;border-radius:10px;margin:0 auto;'>";
                  strTechWatchHtml += "<div style='width:100%;color:white;font-weight:bold;font-size:17px;padding-left:1.8%;padding-top:10px;'>Interesting POVs</div>";
                  $.each(item.itemArticleArray, function(index, itemArticle){
                         
                         var articleUrl = itemArticle.articleUrl;
                         var articleDescription = itemArticle.articleDescription;
                         var articleTitle = itemArticle.articleTitle;
                         
                         itemArticleIndex = itemArticleIndex + 1;
                         
                         strTechWatchHtml += "<div id='articleTitleDiv"+itemArticleIndex+"'><div class='linkeffect' style='width:100%;color:white;font-weight:bolder;font-size:12px;padding-left:1.8%;padding-right:3%;padding-top:10px;'><a class='articleTitlePoVDiv"+itemArticleIndex+"' style='text-decoration:none;color:white;' onclick='readMoreData(\""+articleUrl+"\");' href='#'>"+articleTitle+"</a></div>";
                         strTechWatchHtml += "<div class='articleTitlePoVDiv"+itemArticleIndex+"' style='width:97%;color:white;font-weight:bolder;font-size:12px;padding-left:1.8%;padding-right:2%;padding-top:10px;'><span style='padding-left:1px;'><i>"+articleDescription+"</i></span><div class='linkeffect' align='right' style='color:white;float:right;display:inline-block;text-align:right;font-weight:bold;font-size:12px;padding-left:1.8%;width:auto;'><a class='articleTitlePoVDiv"+itemArticleIndex+"' style='text-decoration:none;color:white;font-weight:bolder;' onclick='readMoreData(\""+articleUrl+"\");' href='#'>Read More</a></div></div><br/></div>";
                         });
                  
                  strTechWatchHtml += "</div><br/>";
                  
                  } else if(itemType == 'quotes')
                  {
                  
                  
                  strTechWatchHtml += "<hr align='center' width='96%' size=1px><div style='width:100%;'>";
                  strTechWatchHtml += "<div style='width:95%;color:orange;font-weight:bold;font-size:17px;padding-left:2%'>"+itemTitle+"</div><br/>";
                  $.each(item.itemArticleArray, function(index, itemArticle){
                         
                         itemArticleIndex = itemArticleIndex + 1;
                         
                         if(deviceName == "iPhone4" || deviceName == "iPhone5" || deviceName == "iPhone4s" || deviceName == "iPhone4" || deviceName == "iPhone" || deviceName == "iPhone3")
                         {
                         strTechWatchHtml += "<div id='articleTitleDiv"+itemArticleIndex+"' class='articleTitleDiv"+itemArticleIndex+"' style='width:94.5%;background:white;border-radius:10px;margin:0 2px 0 11px;border:1px solid gray;'>";
                         } else {
                         strTechWatchHtml += "<div id='articleTitleDiv"+itemArticleIndex+"' class='articleTitleDiv"+itemArticleIndex+"' style='width:97%;background:white;border-radius:10px;margin:0 2px 0 11px;border:1px solid gray;'>";
                         }
                         strTechWatchHtml += "<div style='font-size:12px;padding-left:1.5%;padding-right:2%;padding-top:8px;'><i>"+itemArticle.articleTitle+"</i></div>";
                         strTechWatchHtml += "<div style='font-weight:bold;font-size:14px;padding-left:1.5%;padding-right:2%;padding-top:8px;'><i>"+itemArticle.articleUrl+"</i></div>";
                         strTechWatchHtml += "<div style='font-size:12px;padding-left:1.5%;padding-top:8px;padding-bottom:5px;'><i>"+itemArticle.articleDescription+"</i></div>";
                         strTechWatchHtml += "</div><br/>";
                         
                         });
                  
                  strTechWatchHtml += "</div>";
                  }
                  
                  
                  });
           }
           });
    
    $('#techWatchContentArea').html(strTechWatchHtml);
   
}



function showInProgress()
{
   
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, errorFileSystem);
    gotFS(fileSystem);
 
    generateUserDownloadsJson();
    
    $('#detailPageArea').html('');
    
    
    $('label[id="completedDownloads"]').css({"color":"orange",
                                            "font-weight":"normal"
                                            })
    $('label[id="inProgressDownloads"]').css({"color":"black",
                                             "font-weight":"bolder"
                                             });
    
    document.getElementById('showProgressBar').style.display = 'block';
    document.getElementById('allDownloads').style.display = 'none';
    
    
    
}
function switchDownloadsDiv(type)
{
   // gotFS(fileSystem);
   // startSync();
    if(type == "inProgress")
    {
        //gotFS(fileSystem);
        $('label[id="completedDownloads"]').css({"color":"orange",
                                                "font-weight":"normal"
                                                })
        $('label[id="inProgressDownloads"]').css({"color":"black",
                                                 "font-weight":"bolder"
                                                 });
        
        $('div[id="showProgressBar"]').show();
        $('div[id="allDownloads"]').hide();
        
    } else if(type == "allDownloads")
    {
       // gotFS(fileSystem);
        $('label[id="completedDownloads"]').css({"color":"black",
                                                "font-weight":"bolder"
                                                });
        $('label[id="inProgressDownloads"]').css({"color":"orange",
                                                 "font-weight":"normal"
                                                 })
        $('div[id="allDownloads"]').show();
        $('div[id="showProgressBar"]').hide();
    }
}



function pageFlagSet(currentPage)
{
     
     
  
    
    if(currentPage == "businessCategory")
    {
        searchFromMainPage = true;
    } else if(currentPage == "searchResultPage"){
        searchInputFlag = true;
    } else if(currentPage == "TAListResult"){
        searchFromTAListResultPage = true;
    } else if(currentPage == "UpcomingEventsPage"){
        searchFromUpcomingEventsPage = true;
    } else if(currentPage == "subscribePage"){
        searchFroSubscribPage = true;
    } else if(currentPage == "aboutTechTimePage"){
        searchFromAboutPage = true;
    } else if(currentPage == "contactUsPage"){
        searchFromContactUsPage = true;
    } else if(currentPage == "DownloadsPage"){
        searchFromDownloadsPage = true;
    } else if(currentPage == "faqPage"){
        searchFromFaqPage = true;
    } else if(currentPage == "detailMediaPage"){
        searchFromMediaPage = true;
    } else if(currentPage == "detailAuthor"){
        searchFromAuthorDetailPage = true;
    } else if(currentPage == "techwatchPage"){
        searchFromTechWatch = true;
        searchFromtechWatchPage = true;
    } else if(currentPage == "playlistsPage")
    {
        searchFromPlaylistsPage = true;
    } else if(currentPage == "playlistItemsPage")
    {
        searchFromPlaylistItemsPage = true;
    } else if(currentPage == "sharePlaylistsPage")
    {
        searchFromSharePlaylistsPage = true;
    } else if(currentPage == "addToPlaylistPage")
    {
        searchFromAddToPlaylistPage = true;
    } else if(currentPage == "contributePage")
    {
        searchFromContributePage = true;
    } else if(currentPage == "digitalAreaHomePage")
    {
        searchFromDigitalPage = true;
    }
    
}


function contactUsReset()
{
    $('#commentTextArea').html('');
    $('#commentTextArea').val('Enter Your Comments Here');
}
