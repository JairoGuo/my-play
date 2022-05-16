<template>
  <sui-container fluid style="height: 77vh;">

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
import Moment from "moment";

import {mapActions, mapGetters, mapMutations} from "vuex";
import {PLAYER} from "@/store/types";

export default {
  name: "searchList",
  components: {},
  props: {},
  data() {
    return {
      playList: []
    }
  },
  computed: {
    ...mapGetters('player', {
      isSameMusicUrl: PLAYER.GETTER.IS_SAME_MUSIC_URL
    }),
  },
  created() {
    // this.getMusicList()
  },
  mounted() {
  },
  methods: {
    ...mapMutations('player', {
      setPlaying: PLAYER.MUTATION.SET_PLAYING,
      setPlayList: PLAYER.MUTATION.SET_PLAY_LIST,
      setPlayListPush: PLAYER.MUTATION.SET_PLAY_LIST_PUSH
    }),
    ...mapActions('player', {
      getMusicUrl: PLAYER.ACTION.COMMIT_MUSIC_URL
    }),
    async playMusic(data) {

      if (!this.isSameMusicUrl(data.id)) {

        await this.setPlaying(false)
        await this.setPlayListPush(data)
        await this.getMusicUrl()
        await this.setPlaying(true)
        // await this.setMusicPicUrl(data.picUrl)
      }


    },
    getMusicList() {
      this.playList = []
      this.$api.getMusicList({
        params: {
          keywords: this.$route.params.keywords
        }
      }).then((res) => {
        let data = res.data.result.songs
        for (const dataKey in data) {
          // eslint-disable-next-line no-prototype-builtins
          if (data.hasOwnProperty(dataKey)) {
            this.playList.push({
              id: data[dataKey].id,
              name: data[dataKey].name,
              artistName: data[dataKey].artists[0].name,
              picUrl: data[dataKey].artists[0].img1v1Url,
              duration: data[dataKey].duration
            })
          }


        }
      }).catch(() => {
        console.log("Error")
      })
    }

  },
  filters: {
    formatPlayTime(val) {
      return Moment(val).format('mm:ss')

    }
  },
  watch: {


    $route: {
      immediate: true,
      handler() {
        this.getMusicList()
      }
    },

  },

}
</script>

<style scoped>

</style>