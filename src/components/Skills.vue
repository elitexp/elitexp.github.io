<template>
    <section id="skills">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="content.object.metadata.title" :description="content.object.metadata.description" />
        </AnimateOnVisible>

        <div class="section-content">
            <div class="container-fluid">
                <div class="row d-flex flex-wrap align-items-center justify-content-center">
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2 m-auto pb-4" style="cursor: pointer;"
                        v-for="(post, index) in this.content.object.metadata.items" :key="index">
                        <!-- <AnimateOnVisible name="bounce"> -->
                        <ReactInVue :component="SpotlightCard" :inline="true" :props="{
                            spotlightColor: 'rgba(0, 229, 255, 0.5)',
                            className: 'skill-spotlight-card',
                            imgSrc: getImgUrl(post.img),
                            imgAlt: post.title,
                            title: post.title,

                        }" />
                        <!-- </AnimateOnVisible> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Title from './Title.vue'
import ReactInVue from './ReactInVue.vue'
import SpotlightCard from './SpotlightCard.jsx'

export default {
    name: 'Skills',
    components: {
        Title,
        ReactInVue
    },
    props: ['content'],
    data() {
        return {
            SpotlightCard
        }
    },
    methods: {
        getImgUrl(img) {
            return require('../assets/img/logo/' + img);
        },
    },
}
</script>

<style scoped lang="scss">
@import '@/styles/constants.scss';

#skills {
    background-color: lighten(map-get($colors, dark), 100%);
    padding: 40px 20px;
}

@media(min-width: #{map-get($breakpoints, medium)}) {
    .section-content {
        width: 90%;
        margin: 0 auto;
    }
}

.row {
    margin-left: -15px;
    margin-right: -15px;
}

.col-6,
.col-sm-4,
.col-md-3,
.col-lg-2 {
    padding: 0 15px;
    margin-bottom: 30px;
}
</style>
