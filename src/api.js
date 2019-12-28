import axios from "axios"

/* Making Bamboo Forest */

axios.defaults.baseURL = "127.0.0.1:8000/api"

export default{
    createPost(data){
        console.log(axios.defaults.baseURL + "/posts")

        return axios.post('/posts/', data)
    },

    deletePost(id){
        return axios.delete('/posts/'+String(id));
    },

    getAllPosts(){
        return axios.get('/posts/')
    },
}