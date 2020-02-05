<p align="center">
    <a href="https://www.awes.io/?utm_source=github&utm_medium=awes-io/resize" target="_blank" rel="noopener noreferrer">
        <img width="100" src="https://static.awes.io/promo/Logo_sign_color.svg" alt="Awes.io logo">
    </a>
</p>

<h1 align="center">Cloudflare Image Resizing</h1>

> <p align="center">Simple API for URL generation.</p>


<p align="center">
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/package-json/v/awes-io/resize/master" alt="Last version" >
    </a>
    <a href="https://www.awes.io/?utm_source=github&amp;utm_medium=shields">
        <img src="https://img.shields.io/github/license/awes-io/resize.svg" alt="License" />
    </a>
    <a href="https://github.com/awes-io/awes-io">
        <img src="https://ga-beacon.appspot.com/UA-134431636-1/awes-io/resize" alt="Analytics" />
    </a>
</p>


### Setup
```bash
yarn add @awes-io/resize # yarn 
npm i @awes-io/resize # npm 
```

### Basic use

```javascript
import resize from '@awes-io/resize'

// get the image with width 640px
resize('https://example.com/images/example.jpg', 640)

// result: https://example.com/cdn-cgi/image/w=640,q=75/images/example.jpg
```

### Method

```javascript
// URL generation with parameters for resizing
resize(url, width = null, options = null)
```

### Options

| Name             | Type     | Default | Description                                           |
| ---------------- | -------- | ------- | ----------------------------------------------------- |
| url              | `String` | -       | Link to the original image.                           |
| width            | `Number` | null    | (Optional) Width of the image, undefined by default.  |
| options          | `Object` | null    | (Optional) List of options for modify parameters for image. More info: https://developers.cloudflare.com/images/about/  |


### Cloudflare Image Resizing Documentation
- [https://developers.cloudflare.com/images/about/](https://developers.cloudflare.com/images/about/)


Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
