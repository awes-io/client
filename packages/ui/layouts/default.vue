<template>
    <AwLayoutDefault :menu="menuItems">
        <template #default>
            <Nuxt />
        </template>
        <template #navbar>
            <button
                class="aw-button p-2 aw-button_md rounded-full ml-auto bg-muted"
            >
                <img
                    class="rounded-full w-12 h-12"
                    src="https://i.pinimg.com/originals/c5/f9/74/c5f974ac144391a830196f97a9130141.jpg"
                />
            </button>
        </template>
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
