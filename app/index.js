'use strict'

const {forEach, kebabCase, camelCase, template} = require('lodash')
const Generator = require('yeoman-generator')
const askName = require('inquirer-npm-name')
const humanizeUrl = require('humanize-url')
const finepack = require('finepack')
const ghUser = require('gh-user')
const mkdirp = require('mkdirp')
const superb = require('superb')
const yosay = require('yosay')
const path = require('path')

const { capitalizeName, setupDependenciesVersions } = require('./helpers')

module.exports = class extends Generator {
  initializing () {
    this.licenseYear = new Date().getFullYear()
  }

  projectName () {
    this.log(yosay(`Initializing ${superb()} Project`))
    const cb = this.async()

    const promise = askName({
      name: 'name',
      message: 'Your project name',
      default: kebabCase(path.basename(process.cwd())),
      filter: kebabCase,
      validate: str => str.length > 0
    }, this)

    promise
      .then(answer => {
        const name = answer.name
        this.appName = name
        this.camelAppName = camelCase(name)
        this.capitalizeName = capitalizeName(this.appName)
        cb()
      })
  }

  setupPath () {
    if (path.basename(this.destinationPath()) !== this.appName) {
      this.log(
        `Your generator must be inside a folder named ${this.appName}\n
        I'll automatically create this folder.`
      )
      mkdirp(this.appName)
      this.destinationRoot(this.destinationPath(this.appName))
    }
  }

  questions () {
    const cb = this.async()

    const promise = this.prompt([{
      name: 'appDescription',
      message: 'A short description of your project',
      default: "I'm a lazy"
    }, {
      name: 'keywords',
      message: 'Throw here some keywords of your project!'
    }, {
      name: 'userLogin',
      message: 'Would you mind telling me your username on GitHub?',
      default: 'someone'
    }])

    promise.then(props => {
      this.appDescription = props.appDescription
      this.keywords = props.keywords ? props.keywords.trim().split(' ') : []
      this.userLogin = props.userLogin
      cb()
    })
  }

  userInfo () {
    const cb = this.async()
    const promise = ghUser(this.userLogin)

    promise.then(user => {
      this.userName = user.name
      this.userEmail = user.email || this.user.git.email()
      this.userUrl = user.blog
      this.githubUrl = user.html_url
      this.humanizeUserUrl = this.userUrl ? humanizeUrl(this.userUrl) : this.userUrl
      cb()
    })
  }

  copyFiles () {
    forEach([
      '.bumpedrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.npmrc',
      '.travis.yml',
      'LICENSE.md',
      'README.md'
    ], filename => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename),
        this
      )
    })
  }

  copyDirectories () {
    forEach([
      '.storybook',
      'stories'
    ], dir => {
      this.fs.copy(
        this.templatePath(dir),
        this.destinationPath(dir),
        this
      )
    })
  }

  dependenciesVersion () {
    const cb = this.async()
    this.package = this.fs.read(this.templatePath('package.json'))
    this.package = template(this.package)(this)
    this.package = JSON.parse(this.package)

    setupDependenciesVersions(this.package)
      .then(newPkg => {
        this.package = newPkg
        cb()
      })
  }

  writePackage () {
    const cb = this.async()

    finepack(this.package, {
      validate: false,
      color: false
    }, (err, packageFormated) => {
      if (err) cb(err)
      this.fs.writeJSON(this.destinationPath('package.json'), packageFormated)
      cb()
    })
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    const repoSSH = `git@github.com:${this.userLogin}/${this.appName}.git`
    this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH])

    this.installDependencies({ bower: false })
  }
}
