const trendingMovies = document.querySelector('.main__trending-movies')
const recommendedMovies = document.querySelector('.main__recommended-movies')

let scrollAmount = 0
const slideWidth = 310
const delay = 2300

fetch('./data.json')
	.then(response => response.json())
	.then(json => {
		trendingMoviesCreate(json)
		recommendedMoviesCreate(json)
	})

function trendingMoviesCreate(movies) {
	movies.forEach(movie => {

		const card = document.createElement('div')
		card.classList.add('main__trending-movie')

		card.innerHTML = `
		<div class="main__trending-movie-photo-container">
			<img src="${movie['thumbnail']['regular']['small']}" class="main__trending-movie-photo" alt="Trending movie">
		</div>
		<div class="main__trending-movie-bookmark-container">
			<img src="dist/img/assets/icon-bookmark-empty.svg" class="main__trending-movie-bookmark">
		</div>
		<div class="main__trending-movie-info-container">
			<p class="main__trending-movie-info-top"><span class="main__trending-movie-year">${movie['year']}</span> · <span class="main__trending-movie-category-icon"><img src="dist/img/assets/icon-category-movie.svg" alt="Movie category"></span><span class="main__trending-movie-category-name">${movie['category']}</span> · <span class="main__trending-movie-rating">${movie['rating']}</span></p>
			<p class="main__trending-movie-info-bottom"><span class="main__trending-movie-title">${movie['title']}</span></p>
		</div>
    `

		if (movie['isTrending']) {
			trendingMovies.appendChild(card)
		}
	})
}


function recommendedMoviesCreate(movies) {
	movies.forEach(movie => {
		console.log(movie)

		const card = document.createElement('div')
		card.classList.add('main__recommended-movie')

		card.innerHTML = `
		<div class="main__recommended-movie-photo-container">
			<img src="${movie['thumbnail']['regular']['small']}" class="main__recommended-movie-photo" alt="recommended movie">
		</div>
		<div class="main__recommended-movie-bookmark-container">
			<img src="dist/img/assets/icon-bookmark-empty.svg" class="main__recommended-movie-bookmark">
		</div>
		<div class="main__recommended-movie-info-container">
			<p class="main__recommended-movie-info-top"><span class="main__recommended-movie-year">${movie['year']}</span> · <span class="main__recommended-movie-category-icon"><img src="dist/img/assets/icon-category-movie.svg" alt="Movie category"> </span><span class="main__recommended-movie-category-name">${movie['category']}</span> · <span class="main__recommended-movie-rating">${movie['rating']}</span></p>
			<p class="main__recommended-movie-info-bottom"><span class="main__recommended-movie-title">${movie['title']}</span></p>
		</div>
    `

		if (!movie['isTrending']) {
			recommendedMovies.appendChild(card)
		}
	})
}

trendingMoviesCreate()
