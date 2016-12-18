// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET','https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form');
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    renderAllHtml(ourData);
    document.querySelector("#onlineBtn").addEventListener("click",function(){
      renderOnlineHtml(ourData);
    });
    
    document.querySelector("#offlineBtn").addEventListener("click",function(){
      renderOfflineHtml(ourData);
    });
    
    document.querySelector("#allBtn").addEventListener("click",function(){
      renderAllHtml(ourData);
    });
  };
  ourRequest.send();
});


function renderAllHtml(ourData){
  document.querySelector("#users-container").innerHTML ="";
  for(i=0;i<ourData.length;i++){
    if(ourData[i].error =="Not Found"){  //error in loading page
    }
   
    else if(ourData[i].stream === null){    // Stream is offline
      document.querySelector("#users-container").innerHTML +=  '<div id="row">'+ourData[i].display_name+'</div>';
      document.querySelector("#users-container").innerHTML += '<span id="connection"> offline</span>';
      }
    else{  //Stream is online
      document.querySelector("#users-container").innerHTML += '<a href='+ourData[i].stream.url +' target=_blank><div id="row">'+ourData[i].stream.display_name+'    '+'</a><span>'+ourData[i].stream.status+'</span></div>';
      document.querySelector("#users-container").innerHTML += '<span id="connection">online</span>';
      }
  }
}
    function renderOnlineHtml(ourData){
      document.querySelector("#users-container").innerHTML ="";
      for(i=0;i<ourData.length;i++){
        if(ourData[i].error !="Not Found" && ourData[i].stream !== null)
          {  //Stream is online
          document.querySelector("#users-container").innerHTML += '<a href='+ourData[i].stream.url +' target=_blank> <div id="row">'+ourData[i].stream.display_name+'    '+'</a><span>'+ourData[i].stream.status+'</span></div>';
          document.querySelector("#users-container").innerHTML += '<span id="connection">online</span>';
          }
      }
    }
    
    
    function renderOfflineHtml(ourData){
      document.querySelector("#users-container").innerHTML ="";
        for(i=0;i<ourData.length;i++){
          if(ourData[i].stream === null)
            {    //Stream is offline
            document.querySelector("#users-container").innerHTML += '<div id="row">'+ourData[i].display_name+'</div>';
            document.querySelector("#users-container").innerHTML += '<span id="connection"> offline</span>';
            }
        }
    }
    
    
    
    
    
    
