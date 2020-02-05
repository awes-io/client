# Simple library to generate URL to Cloudflare Image Resizing

### Examples

```javascript
import { resize } from '@awes-io/resize'

// get the image with width 640px
resize('https://example.com/images/example.jpg', 640)

// returns: https://example.com/cdn-cgi/image/w=640,q=75/images/example.jpg
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

Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
