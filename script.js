let player;
let videoList = [];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',  // Não mostrar o vídeo, apenas o áudio
        width: '0',
        videoId: '',
        playerVars: {
            autoplay: 1,  // Auto play
            controls: 0,  // Não exibir controles
            modestbranding: 1,  // Sem logotipo do YouTube
            rel: 0,  // Não mostrar vídeos relacionados
            showinfo: 0,  // Não mostrar informações do vídeo
            iv_load_policy: 3  // Não exibir anotações
        }
    });
}

function searchMusic() {
    const query = document.getElementById('searchQuery').value;
    const apiKey = 'CHAVE_API_GOOGLECLOUDS';  // Substitua pela sua chave de API
    
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                videoList = data.items.map(item => {
                    return {
                        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
                    };
                });
                displayVideoLinks();
            } else {
                console.error('Nenhum vídeo encontrado');
            }
        })
        .catch(error => console.error('Erro na busca:', error));
}

function displayVideoLinks() {
    const videoContainer = document.getElementById('video-list');
    videoContainer.innerHTML = '';  // Limpar os links anteriores

    videoList.forEach(video => {
        const link = document.createElement('a');
        link.href = video.url;
        link.textContent = video.url;  // Exibe apenas a URL
        link.target = '_blank';  // Para abrir o link em uma nova aba
        link.onclick = (event) => {
            event.preventDefault();  // Previne o comportamento padrão de abrir o link
            playAudio(video.url);
        };
        videoContainer.appendChild(link);
    });
}

function playAudio(videoUrl) {
    const videoId = videoUrl.split('v=')[1];  // Extraímos o ID do vídeo da URL
    // Carregar o áudio do vídeo
    player.loadVideoById(videoId);
}
