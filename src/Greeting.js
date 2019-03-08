import React, { Component } from 'react';

class Greeting extends Component {
  state = {
    text: ''
  };
  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <input
          placeholder="이름을 입력하세요"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <h1>안녕하세요, {text}</h1>
      </div>
    );
  }
}

export default Greeting;
