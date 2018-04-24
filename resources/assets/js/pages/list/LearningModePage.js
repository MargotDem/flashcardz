import React, { Component } from 'react'

import LearningModeForm from './LearningModeForm'

export default class LearningModePage extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      words: [],
      wordToFind: [],
      showSolution: false
    })
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit (input) {
    let { words, wordToFind } = this.state
    let goodAnswer = input === wordToFind['word']
    let itWasTheLastWord = words.length === 1

    if (goodAnswer) {
      if (itWasTheLastWord) {
        this.setState({
          words: []
        })
      } else {
        let newWords = words.filter(word => {
          return word['word'] !== wordToFind['word'] || word['translation'] !== wordToFind['translation']
        })

        let newWordToFind = this.chooseRandomWord(newWords)

        this.setState({
          words: newWords,
          wordToFind: newWordToFind,
          showSolution: false
        })
      }
    } else {
      let newWordToFind = this.chooseRandomWord(words)
      this.setState({
        wordToFind: newWordToFind
      })
    }
  }

  showSolution () {
    this.setState({
      showSolution: true
    })
  }

  quit () {
    this.props.switchLearnMode()
  }

  render () {
    let { showSolution, words, wordToFind } = this.state
    if (words !== undefined && words.length > 0) {
      return (
        <div className='LearningModePage'>
          <div className='Learn-Form'>
            <p>{wordToFind['translation']} ?</p>
            <LearningModeForm handleSubmit={this.handleSubmit} />
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
