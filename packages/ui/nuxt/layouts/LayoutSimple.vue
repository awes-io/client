<template>
    <AwLayoutSimple :menu="menuItems">
        <Nuxt />
    </AwLayoutSimple>
</template>

<script>
import layoutMixin from './layout-mixin'

export default {
    name: 'simple',

    mixins: [layoutMixin],

    data() {
        return {
            menuItems: [
                {
                    key: 'home',
                    order: 1,
                    props: {
                        tag: 'li',
                        text: 'Home',
                        icon: 'home',
                        href: '/'
                    }
                },
                {
                    key: 'accounting',
                    order: 2,
                    props: {
                        tag: 'li',
                        text: 'Accounting',
                        icon: 'home',
                        href: '/'
                    }
                },
                {
                    key: 'settings',
                    order: 3,
                    props: {
                        tag: 'li',
                        text: 'Settings',
                        icon: 'home',
                        href: '/'
                    }
                }
            ]
        }
    }
}
</script>
