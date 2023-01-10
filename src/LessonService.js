const url = 'http://localhost:5000/lessons/';


class LessonService {

    // Get Lessons
    static getLessons() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(url);
          const data = res.json();
          resolve(
            data
          );
        } catch (error) {
          reject(error);
        }
      });
    }
    
    // Create Lesson
    static insertLesson(text) {
      return fetch(url,{
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: text
        })
      })
    }
  
    // Delete Lesson
    static deleteLesson(id) {
      return fetch(`${url}${id}`, {
        method: 'DELETE'
      });
    }
  }
  
  export default LessonService;