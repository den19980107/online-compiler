import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import marked from "marked";
import './markdown.css'
class Document extends Component {
   state = {
      markdown: ""
   }
   componentDidMount() {
      const readmePath = require("./doc.md");

      fetch(readmePath)
         .then(response => {
            return response.text()
         })
         .then(text => {
            this.setState({
               markdown: marked(text)
            })
         })
   }
   render() {
      return (
         <div className="container pt-4">
            <ReactMarkdown
               source={this.state.markdown}
               escapeHtml={false}
            />
         </div>
      );
   }
}

export default Document;