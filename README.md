## Local development

```bash
# install all packages
yarn install

# init the lerna
lerna bootstrap
```

### Run development mode for Awes.io/Ui
```bash
lerna run dev --scope @awes-io/ui
```

### Run development mode for Basic Ui example 
```bash
lerna run dev --scope basic-ui
```


## Release a new version

```bash
lerna publish
```