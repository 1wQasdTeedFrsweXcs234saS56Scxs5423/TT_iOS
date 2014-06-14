var totalItemCount = 0;

function showSortedTAListing(curCatId, curCatName,sortBySubCat,sortByMediaType,sortByDate, sortByLang)
{
    totalItemCount = 0;
    
    defaultNavigate();
    
    selectedCategoryId = '';
    selectedCategoryName = '';
    
    selectedCategoryId = curCatId;
    selectedCategoryName = curCatName;
    
    var strHTMLshowTAList = "";
    var stringToDisplay = "";
    
    
    var resAudio = new Array();
    var resVideo = new Array();
    var resTechConf = new Array();
    
    
    var resPanelDiscussion = new Array();
    var resInterviews = new Array();
    var resTechnologySessions = new Array();
    
    var resDocument = new Array();
    var resEvent = new Array();
    
    var resSubcatList = new Array();
    //Start:akshay format change
    var resTechnologySessions = new Array();
    //End
    
    $('#sbmDiv').html('');
    $('#TAListResultContentArea').html('');
    $('#noTAListResultContentArea').html('');
    
    var subCategoryHTML = '<ul class="submenu1">';
    subCategoryHTML = subCategoryHTML + "<li><div style='style='width:100%;height:30px;margin-left:10px;'><a href='#' onclick='changeDropDown(topic,1,this)' style='font-weight:normal'>Topic</a></div></li>";
    
    resAudio = [];
    resVideo = [];
    resPanelDiscussion = [];
    resInterviews = [];
    resDocument = [];
    resEvent = [];
    resTechConf = [];
    resSubcatList = [];
    resFinal = [];
    resFinalLangAr = [];
    //Start:akshay format change
    resTechnologySessions = [];
    //End
    
    var mediaTypeForMessage = '';
    
    $.each(jsonData.category, function(key, item) {
           
           if(item.categoryid == curCatId &&  item.categoryname == curCatName){
           
           $.each(item.subCategory, function(key, subItem) {
                  resSubcatList.push(subItem.subCategoryName);
                  
                  subCategoryHTML += "<li><div style='style='width:100%;height:30px;margin-left:10px;font-size:medium;'><a href='#' onclick='changeDropDown(topic,1,this)' style='font-weight:normal'>"+subItem.subCategoryName+"</a></div></li>";
                  
                  if(sortBySubCat == 'false' && sortByMediaType == 'false'){
                  
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
                  $.each(subItem.techConf, function(key,confItem) {
                         if ($.inArray(confItem, resTechConf) == -1) {
                         resTechConf.push(confItem);
                         }
                         });
                  
                  $.each(subItem.document, function(key, documentItem) {
                         if ($.inArray(documentItem, resDocument) == -1) {
                         resDocument.push(documentItem);
                         }
                         });
                  
                  $.each(subItem.technologySessions, function(key, techSessItem) {
                         if ($.inArray(techSessItem, resTechnologySessions) == -1) {
                         resTechnologySessions.push(techSessItem);
                         }
                         });

                  }
                  if(sortBySubCat == 'false' && sortByMediaType != 'false'){
                  
                  if(sortByMediaType == 'audios' || sortByMediaType == 'Audios'){
                  
                  $.each(subItem.audio, function(key, audioItem) {
                         
                         if ($.inArray(audioItem, resAudio) == -1) {
                         resAudio.push(audioItem);
                         }
                         });
                  mediaTypeForMessage = 'Audios';
                  
                  }
                  
                  if(sortByMediaType == 'videos' || sortByMediaType == 'Videos'){
                  
                  $.each(subItem.video, function(key, videoItem) {
                         if ($.inArray(videoItem, resVideo) == -1) {
                         resVideo.push(videoItem);
                         }
                         });
                  
                  mediaTypeForMessage = 'Videos';
                  } 
                  
                  if(sortByMediaType == 'panelDiscussions' || sortByMediaType == 'Panel Discussions' || sortByMediaType == 'PanelDiscussions'){
                  
                  $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {
                         if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                         resPanelDiscussion.push(panelDiscussionsItem);
                         }
                         });
                  mediaTypeForMessage = 'Panel Discussions';
                  
                  }
                  
                  if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){
                  
                  $.each(subItem.interviews, function(key,interviewsItem) {
                         if ($.inArray(interviewsItem, resInterviews) == -1) {
                         resInterviews.push(interviewsItem);
                         }
                         });
                  mediaTypeForMessage = 'Interviews';
                  }
                  
                  if(sortByMediaType == 'documents' || sortByMediaType == 'Documents'){
                  
                  $.each(subItem.document, function(key, documentItem) {
                         if ($.inArray(documentItem, resDocument) == -1) {
                         resDocument.push(documentItem);
                         }
                         });
                  mediaTypeForMessage = 'Documents';
                  
                  }
                  
                  if(sortByMediaType == 'technologyConferences' || sortByMediaType == 'TechnologyConferences' || sortByMediaType == 'Technology Conferences' ){
                  
                  $.each(subItem.techConf, function(key,confItem) {
                         if ($.inArray(confItem, resTechConf) == -1) {
                         resTechConf.push(confItem);
                         }
                         });
                  mediaTypeForMessage = 'Technology Conferences';
                  
                  }
                  //Start:Akshay, format change
                  if (sortByMediaType == 'TechnologySessions' || sortByMediaType == 'Technology Sessions' || sortByMediaType == 'technologySessions' || sortByMediaType == 'technologysessions') {
                  $.each(subItem.technologySessions, function(key, sessItem) {
                         if ($.inArray(sessItem, resTechnologySessions) == -1) {
                         resTechnologySessions.push(sessItem);
                         }
                         });
                  
                  mediaTypeForMessage = 'Technology Sessions';
                  }
                  //End
                  }
                  
                  if(sortBySubCat != 'false' && sortByMediaType == 'false'){
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
                  
                  $.each(subItem.techConf, function(key,confItem) {
                         if ($.inArray(confItem, resTechConf) == -1) {
                         resTechConf.push(confItem);
                         }
                         });

                  $.each(subItem.technologySessions, function(key, sessItem) {
                         if ($.inArray(sessItem, resTechnologySessions) == -1) {
                         resTechnologySessions.push(sessItem);
                         }
                         });
                  }
                  }
                  
                  if(sortBySubCat != 'false' && sortByMediaType != 'false'){
                  if(sortBySubCat == subItem.subCategoryName){
                  if(sortByMediaType == 'audios' || sortByMediaType == 'Audios'){
                  $.each(subItem.audio, function(key, audioItem) {
                         if ($.inArray(audioItem, resAudio) == -1) {
                         resAudio.push(audioItem);
                         }
                         });
                  mediaTypeForMessage = 'Audios';
                  
                  }
                  if(sortByMediaType == 'videos' || sortByMediaType == 'Videos'){
                  
                  $.each(subItem.video, function(key, videoItem) {
                         if ($.inArray(videoItem, resVideo) == -1) {
                         resVideo.push(videoItem);
                         }
                         });
                  mediaTypeForMessage = 'Videos';
                  
                  } 
                  
                  if(sortByMediaType == 'panelDiscussions' || sortByMediaType == 'PanelDiscussions'){
                  
                  $.each(subItem.panelDiscussions, function(key, panelDiscussionsItem) {
                         if ($.inArray(panelDiscussionsItem, resPanelDiscussion) == -1) {
                         resPanelDiscussion.push(panelDiscussionsItem);
                         }
                         });
                  mediaTypeForMessage = 'Panel Discussions';
                  
                  }
                  
                  if(sortByMediaType == 'interviews' || sortByMediaType == 'Interviews'){
                  
                  $.each(subItem.interviews, function(key,interviewsItem) {
                         if ($.inArray(interviewsItem, resInterviews) == -1) {
                         resInterviews.push(interviewsItem);
                         }
                         });
                  mediaTypeForMessage = 'Interviews';
                  
                  }
                  
                  if(sortByMediaType == 'documents' || sortByMediaType == 'Documents'){
                  
                  $.each(subItem.document, function(key, documentItem) {
                         if ($.inArray(documentItem, resDocument) == -1) {
                         resDocument.push(documentItem);
                         }
                         });
                  mediaTypeForMessage = 'Documents';
                  
                  }
                  
                  if(sortByMediaType == 'TechnologyConferences' || sortByMediaType == 'Technology Conferences'){
                  
                  $.each(subItem.techConf, function(key,confItem) {
                         if ($.inArray(confItem, resTechConf) == -1) {
                         resTechConf.push(confItem);
                         }
                         });
                  mediaTypeForMessage = 'Technology Conferences';
                  
                  }
                  //Start:Akshay, format change
                  if (sortByMediaType == 'TechnologySessions' || sortByMediaType == 'Technology Sessions'
                      || sortByMediaType == 'technologySessions' || sortByMediaType == 'technologysessions') {
                  $.each(subItem.technologySessions, function(key, sessItem) {
                         if ($.inArray(sessItem, resTechnologySessions) == -1) {
                         resTechnologySessions.push(sessItem);
                         }
                         });
                  
                  mediaTypeForMessage = 'Technology Sessions';
                  }
                  //End
                  }
                  
                  }
                  });
           }
           });
    
    
    $.each(resAudio, function(key, itemRes) {
           $.each(jsonData.audio, function(key, itemAudio) {
                  if(sortByLang =='false'){
                  if(itemRes == itemAudio.itemId){
                  resFinal.push(itemAudio);
                  }
                  }else{
                  if((itemRes == itemAudio.itemId) && (itemAudio.selLanguage == sortByLang)){
                  resFinal.push(itemAudio);
                  }
                  }
                  });
           });
    
    $.each(resVideo, function(key, itemRes) {
           $.each(jsonData.video, function(key, itemVideo) {
                  if(sortByLang =='false'){
                  if(itemRes == itemVideo.itemId){
                  resFinal.push(itemVideo);
                  }
                  }else{
                  if((itemRes == itemVideo.itemId) && (itemVideo.selLanguage == sortByLang)){
                  resFinal.push(itemVideo);
                  }
                  }
                  });
           }); 
    
    $.each(resPanelDiscussion, function(key, itemRes) {
           $.each(jsonData.panelDiscussions, function(key, itemPanelDiscussions) {
                  if(sortByLang =='false'){
                  if(itemRes == itemPanelDiscussions.itemId){
                  resFinal.push(itemPanelDiscussions);
                  }
                  }else{
                  if((itemRes == itemPanelDiscussions.itemId) && (itemPanelDiscussions.selLanguage == sortByLang)){
                  resFinal.push(itemPanelDiscussions);
                  }
                  }
                  });
           });
    
    $.each(resInterviews, function(key, itemRes) {
           $.each(jsonData.interviews, function(key, itemInterviews) {
                  
                  if(sortByLang =='false'){
                  if(itemRes == itemInterviews.itemId){
                  resFinal.push(itemInterviews);
                  }
                  }else{
                  if((itemRes == itemInterviews.itemId) && (itemInterviews.selLanguage == sortByLang)){
                  resFinal.push(itemInterviews);
                  }
                  }
                  });
           });
    
    $.each(resDocument, function(key, itemRes) {
           $.each(jsonData.documents, function(key, itemDocument) {
                  if(sortByLang =='false'){
                  if(itemRes == itemDocument.itemId){
                  resFinal.push(itemDocument);
                  }
                  }else{
                  if((itemRes == itemDocument.itemId) && (itemDocument.selLanguage == sortByLang)){
                  resFinal.push(itemDocument);
                  }
                  }
                  });
           });
    
    $.each(resTechConf, function(key, itemRes) {
           $.each(jsonData.techConf, function(key, itemConf) {
                  if(sortByLang =='false'){
                  if(itemRes == itemConf.itemId){
                  resFinal.push(itemConf);
                  }
                  }else{
                  if((itemRes == itemConf.itemId) && (itemConf.selLanguage == sortByLang)){
                  resFinal.push(itemConf);
                  }
                  }
                  });
           });
    
   // alert(resTechnologySessions.length);
     $.each(resTechnologySessions, function(key, itemRes) {
           $.each(jsonData.technologySessions, function(key, itemSess) {
                  if (sortByLang == 'false') {
                  if (itemRes == itemSess.itemId) {
                    resFinal.push(itemSess);
                  }
                  } else {
                  if ((itemRes == itemSess.itemId) && (itemSess.selLanguage == sortByLang)) {
                    resFinal.push(itemSess);
                  }
                  }
                  });
           });
    
    
    
    if(resFinal.length == 0)
    {
        $("#numberOfItems").html("No Items");
    }
    
    subCategoryHTML = subCategoryHTML + "</ul>";
    
    $('#subCategoryList').html(subCategoryHTML);
    
    
    if(sortByDate == 'true'){
        
        resFinal.sort(function(a, b){
                      var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
                      return dateA-dateB;
                      });
    }else{
        resFinal.sort(function(a, b){
                      var dateA=new Date(a.publishedDate), dateB=new Date(b.publishedDate)
                      return dateB-dateA;
                      });
        
        
    }
    
    
    var count = 0;
    var test = '';
    var keyTemp = resFinal.length-1;
    
    if(resFinal.length){
        
        $.each(resFinal, function(key, itemRes) {
               
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
               totalItemCount++;
               test = getListElement(itemRes,-100,"techAreaList"+(1),0);
               
               }
               else
               {
               test = '';
               totalItemCount++;
               test = getListElement(itemRes,count,"techAreaList"+(key+1),key);
               
               }
               strHTMLshowTAList = strHTMLshowTAList + test;
               
               });
        
        if(resFinal.length > 5){
            
            strHTMLshowTAList += "<div class='linkTransition' id='loadmoreTAList' style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='showmoreresultTAlist(this)'><b>Load More Results</b></div>";
        }
        
        
        $('#TAListResultContentArea').html(strHTMLshowTAList);
        
    }else{
        
        var typeField = document.getElementById('type').innerHTML;
        var subCategoryField = document.getElementById('topic').innerHTML;
        renderItemCount(0);
        strHTMLshowTAList = displayMessage(sortBySubCat, sortByMediaType, sortByLang, mediaTypeForMessage);
        
        $('#noTAListResultContentArea').html(strHTMLshowTAList);
    }
    
    $('#selCatName').html(curCatName);
    
}


function displayMessage(sortBySubCat, sortByMediaType, sortByLang, mediaTypeForMessage)
{
    var returnStr = '';
    if(sortBySubCat!="false"  && sortByMediaType!="false" && sortByLang == 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+mediaTypeForMessage+'</b> in the topic <b>'+sortBySubCat+'</b>.</p>');
    }
    
    else if(sortBySubCat!="false"  && sortByMediaType!="false" && sortByLang != 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+mediaTypeForMessage+'</b> in the topic <b>'+sortBySubCat+' for '+sortByLangdisplay+'</b>.</p>');
        
    }
    else if(sortBySubCat!="false" && sortByMediaType =="false"  && sortByLang == 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang == 'en')
        {
            var sortByLangdisplay = 'English';
        }
        
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+sortBySubCat+'</b>.</p>');
        
    }
    else if(sortBySubCat!="false" && sortByMediaType =="false"  && sortByLang != 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+sortBySubCat+' for '+sortByLangdisplay+'</b>.</p>');
    }
    else if(sortBySubCat =="false" && sortByMediaType !="false" && sortByLang == "false")
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+mediaTypeForMessage+'</b>.</p>');
        
    }
    else if(sortBySubCat =="false" && sortByMediaType !="false" && sortByLang != "false")
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b>'+mediaTypeForMessage+'</b> for <b>'+sortByLangdisplay+'</b>.</p>');
        
    }
    else if(sortBySubCat == "false" && sortByMediaType =="false" && sortByLang == 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b> All</b> in the topic</p>');
    }
    else if(sortBySubCat == "false" && sortByMediaType =="false" && sortByLang != 'false')
    {
        if(sortByLang=='es')
        {
            var sortByLangdisplay = 'Spanish';
        }
        else if(sortByLang=='en')
        {
            var sortByLangdisplay = 'English';
        }
        $('#noTAListResultContentArea').html('<p style="margin-left:0.5%;font-size:small">No content is available for <b> '+sortByLangdisplay+'</b> in the topic</p>');
    }
    returnStr = $('#noTAListResultContentArea').html();
    return returnStr;
}