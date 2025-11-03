<template>
    <section id="skills">
        <AnimateOnVisible name="fadeDown" :duration="1">
            <Title :title="content.object.metadata.title" :description="content.object.metadata.description" />
        </AnimateOnVisible>

        <div class="section-content">
            <div class="masonry-container">
                <ReactInVue :component="Masonry" :inline="true" :props="masonryProps" />
            </div>
        </div>
    </section>
</template>

<script>
import Title from './Title.vue'
import ReactInVue from './ReactInVue.vue'
import Masonry from './Masonry.jsx'

export default {
    name: 'Skills',
    components: {
        Title,
        ReactInVue
    },
    props: ['content'],
    data() {
        return {
            Masonry
        }
    },
    computed: {
        masonryItems() {
            const items = this.content.object.metadata.items.map((post, index) => ({
                id: `skill-${index}`,
                imgSrc: this.getImgUrl(post.img),
                imgAlt: post.title,
                title: post.title
            }));
            console.log('masonryItems computed:', items);
            return items;
        },
        masonryProps() {
            return {
                items: this.masonryItems,
                ease: 'power3.out',
                duration: 0.6,
                stagger: 0.05,
                animateFrom: 'bottom',
                scaleOnHover: true,
                hoverScale: 1.05,
                blurToFocus: true,
                colorShiftOnHover: false,
                spotlightColor: 'rgba(0, 229, 255, 0.5)'
            };
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

.section-content {
    width: 100%;
    max-width: 1400px;
    margin: 40px auto 0;
    padding: 0 20px;
}

.masonry-container {
    width: 100%;
    min-height: 400px;
}

.masonry-container>div {
    width: 100% !important;
}

@media(min-width: #{map-get($breakpoints, medium)}) {
    .section-content {
        width: 90%;
        padding: 0 40px;
    }
}
</style>
