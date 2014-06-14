$(document).ready(function() {
                  
	$.mobile.changePage("#intialPage");

    var form1Var = $('#frmLogin');

	$('#logout,#logout2,#logout3').on('click', function() {
		
        loggedIn = false;
		userName = "";
        
        $('#avPlayer').html('');
		logoutApp();
                                      
	});
                  
    $('#audioBack').on('click', function() {
           document.getElementById('avPlayer').innerHTML = "";
           $.mobile.changePage("#itemVideo");
    });
                  
	$('#downloadFile').on('click', function() {
		downloadMedia();
	});
                  
    $('#btnDeleteItem').on('click', function() {
       
        $('#avPlayer').css("display","none");
        deleteCurrentPlayingFile();
    });
                  
    $('#imgBack').on('click', function() {
            $.mobile.changePage("#businessCategory");
    });
                  
    $('#TAListResult').on('click', function() {
        getList();
    });
    
    $('#BackPlayer').on('click', function() {
        $.mobile.changePage("#categoryItem");
        document.getElementById('avPlayer').innerHTML = "";
    });  
                  
    $('#searchTAListResult, #searchDetailMediaPage, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory').focus(function(){
                                                                                                                                                                                                                                                                 
            $(this).attr('placeholder','');
                                                                                                                                                                                                                                                                 
    });           
                  
});

function logoutApp() {	
    console.log('Else device.platform:'+device.platform);    
    $.mobile.changePage('#logoutPage');
}

function setUserInfo(value) 
{
    if(value.length){
        
        var username = (value.substr(10,value.length)).split("@")[0];
            console.log('Storing userName to memory :'+username);
            document.getElementById("lblUserName").innerHTML = username.replace(/\./g, '.');
	}
}


function loadDataforOfflineMode()
{
    var userName = window.localStorage.getItem("userName");
    console.log('In loadDataforOfflineMode :'+userName);
	getFileSystemRefForReading(true, null);
}


//******************************************** Audio Start ********************************************
//
//function updateAudioDownloadList(e) {
//	if (e.checked) {
//		downloadList.push(e);
//        //console.log('<---------------------------------->');
//	} else {
//		for (var i = 0; i < downloadList.length; i++) {
//			if (downloadList[i].id == e.id) {
//				downloadList[i] = '';
//			}
//		}
//	}
//    //showHideDownloadButton();
//}// Audio END

//********************************************Video Start ********************************************

var isDownloadOn = false;


function getFileSize(bytes) {
	if(bytes != 0 && bytes > 1024) {
		var mb = 1024*1024;
		return (bytes/mb).toFixed(1);
	} else {
		return bytes;
	}
}

function deleteCurrentPlayingFile() {
    if(document.getElementById('videoComp'))
        {
            document.getElementById('videoComp').pause();
           }
    
    if(document.getElementById('audioComp'))
         {
             document.getElementById('audioComp').pause();
           }
    //var retVal = confirm("The file will be permanently deleted from your device.");
    jConfirm('The file will be permanently deleted from your device.', 'Tech Time', function(returnValue) {
             if( returnValue == true ){
                confirmDeleteFile();
             } else {
             if(document.getElementById('videoComp'))
             {
             document.getElementById('videoComp').play();
             }
             
             if(document.getElementById('audioComp'))
             {
             document.getElementById('audioComp').play();
             }
             $('#avPlayer').css("display","block");
             
             }
    });
    
}

function confirmDeleteFile() {
    
   
    
    
    var fileNameToDelete = "";
    var changeIsDownloade = "";
    var mediaTypetoDelete = "";
    
    if(document.getElementById('videoComp') ){
        
        //alert('video item exist');
        //alert('videoComp src -->'+document.getElementById('videoComp').src);
        
        fileNameToDelete = document.getElementById('videoComp').src;
        changeIsDownloade = document.getElementById('videoComp').src;
        
        mediaTypetoDelete = 'video';
    }
    if(document.getElementById('audioComp')){
        
        //alert('Audio item exist');
        //alert('Audio src -->'+document.getElementById('audioComp').src);
        
        fileNameToDelete = document.getElementById('audioComp').src;
        changeIsDownloade = document.getElementById('audioComp').src;
        
        mediaTypetoDelete = 'audio';
    }

    $('#avPlayer').html("");    
    
    var n = fileNameToDelete.lastIndexOf("/")+1;
    
    fileNameToDelete = fileNameToDelete.substring(n,fileNameToDelete.length);
    deleteFile(sPath+"/"+fileNameToDelete);
    
    var lastIndex = fileNameToDelete.lastIndexOf('.');
   // alert("lastIndex"+lastIndex);
    fileNameToDelete = fileNameToDelete.substr(0,lastIndex);
    changeIsDownloade = changeIsDownloade.substr(7,(changeIsDownloade.length));
    
    console.log('fileNameToDelete :'+fileNameToDelete);
    console.log('changeIsDownloade :'+changeIsDownloade);
    
    
    //alert("comnfirm delete"+fileNameToDelete);
    
    changeIsdownloadStatus(changeIsDownloade, fileNameToDelete, 'delete');
    
    detailPageView(currElementId,currElementtype,currElementcountNum);
    
//    updateListAfterDelete(changeIsDownloade,mediaTypetoDelete);
}


