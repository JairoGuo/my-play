<template>

  <sui-container class="containers" fluid>
    <sui-container fluid class="top-bar">
      <top-bar></top-bar>
    </sui-container>

    <sui-container class="main" fluid>
      <main-home></main-home>
    </sui-container>

    <sui-container class="foot-bar" fluid>
      <foot-bar></foot-bar>
    </sui-container>

  </sui-container>

</template>

<script>
import TopBar from '@/components/topBar/'
import MainHome from '@/components/main/'
import FootBar from '@/components/footBar/'

export default {
  name: "index",
  data() {
    return {
      keywords: '',

    }
  },
  components: {
    TopBar,
    MainHome,
    FootBar
  },
  methods: {

    search() {
      this.$api.getMusicList({
        params: {
          keywords: this.keywords
        }
      }).then((res) => {
        console.log(res)
      }).catch(() => {
        console.log("Error")
      })
    }


  },
  created() {


  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}


.top-bar {
  height: 10vh;
  background-color: #4791EB;

}

.foot-bar {
  height: 13vh;

  background-color: #F6F6F8;

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
  /*background-color: var(--color-navbar-bg);*/
  z-index: 100;
}

/*.containers {*/
/*  display: flex; height: 100vh; flex-direction: column;*/
/*}*/

/*.main {*/
/*  flex: 1; height: 77vh;*/

/*}*/
.main-container {
  margin: 0;
  padding: 0;
  height: 77vh;
}

.main-side {
  overflow-y: auto;
}

.main-side::-webkit-scrollbar {
  display: none;
}
</style>
