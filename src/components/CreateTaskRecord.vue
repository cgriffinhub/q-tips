<template>
  <v-layout row wrap class="mt-4">
    <v-flex xs12 m-auto>
      <v-text-field
        :placeholder="placeholder"
        :title="title"
        id="title"
        @input="$emit('onInput', $event)"
        @keyup.enter="$emit('create')"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 m-auto>
      <v-textarea
          box
        :placeholder="placeholder"
        :description="description"
        id="description"
        @input="$emit('onInput', $event)"
        @keyup.enter="$emit('create')"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 m-auto>
      <v-text-field
        :placeholder="placeholder"
        :image="image"
        id="image"  
        class="hidden"
        @change="$emit('onInput', $event)"
        @input="$emit('onInput', $event)"
        @keyup.enter="$emit('create')"
      ></v-text-field>
    <vue-dropzone id="upload" :options="config" :headers="headers" v-on:vdropzone-sending="sendingEvent"></vue-dropzone>
    </v-flex>
    <v-flex xs12 m-auto class="text-xs-center">
      <v-btn
        @click="$emit('create')"
        dark
        class="mt-2 create-button"
        color="green">
        <v-icon class="mr-2">add_circle</v-icon>
        Create
      </v-btn>
    </v-flex>
    
  </v-layout>
</template>

<script>
import vueDropzone from 'vue2-dropzone';

export default {
  props: {
    placeholder: String,
    title: String,
    description: String,
  },
  data() {
    return {
config: {
      url: "http://localhost:3000/api/upload"
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    image: String
    }
    
  },
  components: {
    vueDropzone
  },
  methods: {
      sendingEvent (profile_pics, xhr, formData, image) {
        formData.append('paramName', 'some value or other');
            var s = document.getElementById('image');
            s.value = profile_pics.name;
            this.image = profile_pics.name;
            return this.image;
      }
    }

};
</script>

<style>
.hidden {
  display:none;
}
.create-button {
  width:100%;
  margin:0;
}
</style>
