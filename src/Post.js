import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  state = {
    skills: "",
    person : {
        id : 0,
        name : '',
        surname :'',
        skills : []
      },
      folks : []
  };

  onSkillsChange = e => {
    this.setState({
      skills: e.target.value
    });
  };

  onBodyChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      skills: this.state.skills,
      body: this.state.body
    };
    var params = new URLSearchParams();
    params.append('skills', this.state.skills);
    axios
      .post("http://localhost:8080/v1/api/resumes", params)
      .then(res => {
          this.setState ({folks : res.data})
      })
      .catch(err => console.log(err));
  };
  showMedia = (props) => {
    const { alienId } = this.props;
    return (
        <div> {props.folks.length > 0 &&
             <div>
            {(props.folks.map ((person,i) => 
            <ol key ={i}>
                <li > Name : {person.name}</li>
                <li> Surname : {person.surname}</li>
                <li> Gender : {person.gender}</li>
                {<li>Skills: <select>
                    {(person.skills.map ((skill,j)=>
                     <option key={j}>{skill}</option>
                    ))}
                </select></li> }
            </ol> 
            ))}
                    </div>
            }
        </div>
    );
}

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Skills (space sparated)" value={this.state.skills}
            onChange={this.onSkillsChange} required
          />
          <button type="submit">Find People</button>
        </form>
     <div>  {this.showMedia(this.state)} </div>

      </div>
    
    );
  }
}

export default Post;