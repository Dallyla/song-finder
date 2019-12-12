let term = ''
const songContainer = document.getElementById('songs')    //DOM manipulation, armazena o container 'songs'


const updateTerm = () => { //função que vai atualizar o termo de bucana query sempre que for feita nova pesquisa na barra de pesquisa
    term = document.getElementById('searchInput').value;
    
    if(!term || term === '') { //verifica se o usuário de fato digitou algo na busca
        alert('please enter a search term')
    } else { // se sim

        while(songContainer.firstChild) { //faz um loop no container checa se o container tem algum elemento filho
            songContainer.removeChild(songContainer.firstChild); //remove o filho do container
        }

        const url = `https://itunes.apple.com/search?limit=10&media=music&term=${term}`;
        fetch(url) //fetch é pesquisa/consulta 
        .then((response) => response.json())  //response da promise
            // .json extrai a response no formato json
            //quando a arrow function tem apenas um statement pode remover as {} e o termo return
        .then((data) => {  //data é json retornado na função anterior
            // console.log(data.results);    
            const artists = data.results;                           //cria uma const artists que armazena os resultados do json
            return artists.map(result => {             //o .then vai retornar um array .map que vai passar um loop em cada elemento dos resultados armazenados em artists
                const article = document.createElement('article'),         //cria o wrapper 'article'
                    artist = document.createElement('p'),                  //cria o elemento p artist
                    song = document.createElement('p'),                    //cria o elemento p song
                    imag = document.createElement('img'),                  //cria o elemnto img imag
                    audio = document.createElement('audio'),               //cria o elemento audio audio
                    audioSource = document.createElement('source')         //cria o elemento source audioSource
                    
                    artist.innerHTML = result.artistName       //substitui o conteúdo do elemento artist no index com o parâmetro artistName do json result
                    song.innerHTML = result.trackName          //substitui o conteúdo do elemento song no index com o parâmetro trackName do json result
                    imag.src = result.artworkUrl100            //atribui o conteúdo do atributo src do elemento imag no index com o parâmetro artworkUrl100  do json result
                    audioSource.src = result.previewUrl        //atribui o conteúdo do atributo src do elemento audioSource no index com o parâmetro previewUrl   do json result
                    audio.setAttribute('controls', '')         //cria os controles do player das músicas

                    article.appendChild(imag)                  //aninhamento dos elementos
                    article.appendChild(artist)
                    article.appendChild(song)
                    article.appendChild(audio)
                    audio.appendChild(audioSource)
                    songContainer.appendChild(article)
            })
        })
        .catch(error => console.log('Request failed: ', error)); //caso a request retorne algum erro, catch pega o erro
            }
        }   

        //event listener, vai ser o trigger pra disparar a query
        const searchBtn = document.querySelector('button')
        searchBtn.addEventListener('click', updateTerm)

        document.addEventListener('play', event => { //o play é o trigger da função
            const audio = document.getElementsByTagName('audio'); //armazena todos os audio players
            for(let i = 0; i < audio.length; i++) { //loop que varre todos os players e checa se existe algum já tocando
                if(audio[i] != event.target) { //verifica se o audio[i] é diferente do audio que está sendo tocado (event.target)
                    audio[i].pause(); //pausa todos os áudios que não seja aquele que esteja tocando

                } 
            }
        }, true) //true seta o event listener para a capture fase , false, que é o padrão seta pra bubblling


