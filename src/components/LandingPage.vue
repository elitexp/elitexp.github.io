<template>
  <header class="header parallax">
    <ReactInVue :component="SplashCursor" />
    <div class="name">
      <div class="wrapper-name">

        <AnimateOnVisible name="fadeDown" ::duration="1">
          <Photo :user="user" style="text-align:center" />
          <h1>{{ user.name }}</h1>
        </AnimateOnVisible>
        <hr />
        <AnimateOnVisible name="fadeUp" ::duration="1">
          <p v-for="(status, index) in user.status" :key="index">
            <ReactInVue :component="DecryptedText" :inline="true" :props="{
              text: status,
              speed: 50,
              maxIterations: 15,
              sequential: true,
              revealDirection: 'start',
              animateOn: 'view',
              parentClassName: 'decrypted-text-wrapper'
            }" />
          </p>
        </AnimateOnVisible>
      </div>
    </div>
  </header>
</template>

<script>
import Photo from './Photo.vue'
import ReactInVue from './ReactInVue.vue'
import SplashCursor from './SplashCursor.jsx'
import DecryptedText from './DecryptedText.jsx'

export default {
  name: "LandingPage",
  props: ["user"],
  components: {
    Photo,
    ReactInVue
  },
  data() {
    return {
      SplashCursor,
      DecryptedText
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/constants.scss";

.header {
  padding: 20px;
  background-color: map-get($colors, dark);
}

.parallax {
  background-image: url("../assets/img/b_g.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 400;

  .wrapper-name {
    width: 250px;
  }

  h1 {
    font-size: 2.3rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: whitesmoke;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    margin: 5px auto;
    color: whitesmoke;
  }

  hr {
    border: 1px solid whitesmoke;
  }
}

// Decrypted text styles
::v-deep .decrypted-text-wrapper {
  font-size: 1.5rem;
  text-align: center;
  margin: 5px auto;
  color: whitesmoke;
  display: block;
}

@media (min-width: #{map-get($breakpoints, small)}) {
  .name {
    .wrapper-name {
      width: 55%;
    }

    h1 {
      font-size: 2.8rem;
      padding: 4% 8%;
    }

    p {
      font-size: 2rem;
    }
  }

  ::v-deep .decrypted-text-wrapper {
    font-size: 2rem;
  }
}

@media (min-width: #{map-get($breakpoints, medium)}) {
  .name {
    .wrapper-name {
      width: 450px;
    }

    h1 {
      font-size: 4rem;
      padding: 4% 10%;
    }

    p {
      font-size: 2.5rem;
    }
  }

  ::v-deep .decrypted-text-wrapper {
    font-size: 2.5rem;
  }
}

@media only screen and (max-device-width: 1024px) {
  .parallax {
    background-attachment: scroll;
  }
}
</style>