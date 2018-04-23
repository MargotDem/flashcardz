import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

export default class PageLayout extends Component {
  renderEntry (entry) {
    let { type } = this.props
    let name = entry.name.split(' ').join('-')
    return (
      <p key={entry.id}>
        <a className='entry-anchor' href={'#/' + type + '/' + name}>
          {entry.name}
        </a>
      </p>
    )
  }

  render () {
    let { type, backButton, title, editDeleteButtons, learnModeButton, entries } = this.props
    return (
      <div className='PageLayout'>
        {
          backButton && <section className='BackButton'>
            <a>back</a>
          </section>
        }

        <section>
          <div className='PageTitle'>
            <h2>
              {title}
            </h2>
          </div>

          {
            editDeleteButtons && <div className='EditDeleteButtons'>
              <a>edit</a>
              &nbsp;
              <a>delete</a>
            </div>
          }
        </section>

        <section className='AddButton'>
          <a>add a {type}</a>
        </section>

        <section>
          {
            learnModeButton && <MuiThemeProvider theme={theme}>
              <Button variant='raised' color='primary' onClick={() => { this.handleClick('login') }}>
                learn stuff
              </Button>
            </MuiThemeProvider>
          }
        </section>

        <section>
          {
            entries && entries.map((entry) => {
              return this.renderEntry(entry)
            })
          }
        </section>
      </div>
    )
  }
}
