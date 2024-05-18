const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        video.srcObject = stream;
        video.play();

        // Attendre que la vidéo commence à jouer pour obtenir la taille
        video.addEventListener('loadedmetadata', () => {
            // Définir la taille du canvas selon la taille de la vidéo
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });
    });
}

document.getElementById('snap').addEventListener('click', () => {
    // Dessiner l'image de la vidéo sur le canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir l'image du canvas en blob
    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('photo', blob, 'photo.png');

        // Envoyer l'image au serveur
        //fetch('http://localhost:3000/summarize/picture', {
        fetch('http://localhost:3000/summarize/picture', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            const converter = new showdown.Converter();
            document.getElementById('reponse').innerHTML = converter.makeHtml(data.summary);
        })
        .catch(error => console.error('Error:', error));
    }, 'image/png');
});
