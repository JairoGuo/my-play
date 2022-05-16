
<template>

  <sui-container fluid style="height: 10vh;-webkit-app-region: drag;-webkit-user-select: none;" >

    <sui-grid fluid style="height: 10vh; padding: 0; margin: 0">
      <sui-grid-row style="height: 10vh;">
        <sui-grid-column  align="center" :width="3">
          <h2 class="ui header2">
            <div class="content">Play</div>
          </h2>
        </sui-grid-column>
        <sui-grid-column :width="2"  >

          <sui-button-group icons basic>
            <sui-button @click="back" icon="left chevron" style="-webkit-app-region: no-drag" />
            <sui-button @click="next" icon="right chevron" style="-webkit-app-region: no-drag" />

          </sui-button-group>

        </sui-grid-column>

        <sui-grid-column :width="5"  >

          <sui-input
              style="-webkit-app-region: no-drag"
              v-model="keywords"
              @keyup.enter="search"
              placeholder="搜索音乐..."  />
        </sui-grid-column>

        <sui-grid-column :width="4" >

        </sui-grid-column>

        <sui-grid-column :width="2"  >

          <div>
            <sui-button floated="right"
                        @click="close"
                        size="mini"
                        circular
                        color="red"
                        icon="close"
                        basic

                        style="-webkit-app-region: no-drag; " />
            <sui-button floated="right"
                        @click="minimize"
                        size="mini" circular
                        basic
                        color="grey" icon="minus" style="-webkit-app-region: no-drag;" />
          </div>

        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </sui-container>

</template>

<script>
// import {BrowserWindow} from 'electron'
export default {
  name: "index",
  data() {
    return {
      keywords: ''
    }
  },
  components: {
  },
  methods: {

    search() {

      this.$router.push({ name: 'SearchList', params: { keywords: this.keywords }})

    },
    back() {
      this.$router.go(-1)
    },
    next() {
      this.$router.go(1)

    },
    close() {
      console.log('close')
      const ipc = require('electron').ipcRenderer;

      ipc.send('window-close')
    },
    minimize() {
      // this.$electron.ipcRenderer.send('minimize')
      require('electron').ipcRenderer.send('minimize')

      console.log('minimize')
    },


  }
}
</script>




<style>

</style>
