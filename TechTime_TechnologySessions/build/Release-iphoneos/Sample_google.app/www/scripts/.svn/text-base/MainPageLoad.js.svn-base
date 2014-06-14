
//----------------------------------- Global Variable used -----------------------------------------------------------------

    var noSubscribe = "false";
    var subscribeCatList = '';

    var jsonData = new Object();
    var downloadJson = new Object();


    var previousUSer = new Object();

    var mainCategoryList = new Array();    //used

    var audioListItem = new Array();       // not used
    var videoListItem = new Array();       // not used

    var eventListItem = new Array();
    var documentListItem = new Array();

    var contributorListItem = new Array();
    var downloadListItemLinks = new Array();
    
//----------------------------------- FOR COPY THE CATEGOEY ID IN ARRAY -----------------------------------------------------------------

    var audioVideoItemId = new Array();
    var eventItemId = new Array();
    var documentItemId = new Array();

//----------------------------------- Subscription Variable -----------------------------------------------------------------

    var subscribeCategoryId = new Array();          // LIST OF CATEGORIED REGISTERED
    var isSubscribeDocument = "no";                 // Document are Subscribe or not ??
    var isSubscribePodcast = "no";                  // Podcast are Subscribe or not ??

//----------------------------------- PREVIOUS USER --------------------------------------------------------------------------------
    var previousLoggedUser = '';

//----------------------------------- RSS LINKS --------------------------------------------------------------------------------

    var subscribeRss = "https://techtime.accenture.com/techtimemobile/subscribe-service/uid=";
    var technologyAreaListUrl = "https://techtime.accenture.com/techtimemobile/subscribe-service/all";

    var rssUrl = "https://techtime.accenture.com/techno-areas/1+2/audio-video-listing-view";
    var documentRss = "https://techtime.accenture.com/techno-areas/1+2/documents-listing-view";
    var eventsRss = "https://techtime.accenture.com/techno-areas/1+2/events-listing-view";

    var contributorRss = "https://techtime.accenture.com/mobile-contributor-listing.xml";
    var spotlightRss = "https://techtime.accenture.com/mobile-spotlight-feeds.xml";
    var aboutTechTimeRss = "https://techtime.accenture.com/mobile-about-us/aboutus.xml";
    var faqRss = "https://techtime.accenture.com/mobile-faq-rss/faq.xml";

//----------------------------------- Create JSON Structure --------------------------------------------------------------------------------

    var selectedCategoryId='';
    var selectedCategoryName='';

    var resFinal = new Array();

//----------------------------------- Create JSON Structure --------------------------------------------------------------------------------

function createJsonFormat()
{
        jsonData.category =new Array();
        jsonData.audio =new Array();
        jsonData.video =new Array();
        jsonData.events =new Array();
        jsonData.panelDiscussions =new Array();
        jsonData.interviews =new Array();
        jsonData.documents =new Array();
        jsonData.spotLight = new Array();
        jsonData.contributor = new Array();
        jsonData.aboutTechTime = new Array();
        jsonData.faq = new Array();
        jsonData.loggedUserName = '';
        jsonData.pendingDownloads = new Array();
    
    
    console.log("**createJsonFormat JSON FORMAT ----------> " + JSON.stringify(jsonData));
    
    var dd = new Date();
    
//    console.log('********* createJsonFormat :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    
    }


function createDownloadJsonFormat(){
    downloadJson.finalDownload =new Array();
}


//----------------------------------- Get Subscribe Technology Areas List with Type -------------------------

function getSubscribeRss()
{   
    
    var dd = new Date();
//    console.log('********* getSubscribeRss :'+(dd.getTime()-d.getTime())/1000);
    d = dd;
    
    
    var uName = document.getElementById("lblUserName").innerHTML;
        uName = uName.replace(/\./g, '_');
     
        window.localStorage.setItem("userName", uName);
        jsonData.loggedUserName = uName; 
        
        subscribeRss = "https://techtime.accenture.com/techtimemobile/subscribe-service/uid=";       
        subscribeRss = subscribeRss + uName;
    
    //alert('subscribeRss :-->'+subscribeRss);
        
        
          
            $.ajax({
                   type : "GET",
                   url : subscribeRss,
                   dataType : "xml",
                   success : subscribeTA,
                   error : function(xhr, textStatus, errorThrown) {
                           //alert('error subscribe');
                   
//                         console.log('*******************************************************')
                           console.log('In Failure'+JSON.stringify(xhr));
//                         console.log("textStatus:"+textStatus + ':' + errorThrown);
//                         console.log('*******************************************************')
                   }
            });
}

function subscribeTA(xml)
{
    var dd = new Date();
    console.log('********* subscribeTA :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    var flag = 0;
    
    $(xml).find('item').each(function(){                                            // FIND PARENT  CATEGORY
        
        var scategoryid = $(this).find('categoryid').text();
        var asset_type =   $(this).find('asset_type').text();   
        var scategoryname =   $(this).find('categoryname').text(); 
            
                             
                            // alert('scategoryname :'+scategoryname);
                             
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
        flag = 1;
    });
    
  //  console.log('-------->>>>>>>subscribeCatList :'+subscribeCatList);
    
    if(subscribeCatList == ""){
        subscribeCatList = '0';
    }else{
        rssUrl = "https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/audio-video-listing-view";
        eventsRss = "https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/events-listing-view";
        documentRss = "https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/documents-listing-view";
    }
    
    loadtechnologyAreaListUrl();    
    
    
    
}


//----------------------------------- Load Main category RSS and Create list of Main- Sub category List -------------------------




function loadtechnologyAreaListUrl() {
    
	$.ajax({
            type : "GET",
            url : technologyAreaListUrl,
            dataType : "xml",
            success : displayTAList,
            error : function(xhr, textStatus, errorThrown) {
                        //alert('error audio');
//                        console.log('*******************************************************')
                        console.log('In Failure'+JSON.stringify(xhr));
//                        console.log("textStatus:"+textStatus + ':' + errorThrown);
//                        console.log('*******************************************************')
            }
    });
}

function displayTAList(xml)
{
    var dd = new Date();
    console.log('********* displayTAList :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    
    //alert('subscribeCategoryId Array --> '+subscribeCategoryId);                  // LIST OF CATEGORIED REGISTERED
    
    $(xml).find('item').each(function(){                                            // FIND PARENT  CATEGORY
                             
        if($(this).find('parentcategoryid').text() == '0'){
                             
                var flagId = "false";
                var id = $(this).find('categoryid').text();
                             
                $.each(subscribeCategoryId, function(index, catid) {                               // Check for the subscription
                       
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
                         
                         mainCategoryList.push(mainCat);
                }            
        } // IF
    });
    
    $.each(mainCategoryList, function(index, item) {                               // FIND SUB-CATEGORY FOR PARENT CATEGORY
           
           var subCategoryList = new Array();
           
           var subCat = new Object();                                                   // PUSHING PARENT ELEMENT AS SUB CATEGORY ONLY
               subCat.categoryid = item.categoryid;
               subCat.parentcategoryid = item.categoryid;
               subCat.subCategoryName = item.categoryname;
               subCat.audio = new Array();
               subCat.video = new Array();
               subCat.interviews = new Array();
               subCat.panelDiscussions = new Array();
               subCat.document = new Array();
               subCat.event = new Array();
               subCat.contributor = new Array();
               
               subCategoryList.push(subCat);
           
           console.log("**subCategoryList ----> " + JSON.stringify(subCategoryList));
           
           $(xml).find('item').each(function(){                                        // FIND ANOTHER SUB CATEGORY AND PUSH IT TO ARRAY AS A SUB-CATEGORY
                                    
                if($(this).find('parentcategoryid').text() == item.categoryid){
                                    
                    var subCat = new Object();
                        subCat.categoryid = $(this).find('categoryid').text();
                        subCat.parentcategoryid = $(this).find('parentcategoryid').text();
                        subCat.subCategoryName = $(this).find('categoryname').text();
                        
                        subCat.audio = new Array();
                        subCat.video = new Array();
                        subCat.interviews = new Array();
                        subCat.panelDiscussions = new Array();
                        subCat.document = new Array();
                        subCat.event = new Array();
                        subCat.contributor = new Array();
                                    
                        subCategoryList.push(subCat);
                }
            console.log("***subCategoryList ----> " + JSON.stringify(subCategoryList));                        
                                    
            }); 
           
           item.subCategory = subCategoryList;
           item.subCategoryCount = subCategoryList.length;
    });
    
    
    $.each(mainCategoryList, function(index, item) {
           
           jsonData.category.push(item);
    });
    
    
    loadAudioVideoURL();
    
    
    
    
}

//---------------------------------------- find Audio and Video List and isnert them into array ---------------------------------------------

function loadAudioVideoURL() {
    
    var dd = new Date();
    console.log('********* getAudioVideoItem 11111:'+(dd.getTime()-d.getTime())/1000);
    d = dd;
    
    
    $.ajax({
           type : "GET",
           url : rssUrl,
           dataType : "xml",
           success : getAudioVideoItem,
           error : function(xhr, textStatus, errorThrown) {
                   //alert('error audio');
//                   console.log('*******************************************************')
                   console.log('In Failure'+JSON.stringify(xhr));
//                   console.log("textStatus:"+textStatus + ':' + errorThrown);
//                   console.log('*******************************************************')
           }
    });
}

function getAudioVideoItem(xml)
{
    var dd = new Date();
    console.log('********* getAudioVideoItem 2222:'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    $(xml).find('item').each(function(){
                             
    try{     
         var audioLength = '';
         var videoLength = '';
         var presentationLength = '';
         var transcriptLength = '';
         
         var scategory = $(this).find('category').text();
        
         var sguid = $(this).find('contentid').text();
         var sTitle = $(this).find('title').text();
         var sFormat =  $(this).find('pods_formattype').text();
            
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
         
                             //console.log('tempMedia----->'+sguid+'--Title ->'+sTitle+'--type :'+sFormat);

                             
      
                             
                             
         if (jQuery.inArray(sguid,audioVideoItemId)== -1) {
             audioVideoItemId.push(sguid);
             //console.log('inserted :'+sguid);
                             
         var tempMedia = new Object();
             
             tempMedia.itemId = sguid;
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
                             
                             
          
        //alert('*************\n\n imgThumb -->'+imgThumb+'\n\n imgActual -->'+imgActual);
                         
         if(sFormat == "Audios"){
                             
            jsonData.audio.push(tempMedia);
                             
         }else if(sFormat == "Videos"){
                             
            jsonData.video.push(tempMedia);
                        //console.log('tempMedia -->'+tempMedia.itemId+'imgActual -->'+tempMedia.title);                                  
                         
         }else if(sFormat == "Panel Discussions"){
                             
            jsonData.panelDiscussions.push(tempMedia);
                         
          }else if(sFormat == "Interviews"){     // Interviews
                             
            jsonData.interviews.push(tempMedia);
         }          
              
        var str = JSON.stringify(scategory);
                             
                             
                             
                             
         str =   str.substring(1,str.length);
                     
         var beg, end, temp, tempSubId;
         var len = str.length;
         
         beg = 0;
         
         while (len !== 0 && end != 0 && str != "")
         {
                             
                             str = str.substring(0, str.length-1);
                             
                             // split on ","
                             var n=str.split("|");
                             
                             //console.log("n.length--->>"+n.length);
                             
                             // String[] names = str.split("|",\"");
                           
         
                 end = str.indexOf("-") + 1;
                 beg = str.indexOf("|");
                 len = str.length;
                 
                 temp = str.substring(0,end-1);
                             
                //tempSubId = str.substring(end,str.length-1);
                             
                           
                          
                           //  alert(tempSubId);
                    
                //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                     
                $.each(jsonData.category, function(index, item) {
                     
                       
                       $.each(item.subCategory, function(index, item) {
                              
                             // alert(n.length);
                              for(var i = 0; i < n.length;i++)
                              {
                               var tempSubId = n[i].substring(n[i].indexOf("-")+1,n[i].length);
                              //console.log("tempSubId"+tempSubId);
                                //if(item.subCategoryName==temp )
                              if(tempSubId == item.categoryid)
                                      {
                                     
                                          if(sFormat == "Audios"){
                                          item.audio.push(sguid);                     // alert('id ->'+sguid+'\n category matched -->'+temp+'\n Audios -->');
                                          }else if(sFormat == "Videos"){
                                          item.video.push(sguid);                     // alert('id ->'+sguid+'\n category matched -->'+temp+'\n Videos -->');
                                          }else if(sFormat == "Panel Discussions"){
                                          item.panelDiscussions.push(sguid);          // alert('id ->'+sguid+'\n category matched -->'+temp+'\n Panel Discussions -->');
                                          }else{
                                          item.interviews.push(sguid);                //alert('interviews id ->'+sguid+'\n category matched -->'+temp+'\n interviews -->');
                                          }
                                      }
                              }
                              });
                       
                      
                       });
                
                             
                //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                             
                 if(beg == -1 ){
                 len = 0;
                             }
                 
                 if(end == 0 ){
                 len = 0;
                             }
                 
                 temp = str.substring(beg+1,str.length);
                 str = temp;
                 
                 }// while
                             
         }else{
//         console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
         }  
                     
        }
        catch(error)
        {
            var txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                alert(txt);                 
        }
    });
    
    
    loadEventsRss();
    
        
    
//    alert('Audio length-->'+jsonData.audio.length);
//    alert('Video length-->'+jsonData.video.length);   
//    alert('interview length-->'+jsonData.interviews.length);
//    alert('panneldiscussion length-->'+jsonData.panelDiscussions.length);  
//    alert('AUDIO VIDEO Complete .');
//    alert('Audio Video Complete...');
//    alert(' Audio Elements: '+JSON.stringify(jsonData.audio));
//    alert(' Video Elements: '+JSON.stringify(jsonData.video));
//    console.log('Vikram category Elements: \n\n'+JSON.stringify(jsonData.category));
//    console.log('Vikram JSON video : \n\n'+JSON.stringify(jsonData.video));
//    console.log('Vikram JSON AUDIO : \n\n'+JSON.stringify(jsonData.audio));
    
}


//------------------------------------------------------- LOAD Events RSS FROM RSS URL   ------------------------------------------------


function loadEventsRss() {
    
    $.ajax({
           type : "GET",
           url : eventsRss,
           dataType : "xml",
           success : getEventItem,
           error : function(xhr, textStatus, errorThrown) {
//                   console.log('*******************************************************');
                   console.log('In Failure'+JSON.stringify(xhr));
//                   console.log('Event error \n'+textStatus);
//                   console.log("textStatus:"+textStatus + ':' + errorThrown);
//                   console.log('*******************************************************');
           }
   });
}

function getEventItem(xml)
{   
    var dd = new Date();
    console.log('********* getEventItem :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    var monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    $(xml).find('item').each(function() {
                             
     try{                     

         var thumbLength, actualLength;
                         
         var scategory = $(this).find('category').text();
         var sicsfile = $(this).find('icsfile').text();
         
         var sguid = $(this).find('contentid').text();
         var sTitle = $(this).find('title').text();
         var sFormat =  $(this).find('content_type').text();            // events
                         
         var sauthor_count = $(this).find('author_count').text();
         var sauthor = $(this).find('author').text().replace(/\|/g,',');
         var sdescription = $(this).find('description').text(); 
         
         var sdate = $(this).find('event_sdate').text();
         var sstart_date = $(this).find('event_sdate').text();
         var send_date = $(this).find('event_edate').text();
                         
         var sThumb = $(this).find('thumb').text();
         var sActual = $(this).find('actual').text();
         
         var etime = $(this).find('etime').text();
        
         
//         var dateString = sstart_date; 
//             dateString = dateString.substr(0,10);
//                         
//         var monthName = parseInt(dateString.substr(5,2)-1);
//             dateString = monthArr[monthName] +" "+ dateString.substr(8,2) +", " + dateString.substr(0,4);
                         
         $(this).find('thumb').each(function() {
            thumbLength = $(this).attr('length');
         });

         $(this).find('actual').each(function() {
            actualLength = $(this).attr('length');
         }); 

//         if ($.inArray(eventItemId, sguid) == -1) {
//                 eventItemId.push(sguid);
//         }  
                         
         var authorArray = new Array();
         var authorTextArray = sauthor.split(",");
         
         for(i=0;i<authorTextArray.length;i++){
             authorArray.push(authorTextArray[i]);
         }          
                             
                             
 if (jQuery.inArray(sguid,eventItemId)== -1) {
                             
         eventItemId.push(sguid);               //console.log('inserted :'+sguid);
                         
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
                     
                     //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                     
                     $.each(jsonData.category, function(index, item) {
                            
                            $.each(item.subCategory, function(index, item) {
                                   
                                if(item.subCategoryName == temp){
                                   
                                   item.event.push(sguid);          //  alert('id ->'+sguid+'\n category matched -->'+temp+'\n data -->'+JSON.stringify(tempMedia));
                                }
                            });
                    });
                     
                     //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                     
                     if(beg == -1 ){
                     len = 0;
                     }
                     
                     if(end == 0 ){
                     len = 0;
                     }
                     
                     temp = str.substring(beg+1,str.length);
                     str = temp;
                  }// while
                             
                     }else{
//                     console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
                     } 
                             
                }
                catch(error)
                {
                     var txt="There was an error on this page.\n\n";
                     txt+="Error description: " + err.message + "\n\n";
                     txt+="Click OK to continue.\n\n";
                     alert(txt);                 
                }
        });
    
    loadDocumentRss();
    
    
       
    
    //console.log('eventItemId-->\n\n'+eventItemId)
    //alert('jsonData.events -->'+jsonData.events.length);
    //alert('jsonData.Data -->'+JSON.stringify(jsonData.events));
//    console.log('Events  Complete .');
    //alert('eventItemId -->>>'+eventItemId);
//    console.log('eventd length-->>>'+jsonData.event.length);
//    console.log('Documents Data ----->'+JSON.stringify(jsonData.documents));
//    console.log('Documents Data ----->'+JSON.stringify(jsonData.category));
//    console.log('Vikram Audio Elements: '+JSON.stringify(jsonData.audio));
//    console.log('Vikram Video Elements: '+JSON.stringify(jsonData.video));
    
}


//--------------------------------------------- LOAD Document RSS FROM RSS URL   -------------------------------------------------

function loadDocumentRss() 
{   
    $.ajax({
           type : "GET",
           url : documentRss,
           dataType : "xml",
           success : getDocumentItem,
           error : function(xhr, textStatus, errorThrown) {
               //alert('error document');
//               console.log('*******************************************************')
               console.log('In Failure'+JSON.stringify(xhr));
//               console.log("textStatus:"+textStatus + ':' + errorThrown);
//               console.log('*******************************************************')
           }
           });
}

function getDocumentItem(xml)
{
    var dd = new Date();
    console.log('********* getDocumentItem :'+(dd.getTime()-d.getTime())/1000);

     d = dd;
    
    $(xml).find('item').each(function() {
                             
    try{                     
                             
         var thumbLength, actualLength,spdfLength;
         
         var scategory = $(this).find('category').text();
         
         var sguid = $(this).find('contentid').text();
         var sTitle = $(this).find('title').text();
         var sdescription = $(this).find('description').text(); 
         
         var sFormat =  $(this).find('content_type').text();            // documents
         var sauthor = $(this).find('author').text().replace(/\|/g,',');
         
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
 
         documentItemId.push(sguid);               //console.log('inserted :'+sguid);
                             
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
                                 
                 
                 jsonData.documents.push(tempMedia);
                                 
                                 
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
                         
                         //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                         
                         $.each(jsonData.category, function(index, item) {
                                
                                $.each(item.subCategory, function(index, item) {
                                       
                                    if(item.subCategoryName == temp){
                                    
                                       item.document.push(sguid);               //  alert('id ->'+sguid+'\n category matched -->'+temp+'\n data -->'+JSON.stringify(tempMedia));
                                    }
                                });
                         });
                         //  ---------------------------------------------FOR EACH CATEGORY IN THE CATEGORY LIST OF INSIDE <ITEM> <CATEGORY>   ---------------------------------------------
                         
                         if(beg == -1 ){
                         len = 0;
                         }
                         if(end == 0 ){
                         len = 0;
                         }
                         
                         temp = str.substring(beg+1,str.length);
                         str = temp;
                                 
                     }// while
                             
             }else{
//             console.log('Duplicate item inserted :'+sguid+' : '+sFormat);
             } 
         
        }
        catch(error)
        {
            var txt="There was an error on this page.\n\n";
                txt+="Error description: " + err.message + "\n\n";
                txt+="Click OK to continue.\n\n";
                alert(txt);                 
        }
    });
    
    
    loadContributorRss();          
    
    
    $.mobile.changePage("#businessCategory");
    $("#imgRefreshProgress").hide();
    
    if(isOnline) {
        getFileSystemRefForReading(false, jsonData);
    }
    
    
    
    

    
    
}

//--------------------------------------------- LOAD Contributor RSS FROM RSS URL   -------------------------------------------------

function loadContributorRss() {
	
	$.ajax({
           type : "GET",
           url : contributorRss,
           dataType : "xml",
           success : loadContributorData,
           error : function(xhr, textStatus, errorThrown) {
                   //alert('error contributor');
//                   console.log('*******************************************************');
                   console.log('In Failure'+JSON.stringify(xhr));
//                   console.log("textStatus:"+textStatus + ':' + errorThrown);
//                   console.log('*******************************************************');
           }
    });
    
    loadSpotlightUrl();            
    
    loadFaqRss();
    
    loadAboutTechTimeRss();
    
//    console.log('-------->>>>>>>>>>>>> JOSON DATA write --->>> ');
//    console.log(''+JSON.stringify(jsonData));
//    console.log('-------->>>>>>>>>>>>> JOSON DATA write --->>> ');
//    
    
    
}

function loadContributorData(xml)
{   
    var dd = new Date();
    console.log('********* loadContributorData :'+(dd.getTime()-d.getTime())/1000);
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
                             
             jsonData.contributor.push(itemContributor);                    
        }
        catch(error)
        {
         var txt="There was an error on this page.\n\n";
             txt+="Error description: " + err.message + "\n\n";
             txt+="Click OK to continue.\n\n";
             alert(txt);                 
        }
    });
    getFileSystemRefForWriting(jsonData);
    
    
   
    
   }


//--------------------------------------------- LOAD SPOTLIGHT RSS FROM RSS URL   ------------------------------------------------------------------------------------------

function loadSpotlightUrl() 
{
    $.ajax({
           type : "GET",
           url : spotlightRss,
           dataType : "xml",
           success : loadSpotlight,
           error : function(xhr, textStatus, errorThrown) {
//               console.log('********************** SPOTLIGHT *********************************');
               console.log('In Failure'+JSON.stringify(xhr));
//               console.log("textStatus:"+textStatus + ':' + errorThrown);
//               console.log('*******************************************************');
           }
    });
}

function loadSpotlight(xml)
{   
    var dd = new Date();
    console.log('********* loadSpotlight :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
    $(xml).find('item').each(function(){
                             
    try{  
         var sguid = $(this).find('contentid').text();
         var scontenttype = $(this).find('contenttype').text();                      
         var sformattype = $(this).find('formattype').text();  //  alert('Spotlight Type -->'+scontenttype); ------------> podcast     documents      events       contributor
                             
         if(scontenttype == 'podcast'){                                            // alert('--> podcast');
                             
                 if(sformattype == "Audios"){
                             
                        $.each(jsonData.audio, function(index, item) {
                                    
                            if(item.itemId == sguid){                              //alert('Audio Item In spotlight -->>\n\n'+JSON.stringify(item));
                                    jsonData.spotLight.push(item);
                            }
                        });
                             
                 }else if(sformattype == "Videos"){
                             
                        $.each(jsonData.video, function(index, item) {
                                    
                            if(item.itemId == sguid){                               //alert('Video Item In spotlight -->>\n\n'+JSON.stringify(item));
                               
                                    jsonData.spotLight.push(item);
                            }
                        });
                             
                 }else if(sformattype == "Panel Discussions"){
                             
                        $.each(jsonData.panelDiscussions, function(index, item) {
                                    
                            if(item.itemId == sguid){                               //alert('Panel Discussions Item In spotlight -->>\n\n'+JSON.stringify(item));
                               
                                    jsonData.spotLight.push(item);
                            }
                        });
                  }else{           
                 
                        $.each(jsonData.interviews, function(index, item) {
                                    
                            if(item.itemId == sguid){                               //alert('interviews Item In spotlight -->>\n\n'+JSON.stringify(item));
                               
                                    jsonData.spotLight.push(item);
                            }
                        });
                  }
                             
                             
        }else if(scontenttype == 'documents'){                                      //alert('--> documents');
                             
                 $.each(jsonData.document, function(index, item) {
                        
                    if(item.itemId == sguid){                                       //alert('documents Item In spotlight -->>\n\n'+JSON.stringify(item));
                        
                        jsonData.spotLight.push(item);
                    }
                        
                });              
                             
         
         }else if(scontenttype == 'events'){  
                             
                 $.each(jsonData.events, function(index, item) {
                        
                    if(item.itemId == sguid){                                       //alert('events Item In spotlight -->>\n\n'+JSON.stringify(item));
                        
                        jsonData.spotLight.push(item);
                    }
                        
                });
         
         }else if(scontenttype == 'contributor'){                                   // alert('--> contributor');
                             
                $.each(jsonData.contributor, function(index, item) {
                                    
                    if(item.itemId == sguid){                                       //alert('events Item In spotlight -->>\n\n'+JSON.stringify(item));
                       
                        jsonData.spotLight.push(item);
                    }
                                    
                });
                             
         }else{}
                             
    }  
    catch(error)
         {
             var txt="There was an error on this page.\n\n";
             txt+="Error description: " + err.message + "\n\n";
             txt+="Click OK to continue.\n\n";
             alert(txt);                 
         }
    });
    
    
    
}

//--------------------------------------------- LOAD FAQ RSS FROM RSS URL   ------------------------------------------------------------------------------------------

function loadFaqRss() 
{   
	$.ajax({
           type : "GET",
           url : faqRss,
           dataType : "xml",
           success : loadFaq,
           error : function(xhr, textStatus, errorThrown) {
               //alert('error faq');
//               console.log('******************* FAQ ************************************');
               console.log('In Failure'+JSON.stringify(xhr));
//               console.log("textStatus:"+textStatus + ':' + errorThrown);
//               console.log('*******************************************************');
           }
    });
}

function loadFaq(xml)
{   
    var dd = new Date();
    console.log('********* loadFaq :'+(dd.getTime()-d.getTime())/1000);
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
         alert(txt);                 
     }
                              
    });

    
    getFileSystemRefForWriting(jsonData);
    
}


//--------------------------------------------- LOAD ABOUT TECHTIME RSS URL   ------------------------------------------------------------------------------------------

function loadAboutTechTimeRss() 
{
	$.ajax({
           type : "GET",
           url : aboutTechTimeRss,
           dataType : "xml",
           success : loadAboutTechTime,
           error : function(xhr, textStatus, errorThrown) {
               //alert('error about');
//               console.log('******************* ABOUT TECHTIME ************************************');
               console.log('In Failure'+JSON.stringify(xhr));
//               console.log("textStatus:"+textStatus + ':' + errorThrown);
//               console.log('*******************************************************');
           }
    });
}

function loadAboutTechTime(xml)
{  
    var dd = new Date();
    console.log('********* loadAboutTechTime :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
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
             alert(txt);                 
         }
         
    });
    
    getFileSystemRefForWriting(jsonData);

    
    
    
    
}


//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------
//--------------------------------------------- OFFLINE   ---------------------------------------------------OFFLINE  ---------------------------------------


function createJsonFormatOffline(Obj)
{
    jsonData = Obj;             //  alert('JSON STRUCTURE Complete \n\n'+JSON.stringify(jsonData));
    
    if(Obj){
        
//        $.mobile.changePage("#businessCategory");
//        $("#imgRefreshProgress").hide();
        noSubscribe = 'true';
        
        $.mobile.changePage("#businessCategory");
        $("#imgRefreshProgress").hide();

        
    }else{
//       jAlert('If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content. Please close the application and connect to Internet.', 'Tech Time');
        
        $('#errormsg').html('If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.');
        
        $.mobile.changePage("#loggedOutPage");
        $("#imgRefreshProgress").hide();
        
    }
    
    
    
}


function startThumbnailDownload()
{

    var dataTemp = jsonData;
    
//    console.log('Data json length : '+JSON.stringify(dataTemp));
//    console.log('Data json length : '+JSON.stringify(jsonData));
    
    dataTemp = jsonData;
    
//    console.log('Data json length : '+JSON.stringify(dataTemp));
//    console.log('Data json length : '+JSON.stringify(jsonData));
    
    compareAndUpdateJSON1(dataTemp);
    

}


function compareAndUpdateJSON1(data) 
{   
    
    var dd = new Date();
    console.log('********* compareAndUpdateJSON1 :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
//    alert('Old -->'+JSON.stringify(data.loggedUserName)+' ---New -->'+JSON.stringify(jsonData.loggedUserName));
    
    
    
    var countTempThumb = 0;
    var countTempActual = 0;
    
    
  //  console.log('pending download -->'+JSON.stringify(data.pendingDownloads));
    
    document.getElementById("showProgressBar").innerHTML = '';
    
    $.each(data.pendingDownloads, function(key,newItem){
           
//           console.log('pending download '+(key+1)+' -->'+JSON.stringify(newItem));
           
           
           var downloadIdtest = newItem.elementId;
           var downloadtitletest = newItem.elementTitle;
           var isDownloadedFlag = newItem.isDownloadedFlag;
           var elementAudio = newItem.elementAudio;
           var val = newItem.val;
           
           
           downloadFile(downloadIdtest,downloadtitletest,isDownloadedFlag,elementAudio,val);
           
           
    }); 
   
  //  console.log("OLD DATA ----> " + JSON.stringify(data));
    
    $.each(data.documents, function(key, oldItem){
           
           if(oldItem.isDownloaded == 'true'){
               
               $.each(jsonData.documents, function(key, newItem){
                      
                    if(oldItem.itemId == newItem.itemId){
                      
//                      console.log('--->>>> DONE '+oldItem.title);
                      newItem.isDownloaded = oldItem.isDownloaded;
                      newItem.localPath = oldItem.localPath;
                    }
                });
            }
           
//           console.log('\n\Rashu ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                           if(oldItem.thumbLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                   countTempThumb++;
                           }else{
                           
                                   $.each(jsonData.documents, function(key, newItem){
                                  
                                      if(oldItem.itemId == newItem.itemId){
                                      
                                          newItem.thumbLocal = oldItem.thumbLocal;
//                                          console.log('thumbnail documents replaceeeeeeeeeeeeeeeeeeeeeee');
                                      }
                                  });    
                           }
                           
                           if(oldItem.actualLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                                   countTempActual++;
                           }else{
                                   $.each(jsonData.documents, function(key, newItem){
                                  
                                      if(oldItem.itemId == newItem.itemId){
                                      
                                          newItem.actualLocal = oldItem.actualLocal;
//                                          console.log('actual documents replaceeeeeeeeeeeeeeeeeeeeeee');
                                      }
                                  });    
                           }
    });
    
    
    
    
    
    $.each(data.audio, function(key, oldItem){
           
    if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' )
           {
           
                           $.each(jsonData.audio, function(key, newItem){
                                  
                                if(oldItem.itemId == newItem.itemId){
                                  
//                                      console.log('Audio--->>>> $$$$$ '+oldItem.title);
                                      
                                      newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                                      newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                                      newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                                      newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                                      
                                      newItem.localPathAudio = oldItem.localPathAudio;
                                      newItem.localPathVideo = oldItem.localPathVideo;
                                      newItem.localPathTranscript = oldItem.localPathTranscript;
                                      newItem.localPathPresentation = oldItem.localPathPresentation;
                                  
                                  newItem.downloadedDateA = oldItem.downloadedDateA;
                                  newItem.downloadedDateV = oldItem.downloadedDateV;
                                  newItem.downloadedDateT = oldItem.downloadedDateT;
                                  newItem.downloadedDateP = oldItem.downloadedDateP;
                                  }
                            });
            }
           
           
//           console.log('\n\nvikram ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
           
                           if(oldItem.thumbLocal == ''){
           
                                downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                   countTempThumb++;
                           }else{
           
                                $.each(jsonData.audio, function(key, newItem){
                                    if(oldItem.itemId == newItem.itemId){
                                       newItem.thumbLocal = oldItem.thumbLocal;
//                                       console.log('thumbnail replaceeeeeeeeeeeeeeeeeeeeeee');
                                    }
                                });    
                          }
                           
                           if(oldItem.actualLocal == ''){
           
                                   downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                                   countTempActual++;
                           }else{
                                   $.each(jsonData.audio, function(key, newItem){
                                        if(oldItem.itemId == newItem.itemId){
                                          newItem.actualLocal = oldItem.actualLocal;
//                                          console.log('actual replaceeeeeeeeeeeeeeeeeeeeeee');
                                        }
                                   });    
                           }
   });
    
    $.each(data.video, function(key, oldItem){
           
           
        if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true' ){
           
                   $.each(jsonData.video, function(key, newItem){
                          
                          console.log('Presnetation--->>>>'+newItem.itemId+'-->'+newItem.isDownloadedPresentation+ oldItem.isDownloadedPresentation);
                          
                          if(oldItem.itemId == newItem.itemId){
                         
                          newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                          newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                          newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                          newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                          
                          newItem.localPathAudio = oldItem.localPathAudio;
                          newItem.localPathVideo = oldItem.localPathVideo;
                          newItem.localPathTranscript = oldItem.localPathTranscript;
                          newItem.localPathPresentation = oldItem.localPathPresentation;
                          
                          newItem.downloadedDateA = oldItem.downloadedDateA;
                          newItem.downloadedDateV = oldItem.downloadedDateV;
                          newItem.downloadedDateT = oldItem.downloadedDateT;
                          newItem.downloadedDateP = oldItem.downloadedDateP;
                        }

                    });
           }
           
     //      console.log('\n\chetan ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                       if(oldItem.thumbLocal == ''){
                       
                           downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                           countTempActual++;
                            countTempThumb++;
      //     console.log('video thumbnail Video new');
           
                       }else{
                       
                              $.each(jsonData.video, function(key, newItem){
                                     
                                  if(oldItem.itemId == newItem.itemId){
                                     
                                      newItem.thumbLocal = oldItem.thumbLocal;
                                    //  console.log('video thumbnail Video replaceeeeeeeeeeeeeeeeeeeeeee');
                                  }
                              });    
                       }
                       
                       if(oldItem.actualLocal == ''){
                       
                               downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                               countTempActual++;
          // console.log('video thumbnail Video new');
                       }else{
                              $.each(jsonData.video, function(key, newItem){
                              
                                  if(oldItem.itemId == newItem.itemId){
                                     
                                      newItem.actualLocal = oldItem.actualLocal;
                                      //console.log('video  actual Video replaceeeeeeeeeeeeeeeeeeeeeee');
                                  }
                              });    
                       }
           
    });
    
    $.each(data.panelDiscussions, function(key, oldItem){
           
        if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true'){
           
           $.each(jsonData.panelDiscussions, function(key, newItem){
                  
                  if(oldItem.itemId == newItem.itemId){
                  
//                  console.log('panelDiscussions--->>>> $$$$$ '+oldItem.title);
                  
                  newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                  newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                  newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                  newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                  
                  newItem.localPathAudio = oldItem.localPathAudio;
                  newItem.localPathVideo = oldItem.localPathVideo;
                  newItem.localPathTranscript = oldItem.localPathTranscript;
                  newItem.localPathPresentation = oldItem.localPathPresentation;
                  
                  newItem.downloadedDateA = oldItem.downloadedDateA;
                  newItem.downloadedDateV = oldItem.downloadedDateV;
                  newItem.downloadedDateT = oldItem.downloadedDateT;
                  newItem.downloadedDateP = oldItem.downloadedDateP;
                } 
            });
        }
           
//           console.log('\n\apeksha ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                           if(oldItem.thumbLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                    countTempThumb++;
                           }else{
                           
                               $.each(jsonData.panelDiscussions, function(key, newItem){
                                  
                                  if(oldItem.itemId == newItem.itemId){
                                  
                                      newItem.thumbLocal = oldItem.thumbLocal;
//                                      console.log('thumbnail panelDiscussions replaceeeeeeeeeeeeeeeeeeeeeee');
                                  }
                                });    
                           }
                           
                           if(oldItem.actualLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                                   countTempActual++;
                           }else{
                                   $.each(jsonData.panelDiscussions, function(key, newItem){
                                  
                                      if(oldItem.itemId == newItem.itemId){
                                      
                                          newItem.actualLocal = oldItem.actualLocal;
//                                          console.log('actual panelDiscussions replaceeeeeeeeeeeeeeeeeeeeeee');
                                      }
                                  });    
                           }
           
    });
    
    $.each(data.interviews, function(key, oldItem){
           
        if(oldItem.isDownloadedAudio == 'true' || oldItem.isDownloadedVideo == 'true' || oldItem.isDownloadedTranscript == 'true' || oldItem.isDownloadedPresentation == 'true'){
           
           $.each(jsonData.interviews, function(key, newItem){
                  
                if(oldItem.itemId == newItem.itemId){       
                  
//                  console.log('interviews--->>>> $$$$$ '+oldItem.title);
                  
                  newItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                  newItem.localPathAudio = oldItem.localPathAudio;
                  
                  newItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                  newItem.localPathVideo = oldItem.localPathVideo;
                  
                  newItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                  newItem.localPathTranscript = oldItem.localPathTranscript;
                  
                  newItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                  newItem.localPathPresentation = oldItem.localPathPresentation;
                  
                  newItem.downloadedDateA = oldItem.downloadedDateA;
                  newItem.downloadedDateV = oldItem.downloadedDateV;
                  newItem.downloadedDateT = oldItem.downloadedDateT;
                  newItem.downloadedDateP = oldItem.downloadedDateP;
                  
                } 
            });
        }
        
           
//           console.log('\n\Ganesh ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                           if(oldItem.thumbLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                    countTempThumb++;
                           }else{
                           
                                   $.each(jsonData.interviews, function(key, newItem){
                                  
                                      if(oldItem.itemId == newItem.itemId){
                                      
                                          newItem.thumbLocal = oldItem.thumbLocal;
//                                          console.log('thumbnail interviews replaceeeeeeeeeeeeeeeeeeeeeee');
                                      }
                                  });    
                           }
                           
                           if(oldItem.actualLocal == ''){
                           
                                   downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                                   countTempActual++;
                           }else{
                                   $.each(jsonData.interviews, function(key, newItem){
                                  
                                      if(oldItem.itemId == newItem.itemId){
                                      
                                          newItem.actualLocal = oldItem.actualLocal;
//                                          console.log('actual interviews replaceeeeeeeeeeeeeeeeeeeeeee');
                                      }
                                  });    
                           }
    });
    
    
    
    
    $.each(data.events, function(key, oldItem){
    
           
//           console.log('\n\Jariwala ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                       if(oldItem.thumbLocal == ''){
                       
                               downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                countTempThumb++;
                       }else{
                       
                              $.each(jsonData.events, function(key, newItem){
                                  
                                  if(oldItem.itemId == newItem.itemId){
                                  
                                      newItem.thumbLocal = oldItem.thumbLocal;
//                                      console.log('thumbnail events replaceeeeeeeeeeeeeeeeeeeeeee');
                                  }
                              });    
                       }
                       
                       if(oldItem.actualLocal == ''){
                       
                               downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                               countTempActual++;
                       }else{
                               $.each(jsonData.events, function(key, newItem){
                              
                                  if(oldItem.itemId == newItem.itemId){
                                  
                                      newItem.actualLocal = oldItem.actualLocal;
//                                      console.log('actual events replaceeeeeeeeeeeeeeeeeeeeeee');
                                  }
                              });    
                       }
    });
    
    
    
    $.each(data.contributor, function(key, oldItem){
           
           
//           console.log('\n\Dagade ----->>>>\n'+oldItem.itemId+'\n'+oldItem.thumb+'\n'+oldItem.type+'\n----->'+oldItem.thumbLocal+'\n------->'+oldItem.actualLocal+'\n\n');
           
                                   if(oldItem.thumbLocal == ''){
                                   
                                           downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
                                            countTempThumb++;
//                                       console.log('contributor thumbnail donwloaddddddddddddddd');
                                   }else{
                                   
                                           $.each(jsonData.contributor, function(key, newItem){
                                          
                                              if(oldItem.itemId == newItem.itemId){
                                              
                                                  newItem.thumbLocal = oldItem.thumbLocal;
//                                                  console.log('contributor thumbnail replaceeeeeeeeeeeeeeeeeeeeeee');
                                              }
                                          });    
                                   }
                                   
                                   if(oldItem.actualLocal == ''){
                                   
                                           downloadThumbImages(oldItem.itemId,'actual',oldItem.actual,oldItem.type);
                                            countTempActual++;
//                                           console.log('contributor actual donwloaddddddddddddddd');
        
                                   }else{
                                           $.each(jsonData.contributor, function(key, newItem){
                                          
                                              if(oldItem.itemId == newItem.itemId){
                                              
                                                  newItem.actualLocal = oldItem.actualLocal;
//                                                  console.log('contributor actual replaceeeeeeeeeeeeeeeeeeeeeee');
                                              }
                                          });    
                                   }
       });
    
    
   
//    jsonData.pendingDownloads = '';
    
    
    
//    console.log('Thumnail download count --->'+countTempThumb);
//    console.log('ACTUAL download count --->'+countTempActual);
    
   // console.log("Compare and update-->"+JSON.stringify(jsonData));
    getFileSystemRefForWriting(jsonData);
    
    var dd = new Date();
    console.log('********* compareAndUpdateJSON1   222222 :'+(dd.getTime()-d.getTime())/1000);
     d = dd;
    
}




function showCategoriesListsagar(data)
{
    var strHTMLCategory = "";
	
    //console.log("(!isOnline) && (data == null) : ---" + ((!isOnline) && (data == null)));
	//In, Offline mode, if data is null, means need to show message to go online and load data.
	
    if((!isOnline) && (data == null) ) {
//		console.log('Inside if data:'+data);
//        console.log('ankit online mode');
//		
        $("#errorString").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content. Please close the application and connect to Internet.");
        
		$.mobile.changePage("#errorPage");
		return;
	}else {
        
       //console.log("PAGE CHANGE 2nd LOGIN ------------> " + JSON.stringify(data));
//        console.log('}bhavya offline mode');
		jsonData = data;
        
        changeDownloadLogoutColor();
        
		strHTMLCategory = '';
        

        var dd = new Date();
        
         d = dd;

        
	}
    
     //alert('jsonData.loggedUserName :'+jsonData.loggedUserName);
    //document.getElementById("lblUserName").innerHTML = (jsonData.loggedUserName).replace(/\_/g,'.');
}




function downloadedListload(itemId,elementTitle,isDownloadedFlag,elementAudio,val,filePath)
{
    
	//alert(" itemId"+itemId+ "   elementTitle "+elementTitle+"   isDownloadedFlag"+isDownloadedFlag+"  filePath"+filePath);
    
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
    
    
    downloadJson.finalDownload.push(tempMedia);
    
    if(isOnline) {
    	// alert("downloadJson isOnline ---"+JSON.stringify(downloadJson));
    	getFileSystemRefForWritingDownload(downloadJson);
    }
    
    //alert("downloadJson=----"+JSON.stringify(downloadJson));
    
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
    
    //getFileSystemRefForWriting(JData);
}



function imageRedownload(jsonData)
{
//    $.each(jsonData.audio, function(key, oldItem){
//           
//            downloadThumbImages(oldItem.itemId,'thumb',oldItem.thumb,oldItem.type);
//                      
//           });
}
