import { setAddon, configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import JSXAddon from 'storybook-addon-jsx'

const { name, homepage: url } = require('../pkg')

function loadStories () {
  require('../stories')
}

setAddon(JSXAddon)

setOptions({
  name,
  url,
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: false
})

configure(loadStories, module)
