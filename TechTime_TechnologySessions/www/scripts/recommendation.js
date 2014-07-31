var whatLeadersAreWatchingRecommendations = [];
var count = '-100';

function slideright(nextItem){
    var leadersLength = whatLeadersAreWatchingRecommendations.length;
    
    if($(nextItem).attr('data-recommendedLeaderItemIndex') == 0){
        $('#recoLeaders1').css('display','block');
        $('#recoLeaders0').css('display','none');
        $('#recoLeaders2').css('display','none');
    }
    else if($(nextItem).attr('data-recommendedLeaderItemIndex') == 1){
        $('#recoLeaders1').css('display','none');
        $('#recoLeaders0').css('display','none');
        $('#recoLeaders2').css('display','block');
    } else if($(nextItem).attr('data-recommendedLeaderItemIndex') == 2)
    {
        $('#recoLeaders1').css('display','none');
        $('#recoLeaders0').css('display','block');
        $('#recoLeaders2').css('display','none');
    }
    
}

function slideleft(prevItem){
    if($(prevItem).attr('data-recommendedLeaderItemIndex') == 2){
        $('#recoLeaders1').css('display','block');
        $('#recoLeaders0').css('display','none');
        $('#recoLeaders2').css('display','none');
    }
    else if($(prevItem).attr('data-recommendedLeaderItemIndex') == 1){
        $('#recoLeaders1').css('display','none');
        $('#recoLeaders0').css('display','block');
        $('#recoLeaders2').css('display','none');
    } else if($(prevItem).attr('data-recommendedLeaderItemIndex') == 0)
    {
        $('#recoLeaders1').css('display','none');
        $('#recoLeaders0').css('display','none');
        $('#recoLeaders2').css('display','block');
    }
}


function loadrecoEngineData(recommendationLocation){
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    
    if(recommendationLocation == 'home')
    {
            var recoEngineRSS = "https://techtime.stage2.accenture.com/mobile-recommendation/"+loggedInUsername;
    } else if(recommendationLocation == 'digital')
    {
//            var recoEngineRSS = "https://techtime.stage2.accenture.com/mobile-digital-recommendation/"+loggedInUsername;
            var recoEngineRSS = "https://techtime.stage2.accenture.com/mobile-digital-recommendation/"+loggedInUsername;
    }
    
    // var recoEngineRSS = "https://techtime.stage2.accenture.com/mobile-recommendation/k.veni.ragalapally";
    // var recoEngineRSS = "http://localhost:8888/spotlight/recommendationFull.xml";
    
    $.ajax({
           type: "GET",
           url: recoEngineRSS,
           dataType: "xml",
           success: getRecoData,
           error: function (xhr, textStatus, errorThrown) {
           //alert('error' + JSON.stringify(xhr));
           }
           });
}


var recommendationImages = [];

function getRecoData(xml){
    
    var isRecommendationDigital = false;
    if(this.url.indexOf("digital") == -1)
    {
        isRecommendationDigital = false;
    } else if(this.url.indexOf("digital") != -1)
    {
        isRecommendationDigital = true;
    }
    
    $(xml).find('recommendationPhase').each(function(index,item){
                                            
                                            var recommendation = new Object();
                                            recommendation.category = $(this).attr('recCategory');
                                            recommendation.phase = $(this).attr('phase');
                                            $(this).find('recommendedItem').each(function(childIndex,childItem){
                                                                                 recommendation.viewer = $(this).find('viewer').text();
                                                                                 recommendation.title = $(this).find('item').find('title').text();
                                                                                 recommendation.author = $(this).find('item').find('author').text();
                                                                                 recommendation.image = $(this).find('item').find('actual').text();
                                                                                 recommendation.cid = $(this).find('item').find('contentid').text();
                                                                                 recommendation.date = $(this).find('item').find('pods_date').text();
                                                                                 recommendation.cid = $(this).find('item').find('contentid').text();
                                                                                 recommendation.ctype = $(this).find('item').find('content_type').text();
                                                                                 recommendation.audio = $(this).find('item').find('audio').text();
                                                                                 recommendation.video = $(this).find('item').find('video').text();
                                                                                 recommendation.transcript = $(this).find('item').find('transcript').text();
                                                                                 recommendation.presentation = $(this).find('item').find('presentation').text();
                                                                                 recommendation.document = $(this).find('item').find('document').text();
                                                                                 recommendation.actual = $(this).find('item').find('actual').text();
                                                                                 recommendation.thumb = $(this).find('item').find('thumb').text();
                                                                                 recommendation.description = $(this).find('item').find('description').text();
                                                                                 recommendation.formatType = $(this).find('item').find('pods_formattype').text();
                                                                                 recommendation.qna = $(this).find('item').find('qna').text();
                                                                                 
                                                                                 var recommendationImageDetails = new Object();
                                                                                 
                                                                                 if(recommendation.actual != '')
                                                                                 {
                                                                                 recommendationImageDetails.itemId = recommendation.cid;
                                                                                 recommendationImageDetails.actualUrl = recommendation.actual;
                                                                                 recommendationImageDetails.thumbUrl = '';
                                                                                 recommendationImageDetails.mediaType = recommendation.formatType;
                                                                                 recommendationImages.push(recommendationImageDetails);
                                                                                 }
                                                                                 
                                                                                 if(recommendation.thumb != '')
                                                                                 {
                                                                                 recommendationImageDetails.itemId = recommendation.cid;
                                                                                 recommendationImageDetails.actualUrl = '';
                                                                                 recommendationImageDetails.thumbUrl = recommendation.thumb;
                                                                                 recommendationImageDetails.mediaType = recommendation.formatType;
                                                                                 recommendationImages.push(recommendationImageDetails);
                                                                                 
                                                                                 }
                                                                                 
                                                                                 });
                                            
                                            
                                            if(!isRecommendationDigital)
                                            {
                                                jsonData.recommendations.push(recommendation);
                                            } else if(isRecommendationDigital)
                                            {
                                                jsonData.digitalRecommendations.push(recommendation);
                                            }
                                            
                                            });
    getFileSystemRefForWriting(jsonData);
    
    
    if(!isRecommendationDigital)
    {
       // alert(JSON.stringify(jsonData.recommendations));
        displayRecoEngine('home');
    } else if(isRecommendationDigital)
    {
        //alert(JSON.stringify(jsonData.digitalRecommendations));
        displayRecoEngine('digital');
    }
    
    
    if(isOnline)
    {
        downloadRecommendationImages();
    }
}



function displayRecoEngine(recommendationLocation){
    
    var numberOfWhatLeadersAreWatching = 0;
    var strHTMLtext = '';
    
    var recommendationSource = [];
    
    if(recommendationLocation == 'home')
    {
        recommendationSource = jsonData.recommendations;
    } else if(recommendationLocation == 'digital')
    {
        recommendationSource = jsonData.digitalRecommendations;
    }
    
    defaultNavigate();
    
    if(recommendationSource.length == 0)
    {
        $('#recoEngine').css('display', 'none');
    }
    
    strHTMLtext = strHTMLtext + '<div id="recoEngine" style="margin-left:15px; margin-right:3%;overflow-x:hidden;"><div id="recoHeadBrowsing" style="font-weight:bold;margin-top:3%;">You can also view the recommendations based on your browsing history</div>';
    
    var itemit = [];
    
    
    
    
    $.each(recommendationSource, function(key, item) {
           itemit.push(item);
           
           if(item.category == 'leaders'){
           whatLeadersAreWatchingRecommendations.push(item);
           
           }
           });
    
    if(whatLeadersAreWatchingRecommendations.length != 0)
    {
        $.each(whatLeadersAreWatchingRecommendations, function(key, item){
               chkpath = globalPathNew + "images/" + item.cid + "thumb.png";
               chkpath = globalPathNew + "images/" + item.cid + "actual.png";
               
               strHTMLtext = strHTMLtext + '<div id="recoLeaders'+key+'"  style="background:orange;color:white;"><div id="recoHeadLeaders" style="font-weight:bold;margin-left:15px;margin-top:3%;">See what leaders are viewing...</div><div style="padding:10px;">';
               strHTMLtext = strHTMLtext + '<span id="leftarrow" style="width:10%; display: inline-block;float:left;">&nbsp;<span>';
               
               strHTMLtext = strHTMLtext + '<img id="leftArrow'+key+'" class="recommendationArrow" data-recommendedLeaderItemIndex='+key+' src="images/icon_whiteLeft.png" width="18px" height="18px" style=";padding-right:20%;" onclick="slideleft(this);" >';
               
               strHTMLtext = strHTMLtext + '</span></span>';
               strHTMLtext = strHTMLtext + '<span style="display: inline-block;width:80%;" onclick=recoEngineDetailPageView("' + item.cid + '","' + item.ctype + '","' + count + '","'+recommendationLocation+'");setRecommendationLocationFlag(recommendationLocation);><span style="font-style:italic;"><b>' + item.viewer + '</b></span> <span> viewed</span></br><span>\"' + item.title + '\"</span></span>';
               strHTMLtext = strHTMLtext + '<span id="rightarrow" style="display: inline-block; width:10%;float:right;"><span>';
               
               strHTMLtext = strHTMLtext + '<img class="recommendationArrow" id="rightArrow'+key+'" data-recommendedLeaderItemIndex='+key+' src="images/icon_whiteRight.png" width="18px" height="18px" style="padding-right:20%;" onclick="slideright(this);" >';
               
               strHTMLtext = strHTMLtext + '</span></span>';
               strHTMLtext = strHTMLtext + '</div></div>';
               
               });
        
        strHTMLtext = strHTMLtext + '</div>';
    }
    
    
    $.each(recommendationSource, function(key, item) {
           var thumbId = item.cid;
           var thumbUrl = item.imag;
           var thumbPath = '';
           
           chkpath = globalPathNew + "images/" + item.cid + "thumb.png";
           
           if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
           {
           thumbPath = chkpath;
           } else if(downloadedThumbs.indexOf(thumbId + "large.png") == -1)
           {
           if(isOnline)
           {
           thumbPath = thumbUrl;
           } else if(!isOnline)
           {
           thumbPath = "images/TechTime-AppIcon.png";
           }
           }
           
           var authorname = item.author.split("|");
           
           if(item.category == 'recent_content'){
           
           strHTMLtext = strHTMLtext +  '<div class="listItemClick"><div id="recoHeadOthers" style="font-weight:bold;margin-bottom:3%;margin-left:15px;margin-top:3%;">Here\'s what others are viewing</div>';
           
           strHTMLtext = strHTMLtext + "<table border=0 style='width:100%;padding:0px;margin-top:5px;margin-bottom:5px;border:none;margin-right:2px;margin-left:5px;' cellpadding='0' cellspacing='0' onclick=recoEngineDetailPageView('"+item.cid+"','"+item.ctype+"','"+count+"','"+recommendationLocation+"');setRecommendationLocationFlag(recommendationLocation);>";
           
           strHTMLtext = strHTMLtext + "<tr><td style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
           
           
           strHTMLtext = strHTMLtext + "<img src='"+thumbPath+"' style='height:75px;width:75px;border:none;margin:auto;margin-top:2%'/></td>";
           
           
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;'><b>"+item.title+"</b></td>";
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
           
           strHTMLtext = strHTMLtext + "</td></tr><tr><td id='' style='margin:0px; padding:0px;width:65%;color: orange;font-style:normal;padding-left:10px;font-size:14px;font-weight:100;'>"+authorname+"</td></tr>";
           strHTMLtext = strHTMLtext + "<tr><td id='' style='margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-size:16px;font-weight:100;'>"+item.date+"</td>";
           strHTMLtext = strHTMLtext +"<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'></td></tr></table></a></div>";
           strHTMLtext = strHTMLtext + "<hr>";
           }
           
           
           });
    strHTMLtext = strHTMLtext + "</div>";
    
    
    $.each(recommendationSource, function(key, item) {
           var thumbId = item.cid;
           var thumbUrl = item.imag;
           var thumbPath = '';
           
           chkpath = globalPathNew + "images/" + item.cid + "thumb.png";
           chkpath = globalPathNew + "images/" + item.cid + "actual.png";
           
           if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
           {
           thumbPath = chkpath;
           } else if(downloadedThumbs.indexOf(thumbId + "large.png") == -1)
           {
           if(isOnline)
           {
           thumbPath = thumbUrl;
           } else if(!isOnline)
           {
           thumbPath = "images/TechTime-AppIcon.png";
           }
           }
           
           var authorname = item.author.split("|");
           
           if(item.category == 'subscribed'){
           
           strHTMLtext = strHTMLtext + '<div class="listItemClick"><div id="recoHeadSubscription" style="font-weight:bold;margin-bottom:3%;margin-left:15px;margin-top:3%;">Recommendations relevant to your Subscribed Areas</div>';
           
           strHTMLtext = strHTMLtext + "<table border=0 style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;border:none;margin-right: 2px;margin-left: 5px;' cellpadding='0' cellspacing='0' onclick=recoEngineDetailPageView('" + item.cid + "','" + item.ctype + "','" + count + "','"+recommendationLocation+"');setRecommendationLocationFlag(recommendationLocation);>";
           
           strHTMLtext = strHTMLtext + "<tr><td style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
           
           
           strHTMLtext = strHTMLtext + "<img src='"+thumbPath+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
           
           
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;'><b>"+item.title+"</b></td>";
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
           
           strHTMLtext = strHTMLtext + "</td></tr><tr><td id='' style='margin:0px; padding:0px;width:65%;color: orange;font-style:normal;padding-left:10px;font-size:14px;font-weight:100;'>"+authorname+"</td></tr>";
           strHTMLtext = strHTMLtext + "<tr><td id='' style='margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-size:16px;font-weight:100;'>"+item.date+"</td>";
           strHTMLtext = strHTMLtext +"<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a></div>";
           
           
           
           }
           
           
           });
    strHTMLtext = strHTMLtext +"</div>";
    
    
    $.each(recommendationSource, function(key, item) {
           var thumbId = item.cid;
           var thumbUrl = item.imag;
           var thumbPath = '';
           
           
           chkpath = globalPathNew + "images/" + item.cid + "thumb.png";
           
           if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
           {
           thumbPath = chkpath;
           } else if(downloadedThumbs.indexOf(thumbId + "large.png") == -1)
           {
           if(isOnline)
           {
           thumbPath = thumbUrl;
           } else if(!isOnline)
           {
           thumbPath = "images/TechTime-AppIcon.png";
           }
           }
           var authorname = item.author.split("|");
           
           if(item.category == 'universal'){
           
           strHTMLtext = strHTMLtext +  '<div class="listItemClick"><div id="recoHeadRecent" style="font-weight:bold;margin-bottom:3%;margin-left:15px;">Most recent releases in your subscribed Areas</div>';
           
           strHTMLtext = strHTMLtext + "<table border=0 data-cid='"+item.cid+"' data-ctype='"+item.ctype+"' style='width:100%;margin:0px;padding:0px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;border:none;margin-right: 2px;' cellpadding='0' cellspacing='0' onclick=recoEngineDetailPageView('" + item.cid + "','" + item.ctype + "','" + count + "','"+recommendationLocation+"');setRecommendationLocationFlag(recommendationLocation);>";
           
           strHTMLtext = strHTMLtext + "<tr><td style='margin:0px;padding:0px;width:25%;height:100px;' rowspan='3' >";
           
           
           strHTMLtext = strHTMLtext + "<img src='"+thumbPath+"' style='height:75px;width:75px;border:none;margin:auto;margin-left:15px;margin-top:2%'/></td>";
           
           
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:65%;color: orange;font-style:bold;padding-left:12px;font-size:16px;'><b>"+item.title+"</b></td>";
           strHTMLtext = strHTMLtext + "<td id='' style='margin :0px; padding 0 px; width:10%;' rowspan='2' align='right'>";
           
           strHTMLtext = strHTMLtext + "</td></tr><tr><td id='' style='margin:0px; padding:0px;width:65%;color: orange;font-style:normal;padding-left:10px;font-size:14px;font-weight:100;'>"+authorname+"</td></tr>";
           strHTMLtext = strHTMLtext + "<tr><td id='' style='margin :0px; padding:0px; width:65%;font-style:normal;padding-left:10px;font-size:16px;font-weight:100;'>"+item.date+"</td>";
           strHTMLtext = strHTMLtext +"<td id='' style='margin:0px;padding:0px; width:background-color: grey;' align='right'></td></tr></table><hr style='width:100%;background-color: grey; color: grey; height:0.5px;'></a></div>";
           
           }
           
           });
    strHTMLtext = strHTMLtext +"</div>";
    
    
    if(recommendationLocation == 'home')
    {
        $('#recoDiv').html(strHTMLtext);
    } else if(recommendationLocation == 'digital')
    {
        $('#recoDivDigital').html(strHTMLtext);
    }
    
    $('div[id^="recoLeaders"]').css('display', 'none');
    
    $('#recoLeaders0').css('display', 'block');
    
}





function recoEngineDetailPageView(elementId, type, countNum, recommendationLocation)
{
    var recommendationFlag = true;
    var itemToBeRendered = new Object();
    
    var recommendationSource = [];
    
    if(recommendationLocation == 'home')
    {
        recommendationSource = jsonData.recommendations;
    } else if(recommendationLocation == 'digital')
    {
        recommendationSource = jsonData.digitalRecommendations;
    }
    
    $.each(recommendationSource, function(key, item){
           if(elementId == item.cid)
           {
           itemToBeRendered = item;
           }
           });
    
    type = itemToBeRendered.formatType;
    
    window.localStorage.setItem("detailPageelementIdReco",elementId);
    window.localStorage.setItem("detailPagetypeReco",type);
    window.localStorage.setItem("detailPagecountNumReco",countNum);
    window.localStorage.setItem("isCommingFromRecommendation",recommendationFlag);
    
    recommendationFlag = true;
    spotLightFlag = false;
    eventsFlag = false;
    mediaFlag = false;
    alldownloadFlag = false;
    searchFromMainPage = false;
    searchFromAuthorDetailPage = false;
    detailFlag = false;
    searchFromMediaPage = false;
    searchFromRecommendationMediaPage = true;
    
    
    
    hidePopup();
    
    var strHTMLDetail = '';
    var strHTML = '';
    var stringIWant = '';
    
    // Was hiding the Rec items... is this required?
    // showNavigateDiv("navigateDiv");
    var icons = '';
    
    var cId = '';
    var cDId = '';
    var aURL = '';
    var vURL = '';
    var pURL = '';
    var tURL = '';
    var dURL = '';
    
    var localPathAudio = '';
    var localPathVideo = '';
    var localPathPresentation = '';
    var localPathTranscript = '';
    var localPathDocument = '';
    
    var titleE = '';
    var actualLocal = '';
    
    
    cId = itemToBeRendered.cid;
    aURL = itemToBeRendered.audio;
    vURL = itemToBeRendered.video;
    pURL = itemToBeRendered.presentation;
    tURL = itemToBeRendered.transcript;
    dURL = itemToBeRendered.document;
    
    
    titleE = JSON.stringify(itemToBeRendered.title);
    
    
    if (type == 'Audios') {
        icons = "images/icon_audio.png";
        if (vURL != "") {
            var cVId = "AV" + cId;
        }
        if (aURL != "") {
            var cAId = "AA" + cId;
        }
        if (pURL != "") {
            var cPId = "AP" + cId;
        }
        if (tURL != "") {
            var cTId = "AT" + cId;
        }
    }
    
    if (type == 'Videos') {
        icons = "images/icon_video.png";
        if (vURL != "") {
            var cVId = "VV" + cId;
        }
        if (aURL != "") {
            var cAId = "VA" + cId;
        }
        if (pURL != "") {
            var cPId = "VP" + cId;
        }
        if (tURL != "") {
            var cTId = "VT" + cId;
        }
    }
    
    if (type == 'Panel Discussions' || type == 'PanelDiscussions') {
        icons = "images/icon_panelDiscussion.png";
        if (vURL != "") {
            var cVId = "PV" + cId;
        }
        if (aURL != "") {
            var cAId = "PA" + cId;
        }
        if (pURL != "") {
            var cPId = "PP" + cId;
        }
        if (tURL != "") {
            var cTId = "PT" + cId;
        }
    }
    
    if (type == 'Technology Sessions' || type == 'TechnologySessions') {
        icons = "images/icon_video.png";
        if (vURL != "") {
            var cVId = "VV" + cId;
        }
        if (aURL != "") {
            var cAId = "VA" + cId;
        }
        if (pURL != "") {
            var cPId = "VP" + cId;
        }
        if (tURL != "") {
            var cTId = "VT" + cId;
        }
    }
    
    if (type == 'Interviews') {
        icons = "images/icon_interview.png";
        if (vURL != "") {
            var cVId = "IV" + cId;
        }
        if (aURL != "") {
            var cAId = "IA" + cId;
        }
        if (pURL != "") {
            var cPId = "IP" + cId;
        }
        if (tURL != "") {
            var cTId = "IT" + cId;
        }
    }
    
    
    
    if (type == 'documents') {
        icons = "images/icon_document.png";
        if (dURL != "") {
            
            cDId = "DD" + cId;
        }
        dURL = itemToBeRendered.document;
        lURL = itemToBeRendered.localPath;
    }
    
    /* $.each(jsonData.spotLight, function(key, eventItem) {
     
     stringIWant = '';
     var stringIGet = eventItem.category;
     
     arrayOfCategories = stringIGet.split("|");
     
     for (var i = 0; i < arrayOfCategories.length; i++) {
     var getCategoryName = new Array();
     getCategoryName = arrayOfCategories[i].split("-");
     if (i == arrayOfCategories.length - 1) {
     stringIWant += getCategoryName[0];
     } else {
     stringIWant += getCategoryName[0] + ", ";
     }
     }
     
     if (stringIWant.length > 35) {
     stringToDisplay = stringIWant.substring(0, 32);
     var trimmedCatDisplay = stringToDisplay + "...";
     stringIWant = trimmedCatDisplay;
     }
     
     }); */
    
    if (type == 'Technology Conferences' || type == 'TechnologyConferences') {
        icons = "images/icon_techConf.png";
        if (vURL != "") {
            var cVId = "TV" + cId;
        }
        if (aURL != "") {
            var cAId = "TA" + cId;
        }
        if (pURL != "") {
            var cPId = "TP" + cId;
        }
        if (tURL != "") {
            var cTId = "TT" + cId;
        }
    }
    
    if(isOnline)
    {
        if(downloadedThumbs.indexOf(cId + "actual.png") != -1)
        {
            actualLocal = globalPathNew + "images/" +itemToBeRendered.cid+"actual.png";
        } else if(downloadedThumbs.indexOf(cId + "actual.png") == -1 && itemToBeRendered.actual != '')
        {
            actualLocal = itemToBeRendered.actual;
        } else if(itemToBeRendered.actual == '')
        {
            actualLocal = 'images/TechTime-AppIcon.png';
        }
    } else if(!isOnline)
    {
        if(downloadedThumbs.indexOf(cId + "actual.png") != -1)
        {
            actualLocal = globalPathNew + "images/" +itemToBeRendered.cid+"actual.png";
        } else if(downloadedThumbs.indexOf(cId + "actual.png") == -1)
        {
            actualLocal = 'images/TechTime-AppIcon.png';
        }
    }
    
    posterImage = actualLocal;
    
    
    if(type == 'Audios' || type == 'Videos' || type == 'Interviews' || type == 'Technology Conferences' || type == 'TechnologyConferences' || type == 'Panel Discussions' || type == 'PanelDiscussions' || type == 'Technology Sessions' || type == 'TechnologySessions')
    {
        strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
        
        if(vURL != "")
        {
            
            if(entries.indexOf(cVId) != -1)
            {
                localPathVideo = globalPathNew + "/"+cVId+".mp4";
                strHTMLDetail = strHTMLDetail + "<img id='"+cVId+"' title='"+localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemToBeRendered.isDownloadedVideo+","+titleE+",2, true,true)' src='"+actualLocal+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
                
            }
            else
            {
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
        }else if(vURL == "" && aURL != ""){
            
            strHTMLDetail = strHTMLDetail + "<div id='audioStreamer'><img id='"+cAId+"' title='"+aURL+"' src='"+actualLocal+"' onclick='showAudioStreaming("+cAId+")' style='border:none; height:100px; width:150px; margin:20px 20px;'/></div>";
            
            var getstatus = window.localStorage.getItem("status");
            
            if(getstatus =="offline")
            {
                strHTMLDetail = strHTMLDetail + "<img id='videoStreamImg' style='border:none; width:150px; height:100px; margin:20px 20px;' src='"+actualLocal+"'></image>";
            }
            else
            {
                strHTMLDetail = strHTMLDetail + "<audio id='audioPlayer' style='width:150px; height:20px;margin:0px 20px 0px 20px;' controls><source src='"+aURL+"' type='audio/mp3'>Your browser does not support the video tag.</audio>";
            }
        } else
        {
            
        }
        
        strHTMLDetail = strHTMLDetail + "</td><td style='width:50%;'><br>";
        
        if (aURL != "") {
            
            
            if (entries.indexOf(cAId) != -1) {
                localPathAudio = globalPathNew + "/"+cAId+".mp3";
                strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+localPathAudio+"' onclick='downloadFileAudioMain(this,"+true+","+titleE+",1, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            } else {
                
                strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,"+false+","+titleE+",1, true)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }
        }
        
        
        if(pURL != ""){
            
            if(entries.indexOf(cPId) != -1){
                localPathPresentation = globalPathNew + "/"+cPId+".pdf";
                strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+localPathPresentation+"' onclick= 'downloadFileAudioMain(this,"+true+","+titleE+",3, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }else{
                strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,"+false+","+titleE+",3, true)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }
        }
        
        if(tURL != ""){
            
            if(entries.indexOf(cTId) != -1){
                localPathTranscript = globalPathNew + "/"+cTId+".pdf";
                strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+localPathTranscript+"' onclick= 'downloadFileAudioMain(this,"+true+","+titleE+",4, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }else{
                strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,"+false+","+titleE+",4, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }
        }
        
        
        if(vURL != ""){
            
            
            if(entries.indexOf(cVId) != -1){
                localPathVideo = globalPathNew + "/"+cVId+".mp4";
                strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title= '"+localPathVideo+"' onclick='downloadFileAudioMain(this,"+true+","+titleE+",2, true)'  style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }else{
                strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,"+false+","+titleE+",2, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            }
        }
        
        
        if(itemToBeRendered.qna != ""){
            strHTMLDetail = strHTMLDetail + "<a style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
            
            strHTMLDetail = strHTMLDetail + "<div id='"+itemToBeRendered.title+"' title='"+itemToBeRendered.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";
        }
        
        
        strHTMLDetail = strHTMLDetail + "</td></tr>";
        
        strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img src='"+icons+"' style='height:20px;width:20px;border:none;padding:0px;margin-right:10px'/>";
        
        strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>"+itemToBeRendered.title+"</label><br>";
        
        
    } else if(type == 'documents' || type == 'Documents'){
        
        strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
        localPathDocument = globalPathNew + "/"+cDId+".pdf";
        if (entries.indexOf(cDId) != -1) {
            strHTMLDetail = strHTMLDetail + "<img id='" + cDId + "' title= '" + localPathDocument+ "'  src='" + actualLocal + "' class ='actualDetailThumb'/><br><br>";
        } else {
            strHTMLDetail = strHTMLDetail + "<img id='" + cDId + "' title= '" + dURL + "' src='" + actualLocal + "' class ='actualDetailThumb'/><br><br>";
        }
        strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%'><br>";
        
        if (dURL != "") {
            if (entries.indexOf(cDId) != -1) {
                
                strHTMLDetail = strHTMLDetail + "<div id='" + cDId + "' title= '"+localPathDocument+"' onclick= 'downloadFileAudioMain(this," + true + "," + titleE + ",5, true)' class='detailPageButtonDiv' style='width:120px;;height:40px;z-index:100;'><img src='images/btn_viewPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
            } else {
                
                strHTMLDetail = strHTMLDetail + "<div id='" + cDId + "' title= '" + dURL + "' onclick= 'downloadFileAudioMain(this," + false + "," + titleE + ",5, true)' class='detailPageButtonDiv' style='width:120px;;height:40px;z-index:100;'><img src='images/button_downloadPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
            }
        }
        strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='" + icons + "' style='height:20px; width:20px; border:none;;margin:5px;'/>";
        strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>" + itemToBeRendered.title + "</label><br>";
        
        
    }
    
    var authorDiv = itemToBeRendered.author.split('|');
    
    for(var i=0;i<authorDiv.length;i++){
        strHTMLDetail = strHTMLDetail + "<a id='"+authorDiv[i]+"'  style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id);' href='#detailAuthor'>";
        strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+authorDiv[i]+"</label></a><br>";
    }
    
    strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>"+itemToBeRendered.date+"</label><br>";
    if(type == 'events'){
        
        strHTMLDetail += "<label id='vTime' style='font-size: 14px;'>"+itemToBeRendered.etime+"</label><br><br><br>";
    }
    strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>"+itemToBeRendered.description+"</label>";
    
    strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
    
    $.mobile.changePage('#detailMediaPage');
    
    document.getElementById('spotItemContent').style.display = "none";
    $('#detailPageArea').html(strHTMLDetail);
    
    $('#prevNextContentArea').html('');
    $('#prevNextContentArea').css('background', 'transparent');
    
    strHTMLDetail = '';
    
    $('video').bind('play', stopMedia);
    
}

// ---------------- Download Recommendation Images ------------------- //
var recommendationDownloadedImagesIndex = 0;
var numberOfImagesToDownload = 0;

function downloadRecommendationImages()
{
    var recommendationItemId = recommendationImages[recommendationDownloadedImagesIndex].itemId;
    var recommendationImageUrl = '';
    var recommendationImageMediaType = recommendationImages[recommendationDownloadedImagesIndex].mediaType;
    var recommendationImageType = '';
    if(recommendationImages[recommendationDownloadedImagesIndex].thumbUrl == '' && recommendationImages[recommendationDownloadedImagesIndex].actualUrl != '')
    {
        recommendationImageUrl = recommendationImages[recommendationDownloadedImagesIndex].actualUrl;
        recommendationImageType = 'actual';
    } else if(recommendationImages[recommendationDownloadedImagesIndex].thumbUrl != '' && recommendationImages[recommendationDownloadedImagesIndex].actualUrl == '')
    {
        recommendationImageUrl = recommendationImages[recommendationDownloadedImagesIndex].thumbUrl;
        recommendationImageType = 'thumb';
    }
    
    numberOfImagesToDownload = recommendationImages.length;
    
    if(recommendationDownloadedImagesIndex < numberOfImagesToDownload)
    {
        downloadRecommendationItemImages(recommendationItemId, "thumb", recommendationImageUrl, recommendationImageMediaType);
    }
}


function downloadRecommendationItemImages(thumbId,imageName,imageLink,mediaType)
{
    var url = '';
    url = imageLink;
    
    var name = '';
    name = imageName;
    
    var valueReturn = '';
    valueReturn = 'false';
    
    var filePath = '';
    filePath = '';
    
    var imageType = '';
    
    if(recommendationImages[recommendationDownloadedImagesIndex].thumbUrl == '' && recommendationImages[recommendationDownloadedImagesIndex].actualUrl != '')
    {
        imageType = 'actual.png';
    } else if(recommendationImages[recommendationDownloadedImagesIndex].thumbUrl != '' && recommendationImages[recommendationDownloadedImagesIndex].actualUrl == '')
    {
        imageType = 'thumb.png';
    }
    
    if(downloadedThumbs.indexOf(recommendationImages[recommendationDownloadedImagesIndex].itemId+imageType) == -1)
    {
        var fileTransfer = new FileTransfer();
        
        if(isOnline){
            filePath = globalPathNew + "images/"+ thumbId+imageName + ".png";
            if(url!="" ){
                fileTransfer.download(
                                      url,
                                      filePath,
                                      function(entry){
                                      recommendationDownloadedImagesIndex = recommendationDownloadedImagesIndex + 1;
                                      if(recommendationDownloadedImagesIndex < numberOfImagesToDownload)
                                      {
                                      downloadRecommendationImages();
                                      }
                                      },
                                      function(error) {
                                      console.log("download error source " + error.source);
                                      
                                      }
                                      );
            }
        }
    } else
    {
        recommendationDownloadedImagesIndex = recommendationDownloadedImagesIndex + 1;
        if(recommendationDownloadedImagesIndex < numberOfImagesToDownload)
        {
            downloadRecommendationImages();
        }
    }
    
}

// ---------------- Download Recommendation Images ------------------- //


// ---------------- Reco Flag Location Set ---------------------- //

function setRecommendationLocationFlag(recommendationFlagLocation)
{
    if(recommendationFlagLocation == 'home')
    {
        window.localStorage.setItem("recommendationFlagHome", true);
        window.localStorage.setItem("recommendationFlagDigital", false);
    } else if(recommendationFlagLocation == 'digital')
    {
        window.localStorage.setItem("recommendationFlagHome", false);
        window.localStorage.setItem("recommendationFlagDigital", true);
    }
}