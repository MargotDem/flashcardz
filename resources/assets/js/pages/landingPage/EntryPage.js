import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

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
  }
  renderWelcomePage () {
    return (
      <div className='WelcomePage'>
        <h2>FLASHCARDZ</h2>
        <section>
          <MuiThemeProvider theme={theme}>
            <Button variant='raised' color='primary'>
              Login
            </Button>
          </MuiThemeProvider>
          <a className=''>Register</a>
        </section>
      </div>
    )
  }

  renderConnectionForms () {
    // return
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

export default EntryPage
