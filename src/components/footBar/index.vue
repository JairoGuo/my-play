<template>
  <div>
    <!--    <sui-divider fitted />-->
    <sui-container fluid>

      <sui-grid fluid>

        <sui-grid-row style="height: 13vh;">
          <sui-grid-column align="center" :width="2" style="height: 9vh">
            <div>
              <sui-image style="width: 9vh; height: 9vh; " :src="musicInfo.picUrl" size="tiny"/>
            </div>
          </sui-grid-column>
          <sui-grid-column :width="3" style="height: 9vh">
            <h4 is="sui-header">{{ musicInfo.name }}</h4>
            <span>{{ musicInfo.artistsName }}</span>

          </sui-grid-column>
          <sui-grid-column :width="6" style="height: 9vh">

            <div align="center">
              <div>
                <sui-button :disabled="playList.length === 0" @click="previousMusic" circular icon="step backward"/>
                <sui-button :disabled="playList.length === 0" style="margin-left: 20px; margin-right: 20px"
                            @click="startPlayOrPause"
                            circular size="large"
                            :icon="playing ? 'pause' : 'play'"/>
                <sui-button :disabled="playList.length === 0" @click="nextMusic" circular icon="step forward"/>
              </div>
              <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime"
                         class="slider"></el-slider>

            </div>

            <!--            <span>{{ currentTime | formatSecond }}</span>-->
            <!--            <sui-progress :percent="percent" style="margin: 2vh" attached size="tiny"/>-->

            <!--            <span>{{ maxTime | formatSecond }}</span>-->
          </sui-grid-column>

          <sui-grid-column :width="5" style="height: 9vh; line-height: 9vh">

            <sui-popup

                basic
                position="top center"
                flowing
                hoverable
            >
              <el-slider v-model="volumeValue"
                         vertical
                         :show-tooltip="false"
                         height="150px"
                         :max="1"
                         :min="0"
                         :step="0.01"
                         @input="changeVolume"
              ></el-slider>

              <sui-button
                  style="margin-left: 5px; margin-right: 5px"
                  @click="playOrMuted" circular :icon="muted ? 'volume off' : 'volume up'" slot="trigger"/>
            </sui-popup>


            <el-popover
                placement="bottom"
                width="400"
                trigger="manual"
                v-model="visible">
              <!--              <sui-button @click="playOrMuted" circular :icon="muted ? 'volume off' : 'volume up'" slot="trigger"/>-->
              <div align="center" v-if="playList.length === 0">
                <sui-header style="line-height: 60vh">
                  无播放列表
                </sui-header>
              </div>
              <div v-else>
                <sui-list divided relaxed style="height: 60vh; overflow-y: auto">

                  <sui-list-item v-for="item in playList.songIds" :key="item.id">
                    <sui-list-content>


                      <a @click="switchPlayListItem(item)" is="sui-list-header">{{ item.name }}</a>
                      <a is="sui-list-description">{{ item.artistName }}</a>

                    </sui-list-content>

                  </sui-list-item>
                </sui-list>

              </div>


              <sui-button
                  style="margin-left: 5px; margin-right: 5px;"
                  slot="reference" @click="visible = !visible" circular icon="th list"/>

              <!--              <el-button slot="reference" @click="visible = !visible">手动激活</el-button>-->
            </el-popover>

          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>


    </sui-container>

    <audio ref="audio"
           @pause="onPause"
           @play="onPlay"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           @ended="onEnded"
           :src="musicInfo.url"
           controls="controls"
           v-show="false"
    >
    </audio>


  </div>
</template>

<script>


import {mapActions, mapMutations, mapState} from "vuex"
import {PLAYER} from "@/store/types/"

export default {
  name: 'index',
  components: {},
  props: {},
  data() {
    return {
      percent: 0,
      currentTime: 0,
      // 音频最大播放时长
      maxTime: 0,
      sliderTime: 0,
      volumeValue: 1,
      muted: false,
      visible: false

    }
  },
  computed: {
    ...mapState('player', [
      'playing',
      'musicInfo',
      'playList'
    ]),


  },
  created() {

  },
  mounted() {
  },
  methods: {
    ...mapMutations('player', {
      setPlaying: PLAYER.MUTATION.SET_PLAYING,
      setPlayListIndexInc: PLAYER.MUTATION.SET_PLAY_LIST_INDEX_INC,
      setPlayListIndexDec: PLAYER.MUTATION.SET_PLAY_LIST_INDEX_DEC,
      setPlayListSwitchItem: PLAYER.MUTATION.SET_PLAY_LIST_SWITCH_ITEM
    }),
    ...mapActions('player', {
      getMusicUrl: PLAYER.ACTION.COMMIT_MUSIC_URL
    }),
    startPlayOrPause() {
      this.playing ? this.pause() : this.play()
    },
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    onPlay() {
      this.setPlaying(true)
    },

    onPause() {
      this.setPlaying(false)

    },
    onLoadedmetadata(res) {

      this.maxTime = parseInt(res.target.duration)
      this.volumeValue = parseInt(res.target.volume)

    },

    // 将整数转换成 时：分：秒的格式
    realFormatSecond(second) {
      var secondType = typeof second

      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)

        var hours = Math.floor(second / 3600)
        second = second - hours * 3600
        var mimute = Math.floor(second / 60)
        second = second - mimute * 60

        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '0:00:00'
      }
    },
    changeCurrentTime(index) {

      this.$refs.audio.currentTime = parseInt(index / 100 * this.maxTime)

    },
    changeVolume(index) {
      this.$refs.audio.volume = index
      if (index === 0) {
        this.$refs.audio.muted = true
        this.muted = true
      } else {
        this.$refs.audio.muted = false
        this.muted = false
      }
    },

    playOrMuted() {

      if (this.$refs.audio.muted) {
        this.$refs.audio.muted = false
        this.muted = false
        if (this.volumeValue === 0) {
          this.volumeValue = 1
        }
      } else {
        this.$refs.audio.muted = true
        this.muted = true
      }

    },
    async nextMusic() {
      await this.setPlaying(false)
      await this.setPlayListIndexInc()
      await this.getMusicUrl()
      await this.setPlaying(true)
    },
    async previousMusic() {
      await this.setPlaying(false)
      await this.setPlayListIndexDec()
      await this.getMusicUrl()
      await this.setPlaying(true)
    },

    onEnded() {

      this.nextMusic()


    },
    async switchPlayListItem(item) {

      await this.setPlaying(false)
      await this.setPlayListSwitchItem(item)
      await this.getMusicUrl()
      await this.setPlaying(true)
    },

    onTimeupdate(res) {
      this.currentTime = res.target.currentTime
      this.sliderTime = parseInt(this.currentTime / this.maxTime * 100)
    },

// 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt(this.maxTime / 100 * index)
      return this.realFormatSecond(index)
    },

  },
  filters: {
    formatSecond(second = 0) {
      let secondType = typeof second;

      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)

        let hours = Math.floor(second / 3600)
        second = second - hours * 3600
        let mimute = Math.floor(second / 60)
        second = second - mimute * 60

        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '0:00:00'
      }

    }
  },
  watch: {
    playing(newVal) {
      if (newVal) {
        this.play()
      } else {
        this.pause()
      }
    }
  },

};
</script>

<style>
.el-slider__runway {
  margin-top: 10px;
}

.foot-bar {
  height: 13vh;

  /*background-color: #F6F6F8;*/

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /*height: 64px;*/
  -webkit-backdrop-filter: saturate(180%) blur(30px);
  backdrop-filter: saturate(180%) blur(30px);
  --color-navbar-bg: hsla(0, 0%, 100%, 0.86);
  background-color: var(--color-navbar-bg);
  z-index: 100;
}
</style>
