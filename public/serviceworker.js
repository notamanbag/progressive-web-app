 const CACHE_NAME =  "version 1";
 const urlsToCache = ['index.html', 'offline.html'];

 //Install  SW
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log("open cache");
            return cache.addAll(urlsToCache);

        })
    )

});


 //Listen for request
 self.addEventListener('fetch',(event)=>{
     event.respondWith(
         caches.match(event.request).
         then(()=>{
             return fetch(event.request)
                .catch(()=> caches.match('offline.html'))
             ;
         })
     )

});



 //Activate the SW
 self.addEventListener('activate',(event)=>{

    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cachesnames)=>Promise.all(
            cachesnames.map((cachename)=>{
                if(!cacheWhiteList.includes(cachename) ){
                     return caches.delete(cachename); 
                }
            })
        ))
    )

});
