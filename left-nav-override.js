console.log("QuickLaunch navigation dropdowns provisioning.")
_spBodyOnLoadFunctionNames.push("skinClassicQL");
 console.log("QuickLaunch override loaded.")

function skinClassicQL(){
  //start out with the skinned menu
  function basicStyle() {
    $("div[id^=zz][id$=_V4QuickLaunchMenu]").addClass("base");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] li").addClass("baseBorder");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] span").addClass("baseText");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] ul li").has('ul').addClass('Office365Icon');
    $("[id^=zz][id$=_RootAspMenu] li").children('ul').hide();
  }

     //function toggles menu
  function openClose(e) {
    $(this).children('ul').slideToggle(300).removeClass("baseText").addClass("subMenu subMenuText");
    $(this).siblings('li').children('ul').hide();
    console.log(e + "You activated the toggle.");
  }

//function stores target URL when navigating to new page, and restores state after navigation
function storeUrl(e) {
  console.log(this.getAttribute("href") + " Logging the current navigation URL.");
  if (e) {
    localStorage.setItem('selectedItem', this.getAttribute("href"));
    console.log("Local storage value for selectedItem is: " + localStorage.getItem('selectedItem'));
  }
}
 
 //if localStorage is !null, open the drawer containing its anchor plus highlight the anchor
 function selectedStyle() {
  if(window.location.href.indexOf(localStorage.getItem('selectedItem')) > -1) {
    $("[id^=zz][id$=_RootAspMenu] li").children('ul').slideToggle(300).removeClass("baseText").addClass("subMenu subMenuText"); 
    $("[id^=zz][id$=_RootAspMenu] li").siblings('li').children('ul').hide();
    $("[id^=zz][id$=_RootAspMenu] span").addClass("subMenuSelected"); 
  }
  else {
    console.log("The target value is empty.");
  }  
}  

basicStyle();
selectedStyle();
$("[id^=zz][id$=_RootAspMenu] li").on("click", openClose);
$("[id^=zz][id$=_RootAspMenu]").on("click", "a", storeUrl);

  //Hide the ability to modify QL navigation
$("span[id^=zz][id$=_V4QuickLaunchMenu_NavMenu_Edit]").hide();
}