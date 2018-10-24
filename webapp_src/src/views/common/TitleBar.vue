<template>
    <div class="dola-title">
        <a href="javascript:history.go(-1);" class="backer" v-if="!isApp"></a>
        <h2>{{title}}</h2>
        <div class="dola-investment-details-search-bar" @click="searchFn" v-if="searchBar">
            <p>{{searchText}}</p>
            <i class="ico"></i>
        </div>
    </div>
</template>
<script>
    import Util from '../../util/index'

    export default {
        name: 'titlebar',
        data() {
            return {
                isApp: false
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            searchText: {
                type: String,
                default: ''
            },
            searchBar: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            searchFn() {
                //投资明细 搜索部分
                this.$emit('search');
            }
        },
        created() {
            var platform = Util.getCookie('platform');

            if (platform != '') {
                this.isApp = true;
            } else {
                this.isApp = false;
            }
        }
    }
</script>
