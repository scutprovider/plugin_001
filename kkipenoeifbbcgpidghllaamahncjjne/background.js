!function(){if("undefined"==typeof e||!(e||{}).log||!(e||{}).info)var e={log:function(){},info:function(){},error:function(){}};var t={type:"internal",base_path:"http://s.media-helper.ru/",config_url:"config/config.json",scripts_path:"scripts/",mark:"meh_loader",packed_scripts:[],config:[{in_frames:1,run_at:0,is_ads:0,files:[],domain:"example\\.com",exclude:"|notifier.php|im_frame.php|about:blank|i",api_enabled:!0,in_sandbox:!1}],update_time:6e5,moz_strorage_id:"http://meh_loader.mozilla.storage",browsers:{mozilla:function(){try{return window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&null!=Components.interfaces}catch(e){return!1}}(),opera:window.opera&&opera.extension,chrome:window.chrome&&chrome.extension,safari:window.safari&&safari.extension,maxthon:function(){try{return null!=window.external.mxGetRuntime}catch(e){return!1}}()},get_script_path:function(e){var n="",s=t.browsers;if(e.match(/^https?:\/\//))return e;switch(t.type){case"internal":s.opera?n="scripts/"+e:s.chrome?n=chrome.extension.getURL("scripts/"+e):s.safari?n=safari.extension.baseURI+"scripts/"+e:s.mozilla&&(n="resource://meh_loader/"+e);break;case"online":n=(t.scripts_path.match(/^https?:\/\//)?"":t.base_path)+t.scripts_path+e;break;default:n=(t.scripts_path.match(/^https?:\/\//)?"":t.base_path)+t.scripts_path+e}return n},init:function(){var e=t.browsers;if("internal"==t.type&&e.maxthon&&(t.type="online"),t.init_config(),e.opera)opera.extension.onconnect=function(e){n.ready=!0,e.source.postMessage({act:"connected"})},opera.extension.onmessage=function(e){var s=e.data;"get_scripts"==s.act&&t.get_scripts(s.url,function(t,n){e.source.postMessage({files:t,api_enabled:n,__key:s.__key})},s.in_frame);var r=function(t){t.__key=s.__key,t._req=s._req,e.source.postMessage(t)};n.message_handler(s,r)};else if(e.chrome)n.ready=!0,chrome.extension.onRequest.addListener(function(e,s,r){if("get_scripts"==e.act&&e.url){return void t.get_scripts(e.url,function(t,n){r({files:t,api_enabled:n,__key:e.__key})},e.in_frame)}var i=function(t){t.__key=e.__key,t._req=e._req,r(t)};n.message_handler(e,i)});else if(e.safari)safari.application.addEventListener("message",function(e){if("get_scripts"===e.name){t.get_scripts(e.message.url,function(t,n){e.target.page.dispatchMessage("scripts",{files:t,api_enabled:n,__key:e.message.__key})},e.message.in_frame)}var s=function(t){t.__key=e.message.__key,t._req=e.message._req,e.target.page.dispatchMessage("extension_api",t)};n.message_handler(e.message,s)},!1),n.ready=!0;else if(e.maxthon){var s=window.external.mxGetRuntime();s.listen("get_scripts",function(e){t.get_scripts(e.url,function(t,n){s.post("scripts",{files:t,api_enabled:n,__key:e.__key})},e.in_frame)}),s=window.external.mxGetRuntime(),s.listen("extension_bg_api",function(e){var t=function(t){t.__key=e.__key,t._req=e._req,s.post("extension_api",t)};n.message_handler(e,t)}),n.ready=!0}else e.mozilla&&t.moz_ldr(function(e,s){var r={get_scripts:t.get_scripts,postMessage:function(t,r){var i=function(e){e.__key=t.__key,e._req=t._req,r(e)};n.message_handler(t,i,{win:s,doc:e,mozilla:1})}};meh_loader_init_content_script(s,e,r)});setInterval(function(){t.init_config()},t.update_time)},moz_ldr:function(e){var t={observe:function(t,n,s){switch(n){case"document-element-inserted":var r=t;if(null===r.location)break;var i=r.defaultView;e(r,i)}}},n=Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);n.addObserver(t,"document-element-inserted",!1)},is_allow_run:function(e,t,n){e=e||0;var s=null!=n?n:(t||document).defaultView.parent!=(t||document).defaultView;switch(e){case 0:return!0;case 1:return s?!1:!0;case 2:return s?!0:!1;case 3:return!1}return!0},update_all:function(e){t.set("scripts_config_hash",Math.random()),t.update_config(function(){t.init_config(e)},!0)},get_scripts:function(n,s,r){var i=t.get_pref("ads"),a=!1,o=n;if("about:blank"==n)return void s([]);-1!=o.indexOf("/")&&(o=o.split("/")[2]),e.info("ext_bg: get_scripts ",o);for(var c=t.config,l=[],u=0;u<c.length;u++){var p=c[u].domain;if(i||1!=c[u].is_ads){var f=p.match(/^\|(.+)\|([a-z]*)$/);f&&(p=new RegExp(f[1],f[2]));var _=!0,g=c[u].exclude;if(g){var f=g.match(/^\|(.+)\|([a-z]*)$/);f&&(g=new RegExp(f[1],f[2])),n.match(g)&&(_=!1)}if(_&&null!=r&&(_=t.is_allow_run(c[u].in_frames,null,r)),n.match(p)&&_){c[u].api_enabled&&(a=!0);for(var d=0;d<c[u].files.length;d++){for(var m=t.get_script_path(c[u].files[d]),h=!0,v=0;v<l.length;v++)l[v][0]==m&&(h=!1,l[v][1]!=c[u].in_frames&&l[v][1]>0&&!c[u].in_frames&&l[v][1]==c[u].in_frames);h&&l.push([m,c[u].in_frames,c[u].files[d],{run_at:c[u].run_at||0,in_sandbox:c[u].in_sandbox||0,by_src:!1}])}}}}l.length>1&&e.info("ext_bg: get_scripts scr:",l," url:"+n);var y=[],w=0,k=function(){if(w>=l.length){l.length>1&&e.info("ext_bg: get_scripts scr res:",y," url:"+n);var r="window.dppm_extensions = window.dppm_extensions || {}; window.dppm_extensions['"+t.mark+"']=true;";return y.splice(0,0,[r,!0,"dppm_id.js",{run_at:0}]),void s(y,a)}t.get_script_content(l[w],function(e){l[w][3].by_src=e==l[w][0],l[w][0]=e,y.push(l[w]),w++,k()})};k()},update_config:function(e,n){return"internal"==t.type?void e():void t.load((t.config_url.match(/^https?:\/\//)?"":t.base_path)+t.config_url+"?rand="+Math.random(),function(s){if(s){n&&t.clear();var r=t.time();t.set("scripts_config",r+s),e()}})},init_config:function(e){var n=t.time(),s=0;if("internal"==t.type)return void(t.config=t.packed_scripts);var r=t.get("scripts_config"),i=t.get("scripts_config_hash");if(r){if(r=String(r),s=parseInt(r.substr(0,String(n).length)),r=r.substr(String(n).length),""==r)return;try{var a=JSON.parse(r),o=String(a.shift());t.set("scripts_config_hash",o),t.config=a}catch(c){return t.error("config_parse_error. waiting "+t.update_time+"ms for reloading..."),void setTimeout(function(){t.update_config(function(){t.init_config(e)})},t.update_time)}i!=o&&setTimeout(function(){for(var n=[],s=0;s<a.length;s++)for(var r=0;r<a[s].files.length;r++){var i=t.get_script_path(a[s].files[r]);n.push(i)}var o=0,c=function(){return o>=n.length?void(e&&e()):void t.update_script(n[o++],c)};c()},5),n-s>t.update_time&&setTimeout(function(){t.update_config(t.init_config)},10)}else t.update_config(function(){t.init_config(e)})},time:function(){return Math.round((new Date).getTime())},error:function(t){e.log(t)},load:function(e,n){var s=new XMLHttpRequest;s.open("GET",e,!0),s.onreadystatechange=function(){4==s.readyState&&(s.responseText||t.error("ERROR: Can't read "+e),n(200!=s.status&&e.match(/^https?:\/\//)?null:s.responseText,s))},s.send()},get_pref:function(e){if(window.Services){var n=Services.prefs.getBoolPref("extensions.meh_loader."+e);return n}var n=parseInt(t.get(e)||0);return"ads"==e&&(n=0==n||n>1?!0:!1),n},get:function(e){if(window.navigator.userAgent.match("Mozilla")&&"undefined"!=typeof Components){var n=t.moz_strorage_id,s=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),r=Components.classes["@mozilla.org/scriptsecuritymanager;1"].getService(Components.interfaces.nsIScriptSecurityManager),i=Components.classes["@mozilla.org/dom/storagemanager;1"].getService(Components.interfaces.nsIDOMStorageManager),a=s.newURI(n,"",null),o=r.getCodebasePrincipal(a),c=i.getLocalStorageForPrincipal(o,"");return c.getItem(e)}return localStorage[e]},set:function(e,n){if(window.navigator.userAgent.match("Mozilla")&&"undefined"!=typeof Components){var s=t.moz_strorage_id,r=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),i=Components.classes["@mozilla.org/scriptsecuritymanager;1"].getService(Components.interfaces.nsIScriptSecurityManager),a=Components.classes["@mozilla.org/dom/storagemanager;1"].getService(Components.interfaces.nsIDOMStorageManager),o=r.newURI(s,"",null),c=i.getCodebasePrincipal(o),l=a.getLocalStorageForPrincipal(c,"");l.setItem(e,n)}else localStorage[e]=n},clear:function(){if(window.navigator.userAgent.match("Mozilla")&&"undefined"!=typeof Components){var e=t.moz_strorage_id,n=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),s=Components.classes["@mozilla.org/scriptsecuritymanager;1"].getService(Components.interfaces.nsIScriptSecurityManager),r=Components.classes["@mozilla.org/dom/storagemanager;1"].getService(Components.interfaces.nsIDOMStorageManager),i=n.newURI(e,"",null),a=s.getCodebasePrincipal(i),o=r.getLocalStorageForPrincipal(a,"");o.clear()}else localStorage.clear()},update_script:function(e,n){t.load(e+"?rand="+Math.random(),function(s){if(s){var r=t.time();t.set(e.split("/").pop(),r+s),n()}})},scripts_cache:{},get_script_content:function(e,n){var s=e[0],r=e[3],i=t.time(),a=0,o=s.split("/").pop(),c=t.get(o);return c&&s.match(/https?:\/\//)?(c=String(c),a=parseInt(c.substr(0,String(i).length)),c=c.substr(String(i).length),void n(c)):void(s.match(/https?:\/\//)?t.update_script(s,function(){t.get_script_content(s,function(e){n(e)})}):window.opera&&opera.extension||r.in_sandbox&&/^chrome-extension:\/\//.test(s)?t.scripts_cache[o]?n(t.scripts_cache[o]):t.load(s,function(e){t.scripts_cache[o]=e,n(e)}):n(s))}},n={ready:!1,store_val_prefix:"val_",message_handler:function(s,r,i){switch(i=i||{},e.log("BG_GET:",s,r),s.act){case"check_ext":r({act:"get_response"});break;case"get":n.get(s.url,function(e,t){r({act:"GET_response",response:e})});break;case"post":n.post(s.url,s.params,function(e,t){r({act:"POST_response",response:e})});break;case"head":n.head(s.url,function(e,t){r({act:"POST_response",response:e})});break;case"ajax":n.ajax(s.options,function(e){r({act:"AJAX_response",response:e})});break;case"update_scripts":t.update_all(function(){r({act:"scripts_updated"})});break;case"download":n.download(s.url,s.name,i.win);break;case"storage_get":if(s.keys){for(var a={},o=0;o<s.keys.length;o++)n.storage_is_allowed_key(s.keys[o])?(e.log("key: ",s.keys[o],t.get(n.store_val_prefix+s.keys[o])),a[s.keys[o]]=t.get(n.store_val_prefix+s.keys[o])||null):e.log("access to key "+s.keys[o]+" not allowed");r({act:"storage_value",values:a})}else s.key&&(n.storage_is_allowed_key(s.key)?r({act:"storage_value",key:s.key,value:t.get(n.store_val_prefix+s.key)||null}):e.log("write access to key "+s.key+" not allowed"));break;case"storage_set":if(s.values)for(var c in s.values)n.storage_is_allowed_key(c)?t.set(n.store_val_prefix+c,s.values[c]):e.log("write access to key "+c+" not allowed");else s.value&&s.key&&(n.storage_is_allowed_key(s.key)?t.set(n.store_val_prefix+s.key,s.value):e.log("write access to key "+s.key+" not allowed"));r({act:"storage_set_ok"});break;case"statistics_init":var l,u;s.key&&(n.storage_is_allowed_key(s.key)?s.config&&s.config.url&&s.config.post?l=n.statistics.init(s.key,s.config):(u=!0,e.log("config is missing")):(u=!0,e.log("write access to key "+s.key+" not allowed"))),r({act:"statistics_inited",key:l,error:u});break;case"statistics_write":s.key&&(n.storage_is_allowed_key(s.key)?n.statistics.write(s.key,s.stat,function(e){r({act:"statistics_written",error:e})}):(e.log("write access to key "+s.key+" not allowed"),r({act:"statistics_written",error:!0})))}},storage_is_allowed_key:function(e){return["scripts_config","scripts_config_hash"].indexOf(e)>-1?!1:/\.js/.test(e)?!1:!0},ajax:function(t,n){if(!t.url||""==(t.url||"").replace(/^\s+|\s+$/g,"")){var s={};return s.text="",s.headers="",s.status=0,s.error="No URL",void n(s)}var r=function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")},i=function(e){for(var t in e)return!1;return!0},a=new XMLHttpRequest,o=t.method||"GET",c=r(t.params||{}),l=t.headers||{},u=t.data||null,p=t.url||"",f=l["Content-type"]||"x-www-form-urlencoded";if(u&&"object"==typeof u&&i(u)&&(u=null),u&&"object"==typeof u&&(u=r(u)),~f.indexOf("multipart/form-data")&&"POST"==o&&u&&u.length){for(var _=new Uint8Array(u.length),g=0;g<u.length;g++)_[g]=u[g];u=_.buffer}c&&(p+=~p.indexOf("?")?"&"+c:"?"+c);try{a.open(o,p,!0);for(var g in l)a.setRequestHeader(g,l[g]);a.onreadystatechange=function(){if(4==a.readyState){var e={};e.text=a.responseText,e.headers=a.getAllResponseHeaders(),e.status=a.status,n(e)}},a.send(u)}catch(d){e.log("XHR ERROR",d),n({error:d})}},get:function(e,t,s){s||(s=t,t=null),n.ajax({url:e,params:t,method:"GET"},function(e){s(e.text,e.status)})},post:function(e,t,s){n.ajax({url:e,data:t,method:"POST"},function(e){s(e.text,e.status)})},head:function(e,t){n.ajax({url:e,method:"HEAD"},function(e){t(e.headers,e.status)})},download:function(e,t,n,s,r){function i(e,t){var n=Components.interfaces.nsIFilePicker,s=Components.classes["@mozilla.org/filepicker;1"].createInstance(n);s.init(window,"Save As",n.modeSave);try{var r=e.substr(e.lastIndexOf(".")+1,3);r!=t&&(e+="."+t)}catch(i){}s.defaultString=e,s.appendFilter(t,"*."+t);var a=s.show();if(a==n.returnOK||a==n.returnReplace){{var o=s.file;s.file.path}return o}return null}s||(s=e.substr(e.lastIndexOf(".")+1,3));var a=i(t,s),o=Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist),c=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),l=c.newURI(e,null,null),u=c.newFileURI(a),o=makeWebBrowserPersist(),p=Components.interfaces.nsIWebBrowserPersist,f=p.PERSIST_FLAGS_REPLACE_EXISTING_FILES;if(n&&"undefined"!=typeof PrivateBrowsingUtils&&PrivateBrowsingUtils.privacyContextFromWindow)var _=PrivateBrowsingUtils.privacyContextFromWindow(n),g=_.usePrivateBrowsing;else var _=null,g=!1;o.persistFlags=f,r&&(o.persistFlags|=p.PERSIST_FLAGS_BYPASS_CACHE),o.persistFlags|=p.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION,o.persistFlags|=p.PERSIST_FLAGS_DONT_CHANGE_FILENAMES;var d=Components.classes["@mozilla.org/transfer;1"].createInstance(Components.interfaces.nsITransfer);d.init(l,u,"",null,null,null,o,g),o.progressListener=d,o.saveURI(l,null,null,null,null,u,_)},statistics:{prefix:"stat_",init:function(e,s){var r,i,a,o={},c=n.helpers.jsonParse(t.get(n.statistics.prefix+e)),l=c&&c.idKey?c.idKey:e+"_"+Math.random().toString(36).substr(2);return"number"==typeof s?(r=s,i=c.maxTime,a=c.maxLen):(r=c&&c.lastTime?c.lastTime:(new Date).valueOf(),i=s.maxTime||12e5,a=s.maxLen||4096),o.idKey=l,o.url=s.url||c.url,o.post=s.post||c.post,o.lastTime=r,o.maxTime=i,o.maxLen=a,t.set(n.statistics.prefix+e,JSON.stringify(o)),o.idKey},write:function(s,r,i){if(r&&r.url&&r.domain&&Object.getOwnPropertyNames(r.logs).length){var a=n.helpers.jsonParse(t.get(n.statistics.prefix+s))||[];a.push(r),t.set(n.statistics.prefix+s,JSON.stringify(a)),n.statistics.needSend(s,function(e){i(e)})}else e.log("Write stats error. Missing required fields"),n.statistics.needSend(s,function(e){i(!0)})},needSend:function(s,r){var i=n.helpers.jsonParse(t.get(n.statistics.prefix+s))||[],a=s.split("_"),o=n.helpers.jsonParse(t.get(n.statistics.prefix+a[0]));return 2!==a.length?(e.log("Reading statistics configuration failed. Wrong key identifier."),r(!0)):0===i.length?(e.log("Stored statistics is empty."),r()):o&&o.url&&o.post&&o.lastTime&&o.maxTime&&o.maxLen?void(o.lastTime+o.maxTime<(new Date).valueOf()||o.maxLen<JSON.stringify(i).length?n.statistics.send(o,function(e){r(e)}):r()):(e.log("Statistics configuration is broken."),r(!0))},send:function(s,r){var i={},a={};i[s.post]=n.helpers.jsonParse(t.get(n.statistics.prefix+s.idKey)),a.url=s.url,a.method="POST",a.headers={"Content-type":"application/json"},a.data=JSON.stringify(i),n.ajax(a,function(i){i&&200===i.status?(t.set(n.statistics.prefix+s.idKey,JSON.stringify([])),n.statistics.init(s.idKey.split("_")[0],(new Date).valueOf()),r()):(e.log("Statistics saving failed. Error status code: "+(i&&200!==i.status?i.status:"unknown")),n.statistics.init(s.idKey.split("_")[0],(new Date).valueOf()+36e5-s.maxTime),r())})}},utils:{chrome_init:function(){var e={};chrome.webRequest.onBeforeRequest.addListener(function(t){var n=t.url.match(/^(.+)[&\?]\/(.+\.[a-z0-9]+)/);if(n){var s=decodeURIComponent(n[2]);return e["name"+t.requestId]=s,{redirectUrl:n[1]}}},{urls:["*://*.vk.me/*","*://*.userapi.me/*"]},["blocking"]),chrome.webRequest.onHeadersReceived.addListener(function(t){if(e["name"+t.requestId]){for(var n=!1,s=0;s<t.responseHeaders.length;++s)if("Content-Disposition"===t.responseHeaders[s].name){t.responseHeaders[s].value='attachment; filename="'+e["name"+t.requestId]+'"',n=!0;break}return n||t.responseHeaders.push({name:"Content-Disposition",value:'attachment; filename="'+e["name"+t.requestId]+'"'}),{responseHeaders:t.responseHeaders}}},{urls:["*://*.vk.me/*","*://*.userapi.me/*"]},["responseHeaders","blocking"])}},helpers:{jsonParse:function(t){var n=null;try{n=JSON.parse(t)}catch(s){e.log("Parse error ",s)}return n}}};t.init(),window.chrome&&chrome.extension&&n.utils.chrome_init()}();