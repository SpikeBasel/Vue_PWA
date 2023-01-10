<!-- eslint-disable vue/valid-template-root -->
<template>

</template>

<script>
import LessonService from '../LessonService';

export default {

  name: 'LessonComponent',
  data() {
    return {
      lessons: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.lessons = await LessonService.getLessons();
    } catch (error) {
      this.error = error.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  font-weight:bold;
  font-size: 25px;
  margin: 5px;
}

</style>
