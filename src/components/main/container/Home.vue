<template>
  <sui-container fluid>
    <sui-grid style="height: 77vh; overflow-y: auto; padding: 20px" :columns="5">

      <sui-grid-row>
        <sui-header style="margin-left: 20px" is="h1">推荐歌单</sui-header>
      </sui-grid-row>

      <sui-grid-column v-for="item in songSheet" :key="item.id">
        <router-link :to="{name: 'PlayList', params: {id: item.id}}">
          <sui-card class="fluid" style="border-radius: 20px;overflow: hidden">
            <sui-image :src="item.picUrl"/>
          </sui-card>
          <sui-header style="margin-top: 10px;"><b>{{ item.name }}</b></sui-header>
        </router-link>
      </sui-grid-column>

      <sui-grid-row>
        <sui-header style="margin-left: 20px" is="h1">新专速递</sui-header>
      </sui-grid-row>

      <sui-grid-column v-for="item in newSong" :key="item.id">

        <sui-card class="fluid" style="border-radius: 20px;overflow: hidden">

          <sui-image :src="item.picUrl"/>
        </sui-card>
        <sui-button floated="right" circular icon="play" @click="playMusic(item)"/>
        <sui-header style="margin: 0;"><b>{{ item.name }}</b></sui-header>
        <span style="margin-top: 10px;">{{ item.artistName }}</span>
      </sui-grid-column>

    </sui-grid>

  </sui-container>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from "vuex";
import {PLAYER} from "@/store/types";

export default {
  name: "home",
  data() {
    return {
      songSheet: {},
      newSong: [],
      audio: null
    }
  },
  computed: {
    ...mapGetters('player', {
      isSameMusicUrl: PLAYER.GETTER.IS_SAME_MUSIC_URL
    }),

  },
  methods: {
    ...mapMutations('player', {
      setPlaying: PLAYER.MUTATION.SET_PLAYING,
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
  },
  created() {
    this.$api.getRecommendSongSheet({
      params: {limit: 10}
    }).then((res) => {
      this.songSheet = res.data.result
      console.log("getRecommendSongSheet Succeed")
    })

    this.$api.getNewSong({
      params: {limit: 10}
    }).then((res) => {
      let data = res.data.result
      for (const dataKey in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(dataKey)) {
          this.newSong.push({
            id: data[dataKey].id,
            name: data[dataKey].name,
            artistName: data[dataKey].song.artists[0].name,
            picUrl: data[dataKey].picUrl,
            duration: data[dataKey].song.duration
          })
        }

      }
      // this.newSong = res.data.result
      console.log("getRecommendSongSheet Succeed")
    })

  }
}
</script>

<style scoped>

</style>