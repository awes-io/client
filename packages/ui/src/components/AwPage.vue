<template>
    <div :class="className">
        <!-- title -->
        <Transition name="fade-from-bottom" mode="out-in">
            <Component
                :is="titleTag"
                :class="['container', elClasses.title]"
                :key="title.key || title"
            >
                <slot name="title" :title="title">{{ title }}</slot>
            </Component>
        </Transition>

        <!-- subnav -->
        <div v-if="subnav.length" class="border-b bg-muted">
            <AwTabNav
                :items="subnav"
                class="container border-transparent -mb-px"
            />
        </div>

        <!-- content -->
        <div :class="elClasses.content" class="content">
            <div class="container">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import { AwPage as _config } from './_config'
import { conf } from '~/assets/js/component'
import { getBemClasses } from '~/assets/js/css'

export default {
    name: 'AwPage',

    _config,

    props: {
        title: {
            type: String,
            default: ''
        },

        titleTag: {
            type: String,
            default() {
                return conf(this, 'titleTag')
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        },

        subnav: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        elClasses() {
            return getBemClasses(this.className, [
                'title',
                'subnav',
                'tabs',
                'content'
            ])
        }
    }
}
</script>
