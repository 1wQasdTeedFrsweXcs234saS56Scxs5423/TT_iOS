// ---------------------------------- Global Flags ---------------------------------- //
var currentRecordedSessionType = '';


// ---------------------------------- Global Flags ---------------------------------- //

// ---------------------------------- Load Contributer Page ---------------------------------- //

function loadContributePage()
{
    loadAreaOptions();
    resetAudioPreviewButton();
    resetVideoPreviewButton();
    
    spotLightFlag = false;
    playlistItemsPageFlag = false;
    eventsFlag = false;
    mediaFlag = false;
    
    if(isOnline)
    {
        showRecordingOption("assisted");
    } else if(!isOnline)
    {
        showRecordingOption("assisted");
        //jAlert("Please go online to Contribute to Tech Time.", "Tech Time");
    }
    
}

function loadAreaOptions()
{
    var optionsHTML = '';
    
    optionsHTML += '<option value="Select">Select</option>';
    $.each(jsonData.category, function(index, categoryItem){
           optionsHTML += '<option value="'+categoryItem.categoryname+'" style="font-size:14px;">'+categoryItem.categoryname+'</option>';
           });
    
    $('#select-native-2').html(optionsHTML);
    $('#select-native-5').html(optionsHTML);
    optionsHTML = '';
    
}

// ---------------------------------- Load Contributer Page ---------------------------------- //

// ---------------------------------- Load Pre Recorded Content Screen ---------------------------------- //

function loadPreRecordedContentSection()
{
    $('#preRecordedAudiosVideosSection').css('display', 'block');
    $('#selfRecordingSection').css('display', 'none');
    $('#assistedRecordingSection').css('display', 'none');
}

function loadPreRecordedContentList()
{
    
    $('#preRecordedAudiosVideosList').html('');
    
    if(jsonData.contributions.length > 0)
    {
        var preRecordedSessionsHTML = '';
        
        $.each(jsonData.contributions, function(key, recordedSession){
               preRecordedSessionsHTML += "<div id='recordedSessionItemId"+key+"' style='width:100%;background-color:#F0EFED;padding-top:5px;border-top:2px solid gray;'>";
               
               if(recordedSession.sessionContentType == 'audio')
               {
               preRecordedSessionsHTML += "<div data-sessionId='"+key+"' style='width:90%;float:left;margin-left:1%;'><label id='topicNameLabel' style='font-size:18px;color:orange;font-weight:bold;padding-right:2%;padding-top:10px;word-wrap: break-word'>"+recordedSession.sessionTopic+"</label><br/><br/></div><div style='width:9%;float:left;text-align:right;' onclick='getDetailsOfCurrentRecordedSessin(this);'><img src='images/icon_audio.png' style='height:20px;width:25px;'/><br/><br/></div>"
               } else if(recordedSession.sessionContentType == 'video')
               {
               preRecordedSessionsHTML += "<div data-sessionId='"+key+"' style='width:90%;float:left;' onclick='showRecordedSessionDetails(this);'><label id='topicNameLabel' style='font-size:18px;color:orange;font-weight:bold;padding-left:2%;padding-right:2%;padding-top:10px;'>"+recordedSession.sessionTopic+"</label><br/><br/></div><div style='width:9%;float:left;text-align:right;' onclick='getDetailsOfCurrentRecordedSessin(this);'><img src='images/icon_video.png' style='height:20px;width:25px;'/><br/><br/></div>"
               }
               
               
               preRecordedSessionsHTML += "<div id='recordedSessionDetails"+key+"' data-sessionId='"+key+"' style='width:100%;' >";
               
               preRecordedSessionsHTML += "<div data-sessionId='"+key+"' style='width:90%;float:left;'><label id='areaNameLabel' style='font-size:16px;color:orange;font-weight:normal;padding-left:2%;padding-top:10px;'>"+recordedSession.sessionArea+"</label></div><div data-sessionFilePath='"+recordedSession.sessionFilePath+"' data-sessionId='"+key+"' style='width:9%;float:left;text-align:right;'><img data-sessionId='"+key+"' src='images/cross_mark.png' style='height:20px;width:20px;margin-top:10px;' onclick='deleteCurrentSession(this);'/></div>";
               
               if(recordedSession.sessionFormat != '')
               {
                    preRecordedSessionsHTML += "<div style='width:100%;'><label id='contributorNameLabel' style='font-size:15px;color:orange;font-weight:normal;padding-left:2%;'>"+recordedSession.sessionFormat+"</label></div>";
               }
               
               preRecordedSessionsHTML += "<div style='width:100%;'><label id='recordDateLabel' style='font-size:15px;color:black;font-weight:bold;padding-left:2%;padding-top:10px;'>"+recordedSession.sessionRecordDate+"</label></div>";
               
               preRecordedSessionsHTML += "<div id='myUploadProgressDiv"+key+"' style='width:0%;height:16px;border:3px solid orange;background:orange;display:none;margin-top:3px;'></div><div style='width:100%;text-align:center;'><label id='myUploadProgressLabel"+key+"' style='color:black;display:none;'></label></div><br/>";
               preRecordedSessionsHTML += "<div id='previewUploadOptionsBtn"+key+"' style='width:100%;display:inline-block;'><div style='width:50%;float:left;text-align:center;'>";
               
               if(recordedSession.sessionContentType == 'audio')
               {
               preRecordedSessionsHTML += "<img data-sessionFilePath='"+recordedSession.sessionFilePath+"' data-sessionContentType='"+recordedSession.sessionContentType+"' data-sessionTopic='"+recordedSession.sessionTopic+"' data-sessionId='"+key+"' id='previewRecording"+key+"' class='detailMediaPageButton' src='images/btn_PreviewAudio.png' onclick='previewCurrentSession(this);'></img><br/></div><div style='width:50%;float:left;text-align:center;'>";
               } else if(recordedSession.sessionContentType == 'video')
               {
               preRecordedSessionsHTML += "<img data-sessionFilePath='"+recordedSession.sessionFilePath+"' data-sessionContentType='"+recordedSession.sessionContentType+"' data-sessionTopic='"+recordedSession.sessionTopic+"' data-sessionId='"+key+"' id='previewRecording"+key+"' class='detailMediaPageButton' src='images/btn_PreviewVideo.png' onclick='previewCurrentSession(this);'></img><br/></div><div style='width:50%;float:left;text-align:center;'>";
               }
               
               if(recordedSession.sessionIsUploaded == false)
               {
               preRecordedSessionsHTML += "<img data-sessionFilePath='"+recordedSession.sessionFilePath+"' data-sessionContentType='"+recordedSession.sessionContentType+"' data-sessionTopic='"+recordedSession.sessionTopic+"' data-sessionId='"+key+"' id='uploadRecording"+key+"' class='detailMediaPageButton' src='images/btn_Upload.png' onclick='showRecordedSessionFormForDetails(this);' style='display:block;margin:0 auto;'></img>";
               preRecordedSessionsHTML += "<img data-sessionFilePath='"+recordedSession.sessionFilePath+"' data-sessionContentType='"+recordedSession.sessionContentType+"' data-sessionTopic='"+recordedSession.sessionTopic+"' data-sessionId='"+key+"' id='cancelUploadRecording"+key+"' class='detailMediaPageButton' src='images/btn_cancel.png' onclick='cancelCurrentUpload(this);' style='display:none;margin:0 auto;'></img>";
               }
               preRecordedSessionsHTML += "<br/></div></div></div></div>";
               
               
               });
        
        $('#preRecordedAudiosVideosList').html(preRecordedSessionsHTML);
        
        var keyOfCurrentFileBeingUploaded = $(currentSessionElementBeingUploaded).attr("data-sessionId");
        
        if(keyOfCurrentFileBeingUploaded != '' || typeof keyOfCurrentFileBeingUploaded != 'undefined')
        {
            $('#myUploadProgressDiv'+keyOfCurrentFileBeingUploaded).css('display', 'block');
            $('#myUploadProgressLabel'+keyOfCurrentFileBeingUploaded).css('display', 'block');
        } else
        {
            $('#myUploadProgressDiv'+keyOfCurrentFileBeingUploaded).css('display', 'none');
            $('#myUploadProgressLabel'+keyOfCurrentFileBeingUploaded).css('display', 'none');
        }
        
        preRecordedSessionsHTML = '';
    } else if(jsonData.contributions.length == 0)
    {
        $('#preRecordedAudiosVideosList').html('<table><tr style="width:100%;"><label id="noRecordedSessions" style="display:table-cell;font-size:16px;color:black;font-weight:normal;padding-left:2%;padding-top:10px;">There are no recorded sessions currently.</label></tr></table>');
    }
    
    
}

// ---------------------------------- Load Pre Recorded Content Screen ---------------------------------- //

// ---------------------------------- Show-Hide Contribute Forms ---------------------------------- //

function showRecordingOption(recordingType)
{
    var userEmailAddress = jsonData.loggedUserName.replace(/_/g, '.') + "@accenture.com";
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingEmailInput').attr('value', userEmailAddress);
        $('#contributeTypeOption').css('display', 'none');
        $('#assistedRecordingSection').css('display', 'block');
        $('#selfRecordingSection').css('display', 'none');
        $('#preRecordedAudiosVideosSection').css('display', 'none');
        
    } else if(recordingType == 'self')
    {
        $('#selfRecordingEmailInput').attr('value', userEmailAddress);
        $('#contributeTypeOption').css('display', 'none');
        $('#selfRecordingSection').css('display', 'block');
        $('#selfRecordingForm').css('display', 'none');
        $('#selfRecordingRecordSection').css('display', 'block');
        $('#assistedRecordingSection').css('display', 'none');
        $('#preRecordedAudiosVideosSection').css('display', 'none');
        
    } else if(recordingType == 'cancel')
    {
        /* $('#contributeTypeOption').css('display', 'block');
         $('#assistedRecordingSection').css('display', 'none');
         $('#selfRecordingSection').css('display', 'none'); */
    }
}

// ---------------------------------- Show-Hide Contribute Forms ---------------------------------- //

// ---------------------------------- Show-Hide Format Options ---------------------------------- //

function showSelectFormatOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectFormatOption').html();
    
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingFormatInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingFormatInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Format Options ---------------------------------- //

// ---------------------------------- Show-Hide Level Options ---------------------------------- //

function showSelectLevelOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectLevelOption').html();
    
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingLevelInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingLevelInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Level Options ---------------------------------- //

// ---------------------------------- Show-Hide Area Options ---------------------------------- //

function showSelectAreaOptions(recordingType)
{
    var optionsHtml = $('#assistedSelfRecordingSelectAreaOption').html();
    
    if(recordingType == 'assisted')
    {
        $('#assistedRecordingAreaInputOptions').html(optionsHtml).css('display', 'block');
    } else if(recordingType == 'self')
    {
        $('#selfRecordingAreaInputOptions').html(optionsHtml).css('display', 'block');
    }
}

// ---------------------------------- Show-Hide Area Options ---------------------------------- //

// ---------------------------------- Select Format Type ---------------------------------- //

function selectFormatType(formatOptionItem)
{
    var currentRecordingOption = '';
    
    if($('#assistedRecordingFormatInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingFormatInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    
    var formatOptionSelected = '';
    formatOptionSelected = $('#'+formatOptionItem.id).attr('data-formatType');
    
    if(currentRecordingOption == 'assisted')
    {
        var selectedFormatButtonHTML = '<button id="assistedRecordingFormatInput" type="button" onclick=showSelectFormatOptions("assisted")>'+formatOptionSelected+'</button>';
        $('#assistedRecordingFormatInputDiv').html(selectedFormatButtonHTML);
        $('#assistedRecordingFormatInput').button().button('refresh');
        $('#assistedRecordingFormatInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedFormatButtonHTML = '<button id="selfRecordingFormatInput" type="button" onclick=showSelectFormatOptions("self")>'+formatOptionSelected+'</button>';
        $('#selfRecordingFormatInputDiv').html(selectedFormatButtonHTML);
        $('#selfRecordingFormatInput').button().button('refresh');
        $('#selfRecordingFormatInputOptions').css('display', 'none');
    }
    
    
    
}

// ---------------------------------- Select Format Type ---------------------------------- //


// ---------------------------------- Select Level ---------------------------------- //

function selectLevel(levelOptionItem)
{
    var currentRecordingOption = '';
    
    if($('#assistedRecordingLevelInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingLevelInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    
    var levelOptionSelected = '';
    levelOptionSelected = $('#'+levelOptionItem.id).attr('data-level');
    
    if(currentRecordingOption == 'assisted')
    {
        var selectedLevelButtonHTML = '<button id="assistedRecordingLevelInput" type="button" onclick=showSelectLevelOptions("assisted")>'+levelOptionSelected+'</button>';
        $('#assistedRecordingLevelInputDiv').html(selectedLevelButtonHTML);
        $('#assistedRecordingLevelInput').button().button('refresh');
        $('#assistedRecordingLevelInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedLevelButtonHTML = '<button id="selfRecordingLevelInput" type="button" onclick=showSelectLevelOptions("self")>'+levelOptionSelected+'</button>';
        $('#selfRecordingLevelInputDiv').html(selectedLevelButtonHTML);
        $('#selfRecordingLevelInput').button().button('refresh');
        $('#selfRecordingLevelInputOptions').css('display', 'none');
    }
    
    
    
}

// ---------------------------------- Select Level ---------------------------------- //

// ---------------------------------- Select Area ---------------------------------- //

function selectArea(formatOptionItem)
{
    var currentRecordingOption = '';
    
    if($('#assistedRecordingAreaInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'assisted';
    } else if($('#selfRecordingAreaInputOptions').css('display') == 'block')
    {
        currentRecordingOption = 'self';
    }
    
    var areaOptionSelected = '';
    areaOptionSelected = $('#'+formatOptionItem.id).attr('data-area');
    
    if(currentRecordingOption == 'assisted')
    {
        var selectedAreaButtonHTML = '<button id="assistedRecordingAreaInput" type="button" onclick=showSelectAreaOptions("assisted")>'+areaOptionSelected+'</button>';
        $('#assistedRecordingAreaInputDiv').html(selectedAreaButtonHTML);
        $('#assistedRecordingAreaInput').button().button('refresh');
        $('#assistedRecordingAreaInputOptions').css('display', 'none');
    } else if(currentRecordingOption == 'self')
    {
        var selectedAreaButtonHTML = '<button id="selfRecordingAreaInput" type="button" onclick=showSelectAreaOptions("self")>'+areaOptionSelected+'</button>';
        $('#selfRecordingAreaInputDiv').html(selectedAreaButtonHTML);
        $('#selfRecordingAreaInput').button().button('refresh');
        $('#selfRecordingAreaInputOptions').css('display', 'none');
        
    }
    
    
    
}

// ---------------------------------- Select Area ---------------------------------- //

// ---------------------------------- Reset Recording Forms ---------------------------------- //

function resetAssistedRecordingForms()
{
    $('#assistedRecordingNameInput').val('');
    $('#assistedRecordingTopicInput').val('');
    $('#select-native-1').val('Select').selectmenu('refresh');
    $('#select-native-2').val('Select').selectmenu('refresh');
    $('#select-native-3').val('Select').selectmenu('refresh');
    
}

function resetSelfRecordingForms()
{
    $('#selfRecordingNameInput').val('');
    $('#selfRecordingTopicInput').val('');
    $('#selfRecordingFileInput').val('');
    $('#select-native-4').val('Select').selectmenu('refresh');
    $('#select-native-5').val('Select').selectmenu('refresh');
    $('#select-native-6').val('Select').selectmenu('refresh');
    
}

// ---------------------------------- Reset Recording Forms ---------------------------------- //

// ---------------------------------- Refill Self Recording Forms ---------------------------------- //

function refillSelfRecordingForm(selectedRecordedSessionObject)
{
    
    if(selectedRecordedSessionObject.sessionName == 'Name of the User')
    {
        $('#selfRecordingNameInput').val('');
    } else
    {
        $('#selfRecordingNameInput').val(selectedRecordedSessionObject.sessionName);
    }
    
    if(selectedRecordedSessionObject.sessionTopic == 'Name of the Recorded Session')
    {
        $('#selfRecordingTopicInput').val('');
    } else
    {
        $('#selfRecordingTopicInput').val(selectedRecordedSessionObject.sessionTopic);
    }
    
    $('#selfRecordingFileInput').val('');
    
    if(selectedRecordedSessionObject.sessionLevel == 'Level of the User')
    {
        $('#select-native-4').val('Select').selectmenu('refresh');
    } else
    {
        $('#select-native-4').val(selectedRecordedSessionObject.sessionLevel).selectmenu('refresh');
    }
    
    if(selectedRecordedSessionObject.sessionArea == 'Area of the Recorded Session')
    {
        $('#select-native-5').val('Select').selectmenu('refresh');
    } else
    {
        $('#select-native-5').val(selectedRecordedSessionObject.sessionArea).selectmenu('refresh');
    }
    
    if(selectedRecordedSessionObject.sessionFormat == 'Format of the Recorded Session')
    {
        $('#select-native-6').val('Select').selectmenu('refresh');
    } else
    {
        $('#select-native-6').val(selectedRecordedSessionObject.sessionFormat).selectmenu('refresh');
    }
}

// ---------------------------------- Refill Self Recording Forms ---------------------------------- //

// ---------------------------------- Record Audio ---------------------------------- //

var currentRecordedAudioPath = '';

function recordAudio()
{
    // var audioTopicName = $('#selfRecordingTopicInput').val().replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    /* if(audioTopicName != '')
     {
     
     } else if(audioTopicName == '')
     {
     jAlert("Please provide a Topic Name to your audio recording.", "Tech Time");
     } */
    currentRecordedSessionType = 'audio';
    navigator.device.capture.captureAudio(captureAudioSuccess, captureAudioError, {limit: 1, duration: 3600});
}

var dateString = '';

function captureAudioSuccess(mediaFiles) {
    resetSelfRecordingForms();
    resetAssistedRecordingForms();
    setAudioPreviewButton();
    
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        currentRecordedAudioPath = mediaFiles[i].fullPath;
    }
    
    var currentAudioRecordDate = new Date();
    
    var date = currentAudioRecordDate.getDate();
    var month = currentAudioRecordDate.getMonth();
    var year = currentAudioRecordDate.getFullYear();
    
    var hours = currentAudioRecordDate.getHours();
    var minutes = currentAudioRecordDate.getMinutes();
    
    if(hours < 10)
    {
        hours = '0'+hours;
    } else
    {
        hours = hours;
    }
    
    if(minutes < 10)
    {
        minutes = '0'+minutes;
    } else
    {
        minutes = minutes;
    }
    
    dateString = monthArr[month] + ' ' + date + ', ' + year + ' @ ' + hours + '.' + minutes;
    
    pushRecordedSessionDetailsToJson();
    
    /*  resetSelfRecordingForms();
     resetAssistedRecordingForms();
     
     $('#selfRecordingRecordSection').css('display', 'none');
     $('#selfRecordingForm').css('display', 'block');
     
     if(isOnline)
     {
     $('#selfRecordingSubmitRecording').css('display', 'none');
     $('#selfRecordingSaveRecording').css('display', 'block');
     $('#offlineMessageDisplayContribute').css('display', 'none');
     } else if(!isOnline)
     {
     $('#selfRecordingSubmitRecording').css('display', 'none');
     $('#selfRecordingSaveRecording').css('display', 'block');
     $('#offlineMessageDisplayContribute').css('display', 'block');
     } */
    // pushRecordedAudioSessionDetailsToJson('self');
}

function captureAudioError(error) {
    var msg = 'An error occurred during audio recording: ' + error.code;
    jAlert("There was some error saving your audio session. Please record again.", "Tech Time");
    // navigator.notification.alert(msg, null, 'There was some error saving your serssion. Please record again.');
}

function setAudioPreviewButton()
{
    $('#selfRecordingRecordAudio').css('display', 'none');
    $('#selfRecordingPreviewAudio').css('display', 'block');
}

function resetAudioPreviewButton()
{
    currentRecordedAudioPath = '';
    
    $('#selfRecordingRecordAudio').css('display', 'block');
    $('#selfRecordingPreviewAudio').css('display', 'none');
}

// ---------------------------------- Record Audio ---------------------------------- //

// ---------------------------------- Preview Recorded Audio ---------------------------------- //

function previewRecordedAudio()
{
    $('#contributeAudioPreviewPlayer').attr('src', currentRecordedAudioPath);
    $('#contributeAudioPreviewPlayer').css('display', 'block');
    document.getElementById('contributeAudioPreviewPlayer').play();
}

// ---------------------------------- Preview Recorded Audio ---------------------------------- //

// ---------------------------------- Push Recorded Audio Details To JSON ---------------------------------- //

function addRecordedSessionDetailsToJSON()
{
    
    if($('#selfRecordingNameInput').val() != '' && $('#selfRecordingTopicInput').val() != '')
    {
        var recordedSessionDetailsToBeModifiedPath =  $(currentSessionElementBeingUploaded).attr("data-sessionFilePath");
        
        $.each(jsonData.contributions, function(key, item){
               if(item.sessionFilePath == recordedSessionDetailsToBeModifiedPath)
               {
               item.sessionName = $('#selfRecordingNameInput').val();
               if($('#select-native-4').val() != 'Select')
               {
               item.sessionLevel = $('#select-native-4').val();
               } else if($('#select-native-4').val() == 'Select')
               {
               item.sessionLevel = '';
               }
               
               if($('#select-native-5').val() != 'Select')
               {
               item.sessionArea = $('#select-native-5').val();
               } else if($('#select-native-5').val() == 'Select')
               {
               item.sessionArea = '';
               }
               
               item.sessionTopic = $('#selfRecordingTopicInput').val();
               
               if($('#select-native-6').val() != 'Select')
               {
               item.sessionFormat = $('#select-native-6').val();
               } else if($('#select-native-6').val() == 'Select')
               {
               item.sessionFormat = '';
               }
               }
               });
        
        
        
        getFileSystemRefForWriting(jsonData);
        resetSelfRecordingForms();
        resetAssistedRecordingForms();
        loadPreRecordedContentList();
        loadPreRecordedContentSection();
        
        if(isOnline)
        {
            uploadCurrentSession(currentSessionElementBeingUploaded);
        } else if(!isOnline)
        {
            jAlert("Session details have been saved. Please go Online to upload this recorded session.", "Tech Time");
        }
        
        
    } else {
        if($('#selfRecordingNameInput').val() == '' && $('#selfRecordingTopicInput').val() == '')
        {
            jAlert("Please insert your name and the Topic of the recorded session.", "Tech Time");
        } else if($('#selfRecordingTopicInput').val() == '')
        {
            jAlert("Please insert the Topic of the recorded session.", "Tech Time");
        } else if($('#selfRecordingNameInput').val() == '')
        {
            jAlert("Please insert your Name.", "Tech Time");
        }
    }
}

function pushRecordedSessionDetailsToJson()
{
    var contributionsString = JSON.stringify(jsonData.contributions);
    
    var recordedSessionPath = '';
    
    if(currentRecordedSessionType == 'audio')
    {
        recordedSessionPath = currentRecordedAudioPath;
    } else if(currentRecordedSessionType == 'video')
    {
        recordedSessionPath = currentRecordedVideoPath;
    }
    
    if(contributionsString.indexOf(recordedSessionPath) == -1)
    {
        /* if($('#selfRecordingNameInput').val() != '' && $('#selfRecordingTopicInput').val() != '')
         { */
        var currentRecordedSessionDetails = new Object();
        currentRecordedSessionDetails.sessionRecordingType = 'self';
        currentRecordedSessionDetails.sessionEmailId = $('#selfRecordingEmailInput').val();
        currentRecordedSessionDetails.sessionName = $('#selfRecordingNameInput').val();
        
        if(currentRecordedSessionDetails.sessionName == '')
        {
            currentRecordedSessionDetails.sessionName = 'Name of the User';
        }
        
        currentRecordedSessionDetails.sessionLevel = $('#select-native-4').val();
        
        if(currentRecordedSessionDetails.sessionLevel == 'Select')
        {
            currentRecordedSessionDetails.sessionLevel = 'Level of the User';
        }
        
        currentRecordedSessionDetails.sessionArea = $('#select-native-5').val();
        
        if(currentRecordedSessionDetails.sessionArea == 'Select')
        {
            currentRecordedSessionDetails.sessionArea = '';
        }
        
        currentRecordedSessionDetails.sessionTopic = $('#selfRecordingTopicInput').val();
        
        if(currentRecordedSessionDetails.sessionTopic == '')
        {
            if(currentRecordedSessionType == 'audio')
            {
                currentRecordedSessionDetails.sessionTopic = 'Audio - '+dateString;
            } else if(currentRecordedSessionType == 'video')
            {
                currentRecordedSessionDetails.sessionTopic = 'Video - '+dateString;
            }
            //  currentRecordedSessionDetails.sessionTopic = 'Name of the Recorded Session';
        }
        
        currentRecordedSessionDetails.sessionFormat = $('#select-native-6').val();
        
        if(currentRecordedSessionDetails.sessionFormat == 'Select')
        {
            currentRecordedSessionDetails.sessionFormat = '';
        }
        
        if(currentRecordedSessionType == 'audio')
        {
            currentRecordedSessionDetails.sessionContentType = 'audio';
        } else if(currentRecordedSessionType == 'video')
        {
            currentRecordedSessionDetails.sessionContentType = 'video';
        }
        currentRecordedSessionDetails.sessionIsUploaded = false;
        
        if(currentRecordedSessionType == 'audio')
        {
            currentRecordedSessionDetails.sessionFilePath = recordedSessionPath;
        } else if(currentRecordedSessionType == 'video')
        {
            currentRecordedSessionDetails.sessionFilePath = recordedSessionPath;
        }
        
        currentRecordedSessionDetails.sessionRecordDate = dateString;
        
        jsonData.contributions.unshift(currentRecordedSessionDetails);
        
        getFileSystemRefForWriting(jsonData);
        
        if(!isOnline)
        {
            switchToRecordSection();
        } else if(isOnline)
        {
            switchToPreRecordedListSection();
            loadPreRecordedContentList();
        }
        
        /* } else {
         if($('#selfRecordingNameInput').val() == '' && $('#selfRecordingTopicInput').val() == '')
         {
         jAlert("Please insert your name and the Topic of the recorded session.", "Tech Time");
         } else if($('#selfRecordingTopicInput').val() == '')
         {
         jAlert("Please insert the Topic of the recorded session.", "Tech Time");
         } else if($('#selfRecordingNameInput').val() == '')
         {
         jAlert("Please insert your Name.", "Tech Time");
         }
         } */
        
        
    } else if(contributionsString.indexOf(recordedSessionPath) != -1)
    {
        jAlert("Recorded session has already been saved.", "Tech Time");
    }
    
}

function switchToRecordSection()
{
    $('#selfRecordingSection').css('display', 'block');
    $('#selfRecordingForm').css('display', 'none');
    $('#selfRecordingRecordSection').css('display', 'block');
}

function switchToPreRecordedListSection()
{
    $('#selfRecordingSection').css('display', 'none');
    $('#selfRecordingForm').css('display', 'none');
    $('#selfRecordingRecordSection').css('display', 'none');
    $('#preRecordedAudiosVideosSection').css('display', 'block');
    
}

// ---------------------------------- Push Recorded Audio Details To JSON ---------------------------------- //

// ---------------------------------- Show Recorded Session Form for Filling Details ---------------------------------- //
var currentSessionElementBeingUploaded;
function showRecordedSessionFormForDetails(recordedSessionElement)
{
    currentSessionElementBeingUploaded = recordedSessionElement;
    
    var selectedRecordSessionDetails = jsonData.contributions[$(recordedSessionElement).attr("data-sessionId")];
    
    resetSelfRecordingForms();
    resetAssistedRecordingForms();
    refillSelfRecordingForm(selectedRecordSessionDetails);
    
    $('#selfRecordingSection').css('display', 'block');
    $('#selfRecordingRecordSection').css('display', 'none');
    $('#selfRecordingForm').css('display', 'block');
    $('#preRecordedAudiosVideosSection').css('display', 'none');
    
    if(isOnline)
    {
        $('#selfRecordingSubmitRecording').css('display', 'block');
        $('#selfRecordingSaveRecording').css('display', 'none');
        $('#offlineMessageDisplayContribute').css('display', 'none');
    } else if(!isOnline)
    {
        $('#selfRecordingSubmitRecording').css('display', 'none');
        $('#selfRecordingSaveRecording').css('display', 'block');
        $('#offlineMessageDisplayContribute').css('display', 'block');
    }
}

// ---------------------------------- Show Recorded Session Form for Filling Details ---------------------------------- //

// ---------------------------------- Record Video ---------------------------------- //

var currentRecordedVideoPath = '';

function recordVideo()
{
    // var videoTopicName = $('#selfRecordingTopicInput').val().replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    
    /* if(videoTopicName != '')
     {
     navigator.device.capture.captureVideo(captureVideoSuccess, captureVideoError, {limit: 1});
     } else if(videoTopicName == '')
     {
     jAlert("Please provide a Topic Name to your video recording.", "Tech Time");
     } */
    currentRecordedSessionType = 'video';
    navigator.device.capture.captureVideo(captureVideoSuccess, captureVideoError, {limit: 1, duration: 3600});
}

function captureVideoSuccess(mediaFiles) {
    setVideoPreviewButton();
    var i, len;
    currentRecordedVideoPath = mediaFiles[0].fullPath;
    
    var currentVideoRecordDate = new Date();
    
    var date = currentVideoRecordDate.getDate();
    var month = currentVideoRecordDate.getMonth();
    var year = currentVideoRecordDate.getFullYear();
    
    var hours = currentVideoRecordDate.getHours();
    var minutes = currentVideoRecordDate.getMinutes();
    
    if(hours < 10)
    {
        hours = '0'+hours;
    } else
    {
        hours = hours;
    }
    
    if(minutes < 10)
    {
        minutes = '0'+minutes;
    } else
    {
        minutes = minutes;
    }
    
    dateString = monthArr[month] + ' ' + date + ', ' + year + ' @ ' + hours + '.' + minutes;
    
    pushRecordedSessionDetailsToJson();
    
    /* resetSelfRecordingForms();
     resetAssistedRecordingForms();
     
     $('#selfRecordingRecordSection').css('display', 'none');
     $('#selfRecordingForm').css('display', 'block');
     
     if(isOnline)
     {
     $('#selfRecordingSubmitRecording').css('display', 'none');
     $('#selfRecordingSaveRecording').css('display', 'block');
     $('#offlineMessageDisplayContribute').css('display', 'none');
     } else if(!isOnline)
     {
     $('#selfRecordingSubmitRecording').css('display', 'none');
     $('#selfRecordingSaveRecording').css('display', 'block');
     $('#offlineMessageDisplayContribute').css('display', 'block');
     } */
    
}

function captureVideoError(error) {
    var msg = 'An error occurred during audio recording: ' + error.code;
    jAlert("There was some error saving your video session. Please record again.", "Tech Time");
    // navigator.notification.alert(msg, null, 'There was some error saving your serssion. Please record again.');
}

function setVideoPreviewButton()
{
    $('#selfRecordingRecordVideo').css('display', 'none');
    $('#selfRecordingPreviewVideo').css('display', 'block');
}

function resetVideoPreviewButton()
{
    currentRecordedVideoPath = '';
    
    $('#selfRecordingRecordVideo').css('display', 'block');
    $('#selfRecordingPreviewVideo').css('display', 'none');
}

// ---------------------------------- Record Video ---------------------------------- //

// ---------------------------------- Preview Recorded Video ---------------------------------- //

function previewRecordedVideo()
{
    $('#contributeVideoPreviewPlayer').attr('src', currentRecordedVideoPath);
    $('#contributeVideoPreviewPlayer').css('display', 'block');
    document.getElementById('contributeVideoPreviewPlayer').play();
    
}

// ---------------------------------- Preview Recorded Video ---------------------------------- //

// ---------------------------------- Preview Current Session ---------------------------------- //

function previewCurrentSession(previewElement)
{
    var contentType = $('#'+previewElement.id).attr('data-sessionContentType');
    
    if(contentType == 'audio')
    {
        $('#contributeSessionAudioPlayerDiv').focus()
        $('#contributeSessionAudioPlayerDiv').css('display', 'block');
        $('#contributeSessionVideoPlayerDiv').css('display', 'none');
        $('#contributeSessionAudioPlayerName').html($('#'+previewElement.id).attr('data-sessionTopic'));
        var previewCurrentSessionFilePath = $('#'+previewElement.id).attr('data-sessionFilePath');
        $('#contributeSessionAudioPlayer').attr('src', previewCurrentSessionFilePath);
        document.getElementById('contributeSessionVideoPlayer').pause();
        document.getElementById('contributeSessionAudioPlayer').play();
        document.getElementById('contributeSessionAudioPlayer').addEventListener('ended',hideRecordedSessionAudioPlayer,false);
    } else if(contentType == 'video')
    {
        $('#contributeSessionVideoPlayerDiv').focus();
        $('#contributeSessionVideoPlayerDiv').css('display', 'block');
        $('#contributeSessionVideoPlayerName').html($('#'+previewElement.id).attr('data-sessionTopic'));
        var previewCurrentSessionFilePath = $('#'+previewElement.id).attr('data-sessionFilePath');
        $('#contributeSessionVideoPlayer').attr('src', previewCurrentSessionFilePath);
        $('#contributeSessionAudioPlayerDiv').css('display', 'none');
        document.getElementById('contributeSessionAudioPlayer').pause();
        document.getElementById('contributeSessionVideoPlayer').play();
        document.getElementById('contributeSessionVideoPlayer').addEventListener('ended',hideRecordedSessionVideoPlayer,false);
    }
}

function hideRecordedSessionAudioPlayer(event)
{
    $('#contributeSessionAudioPlayerDiv').css('display', 'none');
    $('#contributeSessionAudioPlayerName').html('');
}

function hideRecordedSessionVideoPlayer(event)
{
    $('#contributeSessionVideoPlayerDiv').css('display', 'none');
    $('#contributeSessionVideoPlayerName').html('');
}

// ---------------------------------- Preview Current Session ---------------------------------- //

// ---------------------------------- Upload Recorded Session ---------------------------------- //

var filesToBeUploadedArray = [];
var currentFileBeingUploaded = new Object();

var fileUploadAbortObject = new FileTransfer();

function uploadCurrentSession(uploadElement)
{
    if(filesToBeUploadedArray.length == 0)
    {
        if(isOnline)
        {
         /*   var currentAudioRecordDate = new Date();
            
            var date = currentAudioRecordDate.getDate();
            var month = currentAudioRecordDate.getMonth();
            var year = currentAudioRecordDate.getFullYear();
            
            var hours = currentAudioRecordDate.getHours();
            var minutes = currentAudioRecordDate.getMinutes();
            
            if(hours < 10)
            {
                hours = '0'+hours;
            } else
            {
                hours = hours;
            }
            
            if(minutes < 10)
            {
                minutes = '0'+minutes;
            } else
            {
                minutes = minutes;
            }
            
            dateString = monthArr[month] + date + year + hours + minutes; */
            
            var options = new FileUploadOptions();
                options.fileName = fileBeingUploadedName;
                options.chunkedMode = false;
                options.headers = {
                    Connection: "close"
                };
            
            
            var fileBeingUploaded = new Object();
            fileBeingUploaded.uploadedFileKey = $(uploadElement).attr("data-sessionId");
            fileBeingUploaded.uploadedFilePath = $(uploadElement).attr("data-sessionFilePath");
            filesToBeUploadedArray.push(fileBeingUploaded);
            var fileBeingUploadedName = '';
            fileBeingUploadedName += 'iOS_'+jsonData.loggedUserName+'_';
            fileBeingUploadedName += jsonData.contributions[fileBeingUploaded.uploadedFileKey].sessionTopic.replace(/\s/g, '_')+'_'+jsonData.contributions[fileBeingUploaded.uploadedFileKey].sessionRecordDate+fileBeingUploaded.uploadedFilePath.substring(fileBeingUploaded.uploadedFilePath.lastIndexOf('.'), fileBeingUploaded.uploadedFilePath.length);
            
            var uploadCurrentSession = "https://techtime.stage2.accenture.com/sites/default/files/FileUpload/upload_file.php";
            //var uploadCurrentSession = "https://posttestserver.com/post.php";
            
            //?name='testing"
            var fileToBeUploadedPath = $(uploadElement).attr('data-sessionFilePath');
            
            var fileUpload = new FileTransfer();
            var key = $(uploadElement).attr("data-sessionId");
            $('#myUploadProgressDiv'+key).css('display', 'block');
            $('#myUploadProgressLabel'+key).css('display', 'block');
            $('#uploadRecording'+key).css('display', 'none');
            
            if(filesToBeUploadedArray.length > 1)
            {
                $('#willUploadRecording'+key).css('display', 'block');
            } if(filesToBeUploadedArray.length == 1)
            {
                $('#cancelUploadRecording'+key).css('display', 'block');
            }
            
            fileUploadAbortObject = fileUpload;
            
            fileUpload.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    // loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                    console.log(Math.round(100 * (progressEvent.loaded / progressEvent.total)) + "%");
                    $('#myUploadProgressDiv'+key).css('width', Math.round(100 * (progressEvent.loaded / progressEvent.total))+'%');
                    $('#myUploadProgressLabel'+key).html(Math.round(100 * (progressEvent.loaded / progressEvent.total))+'%');
                    
                } else {
                    // loadingStatus.increment();
                }
            };
            
            
            fileUpload.upload(
                              fileToBeUploadedPath,
                              uploadCurrentSession,
                              function(entry) {
                              currentSessionElementBeingUploaded = null;
                              filesToBeUploadedArray.splice(0, 1);
                              $('#myUploadProgressDiv'+key).css('display', 'none');
                              $('#myUploadProgressLabel'+key).css('display', 'none');
                              $('#uploadRecording'+key).css('display', 'none');
                              $('#cancelUploadRecording'+key).css('display', 'none');
                              updateUploadStatusInJSON(key);
                              resetSelfRecordingForms();
                              },
                              function(error) {
                              console.log("ERROR UPLOAD "+JSON.stringify(error));
                              filesToBeUploadedArray.splice(0, 1);
                              if(error.code == 4)
                              {
                              jAlert('File upload has been cancelled.', 'Tech Time');
                              } else
                              {
                              jAlert('There was an error uploading your file. Please try again.', 'Tech Time');
                              }
                              fileUpload = null;
                              currentSessionElementBeingUploaded = null;
                              $('#myUploadProgressDiv'+key).css('width', '0%');
                              $('#myUploadProgressDiv'+key).css('display', 'none');
                              $('#myUploadProgressLabel'+key).css('display', 'none');
                              $('#myUploadProgressLabel'+key).html('0%');
                              $('#uploadRecording'+key).css('display', 'block');
                              $('#cancelUploadRecording'+key).css('display', 'none');
                              },
                              options
                              );
        } else if(!isOnline)
        {
            jAlert("Please go Online to upload this file.", "Tech Time");
        }
    } else if(filesToBeUploadedArray.length == 1)
    {
        jAlert("Please wait while the current file gets uploaded.", "Tech Time");
    }
    
    
    
}

// ---------------------------------- Upload Recorded Session ---------------------------------- //

function cancelCurrentUpload(abortUploadElement)
{
    var key = $(abortUploadElement).attr("data-sessionId");
    
    $('#myUploadProgressDiv'+key).css('display', 'none');
    $('#myUploadProgressLabel'+key).css('display', 'none');
    $('#uploadRecording'+key).css('display', 'block');
    fileUploadAbortObject.abort(abortUploadSuccess, errorDeleteFileSystem);
    
    fileUploadAbortObject = null;
}

function abortUploadSuccess()
{
    jAlert('File upload has been cancelled cancelled.', 'Tech Time');
}

// ---------------------------------- Delete Current Session ---------------------------------- //

function deleteCurrentSession(deleteElement)
{
    //    $('#contributeSessionAudioPlayer').css('display', 'none');
    document.getElementById('contributeSessionAudioPlayer').pause();
    hideRecordedSessionAudioPlayer(event);
    document.getElementById('contributeSessionVideoPlayer').pause();
    hideRecordedSessionVideoPlayer(event);
    
    var sessionIdToBeDeleted = $(deleteElement).attr('data-sessionId');
    
    jConfirm('Are you sure you want to delete this recorded session?', 'Tech Time', function(deleteSessionConfirmation){
             if(deleteSessionConfirmation == true)
             {
             $('#recordedSessionItemId'+sessionIdToBeDeleted).remove();
             jsonData.contributions.splice(sessionIdToBeDeleted, 1);
             currentSessionElementBeingUploaded = null;
             //loadPreRecordedContentList();
             if($(currentSessionElementBeingUploaded).attr("data-sessionId") == $(deleteElement).attr("data-sessionId"))
             {
             cancelCurrentUpload(deleteElement);
             }
             
             var keyOfCurrentFileBeingUploaded = $(currentSessionElementBeingUploaded).attr("data-sessionId");
             
             if(keyOfCurrentFileBeingUploaded != '' || typeof keyOfCurrentFileBeingUploaded != 'undefined')
             {
             $('#myUploadProgressDiv'+keyOfCurrentFileBeingUploaded).css('display', 'block');
             $('#myUploadProgressLabel'+keyOfCurrentFileBeingUploaded).css('display', 'block');
             } else
             {
             $('#myUploadProgressDiv'+keyOfCurrentFileBeingUploaded).css('display', 'none');
             $('#myUploadProgressLabel'+keyOfCurrentFileBeingUploaded).css('display', 'none');
             }
             
             currentSessionElementBeingUploaded = null;
             jAlert("This recorded session has been deleted successfully.", "Tech Time");
             getFileSystemRefForWriting(jsonData);
             }
             });
}

// ---------------------------------- Delete Current Session ---------------------------------- //

// ---------------------------------- Post Assisted Recording Session Details ---------------------------------- //

function postRecordingDetails(recordingType)
{
    if(isOnline)
    {
        var postRecordingDetailsService = 'https://techtime.stage2.accenture.com/techtimemobile/record-upload';
        
        var sessionRecordingEmailId = $('#assistedRecordingEmailInput').val();
        var sessionRecordingName = $('#assistedRecordingNameInput').val();
        var sessionRecordingLevel = $('#select-native-1').val();
        var sessionRecordingArea = $('#select-native-2').val();
        var sessionRecordingTopic = $('#assistedRecordingTopicInput').val();
        var sessionRecordingFormat = $('#select-native-3').val();
       
        sessionRecordingName = sessionRecordingName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        if(sessionRecordingName != "")
        {
        
            if(recordingType == 'assisted')
            {
                var postAssistedRecordingDetailsJSON = '{"data":{"mode":"assisted","emailId":"'+sessionRecordingEmailId+'","name":"'+sessionRecordingName+'","level":"'+sessionRecordingLevel+'", "area":"'+sessionRecordingArea+'", "topic":"'+sessionRecordingTopic+'", "format":"'+sessionRecordingFormat+'"}}';
            } else if(recordingType == 'self')
            {
                var postAssistedRecordingDetailsJSON = '{"data":{"mode":"self","emailId":"'+sessionRecordingEmailId+'","name":"'+sessionRecordingName+'","level":"'+sessionRecordingLevel+'", "area":"'+sessionRecordingArea+'", "topic":"'+sessionRecordingTopic+'", "format":"'+sessionRecordingFormat+'"}}';
            }
            
            $.ajax({
                   type: 'POST',
                   url: postRecordingDetailsService,
                   data: postAssistedRecordingDetailsJSON,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   resetAssistedRecordingForms();
                   jAlert('Thank you for your interest in contribution, our team will contact you soon.', 'Tech Time Contribute');
                   },
                   error: function(xhr, textStatus, error){
                   
                   }
                   });
        } else if(sessionRecordingName == "")
        {
            jAlert('Please fill the mandatory fields before submitting the form. Thank you.', 'Tech Time Contribute');
        }
    } else if(!isOnline)
    {
        jAlert("Please go Online to request for recording a session.", "Tech Time");
    }
    
}

// ---------------------------------- Post Self Recording Session Details ---------------------------------- //

function postSelfRecordingDetails(recordedItemDetails)
{
    if(isOnline)
    {
        var postRecordingDetailsService = 'https://techtime.stage2.accenture.com/techtimemobile/record-upload';
        
        var sessionRecordingEmailId = recordedItemDetails.sessionEmailId;
        var sessionRecordingName = recordedItemDetails.sessionName;
        var sessionRecordingLevel = recordedItemDetails.sessionLevel;
        var sessionRecordingArea = recordedItemDetails.sessionArea;
        var sessionRecordingTopic = recordedItemDetails.sessionTopic;
        var sessionRecordingFormat = recordedItemDetails.sessionFormat;
        
        sessionRecordingName = sessionRecordingName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        if(sessionRecordingName != "" && sessionRecordingName.length != 0)
        {
            var postSelfRecordingDetailsJSON = '{"data":{"mode":"self","emailId":"'+sessionRecordingEmailId+'","name":"'+sessionRecordingName+'","level":"'+sessionRecordingLevel+'", "area":"'+sessionRecordingArea+'", "topic":"'+sessionRecordingTopic+'", "format":"'+sessionRecordingFormat+'"}}';
            
            $.ajax({
                   type: 'POST',
                   url: postRecordingDetailsService,
                   data: postSelfRecordingDetailsJSON,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   resetAssistedRecordingForms();
                   jAlert('Thank you for your contribution to Tech Time. Our team will review the content and get back to you soon.', 'Tech Time Contribute');
                   },
                   error: function(xhr, textStatus, error){
                   
                   }
                   });
        } else if(sessionRecordingName == "" && sessionRecordingName.length == 0)
        {
            jAlert('Please fill the mandatory fields before submitting the form. Thank you.', 'Tech Time Contribute');
        }
        
    } else if(!isOnline)
    {
        jAlert("You are currently offline", "Tech Time");
    }
    
}

// ---------------------------------- Post Self Recording Session Details ---------------------------------- //

function browseForFiles()
{
    $('#browseFromGalleryButton').trigger('click');
}


// ---------------------------------- Update Upload Status in JSON ---------------------------------- //

function updateUploadStatusInJSON(itemIndex)
{
    $.each(jsonData.contributions, function(key, contributedItem){
           if(itemIndex == key)
           {
           contributedItem.sessionIsUploaded = true;
           postSelfRecordingDetails(contributedItem);
           }
           });
    
    getFileSystemRefForWriting(jsonData);
}

// ---------------------------------- Update Upload Status in JSON ---------------------------------- //
