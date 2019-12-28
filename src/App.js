import React from 'react';
import './App.css';
import api from './api'
import PostView from './Components/PostView'

class App extends React.Component { // Class based

  constructor(props){
    super(props)
    this.state = { // State 
      title: ' ', // title 입력 값 
      content: ' ', // content 입력 값
      result: ' ',
    }
  }

  // handling Change Function
  handlingChange = (event) => { 
    this.setState({[event.target.name]: event.target.value}) // state 설정
  }

  
  handlingSubmit = async (event) => { // axios api를 통해서 실제 서버로 전송
    event.preventDefault() // event 기능 막는다, 특히 submit 새로고침 관련
    let result = await api.createPost({title : this.state.title, content : this.state.content})
    this.setState({title : this.state.title, content : this.state.content}) // state 설정
    this.getPosts()
    console.log("완료됨!", result)
  }

  handlingDelete = async (event) =>{
    let result = await api.deletePost()
  }

  getPosts(){
    let _results = api.getAllPosts()
    this.setState({results: _results})
  }

  render(){
    return (
      <div className="App">

        <div className="PostingSection">
          <h2> 대나무 숲 글 작성하기 </h2>

          <form onSubmit={this.handlingSubmit}>

            <input
              name="title" // name 설정
              value={this.state.title} // value 설정
              onChange={this.handlingChange} // 입력값이 변경될경우, handling될 함수
            />

            <textarea
              name="content"
              value={this.state.content} // value 설정
              onChange={this.handlingChange} // 입력값이 변경될경우, handling될 함수
            />

            <button type="submit"> 제출 </button> 
            {/* // submit button */}
          </form>
        </div>
          
        <div className="ViewSection">

          {
            this.state.results.map((post) =>
              <div>
                <PostView key={post.id} id={post.id} title={post.title}/>
                <button value={post.id} onClick={this.handlingDelete} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
