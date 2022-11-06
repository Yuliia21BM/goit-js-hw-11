export default class PixabayAPI{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.limit = 500;
    }

    async featchImages() {
        const API_KEY = '31109678-013e606e285b36a60c72d34b0'
        const url = `https://pixabay.com/api?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}&webformatURL`;
        try {
            const response = await fetch(url);
            return response.json();
        } catch {
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    availableimages() {
        if (this.page * 40 > this.limit) {
            window.removeEventListener('scroll', onScrollWindow, {
                passive: true
            });
            loadMoreBtn.classList.add('is-hidden');
        }
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}