import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

const API_ENDPOINT = "https://script.google.com/~";

class HelloReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      inputText: "",
      isLoading: false
    };
  }
  render() {
    var list = this.state.list.map(a => <li key={"list" + a.index.toString()}>{a.text}</li>);
    return (
      <div>
        <div style={{ minHeight: 6 }}>{this.state.isLoading && <LinearProgress variant="query" />}</div>

        <TextField
          className="text-field"
          type="text"
          label="Input your text"
          value={this.state.inputText}
          onChange={this.changeText.bind(this)}
          variant="outlined"
        />

        <Button onClick={this.putData.bind(this)} variant="outlined" size="large" color="primary">
          PUT
        </Button>

        <br />

        <Button onClick={this.fetchData.bind(this)} variant="outlined" size="large" color="primary">
          FETCH
        </Button>

        <ol>{list}</ol>
      </div>
    );
  }

  async putData() {
    const url = API_ENDPOINT + `?message=${this.state.inputText}`;

    this.setState({ isLoading: true });
    try {
      await axios.get(url);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async fetchData() {
    this.setState({ isLoading: true });
    let response;
    try {
      response = await axios.get(API_ENDPOINT);
    } finally {
      this.setState({ isLoading: false });
    }

    const list = this.state.list.concat([]);
    const data = response.data;
    for (let i = 0; i < data.length; i++) {
      list.push({
        index: list.length,
        text: data[i].message
      });
    }
    this.setState({ list });
  }

  changeText(e) {
    const inputText = e.target.value;
    this.setState({ inputText });
  }
}

ReactDOM.render(<HelloReact />, document.getElementById("root"));
