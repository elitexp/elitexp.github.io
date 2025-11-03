<template>
  <div ref="reactRoot" :style="wrapperStyle"></div>
</template>

<script>
import React from 'react';
import ReactDOM from 'react-dom/client';

export default {
  name: 'ReactInVue',
  props: {
    component: {
      type: [Object, Function],
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperStyle() {
      if (this.inline) {
        return {
          display: 'inline-block'
        };
      }
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      };
    }
  },
  data() {
    return {
      reactRoot: null
    }
  },
  mounted() {
    this.renderReactComponent();
  },
  updated() {
    this.renderReactComponent();
  },
  beforeUnmount() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  },
  beforeDestroy() {
    // For Vue 2 compatibility
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  },
  methods: {
    renderReactComponent() {
      // Handle both direct component functions and default exports
      let component = this.component?.default || this.component;

      // Additional check: if component is still an object, try to extract the function
      if (typeof component === 'object' && component !== null) {
        // Check for __esModule pattern
        if (component.__esModule && component.default) {
          component = component.default;
        } else {
          console.error('Invalid component type:', component);
          return;
        }
      }

      // Verify we have a valid component
      if (typeof component !== 'function') {
        console.error('Component is not a function:', typeof component, component);
        return;
      }

      const element = React.createElement(
        component,
        this.props
      );

      if (!this.reactRoot && this.$refs.reactRoot) {
        this.reactRoot = ReactDOM.createRoot(this.$refs.reactRoot);
      }

      if (this.reactRoot) {
        this.reactRoot.render(element);
      }
    }
  }
};
</script>

<style scoped>
/* Wrapper has inline styles for positioning */
</style>
