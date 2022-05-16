import {PLAYER} from "@/store/types"
import api from '@/api/'


// import api from '@/api'
const state = {
    playing: false,
    musicInfo: {
        name: '',
        artistsName: '',
        picUrl: require("@/assets/playPic.jpeg"),
        playingMusicId: null,
        url: null,

    },

    playList: {
        length: 0,
        index: -1,
        songIds: [],

    }

}

const getters = {
    [PLAYER.GETTER.IS_PLAYING]: (state) => {
        return state["player/isPlaying"]
    },

    [PLAYER.GETTER.IS_SAME_MUSIC_URL]: (state) => (id) => {
      return state.musicInfo.playingMusicId === id
    }

}

const actions = {

    async [PLAYER.ACTION.COMMIT_MUSIC_URL]({state, commit}) {
        let data = state.playList.songIds[state.playList.index]

        await api.getMusicUrl({
            params: {
                id: data.id
            }
        }).then((res) => {

            commit(PLAYER.MUTATION.SET_MUSIC_URL, res.data.data[0].url)
            commit(PLAYER.MUTATION.SET_MUSIC_INFO, {...data})
            console.log("getMusicUrl Succeed")

        }).catch(error => {
            console.log(error)
        })

    },
    // async [PLAYER.ACTION.COMMIT_MUSIC_URL]({commit}, data) {
    //     await api.getMusicUrl({
    //         params: {
    //             id: data.id
    //         }
    //     }).then((res) => {
    //         commit(PLAYER.MUTATION.SET_MUSIC_URL, res.data.data[0].url)
    //         commit(PLAYER.MUTATION.SET_MUSIC_INFO, data)
    //         console.log("getMusicUrl Succeed")
    //
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //
    // },


}

const mutations = {
    [PLAYER.MUTATION.SET_PLAYING](state, status) {
        state.playing = status
    },
    [PLAYER.MUTATION.SET_MUSIC_URL](state, status) {
        state.musicInfo.url = status
    },
    [PLAYER.MUTATION.SET_MUSIC_INFO](state, status) {

        state.musicInfo.name = status.name
        state.musicInfo.picUrl = status.picUrl
        state.musicInfo.artistsName = status.artistName
        state.musicInfo.playingMusicId = status.id
    },
    [PLAYER.MUTATION.SET_PLAY_LIST](state, status) {

        state.playList.length = status.playList.length
        state.playList.songIds = status.playList
        state.playList.index = status.index

    },
    [PLAYER.MUTATION.SET_PLAY_LIST_PUSH](state, status) {

        state.playList.length++
        state.playList.index++
        state.playList.songIds.splice(state.playList.index, 0,status)
        console.log('push playList: ' + state.playList.songIds)
        console.log('push playList length: ' + state.playList.length)
        console.log('push playList index: ' + state.playList.index)
    },
    [PLAYER.MUTATION.SET_PLAY_LIST_SWITCH_ITEM](state, status) {
        state.playList.index = state.playList.songIds.findIndex(item => item === status)
        // state.playList.splice(this.playList.findIndex(item => item === item), 1)
        // state.playList.songIds.splice(0, 1)


    },
    [PLAYER.MUTATION.SET_PLAY_LIST_INDEX_INC](state) {

        state.playList.index = (state.playList.index + 1) % state.playList.length
    },

    [PLAYER.MUTATION.SET_PLAY_LIST_INDEX_DEC](state) {

        if (state.playList.index === 0) {
            state.playList.index = state.playList.length - 1

        } else {
            state.playList.index = (state.playList.index - 1) % state.playList.length

        }

    },




}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
