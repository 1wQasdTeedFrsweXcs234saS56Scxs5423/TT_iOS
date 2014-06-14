

var currD = new Date();
var currM = 0;
var currY = 0;

var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var resUpcomingEvents = new Array();
var searchResultArray = new Array();

var isAudioStreaming = 'false';

var audioURL = '';


 var itemCounter = 0;
 
//--------------------------------------------- Display Upcomig Events DATA   ------------------------------------------------------------------------------------------

function showUpcomingEventList(viewMonth,viewCount)
{
//    console.log('viewCount :'+viewCount);
    
    var tempEvemnts = new Array();
    var strHTMLshowTAList = '';
        resUpcomingEvents = [];
    
    $('#UpcomingEventsContentArea').html('');
    $('#noUpcomingEventsContentArea').html('');
    
    $.each(jsonData.events, function(key, item) {                                                   
           //console.log('Unsorted Array : '+item.publishedDate);
           tempEvemnts.push(item);
    });

    tempEvemnts.sort(function(a, b){
       var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)                         //sort by date ascending
        return dateA-dateB 
    });
        
    $.each(tempEvemnts, function(key, item) {
           
           var s = new Date(item.publishedDate);
               s = s.getMonth();                                                                    
           //console.log('SORTED Array : '+item.publishedDate + '   ->   '+s);
    });
    
    if(viewMonth == 'curr'){
        
        currD = new Date();
        currM =  currD.getMonth();
        currY = currD.getFullYear();
        
//        console.log('Curr :'+currM);
        
        document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthArr[currM] + " " +currY;
        
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
        
        $.each(tempEvemnts, function(key, item) {
               
               var s = new Date(item.publishedDate);
               var c = s.getFullYear();
                   s = s.getMonth();
                              
               if(currM == s && currY == c){
               resUpcomingEvents.push(item);
               }
               
       });
        
    }else{
        
        currM =  currD.getMonth();
        currD.setMonth(currM+1);
        
        currM =  currD.getMonth();
        currY = currD.getFullYear();
        
//        console.log('Curr :'+currM);
        
        document.getElementById("UpcomingEventsCurrMonth").innerHTML = "Events - " + monthArr[currM] + " "+currY; 
        
        $.each(tempEvemnts, function(key, item) {
               
               var s = new Date(item.publishedDate);
               var c = s.getFullYear();
                   s = s.getMonth();
               
               if(currM == s && currY == c){
               resUpcomingEvents.push(item);
               }
               
       });
        
    } 
    
    
    if(resUpcomingEvents.length){
    
        $.each(resUpcomingEvents, function(key, itemRes) {
               
            var s = new Date(itemRes.publishedDate);
                s = s.getMonth();
               
               var actualThumb = '';
                   actualThumb = '';
               
//               if(itemRes.thumbLocal != ''){
//                   actualThumb = "file://"+itemRes.thumbLocal;
//               }else if(!isOnline){
//                    actualThumb = 'images/TechTime-AppIcon.png';
//                    actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//               }else{
//                   actualThumb = itemRes.thumb;
//               }
//               
//               if(actualThumb == '')
//               {
//               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//
//               
//               }
   
               
               if(isOnline && itemRes.thumbLocal == '')
               {
               //online and not downloaded
               actualThumb = itemRes.thumb;
               console.log("//online and not downloaded");
               }
               else if(isOnline && itemRes.thumbLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
               }
               else if(!isOnline && itemRes.thumbLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualThumb = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemRes.thumbLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
               }
               else
               {
               //defaul
               console.log("default");
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
               
              
               
               if(key < 5){
                    
                    strHTMLshowTAList += "<a id='"+tempId+"' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"+itemRes.itemId+"') style='text-decoration:none;font-style:normal;color:black;display:block'>";
               }else{
               
                    strHTMLshowTAList += "<a id='"+tempId+"' href='#detailMediaPage' data-transition='slide' onclick=UpcomingEventsDetail('"+itemRes.itemId+"') style='text-decoration:none;font-style:normal;color:black;display:none'>";
               }
               
               strHTMLshowTAList +=  "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
               strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
               
               
                if(itemRes.authorCount == 1){
                       strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
                }else if(itemRes.authorCount == 2){
                    strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
                }else{
                   strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
                }
               
               strHTMLshowTAList += "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
               strHTMLshowTAList += "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
               strHTMLshowTAList += "<img src='images/icon_event.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
               strHTMLshowTAList += "</td></tr><tr><td id='' style='font-size:14;font-weight:100;margin:0px; padding:0px;width:65%;color: orange;font-style:normal;font-size:14px;padding-left:10px;'>"+authoNames+"</td></tr>";
               strHTMLshowTAList += "<tr><td id='' style='font-weight:100;margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-weight:100;font-size:16px;'>"+itemRes.publishedDate+"</td>";
               strHTMLshowTAList += "<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
               
               
               //console.log('key :'+key+'    tempId:'+tempId+ '   title :'+itemRes.title);
               
        });
        
                if(resUpcomingEvents.length > 5){
                    
                    strHTMLshowTAList += "<div id='loadmoreUpcoming' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresult(this)'><b>Load More Results</b></div>";
                }
        
        $('#UpcomingEventsContentArea').html('');
        $('#UpcomingEventsContentArea').html(strHTMLshowTAList);
        
        }else{
        
            strHTMLshowTAList = "<label style='background:none;margin-left:14px;'>There are no events scheduled in this month.<label>";
            $('#noUpcomingEventsContentArea').html(strHTMLshowTAList);
            
        }
    
   showNavigateDiv("navigateDiv");
    
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







function UpcomingEventsDetail(itemId)
{   
    var strHTMLDetail = '';
        strHTMLDetail = '';
    
    var strHTML = '';
        strHTML = '';
    
    var prev ='false';
    var next ='false';
    var index = 'false'
    
//    console.log('1111');
    
    if(resUpcomingEvents.length == '1'){
        prev = next = 'false';
    }
    
//    console.log('2222');
    
    $.each(resUpcomingEvents, function(key, eventItem) {
           
//           console.log('***');
           
        if(eventItem.itemId == itemId){
          
           
           var actualLocal = '';
               actualLocal = '';
           
           if(eventItem.actualLocal != ''){
               actualLocal = "file://"+eventItem.actualLocal;
           
           }else{
               actualLocal = eventItem.thumb;
           }
           
//           console.log('matched');
           
           index = key;         
           
           
//           console.log('Length array '+resUpcomingEvents.length+'\nKey -->'+(key+1)+'\n Id matched :'+itemId+'\n Title :'+eventItem.title);
           
          
           
          
           
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
           
           
           strHTMLDetail += "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_event.svg' style='height:20px; width:20px; border:none;margin:5px; '/>";
           strHTMLDetail += "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+eventItem.title+"</label><br>";
           
           $.each(eventItem.author, function(key, tempAuthor) {
                  
                strHTMLDetail += "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                strHTMLDetail += "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";    
                  
            });
           
           var tempDate = '';
           if(eventItem.sstart_date == eventItem.send_date){
                   tempDate = eventItem.startDate;
           }else{
                   tempDate = eventItem.startDate + ' - ' +eventItem.send_date;
           }
           strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+tempDate+"</label><br>";
           
//           strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"+eventItem.startDate+"</label><br>";
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
    });                                                             //  alert('prev :'+prev+' curr :'+index+'  next  :'+next);
    
    strHTML += "<div style='background-color: white; width: 100%; height: 30px'>";
    strHTML += "<table style='width: 100%;'><tr>";
    strHTML += "<td id='prevBtn' style='padding-left:3%; padding-top:7px; vertical-align:middle; width:50%' align='left'>";
    
    if(prev != 'false'){
        strHTML += "<div onclick=UpcomingEventsDetail('"+prev+"') style='border:none;height:100%; width:30%'><img src='images/btn_previous.png' style='height: 20%'/></div>";
    }
    //style='width:90%; height:25%'
    
    strHTML += "</td><td id='nextBtn' style='padding-right:3%; padding-top:7px; vertical-align:middle;width:40%' align='right'>";
    
    if(next != 'false'){
        strHTML += "<div onclick=UpcomingEventsDetail('"+next+"') style='border:none;height:100%; width:30%;padding-right:15%;'><img src='images/btn_next.png' style='height: 20%;'/></div>";
    }
    
    strHTML += "</td></tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
    
    $('#detailPageArea').html(strHTMLDetail);
    $('#prevNextContentArea').html(strHTML);
    
   
 
}

//--------------------------------------------- Display spotResult DATA   ------------------------------------------------------------------------------------------


function showSpotData()
{

    $('#detailPageArea').html('');
    document.getElementById('spotItemContent').style.display = "block";
    $.mobile.changePage("#detailMediaPage");
}




function showSpotLightContent()
{

    var strHTMLshowTAList = "";
    $('#spotlightContentArea').empty('');
    
    if(jsonData.spotLight.length == 0){
    
        document.getElementById('spotlightListNoSubscribe').style.display = 'block';
        document.getElementById('spotlightList').style.display = 'none';
    
    }else{
        
        document.getElementById('spotlightListNoSubscribe').style.display = 'none';
        document.getElementById('spotlightList').style.display = 'block';
        
        
        $.each(jsonData.spotLight, function(index, itemRes) {           //alert('-->'+JSON.stringify(itemRes.itemId)+'---'+JSON.stringify(itemRes.type));
               
               var count = '-100';
               var imgsrc = '';
               
               var actualThumb = '';
                   actualThumb = '';
               
//               if(itemRes.thumbLocal != ''){
//                   actualThumb = itemRes.thumbLocal;
//               }else{
//                   actualThumb = itemRes.thumb;
//               }
               
               if(itemRes.thumbLocal != ''){
                    actualThumb = "file://"+itemRes.thumbLocal;
               }else if(!isOnline){
                    actualThumb = 'images/TechTime-AppIcon.png';
               actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";

               }else{
                    actualThumb = itemRes.thumb;
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
               
               
               
               if(itemRes.type == 'Audios'){
                    imgsrc = 'images/icon_audio.svg';
               }
               if(itemRes.type == 'Videos'){
                    imgsrc = 'images/icon_video.svg';
               }
               if(itemRes.type == 'contributor'){
                    imgsrc = 'images/icon_interview.png';
               }
               if(itemRes.type == 'Panel Discussions' || type == 'PanelDiscussions'){
                    imgsrc = 'icon_panelDiscussion.png';
               }
               if(itemRes.type == 'Interviews'){
                    imgsrc = 'images/icon_interview.png';
               }
               if(itemRes.type == 'documents'){
                    imgsrc = 'images/icon_document.svg';
               }
               if(itemRes.type == 'events'){
                    imgsrc = 'images/icon_event.svg';
               }
               
//               alert(itemRes.publishedDate);
//               alert(itemRes.title);
//                alert(authoNames);
               
               
               
               strHTMLshowTAList = strHTMLshowTAList +"<a href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemRes.type+"',"+count+") style='text-decoration:none;font-style:normal;color:black;'>";
               strHTMLshowTAList = strHTMLshowTAList + "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
              
               if(itemRes.author.length >=2)
               {
                    strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:150px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
               
               } else if(itemRes.author.length <2)
               {
                    strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
               }
               
               
               strHTMLshowTAList = strHTMLshowTAList + "<td style='margin:0px; padding:0px; width:65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
               strHTMLshowTAList = strHTMLshowTAList + "<td style='margin:0px; padding:0px; width:10%;' rowspan='2' align='right'>";
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+imgsrc+"' style='height:20px;width:33%;border:none;padding:0px;margin-right:10px'/>";
               
               strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color:orange;font-size:14px;padding-left:10px;font-style:normal;'>"+authoNames+"</td></tr>";
               
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td style='margin:0px;padding:0px;width:65%;font-size:14px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+"</td>";
               strHTMLshowTAList = strHTMLshowTAList + "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
               
               
//               console.log("----------------======================-------------------------");
               
//                console.log(strHTMLshowTAList);
        });
        
        document.getElementById('spotlightListNoSubscribe').style.display = 'none';
        $('#spotlightList').html(strHTMLshowTAList);
        
    }
    
    //document.getElementById('spotlightListNoSubscribe').style.display = 'block';

}




//---------------------------------------------------------------------------------------------------------------------------------------

function getList() 
{   
	var strHTMLCategory = "";
    $('#TAcontentArea').empty('');
    
    document.getElementById('noSubscribeDiv').style.display = "none";
    
    if(noSubscribe == "true"){
        
            $.each(jsonData.category, function(key, item) {
                   
                   if(item.subscribe == "yes"){
                   
                       strHTMLCategory = strHTMLCategory + "<div class=dynamicDivList><li><a id="+ item.categoryname+" class='anchorCategory' data-transition='slide' href='#TAListResult' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+")'>";
                       strHTMLCategory = strHTMLCategory+ "<div style='color:white;'> "+item.categoryname+"<img src='images/icon_whiteRight.png' style='float:right;height:20px; width:20px;padding-right:12px;' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+")'/>";
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
    
    itemCounter = 0;
    
    //showSortedTAListing(currentCategoryId,currentCategory,'false','false','false');
    
    document.getElementById('type').innerHTML = 'All';
    document.getElementById('topic').innerHTML = 'Topic';
    //document.getElementById('sortByDate').style.color = 'black';
    
    showNavigateDiv("navigateDiv");
    
    showSortedTAListing(currentCategoryId,currentCategory,'false','false','false');
    
    
}


function gotFileEntry(fileEntry) {
    fileEntry.file(gotFile, fail);
}

function gotFile(file){
    var d1 = new Date();
    isActualExist = 'true';
    console.log('exist :'+isActualExist+'--->'+(ddd.getTime() - d1.getTime())/1000);
}
function fail(evt) {
    var d1 = new Date();
    isActualExist = 'false';
    console.log('does not exist :'+isActualExist+'--->'+(ddd.getTime() - d1.getTime())/1000);
    console.log(evt.target.error.code);
}
    
var ddd = new Date();


var isActualExist ='';


var currElementId = '';
var currElementtype = '';
var currElementcountNum = '';
function nullHandler(catstr)
{
    
    var str = catstr;
   
    return str;
}
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    //alert("httP"+http.status);
    return http.status;
}

function detailPageView(elementId,type,countNum, itemCount)
{
    
  //  alert("-----> " + elementId + " -----> " + type + " ------> " +countNum);
    
    currElementId = elementId;
    currElementtype = type;
    currElementcountNum = countNum;
    
    
    var strHTMLDetail = '';
    var strHTML = '';
    
    showNavigateDiv("navigateDiv");
    
    
   // alert("DETAIL PAGE FUNCTION TYPE -----> " + type);
    //========================================================================================================================================================
    
    
    if(type == 'Audios'){
        
        $.each(jsonData.audio, function(key, itemAudio) {
               
               var tempAudio = itemAudio;
               
               //alert("TEMP AUDIO -------> " + JSON.stringify(tempAudio));
               if(itemAudio.itemId == elementId){
               
               var cId= itemAudio.itemId;
               var aURL = itemAudio.audioUrl;
               var vURL = itemAudio.videoUrl;
               var pURL = itemAudio.presentationUrl;
               var tURL = itemAudio.transcriptUrl;
               
               var titleE = JSON.stringify(itemAudio.title);
               var author = itemAudio.author;
               var date = itemAudio.publishedDate;
               var downloadFlag = itemAudio.isDownloadedAudio;
               
               
               
               var actualLocal = '';
               isActualExist = '';
               
               //               ddd = new Date();
               //               console.log('isActualExist 1--->'+isActualExist +'--->'+ddd.getTime()/1000);
               //
               //               var filefullpath = window.appRootDir.fullPath + "/images/"+itemAudio.itemId+"thumb.png";
               //                   fileSystem.root.getFile(filefullpath, null, gotFileEntry, fail);
               //
               //               console.log('--->'+itemAudio.thumbLocal);
               //
               //               if(isActualExist == 'true'){
               //                   actualLocal = itemAudio.actualLocal;
               //                  var d1 = new Date();
               //                   console.log('isActualExist 2--->'+isActualExist+'--->'+(ddd.getTime() - d1.getTime())/1000);
               //               }else if(!isOnline){
               //                   actualLocal = 'images/TechTime-AppIcon.png';
               //               }else{
               //                   actualLocal = itemAudio.actual;
               //               }
               
               
//               if(itemAudio.actualLocal != ''){
//               actualLocal = "file://"+itemAudio.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemAudio.itemId+"actual.png";
//               }else{
//               actualLocal = itemAudio.actual;
//               }
//               
//               if(actualLocal == '')
//               {
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemAudio.itemId+"thumb.png";
//               }
               
               if(isOnline && itemAudio.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = itemAudio.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && itemAudio.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemAudio.itemId+"actual.png";
               }
               else if(!isOnline && itemAudio.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemAudio.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemAudio.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemAudio.itemId+"actual.png";
               }

               
               
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               
               if(vURL != ""){
               
               if(itemAudio.isDownloadedVideo == "true"){
             
               
               strHTMLDetail = strHTMLDetail + "<img id='AV"+cId+"' title='"+itemAudio.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemAudio.isDownloadedVideo+","+titleE+",2)' src='"+actualLocal+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
               
               }else{
                
               
               strHTMLDetail = strHTMLDetail + "<video id='videoStream' style='border:none; width:150px; height:100px; margin:20px 20px;' poster='"+actualLocal+"' controls><source src='"+vURL+"' type='video/mp4'>Your browser does not support the video tag.</video>";
               
               }
               }else if(vURL == "" && aURL != "")
               {
            
               strHTMLDetail = strHTMLDetail + "<div id='audioStreamer'><img id='IV"+cId+"' title='"+vURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/></div>";
               
               strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='width:150px; height:20px;margin:0px 20px 0px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
               
               }
               
               
               
               strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%;vertical-align: top'><br>";
               
              // getElementsById("audioPlayer").style.display = 'none';
               
               
               if(aURL != ""){
               
               //alert('itemAudio.isDownloadedAudio :'+itemAudio.isDownloadedAudio+' localpath :'+itemAudio.localPathAudio);
               
               if(itemAudio.isDownloadedAudio == "true"){
               
               strHTMLDetail = strHTMLDetail + "<div id='AA"+cId+"' title='"+itemAudio.localPathAudio+"' onclick='downloadFileAudioMain(this,"+itemAudio.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='AA"+cId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+itemAudio.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img <div id='AA"+cId+"1' src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               //               strHTMLDetail = strHTMLDetail + "<div id='AA"+cId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+itemAudio.isDownloadedAudio+")' style='border:none;width:33%;height:40px;z-index:100;'><embed src='images/btn_downloadAudio.svg' type='image/svg+xml' height='100%' width='100%' style='margin-top:0px;margin-right:0px;'></div><br>";
               //
               }
               }
               
               if(pURL != ""){
               
               if(itemAudio.isDownloadedPresentation == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='AP"+cId+"' title= '"+itemAudio.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,"+itemAudio.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='AP"+cId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,"+itemAudio.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;height:40px;z-index:100;'><img src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(tURL != ""){
               
               if(itemAudio.isDownloadedTranscript == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='AT"+cId+"' title= '"+itemAudio.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,"+itemAudio.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='AT"+cId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,"+itemAudio.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               
               if(vURL != ""){
               
               if(itemAudio.isDownloadedVideo == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='AV"+cId+"' title= '"+itemAudio.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemAudio.isDownloadedVideo+","+titleE+",2)'  style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='AV"+cId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,"+itemAudio.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               
               
               
               
   if(itemAudio.qna != ""){

               strHTMLDetail = strHTMLDetail + "<a data-transition='slide' style='text-decoration:none;font-style:normal;' href='#qnaPage'>";

               strHTMLDetail = strHTMLDetail + "<div id='"+itemAudio.title+"' title='"+itemAudio.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";

    }
               
               
               
               
               
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='images/icon_audio.svg' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemAudio.title+"</label><br>";
               
               $.each(itemAudio.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               
               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemAudio.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemAudio.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='width: 100%; height: 20px;background-color:white;border:none'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
             //  if(itemCount > 1)
               {
        strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
        strHTML = strHTML + "<td id='nextBtn'  style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'>";
               
               }
               });
        
    }
    
    
    //========================================================================================================================================================
    
    
    if(type == 'Videos'){
        
        $.each(jsonData.video, function(key, itemVideo) {
               
               if(itemVideo.itemId == elementId){
               
               // alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n VDO ---->>>'+JSON.stringify(itemVideo));
               
               var cId= itemVideo.itemId;
               
               var aURL = itemVideo.audioUrl;
               var vURL = itemVideo.videoUrl;
               var pURL = itemVideo.presentationUrl;
               var tURL = itemVideo.transcriptUrl;
               
               var titleE = JSON.stringify(itemVideo.title);
               
               
               
               //               console.log("cId-----------------------"+cId);
               //               console.log("aURL-----------------------"+aURL);
               //               console.log("vURL-------------------------"+vURL);
               //               console.log("pURL------------------------"+pURL);
               //               console.log("tURL-------------------------"+tURL);
               
               var actualLocal = '';
               
               //               if(itemVideo.actualLocal != ''){
               //                   actualLocal = itemVideo.actualLocal;
               //               }else{
               //                   actualLocal = itemVideo.actual;
               //               }
               
//               if(itemVideo.actualLocal != ''){
//               actualLocal = "file://"+itemVideo.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemVideo.itemId+"actual.png";
//
//               }else{
//               actualLocal = itemVideo.actual;
//               }
//               
//               if(actualLocal == '')
//               {
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemVideo.itemId+"actual.png";
//               }

               
               if(isOnline && itemVideo.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = itemVideo.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && itemVideo.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemVideo.itemId+"actual.png";
               }
               else if(!isOnline && itemVideo.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemVideo.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemVideo.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemVideo.itemId+"actual.png";
               }

               
               
               //               alert('11111 itemVideo.isDownloadedVideo -->>'+itemVideo.isDownloadedVideo);
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               if(vURL != ""){
               
               if(itemVideo.isDownloadedVideo == "true"){
            
               
               strHTMLDetail = strHTMLDetail + "<img id='VV"+cId+"' title='"+itemVideo.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemVideo.isDownloadedVideo+","+titleE+",2)' src='"+actualLocal+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
               
               }else{
                
               
               //               <video width="320" height="240" poster="/images/w3html5.gif" controls>
               //               <source src="movie.mp4" type="video/mp4">
               //               Your browser does not support the video tag.
               //               </video>
               
               
               strHTMLDetail = strHTMLDetail + "<video id='videoStream' style='border:none; width:150px; height:100px; margin:20px 20px;' poster='"+actualLocal+"' controls><source src='"+vURL+"' type='video/mp4'>Your browser does not support the video tag.</video>";
               
               
               //               strHTMLDetail = strHTMLDetail + "<img id='VV"+cId+"' title='"+vURL+"' onclick='video(this)' src='"+actualLocal+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
               
               }
               }else if(vURL == "" && aURL != "")
               {
               
               strHTMLDetail = strHTMLDetail + "<img id='IV"+cId+"' title='"+vURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/>";
               
               strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='border:none; width:150px; height:100px; margin:20px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
               
               }
               
               //               if(vURL != ""){
               //
               //               var chklink="http://uscap.posterview.com/Help/files/iPostersVideoHD.mp4";
               //
               //               var chklink2 = "http://www.maninblack.org/demos/WhereDoAllTheJunkiesComeFrom.mp3";
               //
               //               strHTMLDetail = strHTMLDetail + "<video width='150px'  height='150px' controls autoplay autobuffer>";
               //                strHTMLDetail = strHTMLDetail + "<source src='"+chklink+"' type='video/mp4'> </source>";
               //                strHTMLDetail = strHTMLDetail + "Your browser does not support the video tag </video>";
               //
               //               strHTMLDetail = strHTMLDetail + "<audio width='150px'  height='50px' controls autoplay autobuffer>";
               //               strHTMLDetail = strHTMLDetail + "<source src='"+chklink2+"' type='audio/mp3'> </source>";
               //               strHTMLDetail = strHTMLDetail + "Your browser does not support the video tag </audio>";
               //
               //
               //
               //               }
               strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%;vertical-align: top'><br>";
               
               
               if(aURL != ""){
               
               
               
               if(itemVideo.isDownloadedAudio == "true"){
               
               strHTMLDetail = strHTMLDetail + "<div id='VA"+cId+"' title='"+itemVideo.localPathAudio+"' onclick='downloadFileAudioMain(this,"+itemVideo.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='VA"+cId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+itemVideo.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               if(pURL != ""){
               //alert("OK -------> " + itemVideo.isDownloadedPresentation);
               if(itemVideo.isDownloadedPresentation == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='VP"+cId+"' title= '"+itemVideo.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='VP"+cId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(tURL != ""){
               
               if(itemVideo.isDownloadedTranscript == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='VT"+cId+"' title= '"+itemVideo.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='VT"+cId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(vURL != ""){
               
               if(itemVideo.isDownloadedVideo == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='VV"+cId+"' title= '"+itemVideo.localPathVideo+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='VV"+cId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,"+itemVideo.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               
                       if(itemVideo.qna != ""){
               
                              strHTMLDetail = strHTMLDetail + "<a data-transition='slide' style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
               
                           strHTMLDetail = strHTMLDetail + "<div id='"+itemVideo.title+"'  title='"+itemVideo.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;height:40px;z-index:100;'><img src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;'/></div></a><br>";
               
                       }
               
               
               
               
               
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='images/icon_video.svg' style='height:20px;width:20px;border:none;padding:0px;margin-right:10px'/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemVideo.title+"</label><br>";
               
               $.each(itemVideo.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               //strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+itemVideo.author+"</label><br>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemVideo.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemVideo.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
               
           //    if(itemCount > 1)
               {
            strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
        strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               
               }
               });
        
    }
    
    //========================================================================================================================================================
    
    
    if(type == 'contributor'){
        
        $.each(jsonData.contributor, function(key, itemContributor) {
               
               if(itemContributor.itemId == elementId){
               
               //alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n VDO ---->>>'+JSON.stringify(itemContributor));
               
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               strHTMLDetail = strHTMLDetail + "<img id='videoImg' src='"+itemContributor.actual+"' style='border:none; height:150px; width:150px; margin:20px 20px;'/><br><br></td>";
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='videoThumb' src='' style='height:25px; width : 25px; border: none; '/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemContributor.title+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:black'>"+itemContributor.contributor+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemContributor.date+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemContributor.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table></div>";
               
               
               }
               
               });
        
        
    }
    
    //========================================================================================================================================================
    
    // alert("------> " + type);
    
    if(type == 'Panel Discussions' || type == 'PanelDiscussions'){
        
        
        $.each(jsonData.panelDiscussions, function(key, itemPanelDiscussions) {
               
               if(itemPanelDiscussions.itemId == elementId){
               
               
               var cId= itemPanelDiscussions.itemId;
               
               var aURL = itemPanelDiscussions.audioUrl;
               var vURL = itemPanelDiscussions.videoUrl;
               var pURL = itemPanelDiscussions.presentationUrl;
               var tURL = itemPanelDiscussions.transcriptUrl;
               
               
               var titleE = JSON.stringify(itemPanelDiscussions.title);
               
               //               console.log("cId-----------------------"+cId);
               //               console.log("aURL-----------------------"+aURL);
               //               console.log("vURL-------------------------"+vURL);
               //               console.log("pURL------------------------"+pURL);
               //               console.log("tURL-------------------------"+tURL);
               
               var actualLocal = '';
               
               //               if(itemPanelDiscussions.actualLocal != ''){
               //                   actualLocal = itemPanelDiscussions.actualLocal;
               //               }else{
               //                   actualLocal = itemPanelDiscussions.actual;
               //               }
               
//               if(itemPanelDiscussions.actualLocal != ''){
//               actualLocal = "file://"+itemPanelDiscussions.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemPanelDiscussions.itemId+"actual.png";
//
//               }else{
//               actualLocal = itemPanelDiscussions.actual;
//               }

               
               if(isOnline && itemPanelDiscussions.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = itemPanelDiscussions.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && itemPanelDiscussions.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemPanelDiscussions.itemId+"actual.png";
               }
               else if(!isOnline && itemPanelDiscussions.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemPanelDiscussions.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemPanelDiscussions.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemPanelDiscussions.itemId+"actual.png";
               }
               
               
               //alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n Panel Discussion ---->>>'+JSON.stringify(itemPanelDiscussions));
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               
               if(vURL != ""){
               
               if(itemPanelDiscussions.isDownloadedVideo == "true"){
               
               strHTMLDetail += "<img id='PV"+cId+"' title='"+itemPanelDiscussions.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedVideo+","+titleE+",2)' src='"+actualLocal+"' style='border:none; height:100px; width:150px; margin:20px 20px;'/><br><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<video id='videoStream' style='border:none; width:150px; height:100px; margin:20px 20px;' poster='"+actualLocal+"' controls><source src='"+vURL+"' type='video/mp4'>Your browser does not support the video tag.</video>";
               
               }
               }else if(vURL == "" && aURL != "")
               {
               
               strHTMLDetail = strHTMLDetail + "<img id='IV"+cId+"' title='"+vURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/>";
               
               strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='border:none; width:150px; height:100px; margin:20px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
               
               }
               
               //               strHTMLDetail = strHTMLDetail + "<img id='videoImg' src='https://techtime.accenture.com/sites/default/files/documents_image/oracle_153x215.png' style='border : solid; height:200px; width:150px; margin:20px 20px;'/><br><br>";
               
               
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               
               
               
               //
               //               alert('11111 item PanelDiscussions.isDownloadedAudio -->>'+itemPanelDiscussions.isDownloadedAudio);
               
               
               if(aURL != ""){
               
               if(itemPanelDiscussions.isDownloadedAudio == "true"){
               
               strHTMLDetail = strHTMLDetail + "<div id='PA"+cId+"' title='"+itemPanelDiscussions.localPathAudio+"' onclick='downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='PA"+cId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               //        if(vURL != ""){
               //
               //            if(itemPanelDiscussions.isDownloadedVideo == "true"){
               //
               //                strHTMLDetail = strHTMLDetail + "<div id='AV"+cId+"' title='"+itemPanelDiscussions.localPathVideo+"' onclick='downloadFileVideoMain(this,"+itemPanelDiscussions.isDownloadedVideo+")' style='border:none;width:33%;height:40px;z-index:100;'><embed src='images/btn_downloadAudio.svg' type='image/svg+xml' height='100%' width='100%' style='margin-top:0px;margin-right:0px;'></div><br>";
               //
               //
               //            }else{
               //
               //                strHTMLDetail = strHTMLDetail + "<div id='AV"+cId+"' title='"+vURL+"' onclick='downloadFileVideoMain(this,"+itemPanelDiscussions.isDownloadedVideo+") style='border:none;width:33%;height:40px;z-index:100;'><embed src='images/btn_downloadAudio.svg' type='image/svg+xml' height='100%' width='100%' style='margin-top:0px;margin-right:0px;'></div><br>";
               //
               //
               //            }
               //        }
               
               if(pURL != ""){
               
               if(itemPanelDiscussions.isDownloadedPresentation == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='PP"+cId+"' title= '"+itemPanelDiscussions.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='PP"+cId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(tURL != ""){
               
               if(itemPanelDiscussions.isDownloadedTranscript == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='PT"+cId+"' title= '"+itemPanelDiscussions.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='PT"+cId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               
               if(vURL != ""){
               
               if(itemPanelDiscussions.isDownloadedVideo == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='PV"+cId+"' title= '"+itemPanelDiscussions.localPathVideo+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='PV"+cId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,"+itemPanelDiscussions.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               
               if(itemPanelDiscussions.qna != ""){
               
               strHTMLDetail = strHTMLDetail + "<a data-transition='slide' style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
               
               strHTMLDetail = strHTMLDetail + "<div id='"+itemPanelDiscussions.title+"' title='"+itemPanelDiscussions.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";
               
               }
               
               
               
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='images/icon_panelDiscussion.png' style='height:20px;width:20px;border:none;padding:0px;margin-right:10px'/>";
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemPanelDiscussions.title+"</label><br>";
               
               $.each(itemPanelDiscussions.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               //strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+itemPanelDiscussions.author+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemPanelDiscussions.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemPanelDiscussions.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";

//               if(itemCount > 1)
               {
            strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
        strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               
               }
               
               });
        
        //========================================================================================================================================================
        
    }
    
    if(type == 'Interviews'){
        
        
        
        //========================================================================================================================================================
        
        
        $.each(jsonData.interviews, function(key, itemInterviews) {
               
               if(itemInterviews.itemId == elementId){
               
               
               
               var cId= itemInterviews.itemId;
               
               var aURL = itemInterviews.audioUrl;
               var vURL = itemInterviews.videoUrl;
               var pURL = itemInterviews.presentationUrl;
               var tURL = itemInterviews.transcriptUrl;
               //
               var titleE = JSON.stringify(itemInterviews.title);
               
               
               //               console.log("cId-----------------------"+cId);
               //               console.log("aURL-----------------------"+aURL);
               //               console.log("vURL-------------------------"+vURL);
               //               console.log("pURL------------------------"+pURL);
               //               console.log("tURL-------------------------"+tURL);
               
               var actualLocal = '';
               
               //               if(itemInterviews.actualLocal != ''){
               //                   actualLocal = itemInterviews.actualLocal;
               //               }else{
               //                   actualLocal = itemInterviews.actual;
               //               }
               
//               if(itemInterviews.actualLocal != ''){
//               actualLocal = "file:\\"+itemInterviews.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemInterviews.itemId+"actual.png";
//
//               }else{
//               actualLocal = itemInterviews.actual;
//               }
 
               
               if(isOnline && itemInterviews.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = itemInterviews.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && itemInterviews.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemInterviews.itemId+"actual.png";
               }
               else if(!isOnline && itemInterviews.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && itemInterviews.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemInterviews.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemInterviews.itemId+"actual.png";
               }
               
               
               
               
               //alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n InterView ---->>>'+JSON.stringify(itemInterviews));
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               if(vURL != ""){
               
               if(itemInterviews.isDownloadedVideo == "true"){
               
               strHTMLDetail = strHTMLDetail + "<img id='IV"+cId+"' title='"+itemInterviews.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemInterviews.isDownloadedVideo+","+titleE+",2)' src='"+actualLocal+"' style='border:none; height:100px; width:150px; margin:20px 20px;'/><br><br>";
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<video id='videoStream' style='border:none; width:150px; height:100px; margin:20px 20px;' poster='"+actualLocal+"' controls><source src='"+vURL+"' type='video/mp4'>Your browser does not support the video tag.</video>";
               
               }
               
               }else if(vURL == "" && aURL != "")
               {
               
               strHTMLDetail = strHTMLDetail + "<img id='IV"+cId+"' title='"+vURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/>";
               
               strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='border:none; width:150px; height:100px; margin:20px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
               
               }
               
               
               
               
               
               
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               
               
               
               if(aURL != ""){
               
               if(itemInterviews.isDownloadedAudio == "true"){
               
               strHTMLDetail = strHTMLDetail + "<div id='IA"+cId+"' title='"+itemInterviews.localPathAudio+"' onclick='downloadFileAudioMain(this,"+itemInterviews.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='IA"+cId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+itemInterviews.isDownloadedAudio+","+titleE+",1)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               
               if(pURL != ""){
               
               
               if(itemInterviews.isDownloadedPresentation == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='IP"+cId+"' title= '"+itemInterviews.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='IP"+cId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedPresentation+","+titleE+",3)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               }
               }
               
               
               
               
               if(tURL != ""){
               
               if(itemInterviews.isDownloadedTranscript == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='IT"+cId+"' title= '"+itemInterviews.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='IT"+cId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedTranscript+","+titleE+",4)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               
               if(vURL != ""){
               
               if(itemInterviews.isDownloadedVideo == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='IV"+cId+"' title= '"+itemInterviews.localPathVideo+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }else{
               
               strHTMLDetail = strHTMLDetail + "<div id='IV"+cId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,"+itemInterviews.isDownloadedVideo+","+titleE+",2)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if(itemInterviews.qna != ""){
               
               strHTMLDetail = strHTMLDetail + "<a data-transition='slide' style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
               
               strHTMLDetail = strHTMLDetail + "<div id='"+itemInterviews.title+"' title='"+itemInterviews.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";
               
               }
               
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='images/icon_interview.png' style='height:20px;width:20px;border:none;padding:0px;margin-right:10px;'/>";
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemInterviews.title+"</label><br>";
               
               $.each(itemInterviews.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               //strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+itemInterviews.author+"</label><br>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemInterviews.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemInterviews.description+"</label>";
               
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
               
          //     if(itemCount > 1)
               {
            strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
        strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               }
               
               });
        
        //========================================================================================================================================================
        
    }
    
    
    if(type == 'documents' || type == 'Documents'){
        
        $.each(jsonData.documents, function(key, documentItem) {
               
               if(documentItem.itemId == elementId){
               
               //               alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n VDO ---->>>'+JSON.stringify(itemContributor));
               
               
               var  cId= documentItem.itemId;
               var dURL = documentItem.pdf;
               var lURL = documentItem.localPath;
               
               var titleE = JSON.stringify(documentItem.title);
               
               
               var actualLocal = '';
               
               //               if(documentItem.actualLocal != ''){
               //                   actualLocal = documentItem.actualLocal;
               //               }else{
               //                   actualLocal = documentItem.actual;
               //               }
               
//               if(documentItem.actualLocal != ''){
//               actualLocal = "file//"+documentItem.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
//
//               
//               }else{
//               actualLocal = documentItem.actual;
//               }
               
               
               if(isOnline && documentItem.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = documentItem.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && documentItem.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }
               else if(!isOnline && documentItem.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && documentItem.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +documentItem.itemId+"actual.png";
               }

               
               
               
               
               //               console.log("cId-----------------------"+cId);
               //               console.log("dURL-----------------------"+dURL);
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='"+actualLocal+"' style='border:none; height:150px; width:100px; margin:20px 20px;'/><br><br></td>";
               
               strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
               
               
               if(documentItem.isDownloaded == 'true'){
               
               strHTMLDetail = strHTMLDetail + "<div id='DD"+cId+"' title= '"+documentItem.localPath+"' onclick= 'downloadFileAudioMain(this,"+documentItem.isDownloaded+","+titleE+",5)' style='width:120px;;height:40px;z-index:100;'><img src='images/btn_viewPDF.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }else{
               
               //alert('isdownloade false');
               strHTMLDetail = strHTMLDetail + "<div id='DD"+cId+"' title= '"+dURL+"' onclick= 'downloadFileAudioMain(this,"+documentItem.isDownloaded+","+titleE+",5)' style='border:none;width:120px;;height:40px;z-index:100;'><img src='images/button_downloadPDF.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_document.svg' style='height:20px; width:20px; border:none;;margin:5px;'/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+documentItem.title+"</label><br>";
               
               $.each(documentItem.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });
               
               
               //strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+documentItem.author+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+documentItem.publishedDate+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+documentItem.description+"</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
              
              // if(itemCount > 1)
               {
            strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
            strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               
               }
               });
        
        
    }
    
    //========================================================================================================================================================
    
    
    if(type == 'events'){
        
        //        alert('inside document file ...'+type);
        
        
        $.each(jsonData.events, function(key, eventItem) {
               
               //                      console.log('-->'+eventItem.itemId+'<-->'+elementId);
               
               
               if(eventItem.itemId == elementId){
               
               console.log('aaaa-->'+eventItem.itemId+'<-aaaa->'+elementId);
               
               //               alert(' ------>>>> :\n'+type+'\n\n :'+elementId+'\n VDO ---->>>');
               
               
               var cId= eventItem.itemId;
               var eURL = eventItem.icsfile;
               
               var actualLocal = '';
               
               //               if(eventItem.actualLocal != ''){
               //                   actualLocal = eventItem.actualLocal;
               //               }else{
               //                   actualLocal = eventItem.actual;
               //               }
               
//               if(eventItem.actualLocal != ''){
//               actualLocal = "file://"+eventItem.actualLocal;
//               }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
//
//               }else{
//               actualLocal = eventItem.actual;
//               }

               
               
               if(isOnline && eventItem.actualLocal == '')
               {
               //online and not downloaded
               actualLocal = eventItem.actual;
               console.log("//online and not downloaded");
               }
               else if(isOnline && eventItem.actualLocal != '')
               {
               // online and downloaded
               console.log("//online and  ownloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
               }
               else if(!isOnline && eventItem.actualLocal == '')
               {
               //offline and not downloaded
               console.log("//offline and not downloaded");
               actualLocal = 'images/TechTime-AppIcon.png';
               }
               else if(!isOnline && eventItem.actualLocal != '')
               {
               //offline and downloaded
               console.log("//offline and  downloaded");
               actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +eventItem.itemId+"actual.png";
               }
               else
               {
               //defaul
               console.log("default");
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
               
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='images/icon_event.svg' style='height:20px; width:20px; border:none;margin:5px; '/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+eventItem.title+"</label><br>";
               
               $.each(eventItem.author, function(key, tempAuthor) {
                      
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this)' href='#detailAuthor'>";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";    
                      
                      });
               
               var tempDate = '';
               
               //               alert(eventItem.sstart_date);
               //               alert(eventItem.send_date);
               
               
               //               if(eventItem.sstart_date == eventItem.send_date){
               //                   tempDate = eventItem.startDate;
               //               alert(eventItem.startDate);
               //                       strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"+eventItem.sstart_date+"</label><br>";
               //               }else{
               //                       tempDate = eventItem.startDate + ' - ' +eventItem.send_date;
               //               
               //               }
               
               
               
               strHTMLDetail += "<label id='videoDate' style='font-size: 14px;'>"+eventItem.startDate+"</label><br>";
               
               
               console.log('strHTMLDetail :'+strHTMLDetail);
               
               
               //               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+tempDate+"</label><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+eventItem.etime+"</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+eventItem.description+"</label>"; 
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               //               console.log('strHTMLDetail :'+strHTMLDetail);
               
               strHTML = strHTML + "<div style='background-color: white; width: 100%; height: 30px'>";
               strHTML = strHTML + "<table style='width: 100%;'><tr>";
              
              // if(itemCount > 1)
               {
               strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem("+elementId+","+itemCount+")'><img width='100' data='images/btn_previous.svg'></img></td>";
            strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem("+elementId+","+itemCount+")'><img width='80' data='images/btn_next.svg'></img></td>";
               }
               strHTML = strHTML + "</tr></table></div></div><hr style='width:100%;background-color: grey; color: grey; height:1px;'>";
               
               }
               });
        
    }
    
    //========================================================================================================================================================
    
    
    
    
    document.getElementById('spotItemContent').style.display = "none";
    
    //$.mobile.changePage("#detailMediaPage");
    
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
    
}


function showAuthorDetailPage(authorName)
{
    
    var strHTMLDetail = "";
    var author = authorName.id;
    
    $('#AuthorContentArea').html('');
    
    $.each(jsonData.contributor, function(key, itemContributor) {
           
           
           
           console.log(''+itemContributor.title+'<---->'+''+author);
           
           if(itemContributor.title == author){
           
//           console.log('Contributor Found---->>>'+JSON.stringify(itemContributor.title)+'<<<<---');
           
           var actualLocal = '';
           
//           if(itemContributor.actualLocal != ''){
//               actualLocal = itemContributor.actualLocal;
//           }else{
//               actualLocal = itemContributor.actual;
//           }
           
           
//           if(itemContributor.actualLocal != ''){
//               actualLocal = itemContributor.actualLocal;
//           
//           }else if(!isOnline){
//               actualLocal = 'images/TechTime-AppIcon.png';
//           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
//           }else{
//               actualLocal = itemContributor.actual;
//           }

           
           if(isOnline && itemContributor.actualLocal == '')
           {
           //online and not downloaded
           actualLocal = itemContributor.actual;
           console.log("//online and not downloaded");
           }
           else if(isOnline && itemContributor.actualLocal != '')
           {
           // online and downloaded
           console.log("//online and  ownloaded");
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           else if(!isOnline && itemContributor.actualLocal == '')
           {
           //offline and not downloaded
           console.log("//offline and not downloaded");
           actualLocal = 'images/TechTime-AppIcon.png';
           }
           else if(!isOnline && itemContributor.actualLocal != '')
           {
           //offline and downloaded
           console.log("//offline and  downloaded");
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           else
           {
           //defaul
           console.log("default");
           actualLocal = "file://"+window.appRootDir.fullPath + "/images/" +itemContributor.itemId+"actual.png";
           }
           
           
           //alert("actualLocal"+actualLocal);
           
           
           strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
           strHTMLDetail = strHTMLDetail + "<img id='videoImg' src='"+actualLocal+"' style='border:none; height:150px; width:100px; margin:20px 20px;'/><br></td>";
           strHTMLDetail = strHTMLDetail + "<td style='width : 50%'><br>";
           strHTMLDetail = strHTMLDetail + "</td></tr>";
           
           strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'>";
           //<img id='videoThumb' src='' style='height:25px; width : 25px; border: none; '/>
           
           strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemContributor.title+"</label><br>";
           strHTMLDetail = strHTMLDetail + "<label id='videoAuthor' style='font-size: 14px;font-family: AgfaRotisSans;color:black'>"+itemContributor.contributor+"</label><br><br><br>";
//           strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemContributor.date+"</label><br><br><br>";
           strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemContributor.description+"</label>"; 
           
           strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table></div>";
           
           }
           
           });
    
    $('#AuthorContentArea').html(strHTMLDetail);
    
    strHTMLDetail = '';
    
}


//--------------------------------------------- Subscribe content ------------------------------------------------------------------------------------------

var flagSubscribeCount = 0;
var atleastOneAssetTypeChecked = 'false';
var atleastOneTAChecked = 'false';


function showSubscribeContent()
{
    var xmlArr = '';
    
    flagSubscribeCount = '0';
    atleastOneAssetTypeChecked = 'false';
    
    var flagPodcast = "false";
    var flagDocument = "false";
    
    
    $('#subscribePageContentArea').html('');
    
    xmlArr += '<table id="technologyAreas" border="0" style="width: 100%; margin: 0px; padding: 0px;">';
    xmlArr += '<tr><td style="width: 55%">';     
    xmlArr += '<fieldset id="techAreasCB" data-role="controlgroup" name="technologyAreasCheck">';
    xmlArr += '<legend style="font-style: bold; font-size:16px;background : #F0EFED;width:100%"><b>Technology Areas<b>:</legend>';
    
    //console.log('123456789 *****-->\n\n'+JSON.stringify(jsonData.category));
    
    $.each(jsonData.category, function(key, item) {
           
        //alert('-->'+item.categoryname);
           
           
        if(item.subscribe == "yes"){
           
           xmlArr += '<div style="width:100%; background:#F0EFED;"><input type="checkbox" data-mini="true" name="category'+item.categoryid+'" id="checkbox'+item.categoryid+'"  class="techAreasCheckBox" checked="checked"/><label class="techAreasLabel" style="font-weight:100">'+item.categoryname+'</label></div>'; 
           
           flagSubscribeCount++;
           
           
        }else{
           
           
           
           xmlArr += '<div style="width:100%; background:#F0EFED;"><input type="checkbox" data-mini="true" name="category'+item.categoryid+'" id="checkbox'+item.categoryid+'" class="techAreasCheckBox" /><label class="techAreasLabel" style="font-weight:100">'+item.categoryname+'</label></div>'; 
           
        }
           
        if(item.subbscribePodcast == "yes"){
           flagPodcast = "yes";
           atleastOneAssetTypeChecked = 'true';
        }
        if(item.subscribeDocuments == "yes"){
           flagDocument = "yes";
           atleastOneAssetTypeChecked = 'true';
        }
           
           
           }); // Entries.Each function
    
    
    xmlArr += '</fieldset></td>';
    xmlArr += '<td id="cellAT" style="width: 45%" valign="top">';
    xmlArr += '<fieldset id="assetTypesCB" data-role="controlgroup">';
    xmlArr += '<legend style="font-style: bold; font-size:16px;background : #F0EFED;;width:100%"><b>Asset Types<b>:</legend>';
    
    
    
    if(flagPodcast == "yes"){
        
        xmlArr += '<div style="width:100%;background : #F0EFED;"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" checked/><label class="techAreasLabel" style="font-weight:100">Audio/Videos</label></div>';
        
    }else{
        xmlArr += '<div style="width:100%;background : #F0EFED;"><input type="checkbox" data-mini="true" name="checkbox16" id="audioVideo" class="assetTypeCheckBox" /><label class="techAreasLabel" style="font-weight:100">Audio/Videos</label></div>';
    }
    
    if(flagDocument == "yes"){
        xmlArr += '<div style="width:100%;background : #F0EFED;"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" checked/><label class="techAreasLabel" checked style="font-weight:100">Documents</label></div>';
        
    }else{
        
        xmlArr += '<div style="width:100%;background : #F0EFED;"><input type="checkbox" data-mini="true" name="checkbox17" id="documents" class="assetTypeCheckBox" /><label class="techAreasLabel" style="font-weight:100">Documents</label></div>';
        
    }  
    
    xmlArr += '</fieldset><label id="selectAllAssetTypes" style="color: orange; padding-left: 4px" onclick=subAllAssetTypes()><b>Select All</b></label></td></tr></table>';
    
    // Select All 
    xmlArr += '<table style="width: 100%"><tr>';
    xmlArr += '<td style="width: 60%"><label id="selectAllTechAreas" style="color: orange; padding-left: 5px" onclick=subAllTechAreas()><b>Select All</b></label></td>';
    xmlArr += '<td style="width: 40%"></td>';
    xmlArr += '</tr></table>';

    
    // Action Buttons
    
    
    xmlArr += '<div id="actionButtons" style="padding-right: 15px"><br><table style="width:100%"><tr><td style="width:60%">';
    
    xmlArr += '<img id="clearAllSelections" src="images/btn_clearAll.png" style="float:left;margin-left:1%;width:100px;"/>';
   
    xmlArr += '</td><td style="width:40%"><img id="subnscribeNow" src="images/btn_subscribeNow.png" style="margin-left:2%;width:100px;" onclick="showa(this)"/></td></tr></table></div>';
    

    if(flagSubscribeCount)
    {
        xmlArr += '</div>';
    }

    
    xmlArr += '<br><div style="width:100%;padding-left: 10px" onclick="unsubscribeFunction()"><a data-role="button" data-mini="true" data-inline="true" style="text-decoration:none;float:left;color:orange"><div id="unsubnscribeNow">How to Un-subscribe?</div></a></div><br><br> ';
    
    
//    xmlArr += '<br><br><div style="width:100%;padding-left: 10px"><a href="#unsubscribePage" data-role="button" data-mini="true" data-inline="true" style="text-decoration:none;float:left;color:orange"><div id="unsubnscribeNow">Click here to Un-Subscribe</div></a></div><br><br> ';
//    
    
    
    $.mobile.changePage("#subscribePage");
    
    $('#subscribePageContentArea').html(xmlArr);
    
    showNavigateDiv("navigateDiv");
    
        xmlArr = '';
}

function unsubscribeFunction()
{
     jAlert('To unsubscribe, un-select the Technology Area or Asset Type and select "Subscribe Now".', 'Tech Time');
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
                              
    //alert('1223 -->'+flagSubscribeCount+'-->'+atleastOneAssetTypeChecked);
                         
     /*Checkboxes Checked Condition*/   
                         
     if(flagSubscribeCount == "false" && atleastOneAssetTypeChecked == "true")
     {
         //alert("You should select at least one technology area");
         jAlert('You should select at least one technology area.', 'Tech Time');
     
         flagSubscribeCount = "false;"
         atleastOneAssetTypeChecked = "false";
     
     }else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "false"){
                         
         //alert("You should select at least one asset type");
         jAlert('You should select at least one asset type.', 'Tech Time');
     
         flagSubscribeCount = "false;"
         atleastOneAssetTypeChecked = "false";
                         
     }else if(flagSubscribeCount == "false" && atleastOneAssetTypeChecked == "false"){
                         
         //alert("You should select at least one technology area and one asset type");
         jAlert('You should select at least one technology area and one asset type.', 'Tech Time');
         
         flagSubscribeCount = "false;"
         atleastOneAssetTypeChecked = "false";
                         
     }else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "true" && csMode == "subscribe"){
         
        checkedCategoryList(csMode);
                         
     } else if(flagSubscribeCount == "true" && atleastOneAssetTypeChecked == "true" && csMode == "unsubscribe"){

        checkedCategoryList(csMode); 
     } 
     
                     
}


// Gets the list of Checked Checkboxes
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
    
    //alert('1234567890--->'+categoryId);
    
    prepareJSON(categoryId, clMode) 
}

// Prepares JSON Data to be submitted to the User
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
    
    if(typeAV.is(':checked') && typeDoc.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast","documents"]}}';
    } 
    
    if(typeAV.is(':checked') && !typeDoc.is(':checked'))
    {
        JSONData += '],"assettypes":["podcast"]}}';
    } 
    
    if(!typeAV.is(':checked') && typeDoc.is(':checked'))
    {
        JSONData += '],"assettypes":["documents"]}}';
    }
    
    if(!typeAV.is(':checked') && !typeDoc.is(':checked'))
    {
        JSONData += '],"assettypes":[]}}'        
    }   
    
    /*postJSONData(JSONData, localMode);*/
    
    postJSONData(JSONData, localMode);
}

function postJSONData(localJSONData, postMode)
{
    
    var uName = document.getElementById("lblUserName").innerHTML;
        uName = uName.replace(/\./g, '_');
        
    var linkSubscribe = 'https://techtime.accenture.com/techtimemobile/subscribe-service/uid=';
        linkSubscribe = linkSubscribe + uName;

//    alert('-->'+linkSubscribe);
//    console.log('-->'+linkSubscribe);
//    console.log('-->'+JSON.stringify(localJSONData));
    
    var localJSONData1 = {"data" :{"mode" : "logout"}};
    
    if(postMode == 'logout'){
    
        localJSONData = JSON.stringify(localJSONData1);
        getFileSystemRefForWriting(jsonData);
    }
    
//    alert('-->'+localJSONData);
//     alert('-->'+JSON.stringify(localJSONData));
    
    if(isOnline){
        
                    $.ajax({
                           
                           type: 'POST',
                           url: linkSubscribe,
                           data: localJSONData, 
                           dataType: 'xml',
                           contentType: 'application/json',
                           success: function(data) {
                           
                                   if(postMode == 'subscribe'){
                                       jAlert('Thank you for your Subscription to Tech Time.', 'Tech Time');
                           
                                   }else if(postMode == 'logout'){
                                        jAlert('Logged Out Successfully.', 'Tech Time');
                                       $.mobile.changePage("#loggedOutPage");
                           
                                   }else{
                                       jAlert('Thank you for your Un-Subscription to Tech Time.', 'Tech Time');
                                   }
                           //$("#imgRefreshProgress").show();
                //           getSubscribeRss();
                               
                           },
                           error: function(xhr, textStatus, error){
                                  // alert("ERROR POSTING THE JSON");
                           jAlert('Could not subscribe you to the selected Technology Areas. Please try again.', 'Tech Time');
//                           console.log('*******************************************************')
                           console.log('In Failure'+JSON.stringify(xhr));
//                           console.log("textStatus:"+textStatus + ':' + errorThrown);
//                           console.log('*******************************************************')
                           }
                           
                    }); // Ajax Call
    }else{
        
        if(postMode == 'logout'){
           
//             $.mobile.changePage("#loggedOutPage");
//            jAlert('Logged Out Succesfully.', 'Tech Time');
            
        }else{
             jAlert('To \"Subscribe\" or \"Unsubscribe"\, please go online.', 'Tech Time');
        }
        
    
   
    
    }
    
        
}   

function changeDownloadLogoutColor()
{
    
     console.log("9 **changeDownloadLogoutColor function called ----->");
    
//    console.log("OFFLINE MODE -----------> GREY");
     document.getElementById('logoutLabelHomescreen').style.color = "grey";
     document.getElementById('homescreenLogout').style.background = "grey";
    
}



//--------------------------------------------- Contact Us Submission ------------------------------------------------------------------------------------------

var isCommentEntered = "false";
var isSubmitHit = "false";

function hitBackButton()
{
    var userComment = '';
  //  alert("Back hit");
    
     $('#commentTextArea').val('Enter Your Comments Here');
    
    if($('#commentTextArea').val() == "")
    {
        isCommentEntered = "false";
        setTextArea();
        
    } 
}

function setTextArea()
{
        $('#commentTextArea').val('Enter Your Comments Here');
}

function contactUsFocus()
{
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
    
    showNavigateDiv("navigateDiv");

}

function contactUsArea()
{
      
          var commentSubmit = '';
          var commentJSON = '{"data":{"comment":"';
          
          var commentEntered = 'false';
          
          var uName = document.getElementById('lblUserName').innerHTML;
          uName = uName.replace(/\./g,'_');
    
        
          var linkContact = 'https://techtime.accenture.com/techtimemobile/contactus/uid=';
          linkContact = linkContact + uName;
          
          // alert("SUBMIT BUTTON CLICKED");
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
//                                 console.log(textStatus);
//                                 console.log(error);
                             }
                        });
                    
                }else{
                    
                    jAlert('Please go online to post your comment.', 'Tech Time');
                }
                
                
                
            }

    // Change Page to Main Page
    
   
    
}


//--------------------------------------------- About TechTime content ------------------------------------------------------------------------------------------



function showAboutTTArea()
{
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
    
    //alert(strHTMLAboutTT);
    
    //alert('About TechTime Complete ...');
    $('#aboutTectTimeContentArea').html(strHTMLAboutTT);

    showNavigateDiv("navigateDiv");
    
}




//--------------------------------------------- Display FAQ DATA   ------------------------------------------------------------------------------------------


function showHideFaq(element)
{
    var bTemp = $('#'+element.id+'Content').is(':visible');
    
    if(!bTemp){
        $('#'+element.id+'Content').show('fast');
        document.getElementById(element.id).innerHTML = "Hide Answer";
    }
    else{
        $('#'+element.id+'Content').hide('fast');
        document.getElementById(element.id).innerHTML = "Show Answer";
    }
}



function showFaqContent()
{
    
    $('#faqContentArea').empty('');
        
    var strHTMLCategory = "";
    //alert("jsonData.faq"+JSON.stringify(jsonData.faq));
    
    $.each(jsonData.faq, function(index, item) {
          // alert("item.qOrder"+item.qOrder);
           
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
    
    showNavigateDiv("navigateDiv");
    
}

function changeIsdownloadStatus(tempfilePath, itemId, type)
{   
    console.log('itemId -->>-->>-->>-->>-->>-->>-->>-->>-->>-->>-->>-->>-->>-->>-->>');
    console.log('itemId :'+itemId);
    
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
    
    console.log('itemId -->>'+itemId);
    console.log('tempfilePathLocal :'+tempfilePathLocal);
    console.log('type :'+type);
//    
    console.log('tempMedia -->>'+tempMedia);
    console.log('tempDocument :'+tempDocument);
    console.log('flag :'+flag);
    
    
    if(tempMedia == 'D'){
        
        $.each(jsonData.documents, function(key, documentItem) {
               
            if(documentItem.itemId == itemId){
               
                if(tempDocument == 'D'){
               
                   documentItem.isDownloaded = flag;
                   documentItem.localPath = tempfilePathLocal;
               documentItem.downloadedDateD = new Date();
                   
               }
            }
        });
    }
               
    
    if(tempMedia == 'A'){
        
        $.each(jsonData.audio, function(key, audioItem) {
               
            if(audioItem.itemId == itemId){
               
               if(tempDocument == 'A'){
                  audioItem.localPathAudio = tempfilePathLocal;
                  audioItem.isDownloadedAudio = flag;
               audioItem.downloadedDateA = new Date();
               }
               
               if(tempDocument == 'V'){
                 audioItem.localPathVideo = tempfilePathLocal;
                 audioItem.isDownloadedVideo = flag;
               audioItem.downloadedDateV = new Date();
               }
               if(tempDocument == 'T'){
                   audioItem.localPathTranscript = tempfilePathLocal;
                   audioItem.isDownloadedTranscript = flag;
               audioItem.downloadedDateT = new Date();
               }
               if(tempDocument == 'P'){
                   audioItem.localPathPresentation = tempfilePathLocal;
                   audioItem.isDownloadedPresentation = flag;
               audioItem.downloadedDateP = new Date();
               }
            }
        });
    }
    
    if(tempMedia == 'V'){
        
        $.each(jsonData.video, function(key, videoItem) {
               
            if(videoItem.itemId == itemId){
               
               if(tempDocument == 'A'){
                   videoItem.localPathAudio = tempfilePathLocal;
                   videoItem.isDownloadedAudio = flag;
               videoItem.downloadedDateA = new Date();
               }
               if(tempDocument == 'V'){
                   videoItem.localPathVideo = tempfilePathLocal;
                   videoItem.isDownloadedVideo = flag;
               videoItem.downloadedDateV = new Date();
               }
               if(tempDocument == 'T'){
                   videoItem.localPathTranscript = tempfilePathLocal;
                   videoItem.isDownloadedTranscript = flag;
               videoItem.downloadedDateT = new Date();
               }
               if(tempDocument == 'P'){
                   videoItem.localPathPresentation = tempfilePathLocal;
                   videoItem.isDownloadedPresentation = flag;
               videoItem.downloadedDateP = new Date();
               }
            }
        });
    }
    
    if(tempMedia == 'I'){
        
        $.each(jsonData.interviews, function(key, interviewItem) {
               
            if(interviewItem.itemId == itemId){
               
               if(tempDocument == 'A'){
                   interviewItem.localPathAudio = tempfilePathLocal;
                   interviewItem.isDownloadedAudio = flag;
               interviewItem.downloadedDateA = new Date();
               }
               if(tempDocument == 'V'){
                   interviewItem.localPathVideo = tempfilePathLocal;
                   interviewItem.isDownloadedVideo = flag;
               interviewItem.downloadedDateV = new Date();
               }
               if(tempDocument == 'T'){
                   interviewItem.localPathTranscript = tempfilePathLocal;
                   interviewItem.isDownloadedTranscript = flag;
               interviewItem.downloadedDateT = new Date();
               }
               if(tempDocument == 'P'){
                   interviewItem.localPathPresentation = tempfilePathLocal;
                   interviewItem.isDownloadedPresentation = flag;
               interviewItem.downloadedDateP = new Date();
               
//               console.log('interviewItem.localPathPresentation :'+interviewItem.localPathPresentation);
//               console.log('tempfilePath :'+tempfilePath);
//               console.log('interviewItem.isDownloadedPresentation :'+interviewItem.isDownloadedPresentation);

               
               }
            }
        });
    }
    
    if(tempMedia == 'P'){
        
        $.each(jsonData.panelDiscussions, function(key, panelDiscussionsItem) {
               
            if(panelDiscussionsItem.itemId == itemId){
               
               if(tempDocument == 'A'){
                   panelDiscussionsItem.localPathAudio = tempfilePathLocal;
                   panelDiscussionsItem.isDownloadedAudio = flag;
               panelDiscussionsItem.downloadedDateA = new Date();
               }
               
               if(tempDocument == 'V'){
                   panelDiscussionsItem.localPathVideo = tempfilePathLocal;
                   panelDiscussionsItem.isDownloadedVideo = flag;
               panelDiscussionsItem.downloadedDateV = new Date();
               }
               if(tempDocument == 'T'){
                   panelDiscussionsItem.localPathTranscript = tempfilePathLocal;
                   panelDiscussionsItem.isDownloadedTranscript = flag;
               panelDiscussionsItem.downloadedDateT = new Date();
               }
               if(tempDocument == 'P'){
                   panelDiscussionsItem.localPathPresentation = tempfilePathLocal;
                   panelDiscussionsItem.isDownloadedPresentation = flag;
                 panelDiscussionsItem.downloadedDateP = new Date();
               }
            }
        });
    }
    
    
//    console.log('status changed in changeIsdownloadStatus:');
    
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------------------------------------------------


//showSortedTAListing(currentCategoryId,currentCategory,'false','false','false');

function showSortedTAListing(curCatId, curCatName,sortBySubCat,sortByMediaType,sortByDate)
{
    
//    console.log('sortBySubCat :'+sortBySubCat);
//    console.log('sortByMediaType :'+sortByMediaType);
    
    selectedCategoryId = '';
    selectedCategoryName = '';
    
    selectedCategoryId = curCatId;
    selectedCategoryName = curCatName;
    
    var strHTMLshowTAList = "";
    
    var resAudio = new Array();
    var resVideo = new Array();
    
    var resPanelDiscussion = new Array();
    var resInterviews = new Array();
    
    var resDocument = new Array();
    var resEvent = new Array();
    
    var resSubcatList = new Array();
    
    
    itemCounter = 0;
    
    $('#subCategoryList').html('');
    $('#TAListResultContentArea').html('');
    $('#noTAListResultContentArea').html('');
    
    // TODO: Sample To Do activity showSortedTAListing
    // FIXME: Sample bug comment showSortedTAListing
    
   // alert("------> REACHED HERE");
    
        var subCategoryHTML = '<ul class="submenu1">';
        subCategoryHTML = subCategoryHTML + "<li><div style='width:100%;height:28px;margin-left:5px;'><a href='#' onclick='changeDropDown(topic,1,this)' style='font-weight:normal; font-size:medium'>Topic</a></div></li>";

    resAudio = [];
    resVideo = [];
    resPanelDiscussion = [];
    resInterviews = [];
    resDocument = [];
    resEvent = [];
    resSubcatList = [];
    resFinal = [];
    
    $.each(jsonData.category, function(key, item) {
           
          // alert("curCatName"+JSON.stringify(item));
           
        if(item.categoryid == curCatId &&  item.categoryname == curCatName){
           
           $.each(item.subCategory, function(key, subItem) {    
                  
                  resSubcatList.push(subItem.subCategoryName);
                  
                  
                  subCategoryHTML += "<li><div style='width:100%;height:28px;margin-left:5px;'><a onclick='changeDropDown(topic,1,this)' style='font-weight:normal; font-size:medium'>"+subItem.subCategoryName+"</a></div></li>"; 
                  
                  if(sortBySubCat == 'false' && sortByMediaType == 'false'){            // NO SORT AND MEDIA TYPE---------------------------------- 1
                  console.log("ftd"+JSON.stringify(ftd));
                  
                  //alert('1. Inside Loop \n sortBySubCat -->'+sortBySubCat+'\n sortByMediaType -->'+sortByMediaType);
                  
                                        $.each(subItem.audio, function(key, audioItem) {   
                                               
                                            if ($.inArray(audioItem, resAudio) == -1) {
                                               console.log("Audio Item"+JSON.stringify(resAudio));
                                               resAudio.push(audioItem);
                                               console.log("resAudio Item"+JSON.stringify(resAudio));
                                            }
                                        });
                                  
                                        $.each(subItem.video, function(key, videoItem) {         
                                               if ($.inArray(videoItem, resVideo) == -1) {
                                               console.log("videoItem Item"+JSON.stringify(videoItem));
                                                resVideo.push(videoItem);
                                               console.log("resVideo Item"+JSON.stringify(resVideo));
                                               }
                                         });
                                  
                                        $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                               if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                               console.log("panelDiscussionsItem Item"+JSON.stringify(panelDiscussionsItem));
                                                resPanelDiscussion.push(panelDiscussionsItem);
                                               console.log("resPanelDiscussion Item"+JSON.stringify(resPanelDiscussion));
                                               }
                                         });
                                  
                                        $.each(subItem.interviews, function(key,interviewsItem) {  
                                               if ($.inArray(interviewsItem, resInterviews) == -1) {
                                               console.log("interviewsItem Item"+JSON.stringify(interviewsItem));
                                                resInterviews.push(interviewsItem);
                                               console.log("resInterviews Item"+JSON.stringify(resInterviews));
                                               }
                                         });
                                  
                                  
                                        $.each(subItem.document, function(key, documentItem) {         
                                               if ($.inArray(documentItem, resDocument) == -1) {
                                               console.log("documentItem Item"+JSON.stringify(documentItem));
                                                resDocument.push(documentItem);
                                                console.log("documentItem Item"+JSON.stringify(resDocument));
                                               }
                                         });
                                    
                                  console.log("ftd"+JSON.stringify(ftd));
//                                        $.each(subItem.event, function(key, eventItem) {         
//                                               if ($.inArray(eventItem, resEvent) == -1) {
//                                                resEvent.push(eventItem);
//                                               }
//                                         });
                  }
                  
                  if(sortBySubCat == 'false' && sortByMediaType != 'false'){            // SORT --> FALSE AND MEDIA TYPE --> Audio/ video/ paneldiscussion/ interview --------------------- 2
                  
                   //alert('2. Inside Loop \n sortBySubCat -->'+sortBySubCat+'\n sortByMediaType -->'+sortByMediaType);
                  
                                        if(sortByMediaType == 'audio' || sortByMediaType == 'Audio'){ 
                                  
                                              $.each(subItem.audio, function(key, audioItem) {   
                                                     
                                                     if ($.inArray(audioItem, resAudio) == -1) {
                                                     resAudio.push(audioItem);
                                                     }
                                              });
                                        }
                                  
                                        if(sortByMediaType == 'video' || sortByMediaType == 'Video'){ 
                                          
                                              $.each(subItem.video, function(key, videoItem) {         
                                                     if ($.inArray(videoItem, resVideo) == -1) {
                                                        resVideo.push(videoItem);
                                                     }
                                              });
                                        }
                                          
                                        if(sortByMediaType == 'panelDiscussion' || sortByMediaType == 'PanelDiscussion'){
                                  
                                            $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                                    if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                                        resPanelDiscussion.push(panelDiscussionsItem);
                                                    }
                                            });
                                        }
                                  
                                        if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){ 
                                          
                                              $.each(subItem.interviews, function(key,interviewsItem) {  
                                                     if ($.inArray(interviewsItem, resInterviews) == -1) {
                                                     resInterviews.push(interviewsItem);
                                                     }
                                              });
                                        }
                                  
                                        if(sortByMediaType == 'document' || sortByMediaType == 'Documents'){ 
                                          
                                              $.each(subItem.document, function(key, documentItem) {         
                                                     if ($.inArray(documentItem, resDocument) == -1) {
                                                     resDocument.push(documentItem);
                                                     }
                                              });
                                        }
                                          
//                                        if(sortByMediaType == 'event' || sortByMediaType == 'Events'){ 
//                                          
//                                              $.each(subItem.event, function(key, eventItem) {         
//                                                     if ($.inArray(eventItem, resEvent) == -1) {
//                                                     resEvent.push(eventItem);
//                                                     }
//                                              });
//                                        }
                  }
                  
                  if(sortBySubCat != 'false' && sortByMediaType == 'false'){            //  SORT --> TRUE AND MEDIA TYPE --> FALSE--------------------- 3
                  
                  
                   //alert('3. Inside Loop \n sortBySubCat -->'+sortBySubCat+'\n sortByMediaType -->'+sortByMediaType);
                  
                                if(sortBySubCat == subItem.subCategoryName){
                  
                  
                  
                                        $.each(subItem.audio, function(key, audioItem) {   
                                             
                                            if ($.inArray(audioItem, resAudio) == -1) {
                                             resAudio.push(audioItem);
                                            }
                                        });
                                      
                                        $.each(subItem.video, function(key, videoItem) {         
                                            if ($.inArray(videoItem, resVideo) == -1) {
                                             resVideo.push(videoItem);
                                            }
                                        });
                                      
                                        $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                            if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                             resPanelDiscussion.push(panelDiscussionsItem);
                                            }
                                        });
                                      
                                        $.each(subItem.interviews, function(key,interviewsItem) {  
                                            if ($.inArray(interviewsItem, resInterviews) == -1) {
                                             resInterviews.push(interviewsItem);
                                            }
                                        });
                                      
                                      
                                        $.each(subItem.document, function(key, documentItem) {         
                                            if ($.inArray(documentItem, resDocument) == -1) {
                                             resDocument.push(documentItem);
                                            }
                                        });
                                      
                                      
//                                        $.each(subItem.event, function(key, eventItem) {         
//                                            if ($.inArray(eventItem, resEvent) == -1) {
//                                             resEvent.push(eventItem);
//                                            }
//                                        });
                  
                                }
                  
                  }
                  
                  if(sortBySubCat != 'false' && sortByMediaType != 'false'){            //  SORT --> TRUE AND MEDIA TYPE --> TRUE Audio/ video/ paneldiscussion/ interview ---------------- 4
                  
                  
                   //alert('4. Inside Loop \n sortBySubCat -->'+sortBySubCat+'\n sortByMediaType -->'+sortByMediaType);
                  
                              if(sortBySubCat == subItem.subCategoryName){
                              
                              
                              
                                          if(sortByMediaType == 'audio' || sortByMediaType == 'Audio'){ 
                                          
                                          $.each(subItem.audio, function(key, audioItem) {   
                                                 
                                                 if ($.inArray(audioItem, resAudio) == -1) {
                                                 resAudio.push(audioItem);
                                                 }
                                                 });
                                          }
                                          
                                          if(sortByMediaType == 'video' || sortByMediaType == 'Video'){ 
                                          
                                          $.each(subItem.video, function(key, videoItem) {         
                                                 if ($.inArray(videoItem, resVideo) == -1) {
                                                 resVideo.push(videoItem);
                                                 }
                                                 });
                                          }
                                          
                                          if(sortByMediaType == 'panelDiscussion' || sortByMediaType == 'PanelDiscussion'){ 
                                          
                                          $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {         
                                                 if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                                                 resPanelDiscussion.push(panelDiscussionsItem);
                                                 }
                                                 });
                                          }
                                          
                                          if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){ 
                                          
                                          $.each(subItem.interviews, function(key,interviewsItem) {  
                                                 if ($.inArray(interviewsItem, resInterviews) == -1) {
                                                 resInterviews.push(interviewsItem);
                                                 }
                                                 });
                                          }
                                          
                                          if(sortByMediaType == 'document' || sortByMediaType == 'Documents'){ 
                                          
                                          $.each(subItem.document, function(key, documentItem) {         
                                                 if ($.inArray(documentItem, resDocument) == -1) {
                                                 resDocument.push(documentItem);
                                                 }
                                                 });
                                          }
                                          
//                                          if(sortByMediaType == 'event' || sortByMediaType == 'Events'){ 
//                                          
//                                          $.each(subItem.event, function(key, eventItem) {         
//                                                 if ($.inArray(eventItem, resEvent) == -1) {
//                                                 resEvent.push(eventItem);
//                                                 }
//                                                 });
//                                          }
                                }
                  
                  }

                  
                  
                  
           
            });
           
        }
           
    });
    
    //alert('Inside Loop \n sortBySubCat -->'+sortBySubCat+'\n sortByMediaType -->'+sortByMediaType);
    //alert('Subcategory -- >'+resSubcatList);
    //alert('Subcategory -- >'+resSubcatList);

    
            $.each(resAudio, function(key, itemRes) {
                   $.each(jsonData.audio, function(key, itemAudio) {
                          if(itemRes == itemAudio.itemId){        
                              resFinal.push(itemAudio);
                          }  
                    });
            });
            
            
            $.each(resVideo, function(key, itemRes) {
                   $.each(jsonData.video, function(key, itemVideo) {
                          if(itemRes == itemVideo.itemId){        
                            resFinal.push(itemVideo);
                          }  
                    });
            });
            
            
            
            $.each(resPanelDiscussion, function(key, itemRes) {
                   $.each(jsonData.panelDiscussions, function(key, itemPanelDiscussions) {
                          if(itemRes == itemPanelDiscussions.itemId){        
                              resFinal.push(itemPanelDiscussions);
                          }  
                    });
            });
            
            
            $.each(resInterviews, function(key, itemRes) {
                   $.each(jsonData.interviews, function(key, itemInterviews) {
                          if(itemRes == itemInterviews.itemId){        
                                resFinal.push(itemInterviews);
                          }  
                    });
            });
                
            $.each(resDocument, function(key, itemRes) {
                   $.each(jsonData.documents, function(key, itemDocument) {
                          if(itemRes == itemDocument.itemId){        
                                resFinal.push(itemDocument);
                          }  
                    });
            });
   // resFinal = [];
    
//            $.each(resEvent, function(key, itemRes) {
//                   $.each(jsonData.events, function(key, itemEvent) {
//                          if(itemRes == itemEvent.itemId){        
//                                resFinal.push(itemEvent);
//                          }  
//                  });
//           });

    subCategoryHTML = subCategoryHTML + "</ul>";
    
    //console.log('\n\n\n1111111111111111111111111111111111111111111111 \n\n'+subCategoryHTML);
    
    
    $('#subCategoryList').html(subCategoryHTML);
    
    if(sortByDate == 'true'){
        
        resFinal.sort(function(a, b){
             var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
             return dateA-dateB //sort by date descending
        });
    }else{
        resFinal.sort(function(a, b){
          var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
          return dateB-dateA //sort by date ascending
        });
    
    
    }  
    

    
//    console.log('-->'+JSON.stringify(resFinal));
//    console.log('-->'+resFinal.length);
//    console.log('\n\n\n1111111111111111111111111111111111111111111111\n\n\n');
//    console.log('Subcategory -- >'+resSubcatList);
//    console.log('\n\n\n ');
//    console.log('Result Audio : '+resAudio);
//    console.log('Result Video : '+resVideo);
//    console.log('Result Pannel Discussion : '+resPanelDiscussion);
//    console.log('Result Interviews : '+resInterviews);
//    console.log('Result Event : '+resEvent);
//    console.log('Result Document : '+resDocument);
//    console.log('\n\n\n1111111111111111111111111111111111111111111111');
    
    var count = 0;
    var test = '';
    var keyTemp = resFinal.length-1;
    
    if(resFinal.length){
    
            $.each(resFinal, function(key, itemRes) {       //           Audios     Videos      Panel Discussions       Interviews      documents       events
                       
               if(key == 0){
                    count = 0;
               }else if(key == keyTemp){
                    count = -1;
               }else{
                   count = key;
               }
               
                   if(resFinal.length==1)
              
                   {
                   test = '';
                   test = getListElement(itemRes,-100,"techAreaList"+(1),0);

                   }
                   else
                   {
                   test = '';
                   test = getListElement(itemRes,count,"techAreaList"+(key+1),key);

                   }
               strHTMLshowTAList = strHTMLshowTAList + test;
                       
            });
        
            if(resFinal.length > 5){
                
                strHTMLshowTAList += "<div id='loadmoreTAList' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresultTAlist(this)'><b>Load More Results</b></div>";
            }
        
        
         $('#TAListResultContentArea').html(strHTMLshowTAList);
        
        
    
    }else{
    
        var typeField = document.getElementById('type').innerHTML;
        var subCategoryField = document.getElementById('topic').innerHTML;
        
        // $('#numberOfItems').html("(No Items)");
       // ITEM COUNT
        renderItemCount(0);
        
        strHTMLshowTAList = "<br><br><label>No content is available for <b>"+typeField+"</b> in this topic.<label>";
//        strHTMLshowTAList = "<br><br><label>No content is available for <b>"+typeField+"</b> on this <b>"+subCategoryField+"</b>.<label>";
        
         $('#noTAListResultContentArea').html(strHTMLshowTAList);
    }
    
    $('#selCatName').html(curCatName);
    
    strHTMLshowTAList = '';
    
}

function showmoreresultTAlist(variable){
   // alert("show more:"+parseInt(variable.title));
    
    var titleCount = parseInt(variable.title) + 5;
  //  alert("title count"+titleCount);
    document.getElementById('loadmoreTAList').title = titleCount;
   // alert("resFinal.length"+resFinal.length);
    if(resFinal.length){
        $.each(resFinal, function(key, itemRes) {
            if((key+1) <= titleCount){
               document.getElementById('techAreaList'+(key+1)).style.display = "block";
            }  
        });
    }
    if(titleCount>=resFinal.length){ //chetan change
        document.getElementById('loadmoreTAList').style.display = "none";
    }
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
           //alert('Found @ posiotion '+key);
         
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
               //alert('Found @ posiotion '+key);
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


function showQnA(elementDetail)
{
    var ida = elementDetail.id;
    var data = elementDetail.title;
    
    //alert('1111 -->'+data);
    
     $('#qnaTitle').html('');
     $('#qnaPageContentArea').html('');
    
    ida = "Q & A For " + ida; 
    
    
    $('#qnaTitle').html(ida);
    $('#qnaPageContentArea').html(data);
    
}


function showSearchResult(element, media, valueElement)
{
    
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
    
    searchString = searchString.trim();
    
    displaySearchString = searchString;
    
    searchString = searchString.replace(/[^a-zA-Z0-9 ]/g, "");
    
  //  alert(searchString);
    
    //alert("------> " + searchString);
    
//    var sampleString = 'Digital 2013 * is coole*st T()echno)logy';
//    
//    alert("----------> " + sampleString.replace(/[^a-zA-Z0-9 ]/g, ""));
    
    document.getElementById('searchLabel').innerHTML = displaySearchString;
    document.getElementById('typeS').innerHTML = valueElement;
    
    $('#searchResultDiv').html('');
    $('#nosearchResultDiv').html('');
    
    if(searchString.length){
    
                                // alert('Media In search --->'+media+'\nSearch Keyword -->'+searchString);
                                
                                
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
                                
//                                if(sortByMediaType == 'event' || sortByMediaType == 'Events' || sortByMediaType == 'All'){ 
//                                    $.each(jsonData.events, function(key, item) {
//                                           searchResult.push(item);
//                                    });
//                                }  
                                
//                                console.log('------------------------------------------\n\n\n');
                                
        
      //  alert("ARRAY LENGTH -----> " + searchResult.length + " -------> " + searchResultArray.length);
        
                                $.each(searchResult, function(key, item) {
                                       
                                       var flag = 'false';
                                       var titleSearch = item.title.search( new RegExp(""+searchString+"","gi" ));
                                       
                                       if(titleSearch != "-1"){
//                                           console.log(key+' : '+item.type+'<-----> '+item.title);
                                           flag = 'true';
                                       }
                                       
                                       $.each(item.author, function(key, itemAuthor) {
                                              
                                              var authorSearch = itemAuthor.search( new RegExp(""+searchString+"","gi" ));
                                              
                                              if(authorSearch != "-1"){
//                                                  console.log(item.type+'<---Author--> '+item.title+'<---Author--> '+itemAuthor);
                                                  flag = 'true';
                                              }
                                       });
                                       
                                       if(flag == 'true'){
                                           searchResultArray.push(item);
                                       }
                                });
                                
                                $.mobile.changePage("#searchResultPage");
                                
                                //alert('Search Result Array :'+searchResultArray.length);
                                
                                var textHtml = '';
                                var test = '';
        
        
                            var searchDateColor = document.getElementById('sortByDateSearchField').style.color;
                            
                            if(searchDateColor == 'orange'){
            
                                    searchResultArray.sort(function(a, b){
                                         var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)                         //sort by date decending
                                         return dateA-dateB 
                                     });
                            }else{
                                    searchResultArray.sort(function(a, b){
                                       var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)                         //sort by date ascending
                                       return dateB-dateA 
                                   });
                            }
        
        
        
                                
                                $.each(searchResultArray, function(key, item) {
                                       
                                       test = '';
                                       test = getListElement(item,-100,"searchList"+(key+1),key);
                                       textHtml = textHtml + test;
                                
                               });
        
                            if(searchResultArray.length > 5){
                                
                                textHtml += "<div id='loadmoreSearch' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresultSearch(this)'><b>Load More Results</b></div>";
                            }
        
        
    }else{
    
            jAlert('Please enter some valid keywords.', 'Tech Time');
    }
    
//    console.log('searchResultArray.length :'+searchResultArray.length);
//    
//    console.log('111'+textHtml);
    
    
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


//function getListElement(itemRes,count,itemId,itemIndex)
//{
//
////    console.log('--->'+itemId+'--->'+itemIndex);
//    
//    var strHTMLshowTAList = '';
//    
//    var iconType = '';
//    
//    var itemType = '';
//    
//    //alert(itemRes.length);
//    
//    
//    // -------------------------------------
//    
//    
//    var actualThumb = '';
//    
//    var contentType ='';
//    //
//    //    if(itemRes.thumbLocal != '')
//    //    {
//    //
//    //        actualThumb = "file://"+itemRes.thumbLocal;
//    //
//    //    }
//    //    else if(!isOnline){
//    //        actualThumb = 'images/TechTime-AppIcon.png';
//    //        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    //
//    //    }
//    //    else{
//    //        actualThumb = itemRes.thumb;
//    //    }
//    //
//    //
//    //    if(actualThumb == '')
//    //    {
//    //        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    //    }
//    
//    
//    if(isOnline && itemRes.thumbLocal == '')
//    {
//        //online and not downloaded
//        actualThumb = itemRes.thumb;
//        console.log("//online and not downloaded");
//    }
//    else if(isOnline && itemRes.thumbLocal != '')
//    {
//        // online and downloaded
//        console.log("//online and  downloaded");
//        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    }
//    else if(!isOnline && itemRes.thumbLocal == '')
//    {
//        //offline and not downloaded
//        console.log("//offline and not downloaded");
//        actualThumb = 'images/TechTime-AppIcon.png';
//    }
//    else if(!isOnline && itemRes.thumbLocal != '')
//    {
//        //offline and downloaded
//        console.log("//offline and  downloaded");
//        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    }
//    else
//    {
//        //defaul
//        console.log("default");
//        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    }
//    //alert("actualThumb"+actualThumb);
//   
//    $.each(itemRes.author, function(key, itemAuthor) {
//           if(key == 0){
//           authoNames = authoNames + itemAuthor;
//           }else if(key <= (itemRes.author.length-1)){
//           authoNames = authoNames + ', ' + itemAuthor;
//           }else{
//           authoNames = authoNames + ' ' + itemAuthor;
//           }
//           });
//    
//    var listItemHTML ='';
//
//    if(itemRes.type == "Audios"){
//        iconType ='images/icon_audio.png';
//        itemType = 'Audios';
//        itemCounter = itemCounter + 1;
//        
//        
//        if(itemIndex < 5){
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
//            
//            //alert(listItemHTML);
//        }else{
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
//            // alert(listItemHTML);
//        }
//        
//        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
//        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
//        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
//        strHTMLshowTAList += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
//        strHTMLshowTAList += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
//        strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
//        // Shows Downloaded Content Icons In List
//        strHTMLshowTAList += showDownloadedIcons(itemRes)+ "</td>";
//        
//        strHTMLshowTAList += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
//        
//    }
//    
//    if(itemRes.type == "Videos"){
//        iconType ='images/icon_video.png';
//        itemType = 'Videos';
//        itemCounter = itemCounter + 1;
//        
//        
//        
//        if(itemIndex < 5){
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
//            
//            //alert(listItemHTML);
//        }else{
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
//            // alert(listItemHTML);
//        }
//        
//        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
//        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
//        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
//        strHTMLshowTAList += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
//        strHTMLshowTAList += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
//        strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
//        // Shows Downloaded Content Icons In List
//        strHTMLshowTAList += showDownloadedIcons(itemRes)+ "</td>";
//        
//        strHTMLshowTAList += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
//        
//        
//        
//        
//    }
//    if(itemRes.type == "Panel Discussions"){
//        iconType = 'images/icon_panelDiscussion.png';
//        itemType = 'PanelDiscussions';
//        itemCounter = itemCounter + 1;
//        
//        if(itemIndex < 5){
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
//            
//            //alert(listItemHTML);
//        }else{
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
//            // alert(listItemHTML);
//        }
//        
//        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
//        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
//        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
//        strHTMLshowTAList += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
//        strHTMLshowTAList += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
//        strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
//        // Shows Downloaded Content Icons In List
//        strHTMLshowTAList += showDownloadedIcons(itemRes)+ "</td>";
//        
//        strHTMLshowTAList += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
//        
//        
//    
//        
//    }
//    if(itemRes.type == "Interviews"){
//        iconType = 'images/icon_interview.png';
//        itemType = 'Interviews';
//        itemCounter = itemCounter + 1;
//        
//        
//        if(itemIndex < 5){
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
//            
//            //alert(listItemHTML);
//        }else{
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
//            // alert(listItemHTML);
//        }
//        
//        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
//        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
//        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
//        strHTMLshowTAList += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
//        strHTMLshowTAList += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
//        strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
//        // Shows Downloaded Content Icons In List
//        strHTMLshowTAList += showDownloadedIcons(itemRes)+ "</td>";
//        
//        strHTMLshowTAList += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
//        
//        
//    }
//    if(itemRes.type == "documents"){
//        itemType = 'Documents';
//        iconType = 'images/icon_document.png';
//        itemCounter = itemCounter + 1;
//        
//        
//        
//        if(itemIndex < 5){
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
//            
//            //alert(listItemHTML);
//        }else{
//            
//            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
//            // alert(listItemHTML);
//        }
//        
//        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
//        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
//        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
//        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
//        strHTMLshowTAList += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
//        strHTMLshowTAList += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
//        strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
//        // Shows Downloaded Content Icons In List
//        strHTMLshowTAList += showDownloadedIcons(itemRes)+ "</td>";
//        
//        strHTMLshowTAList += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><embed src='images/icon_orangeRight.svg' type='image/svg+xml' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
//    
//        
//    }
//    
//   // renderItemCount(itemCounter);
//    //alert(itemCounter);
//    
//    //alert(strHTMLshowTAList);
//    
//    return strHTMLshowTAList;
//}



function getListElement(itemRes,count,itemId,itemIndex)
{
    
    //    console.log('--->'+itemId+'--->'+itemIndex);
    
    var strHTMLshowTAList = '';
    strHTMLshowTAList = '';
    
    var actualThumb = '';
    actualThumb = '';
    
    //    if(itemRes.thumbLocal != ''){
    //        actualThumb = itemRes.thumbLocal;
    //    }else{
    //        actualThumb = itemRes.thumb;
    //    }
    //
    
    if(itemRes.thumbLocal != ''){
        
        actualThumb = itemRes.thumbLocal;
        
    }else if(!isOnline){
        
        actualThumb = 'images1/TechTime-AppIcon.png';
        
    }else{
        actualThumb = itemRes.thumb;
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
    
    if(itemRes.type == "Audios"){
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Audios',"+count+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Audios',"+count+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        
        strHTMLshowTAList += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:100px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_audio.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'></img></td></tr>";
       strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;'>"+authoNames+"</td></tr>";
       strHTMLshowTAList += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'></img></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";

    }
    
    if(itemRes.type == "Videos"){
        
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Videos',"+count+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Videos',"+count+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        strHTMLshowTAList += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding 0 px; width : 65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding 0 px; width : 10%;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_video.png' style='border:none;padding:0px;margin-right:5px;height:15px;width:20px;'/>";
        strHTMLshowTAList += "</td></tr><tr><td style='margin:0px; padding:0px; width:65%;color:orange;font-size:14px;padding-left:10px;font-style:normal;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList += "<tr><td style='margin :0px; padding:0px; width:65%;font-weight:100;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td id='' style='margin:0px;padding:0px;width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table>";
        strHTMLshowTAList += "<hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
    }
    if(itemRes.type == "Panel Discussions"){
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','PanelDiscussions','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','PanelDiscussions','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        
        strHTMLshowTAList += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:100px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding:0px;width:65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding:0px;width : 10%;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_panelDiscussion.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
        strHTMLshowTAList += "</td></tr><tr><td style='margin:0px;color:orange;padding:0px;width:65%;font-size:14px;border:none;padding-left:10px;font-style:normal;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList += "<tr><td style='margin :0px; padding:0px;width:65%;font-weight:100;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td id='' style='margin:0px;padding:0px;width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table>";
        strHTMLshowTAList += "<hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
    }
    if(itemRes.type == "Interviews"){
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Interviews','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','Interviews','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        
        strHTMLshowTAList += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:100px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding:0px; width:65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin :0px; padding:0px; width:10%;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_interview.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
        strHTMLshowTAList += "</td></tr><tr><td style='margin :0px; padding:0px;width:65%;color:orange;padding-left:10px;font-size:14px;font-style:normal;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList += "<tr><td style='margin :0px; padding:0px;width:65%;font-weight:100;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td id='' style='margin:0px;padding:0px;width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table>";
        strHTMLshowTAList += "<hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
    }
    if(itemRes.type == "documents"){
        
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','documents','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','documents','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        
        strHTMLshowTAList += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:100px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:65%;color: orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin:0px; padding:0px; width:10%;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_document.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
        strHTMLshowTAList += "</td></tr><tr><td style='margin:0px; padding:0px; width:65%;color: orange;padding-left:10px;font-size:14px;font-style:normal;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList += "<tr><td style='margin :0px;padding:0px;width:65%;font-weight:100;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td style='margin:0px;padding:0px; width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
    }
    if(itemRes.type == "events"){
        
        
        if(itemIndex < 5){
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','events','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:block;'>";
            
        }else{
            
            strHTMLshowTAList += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide'onclick=detailPageView('"+itemRes.itemId+"','events','"+count+"') style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        }
        
        strHTMLshowTAList += "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
        strHTMLshowTAList += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
        
        if(itemRes.authorCount == 1){
            strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:100px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        }else if(itemRes.authorCount == 2){
            strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:175px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        }else{
            strHTMLshowTAList += "<img src='"+actualThumb+"' style='height:100px;width:175px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
        }
        
        strHTMLshowTAList += "<td style='margin:0px;padding:0px;width:65%;color:orange;padding-left:10px;'><b>"+itemRes.title+"</b></td>";
        strHTMLshowTAList += "<td style='margin:0px;padding:0px;width:10%;' rowspan='2' align='right'>";
        strHTMLshowTAList += "<img src='images/icon_event.png' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
        strHTMLshowTAList += "</td></tr><tr><td style='margin:0px; padding:0px;width:65%;color: orange;padding-left:10px;font-size:14px;font-style:normal;'>"+authoNames+"</td></tr>";
        strHTMLshowTAList += "<tr><td style='margin :0px; padding:0px; width:65%;font-weight:100;padding-left:10px;font-style:normal;font-size:16px;'>"+itemRes.publishedDate+"</td>";
        strHTMLshowTAList += "<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";
        
        
    }
    
        
    
    return strHTMLshowTAList;
}




 //ITEM COUNT
function renderItemCount(itemCounter)
{
    //alert("--------> " + itemCounter);
    
//    if(itemCounter == 1)
//    {
//        $('#numberOfItems').html("("+itemCounter+" Item)");
//    } else if(itemCounter > 1){
//         $('#numberOfItems').html("("+itemCounter+" Items)");
//    } else if(itemCounter == 0)
//    {
//        $('#numberOfItems').html("(No Items)");
//    }
    
    
    itemCounter = 0;
}

function renderListItems(itemId, itemRes, authoNames, iconType, itemIndex, count, itemType, itemCounter)
{
    
    var actualThumb = '';

    var contentType ='';
//    
//    if(itemRes.thumbLocal != '')
//    {
//        
//        actualThumb = "file://"+itemRes.thumbLocal;
//        
//    }
//    else if(!isOnline){
//        actualThumb = 'images/TechTime-AppIcon.png';
//        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//        
//    }
//    else{
//        actualThumb = itemRes.thumb;
//    }
//    
//    
//    if(actualThumb == '')
//    {
//        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
//    }
    
    
    if(isOnline && itemRes.thumbLocal == '')
    {
        //online and not downloaded
        actualThumb = itemRes.thumb;
        console.log("//online and not downloaded");
    }
    else if(isOnline && itemRes.thumbLocal != '')
    {
       // online and downloaded
        console.log("//online and  ownloaded");
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    else if(!isOnline && itemRes.thumbLocal == '')
    {
        //offline and not downloaded
        console.log("//offline and not downloaded");
        actualThumb = 'images/TechTime-AppIcon.png';
    }
    else if(!isOnline && itemRes.thumbLocal != '')
    {
        //offline and downloaded
        console.log("//offline and  downloaded");
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    else
    {
        //defaul
        console.log("default");
        actualThumb = "file://"+window.appRootDir.fullPath + "/images/" +itemRes.itemId+"thumb.png";
    }
    //alert("actualThumb"+actualThumb);
  
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
    
   // alert("--------> " + itemType);
    
    if(itemIndex < 5){
        
    listItemHTML += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:block;'>";
    
        //alert(listItemHTML);
     }else{
        
        listItemHTML += "<a id="+itemId+" href='#detailMediaPage' data-transition='slide' onclick=detailPageView('"+itemRes.itemId+"','"+itemType+"',"+count+","+itemCounter+") style='text-decoration:none;font-style:normal;color:black;display:none;'>";
        // alert(listItemHTML);
    }

    listItemHTML += "<table border=0  style='width:100%;margin:0px;padding:0px;margin-top:5px;margin-bottom: 5px;border:none;' cellpadding='0' cellspacing='0'>";
    listItemHTML += "<tr><td id='"+itemRes.itemId+"' style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3'>";
    listItemHTML += "<img src='"+actualThumb+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'></img></td>";
    listItemHTML += "<td style='margin:0px; padding:0px; width:65%; color:orange; padding-left:10px;'><b>"+itemRes.title+"</b></td>";
    listItemHTML += "<td style='margin:0px; padding:0px; width:10%; font-style: font-style:normal;' rowspan='2' align='right'>";
    listItemHTML += "<img src='"+iconType+"' style='border:none;padding:0px;margin-right:5px;height:20px;width:20px;'/>";
    listItemHTML += "</td></tr> <tr><td style='margin:0px;padding:0px;width:65%;color: orange;font-weight:100;font-size:14px;padding-left:10px;font-style:normal;font-weight:100;'>"+authoNames+"</td></tr>";
    listItemHTML += "<tr><td style='margin:0px;padding:0px;width:65%;font-weight:100;font-size:16px;padding-left:10px;font-style:normal;'>"+itemRes.publishedDate+ "&nbsp;\n";
            // Shows Downloaded Content Icons In List
    listItemHTML += showDownloadedIcons(itemRes)+ "</td>";
    
    listItemHTML += "<td id='' style='margin:0px; padding:0px; width:10%;' align='right'><img src='images/icon_orangeRight.svg' width='30%' height='20px;' style='margin-right:10px;'/></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:.5px;'></a>";

    return listItemHTML;
}




// Shows Downloaded Content Icons In List
function showDownloadedIcons(itemRes)
{
    
    var aURL = itemRes.audioUrl;
    var vURL = itemRes.videoUrl;
    var pURL = itemRes.presentationUrl;
    var tURL = itemRes.transcriptUrl;
    
    var appendIconsHTML = '';
    
    if(itemRes.isDownloadedAudio == "true" && aURL != "")
    {
        appendIconsHTML += "<img src='images/icon_audio.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(itemRes.isDownloadedVideo == "true" && vURL != "")
    {
        appendIconsHTML += "<img src='images/icon_video.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(itemRes.isDownloadedPresentation == "true" && pURL != "")
    {
        appendIconsHTML += "<img src='images/icon_presentation.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(itemRes.isDownloadedTranscript == "true" && tURL != "")
    {
        appendIconsHTML += "<img src='images/icon_transcript.png' style='height:11px;width:11px;'/>&nbsp;";
    }
    
    if(itemRes.isDownloaded == "true")
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


/*function switchDownloadsDiv(type)
{
    if(type == "inProgress")
    {
        //alert("IN PROGRESS DIV");
        
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
        
        $('label[id="completedDownloads"]').css({"color":"black",
                                                "font-weight":"bolder"
                                                });
        $('label[id="inProgressDownloads"]').css({"color":"orange",
                                                 "font-weight":"100"
                                                 })
        $('div[id="allDownloads"]').show();
        $('div[id="showProgressBar"]').hide();
    }
}
*/
//function showInProgressiOs()
//{
//    $('div[id="showProgressBar"]').show();
//    $('div[id="allDownloads"]').hide();
//    
////   document.getElementById('showProgressBar').style.visibility="visible";
////    document.getElementById('allDownloads').style.visibility="hidden";
//    
//    $('label[id="completedDownloads"]').css({"color":"orange",
//                                            "font-weight":"normal"
//                                            })
//    $('label[id="inProgressDownloads"]').css({"color":"black",
//                                             "font-weight":"bolder"
//                                             });
//    
//   
//}

function showInProgress()
{
    //alert("in show in progress");
    $('label[id="completedDownloads"]').css({"color":"orange",
                                            "font-weight":"normal"
                                            })
    $('label[id="inProgressDownloads"]').css({"color":"black",
                                             "font-weight":"bolder"
                                             });
    
    //     $('div[id="showProgressBar"]').show();
    
    //   $('div[id="allDownloads"]').hide();
    document.getElementById('showProgressBar').style.display = 'block';
    document.getElementById('allDownloads').style.display = 'none';
}
function switchDownloadsDiv(type)
{
    if(type == "inProgress")
    {
        //alert("IN PROGRESS DIV");
        
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

