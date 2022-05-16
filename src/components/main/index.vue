<template lang="html">
  <sui-grid celled="internally" style="margin: 0; padding: 0; height: 77vh;">
    <sui-grid-row style="margin: 0; padding: 0; height: 77vh;" >
      <sui-grid-column :width="3" class="main-side main-container" >
        <sui-menu fluid vertical secondary>
          <router-link :to="{name: 'Home'}">
              <a
                  is="sui-menu-item"
                  content="首页"
                  :active="isActive('首页')"
                  @click="select('首页')"
              />
          </router-link>
          <router-link :to="{name: 'DiscoverMusic'}">

              <a
                  is="sui-menu-item"
                  content="发现"
                  :active="isActive('发现')"
                  @click="select('发现')"
              />

          </router-link>


        </sui-menu>
      </sui-grid-column>
      <sui-grid-column :width="13"  class="main-side main-container">
        <router-view></router-view>
<!--        <keep-alive>-->
<!--        </keep-alive>-->

      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>

</template>


<script>


export default {
  data() {
    return {

      active: '首页',
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  },
}
</script>

<style>
.main-container {
  margin: 0; padding: 0; height: 77vh;
}

.main-side {
  overflow-y:auto;
}
</style>
