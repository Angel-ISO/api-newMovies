let movie= "superman"
let search = document.querySelector("#search");
search.addEventListener("click", getMovie)
search.addEventListener("input", (e)=>{
    movie = e.target.value;
    if(movie === ""){
        movie = "superman"
    }
    getMovie();
})
document.addEventListener("DOMContentLoaded", getMovie)
function getMovie(){
    let url = `http://www.omdbapi.com/?apikey=f4b0e8bf&s=${movie}`
    fetch(url)
    .then(result =>{
        console.log(result);
        return result.json()
    })
    .then(date=>{
        console.log(date);
        printHTML(date.Search)
    })
}
function printHTML(cards){
    
    let contenido = document.querySelector("#cards")
    let plantilla = ""
    cards.forEach(card=>{
        let {Title, Year, imdbID, Type, Poster, BoxOffice="N/A", imdbVotes="N/A"} = card;
        plantilla +=`
    <div class="card bg-dark" style="width: 18rem;">
        <img src="${Poster}" class="card-img-top" alt="...">
    <div class="card-body bg-dark">
            <h5 class="card-title" style="color:white;">${Title}</h5>
            <p>Pelicula</p>
    </div>
    <ul class="list-group list-group-flush bg-dark">
        <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Type: ${Type}</li>
        <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Year: ${Year}</li>
        <li class="list-group-item bg-dark" style="border-color:transparent; color:white;">Taquilla: ${BoxOffice ? BoxOffice : 'No disponible'}</li>
        <button class="btn btn-primary btnDetalle" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" img="${Poster}" titulo="${Title}" year="${Year}" id="${imdbID}" tipo="${Type}"  votos="${imdbVotes}" >Mas Info</button>
      
     </ul>
    </div>
        `
    })  
    contenido.innerHTML = plantilla

    contenido.addEventListener('click', (e) => {
        let htmlTitle = '';
        let htmlModal = '';
        let htmlTable = '';
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');
  
        const btnDetalle = e.target.classList[2];
        if (btnDetalle == 'btnDetalle') {
          const img = e.target.getAttribute("img");
          const titulo = e.target.getAttribute("titulo");
          const year = e.target.getAttribute("year");
          const id = e.target.getAttribute("id");
          const BoxOffice = e.target.getAttribute("taquilla")
          const imdbVotes = e.target.getAttribute("votos")
          const type = e.target.getAttribute("tipo");
          htmlModal += `
          <img src="${img}">
          <table class="table text-light">
                  <thead>
                    <tr>
                      <th scope="col">Pelicula</th>
                      <th scope="col">Año</th>
                      <th scope="col">Id</th>
                      <th scope="col">ventas de taquilla</th>
                      <th scope="col">votos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${titulo}</td>
                      <td>${year}</td>
                      <td>${id}</td>
                      <td>${BoxOffice}<td>
                      <td>${imdbVotes}</td>
                    </tr>
                   
                  </tbody>
                </table>
          `
          htmlTitle += `${titulo}`
          modalBody.innerHTML = htmlModal + htmlTable;
          modalTitle.innerHTML = htmlTitle;
  
        } 
       
      })
}




// apartado por fecha

const fetchMoviesByYear = async (Year, apiKey) => {
  const url = `http://www.omdbapi.com/?s=&y=${Year}&plot=full&type=movie&r=json&page=1&apikey=${apiKey}&v=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudieron cargar las películas.");
  }
};

const form = document.querySelector('.fecha');
const moviesContainer = document.querySelector('#movies');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const year = document.querySelector('#year').value;
  const apiKey = 'f4b0e8bf';
  const movies = await fetchMoviesByYear(year, apiKey);
  moviesContainer.innerHTML = '';

  if (movies.Response === 'False') {
    moviesContainer.innerHTML = '<p>No se encontraron películas para esta búsqueda.</p>';
  } else {
    const movieItems = movies.Search.map(movie => `
      <div>
        <h2>${movie.Title}</h2>
        <p>Año: ${movie.Year}</p>
        <p>Tipo: ${movie.Type}</p>
      </div>
    `);
    moviesContainer.innerHTML = movieItems.join('');
  }
});

//apartado por taquilla y votos

const searchButton = document.querySelector('#search-button');
const sortByBoxOfficeButton = document.querySelector('#sort-by-box-office-button');
const sortByVotesButton = document.querySelector('#sort-by-votes-button');
let Movie = '';

searchButton.addEventListener('click', () => {
  Movie = document.querySelector('#search-input').value;
  getMovies();
});

sortByBoxOfficeButton.addEventListener('click', () => {
  getMovies({ sortBy: 'BoxOffice' });
});

sortByVotesButton.addEventListener('click', () => {
  getMovies({ sortBy: 'imdbVotes' });
});

function getMovies(options = {}) {
  const { sortBy } = options;
  let url = `http://www.omdbapi.com/?apikey=f4b0e8bf&s=${movie}`;
  if (sortBy) {
    url += `&type=movie&sort=${sortBy}&order=desc`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // ...
    });
}


