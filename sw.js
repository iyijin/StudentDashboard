const CACHE_NAME =  "student-pwa-v1";
const FILES_TO_CACHE = [
    "./",
    "./index.html",  
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./offline.html"
];
//install 
self.addEventListener("install",function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});
//ACTIVATE
self.addEventListener("activate",function(event){
    event.waitUntil(
        self.clients.claim()
    );
});
//FETCH
self.addEventListener("fetch",function(event){
    if(event.request.mode==="navigate"){
        event.respondWith(
            fetch(event.request)
            .catch(function(){
                return caches.match(
                    "./offline.html"
                );
            })
        );
        return;
    }
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            return response || fetch(event.request);
        })
    );
});
