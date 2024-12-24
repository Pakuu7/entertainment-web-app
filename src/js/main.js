const trending = document.querySelector('.main__trending')
const recommended = document.querySelector('.main__recommended')
const found = document.querySelector('.main__found')
const trendingMovies = document.querySelector('.main__trending-movies')
const recommendedMovies = document.querySelector('.main__recommended-movies')
const foundMovies = document.querySelector('.main__found-movies')
const searchInput = document.querySelector('.main__search-input')
const foundTitlePieces = document.querySelector('.main__found-title-pieces')
const foundTitlePlurality = document.querySelector('.main__found-title-plurality')
const foundTitleName = document.querySelector('.main__found-title-name')

let scrollAmount = 0


fetch('./data.json')
	.then(response => response.json())
	.then(json => {
		trendingMoviesCreate(json)
		recommendedMoviesCreate(json)
		searchInputQuery(json)
	})

function trendingMoviesCreate(movies) {
	movies.forEach(movie => {
		const card = document.createElement('div')
		card.classList.add('main__trending-movie')

		let categoryMovie = movie['category']
		let categoryMovieImage = ''

		if (categoryMovie == 'Movie') {
			categoryMovieImage = 'dist/img/assets/icon-category-movie.svg'
		} else {
			categoryMovieImage = 'dist/img/assets/icon-category-tv.svg'
		}

		card.innerHTML = `
		<div class="main__trending-movie-photo-container">
			<img src="${movie['thumbnail']['regular']['small']}" class="main__trending-movie-photo" alt="Trending movie">
		</div>
		<div class="main__trending-movie-bookmark-container">
			<img src="dist/img/assets/icon-bookmark-empty.svg" class="main__trending-movie-bookmark">
		</div>
		<div class="main__trending-movie-info-container">
			<p class="main__trending-movie-info-top"><span class="main__trending-movie-year">${movie['year']}</span> · <span class="main__trending-movie-category-icon"><img src="${categoryMovieImage}" alt="Movie category"></span><span class="main__trending-movie-category-name">${movie['category']}</span> · <span class="main__trending-movie-rating">${movie['rating']}</span></p>
			<p class="main__trending-movie-info-bottom"><span class="main__trending-movie-title">${movie['title']}</span></p>
		</div>
		<div class="main__trending-movies-play-container">
							<img src="dist/img/assets/icon-play.svg" class="main__trending-movies-icon" alt="Play">
							<p class="main__trending-movies-text">Play</p>
						</div>
    `

		if (movie['isTrending']) {
			trendingMovies.appendChild(card)
		}
	})
}

function recommendedMoviesCreate(movies) {
	movies.forEach(movie => {
		const card = document.createElement('div')
		card.classList.add('main__recommended-movie')

		let categoryMovie = movie['category']
		let categoryMovieImage = ''

		if (categoryMovie == 'Movie') {
			categoryMovieImage = 'dist/img/assets/icon-category-movie.svg'
		} else {
			categoryMovieImage = 'dist/img/assets/icon-category-tv.svg'
		}

		card.innerHTML = `
		<div class="main__recommended-movie-photo-container">
			<img src="${movie['thumbnail']['regular']['small']}" class="main__recommended-movie-photo" alt="recommended movie">
		</div>
		<div class="main__recommended-movie-bookmark-container">
			<img src="dist/img/assets/icon-bookmark-empty.svg" class="main__recommended-movie-bookmark">
		</div>
		<div class="main__recommended-movie-info-container">
			<p class="main__recommended-movie-info-top"><span class="main__recommended-movie-year">${movie['year']}</span> · <span class="main__recommended-movie-category-icon"><img src="${categoryMovieImage}" alt="Movie category"> </span><span class="main__recommended-movie-category-name">${movie['category']}</span> · <span class="main__recommended-movie-rating">${movie['rating']}</span></p>
			<p class="main__recommended-movie-info-bottom"><span class="main__recommended-movie-title">${movie['title']}</span></p>
		</div>
		<div class="main__recommended-movies-play-container">
			<img src="dist/img/assets/icon-play.svg" class="main__recommended-movies-icon" alt="Play">
			<p class="main__recommended-movies-text">Play</p>
		</div>
    `

		if (!movie['isTrending']) {
			recommendedMovies.appendChild(card)
		}
	})
}

function searchInputQuery(movies) {
	searchInput.addEventListener('input', e => {
		const query = e.target.value.trim()
		if (query !== '') {
			trending.classList.add('not-active')
			recommended.classList.add('not-active')
			foundMovies.classList.remove('not-active')
			searchInputMovies(query, movies)
		} else if (query == '') {
			trending.classList.remove('not-active')
			recommended.classList.remove('not-active')
			foundMovies.classList.add('not-active')
		}
	})
}

function searchInputMovies(query, movies) {
	let searchMovies = 0
	found.classList.remove('not-active')
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

			foundMovies.appendChild(card)
		}
	})

	foundTitlePieces.textContent = searchMovies
	if (foundTitlePieces.textContent <= 1) {
		foundTitlePlurality.textContent = 'result'
	} else {
		foundTitlePlurality.textContent = 'results'
	}
}
