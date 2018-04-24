import React, { Component } from 'react'

export default class LearningModePage extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      input: '',
      words: [],
      wordToFind: []
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount () {
    let { words } = this.props
    let wordToFind = this.chooseRandomWord(words)
    this.setState({
      words: words,
      wordToFind: wordToFind
    })
  }

  chooseRandomWord (words) {
    let wordToFind = []
    let randomNumber = Math.floor(Math.random() * Math.floor(words.length))
    wordToFind['word'] = words[randomNumber]['word']
    wordToFind['translation'] = words[randomNumber]['translation']
    return wordToFind
  }

  handleSubmit () {
    let { words, wordToFind, input } = this.state
    if (input === wordToFind['word']) {
      if (words.length === 1) {
        this.setState({
          words: []
        })
      } else {
        words = words.filter(word => {
          return word['word'] !== wordToFind['word'] || word['translation'] !== wordToFind['translation']
        })
        wordToFind = this.chooseRandomWord(words)
        this.setState({
          words: words,
          input: '',
          wordToFind: wordToFind
        })
      }
    } else {
      wordToFind = this.chooseRandomWord(words)
      this.setState({
        words: words,
        input: '',
        wordToFind: wordToFind
      })
    }
  }

  // ewwww anti-separation of concerns
  handleInputChange (e) {
    let value = e.target.value
    this.setState({
      input: value,
      showSolution: false
    })
    this.showSolution = this.showSolution.bind(this)
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit()
    }
  }

  showSolution () {
    console.log('lets show the solution yall')
    this.setState({
      showSolution: true
    })
  }

  quit () {
    this.props.switchLearnMode()
  }

  render () {
    let { showSolution, words, input, wordToFind } = this.state
    if (words !== undefined && words.length > 0) {
      return (
        <div className='LearningModePage'>
          <div className='Learn-Form'>
            <p>{wordToFind['translation']} ?</p>
            <form>
              <input
                type='text'
                name='word'
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                value={input}
              />
            </form>
          </div>
          <div className='Learn-Solution'>
            <a onClick={() => { this.showSolution() }}>Solution</a>
            <div className={'Learn-Solution-Word ' + (showSolution && 'Learn-Solution-Word_show')}>
              {wordToFind['word']}
            </div>
          </div>
          <div className='Learn-Quit'>
            <a onClick={() => { this.quit() }}>Quit</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className='LearningModePage'>
          <div className='Learn-Form'>
            Done !
          </div>
          <div className='Learn-Quit'>
            <a onClick={() => { this.quit() }}>Go back</a>
          </div>
        </div>
      )
    }
  }
}
