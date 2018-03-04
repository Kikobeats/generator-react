# <%= appName %>

<p align="center">
  <br>
  <img src="https://i.imgur.com/Mh13XWB.gif" alt="<%= appName %>">
  <br>
</p>

![Last version](https://img.shields.io/github/tag/<%= userLogin %>/<%= appName %>.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/<%= userLogin %>/<%= appName %>/master.svg?style=flat-square)](https://travis-ci.org/<%= userLogin %>/<%= appName %>)
[![Coverage Status](https://img.shields.io/coveralls/<%= userLogin %>/<%= appName %>.svg?style=flat-square)](https://coveralls.io/github/<%= userLogin %>/<%= appName %>)
[![Dependency status](https://img.shields.io/david/<%= userLogin %>/<%= appName %>.svg?style=flat-square)](https://david-dm.org/<%= userLogin %>/<%= appName %>)
[![Dev Dependencies Status](https://img.shields.io/david/dev/<%= userLogin %>/<%= appName %>.svg?style=flat-square)](https://david-dm.org/<%= userLogin %>/<%= appName %>#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/<%= appName %>.svg?style=flat-square)](https://www.npmjs.org/package/<%= appName %>)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/<%= userLogin %>)

**NOTE:** more badges availables in [shields.io](https://shields.io/)

> <%= appDescription %>

**Project Checklist**

- [ ] Integrate with travis
- [ ] Integrate Storybook with Netlify.

## Install

```bash
$ npm install <%= appName %> --save
```

## Usage

```js
const <%= camelAppName %> = require('<%= appName %>')

<%= camelAppName %>('do something')
//=> return something
```

## API

### <%= camelAppName %>(input, [options])

#### input

*Required*<br>
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

**<%= appName %>** © [<%= userName %>](<%= userUrl %>), released under the [MIT](https://github.com/<%= userLogin %>/<%= appName %>/blob/master/LICENSE.md) License.<br>
Authored and maintained by <%= userName %> with help from [contributors](https://github.com/<%= userLogin %>/<%= appName %>/contributors).

> [<%= humanizeUserUrl %>](<%= userUrl %>) · GitHub [<%= userName %>](https://github.com/<%= userLogin %>) · Twitter [@<%= userLogin %>](https://twitter.com/<%= userLogin %>)
