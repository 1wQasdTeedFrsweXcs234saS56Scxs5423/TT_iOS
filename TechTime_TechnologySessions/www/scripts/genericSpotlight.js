var loadedSpotlightType = '';

function loadSpotlightGeneral(xml) {
    
    $(xml).find('item').each(function () {
                             
                             try {
                             var sguid = $(this).find('contentid').text();
                             var scontenttype = $(this).find('contenttype').text();
                             var sformattype = $(this).find('formattype').text();
                             var scategory = $(this).find('category').text();
                             var sTitle = $(this).find('title').text();
                             var sDesc = $(this).find('description').text();
                             var sLang = $(this).find('formatlang').text();
                             var sAuthor = $(this).find('author').text().replace(/\|/g, ',');
                             var sAuthorCount = $(this).find('author_count').text();
                             var audioTag = $(this).find('audio').text();
                             var videoTag = $(this).find('video').text();
                             
                             var transcriptTag = $(this).find('transcript').text();
                             var presentationTag = $(this).find('presentation').text();
                             var sqna = $(this).find('qna').text();
                             var sdocumentPDF = $(this).find('document_pdf').text();
                             var publishedDateStart = $(this).find('published_date_start').text();
                             var publishedDateEnd = $(this).find('published_date_end').text();
                             var contributorId = $(this).find('contributor_id').text();
                             var techArea = $(this).find('tech_area').text();
                             var imageThumb = $(this).find('image_thumb').text();
                             var imageActual = $(this).find('image_actual').text();
                             var specialAds = $(this).find('special_ads').text();
                             var saImage = $(this).find('special_ads').children('image').text();
                             var saURL = $(this).find('special_ads').children('url').text();
                             var saText = $(this).find('special_ads').children('text').text();

                             $(this).find('audio').each(function () {
                                                        var audioLength = $(this).attr('length');
                                                        });
                             
                             $(this).find('video').each(function () {
                                                        var videoLength = $(this).attr('length');
                                                        });
                             
                             $(this).find('transcript').each(function () {
                                                             var transcriptLength = $(this).attr('length');
                                                             });
                             
                             $(this).find('presentation').each(function () {
                                                               var presentationLength = $(this).attr('length');
                                                               });
                             
                             var authorArray = new Array();
                             var authorTextArray = sAuthor.split(",");
                             
                             for (i = 0; i < authorTextArray.length; i++) {
                             authorArray.push(authorTextArray[i]);
                             }
                             
                             var tempMediaSpot = new Object();
                             
                             tempMediaSpot.itemId = sguid;
                             tempMediaSpot.type = scontenttype;
                             tempMediaSpot.formattype = sformattype;
                             tempMediaSpot.category = scategory;
                             tempMediaSpot.title = sTitle;
                             tempMediaSpot.description = sDesc;
                             tempMediaSpot.lang = sLang;
                             tempMediaSpot.author = authorArray;
                             tempMediaSpot.authorCount = sAuthorCount;
                             tempMediaSpot.audio = audioTag;
                             tempMediaSpot.video = videoTag;
                             tempMediaSpot.transcript = transcriptTag;
                             tempMediaSpot.presentation = presentationTag;
                             tempMediaSpot.qna = sqna;
                             tempMediaSpot.document = sdocumentPDF;
                             tempMediaSpot.publishedDateStart = publishedDateStart;
                             tempMediaSpot.publishedDateEnd = publishedDateEnd;
                             tempMediaSpot.contributorId = contributorId;
                             tempMediaSpot.techArea = techArea;
                             tempMediaSpot.thumb = imageThumb;
                             tempMediaSpot.actual = imageActual;
                             tempMediaSpot.thumbLoc = "";
                             tempMediaSpot.actualLoc = "";
                             
                             tempMediaSpot.specialAds = specialAds;
                             tempMediaSpot.saImage = saImage;
                             tempMediaSpot.saURL = saURL;
                             tempMediaSpot.saText = saText;
                             
                             tempMediaSpot.isDownloadedAudio = 'false';
                             tempMediaSpot.localPathAudio = '';
                             tempMediaSpot.downloadedDateA = '';
                             
                             tempMediaSpot.isDownloadedVideo = 'false';
                             tempMediaSpot.localPathVideo = '';
                             tempMediaSpot.downloadedDateV = '';
                             
                             tempMediaSpot.isDownloadedTranscript = 'false';
                             tempMediaSpot.localPathTranscript = '';
                             tempMediaSpot.downloadedDateT = '';
                             
                             tempMediaSpot.isDownloadedPresentation = 'false';
                             tempMediaSpot.localPathPresentation = '';
                             tempMediaSpot.downloadedDateP = '';
                             
                             tempMediaSpot.isDownloaded = 'false';
                             tempMediaSpot.localPath = '';
                             tempMediaSpot.downloadedDateD = '';
                             
                             tempMediaSpot.isDownloadedFromSpotLight = 'false';
                             tempMediaSpot.isAudioFromSpotlight = 'false';
                             tempMediaSpot.isVideoFromSpotlight = 'false';
                             tempMediaSpot.isTranscriptFromSpotlight = 'false';
                             tempMediaSpot.isPresentationFromSpotlight = 'false';
                             tempMediaSpot.isDocumentFromSpotlight = 'false';
                             
                             
                             if(loadedSpotlightType == 'generic')
                             {
                                jsonData.spotLight.push(tempMediaSpot);
                             } else if(loadedSpotlightType == 'digital')
                             {
                                jsonData.digitalSpotLight.push(tempMediaSpot);
                             }
                             
                             var str = JSON.stringify(scategory);
                             
                             str = str.substring(1, str.length - 1);
                             
                             var beg, end, temp;
                             var len = str.length;
                             
                             beg = 0;
                             
                             while (len !== 0 && end != 0 && str != "") {
                             var n = str.split("|");
                             
                             
                             end = str.indexOf("-") + 1;
                             beg = str.indexOf("|");
                             len = str.length;
                             
                             temp = str.substring(0, end - 1);
                             
                             $.each(jsonData.category, function (index, item) {
                                    
                                    $.each(item.subCategory, function (index, item) {
                                           
                                           for (var i = 0; i < n.length; i++) {
                                           
                                           var tempSubName = n[i].substring(0, n[i].lastIndexOf("-"));
                                           
                                           var tempSubId = n[i].substring(n[i].indexOf("-") + 1, n[i].length);
                                           
                                           if (tempSubId == item.categoryid && item.subCategoryName == temp) {
                                           
                                           item.spotlight.push(sguid);
                                           }
                                           }
                                           });
                                    });
                             
                             
                             if (beg == -1) {
                             len = 0;
                             }
                             if (end == 0) {
                             len = 0;
                             }
                             
                             temp = str.substring(beg + 1, str.length);
                             str = temp;
                             
                             }
                             
                             } catch (error) {
                             var txt = "There was an error on this page.\n\n";
                             txt += "Error description: " + error.message + "\n\n";
                             txt += "Click OK to continue.\n\n";
                             
                             console.log("ERROR SPOT READING ----> " + txt);
                             }
                             });
    
    if (isOnline) {
        getFileSystemRefForReading(false, jsonData);
    }   
    
}


var SpotLightContentFlag = false;

function showSpotLightContent()
{
    spotLightFlag = true;
    playlistItemsPageFlag = false;
    eventsFlag = false;
    mediaFlag = false;
    window.localStorage.setItem("eventFlag", eventsFlag);
    window.localStorage.setItem("spotLightFlag", spotLightFlag);
    window.localStorage.setItem("mediaFlag",mediaFlag);
        var stringIWant = '';
        var strHTMLshowTAList = "";
        $('#spotlightContentArea').empty('');
    
    var spotlightSourceArray = [];
    
    if(!isSpotlightDigital)
    {
            document.getElementById('spotlightList').style.display = 'block';
            document.getElementById('spotlightDigitalList').style.display = 'none';
            isFromDigitalHomePage = false;
            spotlightSourceArray = jsonData.spotLight;
        
    } else if(isSpotlightDigital)
    {
            document.getElementById('spotlightList').style.display = 'none';
            document.getElementById('spotlightDigitalList').style.display = 'block';
            isFromDigitalHomePage = true;
            spotlightSourceArray = jsonData.digitalSpotLight;
    }
    
    
   
    
    $.each(jsonData.downloadedSpotLightItems, function (key, oldItem) {
           $.each(jsonData.spotLight, function (key, spotLightItem) {
                  if (oldItem.itemId == spotLightItem.itemId) {
                  spotLightItem.isDownloadedAudio = oldItem.isDownloadedAudio;
                  spotLightItem.localPathAudio = oldItem.localPathAudio;
                  spotLightItem.downloadedDateA = oldItem.downloadedDateA;
                  
                  spotLightItem.isDownloadedVideo = oldItem.isDownloadedVideo;
                  spotLightItem.localPathVideo = oldItem.localPathVideo;
                  spotLightItem.downloadedDateV = oldItem.downloadedDateV;
                  
                  spotLightItem.isDownloadedTranscript = oldItem.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = oldItem.localPathTranscript;
                  spotLightItem.downloadedDateT = oldItem.downloadedDateT;
                  
                  spotLightItem.isDownloadedPresentation = oldItem.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = oldItem.localPathPresentation;
                  spotLightItem.downloadedDateP = oldItem.downloadedDateP;
                  
                  spotLightItem.isDownloaded = oldItem.isDownloaded;
                  spotLightItem.localPath = oldItem.localPath;
                  spotLightItem.downloadedDateD = oldItem.downloadedDateD;
                  }
                  });
           });
    
    $.each(jsonData.spotLight, function (key, spotLightItem) {
           $.each(jsonData.audio, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  
                  }
                  });
           
           $.each(jsonData.video, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  }
                  });
           
           $.each(jsonData.panelDiscussions, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  
                  }
                  });
           
           $.each(jsonData.interviews, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  }
                  });
           
           
           $.each(jsonData.documents, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloaded == "true" || CheckDownload.isDownloaded == 'true' || CheckDownload.isDownloaded == true) {
                  spotLightItem.isDownloaded = CheckDownload.isDownloaded;
                  spotLightItem.localPath = CheckDownload.localPath;
                  spotLightItem.downloadedDateD = CheckDownload.downloadedDateD;
                  }
                  }
                  });
           
           
           $.each(jsonData.techConf, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  
                  }
                  });
           
           
           $.each(jsonData.downloadedSpotLightItems, function (key, CheckDownload) {
                  if (spotLightItem.itemId == CheckDownload.itemId) {
                  if (CheckDownload.isDownloadedAudio == 'true' || CheckDownload.isDownloadedAudio == "true" || CheckDownload.isDownloadedAudio == true) {
                  spotLightItem.isDownloadedAudio = CheckDownload.isDownloadedAudio;
                  spotLightItem.localPathAudio = CheckDownload.localPathAudio;
                  spotLightItem.downloadedDateA = CheckDownload.downloadedDateA;
                  }
                  
                  if (CheckDownload.isDownloadedVideo == 'true' || CheckDownload.isDownloadedVideo == "true" || CheckDownload.isDownloadedVideo == true) {
                  {
                  spotLightItem.isDownloadedVideo = CheckDownload.isDownloadedVideo;
                  spotLightItem.localPathVideo = CheckDownload.localPathVideo;
                  spotLightItem.downloadedDateV = CheckDownload.downloadedDateV;
                  }
                  }
                  if (CheckDownload.isDownloadedPresentation == 'true' || CheckDownload.isDownloadedPresentation == "true" || CheckDownload.isDownloadedPresentation == true) {
                  {
                  spotLightItem.isDownloadedPresentation = CheckDownload.isDownloadedPresentation;
                  spotLightItem.localPathPresentation = CheckDownload.localPathPresentation;
                  spotLightItem.downloadedDateP = CheckDownload.downloadedDateP;
                  }
                  }
                  
                  if (CheckDownload.isDownloadedTranscript == 'true' || CheckDownload.isDownloadedTranscript == "true" || CheckDownload.isDownloadedTranscript == true) {
                  {
                  spotLightItem.isDownloadedTranscript = CheckDownload.isDownloadedTranscript;
                  spotLightItem.localPathTranscript = CheckDownload.localPathTranscript;
                  spotLightItem.downloadedDateT = CheckDownload.downloadedDateT;
                  }
                  }
                  if (CheckDownload.isDownloaded == "true" || CheckDownload.isDownloaded == 'true' || CheckDownload.isDownloaded == true) {
                  spotLightItem.isDownloaded = CheckDownload.isDownloaded;
                  spotLightItem.localPath = CheckDownload.localPath;
                  spotLightItem.downloadedDateD = CheckDownload.downloadedDateD;
                  }
                  
                  }
                  });
           });
    

    
        $.each(spotlightSourceArray, function (index, itemRes) {
               var count = '-100';
               var imgsrc = '';
               
               var actualThumb = '';
               actualThumb = '';
               
               stringIWant = '';
               var stringIGet = itemRes.category;
               
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
               
               
              
               
               if (stringIWant.length > 25) {
               var stringToDisplay = stringIWant.substring(0,22);
               var trimmedCatDisplay = stringToDisplay + "...";
               stringIWant = stringToDisplay;
               }

                
               
               if (itemRes.type == 'podcast' || itemRes.type == 'documents' || itemRes.type == 'events' || itemRes.type == 'contributor') {
               if (itemRes.type == 'events') {
               itemRes.formattype = itemRes.type;
               }
               else if (itemRes.type == 'contributor') {
               itemRes.formattype = itemRes.type;
               itemRes.itemId = itemRes.contributorId;
               }

               
               if(isOnline)
               {
                   if(downloadedThumbs.indexOf(itemRes.itemId + "thumb.png") != -1)
                   {
                        actualThumb = globalPathNew + "images/"+itemRes.itemId+"thumb.png";
                   } else if(downloadedThumbs.indexOf(itemRes.itemId + "thumb.png") == -1)
                   {
                        actualThumb = itemType.actual;
                   }
               } else if(!isOnline)
               {
                   if(downloadedThumbs.indexOf(itemRes.itemId + "thumb.png") != -1)
                   {
                        actualThumb = globalPathNew + "images/"+itemRes.itemId+"thumb.png";
                   } else if(downloadedThumbs.indexOf(itemRes.itemId + "thumb.png") == -1)
                   {
                        actualThumb = "images/TechTime-AppIcon.png";
                   }
               
               
               }
               
               var authoNames = '';
               $.each(itemRes.author, function (key, itemAuthor) {
                      if (key == 0) {
                      authoNames = authoNames + itemAuthor;
                      } else if (key <= (itemRes.author.length - 1)) {
                      authoNames = authoNames + ', ' + itemAuthor;
                      } else {
                      authoNames = authoNames + ' ' + itemAuthor;
                      }
                      });
               
               
               if (itemRes.formattype == 'Audios') {
               imgsrc = 'images/icon_audio.png';
               }
               if (itemRes.formattype == 'Videos') {
               imgsrc = 'images/icon_video.png';
               }
               if (itemRes.formattype == 'contributor') {
               imgsrc = 'images/icon_interview.png';
               }
               if (itemRes.formattype == 'Panel Discussions'
                   || type == 'PanelDiscussions') {
               imgsrc = 'images/icon_panelDiscussion.png';
               }
               if (itemRes.formattype == 'Interviews') {
               imgsrc = 'images/icon_interview.png';
               }
               if (itemRes.formattype == 'Technology Sessions') {
               imgsrc = 'images/icon_video.png';
               }
               if (itemRes.formattype == 'documents') {
               imgsrc = 'images/icon_document.png';
               }
               if (itemRes.formattype == 'events') {
               imgsrc = 'images/icon_event.png';
               }
               if (itemRes.formattype == 'Technology Conferences') {
               imgsrc = 'images/icon_techConf.png';
               }
               
               var cat = itemRes.category;
               var catIndex = cat.lastIndexOf('-');

               if(catIndex > 0){
                    itemRes.category = itemRes.category.substring(0, catIndex);
               }
               else
               {
               itemRes.category = itemRes.category;

               
               }
               
               $.each(jsonData.category, function (key, item) {
                      var formatType = itemRes.formattype.replace(/\s+/g, '');
                      if (item.subscribe == "yes") {
                      SpotLightContentFlag = false;
                      strHTMLshowTAList = strHTMLshowTAList + "<div class='listItemClick'><a onclick=spotlightDataTypes('" + itemRes.itemId + "','" + formatType + "','" + count + "') style='text-decoration:none;font-style:normal;color:black;'>";
                      }
                      else {
                      SpotLightContentFlag = true;
                      strHTMLshowTAList = strHTMLshowTAList + "<div class='listItemClick'><a onclick=spotlightDataTypes('" + itemRes.itemId + "','" + formatType + "','" + count + "') style='text-decoration:none;font-style:normal;color:black;'>";
                      }
                      });
               strHTMLshowTAList = strHTMLshowTAList + "<table cellpadding='0' cellspacing='0' class='tableList' style='width:100%'>";
               if (itemRes.category) {
                
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td></td><td style='margin:0px; padding:0px;width:65%;font-style:bold;padding-left:5px;font-size:12px;'><b><div style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width:80%;'> " + stringIWant + "</div></b></td><td></td></tr>";
               }
               
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td id='" + itemRes.itemId + "' class='listItemId' rowspan='3' >";
               
               if (itemRes.author.length >= 2) {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:85px;width:110px;margin:auto;margin-left:12px;margin-top:2%'></img></td>";
               
               } else if (itemRes.author.length < 2) {
               strHTMLshowTAList = strHTMLshowTAList + "<img src='"+actualThumb+"' style='height:85px;width:110px;margin:auto;margin-left:12px;margin-top:2%'></img></td>";
               }
               
               strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListTitle' style='padding-left:2px;padding-top:20px;color: orange;font-size:14px;'><b>" + itemRes.title + "</b></td>";
               if(itemRes.type == 'contributor')
               {
               $.each(jsonData.contributor, function(key, itemContributor) {
                      if(itemRes.title == itemContributor.title){
               strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListIcons' rowspan='2' align='center'>";
                      strHTMLshowTAList = strHTMLshowTAList + "<img src='" + imgsrc + "' style='height:20px;width:20;border:none;margin-left:8%'/>";
                      strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td id='' class='tdTableAuthor' style='padding-left:5px;color:orange;font-size:13px'>" + itemContributor.contributor + "</td></tr>";
                      }
                      });
               
               }else{
               strHTMLshowTAList = strHTMLshowTAList + "<td class='tdTableListIcons' rowspan='2' align='center'>";
               if(deviceName == "iPhone5" || deviceName == "iPhone4" || deviceName == "iPhone4s" || deviceName == "iPhone4" || deviceName == "iPhone" || deviceName == "iPhone3"){
                strHTMLshowTAList = strHTMLshowTAList + "<img src='" + imgsrc + "' style='height:20px;width:20px;margin-left:8%;padding-right:13px;'/>";
               } else {
                strHTMLshowTAList = strHTMLshowTAList + "<img src='" + imgsrc + "' style='height:20px;width:20px;margin-left:8%;padding-right:10px;'/>";
               }
               strHTMLshowTAList = strHTMLshowTAList + "</td></tr> <tr><td id='' class='tdTableAuthor' style='padding-left:2px;color: orange;font-size:12px;'>" + itemRes.author + "</td></tr>";
               }
               strHTMLshowTAList = strHTMLshowTAList + "<tr><td class='tdTableDate' style='padding-left:2px;color: orange;font-size:12px;'>" + itemRes.publishedDateStart + "\n";
               strHTMLshowTAList = strHTMLshowTAList + showDownloadedIcons(itemRes) + "</td>";
               
               if(deviceName == "iPhone4" || deviceName == "iPhone4s" || deviceName == "iPhone4" || deviceName == "iPhone" || deviceName == "iPhone3")
               {
               strHTMLshowTAList = strHTMLshowTAList + "<td class='tdIconArrow' style='padding-right:13px;'><img id='orangeIconRight' src='images/orange_icon_right.png' style='height:20px;width:20px;'/></td></tr></table>";
               } else if(deviceName == "iPhone5"){
               strHTMLshowTAList = strHTMLshowTAList + "<td class='tdIconArrow' style='padding-left:13px;'><img id='orangeIconRight' src='images/orange_icon_right.png' style='height:20px;width:20px;'/></td></tr></table>";
               } else {
                strHTMLshowTAList = strHTMLshowTAList + "<td class='tdIconArrow' align='center'><img id='orangeIconRight' src='images/orange_icon_right.png' style='height:20px;width:20px;'/></td></tr></table>";
               }
               
               strHTMLshowTAList = strHTMLshowTAList + "</a></div>";

               
               document.getElementById('spotlightListNoSubscribe').style.display = 'none';
               
               if(!isSpotlightDigital)
               {
                    $('#spotlightList').html(strHTMLshowTAList);
               } else if(isSpotlightDigital)
               {
                    $('#spotlightDigitalList').html(strHTMLshowTAList);
               }
               
               
               } else if (itemRes.type == 'tech_area') {
               
               var strHTMLCategory = "";               
               
               var strHTMLCategory = "";
               $('#spotlightListArea').empty('');
               $('#spotlightDigitalListArea').empty('');
               
               $.each(jsonData.category, function(key, item) {
                      
                      if(item.subscribe == "yes")
                      {
                      
                      if(item.categoryid  == itemRes.techArea)
                      {
                      strHTMLCategory = strHTMLCategory + "<div class='listItemClick' ><div class=dynamicDivList><li><a id="+ item.categoryname+" class='anchorCategory'  href='#TAListResult' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+")'>";
                      strHTMLCategory = strHTMLCategory+ "<div style='color:white !important;margin-left:3.5%;'> "+item.categoryname+"<img src='images/icon_whiteRight.png' width='13' height='13' style='float:right;padding-right:4%;'/>";
                      strHTMLCategory = strHTMLCategory+ "</div></a></li></div></div>";
                      }
                      }
                      else{
                      if(item.categoryid  == itemRes.techArea)
                      {
                      
                      strHTMLCategory = strHTMLCategory + "<div class='listItemClick'><div class=dynamicDivList><li><a id="+itemRes.specialAds+" class='anchorCategory' onclick='displayTA(this);' href='#subscribePage'>";
                      
                      strHTMLCategory = strHTMLCategory+ "<div style='color:white;margin-left:3.5%;'> "+itemRes.specialAds+"<img src='images/icon_whiteRight.png' width='13' height='13' style='float:right;padding-right:4%;'/>";
                      strHTMLCategory = strHTMLCategory+ "</div></a></li></div></div>";
                      }
                      }
                      
                      });
               
               
               if(!isSpotlightDigital)
               {
                $('#spotlightListArea').html(strHTMLCategory);
               
               } else if(isSpotlightDigital)
               {
                    $('#spotlightDigitalListArea').html(strHTMLCategory);
                }
               
               
               strHTMLCategory = '';
               
               
               }
               else if (itemRes.type == 'special_ads') {
               
               var strHtmlContent = "";
               $('#spotlightList').html('');
               if (itemRes.techArea == "" || itemRes.techArea == null || itemRes.techArea == "null") {
               
               if (itemRes.saURL == "" || itemRes.saURL == null || itemRes.saURL == "null") {
                    
                    if (itemRes.saText == "Tech Watch") {
                        strHtmlContent = strHtmlContent + "<div class='listItemClick' style='border :none' onclick = 'showTechWatchContent(currentTechWatchItemId, currentTechWatchItemIndex);'>";
                        }
               } else {
               strHtmlContent = strHtmlContent + "<div class='listItemClick' style='border :none' onclick='readMoreData(\"" + itemRes.saURL + "\");'>";
               }
               
               } else {
               strHtmlContent = strHtmlContent + "<div id=" + itemRes.saText + " data-categoryId=" + itemRes.techArea + " class='listItemClick' style='border :none' onclick = 'displayTA1(this)'>";
               }
               
               strHtmlContent = strHtmlContent + "<table border='0' class='tableList'><tr><td style='width : 50%'>";
               strHtmlContent = strHtmlContent + "<img src='" + itemRes.saImage + "' typeof='foaf:Image' style='padding-left:10px;height:114px; width:139px'></img></td>";
               strHtmlContent = strHtmlContent + "<td class='tdTableListTitle' style='font-size: large'><b>" + itemRes.saText + "</b></td></tr></table><div>";
               
               document.getElementById('spotlightListNoSubscribe').style.display = 'none';
               $('#spotlightList').html(strHtmlContent);
               
               
               if(!isSpotlightDigital)
               {
               $('#spotlightList').html(strHTMLCategory);
               
               } else if(isSpotlightDigital)
               {
               $('#spotlightDigitalList').html(strHTMLCategory);
               }
               
               }
               
               });
        
    
}

function displayTA(element) {
    var elementData = element.id;
    var categoryId = element["data-categoryId"];
    if (categoryId == "" || categoryId == "null" || categoryId == null) {
        categoryId = window.localStorage.getItem("spotlightCategoryID");
    } else {
        window.localStorage.setItem("spotlightID", elementData);
        window.localStorage.setItem("spotlightCategoryID", categoryId);
    }
    var isSubscribe;
    $.each(jsonData.category, function (key, itemCategory) {
           if (itemCategory.categoryid == categoryId) {
           isSubscribe = itemCategory.subscribe;
           }
           
           });
    
    if (isSubscribe == 'yes') {
        showTAListResult(elementData,categoryId);
    }
    else {
        jConfirm('Please subscribe to this Technology Area to view the content.', 'Tech Time', function (returnValue) {
                 if (returnValue == true) {
                 showSubscribeContent();
                 }
                 });
        
    }
}



var currElementIdSpot = '';
var currElementtypeSpot = '';
var currElementcountNumSpot = '';

function displayTA1(element)
{
    
    jConfirm('Please subscribe to this Technology Area to view the content.', 'Tech Time', function (returnValue) {
             
             if (returnValue == true) {
             showSubscribeContent();
             }
             });
    
}




function spotlightDataTypes(elementId,type,countNum)
{
    
    $('#detailPageArea').html('');
    
    searchFromMediaPage = false;
    searchFromEventsPage = false;
    searchFromSpotlightPage = true;
    searchFromUpcomingEventsPage = false;
    searchFromTAListResultPage = false;
    searchFromAuthorDetailPage = false;
    searchFromDownloadsPage = false;
    searchFromMainPage = false;
    searchFromContactUsPage = false;
    searchFromAboutPage = false;
    searchFromFaqPage = false;
    searchFroSubscribPage = false;
    searchFromPlaylistsPage = false;
    searchFromPlaylistItemsPage = false;
    searchFromSharePlaylistsPage = false;
    searchFromAddToPlaylistPage = false;
    
    defaultNavigate();
    
    var spotlightSourceArray = [];
    
    if(!isSpotlightDigital)
    {   
        spotlightSourceArray = jsonData.spotLight;
        
    } else if(isSpotlightDigital)
    {   
        spotlightSourceArray = jsonData.digitalSpotLight;
    }

    
    if (type == 'contributor') {
    
        $.each(spotlightSourceArray, function (key, itemType) {
               showAuthorDetailPage(itemType.title);
               defaultNavigate();
               $.mobile.changePage('#detailAuthor');
               });
    } else {

        $("#navigateDetailMediaPage").hide();
        window.localStorage.setItem("detailPageelementIdSpot", elementId);
        window.localStorage.setItem("detailPagetypeSpot", type);
        window.localStorage.setItem("detailPagecountNumSpot", countNum);
        hidePopup();
        var strHTMLDetail = '';
        var strHTML = '';
        var stringIWant = '';
        
        currElementIdSpot = elementId;
        currElementtypeSpot = type;
        currElementcountNumSpot = countNum;
        var icons = '';
        
        $.each(spotlightSourceArray, function(key, itemType) {
               
               if (itemType.itemId == elementId) {
               
               var cId = '';
               var cDId = '';
               var aURL = '';
               var vURL = '';
               var pURL = '';
               var tURL = '';
               var dURL = '';
               
               var titleE = '';
               var actualLocal = '';
               
               cId = itemType.itemId;
               aURL = itemType.audio;
               vURL = itemType.video;
               pURL = itemType.presentation;
               tURL = itemType.transcript;
               dURL = itemType.document;
               
               titleE = JSON.stringify(itemType.title);
               
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
               
               if (type == 'Technology Sessions' || type == 'TechnologySessions' || type == 'Technology Session' || type == 'TechnologySession') {
               
               
               icons = "images/icon_panelDiscussion.png";
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
               dURL = itemType.document;
               lURL = itemType.localPath;
               
               }
               

               
               if (type == 'events') {
               
               
               icons = "images/icon_event.png";
               var cEId = itemType.itemId;
               var eURL = itemType.icsfile;
               
               
               
               $.each(spotlightSourceArray, function(key, eventItem) {
                      
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
                      
                      });
               
               
               }
               

               
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
                   if(downloadedActuals.indexOf(itemType.itemId + "actual.png") != -1)
                   {
                        actualLocal = globalPathNew + "images/"+itemType.itemId+"actual.png";
                   } else if(downloadedActuals.indexOf(itemType.itemId + "actual.png") == -1)
                   {
                        actualLocal = itemType.actual;
                   }
               } else if(!isOnline)
                   {
                    if(downloadedActuals.indexOf(itemType.itemId + "actual.png") != -1)
                        {
                            actualLocal = globalPathNew + "images/"+itemType.itemId+"actual.png";
                        } else if(downloadedActuals.indexOf(itemType.itemId + "actual.png") == -1)
                        {
                            actualLocal = "images/TechTime-AppIcon.png";
                        }
               }
               
               posterImage = actualLocal;
               
               
               if (type == 'Audios' || type == 'Videos' || type == 'Interviews' || type == 'Technology Conferences' || type == 'TechnologyConferences' || type == 'Panel Discussions' || type == 'PanelDiscussions' || type == 'Technology Sessions' || type == 'TechnologySessions' || type == 'Technology Session' || type == 'TechnologySession') {
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               if(vURL != "")
               {
               
                if(itemType.isDownloadedVideo == "true" || itemType.isDownloadedVideo == true || entries.indexOf(cVId) != -1)
               {
                strHTMLDetail = strHTMLDetail + "<img id='"+cVId+"' title='"+itemType.localPathVideo+"' onclick='downloadFileAudioMain(this,"+itemType.isDownloadedVideo+","+titleE+",2, true,true)' src='"+posterImage+"' style='border:none; width:150px; height:100px; margin:20px 20px;'/><br><br>";
               
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
               
               }
               else if(vURL == "" && aURL != "")
               {
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
               
               }
               else
               {
               }
               
               strHTMLDetail = strHTMLDetail + "</td><td style='width:50%;'><br>";
               
               
               if (aURL != "") {
               
               
               if(entries.indexOf(cAId) != -1) {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+itemType.localPathAudio+"' onclick='downloadFileAudioMain(this,true,"+titleE+",1, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               } else {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cAId+"' title='"+aURL+"' onclick='downloadFileAudioMain(this,false,"+titleE+",1, true)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadAudio.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               }
               }
               
               
               if (pURL != "") {
               
               if (entries.indexOf(cPId) != -1) {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+itemType.localPathPresentation+"' onclick= 'downloadFileAudioMain(this,true,"+titleE+",3, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            
               
               } else {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cPId+"' title= '"+pURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",3, true)' style='border:none;width:100px;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadPresentation.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               }
               }
               
               if (tURL != "") {
               
               if (entries.indexOf(cTId) != -1) {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+itemType.localPathTranscript+"' onclick= 'downloadFileAudioMain(this,true,"+titleE+",4, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
                            
               } else {
               
            
               strHTMLDetail = strHTMLDetail + "<div id='"+cTId+"' title= '"+tURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",4, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadTranscript.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
            
               
               }
               }
               
               
               if (vURL != "") {
               
               
               if (entries.indexOf(cVId) != -1) {
               
                strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title= '"+itemType.localPathVideo+"' onclick='downloadFileAudioMain(this,true,"+titleE+",2, true)'  style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
               
               
               
               } else {
               
               strHTMLDetail = strHTMLDetail + "<div id='"+cVId+"' title= '"+vURL+"' onclick= 'downloadFileAudioMain(this,false,"+titleE+",2, true)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_downloadVideo.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div><br>";
              
               
               }
               }
               
               
               if (itemType.qna != "") {
               strHTMLDetail = strHTMLDetail + "<a style='text-decoration:none;font-style:normal;' href='#qnaPage'>";
               
                 strHTMLDetail = strHTMLDetail + "<div id='"+itemType.title+"' title='"+itemType.qna+"' onclick= 'showQnA(this)' style='border:none;width:100px;;height:40px;z-index:100;'><img class='detailMediaPageButton' src='images/btn_viewQA.png' height='100%' width='100%' style='margin-top:0px;margin-right:0px;' /></div></a><br>";
               
               }
               
               
               strHTMLDetail = strHTMLDetail + "</td></tr>";
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'>";
               
               if(type == 'Audios' || type == 'Audio' || type == 'audios' || type == 'audio'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_audio.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Videos' || type == 'Video' || type == 'videos' || type == 'videos' || type == 'Technology Sessions' || type == 'TechnologySessions' || type == 'Technology Session' || type == 'TechnologySession'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_video.png' style='height:15px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Interviews' || type == 'Interview' || type == 'interviews' || type == 'interview'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_interview.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Technology Conferences' || type == 'TechnologyConferences' || type == 'Technology Conference' || type == 'TechnologyConference'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_techConf.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Panel Discussions' || type == 'PanelDiscussions' || type == 'PanelDiscussion' || type == 'Panel Discussion'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_panelDiscussion.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Event' || type == 'Events' || type == 'event' || type == 'events'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_event.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               } else if(type == 'Documents' || type == 'Document' || type == 'documents' || type == 'document'){
               strHTMLDetail = strHTMLDetail + "<img src='images/icon_document.png' style='height:20px; width:20px;border:none;padding:0px;margin-right:10px'/>";
               }
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>" + itemType.title + "</label><br>";
               
               
               } else if (type == 'documents') {
           
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               
               if (itemType.isDownloaded == 'true') {
               strHTMLDetail = strHTMLDetail + "<img id='" + cDId + "' title= '" + itemType.localPath + "'  src='" + actualLocal + "' class ='actualDetailThumb'/><br><br>";
               } else {
               strHTMLDetail = strHTMLDetail + "<img id='" + cDId + "' title= '" + dURL + "' src='" + actualLocal + "' class ='actualDetailThumb'/><br><br>";
               }
               strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%'><br>";
               
               if (dURL != "") {
               if (itemType.isDownloaded == 'true') {
             
               strHTMLDetail = strHTMLDetail + "<div id='" + cDId + "' title= '" + itemType.localPath + "' onclick= 'downloadFileAudioMain(this," + itemType.isDownloaded + "," + titleE + ",5, true)' class='detailPageButtonDiv' style='width:120px;;height:40px;z-index:100;'><img src='images/btn_viewPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
               } else {
             
               strHTMLDetail = strHTMLDetail + "<div id='" + cDId + "' title= '" + dURL + "' onclick= 'downloadFileAudioMain(this," + itemType.isDownloaded + "," + titleE + ",5, true)' class='detailPageButtonDiv' style='width:120px;;height:40px;z-index:100;'><img src='images/button_downloadPDF.png' height='100%' width='100%' class='detailPageButton' /></div><br><br>";
               }
               }
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='" + icons + "' style='height:20px; width:20px; border:none;;margin:5px;'/>";
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>" + itemType.title + "</label><br>";
               
               
               } else if (type == 'events') {
               
               
               strHTMLDetail = strHTMLDetail + "<br><div class='detailPageDiv' style='border :none'><table border='0' class='detailPageTable'><tr><td style='width : 50%'>";
               
               if (itemType.authorCount == 1) {
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='" + actualLocal + "' style='border:none; width:90%; margin:10px 10px;'/><br></td>";
               
               } else if (itemType.authorCount == 2) {
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='" + actualLocal + "' style='border:none; width:90%; margin:10px 10px'/><br></td>";
               
               } else {
               
               strHTMLDetail = strHTMLDetail + "<img id='docImg' src='" + actualLocal + "' style='border:none; width:90%;  margin:10px 10px'/><br></td>";
               
               }
               
               strHTMLDetail = strHTMLDetail + "</td><td style='width : 50%'></tr><br>";
               if (stringIWant != "") {
               strHTMLDetail += "<tr><td style='width : 100%' colspan='2'style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>" + stringIWant + "</td> </tr>";
               }
               
               strHTMLDetail = strHTMLDetail + "<tr><td style='width : 100%' colspan='2'><img id='docThumb' src='" + icons + "' style='height:20px; width:20px; border:none;margin:5px; '/>";
               
               strHTMLDetail = strHTMLDetail + "<label id='videoTitle' style='font-size: 24px;font-family: AgfaRotisSans;padding-top : 0px;'>" + itemType.title + "</label><br>";
               
               
               } else if (type == 'contributor') {
               showAuthorDetailPage(itemType.title);
               }
               
               $.each(itemType.author, function(key, tempAuthor) {
                      authornamefromid = tempAuthor;
                      strHTMLDetail = strHTMLDetail + "<a id='"+tempAuthor+"' data-transition='slide' style='text-decoration:none;font-style:normal;' onclick='showAuthorDetailPage(this.id)'  >";
                      strHTMLDetail = strHTMLDetail + "<label style='font-size: 14px;font-family: AgfaRotisSans;color:orange'>"+tempAuthor+"</label></a><br>";
                      
                      });

               
               strHTMLDetail = strHTMLDetail + "<label id='videoDate' style='font-size: 14px;'>" + itemType.publishedDateStart + "</label><br><br><br>";
               strHTMLDetail = strHTMLDetail + "<label id='videoDescription' style='font-size: 14px;'>" + itemType.description + "</label>";
               
               strHTMLDetail = strHTMLDetail + "<br><br></td></tr></table>";
               
               
               strHTML = strHTML + "<div style='width: 100%; height: 20px;background:white;border:none'>";
               strHTML = strHTML + "<table style='width: 100%;background:white'><tr>";
               strHTML = strHTML + "<td id='prevBtn' style='float: left; padding-left: 3%; padding-top: 7px; vertical-align: middle' onclick='showpreItem(" + elementId + ")' ><img width='90' src='images/btn_previous.png' class='nextprevEffects'></img></td>";
               strHTML = strHTML + "<td id='nextBtn' style='float: right; padding-right: 3%; padding-top: 7px; vertical-align: middle' onclick='showNextItem(" + elementId + ")' ><img width='60' src='images/btn_next.png' class='nextprevEffects'></img></td>";
               strHTML = strHTML + "</tr><tr><td><hr style='width:100%;background-color: white; color: grey; height:0.5px;margin-top:-5px;'></td></tr></table></div></div>";
               
               }
               });
        
        
        
        document.getElementById('spotItemContent').style.display = "none";
        $('#detailPageArea').html(strHTMLDetail);
        $('#prevNextContentArea').html(strHTML);
        
        
        if (countNum == 0) {
            document.getElementById("prevBtn").style.display = "none";
        }
        
        if (countNum == -1) {
            document.getElementById('nextBtn').style.display = "none";
        }
        
        
        if (countNum == -100) {
            document.getElementById('prevBtn').style.display = "none";
            document.getElementById('nextBtn').style.display = "none";
        }
        
        strHTMLDetail = '';
        strHTML = '';
        $.mobile.changePage('#detailMediaPage');
    }
    
    $('video').bind('play', stopMedia);
    
}

function downloadSpotlightThumbnails(thumb, actual)
{
    
    var spotlightThumbUrl = thumb;
    var spotlightActualUrl = actual;
    
    var spotlightThumbPath = globalPathNew + "/images/spotlightThumb.png";
    var spotlightActualPath = globalPathNew + "/images/spotlightActual.png";
    
    if(isOnline){
        
            var thumbDownload = new FileTransfer();
    
            thumbDownload.download(
                        spotlightThumbUrl,
                        spotlightThumbPath,
                        function(entry) {
                                                                  
                                        },
                        function(error) {
                                console.log("Error Code " + error.code);
                                if(error.code != 4 || error.code != '4'){
                                }
                        }
                        );
        
        var actualDownload = new FileTransfer();
        
        actualDownload.download(
                               spotlightActualUrl,
                               spotlightActualPath,
                               function(entry) {
                          
                               },
                               function(error) {
                               console.log("Error Code " + error.code);
                               if(error.code != 4 || error.code != '4'){
                               }
                               }
                               );
        
        }
}