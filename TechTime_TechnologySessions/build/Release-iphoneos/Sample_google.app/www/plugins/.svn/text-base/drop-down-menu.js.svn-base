$(document).ready(function(){
    
    		$("body, li, #type, #topic,#topic1,#typeS,#typeS1").click(function(event){
    					
                                                        
    				 if(event.target.id == 'type' || event.target.id == 'type1'){
    				 	//console.log('11111');
    				 }else{    				 
    				 	$("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout    				 
    				 }    				 
    				 
    				 if(event.target.id == 'topic' || event.target.id == 'topic1'){
    				 	//console.log('2222');
    				 }else{
    				 	$("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
                       
    				 }	
                                    
                                                        
                                                        
                                                        if(event.target.id == 'typeS' || event.target.id == 'typeS1'){
                                                        
                                                        //console.log('2222');
                                                        
                                                        }else{
                                                            $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout
                                                        }	
                                                        
                                                        
    		});
  										
									
			$("ul.navigation li label ").click(function(){
			
                $(this).parent().find("ul.submenu").slideDown('slow').show(); //Showing Submenu when mouseover
                $(this).parent().find("ul.submenu1").slideDown('slow').show();
                $(this).parent().find("ul.submenu2").slideDown('slow').show();
							
			});
	
});


function changeDropDown(id,title,element)
{
    $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout		 		 		
    $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout	
    
    var mediaType = 'false';
    var subCatName = 'false';
    var sortByDateVal = 'false';
    
//    showSortedTAListing(currentCategoryId,currentCategory,'false','false','false');
//    function showSortedTAListing(curCatId, curCatName,sortBySubCat,sortByMediaType,sortByDate)
    
    if(id == 'type'){

        document.getElementById('type').innerHTML = element;
        subCatName = document.getElementById('topic').innerHTML;
        mediaType = title;
    }
    
    
    if(title == '1'){
    
        subCatName = element.text;
        document.getElementById('topic').innerHTML = subCatName;
        mediaType = document.getElementById('type').innerHTML;
    
    }
    
    
    if(subCatName == 'Topic'){
        subCatName = 'false';
    }
    if(mediaType == 'All'){
        mediaType = 'false';
    }
    
    if(document.getElementById('sortByDate').style.color == 'orange'){
        sortByDateVal = 'true';
    }else{
        sortByDateVal = 'false';
    }
    
    
    console.log('\n\n');
    console.log('selectedCategoryId   :-->'+selectedCategoryId);
    console.log('selectedCategoryName :-->'+selectedCategoryName);
    console.log('subCatName           :-->'+subCatName);
    console.log('mediaType            :-->'+mediaType);
    console.log('sortByDateVal        :-->'+sortByDateVal);
    console.log('\n');
    
    showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,mediaType,sortByDateVal)
    
}

function sortDate()
{
    var sortByDateVal ='false';
    var mediaType = 'false';
    var subCatName = 'false';
    
    var media = '';
    
    var dateColor = document.getElementById('sortByDate').style.color;
    var subCatName = document.getElementById('topic').innerHTML;
    var testType = document.getElementById('type').innerHTML;
    
    if(subCatName == 'Topic'){
        subCatName = 'false';
    }
    
    if(testType == 'All'){
        media = 'false';
    }else if(testType == 'Audios'){
        media = 'Audio';
    }else if(testType == 'Videos'){
        media = 'Video';
    }else if(testType == 'Panel Discussions'){
        media = 'PanelDiscussion';
    }else if(testType == 'Events'){
        media = 'Events';
    }else if(testType == 'Interviews'){
        media = 'Interviews';
    }else if(testType == 'Documents'){
        media = 'Documents';
    }else{
        media = 'PanelDiscussion';
    }
    
    
    if(dateColor == 'black'){
        document.getElementById('sortByDate').style.color = 'orange';       // descending order
        sortByDateVal = 'true';
    }else{
        document.getElementById('sortByDate').style.color = 'black';        // ascending order
        sortByDateVal = 'false';
    }
    
    console.log('\n\n');
    console.log('selectedCategoryId   :-->'+selectedCategoryId);
    console.log('selectedCategoryName :-->'+selectedCategoryName);
    console.log('subCatName           :-->'+subCatName);
    console.log('mediaType            :-->'+mediaType);
    console.log('sortByDateVal        :-->'+sortByDateVal);
    console.log('\n sort date function');
    
    showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,media,sortByDateVal)
    
}


function sortDateSearch()
{
    
    var media = '';
    var testType = document.getElementById('typeS').innerHTML;
    var searchDateColor = document.getElementById('sortByDateSearchField').style.color;
    
    if(searchDateColor == 'black'){
        document.getElementById('sortByDateSearchField').style.color = 'orange';
    }else{
        document.getElementById('sortByDateSearchField').style.color = 'black';
    }
    
    if(testType == 'All'){
        media = 'All';
    }else if(testType == 'Audios'){
        media = 'Audio';
    }else if(testType == 'Videos'){
                 media = 'Video';
    }else if(testType == 'Panel Discussions'){
                 media = 'PanelDiscussion';
    }else if(testType == 'Events'){
                 media = 'Events';
    }else if(testType == 'Interviews'){
                 media = 'Interviews';
    }else if(testType == 'Documents'){
                 media = 'Documents';
    }else{
            media = 'PanelDiscussion';
    }
    
    showSearchResult("prevSearch",media,testType);
}


function clearSearch()
{
 document.getElementById('sortByDateSearchField').style.color = 'black';   
    
    $('#searchTAListResult, #searchDetailMediaPage, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory').val('');
    
    $('#searchTAListResult, #searchDetailMediaPage, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory').attr('placeholder', '   Search');
    
}



function changeDropDownSearch(id,title,element)
{
    $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout
    
}

function generateClick(element)
{
    $('#'+ element).click();
    
}
