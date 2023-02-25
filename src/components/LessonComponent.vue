<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <img src="/img/icons/android-chrome-192x192.png" alt="" class="image-size">
    <input type="text" name="search-box" placeholder="Search by location..." @keyup="search" />
    <section class="d-flex justify-content-center ">
      <p class="error" v-if="error">{{ error }}</p>
      <div class="row justify-content-center">
        <div v-for="(lesson, index) in state.searchResults" v-bind:item="lesson" v-bind:index="index" v-bind:key="lesson._id" class="d-flex justify-content-center col-md-4" >
          <div class="card set-border" style="width: 24rem;">
            <div class="card-body">
              <h5 class="card-title">
                <div class="row">
                  <div class="col">
                    <ul class="set-alignment-left">
                      <li> topic: {{ lesson.topic }} </li>
                      <li> location:  {{ lesson.location }} </li>
                      <li> price: {{ lesson.price }} </li>
                      <li> space: {{ lesson.space }} </li>
                    </ul>
                  </div>
                  <div class="col set-alignment-right">
                    <img v-bind:src="lesson.pic" class="image-size" />
                  </div>
                </div>
              </h5>
              <div class="d-flex justify-content-center">
                <button class="cart-button" v-on:click="updatelesson(lesson)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container m-auto mt-4" v-if="state.number_of_space > 0">
      <div class="form-padding border mt-4">
        <div class="form-group">
          <label class="m-4"> Order Information</label>
          <input type="text" class="form-control m-2" v-model="state.name" placeholder="Enter Your Name...">
        </div>
        <div class="form-group">
          <input type="number" class="form-control m-2" v-model="state.phone_number" placeholder="Enter Your Phone Number...">
        </div>
        <div class="form-group">
          <label class="form-control m-2 text-start">Total Spaces: <span class="text-muted"> {{ this.state.number_of_space }} </span></label>
        </div>
        <button type="submit" class="btn btn-lg btn-success mt-3" v-on:click="createOrder(state.name, state.phone_number, state.lesson_id, state.number_of_space)" v-bind:disabled="state.name == ''" >Submit Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import LessonService from '../LessonService';
import {reactive} from 'vue';

export default {

  name: 'LessonComponent',
  data() {
    return {
      error: '',
      text: ''
    }
  },
  setup(){
    const state = reactive({
      searchResults: [],
      name: '',
      phone_number: 0,
      lesson_id: '',
      number_of_space: 0
    });

    function search(e){
      let search = e.target.value.trim();
      fetch('//express-env.eba-bitp3hp2.ap-northeast-1.elasticbeanstalk.com/search/',{
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          search
        })
      }).then(res => {
        res.clone().json().then( resp => {
          state.searchResults = resp
        })
      });
    }

    async function updatelesson(specificLesson){
      if (specificLesson.space < 1){
        alert('Not enough available space')
        return;
      }
      await LessonService.updateLesson(specificLesson._id)
      this.state.number_of_space += 1
      this.state.lesson_id = specificLesson._id
      this.state.searchResults = await LessonService.getLessons();
      alert('Data updated')
    }

    function createOrder(name, phone_number, lesson_id, number_of_space){
      fetch('//express-env.eba-bitp3hp2.ap-northeast-1.elasticbeanstalk.com/orders/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone_number,
          lesson_id,
          number_of_space
        })
      })
      alert('Order Created')
      this.state.number_of_space = 0

    }

    return {search, state, updatelesson, createOrder}
  },
  async created() {
    try {
      this.state.searchResults = await LessonService.getLessons();
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
  font-size: 15px;
  margin: 5px;
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
.image-size{
  height: 60px;
  width: 60px;
}
.form-padding{
  padding-left: 30%;
  padding-right: 30%;
}
.cart-button {
  padding: 4px 10px 4px 10px;
  background-color: #547dd4;
  color: white;
  font-weight: bold;
  border: 2px solid rgb(114, 114, 114);
}
.set-border {
  border: 4px solid rgb(162, 199, 221);
}
.set-alignment-left {
  text-align: left;
}
.set-alignment-right {
  text-align: right;
}
</style>