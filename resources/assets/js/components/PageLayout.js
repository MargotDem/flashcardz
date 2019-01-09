import React, { Component } from 'react'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import AddForm from './AddForm'
import DeleteForm from './DeleteForm'
import EditForm from './EditForm'

import { escapeHTML } from '../lib/escapeHTML'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

export default class PageLayout extends Component {
  renderEntry (entry) {
    let {
      type,
      folderListState,
      changeFolderListState,
      fetchEntries
    } = this.props

    let name = type !== 'word' && entry.name.split(' ').join('-')

    return (
      <p key={entry.id}>
        {
          type === 'word'
          ? <span>
            {escapeHTML(entry.word)}
            :&nbsp;
            {escapeHTML(entry.translation)}
            &nbsp;
            <EditForm
              wordId={entry.id}
              fetchEntries={fetchEntries}
              word={entry.word}
              translation={entry.translation}
            />
            &nbsp;
            &bull;
            &nbsp;
            <DeleteForm wordId={entry.id} fetchEntries={fetchEntries} />
          </span>
          : <a
            className='entry-anchor'
            href={'#/' + type + '/' + name}
            onClick={() => {
              changeFolderListState(
                type,
                entry.id,
                (type === 'folder'
                ? escapeHTML(entry.name)
                : folderListState.folderName)
              )
            }}
            >
            {escapeHTML(entry.name)}
          </a>
        }
      </p>
    )
  }

  handleBackClick () {
    let { folderListState, page } = this.props
    if (page === 'list') {
      window.location = '/#/folder/' + folderListState.folderName.split(' ').join('-')
    } else {
      window.location = '/#/folders'
    }
  }

  render () {
    let {
      page,
      type,
      backButton,
      title,
      id,
      editDeleteButtons,
      learnModeButton,
      switchLearnMode,
      entries,
      fetchEntries,
      folderListState
    } = this.props

    return (
      <div className='PageLayout'>
        {
          backButton && <section>
            <a onClick={() => { this.handleBackClick() }}>back</a>
          </section>
        }

        <section>
          <h2>
            {escapeHTML(title)}
          </h2>

          {
            editDeleteButtons && <div className='EditDeleteButtons'>
              <EditForm
                page={page}
                id={id}
                fetchEntries={fetchEntries}
              />
              &nbsp;
              &bull;
              &nbsp;
              <DeleteForm
                page={page}
                id={id}
                folderListState={folderListState}
                fetchEntries={fetchEntries}
              />
            </div>
          }
        </section>

        <section>
          <AddForm type={type} id={id} fetchEntries={fetchEntries} />
        </section>

        <section>
          {
            learnModeButton && <MuiThemeProvider theme={theme}>
              <Button
                variant='raised'
                color='primary'
                onClick={() => { switchLearnMode() }}
              >
                learn that list
              </Button>
            </MuiThemeProvider>
          }
        </section>

        <section>&hellip;</section>

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
