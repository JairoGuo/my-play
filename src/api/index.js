import http from "@/utils/http/";

class API {
    getMusicList(params) {
        // {keywords: null, limit: 30, offset: 0, type: 1}
        const url = '/search'
        return http.get(url, params)
    }

    getRecommendSongSheet(params) {
        const url = '/personalized'
        return http.get(url, params)
    }

    getNewSong(params) {
        const url = '/personalized/newsong'
        return http.get(url, params)
    }

    getPlaylistDetail(params) {
        const url = '/playlist/detail'
        return http.get(url, params)
    }

    getSongDetail(params) {
        const url = '/song/detail'
        return http.get(url, params)
    }

    getMusicUrl(params) {
        const url = '/song/url'
        return http.get(url, params)
    }

    getHotCategory() {
        const url = '/playlist/hot'
        return http.get(url)
    }

    getSongSheet(params) {
        const url = '/top/playlist/highquality'
        return http.get(url, params)
    }

    getTopList() {
        const url = '/toplist'
        return http.get(url)
    }

    getAllCategory() {
        const url = '/playlist/catlist'
        return http.get(url)
    }


}

export default new API()