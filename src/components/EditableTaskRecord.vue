<template>
  <v-layout row wrap style="padding:30px;">
  <v-flex sm8 m-auto class="text-xs-center">
      

<v-btn fab dark medium color="cyan" v-if="!isEditMode"
        @click="$emit('onEdit')">
      <v-icon dark>edit</v-icon>
    </v-btn>

    <v-btn fab dark medium color="green" v-if="isEditMode"
        @click="$emit('onSave')">
      <v-icon dark>check</v-icon>
    </v-btn>

<v-btn fab dark medium color="red" @click="$emit('onDelete')">
      <v-icon dark>delete</v-icon>
    </v-btn>

    </v-flex>
    <v-flex sm8 xs12 m-auto>
      <span
        @click="$emit('onClick')"
        v-if="!isEditMode">
      </span>
      <v-text-field
        autofocus
        v-if="isEditMode"
        :value="title"
        id="updateTitle"
        @keyup.enter="$emit('onSave')"
        @input="$emit('onInput', $event)"
      ></v-text-field>
    </v-flex>
    


    <v-flex sm8 xs12 m-auto id="left-description">
      <span
        @click="$emit('onClick')"
        v-if="!isEditMode">
        <h3>DIRECTIONS:</h3>
        <blockquote><em>{{description}}</em></blockquote>
      </span>
      <v-textarea
          box
        autofocus
        v-if="isEditMode"
        :value="description"
        id="updateDescription"
        @keyup.enter="$emit('onSave')"
        @input="$emit('onInput', $event)"
      ></v-textarea>
    </v-flex>


    <v-flex sm8 m-auto class="text-center">
      <span
        @click="$emit('onClick')"
        v-if="!isEditMode">
<img class="img-fluid" style="max-width:400px;" v-bind:src="'http://localhost:3000/uploads/' + image" /> 

      </span>
      <v-text-field
        autofocus
        v-if="isEditMode"
        class="hidden"
        :value="image"
        :image="image"
        id="updateImage"
        @keyup.enter="$emit('onSave')"
        @change="$emit('onInput', $event)"
        @input="$emit('onInput', $event)"
      ></v-text-field>
    <vue-dropzone v-if="isEditMode" id="upload" :options="config" :headers="headers" v-on:vdropzone-sending="sendingEvent"></vue-dropzone>
    </v-flex>
  </v-layout>
</template>

<script>
import vueDropzone from 'vue2-dropzone';

export default {
  props: [
    'isEditMode',
    'title',
    'description',
    'record',
    'task',
    
  ],
  data() {
    return {
config: {
      url: "http://localhost:3000/api/upload"
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      image:this.task.image
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
#upload {
  width:100%;
  margin:0;
}
#left-description {
  text-align: left !important;
}

</style>
