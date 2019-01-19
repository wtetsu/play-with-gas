import React from "react";
import ReactDOM from "react-dom";

class HelloReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{ index: 0, text: "リスト0" }, { index: 1, text: "リスト1" }, { index: 2, text: "リスト2" }],
      inputText: ""
    };
  }
  render() {
    var list = this.state.list.map(a => <li key={"list" + a.index.toString()}>{a.text}</li>);
    return (
      <div>
        <h1>Hello React!!</h1>
        <input type="text" value={this.state.inputText} placeholder="write a comment..." onChange={this.changeText.bind(this)} />
        <button onClick={this.buttonPushed.bind(this)}>push me!</button>
        <ol>{list}</ol>
      </div>
    );
  }
  buttonPushed(e) {
    this.state.list.push({
      index: this.state.list.length,
      text: this.state.inputText
    });
    this.setState(this.state);
  }
  changeText(e) {
    this.state.inputText = e.target.value;
    this.setState(this.state);
  }
}

ReactDOM.render(<HelloReact />, document.getElementById("root"));
