<template>
  <h1>home</h1>
  {{ home({label: 'home'}) }}
  <button @click="cli">click</button>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data() {
    return {
      home: a => a.label
    }
  },
  methods: {
    cli() {
      
    }
  }
};
</script>
