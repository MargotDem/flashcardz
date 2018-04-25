import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import AddForm from './AddForm'
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

export default class PageLayout extends Component {
  renderEntry (entry) {
    let { type, folderListState, changeFolderListState } = this.props
    let name = type !== 'word' && entry.name.split(' ').join('-')
    return (
      <p key={entry.id}>
        {
          type === 'word'
          ? <span>
            {entry.word}
            :&nbsp;
            {entry.translation}
            &nbsp;
            <EditForm wordId={entry.id} />
            &nbsp;
            &bull;
            &nbsp;
            <DeleteForm wordId={entry.id} />
          </span>
          : <a
            className='entry-anchor'
            href={'#/' + type + '/' + name}
            onClick={() => { changeFolderListState(type, entry.id, (type === 'folder' ? entry.name : folderListState.folderName)) }}
            >
            {entry.name}
          </a>
        }
      </p>
    )
  }

  handleBackClick () {
    window.history.back()
  }

  render () {
    let { page, type, backButton, title, id, editDeleteButtons, learnModeButton, switchLearnMode, entries, fetchEntries, folderListState } = this.props
    return (
      <div className='PageLayout'>
        {
          backButton && <section className='BackButton'>
            <a onClick={() => { this.handleBackClick() }}>back</a>
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
              <EditForm page={page} id={id} fetchEntries={fetchEntries} />
              &nbsp;
              &bull;
              &nbsp;
              <DeleteForm page={page} id={id} folderListState={folderListState} />
            </div>
          }
        </section>

        <section className='AddButton'>
          <AddForm type={type} id={id} fetchEntries={fetchEntries} />
        </section>

        <section>
          {
            learnModeButton && <MuiThemeProvider theme={theme}>
              <Button variant='raised' color='primary' onClick={() => { switchLearnMode() }}>
                learn that list
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
