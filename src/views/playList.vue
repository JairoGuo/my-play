<template>
  <sui-container fluid style="height: 77vh;">
    <sui-item-group>
      <sui-item>
        <sui-item-image style="border-radius: 20px; overflow: hidden;box-shadow: 5px 5px 5px #888888;"
                        size="medium" :src="songSheetInfo.coverImgUrl"/>
        <sui-item-content style="margin-left: 25px; margin-right: 20px">
          <sui-item-header class="header2" is="h1">{{ songSheetInfo.name }}</sui-item-header>
          <sui-item-meta>
            <span>最后更新于 {{ songSheetInfo.updateTime | formatTime }} · {{ songSheetInfo.trackCount }} 首歌</span>
          </sui-item-meta>
          <sui-item-description style="  margin-top: 25px;" class="description">
            {{ songSheetInfo.description }}
          </sui-item-description>
          <sui-item-extra style="  margin-top: 25px;">
            <sui-button @click="playAllMusic" inverted secondary>播放</sui-button>
          </sui-item-extra>
        </sui-item-content>
      </sui-item>
    </sui-item-group>


    <sui-grid>
      <sui-grid-row v-for="item in playList" :key="item.id">
        <sui-grid-column :width="8" vertical-align="middle">
          <sui-item-group>
            <sui-item>
              <a @click="playMusic(item)" style="margin-right: 20px">
                <sui-image style="height: 50px; width: 50px; border-radius: 7px" size="mini" :src="item.picUrl"/>
              </a>
              <sui-item-content>
                <a style="color: #000; margin-top: 1px" @click="playMusic(item)" is="sui-header">{{ item.name }}</a>
                <sui-item-description>
                  {{ item.artistName }}
                </sui-item-description>
              </sui-item-content>
            </sui-item>
          </sui-item-group>
        </sui-grid-column>
        <sui-grid-column :width="4" vertical-align="middle">
          {{ item.artistName }}

        </sui-grid-column>
        <sui-grid-column :width="4" style="padding-right: 40px" vertical-align="middle" align="right">
          {{ item.duration | formatPlayTime }}

        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>


  </sui-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {PLAYER} from "@/store/types";
import Moment from 'moment'

export default {
  name: "songSheetList",

  data() {
    return {
      playList: [],
      songSheetInfo: {}

    }
  },
  computed: {
    ...mapGetters('player', {
      isSameMusicUrl: PLAYER.GETTER.IS_SAME_MUSIC_URL
    }),
  },
  methods: {

    async getSongDetail(ids) {
      await this.$api.getSongDetail({
        params: {ids: ids + ''}
      }).then((res) => {
        let data = res.data.songs
        for (const dataKey in data) {
          // eslint-disable-next-line no-prototype-builtins
          if (data.hasOwnProperty(dataKey)) {
            this.playList.push({
              id: data[dataKey].id,
              name: data[dataKey].name,
              artistName: data[dataKey].ar[0].name,
              picUrl: data[dataKey].al.picUrl,
              duration: data[dataKey].dt
            })
          }


        }

        // this.playList = res.data.songs
      })

    },
    ...mapMutations('player', {
      setPlaying: PLAYER.MUTATION.SET_PLAYING,
      setPlayList: PLAYER.MUTATION.SET_PLAY_LIST,
      setPlayListPush: PLAYER.MUTATION.SET_PLAY_LIST_PUSH
    }),
    ...mapActions('player', {
      getMusicUrl: PLAYER.ACTION.COMMIT_MUSIC_URL
    }),

    async playAllMusic() {
      await this.setPlaying(false)
      await this.setPlayList({playList: this.playList, index: 0})
      await this.getMusicUrl()
      await this.setPlaying(true)


    },

    async playMusic(data) {

      if (!this.isSameMusicUrl(data.id)) {

        await this.setPlaying(false)
        await this.setPlayListPush(data)
        await this.getMusicUrl()
        await this.setPlaying(true)
        // await this.setMusicPicUrl(data.picUrl)
      }


    },
  },
  async created() {

    // this.$api.getSongDetail({
    //   params: {ids: ['1824020871', '1823570631'] + ''}
    // }).then((res) => {
    //   console.log(res.data)
    //   this.playList.push(res.data.songs[0])
    // })

    await this.$api.getPlaylistDetail({
      params: {
        id: this.$route.params.id
      }
    }).then((res) => {
      let playList = []
      let data = res.data.playlist.trackIds
      this.songSheetInfo = res.data.playlist
      for (let index in data) {

        playList.push(data[index].id)
        // this.getSongDetail(data[index].id)
      }

      this.getSongDetail(playList)

      // console.log(res.data.playlist.trackIds)
    })
  },
  filters: {
    formatTime(val) {
      return Moment(val).format('YYYY-MM-DD')
    },
    formatPlayTime(val) {
      return Moment(val).format('mm:ss')

    }
  }
}
</script>

<style scoped>

.description {
  display: block;
  /*width: 300px;*/

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  color: black;
}

.header2 {
  display: block;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: black;
}

</style>