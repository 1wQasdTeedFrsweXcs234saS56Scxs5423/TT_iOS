

function startSync()
{
    var finaldwn = new Array();
    $.each(jsonData.techConf, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath= createPath + "/TA" + CheckDownload.itemId + extractFormatType;
           
           createdFileName = "TA"+CheckDownload.itemId;
           
           
           tempOBJ.path = createPath;
           var returnFromUrl = entries.indexOf(createdFileName);
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/TV" + CheckDownload.itemId + extractFormatType;
           
           createdFileName = "TV"+CheckDownload.itemId;
           
           tempOBJ.path = createPath;
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
           
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           createPath = createPath + "/TP" + CheckDownload.itemId + ".pdf";
           
           createdFileName = "TP"+CheckDownload.itemId;
           
           tempOBJ.path = createPath;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/TT" + CheckDownload.itemId + ".pdf";
           
           createdFileName = "TT"+CheckDownload.itemId;
           
           
           tempOBJ.path = createPath;
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
           
           
           });
    
    
    $.each(jsonData.technologySessions, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/VA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "VA"+CheckDownload.itemId;
           tempOBJ.path = createPath;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/VV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "VV"+CheckDownload.itemId;
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/VP" + CheckDownload.itemId + ".pdf";
           createdFileName = "VP"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/VT" + CheckDownload.itemId + ".pdf";
           createdFileName = "VT"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
           
           });
    
    
    $.each(jsonData.technologySessions, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/AA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "AA"+CheckDownload.itemId;
           tempOBJ.path = createPath;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/AV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "AV"+CheckDownload.itemId;
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/AP" + CheckDownload.itemId + ".pdf";
           createdFileName = "AP"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/AT" + CheckDownload.itemId + ".pdf";
           createdFileName = "AT"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
           
           });
    
    $.each(jsonData.panelDiscussions, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/PA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "PA"+CheckDownload.itemId;
           
           tempOBJ.path = createPath;
           
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/PV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "PV"+CheckDownload.itemId;
           
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
           
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/PP" + CheckDownload.itemId + ".pdf";
           createdFileName = "PP"+CheckDownload.itemId;
           
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/PT" + CheckDownload.itemId + ".pdf";
           createdFileName = "PT"+CheckDownload.itemId;
           
           
           var returnFromUrl = entries.indexOf(createdFileName);
           
           
           
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
           
           
           
           });
    
    
    $.each(jsonData.interviews, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "1";
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.audioUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.audioUrl.substr(indexPosition, CheckDownload.audioUrl.length);
           
           
           var lastInstance = CheckDownload.localPathAudio.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/IA" + CheckDownload.itemId + extractFormatType;
           createdFileName = "IA"+CheckDownload.itemId;
           
           tempOBJ.path = createPath;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedAudio = 'true';
           CheckDownload.localPathAudio = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "2";
           
           tempOBJ.title = CheckDownload.title;
           
           var indexPosition = CheckDownload.videoUrl.lastIndexOf(".");
           var extractFormatType = CheckDownload.videoUrl.substr(indexPosition, CheckDownload.videoUrl.length);
           
           var lastInstance = CheckDownload.localPathVideo.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/IV" + CheckDownload.itemId + extractFormatType;
           createdFileName = "IV"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedVideo = 'true';
           CheckDownload.localPathVideo = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "3";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathPresentation.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/IP" + CheckDownload.itemId + ".pdf";
           createdFileName = "IP"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedPresentation = 'true';
           CheckDownload.localPathPresentation = createPath;
           }
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "4";
           tempOBJ.title = CheckDownload.title;
           
           var lastInstance = CheckDownload.localPathTranscript.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/IT" + CheckDownload.itemId + ".pdf";
           createdFileName = "IT"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloadedTranscript = 'true';
           CheckDownload.localPathTranscript = createPath;
           }
           });
    
    
    $.each(jsonData.documents, function(key, CheckDownload) {
           
           var tempOBJ = new Object();
           tempOBJ.id = CheckDownload.itemId;
           tempOBJ.val = "5";
           tempOBJ.title = CheckDownload.title;
           
           
           var lastInstance = CheckDownload.localPath.lastIndexOf("/");
           var createPath = "file://"+globalPath;
           
           createPath = createPath + "/DD" + CheckDownload.itemId + ".pdf";
           createdFileName = "DD"+CheckDownload.itemId;
           
           var returnFromUrl = entries.indexOf(createdFileName);
           if(returnFromUrl != -1)
           {
           CheckDownload.isDownloaded = 'true';
           CheckDownload.localPath = createPath;
           }
           
           
           });
    
    getFileSystemRefForWriting(jsonData);

}


function syncWithFolder(changeFilePath)
{
    itemId = itemId.substr(2,itemId.length);
    
    var tempfilePathLocal = changeFilePath;
    
    var flag = 'true';
    var testChar = changeFilePath.lastIndexOf('/');
    var tempMedia = changeFilePath.substr(testChar+1,1);
    var tempDocument = changeFilePath.substr(testChar+2,1);

    
    if(type == 'delete'){
        tempfilePathLocal = '';
        flag = 'false';
    }
       
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
    
    if(tempMedia == 'T'){
        
        $.each(jsonData.techConf, function(key, confItem) {
               
               if(confItem.itemId == itemId){
               
               if(tempDocument == 'A'){
               confItem.localPathAudio = tempfilePathLocal;
               confItem.isDownloadedAudio = flag;
               confItem.downloadedDateA = new Date();
               }
               
               if(tempDocument == 'V'){
               confItem.localPathVideo = tempfilePathLocal;
               confItem.isDownloadedVideo = flag;
               confItem.downloadedDateV = new Date();
               }
               if(tempDocument == 'T'){
               confItem.localPathTranscript = tempfilePathLocal;
               confItem.isDownloadedTranscript = flag;
               confItem.downloadedDateT = new Date();
               }
               if(tempDocument == 'P'){
               confItem.localPathPresentation = tempfilePathLocal;
               confItem.isDownloadedPresentation = flag;
               confItem.downloadedDateP = new Date();
               }
               }
               });
    }
    
    
    
    getFileSystemRefForWriting(jsonData);
    
    
}


