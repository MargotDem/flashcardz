import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { withCookies } from 'react-cookie'

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
  }

  handleClick (form) {
    this.setState({
      form: form
    })
  }

  handleSubmit () {
    const { cookies } = this.props
    cookies.set('user', 'margot', { maxAge: 7200 })
    window.location.reload()
  }

  handleInputChange (e) {
    let field = e.target.name
    let value = e.target.value
    this.setState({
      [field]: value
    })
  }

  renderWelcomePage () {
    return (
      <div className='WelcomePage'>
        <h2>FLASHCARDZ</h2>
        <section>
          <MuiThemeProvider theme={theme}>
            <Button variant='raised' color='primary' onClick={() => { this.handleClick('login') }}>
              Login
            </Button>
          </MuiThemeProvider>
          <a onClick={() => { this.handleClick('register') }}>Register</a>
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
          <input type='text' name='email' placeholder='Your email' onChange={this.handleInputChange} />
          <input type='password' name='password' placeholder='Your password' onChange={this.handleInputChange} />
          <MuiThemeProvider theme={theme}>
            <Button variant='raised' color='primary' onClick={this.handleSubmit}>
              {
                form === 'register'
                ? 'Register'
                : 'Login'
              }
            </Button>
          </MuiThemeProvider>
        </form>
        <a onClick={() => { this.handleClick(otherForm) }}>
          {
            form === 'register'
            ? 'Login'
            : 'Register'
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
