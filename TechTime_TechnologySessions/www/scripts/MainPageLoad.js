function createJsonFormat(){jsonData.category=new Array;jsonData.audio=new Array;jsonData.video=new Array;jsonData.events=new Array;jsonData.panelDiscussions=new Array;jsonData.interviews=new Array;jsonData.documents=new Array;jsonData.techConf=new Array;jsonData.technologySessions=new Array;jsonData.techWatchMultiple=new Array;jsonData.techWatchQuotesMultiple=new Array;jsonData.spotLight=new Array;jsonData.contributor=new Array;jsonData.aboutTechTime=new Array;jsonData.contributions=new Array;jsonData.faq=new Array;jsonData.loggedUserName="";jsonData.pendingDownloads=new Array;jsonData.lookUpItemsList=new Array;jsonData.offlineCommentsPosted=new Array;jsonData.downloadedSpotLightItems=new Array;jsonData.listOfFiles=new Array;jsonData.playlists=new Array;var e=new Date;d=e}function getSubscribeRss(){var e=new Date;d=e;var t=document.getElementById("lblUserName").innerHTML;t=t.replace(/\./g,"_");jsonData.loggedUserName=t;var n="https://techtime.accenture.com/techtimemobile/subscribe-service/uid=";n=n+t;$.ajax({type:"GET",url:n,dataType:"xml",success:subscribeTA,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});updateUserVersion("iOS",t,"3.5.0 on "+e);loadTechWatchMultipleUrl();loadPlaylistsData()}function updateUserVersion(e,t,n){if(e=="iOS"){window.GA.trackEventWithCategory("iOS Users",t,n,1)}else if(e=="Android"){window.GA.trackEventWithCategory("Android Users",t,n,1)}else if(e=="Windows"){window.GA.trackEventWithCategory("Windows Users",t,n,1)}}function subscribeTA(e){subscribeCatList="";subscribeCategoryId=new Array;subscribeCategoryId=[];var t=new Date;d=t;var n=0;newAppVersion=$(e).find("item").attr("availableAppVersion");$(e).find("item").each(function(){var e=$(this).find("categoryid").text();var t=$(this).find("asset_type").text();var r=$(this).find("categoryname").text();if(e!=""&&n=="1"){subscribeCategoryId.push(e);if(subscribeCatList==""){subscribeCatList=e}else{subscribeCatList=subscribeCatList+"+"+e}}if($(this).find("asset_type").text()&&t=="documents"){isSubscribeDocument="yes"}if($(this).find("asset_type").text()&&t=="podcast"){isSubscribePodcast="yes"}if($(this).find("asset_type").text()&&t=="events"){isSubscribeEvent="yes"}n=1});if(subscribeCatList==""){subscribeCatList="0"}else{rssUrl="";eventsRss="";documentRss="";rssUrl="https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/audio-video-listing-view";eventsRss="https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/events-listing-view";documentRss="https://techtime.accenture.com/techno-areas/"+subscribeCatList+"/documents-listing-view"}loadtechnologyAreaListUrl()}function loadtechnologyAreaListUrl(){$.ajax({type:"GET",url:technologyAreaListUrl,dataType:"xml",success:displayTAList,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}})}function displayTAList(e){mainCategoryList=new Array;mainCategoryList=[];var t=new Date;d=t;$(e).find("item").each(function(){var e=$(this).find("parentcategoryid").text();if($(this).find("parentcategoryid").text()=="0"){var t="false";var n=$(this).find("categoryid").text();$.each(subscribeCategoryId,function(e,r){if(r==n){t="true";noSubscribe="true"}});if(t=="true"){var r=new Object;r.categoryid=$(this).find("categoryid").text();r.categoryname=$(this).find("categoryname").text();r.subCategoryCount="";r.subCategory="";r.subscribe="yes";r.subscribeDocuments=isSubscribeDocument;r.subbscribePodcast=isSubscribePodcast;r.subbscribeEvent=isSubscribeEvent;mainCategoryList.push(r)}else{var r=new Object;r.categoryid=$(this).find("categoryid").text();r.categoryname=$(this).find("categoryname").text();r.subCategoryCount="";r.subCategory="";r.subscribe="no";r.subscribeDocuments="no";r.subbscribePodcast="no";r.subbscribeEvent="no";mainCategoryList.push(r)}}});$.each(mainCategoryList,function(t,n){var r=new Array;var i=new Object;i.categoryid=n.categoryid;i.parentcategoryid=n.categoryid;i.subCategoryName=n.categoryname;i.audio=new Array;i.video=new Array;i.interviews=new Array;i.panelDiscussions=new Array;i.techConf=new Array;i.technologySessions=new Array;i.document=new Array;i.event=new Array;i.contributor=new Array;r.push(i);$(e).find("item").each(function(){if($(this).find("parentcategoryid").text()==n.categoryid){var e=new Object;e.categoryid=$(this).find("categoryid").text();e.parentcategoryid=$(this).find("parentcategoryid").text();e.subCategoryName=$(this).find("categoryname").text();e.audio=new Array;e.video=new Array;e.interviews=new Array;e.panelDiscussions=new Array;e.techConf=new Array;e.technologySessions=new Array;e.document=new Array;e.event=new Array;e.contributor=new Array;r.push(e)}});n.subCategory=r;n.subCategoryCount=r.length});$.each(mainCategoryList,function(e,t){jsonData.category.push(t)});loadAudioVideoURL()}function loadAudioVideoURL(){var e=new Date;d=e;$.ajax({type:"GET",url:rssUrl,dataType:"xml",success:getAudioVideoItem,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}})}function getAudioVideoItem(e){var t=new Date;d=t;$(e).find("item").each(function(){try{var e="";var t="";var n="";var r="";var s=$(this).find("category").text();var o=$(this).find("contentid").text();var u=$(this).find("title").text();u=u.replace(/'/g,"");var a=$(this).find("pods_formattype").text();if(a=="Audios"||a=="Videos"){a="Technology Sessions"}var f=$(this).find("author").text().replace(/\|/g,",");var l=$(this).find("pods_date").text();var c=$(this).find("description").text();var h=$(this).find("qna").text();var p=$(this).find("thumb").text();var d=$(this).find("actual").text();var v=$(this).find("audio").text();var m=$(this).find("video").text();var g=$(this).find("transcript").text();var y=$(this).find("presentation").text();var b=$(this).find("Content_lang").text();$(this).find("audio").each(function(){e=$(this).attr("length")});$(this).find("video").each(function(){t=$(this).attr("length")});$(this).find("transcript").each(function(){r=$(this).attr("length")});$(this).find("presentation").each(function(){n=$(this).attr("length")});var w=new Array;var E=f.split(",");for(i=0;i<E.length;i++){w.push(E[i])}if(jQuery.inArray(o,audioVideoItemId)==-1){audioVideoItemId.push(o);var S=new Object;S.itemId=o;S.category=s;S.title=u;S.type=a;S.author=w;S.publishedDate=l;S.description=c;S.qna=h;S.thumb=p;S.actual=d;S.audioUrl=v;S.audioLength=e;S.audioIsDownloaded="false";S.isDownloadedAudio="false";S.localPathAudio="";S.downloadedDateA="";S.videoUrl=m;S.videoLength=t;S.videoIsDownloaded="false";S.isDownloadedVideo="false";S.localPathVideo="";S.downloadedDateV="";S.transcriptUrl=g;S.transcriptLength=r;S.transcriptIsDownloaded="false";S.isDownloadedTranscript="false";S.localPathTranscript="";S.downloadedDateT="";S.presentationUrl=y;S.presentationLength=n;S.presentationIsDownloaded="false";S.isDownloadedPresentation="false";S.localPathPresentation="";S.downloadedDateP="";S.thumbLocal="";S.actualLocal="";S.selLanguage=b;if(a=="Audios"){jsonData.technologySessions.push(S)}else if(a=="Videos"){jsonData.technologySessions.push(S)}else if(a=="Panel Discussions"){jsonData.panelDiscussions.push(S)}else if(a=="Technology Conferences"){jsonData.techConf.push(S)}else if(a=="Interviews"){jsonData.interviews.push(S)}else if(a=="Technology Sessions"){jsonData.technologySessions.push(S)}jsonData.lookUpItemsList[o]=S;var x=JSON.stringify(s);x=x.substring(1,x.length-1);var T,N,C,k;var L=x.length;T=0;while(L!=0&&N!=0&&x!=""){x=x.substring(0,x.length);var A=x.split("|");N=x.indexOf("-")+1;T=x.indexOf("|");L=x.length;C=x.substring(0,N-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){for(var n=0;n<A.length;n++){var r=A[n].substring(A[n].indexOf("-")+1,A[n].length);if(r==t.categoryid&&t.subCategoryName==C){if(a=="Audios"){t.technologySessions.push(o)}else if(a=="Videos"){t.technologySessions.push(o)}else if(a=="Panel Discussions"){t.panelDiscussions.push(o)}else if(a=="Technology Conferences"){t.techConf.push(o)}else if(a=="Interviews"){t.interviews.push(o)}else if(a=="Technology Sessions"){t.technologySessions.push(o)}}}})});if(T==-1){L=0}if(N==0){L=0}C=x.substring(T+1,x.length);x=C}}else{}}catch(O){var M="There was an error on this page.\n\n";M+="Error description: "+err.message+"\n\n";M+="Click OK to continue.\n\n"}});loadEventsRss()}function loadEventsRss(){$.ajax({type:"GET",url:eventsRss,dataType:"xml",success:getEventItem,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}})}function getEventItem(e){var t=new Date;d=t;var n=["January","February","March","April","May","June","July","August","September","October","November","December"];$(e).find("item").each(function(){try{var e,t;var n=$(this).find("category").text();var r=$(this).find("icsfile").text();var s=$(this).find("contentid").text();var o=$(this).find("title").text();var u=$(this).find("content_type").text();var a=$(this).find("author_count").text();var f=$(this).find("author").text().replace(/\|/g,",");var l=$(this).find("description").text();var c=$(this).find("event_sdate").text();var h=$(this).find("event_sdate").text();var p=$(this).find("event_edate").text();var d=$(this).find("thumb").text();var v=$(this).find("actual").text();var m=$(this).find("etime").text();$(this).find("thumb").each(function(){e=$(this).attr("length")});$(this).find("actual").each(function(){t=$(this).attr("length")});var g=new Array;var y=f.split(",");for(i=0;i<y.length;i++){g.push(y[i])}if(jQuery.inArray(s,eventItemId)==-1){eventItemId.push(s);var b=new Object;b.itemId=s;b.title=o;b.type=u;b.icsfile=r;b.category=n;b.publishedDate=c;b.startDate=h;b.endDate=p;b.author=g;b.authorCount=a;b.description=l;b.thumb=d;b.thumbLength=e;b.actual=v;b.actualLength=t;b.etime=m;b.thumbLocal="";b.actualLocal="";jsonData.events.push(b);jsonData.lookUpItemsList[s]=b;var w=JSON.stringify(n);w=w.substring(1,w.length);var E,S,x;var T=w.length;E=0;while(T!==0&&S!=0&&w!=""){S=w.indexOf("-")+1;E=w.indexOf("|");T=w.length;x=w.substring(0,S-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){if(t.subCategoryName==x){t.event.push(s)}})});if(E==-1){T=0}if(S==0){T=0}x=w.substring(E+1,w.length);w=x}}else{}}catch(N){var C="There was an error on this page.\n\n";C+="Error description: "+err.message+"\n\n";C+="Click OK to continue.\n\n"}});loadDocumentRss()}function loadDocumentRss(){$.ajax({type:"GET",url:documentRss,dataType:"xml",success:getDocumentItem,error:function(e,t,n){}})}function getDocumentItem(e){var t=new Date;d=t;$(e).find("item").each(function(){try{var e,t,n;var r=$(this).find("category").text();var s=$(this).find("contentid").text();var o=$(this).find("title").text();var u=$(this).find("description").text();var a=$(this).find("content_type").text();var f=$(this).find("author").text().replace(/\|/g,",");var l=$(this).find("Content_lang").text();var c=$(this).find("document_date").text();var h=$(this).find("thumb").text();var p=$(this).find("actual").text();var d=$(this).find("document_pdf").text();$(this).find("thumb").each(function(){n=$(this).attr("length")});$(this).find("thumb").each(function(){e=$(this).attr("length")});$(this).find("actual").each(function(){t=$(this).attr("length")});if(jQuery.inArray(s,documentItemId)==-1){documentItemId.push(s);var v=new Array;var m=f.split(",");for(i=0;i<m.length;i++){v.push(m[i])}var g=new Object;g.itemId=s;g.title=o;g.description=u;g.publishedDate=c;g.type=a;g.author=v;g.category=r;g.thumb=h;g.thumbLength=e;g.actual=p;g.actualLength=t;g.pdf=d;g.apdfLength=n;g.isDownloaded="false";g.localPath="";g.thumbLocal="";g.actualLocal="";g.downloadedDateD="";g.selLanguage=l;jsonData.documents.push(g);jsonData.lookUpItemsList[s]=g;var y=JSON.stringify(r);y=y.substring(1,y.length);var b,w,E;var S=y.length;b=0;while(S!==0&&w!=0&&y!=""){w=y.indexOf("-")+1;b=y.indexOf("|");S=y.length;E=y.substring(0,w-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){if(t.subCategoryName==E){t.document.push(s)}})});if(b==-1){S=0}if(w==0){S=0}E=y.substring(b+1,y.length);y=E}}else{}}catch(x){var T="There was an error on this page.\n\n";T+="Error description: "+err.message+"\n\n";T+="Click OK to continue.\n\n"}});loadContributorRss();isDataLoaded=true;if(isAppUpgradeAvailable==false){$.mobile.changePage("#businessCategory");$("#applicationUpgradeTab").css("display","none");$("#applicationUpdateButton").css("display","none")}else if(isAppUpgradeAvailable==true&&setCancelAction==true){$.mobile.changePage("#businessCategory");$("#applicationUpgradeTab").css("display","block");$("#applicationUpdateButton").css("display","block")}$("#imgRefreshProgress").hide()}function loadContributorRss(){var e="https://techtime.accenture.com/mobile-contributor-listing.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadContributorData,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});e="";loadSpotlightUrl();loadFaqRss();downloadThumbImagesOnLogin()}function loadContributorData(e){var t=new Date;d=t;$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("guid").text();var n=$(this).find("category").text();var r=$(this).find("description").text();var i=$(this).find("contributor").text();var s=$(this).find("date").text();var o=$(this).find("thumb").text();var u=$(this).find("actual").text();var a=$(this).find("email").text();var f=new Object;f.itemId=t;f.title=e;f.category=n;f.description=r;f.contributor=i;f.date=s;f.type="contributor";f.thumb=o;f.actual=u;f.thumbLocal="";f.actualLocal="";f.email=a;jsonData.contributor.push(f)}catch(l){var c="There was an error on this page.\n\n";c+="Error description: "+err.message+"\n\n";c+="Click OK to continue.\n\n"}});if(isOnline){getFileSystemRefForWriting(jsonData)}}function loadTechWatchMultipleUrl(){var e="https://techtime.accenture.com/mobile-tech-watch";var t=new Date;d=t;$.ajax({type:"GET",url:e,dataType:"xml",success:loadTechWatchMultipleData,error:function(e,t,n){}});e=""}function loadTechWatchMultipleData(e){$(e).find("techwatch").each(function(e,t){try{var n=new Object;var r=$(this).attr("type");var i=$(this).attr("id");var s=$(this).attr("publishedDate");if(r=="current"){currentTechWatchItemId=i;currentTechWatchItemIndex=e;window.localStorage.setItem("currentTechWatchItemId",currentTechWatchItemId);window.localStorage.setItem("currentTechWatchItemIndex",currentTechWatchItemIndex)}n.techWatchPublicationType=r;n.techWatchPublicationId=i;n.techWatchPublicationDate=s;n.techWatchPublicationIndex=e;n.techWatchPublicationDateString=getFormattedDate(s);var o=new Array;var u=1;$(this).find("item").each(function(){var t=new Array;var n=$(this).find("title").text();var r=$(this).find("type").text();var s=$(this).find("article");s.each(function(n,s){var o=new Object;o.articleTitle=$(this).find("article_title").text();o.articleUrl=$(this).find("article_url").text();o.articleDescription=$(this).find("article_description").text();o.articleType=$(this).attr("type");if(o.articleType=="showcase"){var a=new Object;a.techwatchPubIndex=e;a.techwatchPubId=i;a.articleIndex=u;a.articleTitle=o.articleTitle;a.articleUrl=o.articleUrl;a.articleDescription=o.articleDescription;window.localStorage.setItem("techwatchPubIndex",e);window.localStorage.setItem("techwatchPubId",i);window.localStorage.setItem("articleIndex",u);window.localStorage.setItem("articleTitle",o.articleTitle);window.localStorage.setItem("articleUrl",o.articleUrl);window.localStorage.setItem("articleDescription",o.articleDescription);window.localStorage.setItem("articleType",r)}u=u+1;t.push(o)});var a=new Object;a.itemTitle=n;a.itemType=r;a.itemArticleArray=t;o.push(a)});n.techWatchPublicationItems=o;jsonData.techWatchMultiple.push(n)}catch(a){var f="There was an error on this page.\n\n";f+="Error description: "+a.message+"\n\n";f+="Click OK to continue.\n\n"}});if(jsonData.techWatchMultiple.length==100){var t=new Date;d=t}}function loadSpotlightUrl(){var e="https://techtime.accenture.com/mobile-spotlight-feeds.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadSpotlightGeneral,error:function(e,t,n){console.log("In Failure SPOTLIGHT "+JSON.stringify(e))}});e=""}function loadFaqRss(){var e="https://techtime.accenture.com/mobile-faq-rss/faq.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadFaq,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});e=""}function loadFaq(e){var t=new Date;d=t;$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("question_order").text();var n=$(this).find("description").text();var r=$(this).find("image1").text();var i=$(this).find("image2").text();var s=new Object;s.title=e;s.qOrder=t;s.sImage1=r;s.sImage2=i;s.description=n;jsonData.faq.push(s)}catch(o){var u="There was an error on this page.\n\n";u+="Error description: "+err.message+"\n\n";u+="Click OK to continue.\n\n"}});if(isAppUpgradeAvailable==false){$.mobile.changePage("#businessCategory")}else if(isAppUpgradeAvailable==true&&setCancelAction==true){$.mobile.changePage("#businessCategory")}}function loadAboutTechTimeRss(){var e="https://techtime.accenture.com/mobile-about-us/aboutus.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadAboutTechTime,error:function(e,t,n){}});e=""}function loadAboutTechTime(e){var t=new Date;d=t;newAppVersion=$(e).find("iosAppVersion").text();var n=$(e).find("updateMessage").text();$("#customUpdateMessage").html(n);checkForApplicationUpgradeAvailability();$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("image").text();var n=$(this).find("description").text();var r=new Object;r.title=e;r.description=n;r.image=t;jsonData.aboutTechTime.push(r)}catch(i){var s="There was an error on this page.\n\n";s+="Error description: "+err.message+"\n\n";s+="Click OK to continue.\n\n"}})}function createJsonFormatOffline(e){jsonData=e;if(e){noSubscribe="true";$("#imgRefreshProgress").hide()}else{$("#errormsg").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.");$.mobile.changePage("#loggedOutPage");$("#imgRefreshProgress").hide()}}function backnav(e){backPage(e)}function backPage(e){var t=window.localStorage.getItem("spotLightFlag");stopPlayingMedia();if(e=="detailMediaPage"){if(eventsFlag){var n=window.localStorage.getItem("eventmonth");var r=window.localStorage.getItem("eventcount");var i=window.localStorage.getItem("currMonth");showUpcomingEventList(n,r,i);$.mobile.changePage("#UpcomingEventsPage")}else if(mediaFlag){if(!spotLightFlag){var s=window.localStorage.getItem("currentCategoryOff");var o=window.localStorage.getItem("currentCategoryIdOff");selectedCategoryId=o;selectedCategoryName=s;$.mobile.changePage("#TAListResult",{transition:"none"})}else{$.mobile.changePage("#businessCategory",{transition:"none"})}}else if(searchFromMainPage){$.mobile.changePage("#searchResultPage")}else{$(".navigateBackBtn").hide();if(t){$(".navigateBackBtn").show()}$.mobile.changePage("#businessCategory")}}else if(e=="TAListResult"||e=="UpcomingEventsPage"||e=="aboutTectTimePage"||e=="contactUsPage"||e=="faqPage"){defaultNavigate();$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory")}else if(e=="subscribePage"){defaultNavigate();$(".navigateBackBtn").hide();$("#subscribePageDiv").hide();$.mobile.changePage("#businessCategory")}else if(e=="DownloadsPage"){gotFS(fileSystem);if(dwPgflag&&!playlistItemsPageFlag){if(spotLightFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f)}else{var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f)}$.mobile.changePage("#detailMediaPage")}else if(dwPgflag&&playlistItemsPageFlag){$.mobile.changePage("#playlistsItemPage")}else{defaultNavigate();$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory")}}else if(e=="techwatchPage"){defaultNavigate();$.mobile.changePage("#businessCategory");currentTechWatchItemId=window.localStorage.getItem("currentTechWatchItemId");currentTechWatchItemIndex=window.localStorage.getItem("currentTechWatchItemIndex")}else if(e=="detailAuthor"&&t!="true"){var l=window.localStorage.getItem("eventFlag");var c=window.localStorage.getItem("spotLightFlag");var h=window.localStorage.getItem("mediaFlag");if(l=="true"){var p=window.localStorage.getItem("eventitemId");UpcomingEventsDetail(p);$.mobile.changePage("#detailMediaPage")}else if(h=="true"){var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");var d=window.localStorage.getItem("detailPageitemCount");detailPageView(u,a,f,d);$.mobile.changePage("#detailMediaPage")}else{$.mobile.changePage("#businessCategory")}}else if(e=="detailAuthor"&&t=="true"){$.mobile.changePage("#businessCategory")}else if(e=="itemVideo"){if(mediaFlag){var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");var d=window.localStorage.getItem("detailPageitemCount");detailPageView(u,a,f,d);$.mobile.changePage("#detailMediaPage")}else{$.mobile.changePage("#DownloadsPage")}}else if(e=="qnaPage"){var u="";var a="";var f="";if(spotLightFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f)}else{var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f)}$.mobile.changePage("#detailMediaPage")}else if(e=="searchResultPage"){if(searchFromMediaPage){if(spotLightFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f)}else{var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f)}}else if(searchFromEventsPage){var p=window.localStorage.getItem("eventitemId");UpcomingEventsDetail(p);$.mobile.changePage("#detailMediaPage")}else if(searchFromSpotlightPage){showSpotLightContent();$.mobile.changePage("#detailMediaPage")}else if(searchFromUpcomingEventsPage){var n=window.localStorage.getItem("eventmonth");var r=window.localStorage.getItem("eventcount");var i=window.localStorage.getItem("currMonth");showUpcomingEventList(n,r,i);$.mobile.changePage("#UpcomingEventsPage")}else if(searchFromContributePage){resetSelfRecordingForms();resetAssistedRecordingForms();$.mobile.changePage("#ContributePage")}else if(searchFromTAListResultPage){var s=window.localStorage.getItem("currentCategoryOff");var o=window.localStorage.getItem("currentCategoryIdOff");selectedCategoryId=o;selectedCategoryName=s;showTAListResult(s,o);$.mobile.changePage("#TAListResult")}else if(searchFromAuthorDetailPage){var v=window.localStorage.getItem("aNameFromId");showAuthorDetailPage(v);$.mobile.changePage("#detailAuthor")}else if(searchFromDownloadsPage){showInProgress();$.mobile.changePage("#DownloadsPage")}else if(searchFromContactUsPage){contactUsFocus();$.mobile.changePage("#contactUsPage")}else if(searchFromAboutPage){showAboutTTArea();$.mobile.changePage("#aboutTectTimePage")}else if(searchFromFaqPage){showFaqContent();$.mobile.changePage("#faqPage")}else if(searchFroSubscribPage){showSubscribeContent();$.mobile.changePage("#subscribePage");$.mobile.changePage("#subscribePage")}else if(searchFromtechWatchPage){showTechWatchContent(currentItemId,currentItemIndex);$.mobile.changePage("#techwatchPage",{transition:"none"})}else if(searchFromPlaylistsPage){resetPlaylistLMRParameters();displayPlaylist();$.mobile.changePage("#PlaylistsPage");resetSearchFlags()}else if(searchFromPlaylistItemsPage){$.mobile.changePage("#playlistsItemPage");resetSearchFlags()}else if(searchFromSharePlaylistsPage){resetSharePlaylistForm();resetSharePlaylistParameters();$.mobile.changePage("#sharePlaylistsPage")}else if(searchFromAddToPlaylistPage){$.mobile.changePage("#addToPlaylistPage")}else{$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory");searchFromMediaPage=false;searchFromEventsPage=false;searchFromSpotlightPage=false;searchFromUpcomingEventsPage=false;searchFromTAListResultPage=false;searchFromAuthorDetailPage=false;searchFromDownloadsPage=false;searchFromMainPage=false;searchFromContactUsPage=false;searchFromAboutPage=false;searchFromFaqPage=false;searchFroSubscribPage=false;searchFromTechWatch=false;searchFromtechWatchPage=false;searchFromPlaylistsPage=false;searchFromContributePage=false;searchFromPlaylistItemsPage=false;searchFromSharePlaylistsPage=false;searchFromAddToPlaylistPage=false;searchFromSpotlightPage=false}}else if(e=="sharePlaylistPage"){resetPlaylistLMRParameters();displayPlaylist();$.mobile.changePage("#PlaylistsPage");resetSharePlaylistParameters()}else if(e=="playlistPage"){$.mobile.changePage("#businessCategory")}else if(e=="addToPlaylistPage"){$.mobile.changePage("#detailMediaPage")}else if(e=="playlistItemPage"){resetPlaylistLMRParameters();displayPlaylist();document.getElementById("playlistItemPlayer").pause();$.mobile.changePage("#PlaylistsPage")}else if(e=="contributePage"){$.mobile.changePage("#businessCategory")}}function compareAndUpdateJSON1(e){document.getElementById("showProgressBar").innerHTML="";$.each(e.contributions,function(e,t){jsonData.contributions.push(t)});if(e.offlineCommentsPosted.length>0){$.each(e.offlineCommentsPosted,function(e,t){jsonData.offlineCommentsPosted.push(t)});postOfflineComments()}$.each(e.downloadedSpotLightItems,function(e,t){jsonData.downloadedSpotLightItems.push(t)});if(isOnline){generateUserDownloadsJson()}}function generateUserDownloadsJson(){var e='{"data":{"username":"'+jsonData.loggedUserName+'","downloadedItems":[';var t="";var n=new Array;for(i=0;i<entries.length;i++){n.push('"'+entries[i]+'"')}e=e+n+'],"devicePlatform":"'+device.platform+'","deviceUUID":"'+deviceUDID+'","deviceModel":"'+device.model+'"}}';postUserDownloads(e)}function postUserDownloads(e){var t=e;var n="https://techtime.accenture.com/techtimemobile/mobiletrack";if(isOnline){$.ajax({type:"POST",url:n,data:t,dataType:"text",contentType:"application/json",success:function(e){},error:function(e,t,n){console.log("*****In Failure***"+JSON.stringify(e))}})}}function showCategoriesListsagar(e){var t="";if(!isOnline&&e==null){$("#errorString").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content. Please close the application and connect to Internet.");$.mobile.changePage("#errorPage");return}else{jsonData=e;changeDownloadLogoutColor();t="";var n=new Date;d=n}}function downloadedListload(e,t,n,r,i,s){if(i==1){type="A"}else if(i==2){type="V"}else if(i==3){type="P"}else if(i==4){type="T"}else if(i==5){type="D"}var o=new Object;o.itemId=e;o.title=r;o.publishedDate="";o.type=type;o.author="";o.isDownloaded=n;o.localPath=s;o.val=i}function resumePendingDownloads(e){document.getElementById("showProgressBar").innerHTML="";$.each(e,function(e,t){var n=t.elementId;var r=t.elementTitle;var i=t.isDownloadedFlag;var s=t.elementAudio;var o=t.val;if(isOnline){downloadFile(n,r,i,s,o)}})}function jsonPostAfterDownload(e){var t='{"data":{"username":"'+jsonData.loggedUserName+'", "downloadedItems":['+e+"]}}";postUserDownloads(t)}function getFormattedDate(e){var t=e.replace(/-/g,"/");var n=/(.*?)\/(.*?)\/(.*?)$/;var r=t.replace(n,function(e,t,n,r){var i=["January","February","March","April","May","June","July","August","September","October","November","December"];if(Math.floor(t/10)!=1){if(Math.floor(t%10)==1){return t+"st "+i[n-1]+", "+r}else if(Math.floor(t%10)==2){return t+"nd "+i[n-1]+", "+r}else if(Math.floor(t%10)==3){return t+"rd "+i[n-1]+", "+r}else{return t+"th "+i[n-1]+", "+r}}else{return t+"th "+i[n-1]+", "+r}});return r}function generateTechWatchShowCaseArticle(){var e=window.localStorage.getItem("techwatchPubIndex");var t=window.localStorage.getItem("techwatchPubId");var n=window.localStorage.getItem("articleIndex");var r=window.localStorage.getItem("articleTitle");var i=window.localStorage.getItem("articleUrl");var s=window.localStorage.getItem("articleDescription");var o=window.localStorage.getItem("articleType");showCaseArticleObject.showcaseArticleTechWatchPubIndex=e;showCaseArticleObject.showcaseArticleTechWatchPubId=t;showCaseArticleObject.articleIndex=n;showCaseArticleObject.articleTitle=r;showCaseArticleObject.articleUrl=i;showCaseArticleObject.articleDescription=s;showCaseArticleObject.articleType=o;var u="";u+="<div id='techWatchShowcaseArticleHeader' style='width:100%;padding-left:2%;' onclick='loadShowCaseArticleTechWatch()'>";u+="<label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:20px;display:table-cell;'>TechWatch - Showcase Article:</label>";u+="</div>";u+="<div id='techwatchShowcaseArticleTitle' style='width:100%;padding-left:2%;padding-right:2%;margin-top:0px;'><label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:18px;display:table-cell;word-wrap:break-word;'>"+r;u+="</label></div>";u+="<div id='techwatchShowcaseArticleDescription' style='margin-left:1%;margin-bottom:5px;width:96%;padding-top:3px;padding-bottom:3px;padding-left:2%;background-color:white;border-radius:15px;'><label style='word-wrap:break-word;color:black;font-family:Arial;font-weight:bold;font-size:15px;font-style:italic;display:table-row;text-align:left;'>"+s;u+="</label></div><div style='witdh:100%;text-align:right;padding-right:2%;'><a class='linkeffect' onclick='readMoreData(\""+i+"\");' href='#' style='text-decoration:none;color:white;font-size:14px;'><b>Read more</b></a></div>";$("#myShowcaseArticleDiv").html(u)}function loadShowCaseArticleTechWatch(){var e="#articleTitleDiv"+showCaseArticleObject.articleIndex;var t=".articleTitleDiv"+showCaseArticleObject.articleIndex;showTechWatchContent(showCaseArticleObject.showcaseArticleTechWatchPubId,showCaseArticleObject.showcaseArticleTechWatchPubIndex);$.mobile.changePage("#techwatchPage");if(showCaseArticleObject.articleType=="povs"){$(".articleTitlePoVDiv"+showCaseArticleObject.articleIndex).addClass("showCaseArticlePoVDiv");$(e).addClass("showCaseArticleDiv");$(t).addClass("showCaseArticleDiv")}else{$(e).addClass("showCaseArticleDiv");$(t).addClass("showCaseArticleDiv")}}function downloadThumbImagesOnLogin(){$.each(jsonData.documents,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.spotLight,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.panelDiscussions,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.interviews,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.techConf,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.technologySessions,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.contributor,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.events,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});if(jsonData.imagesToDownload.length!=0&&jsonData.imagesToDownload.length>0){downloadAllRequiredImages()}}function downloadAllRequiredImages(){downloadAllRequiredImagesLength=jsonData.imagesToDownload.length;var e=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].itemId;var t=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].url;var n=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].type;if(n=="thumb"){downloadThumbImages(e,n,t,"Interviews")}else if(n=="actual"){downloadThumbImages(e,n,t,"Interviews")}}function downloadThumbImages(e,t,n,r){var i="";i=n;var s="";s=t;var o="";o="false";var u="";u="";var a=new FileTransfer;if(isOnline){u=globalPathNew+"images/"+e+t+".png";if(i!=""){a.download(i,u,function(e){downloadAllRequiredImagesCounter=downloadAllRequiredImagesCounter+1;if(downloadAllRequiredImagesCounter<downloadAllRequiredImagesLength){downloadAllRequiredImages()}},function(e){downloadAllRequiredImagesCounter=downloadAllRequiredImagesCounter+1;if(downloadAllRequiredImagesCounter<downloadAllRequiredImagesLength){downloadAllRequiredImages()}})}}}var noSubscribe="false";var subscribeCatList="";var jsonData=new Object;var mainCategoryList=new Array;var audioVideoItemId=new Array;var eventItemId=new Array;var documentItemId=new Array;var subscribeCategoryId=new Array;var isSubscribeDocument="no";var isSubscribePodcast="no";var isSubscribeEvent="no";var technologyAreaListUrl="https://techtime.accenture.com/techtimemobile/subscribe-service/all";var rssUrl="https://techtime.accenture.com/techno-areas/1+2/audio-video-listing-view";var documentRss="https://techtime.accenture.com/techno-areas/1+2/documents-listing-view";var eventsRss="https://techtime.accenture.com/techno-areas/1+2/events-listing-view";var selectedCategoryId="";var selectedCategoryName="";var resFinal=new Array;var currentTechWatchItemId="";var currentTechWatchItemIndex="";var techWatchTraverseIndex="";var showCaseArticleObject=new Object;var downloadAllRequiredImagesCounter=0;var downloadAllRequiredImagesLength