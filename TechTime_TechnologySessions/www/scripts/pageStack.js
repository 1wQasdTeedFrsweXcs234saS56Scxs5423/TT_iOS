function createPageObject(pageId, functionName, parametersArray)
{
    var pageObject = new Object();
    pageObject.pageIndex = jsonData.pageStack.length - 1;
    pageObject.pageId = pageId;
    pageObject.pageFunctionName = functionName;
    pageObject.parametersArray = parametersArray;
    
    return pageObject;
}

function initializePageStackArray()
{
    jsonData.pageStack = [];
    
    var pageObject = new Object();
    pageObject.pageIndex = 0;
    pageObject.pageId = "#businessCategory";
    pageObject.parametersArray = [];
    
    jsonData.pageStack.push(pageObject);
}


function pageStackOperation(operation, pageId, functionName, parametersArray)
{
    if(operation == "push")
    {
        // Page Info Object Generation
        var pageObject = new Object();
        pageObject = createPageObject(pageId, functionName, parametersArray);
        
        // Page Info Object Push To Stack
        jsonData.pageStack.push(pageObject);
    } else if(operation == "pop")
    {
        var indexOfItem = jsonData.pageStack.length - 1;
        
        // Page Info Object Pop from Stack
        jsonData.pageStack.splice(indexOfItem, 1);
        
        // Render the backpage
        var newPageStackLength = jsonData.pageStack.length - 1;
        var pageObject = new Object();
        pageObject = jsonData.pageStack[newPageStackLength];
        
        if(newPageStackLength > 1)
        {
         window[pageObject.pageFunctionName].apply(null, Array.prototype.slice.call(pageObject.parametersArray, 0));
        } else if(newPageStackLength == 1)
        {
            $.mobile.changePage("#businessCategory");
        }
    }
}