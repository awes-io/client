# Awes.io Models and Collections abstract layer

Based on [VueMC](https://vuemc.io/)

## Basic usage

1. Ensure you are using [@nuxtjs/axios](https://axios.nuxtjs.org/) in your project
2. Import your `BaseModel` and `BaseCollection` from this package

```javascript
import { BaseModel, BaseCollection } from '@awes-io/collection'

class Todo extends BaseModel {
    defaults() {
        return {
            id: null,
            done: false
        }
    }
}

class Todos extends BaseCollection {
    model() {
        return Todo
    }
}

export default Todos
```

## Build for production

```bash
$ yarn build
```

Ensure to write proper commit message according to [Git Commit convention](https://www.conventionalcommits.org/)
