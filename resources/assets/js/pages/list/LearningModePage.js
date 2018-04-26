import React, { Component } from 'react'

import LearningModeForm from './LearningModeForm'

import { escapeHTML } from '../../lib/escapeHTML'

export default class LearningModePage extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      words: [],
      wordToFind: [],
      showSolution: false,
      icon: null
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleResultIcon = this.toggleResultIcon.bind(this)
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
    let goodAnswer = input.toLowerCase() === wordToFind['word']
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
          showSolution: false,
          icon: true
        })
      }
    } else {
      let newWordToFind = this.chooseRandomWord(words)
      this.setState({
        wordToFind: newWordToFind,
        icon: false
      })
    }
  }

  showSolution () {
    this.setState({
      showSolution: true
    })
  }

  toggleResultIcon () {
    this.setState({
      icon: null
    })
  }

  quit () {
    this.props.switchLearnMode()
  }

  render () {
    let { showSolution, words, wordToFind, icon } = this.state
    if (words !== undefined && words.length > 0) {
      return (
        <div className='LearningModePage'>
          <div className='Learn-Form'>
            <p>
              {escapeHTML(wordToFind['translation'])} ?
            </p>
            <LearningModeForm handleSubmit={this.handleSubmit} toggleResultIcon={this.toggleResultIcon} />
            <p className='ResultIcon'>
              {
                icon !== null
                ? <i
                  className={'fa fa-' + (icon ? 'check' : 'times')}
                />
                : '...'
              }
            </p>
          </div>
          <div className='Learn-Solution'>
            <a onClick={() => { this.showSolution() }}>Solution</a>
            <div className={'Learn-Solution-Word ' + (showSolution && 'Learn-Solution-Word_show')}>
              {escapeHTML(wordToFind['word'])}
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
