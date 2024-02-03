//inserisco tutto in una funzione per verifivcare un corretto caricamento della pagina
document.addEventListener("DOMContentLoaded", function () {
    // funzioe per prendere le informazioni sugli artisti 
    function loadArtistContent(artistName, sectionId) {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`)
            .then(response => response.json())
            .then(data => {
                const songs = data.data;
                const section = document.getElementById(sectionId);
                section.innerHTML = '';//svuoto il div per prepararlo agli elementi in arrivo
                //itero le canzoni e creo la card cointenitiva
                songs.forEach(song => {
                    const songElement = `
                            <div class="col-6 col-md-4 col-lg-3 mb-4">
                                <div class="card text-white bg-dark">
                                    <img src="${song.album.cover_medium}" class="card-img" alt="${song.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${song.title}</h5>
                                        <p class="card-text">${song.artist.name}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        //adessso riempio il div
                    section.innerHTML += songElement;
                });
            })
            .catch(error => {
                console.error(`Error loading content for ${artistName}:`, error);
            });
    }
    //richiamo la funzione per ogni artista
    loadArtistContent('eminem', 'eminemSection');
    loadArtistContent('metallica', 'metallicaSection');
    loadArtistContent('queen', 'queenSection');
});