const found = document.querySelector('.main__found')
const moviesParent = document.querySelector('.main__movies')
const foundMovies = document.querySelector('.main__found-movies')
const moviesContainer = document.querySelector('.main__movies-container')
const searchInput = document.querySelector('.main__search-input')
const foundTitlePieces = document.querySelector('.main__found-title-pieces')
const foundTitlePlurality = document.querySelector('.main__found-title-plurality')
const foundTitleName = document.querySelector('.main__found-title-name')

fetch('./data.json')
	.then(response => response.json())
	.then(json => {
        moviesCreate(json),
		searchInputQuery(json)
	})

function moviesCreate(movies) {
	movies.forEach(movie => {
		const card = document.createElement('div')
		card.classList.add('main__movie')

		let categoryMovie = movie['category']
		let categoryMovieImage = ''

		if (categoryMovie == 'Movie') {
			categoryMovieImage = 'dist/img/assets/icon-category-movie.svg'
		} else {
			categoryMovieImage = 'dist/img/assets/icon-category-tv.svg'
		}

		card.innerHTML = `
            <div class="main__movies-movie-photo-container">
                <img src="${movie['thumbnail']['regular']['small']}" class="main__movies-movie-photo" alt="movies movie">
            </div>
            <div class="main__movies-movie-bookmark-container">
                <img src="dist/img/assets/icon-bookmark-empty.svg" class="main__movies-movie-bookmark">
            </div>
            <div class="main__movies-movie-info-container">
                <p class="main__movies-movie-info-top"><span class="main__movies-movie-year">${movie['year']}</span> · <span class="main__movies-movie-category-icon"><img src="${categoryMovieImage}" alt="Movie category"> </span><span class="main__movies-movie-category-name">${movie['category']}</span> · <span class="main__movies-movie-rating">${movie['rating']}</span></p>
                <p class="main__movies-movie-info-bottom"><span class="main__movies-movie-title">${movie['title']}</span></p>
            </div>
            <div class="main__movies-movies-play-container">
                <img src="dist/img/assets/icon-play.svg" class="main__movies-movies-icon" alt="Play">
                <p class="main__movies-movies-text">Play</p>
            </div>
        `
            if(categoryMovie == 'Movie') {
                moviesContainer.appendChild(card)
            } else {
                return;
            }
		
	})
}

function searchInputQuery(movies) {
	searchInput.addEventListener('input', e => {
		const query = e.target.value.trim()
		if (query !== '') {
			found.classList.remove('not-active')
			moviesParent.classList.add('not-active')
			searchInputMovies(query, movies)
		} else if (query == '') {
			found.classList.add('not-active')
			moviesParent.classList.remove('not-active')
		}
	})
}

function searchInputMovies(query, movies) {
	let searchMovies = 0
	foundMovies.innerHTML = ''
	foundTitleName.textContent = query

	movies.forEach(movie => {
		if (movie['title'].toLowerCase().includes(query.toLowerCase())) {
			searchMovies++
			const card = document.createElement('div')
			card.classList.add('main__found-movie')

			let categoryMovie = movie['category']
			let categoryMovieImage = ''

			if (categoryMovie == 'Movie') {
				categoryMovieImage = 'dist/img/assets/icon-category-movie.svg'
			} else {
				categoryMovieImage = 'dist/img/assets/icon-category-tv.svg'
			}

			card.innerHTML = `
                <div class="main__found-movie-photo-container">
                    <img src="${movie['thumbnail']['regular']['small']}" class="main__found-movie-photo" alt="found movie">
                </div>
                    <div class="main__found-movie-bookmark-container">
                    <img src="dist/img/assets/icon-bookmark-empty.svg" class="main__found-movie-bookmark">
                </div>
                <div class="main__found-movie-info-container">
                    <p class="main__found-movie-info-top"><span class="main__found-movie-year">${movie['year']}</span> · <span class="main__found-movie-category-icon"><img src="${categoryMovieImage}" alt="Movie category"> </span><span class="main__found-movie-category-name">${movie['category']}</span> · <span class="main__found-movie-rating">${movie['rating']}</span></p>
                    <p class="main__found-movie-info-bottom"><span class="main__found-movie-title">${movie['title']}</span></p>
                </div>
                <div class="main__found-movies-play-container">
                    <img src="dist/img/assets/icon-play.svg" class="main__found-movies-icon" alt="Play">
                    <p class="main__found-movies-text">Play</p>
                </div>
                `

                if(categoryMovie == 'Movie') {
                    foundMovies.appendChild(card)
                } else {
                    return;
                }
		}
	})

	foundTitlePieces.textContent = searchMovies
	if (foundTitlePieces.textContent <= 1) {
		foundTitlePlurality.textContent = 'result'
	} else {
		foundTitlePlurality.textContent = 'results'
	}
}
