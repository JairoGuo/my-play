<template>
  <sui-container fluid>


    <sui-grid style="height: 77vh; padding: 20px;">
      <sui-grid-row>
        <sui-grid-column>

          <div style="display: flex; flex-wrap: wrap;">
            <sui-button

                :active="isActive('全部')"
                content="全部"
                @click="select('全部'), getSongSheet()"
                        basic style=" margin: 10px; border-radius: 10px">

            </sui-button>

            <sui-button
                :active="isActive('排行榜')"
                content="排行榜"
                @click="getTopList(), select('排行榜')"
                basic style=" margin: 10px; border-radius: 10px">

            </sui-button>
            <sui-button
                v-for="item in hotCategory" :key="item.id"

                :active="isActive(item.name)"

                :content="item.name"
                @click="select(item.name), getSongSheet(item.name)"
                basic style=" margin: 10px; border-radius: 10px"
            />


            <sui-button


                icon="ellipsis horizontal"
                :active="isShowMore"
                @click="isShowMore = !isShowMore"
                basic style=" margin: 10px; border-radius: 10px"
            />


          </div>

        </sui-grid-column>
      </sui-grid-row>


      <sui-grid-row>

        <sui-grid-column>
          <sui-segment v-show="isShowMore">
            <sui-grid>
              <sui-grid-row v-for="items in allCategoryList" :key="items.index">

                <sui-grid-column :width="2">
                  <sui-header is="h2" style="margin: 10px">
                    {{ items.name }}
                  </sui-header>
                </sui-grid-column>

                <sui-grid-column :width="14">
                  <div style="display: flex; flex-wrap: wrap;">
                    <sui-button v-for="item in items.category" :key="item.name"
                                :active="isActive(item.name)"
                                @click="select(item.name), getSongSheet(item.name)"
                                basic style=" margin: 10px; border-radius: 10px">
                      {{ item.name }}
                    </sui-button>

                  </div>

                </sui-grid-column>

              </sui-grid-row>

            </sui-grid>


          </sui-segment>

        </sui-grid-column>
      </sui-grid-row>

      <sui-grid-row :columns="5">
        <sui-grid-column v-for="item in songSheetList" :key="item.id">
          <router-link :to="{name: 'PlayList', params: {id: item.id}}">
            <sui-card class="fluid" style="border-radius: 20px;overflow: hidden">
              <sui-image :src="item.coverImgUrl"/>
            </sui-card>
            <sui-header style="margin-top: 10px;;"><b>{{ item.name }}</b></sui-header>
          </router-link>
        </sui-grid-column>

      </sui-grid-row>


    </sui-grid>

  </sui-container>
</template>

<script>
export default {
  name: "discoverMusic",
  components: {},
  props: {},
  data() {
    return {
      active: '全部',
      hotCategory: [],
      songSheetList: [],
      isShowMore: false,
      allCategoryList: []
    }
  },
  computed: {},
  created() {
    this.$api.getHotCategory().then((res) => {
      this.hotCategory = res.data.tags
    })


    this.getSongSheet()
    this.getAllCategory()
  },
  mounted() {
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
    getSongSheet(category) {
      this.$api.getSongSheet({
        params: {
          cat: category
        }
      }).then((res) => {
        this.songSheetList = res.data.playlists
      })

    },
    getTopList() {
      this.$api.getTopList().then((res) => {
        this.songSheetList = res.data.list
      })
    },
    getAllCategory() {
      this.$api.getAllCategory().then((res) => {
        // this.allCategoryList = res.data
        let data = res.data
        for (let category in data.categories) {

          let categoryData = []
          for (let item in data.sub) {
            // eslint-disable-next-line no-prototype-builtins
            if (data.sub.hasOwnProperty(item)) {
              if (data.sub[item].category === parseInt(category)) {
                categoryData.push(data.sub[item])
              }
            }
          }
          let item = {
            index: category,
            name: data.categories[category],
            category: categoryData
          }

          this.allCategoryList.push(item)
        }

        // console.log(this.allCategoryList)

      })
    }
  },
  filters: {},
  watch: {},

}
</script>

<style scoped>

</style>