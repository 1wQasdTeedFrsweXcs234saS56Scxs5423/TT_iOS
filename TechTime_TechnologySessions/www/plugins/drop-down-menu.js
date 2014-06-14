$(document).ready(function(){
                  
                  $("body, li, #type, #topic, #topic1").click(function(event){
                                                              
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
                                                              
                                                              }else{
                                                              $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout
                                                              }
                                                              
                                                              if(event.target.id == 'language' || event.target.id == 'language1'){
                                                              //console.log('11111');
                                                              }else{
                                                              $("ul.navigation li label").parent().find("ul.submenu3").slideUp('slow'); //Hiding Submenu when mouseout
                                                              }
                                                              
                                                              
                                                              
                                                              });
                  
                  
                  $("ul.navigation li label ").click(function(){
                                                     
                                                     $(this).parent().find("ul.submenu").slideDown('slow').show(); //Showing Submenu when mouseover
                                                     $(this).parent().find("ul.submenu1").slideDown('slow').show();
                                                     $(this).parent().find("ul.submenu2").slideDown('slow').show();
                                                     $(this).parent().find("ul.submenu3").slideDown('slow').show();
                                                     
                                                     });
                  
                  });


/*function changeDropDownOLD(id,title,element)
{
    
    console.log("CHANGEDROPDOWN    id :"+id+"    title: "+title+"    element :"+element);
    
    $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
    
    
    var mediaType = 'false';
    var subCatName = 'false';
    var sortByDateVal = 'false';
    var sortByLang = 'false';
    //         showSortedTAListing(currentCategoryId,currentCategory,'false','false','false');
    //         function showSortedTAListing(curCatId, curCatName,sortBySubCat,sortByMediaType,sortByDate)
    
    if(id == 'type'){
        
        document.getElementById('type').innerHTML = element;
        subCatName = document.getElementById('topic').innerHTML;
        sortByLang = document.getElementById('language').innerHTML;
        mediaType = title;
        
        //alert('type subCatName   '+subCatName+"\n  mediaType"+mediaType+"\n lang :"+sortByLang);
    }
    
    
    if(title == '1'){
        
        subCatName = element.text;
        document.getElementById('topic').innerHTML = subCatName;
        mediaType = document.getElementById('type').innerHTML;
        sortByLang = document.getElementById('language').innerHTML;
        //alert('title1 subCatName   '+subCatName+"\n  mediaType"+mediaType+"\n lang :"+sortByLang);
        
        
    }
    
    if(id == 'language'){
        
        document.getElementById('language').innerHTML = element;
        sortByLang = title;
        subCatName = document.getElementById('topic').innerHTML;
        mediaType = document.getElementById('type').innerHTML;
        
    }
    
    
    if(subCatName == 'Topic'){
        subCatName = 'false';
    }
    if(mediaType == 'All'){
        mediaType = 'false';
    }
    if(sortByLang == 'all'){
        sortByLang = 'false';
    }
    
    //         if(document.getElementById('sortByDate').style.color == 'orange'){
    //             sortByDateVal = 'true';
    //         }else{
    //             sortByDateVal = 'false';
    //         }
    
    
    //         console.log('\n\n');
    //         console.log('selectedCategoryId   :-->'+selectedCategoryId);
    //         console.log('selectedCategoryName :-->'+selectedCategoryName);
    //         console.log('subCatName           :-->'+subCatName);
    //         console.log('mediaType            :-->'+mediaType);
    //         console.log('sortByDateVal        :-->'+sortByDateVal);
    //         console.log('\n');
    
    showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,mediaType,sortByDateVal,sortByLang);
    
    
    
} */


function changeDropDown(id,title,element)
{
    $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu3").slideUp('slow');
    
    var mediaType = 'false';
    var subCatName = 'false';
    var sortByDateVal = 'false';
    var sortByLang = 'false';
    if(id == 'type'){
        document.getElementById('type').innerHTML = element;
        subCatName = document.getElementById('topic').innerHTML;
        mediaType = title;
        sortByLang = document.getElementById('language').innerHTML;
        if(sortByLang == ''){
            sortByLang = 'false';
        }
        else
        {
            if(sortByLang=='English')
            {
                sortByLang= 'en';
            }
            if(sortByLang=='Spanish')
            {
                sortByLang= 'es';
            }
            
        }
        
    }
    
    if(title == '1'){
        subCatName = element.text;
        document.getElementById('topic').innerHTML = subCatName;
        mediaType = document.getElementById('type').innerHTML;
        sortByLang = document.getElementById('language').innerHTML;
        if(sortByLang == ''){
            sortByLang = 'false';
        }
        else
        {
            if(sortByLang=='English')
            {
                sortByLang= 'en';
            }
            if(sortByLang=='Spanish')
            {
                sortByLang= 'es';
            }
            
        }
        
    }
    
    if(id == "language"){
        document.getElementById('language').innerHTML = element;
        sortByLang = title;
        mediaType = document.getElementById('type').innerHTML;
        subCatName = document.getElementById('topic').innerHTML;
        if(sortByLang=='English')
        {
            sortByLang= 'en';
        }
        if(sortByLang=='Spanish')
        {
            sortByLang= 'es';
        }
    }
    
    if(subCatName == 'Topic'){
        subCatName = 'false';
    }
    if(mediaType == 'All'){
        mediaType = 'false';
    }
    if(sortByLang == 'All'){
        sortByLang = 'false';
    }
    
    
    console.log("THIS **FILTERS** " + selectedCategoryId + " " + selectedCategoryName + " " + subCatName + " " + mediaType + " " + sortByDateVal + " " + sortByLang);
    
   // alert(mediaType);
    
    showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,mediaType,sortByDateVal,sortByLang);

}


function sortDate()
{
    
    //alert('sort by date');
    var sortByDateVal ='false';
    var mediaType = 'false';
    var subCatName = 'false';
    
    //  var dateColor = document.getElementById('sortByDate').style.color;
    var subCatName = document.getElementById('topic').innerHTML;
    var mediaType = document.getElementById('type').innerHTML;
    
    if(subCatName == 'Topic'){
        subCatName = 'false';
    }
    if(mediaType == 'All'){
        mediaType = 'false';
    }
    //    if(dateColor == 'black'){
    //        document.getElementById('sortByDate').style.color = 'orange';
    //        sortByDateVal = 'true';
    //    }
    
    console.log('\n\n');
    console.log('selectedCategoryId   :-->'+selectedCategoryId);
    console.log('selectedCategoryName :-->'+selectedCategoryName);
    console.log('subCatName           :-->'+subCatName);
    console.log('mediaType            :-->'+mediaType);
    console.log('sortByDateVal        :-->'+sortByDateVal);
    console.log('\n sort date function');
    
    showSortedTAListing(selectedCategoryId,selectedCategoryName,subCatName,mediaType,sortByDateVal)
    
}

//
//function sortDateSearch()
//{
//
//    var searchDateColor = document.getElementById('sortByDateSearchField').style.color;
//
//    if(searchDateColor = 'black'){
//        document.getElementById('sortByDateSearchField').style.color = 'orange';
//    }
//
//    showSearchResult("prevSearch","All","All");
//}

function sortDateSearch()
{
    
    var searchDateColor = document.getElementById('sortByDateSearchField').style.color;
    
    if(searchDateColor = 'black'){
       document.getElementById('sortByDateSearchField').style.color = 'orange';
    }
    
    console.log('--->>>>> :'+document.getElementById('typeS').innerHTML);
    
    var media = '';
    var testType = document.getElementById('typeS').innerHTML;
    
    if(testType == 'All'){
        media = 'All';
    }else if(testType == 'Audios'){
        media = 'Audios';
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
    
    console.log('11111--->>>>> :'+media);
    
    showSearchResult("prevSearch",media,testType,"null");
}



function changeDropDownSearch(id,title,element)
{
    $("ul.navigation li label").parent().find("ul.submenu").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu1").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu2").slideUp('slow'); //Hiding Submenu when mouseout
    $("ul.navigation li label").parent().find("ul.submenu3").slideUp('slow');
    
    
}

function generateClick(element)

{
    //alert("element"+element);
    
    $('#'+ element).click();
    
    
    
}
