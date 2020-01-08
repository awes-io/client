<template>
    <AwLayoutDefault :menu="menuItems">
        <Nuxt />
    </AwLayoutDefault>
</template>

<script>
import { ucFirst } from '../assets/js/string'

const getName = (children = []) => {
    const empty = children.find(({ path }) => !path)
    return empty && empty.name
}

const toMenuItem = (path, name = '', parentPath = '') => {
    const routeName = name.split('___')[0].replace(/-/g, ' ')

    return {
        text: ucFirst(routeName),
        href: parentPath + (parentPath ? '/' : '') + path
    }
}

export default {
    name: 'default',

    computed: {
        menuItems() {
            return this.$router.options.routes.map(
                ({ path: parentPath, name, children }) => ({
                    key: name,
                    props: toMenuItem(parentPath, name || getName(children)),
                    children:
                        children &&
                        children.reduce(
                            (acc, { path, name, children: subChildren }) =>
                                path
                                    ? acc.concat({
                                          key: path,
                                          props: toMenuItem(
                                              path,
                                              name || getName(subChildren),
                                              parentPath
                                          )
                                      })
                                    : acc,
                            []
                        )
                })
            )
        }
    }
}
</script>
