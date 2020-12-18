import React, { Component } from "react";
import AceEditor from "react-ace";
// import Giveback from './OP';
import Tachyons from "tachyons/css/tachyons.min.css";
import "./App.css";
import axios from "axios";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3001/api")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
    this.setState({
      lanauge: "Select Lanauge",
    });
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#181A1B";
  }

  state = {
    code: "",
    results: "",
    lanauge: "",
  };

  handleRun = () => {
    var url = "http://localhost:3001/api/code";
    const codeData = this.state.code;
    const lanag=this.state.lanauge;
    let formData = new FormData();
    formData.append("code", codeData);
    formData.append("lanauge",lanag);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(formData);
    axios
      .post(url, formData, config)
      .then((response) => {
        var temp = response.data.codeoutput;
        this.setState({
          results: temp.toString(),
        });
        console.log(temp);
      })
      .catch((error) => {
        console.log("problem in sending code to server");
      });
  };

  handleLanaugeChange = (str) => {
    this.setState({
      lanauge: str,
    });
  };

  handleChange = (newVal) => {
    this.setState({
      code: newVal,
    });
  };

  render() {
    return (
      <div>
        <div class="flex justify-between">
          <h3 className="ma2 pa2" style={{ color: "#CFCDCB" }}>
            Talk is cheap , show me the code
          </h3>
          <p className="ma2 pa2" style={{ color: "#CFCDCB" }}>
            This was made by Hiten Sharma
          </p>
        </div>
        <div class="flex">
          <AceEditor
            className="outline w-25 pa3 mr2 ma2"
            mode="javascript"
            width="1000px"
            height="500px"
            theme="monokai"
            onChange={this.handleChange}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
          <div class="flex flex-column-reverse">
            <AceEditor
              placeholder="Output will be shown here"
              mode="text"
              theme="dracula"
              name="code-results"
              value={this.state.results}
              showPrintMargin={false}
              showGutter={false}
              highlightActiveLine={false}
              readOnly={true}
              editorProps={{ $blockScrolling: true }}
              width="500px"
              height="200px"
              className="ba bw1 w-25 pa3 mr2 ma2"
            />
            <div class=" ma2">
              <div class="dropup">
                <button class="dropbtn">{this.state.lanauge}</button>
                <div class="dropup-content">
                  <a onClick={() => this.handleLanaugeChange("javascript")}>
                    javascript
                  </a>
                  <a onClick={() => this.handleLanaugeChange("python")}>
                    Python
                  </a>
                  <a onClick={() => this.handleLanaugeChange("CPP")}>
                    C++(will add soon!)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={this.handleRun}
          style={{ color: "#181A1B" }}
          className="f6 link dim ba bw2 ph3 pv2 mb2"
        >
          RUN CODE
        </button>
      </div>
    );
  }
}

export default App;
