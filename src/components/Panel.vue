<template>
  <div class="white elevation-2">
    <v-toolbar
      flat
      dense
      dark
      color="green"
    >
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>No slot content defined.</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.index-right {
  font-size: 20px;
    font-weight: 500;
    letter-spacing: .02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float:right;
}
</style>
