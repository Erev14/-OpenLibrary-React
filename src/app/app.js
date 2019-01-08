import React, { Component } from "react";
import Heading from "./heading";
import Row from "./row";
var timeago = require("timeago.js");

class Headings extends Component {
  render() {
    return (
      <thead>
        <tr>
          {
            this.props.headings.map((heading, i) => {
              return <Heading key={i} heading={heading} />
            })
          }
        </tr>
      </thead>
    )
  }
}

class Rows extends Component {
  render() {
    return (
      <tbody>
        {
          this.props.data.map((row, i) => {
            return <Row change={row} key={i} />
          })
        }
      </tbody>
    )
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    setInterval(async () => {
      const res = await fetch("http://openlibrary.org/recentchanges.json?limit=3");
      const data = await res.json();
      const formatData = this.formatData(data);
      this.setState({ data: formatData });
    }, 1000);
  }

  formatData(data) {
    return data.map((data, i) => {
      return {
        "when": timeago.format(data.timestamp),
        "who": data.author.key.split("/")[2],
        "description": data.comment,
      }
    })
  }

  render() {
    return (
      <div className="container p-4">
        <h1>{this.props.title}</h1>
        <table className="table table-bordered">
          <Headings headings={this.props.headings} />
          <Rows data={this.state.data} />
        </table>
      </div>
    )
  }
}

export default App;