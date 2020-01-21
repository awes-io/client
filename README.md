<p align="center">
    <a href="https://www.awes.io/?utm_source=github&utm_medium=awes-io/client" target="_blank" rel="noopener noreferrer">
        <img width="100" src="https://static.awes.io/promo/Logo_sign_color.svg" alt="Awes.io logo">
    </a>
</p>

<h1 align="center">Client</h1>

> <p align="center">The Awes.io Frontend Framework. Сonsists of UI, Profile, Auth and else.</p>


<p align="center">
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/package-json/v/awes-io/client/master" alt="Last version" >
    </a>
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/license/awes-io/form-builder.svg" alt="License" />
    </a>
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields" target="_blank">
        <img src="https://static.pkgkit.com/badges/vuejs.svg" alt="vue" />
    </a>
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/last-commit/awes-io/client.svg" alt="Last commit" />
    </a>
    <a href="https://github.com/awes-io/awes-io">
        <img src="https://ga-beacon.appspot.com/UA-134431636-1/awes-io/form-builder" alt="Analytics" />
    </a>
    <a href="https://www.pkgkit.com/?utm_source=github&amp;utm_medium=shields">
        <img src="https://www.pkgkit.com/badges/hosted.svg" alt="Hosted by Package Kit" />
    </a>
    <a href="https://www.patreon.com/join/awesdotio">
        <img src="https://static.pkgkit.com/badges/patreon.svg" alt="Patreon" />
    </a>
</p>

##

#### Content
1. 📦 [Packages](#packages)
2. 🌱 [Local installation](#how-to-install-client-to-your-local-machine)
3. 📖 [How build a new component for UI](#how-build-a-new-component-for-ui)
4. 🎉 [Release new versions](#release-new-versions)

## Packages

| Package | Version | Downloads |
|-----------------------|---------|-----------|
| [@awes-io/ui](https://www.npmjs.com/package/@awes-io/ui) | ![@awes-io/ui](https://img.shields.io/npm/v/@awes-io/ui) | ![@awes-io/ui](https://img.shields.io/npm/dm/@awes-io/ui) |
| [@awes-io/nuxt-auth](https://www.npmjs.com/package/@awes-io/nuxt-auth) | ![@awes-io/nuxt-auth](https://img.shields.io/npm/v/@awes-io/nuxt-auth) | ![@awes-io/nuxt-auth](https://img.shields.io/npm/dm/@awes-io/nuxt-auth) |
| [@awes-io/nuxt-profile](https://www.npmjs.com/package/@awes-io/nuxt-profile) | ![@awes-io/nuxt-profile](https://img.shields.io/npm/v/@awes-io/nuxt-profile) | ![@awes-io/nuxt-profile](https://img.shields.io/npm/dm/@awes-io/nuxt-profile) |

## How to install `client` to your local machine

```bash
# clone the repo
git clone git@github.com:awes-io/client.git

# go to project dir
cd ./client

# install all packages
yarn install

# init the lerna
lerna bootstrap
```

## Examples

### Basic UI in `dev` mode
```bash
yarn dev:eg:basic-ui
```

## Components

### UI Interfaces

```bash
yarn dev:ui
```


## Release new versions

```bash
# commit your changes into feature|bug branch
git add .

# please use commit conventional https://www.conventionalcommits.org/en/v1.0.0-beta.2/
git commit -m "COMMIT_MESSAGE"

# deploy system rest will build automaticly
git push origin YOUR_BRANCH
```

#### For manual version update use
```bash
lerna publish
```
