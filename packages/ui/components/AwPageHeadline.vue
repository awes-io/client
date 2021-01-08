<template>
    <div class="aw-page-headline">
        <div class="aw-page-headline__title">
            <slot name="headline" v-bind="$props">
                <slot name="headline-breadcrumb" :breadcrumb="breadcrumb">
                    <template v-if="breadcrumb && breadcrumb.href">
                        <NLink
                            :to="breadcrumb.href"
                            class="aw-page-headline__back"
                            data-focus-visible
                        >
                            <AwIconSystem name="angle" />
                            {{ breadcrumb.text }}
                        </NLink>
                    </template>
                </slot>

                <slot name="headline-title" :title="title">
                    <Component :is="titleTag" class="aw-page-headline__heading">
                        {{ title }}
                    </Component>
                </slot>
            </slot>
        </div>

        <slot name="buttons"></slot>
    </div>
</template>

<script>
import { AwPage as _config } from './_config'
import { conf } from '../assets/js/component'

export default {
    name: 'AwPageHeadline',

    _config,

    props: {
        title: {
            type: String,
            default: ''
        },

        breadcrumb: {
            type: [Boolean, Object],
            default: true
        },

        titleTag: {
            type: String,
            default() {
                return conf(this, 'titleTag')
            }
        }
    },

    provide() {
        return {
            floating: {
                disable: 'md'
            }
        }
    }
}
</script>
