import React from 'react'
import styled, {css} from 'styled-components'
import {storiesOf} from '@storybook/react'

import centered from '@storybook/addon-centered'

import MyLibrary from '..'

storiesOf('MyLibrary', module)
  .addDecorator(centered)
  .addWithJSX('default', () => <ClapButton />)
