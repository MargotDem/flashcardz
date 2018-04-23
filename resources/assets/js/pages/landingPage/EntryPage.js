import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { withCookies } from 'react-cookie'
import axios from 'axios'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

class EntryPage extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      form: 'none'
    })
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleClick (form) {
    this.setState({
      form: form
    })
  }

  handleSubmit () {
    // const { cookies } = this.props
    // cookies.set('user', 'margot', { maxAge: 7200 })
    // window.location.reload()
    axios.get('http://localhost:3334/api/users')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleInputChange (e) {
    let field = e.target.name
    let value = e.target.value
    this.setState({
      [field]: value
    })
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSubmit()
    }
  }

  renderWelcomePage () {
    return (
      <div className='WelcomePage'>
        <h2>flashcardz</h2>
        <section>
          <MuiThemeProvider theme={theme}>
            <Button variant='raised' color='primary' onClick={() => { this.handleClick('login') }}>
              login
            </Button>
          </MuiThemeProvider>
          <a onClick={() => { this.handleClick('register') }}>register</a>
        </section>
      </div>
    )
  }

  renderConnectionForms () {
    let { form } = this.state
    // ew:
    let otherForm = form === 'register' ? 'login' : 'register'
    return (
      <div className='ConnectionForm'>
        <form>
          <input
            type='text'
            name='email'
            placeholder='Your email'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <input
            type='password'
            name='password'
            placeholder='Your password'
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <MuiThemeProvider theme={theme}>
            <Button variant='raised' color='primary' onClick={this.handleSubmit}>
              {
                form === 'register'
                ? 'register'
                : 'login'
              }
            </Button>
          </MuiThemeProvider>
        </form>
        <a onClick={() => { this.handleClick(otherForm) }}>
          {
            form === 'register'
            ? 'login'
            : 'register'
          }
        </a>
      </div>
    )
  }

  render () {
    let { form } = this.state
    return (
      <div>
        {
          form === 'none'
          ? this.renderWelcomePage()
          : this.renderConnectionForms()
        }
      </div>
    )
  }
}

export default withCookies(EntryPage)
