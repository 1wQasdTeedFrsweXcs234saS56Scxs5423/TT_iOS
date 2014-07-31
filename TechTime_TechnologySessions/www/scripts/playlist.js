
// ---------------------------------- Read Playlist Data ---------------------------------- //

function loadPlaylistsData() {
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    var playlistRss = "https://techtime.stage2.accenture.com/mobile-playlist/"+loggedInUsername;
    
    $.ajax({
           type: "GET",
           url: playlistRss,
           dataType: "xml",
           success: getPlaylistsData,
           error: function (xhr, textStatus, errorThrown) {
           if(isOnline)
           {
           var errorString = xhr.readyState + ' ' + xhr.status + ' ' + xhr.statusText;
           applicationErrorLogger("SERVICE: Playlists", errorString);
           }
           }
           });
}


function getPlaylistsData(xml) {
    $(xml).find('playlist').each(function(index, item) {
                                 
                                 var playlist = new Object();
                                 playlist.playlistId = $(this).attr('id');
                                 playlist.playlistName = $(this).attr('name').replace(/[^a-zA-Z0-9 ]/g, "");
                                 playlist.playlistType = $(this).attr('type');
                                 playlist.playlistItems = [];
                                 playlist.isUpdated = true;
                                 $(this).find('item').each(function (childIndex, childItem) {
                                                           var playlistItem = new Object();
                                                           playlistItem.playlistItemFormatType = $(this).find('format_type').text().substring(0,1);
                                                           playlistItem.playlistItemContentType = $(this).find('content_type').text().substring(0,1);
                                                           playlistItem.playlistItemId = playlistItem.playlistItemFormatType + "V" + $(this).find('id').text();
                                                           playlistItem.playlistItemTitle = $(this).find('title').text();
                                                           playlistItem.playlistItemDate = $(this).find('date').text();
                                                           playlistItem.playlistItemAuthor = $(this).find('author').text();
                                                           playlistItem.playlistItemUrl = $(this).find('url').text();
                                                           
                                                           playlistItem.playlistItemFormat = playlistItem.playlistItemUrl.substring(playlistItem.playlistItemUrl.lastIndexOf('.')+1,playlistItem.playlistItemUrl.length);
                                                           playlistItem.playlistItemThumb = $(this).find('thumb').text();
                                                           
                                                           var playlistThumbDetails = new Object();     // itemId mediatype thumbUrl
                                                           playlistThumbDetails.itemId = playlistItem.playlistItemId.substring(2, playlistItem.playlistItemId.length);
                                                           
                                                           if(playlistItem.playlistItemId.substring(1, 2) == "A")
                                                           {
                                                           playlistThumbDetails.mediaType = "Audios";
                                                           } else if(playlistItem.playlistItemId.substring(1, 2) == "V")
                                                           {
                                                           playlistThumbDetails.mediaType = "Videos";
                                                           } else if(playlistItem.playlistItemId.substring(1, 2) == "P")
                                                           {
                                                           playlistThumbDetails.mediaType = "Panel Discussions";
                                                           } else if(playlistItem.playlistItemId.substring(1, 2) == "T")
                                                           {
                                                           playlistThumbDetails.mediaType = "Technology Conferences";
                                                           } else if(playlistItem.playlistItemId.substring(1, 2) == "I")
                                                           {
                                                           playlistThumbDetails.mediaType = "Interviews";
                                                           } else if(playlistItem.playlistItemId.substring(1, 2) == "D")
                                                           {
                                                           playlistThumbDetails.mediaType = "documents";
                                                           }
                                                           playlistThumbDetails.thumbUrl = playlistItem.playlistItemThumb;
                                                           
                                                           
                                                           
                                                           if((downloadedThumbs.indexOf(playlistThumbDetails.itemId + 'thumb.png') == -1) && playlistItem.playlistItemThumb != '')
                                                           {
                                                               var imageToDownloadThumb = new Object();
                                                                imageToDownloadThumb.itemId = playlistThumbDetails.itemId;
                                                                imageToDownloadThumb.url = playlistItem.playlistItemThumb;
                                                                imageToDownloadThumb.type = 'thumb';
                                                               
                                                                jsonData.imagesToDownload.push(imageToDownloadThumb);
                                                           }
                                                           
                                                           
                                                           if(playlistItem.playlistItemFormat != 'mp3' || playlistItem.playlistItemContentType != 'd')
                                                           {
                                                           playlist.playlistItems.push(playlistItem);
                                                           }
                                                           });
                                 if(playlist.playlistItems.length > 0)
                                 {
                                 jsonData.playlists.push(playlist);
                                 }
                                 
                                 
                                 });
    
    
}

// ---------------------------------- Read Playlist Data ---------------------------------- //

// ---------------------------------- Display My Playlists ---------------------------------- //
var playing = false;

function displayPlaylist() {
    
    
    var htmlText = '';
    var playId = '';
    
    htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';
    
    $.each(jsonData.playlists, function(key, item){
           
           var thumbId = item.playlistItems[item.playlistItems.length - 1].playlistItemId.substr(2, item.playlistItems[item.playlistItems.length - 1].playlistItemId.length);
           var thumbUrl = item.playlistItems[item.playlistItems.length - 1].playlistItemThumb;
           var thumbPath = '';
           if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
           {
           thumbPath = "file://"+globalPathNew + "/images/"+thumbId + "thumb.png";
           } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
           {
           if(isOnline)
           {
           thumbPath = thumbUrl;
           } else if(!isOnline)
           {
               if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
               {
                    thumbPath = 'images/TechTime-AppIcon.png';
               } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
               {
                    thumbPath = "file://"+globalPathNew + "/images/"+thumbId + "thumb.png";
               }
           }
           }
           
           playId = item.playlistId;
           
           htmlText = htmlText + '<div id="'+item.playlistId+'" style="width:100%;background-color:#F0EFED;">';
           htmlText = htmlText + '<div style="width:13%;float:left;text-align:center;background-color:inherit;padding-top:12px;padding-bottom:12px;background-color:#F0EFED;">';
           
           htmlText = htmlText + '<input id="playlist'+item.playlistId+'" data-playlistId="'+item.playlistId+'" data-playlistName="'+item.playlistName+'" type="checkbox" data-role="none" style="margin-top:7%;z-index:100;" onclick="selectPlaylistForSharing(this);"></div><div style="width:16%;float:left;margin-top:7px;" onclick="resetPlaylistLMRParameters();displayPlaylistItems('+playId+');"><img src="'+thumbPath+'" style="max-height:75px;max-width:75px;width:100%;height:100%;"></img></div>';
           htmlText = htmlText + '<div style="width:57%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;" onclick="resetPlaylistLMRParameters();displayPlaylistItems('+playId+');">';
           htmlText = htmlText + '<label style="font-size:16px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;font-weight:bold;color:orange;" >'+item.playlistName+'</label>';
           htmlText = htmlText + '</div><div style="width:10%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:#F0EFED;">';
           
           if(item.playlistType == "admin")
           {
           htmlText = htmlText + '<img src="images/adminPlaylist.png" style="height:20px;width:20px;padding-right:20%;"><br/>';
           } else
           {
           htmlText = htmlText + '<br/>';
           }
           
           htmlText = htmlText + '<img src="images/orange_icon_right.png" style="height:20px;width:20px;padding-right:20%;"></div></div>';
           htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';
           
           thumbId = '';
           thumbUrl = '';
           thumbPath = '';
           
           });
    
    
    $('#userPlaylistsDiv').html(htmlText);
    $('#playlistItemPlayer').css('display', 'block');
    $.mobile.changePage('#PlaylistsPage');
    
}

// ---------------------------------- Display My Playlists ---------------------------------- //

// ---------------------------------- Display Playlist Items ---------------------------------- //
var myPlaylistItems = [];

var playlistItemsStartIndex = 0;
var playlistItemsEndIndex = 4;

var isActionLoadMoreResult = false;

function displayPlaylistItems(playlistId) {
    var strHTMLtext = '';
    var playlistName = '';
    var icons = '';
    var typeOficon = '';
    
    myPlaylistItems = [];
    
    getFileNamesInDirectory();
    
    window.localStorage.setItem("lastOpenPlaylist", playlistId);
    
    $('#userPlaylistsRenameOption').attr('data-playlistId', playlistId);
    
    $.each(jsonData.playlists, function (key, item) {
           
           if (playlistId == item.playlistId) {
           if(item.playlistType == 'admin')
           {
           $('#userPlaylistsRenameDeleteOption').css('display', 'none');
           } else 
           {
           $('#userPlaylistsRenameDeleteOption').css('display', 'block');
           }
           playlistName = playlistName + item.playlistName;
           currentOpenPlaylist = playlistId;
           $.each(item.playlistItems, function (keyIndex, itemPlay) {
                  typeOficon = itemPlay.playlistItemUrl.substr(itemPlay.playlistItemUrl.lastIndexOf('.') + 1, itemPlay.playlistItemUrl.length);
                  
                  // Load More PL Items Band
                  if(item.playlistItems.length <= 5)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'none');
                  } else if(item.playlistItems.length > 5)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'block');
                  }
                  
                  if (typeOficon == 'mp3') {
                  icons = 'images/icon_audio.png';
                  } else if (typeOficon == 'mp4') {
                  icons = 'images/icon_video.png';
                  }
                  
                  var thumbId = itemPlay.playlistItemId.substr(2, itemPlay.playlistItemId.length);
                  var thumbUrl = itemPlay.playlistItemThumb;
                  var thumbPath = '';
                  var itemId = itemPlay.playlistItemId;
                  
                  if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
                  {
                  thumbPath = "file://"+globalPathNew + "/images/"+thumbId+"thumb.png";
                  } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
                  {
                  if(isOnline)
                  {
                  thumbPath = thumbUrl;
                  } else if(!isOnline)
                  {
                  if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
                  {
                    thumbPath = 'images/TechTime-AppIcon.png';
                  } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
                  {
                    thumbPath = "file://"+globalPathNew + "/images/"+thumbId+"thumb.png";
                  }
                  
                  }
                  }
                  
                  var authorDisplayText = '';
                  var authorArray = itemPlay.playlistItemAuthor.split('|');
                  for(var i=0;i<authorArray.length;i++)
                  {
                  if(i<authorArray.length-1)
                  {
                  authorDisplayText = authorDisplayText + authorArray[i] + ", "
                  } else
                  {
                  authorDisplayText = authorDisplayText + authorArray[i];
                  }
                  }
                  
                  var playlistItem = new Object();
                  playlistItem.itemId = itemPlay.playlistItemId;
                  playlistItem.itemTitle = itemPlay.playlistItemTitle;
                  playlistItem.thumnail = thumbPath;
                  
                  if(entries.indexOf(itemPlay.playlistItemId) == -1)
                  {
                  playlistItem.itemPath = itemPlay.playlistItemUrl;
                  playlistItem.isItemDownloaded = false;
                  } else if(entries.indexOf(itemPlay.playlistItemId) != -1)
                  {
                  playlistItem.itemPath = "file://"+globalPathNew+itemPlay.playlistItemId+".mp4";
                  playlistItem.isItemDownloaded = true;
                  }
                  
                  myPlaylistItems.push(playlistItem);
                  
                  
                  //console.log(JSON.stringify(playlistArray));
                  if(keyIndex <= playlistItemsEndIndex)
                  {
                          strHTMLtext = strHTMLtext + '<div style="width:100%;height:auto;background-color:#F0EFED;">';
                          strHTMLtext = strHTMLtext + '<div id="playlistItem'+itemPlay.playlistItemId+'" data-playlistItemIndex="'+keyIndex+'" style="width:20%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;" onclick="playPlaylistItem(this);">';
                          strHTMLtext = strHTMLtext + '<img src="'+thumbPath+'" style="max-height:75px;max-width:75px;width:100%;height:100%;padding-left:10%;margin-top:5%;"></img></div>';
                          strHTMLtext = strHTMLtext + '<div id="playlistItem'+itemPlay.playlistItemId+'" data-playlistItemIndex="'+keyIndex+'" style="width:61%;float:left;padding-top:6px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;" onclick="playPlaylistItem(this);">';
                          strHTMLtext = strHTMLtext + '<label style="font-size:14px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;font-weight:bold;color:orange;">' + itemPlay.playlistItemTitle + '</label><br/><br/><label style="font-size:13px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;color:orange;font-weight:100;">'+authorDisplayText+'</label><br/><label style="font-size:12px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;color:black;font-weight:200;">'+itemPlay.playlistItemDate+'</label>';
                          strHTMLtext = strHTMLtext + '</div><div style="width:11%;height:100%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:#F0EFED;">';
                          strHTMLtext = strHTMLtext + '<img src="'+icons+'" style="height:17px;width:17px;padding-right:10px;"><br/>';
                          
                          
                          if(entries.indexOf(itemPlay.playlistItemId) == -1)
                          {
                          strHTMLtext = strHTMLtext + '<img id="downloadPlItemBtn'+keyIndex+'" data-itemId="'+itemId+'" data-itemUrl="'+itemPlay.playlistItemUrl+'" data-itemTitle="'+itemPlay.playlistItemTitle+'" src="images/downloadPlaylistItem.png" style="height:32px;width:30px;padding-right:5px;padding-top:50%;" onclick="downloadPlaylistItem(this);">';
                          }
                          
                          strHTMLtext = strHTMLtext + '</div>';
                          strHTMLtext = strHTMLtext + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/></div>';
                  } 
                  
                  if(playlistItemsEndIndex >= item.playlistItems.length - 1)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'none');
                  } else if(playlistItemsEndIndex < item.playlistItems.length - 1)
                  {
                        $('#playlistItemsLoadMoreDiv').css('display', 'block');
                  }
                  
                  });
           
           
           }
           
           });
    
        
        //     $('#userPlaylistsHeader').html(playlistName)
        $('#playlistItemsDiv').html(strHTMLtext);

    $('#playlistItemsLoadMoreDiv').empty();
    var loadMoreHtml = "<div class='linkTransition' id='loadMorePlaylistItems' data-playlistId='"+playlistId+"' data-itemStartIndex=0 data-itemEndIndex=4 style='height:30px;width:100%;background:#B3B3B3;text-align:center;color:white;padding-top:5px;font-size:16px;' title='5' onclick='loadMorePlaylistItems(this)'><b>Load More Playlist Items</b></div>";
    $('#playlistItemsLoadMoreDiv').html(loadMoreHtml);
    
    if(!isActionLoadMoreResult)
    {
        if(isOnline)
        {
                var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;height:100%;" src="'+myPlaylistItems[0].itemPath+'" controls poster="'+myPlaylistItems[0].thumnail+'"></video>';
        } else if(!isOnline)
        {
                if(myPlaylistItems[0].itemPath.indexOf('techtime.stage2.accenture') != -1)
                {
                        if(myPlaylistItems[0].isItemDownloaded == false)
                        {
                            var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;height:100%;" src="https://techtime.stage2.accenture.com" controls poster="'+myPlaylistItems[0].thumnail+'"></video>';
                        }
                        
                } else if(myPlaylistItems[0].itemPath.indexOf('techtime.stage2.accenture') == -1)
                {
                    if(myPlaylistItems[0].isItemDownloaded == true)
                    {
                        var playlistVideoPlayer = '<video id="playlistItemPlayer" type="video/mp4" style="width:100%;height:100%;" src="'+myPlaylistItems[0].itemPath+'" controls poster="'+myPlaylistItems[0].thumnail+'"></video>';
                    }
                }
        }
        
        $('#playlistItemPlayerDiv').html(playlistVideoPlayer);
        document.getElementById('playlistItemPlayer').addEventListener('ended',autoplayNextItem,false);
        
        $('#nowPlayingItemTitle').html(myPlaylistItems[0].itemTitle);
        
        document.getElementById('userPlaylistsItemHeader').innerHTML = playlistName;
            $.mobile.changePage("#playlistsItemPage");
    } 
    
}

// ---------------------------------- Display Playlist Items ---------------------------------- //

// ---------------------------------- Playlists for Add to Playlist Option ---------------------------------- //

function showAddToPlaylist() {
    if(isOnline)
    {
        cancelNewPlaylistCreation();
        
        var htmlText = '';
        var playId = '';
        
        htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';
        
        $.each(jsonData.playlists, function(key, item){
               
               var thumbId = item.playlistItems[item.playlistItems.length - 1].playlistItemId.substr(2, item.playlistItems[item.playlistItems.length - 1].playlistItemId.length);
               var thumbUrl = item.playlistItems[item.playlistItems.length - 1].playlistItemThumb;
               var thumbPath = '';
               
               if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
               {
               thumbPath = "file://"+globalPathNew + "/images/"+thumbId + "thumb.png";
               } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
               {
               if(isOnline)
               {
               thumbPath = thumbUrl;
               } else if(!isOnline)
               {
                   if(downloadedThumbs.indexOf(thumbId + "thumb.png") == -1)
                   {
                   thumbPath = 'images/TechTime-AppIcon.png';
                   } else if(downloadedThumbs.indexOf(thumbId + "thumb.png") != -1)
                   {
                   thumbPath = "file://"+globalPathNew + "/images/"+thumbId + "thumb.png";
                   }
               
               }
               }
               
               playId = item.playlistId;
               
               htmlText = htmlText + '<div id="'+item.playlistId+'" style="width:100%;background-color:#F0EFED;" onclick="addItemToSelectedPlaylist('+item.playlistId+')">';
               htmlText = htmlText + '<div style="width:2%;float:left;text-align:center;background-color:inherit;padding-top:12px;padding-bottom:12px;background-color:#F0EFED;">';
               
               htmlText = htmlText + '</div><div style="width:16%;float:left;margin-top:7px;"><img src="'+thumbPath+'" style="max-height:75px;max-width:75px;width:100%;height:100%;"></img></div>';
               htmlText = htmlText + '<div style="width:68%;float:left;padding-top:12px;padding-bottom:12px;padding-left:5px;padding-right:5px;background-color:#F0EFED;">';
               htmlText = htmlText + '<label style="font-size:16px;font-family:Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;font-weight:bold;color:orange;" >'+item.playlistName+'</label>';
               htmlText = htmlText + '</div><div style="width:10%;padding-top:10px;padding-bottom:9px;float:left;text-align:right;background-color:#F0EFED;">';
               
               if(item.playlistType == "admin")
               {
               htmlText = htmlText + '<img src="images/adminPlaylist.png" style="height:20px;width:20px;"><br/>';
               } else
               {
               htmlText = htmlText + '<br/>';
               }
               
               htmlText = htmlText + '<img src="images/orange_icon_right.png" style="height:20px;width:20px;"></div></div>';
               htmlText = htmlText + '<hr width="100%" color="#999999" style="margin-bottom:0px;"/>';
               
               thumbId = '';
               thumbUrl = '';
               thumbPath = '';
               
               
               
               });
        
        $('#listOfPlaylists').html(htmlText);
        $.mobile.changePage('#addToPlaylistPage');
    } else if(!isOnline)
    {
        jAlert('Please go Online to Add an item to a Playlist.', 'Tech Time');
    }
}

// ---------------------------------- Playlists for Add to Playlist Option ---------------------------------- //



// ---------------------------------- Download Playlist Item ---------------------------------- //

function downloadPlaylistItem(item)
{
    // Set PL Items Page Flag True
    playlistItemsPageFlag = true;
    var downloadPlaylistItemId = '';
    var downloadPlaylistItemUrl = '';
    var downloadPlaylistItemTitle = '';
    
    var myDownloadButton = $('#'+item.id);
    
    downloadPlaylistItemId = myDownloadButton.attr('data-itemId');
    downloadPlaylistItemUrl = myDownloadButton.attr('data-itemUrl');
    downloadPlaylistItemTitle = myDownloadButton.attr('data-itemTitle');
    
    downloadFile(downloadPlaylistItemId, downloadPlaylistItemUrl, false, downloadPlaylistItemTitle, 2);
}


// ---------------------------------- Download Playlist Item ---------------------------------- //


// ---------------------------------- Display Playlist Items ---------------------------------- //

// ---------------------------------- Playlist: AutoPlay Feature ---------------------------------- //

var currentPlayingItemIndex = 0;
function playPlaylistItem(playlistItem)
{
    
    var myPlaylistItem = $('#'+playlistItem.id);
    currentPlayingItemIndex = myPlaylistItem.attr('data-playlistItemIndex');
    
    if(currentPlayingItemIndex === undefined)
    {
        var itemIndex = myPlaylistItems.length - 1;
        currentPlayingItemIndex = myPlaylistItems.length - 1;
    } else
    {
        var itemIndex = parseInt(currentPlayingItemIndex);
    }
    
    var playItemTitle = myPlaylistItems[currentPlayingItemIndex].itemTitle;
    var playItemPath = myPlaylistItems[currentPlayingItemIndex].itemPath;
    var playItemthumb = myPlaylistItems[currentPlayingItemIndex].thumnail;
    var playItemDowloaded = myPlaylistItems[currentPlayingItemIndex].isItemDownloaded;
    var playItemId = myPlaylistItems[currentPlayingItemIndex].itemId;
    
    
    if(isOnline && (playItemDowloaded == true || playItemDowloaded == "true"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
        $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
    } else if(isOnline && (playItemDowloaded == false || playItemDowloaded == "false"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
        $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
    } else if(!isOnline && (playItemDowloaded == true || playItemDowloaded == "true"))
    {
        $('#playlistItemPlayer').attr('src', playItemPath);
        $('#playlistItemPlayer').attr('poster', playItemthumb);
        $('#playlistItemPlayer').attr('autoplay', true);
        $('#nowPlayingItemTitle').html(playItemTitle);
    } else if(!isOnline && (playItemDowloaded == false || playItemDowloaded == "false"))
    {
        jAlert("Please go Online to view this Video.", "Tech Time");
    }
    
}

function autoplayNextItem(e)
{
    var itemIndex = parseInt(currentPlayingItemIndex) + 1;
    
    if(isOnline && myPlaylistItems[itemIndex].isItemDownloaded == false)
    {
        var itemObject = new Object();
        itemObject.id = "playlistItem"+myPlaylistItems[itemIndex].itemId;
        if(itemIndex <= myPlaylistItems.length)
        {
            playPlaylistItem(itemObject);
        }
    } else if(isOnline && myPlaylistItems[itemIndex].isItemDownloaded == true)
    {
        var itemObject = new Object();
        itemObject.id = "playlistItem"+myPlaylistItems[itemIndex].itemId;
        if(itemIndex <= myPlaylistItems.length)
        {
            playPlaylistItem(itemObject);
        }
        
    } else if(!isOnline && myPlaylistItems[itemIndex].isItemDownloaded == false)
    {
        jAlert("Please go online to stream this file.", "Tech Time");
    }

    
}


// ---------------------------------- Playlist: AutoPlay Feature ---------------------------------- //

// ---------------------------------- Rename Playlist ---------------------------------- //
function showRenamePlaylistForm()
{
    $('#userPlaylistsRenameDeleteOption').css('display', 'none');
    $('#renamePlaylistNoName').css('display', 'none');
    $('#renamePlaylistNoInternet').css('display', 'none');
    $('#renamePlaylistForm').css('display', 'block');
    
    $('#renamePlaylistNamePlaceholder').val($('#userPlaylistsItemHeader').text());
    
    showHideVideoPlayer("hide");
    
}

function cancelRenamePlaylistAction()
{
    $('#renamePlaylistForm').css('display', 'none');
    $('#renamePlaylistNoName').css('display', 'none');
    $('#renamePlaylistNoInternet').css('display', 'none');
    $('#userPlaylistsRenameDeleteOption').css('display', 'block');
    showHideVideoPlayer("show");
}

var currentOpenPlaylist = '';

// TODO: UI - Hide the Rename form and show back the Rename Delete option
// TODO: UI - Change the Name of the Playlist in the Playlist Items Page
// TODO: Compile Details
// TODO: Rename Error Handlers within page
// FIXME: Back of Playlist Items Page, Re-Render the Playlists List Page with the updated names and playlists
function renamePlaylist()
{
    
    var renamePlaylistService = 'https://techtime.stage2.accenture.com/techtimemobile/playlist-service';
    var renamePlaylistName = $('#renamePlaylistNamePlaceholder').val();
    renamePlaylistName = renamePlaylistName.replace(/[^a-zA-Z0-9 ]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s\s*/, '');
    renamePlaylistName = renamePlaylistName.substring(0, 40);
    var playlistExists = false;
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    
    $.each(jsonData.playlists, function(key, item){
           if(item.playlistName == renamePlaylistName)
           {
           playlistExists = true;
           }
           });
    
    if(isOnline && !playlistExists)
    {
        if(renamePlaylistName != "")
        {
            var renamePlaylistJsonData = '{"data":{"mode":"rename","username":"'+loggedInUsername+'","playlistIds":"'+currentOpenPlaylist+'","renamedPlaylist":"'+renamePlaylistName+'"}}';
            
            $.ajax({
                   type: 'POST',
                   url: renamePlaylistService,
                   data: renamePlaylistJsonData,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   // TODO: UI - Hide the Rename form and show back the Rename Delete option
                   $('#renamePlaylistForm').css('display', 'none');
                   $('#userPlaylistsRenameDeleteOption').css('display', 'block');
                   
                   // TODO: UI - Change the Name of the Playlist in the Playlist Items Page
                   $('#userPlaylistsItemHeader').html(renamePlaylistName);
                   
                   //TODO: Compile Details
                   // Add the details of the remaned PL to JSON
                   updatePlaylistNameInJson(currentOpenPlaylist, renamePlaylistName);
                   showHideVideoPlayer("show");
                   },
                   error: function(xhr, textStatus, error){
                   console.log('In Failure'+JSON.stringify(xhr));
                   jAlert('Oops! There was some error renaming your Playlist. Please try again.', 'Tech Time');
                   }
                   });
            
        } else
        {
            $('#renamePlaylistForm').css('display', 'none');
            $('#renamePlaylistNoName').css('display', 'block');
            
        }
    } else if(!isOnline)
    {
        $('#renamePlaylistForm').css('display', 'none');
        $('#renamePlaylistNoName').css('display', 'none');
        $('#renamePlaylistNoInternet').css('display', 'block');
    } else if(playlistExists)
    {
        jAlert('Playlist with this name already exists. Please choose a different name.', 'Tech Time');
        playlistExists = false;
    }
    
    
}

function updatePlaylistNameInJson(playlistId, newPlaylistName)
{
    $.each(jsonData.playlists, function(key, playlist){
           if(playlist.playlistId == playlistId)
           {
           playlist.playlistName = newPlaylistName;
           }
           });
    
    getFileSystemRefForWriting(jsonData);
}

// ---------------------------------- Rename Playlist ---------------------------------- //

// ---------------------------------- Delete Playlist ---------------------------------- //
function showDeletePlaylistConfirmation()
{
    $('#deletePlaylistConfirmation').css('display', 'block');
    $('#deletePlaylistConfirmationLabel').text("Are you sure you want to delete "+$('#userPlaylistsItemHeader').text()+"?");
    
    $('#userPlaylistsRenameDeleteOption').css('display', 'none');
    showHideVideoPlayer("hide");
}

function cancelDeletePlaylistAction()
{
    $('#deletePlaylistConfirmation').css('display', 'none');
    $('#deletePlaylistNoInternet').css('display', 'none');
    $('#userPlaylistsRenameDeleteOption').css('display', 'block');
    
    showHideVideoPlayer("show");
}

// TODO: UI - Hide the Delete form and go back to Playlists List Page
// TODO: UI - Re-render the Playlists List Page with updated sets pf Playlists/Playlist
// TODO: Compile Details in JSON
// TODO: Delete Playlist Error Handlers within page
// TODO: Auto switch to Playlists List Page

function deletePlaylist()
{
    var deletePlaylistService = 'https://techtime.stage2.accenture.com/techtimemobile/playlist-service';
    
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    
    if(isOnline)
    {
        var deletePlaylistJsonData = '{"data":{"mode":"delete","username":"'+loggedInUsername+'","playlistIds":"'+currentOpenPlaylist+'"}}';
        
        $.ajax({
               type: 'POST',
               url: deletePlaylistService,
               data: deletePlaylistJsonData,
               dataType: 'xml',
               contentType: 'application/json',
               success: function(data) {
               // TODO: UI - Hide the Delete form and go back to Playlists List Page
               $('#deletePlaylistConfirmation').css('display', 'none');
               $('#userPlaylistsRenameDeleteOption').css('display', 'block');
               
               //TODO: Compile Details
               // Add the details of the remaned PL to JSON
               updatePlaylistsInJsonAfterDeletePlaylist(currentOpenPlaylist);
               $('#playlistItemPlayer').css('display', 'block');
               },
               error: function(xhr, textStatus, error){
               console.log('In Failure'+JSON.stringify(xhr));
               jAlert('Oops! There was some error deleting your Playlist. Please try again.', 'Tech Time');
               }
               });
        
    } else if(!isOnline)
    {
        // $('#deletePlaylistConfirmation').css('display', 'none');
        // $('#deletePlaylistNoInternet').css('display', 'block');
        
        jsonData.deletedPlaylistIds.push(currentOpenPlaylist);
        updatePlaylistsInJsonAfterDeletePlaylist(currentOpenPlaylist);
        cancelDeletePlaylistAction();
    }
    
}

function updatePlaylistsInJsonAfterDeletePlaylist(playlistToBeRemoved)
{
    var indexOfDeletedPlaylist;
    
    $.each(jsonData.playlists, function(key, playlist)
           {
           if(playlist.playlistId == playlistToBeRemoved)
           {
           indexOfDeletedPlaylist = key;
           }
           });
    
    if(indexOfDeletedPlaylist != null)
    {
        if(~indexOfDeletedPlaylist)jsonData.playlists.splice(indexOfDeletedPlaylist, 1);
    }
    
    // TODO: Auto switch to Playlists List Page with updated sets pf Playlists/Playlist
    resetPlaylistLMRParameters();
    displayPlaylist();
    $.mobile.changePage('#PlaylistsPage');
    getFileSystemRefForWriting(jsonData);
}


// ---------------------------------- Delete Playlist ---------------------------------- //

// ---------------------------------- Create New Playlist ---------------------------------- //

function showCreateNewPlaylistForm()
{
    $('#newPlaylistNamePlaceholder').val('');
    $('#createNewPlaylistForm').css('display', 'block');
    $('#createNewPlaylistTab').css('display', 'none');
    $('#createPLNoName').css('display', 'none');
    
}

function cancelNewPlaylistCreation()
{
    $('#createNewPlaylistTab').css('display', 'block');
    
    $('#createNewPlaylistForm').css('display', 'none');
    $('#createPLNoInternet').css('display', 'none');
    $('#createPLNoName').css('display', 'none');
}

function createNewPlaylist()
{
    var createPlaylistService = 'https://techtime.stage2.accenture.com/techtimemobile/playlist-service';
    var createPlaylistName = $('#newPlaylistNamePlaceholder').val();
    createPlaylistName = createPlaylistName.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    createPlaylistName = createPlaylistName.substring(0, 40);
    
    var playlistExists = false;
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    
    $.each(jsonData.playlists, function(key, item){
                if(item.playlistName == createPlaylistName)
                   {
                        playlistExists = true;
                   }
           });
    
    if(isOnline && !playlistExists)
    {
        if(createPlaylistName != "")
        {
            var createPlaylistJsonData = '{"data" :{"mode" : "create","username":"'+loggedInUsername+'","playlistName":"'+createPlaylistName+'"}}';
            
            $.ajax({
                   type: 'POST',
                   url: createPlaylistService,
                   data: createPlaylistJsonData,
                   dataType: 'xml',
                   contentType: 'application/json',
                   success: function(data) {
                   
                   var dataResult = $(data).find('result');
                   var dataResultItem = $(dataResult).find('item');
                   var dataResultItemId = $(dataResultItem).find('id');
                   
                   var createdPlaylistId = dataResultItemId.text();
                   
                   $('#createNewPlaylistForm').css('display', 'none');
                   $('#createNewPlaylistTab').css('display', 'block');
                   
                   // TODO: Compile Details
                   // Add the details of the created PL to JSON
                   addPlaylistDetailsToJsonAfterCreation(createPlaylistName, createdPlaylistId);
                   
                   // Switch To Detail Page from where Add to PL was pressed.
                   },
                   error: function(xhr, textStatus, error){
                   console.log('In Failure'+JSON.stringify(xhr));
                   jAlert('Oops! There was some error creating your Playlist. Please try again.', 'Tech Time');
                   }
                   });
            
        } else
        {
            //jAlert('Please enter a valid Playlist Name.', 'Tech Time');
            $('#createNewPlaylistForm').css('display', 'none');
            $('#createPLNoName').css('display', 'block');
            
        }
    } else if(!isOnline)
    {
         $('#createNewPlaylistForm').css('display', 'none');
         $('#createPLNoInternet').css('display', 'block');
        //jAlert('Please connect to the internet for creating new Playlist', 'Tech Time');
        //        var offlinePlaylists = jsonData.offlinePlaylists.length();
      //  var offlineCreatedPlaylistName = createPlaylistName;
      //  var offlineCreatedPlaylistId = jsonData.offlinePlaylists.length;
        
       // addPlaylistDetailsToJsonAfterCreation(offlineCreatedPlaylistName, offlineCreatedPlaylistId);
    } else if(playlistExists)
    {
        jAlert('Playlist with this name already exists. Please choose a different name.', 'Tech Time');
        playlistExists = false;
    }
    
}

// ---------------------------------- Create New Playlist ---------------------------------- //

// ---------------------------------- Add Playlist Details to JSON ---------------------------------- //
var playlistItemToBeAdded = new Object();

function getAddToPlaylistItemDetails(addToPlaylistItem)
{
    playlistItemToBeAdded = new Object();
    playlistItemToBeAdded.playlistItemFormatType = $('#'+addToPlaylistItem.id).attr("data-playlistItemId").substring(0,1);
    playlistItemToBeAdded.playlistItemContentType = 'p';
    playlistItemToBeAdded.playlistItemId = $('#'+addToPlaylistItem.id).attr("data-playlistItemId");
    playlistItemToBeAdded.playlistItemTitle = $('#'+addToPlaylistItem.id).attr("data-playlistItemTitle");
    playlistItemToBeAdded.playlistItemDate = $('#'+addToPlaylistItem.id).attr("data-playlistItemDate");
    playlistItemToBeAdded.playlistItemAuthor = $('#'+addToPlaylistItem.id).attr("data-playlistItemAuthor");
    playlistItemToBeAdded.playlistItemUrl = $('#'+addToPlaylistItem.id).attr("data-playlistItemUrl");
    playlistItemToBeAdded.playlistItemFormat = 'mp4';
    playlistItemToBeAdded.playlistItemThumb = $('#'+addToPlaylistItem.id).attr("data-playlistItemThumb");
    
    addedItemName = playlistItemToBeAdded.playlistItemTitle;
    
    
  /*  playlistItem = new Object();
    playlistItem.itemId = playlistItemToBeAdded.playlistItemId;
    playlistItem.itemTitle = playlistItemToBeAdded.playlistItemTitle;
    playlistItem.thumnail = playlistItemToBeAdded.playlistItemThumb;
    
    if(entries.indexOf(playlistItem.itemId) == -1)
    {
        playlistItem.itemPath = playlistItemToBeAdded.playlistItemUrl;
        playlistItem.isItemDownloaded = false;
    } else if(entries.indexOf(playlistItem.itemId) != -1)
    {
        playlistItem.itemPath = "file://"+globalPathNew+playlistItemToBeAdded.playlistItemId+".mp4";
        playlistItem.isItemDownloaded = true;
    } */
    
    
}


function addPlaylistDetailsToJsonAfterCreation(createdPlaylistName, createdPlaylistId)
{
    var playlist = new Object();
    playlist.playlistId = createdPlaylistId;
    playlist.playlistName = createdPlaylistName;
    playlist.playlistType = "normal";
    playlist.playlistItems = [];
    playlist.playlistItems.push(playlistItemToBeAdded);
    
    addedItemToPlaylistName = createdPlaylistName;
    
    if(isOnline)
    {
        playlist.isUpdated = true;
    } else (!isOnline)
    {
        playlist.isUpdated = false;
    }
    
    jsonData.playlists.push(playlist);
    
    $.mobile.changePage("#detailMediaPage");
    
    if(isOnline)
    {
        updateAddedItemOnServer(createdPlaylistId, playlistItemToBeAdded.playlistItemId.substring(2, playlistItemToBeAdded.playlistItemId.length));
    }
    
    getFileSystemRefForWriting(jsonData);
}

// TODO: DO NOT ALLOW items to be added to Admin Playlist
function addItemToSelectedPlaylist(playlistIdToAdd)
{
    
    if(isOnline)
    {
        $.each(jsonData.playlists, function(key, item){
               if(item.playlistId == playlistIdToAdd)
               {
               
               var itemAlreadyInPlaylist = false;
               var isAdminPlaylist = false;
               
               if(item.playlistType == 'admin')
               {
               isAdminPlaylist = true;
               }
               
               $.each(item.playlistItems, function(key, playlistItem){
                      if(playlistItem.playlistItemId == playlistItemToBeAdded.playlistItemId)
                      {
                      itemAlreadyInPlaylist = true;
                      }
                      });
               
               if(itemAlreadyInPlaylist == false && isAdminPlaylist == false)
               {
               addedItemToPlaylistName = item.playlistName;
               
               item.playlistItems.push(playlistItemToBeAdded);
               $.mobile.changePage("#detailMediaPage");
               if(isOnline)
               {
               updateAddedItemOnServer(playlistIdToAdd, playlistItemToBeAdded.playlistItemId.substring(2, playlistItemToBeAdded.playlistItemId.length));
               } if(!isOnline)
               {
               item.isUpdated = false;
               }
               getFileSystemRefForWriting(jsonData);
               } else if(itemAlreadyInPlaylist == true && isAdminPlaylist == false)
               {
               jAlert('Item already exists in this playlist.', 'Tech Time');
               } else if(itemAlreadyInPlaylist == true && isAdminPlaylist == true)
               {
               jAlert('You cannot add items to an Admin Playlist. Item already exists in this playlist.', 'Tech Time');
               } else if(itemAlreadyInPlaylist == false && isAdminPlaylist == true)
               {
               jAlert('You cannot add items to an Admin Playlist.', 'Tech Time');
               }
               
               }
               });
    } else if(!isOnline)
    {
        jAlert('Please go Online to add selected Item to this Playlist.', 'Tech Time');
    }
}


var addedItemName = '';
var addedItemToPlaylistName = '';

function updateAddedItemOnServer(addedToPlaylistId, addedItemId)
{
    var localPlaylistId = addedToPlaylistId;
    var localItemId = addedItemId;
    
    var addItemToPlaylistService = 'https://techtime.stage2.accenture.com/techtimemobile/playlist-items-service';
    
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    
    if(isOnline)
    {
        var addItemToPlaylistJsonData = '{"data":{"mode":"addItem","username":"'+loggedInUsername+'","playlistIds":"'+localPlaylistId+'","itemId":"'+localItemId+'"}}';
        
        $.ajax({
               type: 'POST',
               url: addItemToPlaylistService,
               data: addItemToPlaylistJsonData,
               dataType: 'xml',
               contentType: 'application/json',
               success: function(data) {
               getFileSystemRefForWriting(jsonData);
               jAlert('"'+addedItemName+'" is added to playlist "'+addedItemToPlaylistName+'".', 'Tech Time');
               },
               error: function(xhr, textStatus, error){
               console.log('In Failure'+JSON.stringify(xhr));
               jAlert('Oops! There was some error creating your Playlist. Please try again.', 'Tech Time');
               }
               });
        
    }
    
    
}

// ---------------------------------- Add Playlist Details to JSON ---------------------------------- //

// ---------------------------------- Share Playlists ---------------------------------- //



//{"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"1,2,3","recepients": "pravesh.pesswani,bhavya.anand"}}
var sharePlaylistJson = '{"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"';
var selectedPlaylistsToShare = [];

function selectPlaylistForSharing(selectedPlaylistForSharing)
{
    var sharedPlaylistDetails = new Object();
    sharedPlaylistDetails.selectedPlaylistId = $('#'+selectedPlaylistForSharing.id).attr('data-playlistId');
    sharedPlaylistDetails.selectedPlaylistName = $('#'+selectedPlaylistForSharing.id).attr('data-playlistName');
    
    var indexOfSelectedPlaylist;
    $.each(selectedPlaylistsToShare, function(key, item){
           
           if(item.selectedPlaylistId == sharedPlaylistDetails.selectedPlaylistId)
           {
           indexOfSelectedPlaylist = key;
           }
           });
    
    if(selectedPlaylistForSharing.checked)
    {
        selectedPlaylistsToShare.push(sharedPlaylistDetails);
    }else if(!selectedPlaylistForSharing.checked)
    {
        selectedPlaylistsToShare.splice(indexOfSelectedPlaylist, 1);
    }
    
}

function displaySharePlaylistPage()
{
    $('#sharedPlaylistsNames').empty();
    if(selectedPlaylistsToShare.length > 0 && isOnline)
    {
        //       <label id="myPlayList" style="padding-left:10px;color:#000;font-family:Gotham, 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;">Ankit's Playlist</label>
        var sharedPlaylistsNameHtml = '';
        
        $('#sharePlaylistHeaderText').html('');
        if(selectedPlaylistsToShare.length == 1)
        {
            $('#sharePlaylistHeaderText').html('Playlist you have selected to Share:');
            $('#sharePlaylistBtn').attr('src', 'images/sharePlaylistBtn.png');
        } else if(selectedPlaylistsToShare.length > 1)
        {
            $('#sharePlaylistHeaderText').html('Playlists you have selected to Share:');
            $('#sharePlaylistBtn').attr('src', 'images/sharePlaylistsBtn.png');
        }
        
        $.each(selectedPlaylistsToShare, function(key, item){
               sharedPlaylistsNameHtml += '<label id="myPlayList" style="padding-left:10px;color:#000;font-family:Gotham, Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;">'+item.selectedPlaylistName+'</label><br/>';
               });
        
        sharedPlaylistsNameHtml += '<hr width="100%" size="1" style="padding-left:10px;">';
        
        $('#sharedPlaylistsNames').html(sharedPlaylistsNameHtml);
        resetSharePlaylistForm();
        $.mobile.changePage("#sharePlaylistsPage");
    } else if(selectedPlaylistsToShare.length == 0 && isOnline)
    {
        jAlert('Please select a playlist to Share.', 'Tech Time');
    } else if(!isOnline)
    {
        jAlert('Please check your internet connection or Go Online to share Playlists.', 'Tech Time');
    }
    
}

var currentIndexPL = 3;

function addEmailField()
{
	currentIndexPL = currentIndexPL + 1;
	var emailInputHTML = '';
	
	emailInputHTML += '<div id="inputMailFormDiv'+currentIndexPL+'" style="width:75%;float:left;padding-left:2%;margin-bottom:10px">';
    emailInputHTML += '<input id="playlistRecepient'+currentIndexPL+'" type="text" class="recepientMailAddress" placeholder="Enter Accenture Mail ID" name="email" id="email" style="width:95%;margin:auto;text-indent:3px;" onfocus="appendEmailDomain(this);">';
    emailInputHTML += '</div><div id="inputMailAddRemoveDiv'+currentIndexPL+'" style="width:17%;float:right">';
    emailInputHTML += '<img id="removeEmailFieldButton'+currentIndexPL+'" src="images/removeOption.png" style="height:24px;width:24px;" onClick="removeEmailField(this)"></img>';
    emailInputHTML += '<img id="addEmailFieldButton'+currentIndexPL+'" src="images/addOption.png" style="height:24px;width:24px;" onClick="addEmailField(this)"></img>';
    emailInputHTML += '</div>';
    
    $('#shareWithInputForm').append(emailInputHTML);
    
    // Refresh Rendering of Text Input
    $('#playlistRecepient'+currentIndexPL).textinput().textinput("refresh");
    emailInputHTML = '';
}

function removeEmailField(recepientToRemove)
{
	var recepientToRemoveArray = recepientToRemove.id.split('removeEmailFieldButton');
	var recepientToRemoveId = recepientToRemoveArray[1];
	
	$('#inputMailFormDiv'+recepientToRemoveId).remove();
	$('#addEmailFieldButton'+recepientToRemoveId).remove();
	$('#removeEmailFieldButton'+recepientToRemoveId).remove();
	$('#playlistRecepient'+recepientToRemoveId).remove();
	$('#inputMailAddRemoveDiv'+recepientToRemoveId).remove();
}

var sharePlaylistJSON = '';

function generateSharePlaylistRecepientsList()
{
	var validRecepientsFlag = false;
	var inputFields = $(".recepientMailAddress");
    var loggedInUsername = jsonData.loggedUserName.replace(/_/g, '.');
    // {"data":{"mode":"share","username":"ankit.bharat.tanna","playlistIds":"1,2,3","recepients": "pravesh.pesswani,bhavya.anand"}}
    
	sharePlaylistJSON = '{"data":{"mode":"share","username":"'+loggedInUsername+'","playlistIds":"';
	for(var i=0;i<selectedPlaylistsToShare.length;i++)
	{
		if(i<selectedPlaylistsToShare.length-1)
		{
			sharePlaylistJSON += selectedPlaylistsToShare[i].selectedPlaylistId+',';
		} else {
			sharePlaylistJSON += selectedPlaylistsToShare[i].selectedPlaylistId+'",';
		}
		
	}
	
	sharePlaylistJSON += '"recepients":"';
	
	$(".recepientMailAddress").each(function(index, element) {
                                    var sharedToRecepient = $(this).val();
                                    
                                    if((sharedToRecepient != '' || sharedToRecepient == '@accenture.com') && (sharedToRecepient == '' || sharedToRecepient != '@accenture.com'))
                                    {
                                    if(sharedToRecepient.indexOf('@accenture.com') == -1)
                                    {
                                    validRecepientsFlag = false;
                                    }
                                    }
                                    
                                    
                                    if(index < $(".recepientMailAddress").length - 1)
                                    {
                                    // add comma at end
                                    if(sharedToRecepient != '')
                                    {
                                    if(sharedToRecepient != '@accenture.com')
                                    {
                                    sharePlaylistJSON += sharedToRecepient.replace('@accenture.com', '').toLowerCase() + ',';
                                    }
                                    }
                                    } else
                                    {
                                    // dont add comma at end
                                    if(sharedToRecepient != '')
                                    {
                                    if(sharedToRecepient != '@accenture.com')
                                    {
                                    sharePlaylistJSON += sharedToRecepient.replace('@accenture.com', '').toLowerCase();
                                    }
                                    }
                                    }
                                    
                                    if(sharedToRecepient.replace('@accenture.com', '') != '')
                                    {
                                        validRecepientsFlag = true;
                                    }
                                    
                                    
                                    
                                    });
	
	sharePlaylistJSON += '"}}';
    
    if(validRecepientsFlag)
    {
        sharePlaylistsToRecepients(sharePlaylistJSON);
    } else
    {
        jAlert("Please enter the Email address to share the selected Playlists.", "Tech Time");
    }
    
	
}

function sharePlaylistsToRecepients(serviceJson)
{
    var sharePlaylistService = 'https://techtime.stage2.accenture.com/techtimemobile/playlist-service';
    
    if(isOnline)
    {
        var sharePlaylistsJsonData = serviceJson;
        $.ajax({
               type: 'POST',
               url: sharePlaylistService,
               data: sharePlaylistsJsonData,
               dataType: 'xml',
               contentType: 'application/json',
               success: function(data) {
               if(selectedPlaylistsToShare.length > 1)
               {
               jAlert('Email sent successfully.', 'Tech Time');
               } else if(selectedPlaylistsToShare.length == 1)
               {
               jAlert('Email sent successfully.', 'Tech Time');
               }
               resetSharePlaylistForm();
               resetSharePlaylistParameters();
               resetPlaylistLMRParameters();
               displayPlaylist();
               },
               error: function(xhr, textStatus, error){
               console.log('In Failure'+JSON.stringify(xhr));
               if(selectedPlaylistsToShare.length > 1)
               {
               jAlert('Oops! There was some error sharing your Playlists. Please try again.', 'Tech Time');
               } else if(selectedPlaylistsToShare.length == 1)
               {
               jAlert('Oops! There was some error sharing your Playlist. Please try again.', 'Tech Time');
               }
               }
               });
        
    } else if(!isOnline)
    {
        if(selectedPlaylistsToShare.length > 1)
        {
            jAlert('Please check your internet connection or Go Online to share your Playlists.', 'Tech Time');
        } else if(selectedPlaylistsToShare.length == 1)
        {
            jAlert('Please check your internet connection or Go Online to share your Playlist.', 'Tech Time');
        }
    }
}

function appendEmailDomain(emailInputItem)
{
    if($('#'+emailInputItem.id).val() == "@accenture.com" || $('#'+emailInputItem.id).val() == "")
    {
        $('#'+emailInputItem.id).val('@accenture.com');
        $('#'+emailInputItem.id).prop('selectionStart', 0).prop('selectionEnd', 10);
    }
    
}

function resetSharePlaylistForm()
{
    var recepientInputFields = $("input[id^='playlistRecepient']");
    var recepientInputDivs = $("div[id^='inputMailFormDiv']");
    var recepientInputAddRemoveDivs = $("div[id^='inputMailAddRemoveDiv']");
    
    $.each(recepientInputFields, function(){
           $(this).val('');
           });
    
    $.each(recepientInputDivs, function(index){
           if(index > 2)
           {
           $(this).remove();
           }
           
           });
    
    $.each(recepientInputAddRemoveDivs, function(index){
           $(this).remove();
           });
    
    
}

function resetSharePlaylistParameters()
{
    sharePlaylistJSON = '';
    selectedPlaylistsToShare = [];
    $('#sharedPlaylistsNames').empty();
}

// ---------------------------------- Share Playlists ---------------------------------- //

// ---------------------------------- Offline Playlist Operations ---------------------------------- //
// TODO: Playlist IDs created offline


// ---------------------------------- Offline Playlist Operations ---------------------------------- //


// ---------------------------------- Load More Playlist Items --------------------------------------//

function loadMorePlaylistItems(playlistLoadMoreBand)
{
    isActionLoadMoreResult = true;
    
    playlistItemsStartIndex += 5;
    playlistItemsEndIndex += 5;
                                        
    var localPlaylistId = $('#'+playlistLoadMoreBand.id).attr('data-playlistId');
    displayPlaylistItems(localPlaylistId);
}

function resetPlaylistLMRParameters()
{
    playlistItemsStartIndex = 0;
    playlistItemsEndIndex = 4;
    isActionLoadMoreResult = false;
}

// ---------------------------------- Load More Playlist Items --------------------------------------//

// ---------------------------------- Show Hide Video Player --------------------------------------//

function showHideVideoPlayer(action)
{
    
    if(action == "hide")
    {
        document.getElementById('playlistItemPlayer').pause();
        $('#playlistItemPlayer').css('display', 'none');
    } else if(action == "show")
    {
        document.getElementById('playlistItemPlayer').play();
        $('#playlistItemPlayer').css('display', 'block');
    }
}

// ---------------------------------- Show Hide Video Player --------------------------------------//