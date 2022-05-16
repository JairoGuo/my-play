const PLAYER = {

    STATE: {
        PLAYING: 'playing',
        MUSICURL: 'musicUrl'

    },

    ACTION: {
        COMMIT_MUSIC_URL: 'getMusicUrl',

    },

    MUTATION: {
        SET_PLAYING: 'setPlaying',
        SET_MUSIC_URL: 'setMusicUrl',
        SET_PLAYING_MUSIC_ID: 'setPlayingMusicId',
        SET_SET_MUSIC_PIC_URL: 'setMusicPicUrl',
        SET_MUSIC_INFO: 'setMusicInfo',
        SET_PLAY_LIST: 'setPlayList',
        SET_PLAY_LIST_INDEX_INC: 'setPlayListIndexInc',
        SET_PLAY_LIST_INDEX_DEC: 'setPlayListIndexDec',
        SET_PLAY_LIST_PUSH: 'setPlayListPush',
        SET_PLAY_LIST_SWITCH_ITEM: 'setPlayListSwitchItem',

    },


    GETTER: {
        IS_PLAYING: 'isPlaying',
        IS_SAME_MUSIC_URL: 'isSameMusicUrl'

    }
}



export {
    PLAYER,
}
