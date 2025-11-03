<template>
  <section id="experience" ref="experienceSection">
    <div class="light-rays-wrapper" v-if="isVisible">
      <ReactInVue :component="LightRays" :props="{
        raysOrigin: 'top-center',
        raysColor: '#00e5ff',
        raysSpeed: 1.2,
        lightSpread: 1.5,
        rayLength: 1.5,
        followMouse: true,
        mouseInfluence: 0.15,
        noiseAmount: 0.1,
        distortion: 0.05,
        fadeDistance: 1.2,
        saturation: 0.9,
        className: 'experience-rays'
      }" />
    </div>

    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title class="title" :title="content.object.metadata.title" :description="content.object.metadata.description" />
    </AnimateOnVisible>

    <AnimateOnVisible name="fadeUp" :duration="1">
      <div class="container-fluid">
        <div class="row">
          <ExperienceColumn :posts="content.object.metadata.academic" title="Education" class="col-12 col-md left" />
          <ExperienceColumn :posts="content.object.metadata.professional" title="Professional"
            class="col-12 col-md right" />
        </div>
      </div>
    </AnimateOnVisible>
  </section>
</template>

<script>
import Title from "./Title.vue";
import ExperienceColumn from "./ExperienceColumn.vue";
import ReactInVue from "./ReactInVue.vue";
import LightRays from "./LightRays.jsx";

export default {
  name: "Experience",
  props: ["content"],
  components: {
    Title,
    ExperienceColumn,
    ReactInVue
  },
  data() {
    return {
      LightRays,
      isVisible: false,
      observer: null
    }
  },
  mounted() {
    // Create an intersection observer to detect when experience section reaches the top
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show when top of section reaches top of viewport and at least 40% is visible
          this.isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60% 0px', // Negative bottom margin to ensure 40% visibility from top
        threshold: [0, 0.4, 1] // Multiple thresholds to track visibility changes
      }
    );

    // Start observing the experience section
    if (this.$refs.experienceSection) {
      this.observer.observe(this.$refs.experienceSection);
    }
  },
  beforeDestroy() {
    // Clean up observer when component is destroyed
    if (this.observer && this.$refs.experienceSection) {
      this.observer.unobserve(this.$refs.experienceSection);
      this.observer.disconnect();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

$linear: map-get($colors, dark);

#experience {
  background-color: rgb(63, 90, 148);
  position: relative;
  overflow: hidden;
}

.light-rays-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.title {
  color: map-get($colors, light);
  position: relative;
  z-index: 2;
}

.row {
  padding-top: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.container-fluid {
  position: relative;
  z-index: 2;
}

@media (min-width: #{map-get($breakpoints, small)}) {
  .left {
    text-align: right;
    border-right: 2px solid $linear;
  }

  .right {
    text-align: left;
  }
}

@media (max-width: #{map-get($breakpoints, small)}) {
  .right {
    margin-top: 20px;
  }

  .left:before {
    content: "";
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 2px;
    width: 60%;
    /* or 100px */
    border-bottom: 2px solid $linear;
  }
}

.text-wrapper {
  &:after {
    border-bottom: 1px solid map-get($colors, dark);
  }
}
</style>
<style>
#experience a {
  color: #ebdf2c;
}
</style>
