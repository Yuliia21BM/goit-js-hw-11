const axios = require('axios').default;
export default class PixabayAPI{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.limit = 500;
    }

    async featchImages() {
        try {
            // const BASE_URL = `https://pixabay.com/api/?`;
            // const response = await axios.get(BASE_URL, {
            //     params: {
            //         key: '31109678-013e606e285b36a60c72d34b0',
            //         q: this.searchQuery,
            //         image_type: photo,
            //         orientation: horizontal,
            //         safesearch: true,
            //         per_page: '40',
            //         page: this.page
            //     }
            // })
            const res = await axios.get(`https://pixabay.com/api/?key=31109678-013e606e285b36a60c72d34b0&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            const images = res.data;
      return images;
  } catch (error) {
    console.error(error);
  }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}