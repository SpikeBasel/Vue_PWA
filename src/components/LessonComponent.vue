<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <section class="lessons">
      <p class="error" v-if="error">{{ error }}</p>
      <div v-for="(lesson, index) in lessons" v-bind:item="lesson" v-bind:index="index" v-bind:key="lesson._id" class="lesson" >
          <ul class="lesson-text">
            <li> topic: {{ lesson.topic }} </li>
            <li> location: {{ lesson.location }} </li>
            <li> price: {{ lesson.price }} </li>
          </ul>
      </div>
    </section>
  </div>
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
.lessons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.lesson {
  text-align: left;
  border: 4px solid rgb(162, 199, 221);
  margin: 30px;
  padding: 25px;
  height: 190px;
}
.lesson-text{
  padding: 10px;
  margin-bottom: 400px;
}
.error {
  background-color: brown;
  padding: 25px;
  color: white;
}
input[name="search-box"]{
    display: block;
    margin: 2rem auto;
    max-width: 500px;
    width: 95%;
    padding: 0.5rem 1rem;
}
</style>
