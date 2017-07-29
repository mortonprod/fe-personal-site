echo 'importScripts("/partialServiceWorker.js");' > /tmp/newfile
cat ./build/service-worker.js >> /tmp/newfile
cp /tmp/newfile ./build/service-worker.js
