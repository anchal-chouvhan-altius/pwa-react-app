export default function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}\sw.js`).then(function (register) {
            console.log("It worked for me");
        }).catch(function (err) {
            console.log("Error", err)
        })
    }
}