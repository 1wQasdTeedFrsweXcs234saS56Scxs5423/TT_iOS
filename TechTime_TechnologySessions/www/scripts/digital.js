// -------------------------- Digital Flags --------------------- //

var isFromDigitalHomePage = false;
var isSpotlightDigital = false;


// -------------------------- Digital Flags --------------------- //


// -------------------------- Load Digital Tab --------------------- //
function loadDigitalTab()
{
    $.each(jsonData.category, function(key, item){
                if((jsonData.digitalAreas.indexOf(item.categoryid) != -1) && (item.subscribe == "yes") && (jsonData.digitalAreas.length != 0) && (jsonData.digitalAreas.length > 0))
                    {
                        $('#digitalAreaHomePageTab').css('display', 'block');
                    }
           });
}

// -------------------------- Load Digital Tab --------------------- //


// -------------------------- Load Digital Contents --------------------- //

function loadDigitalContents()
{
    window.localStorage.setItem("currentPage", "digitalAreaHomePage");
    defaultNavigate();
    // Loads Digital TA's under Digital Tab
    loadSubscribedDigitalAreas();
}

// -------------------------- Load Digital Contents --------------------- //


// -------------------------- Load Subscribed Technology Areas under Digital ------------------------ //

function loadSubscribedDigitalAreas()
{
    var digitalTechnologyAreaHTML = '';
    
    var digitalAreasSorted = [];
    
        $.each(jsonData.digitalAreas, function(key, item){
                $.each(jsonData.category, function(key, itemMain)
                       {
                            if(item == itemMain.categoryid)
                                {
                                    digitalAreasSorted.push(itemMain);
                                }
                       });
           });
    
    
    digitalAreasSorted.sort(function(categoryA, categoryB){
                                return categoryA.weight - categoryB.weight;
                            });
    
    $.each(digitalAreasSorted, function(key, item){
                digitalTechnologyAreaHTML += generateDigitalTechnologyAreaHTML(item.categoryid);
           });
    
    $('#digitalAreaHomePageTechnologyArea').html(digitalTechnologyAreaHTML);
    
    openDigitalTechnologyAreaTab();
    
    areaCounter = 0;
}
var areaCounter = 0;
function generateDigitalTechnologyAreaHTML(areaId)
{
    var strHTMLCategory = '';
    $.each(jsonData.category, function(key, item) {
           
           if(item.subscribe == "yes" && item.categoryid == areaId){
           areaCounter = areaCounter + 1;
           strHTMLCategory = strHTMLCategory + "<div class='dynamicDivList'><a id="+ item.categoryname+" class='anchorCategory' href='#TAListResult' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+");resetSearchBar(currentSearchKey);isFromDigitalHomePage = true;'>";
           strHTMLCategory = strHTMLCategory+ "<div style='color:white;'> "+item.categoryname+"<img src='images/icon_whiteRight.png' style='float:right;height:15px; width:15px;padding-right:12px;' onclick='showTAListResult("+JSON.stringify(item.categoryname)+" , "+JSON.stringify(item.categoryid)+");resetSearchBar(currentSearchKey);isFromDigitalHomePage = true;'/>";
           strHTMLCategory = strHTMLCategory+ "</div></a></div>";
           }
           });
    
    return strHTMLCategory;
}

// -------------------------- Load Subscribed Technology Areas under Digital ------------------------ //


function openDigitalTechnologyAreaTab()
{
    $('#digitalTechAreaArrow').html("<img src='images/icon_whiteDown.png' style='float:right;height:15px;width:15px;padding-right:15px;'/>");
    $('#digitalAreaHomePageTechnologyArea').css('display', 'block');
}