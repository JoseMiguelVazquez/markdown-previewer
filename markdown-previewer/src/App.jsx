import { useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import './App.css'

function App () {
  const DEFAULT = `
  # Welcome to my React Markdown Previewer!
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!

  And if you want to get really crazy, even tables:

  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`

  const [text, setText] = useState(DEFAULT)
  marked.use({
    gfm: true,
    breaks: true,
    mangle: false,
    headerIds: false
  })

  return (
    <>
      <div className='container d-flex flex-column justify-content-center my-3'>
        <h1 className='text-center'>Markdown Previewer</h1>
        <hr />
        <h3>How to use:</h3>
        <ol>
          <li>Type in GitHub flavored markdown on the editor</li>
          <li>See the live updates on the preview</li>
        </ol>
        <div className='accordion w-100 mb-3 shadow' id='accordion'>
          <div className='accordion-item section'>
            <h2 className='accordion-header'>
              <button className='accordion-button fs-2 fw-semibold' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                Editor
              </button>
            </h2>
            <div id='collapseOne' className='accordion-collapse collapse show' data-bs-parent='#accordion'>
              <div className='accordion-body'>
                <textarea
                  className='w-100 form-control'
                  name='editor'
                  id='editor'
                  rows='10'
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-100 border rounded shadow bg-light section'>
          <h2 className='bg-primary-subtle rounded-top px-4 py-3'>Preview</h2>
          <div
            className='w-100 p-4'
            id='preview'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(text)) }}
          />
        </div>
      </div>
    </>
  )
}

export default App
