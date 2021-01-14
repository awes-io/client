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
                            <AwIconSystemMono name="angle" />
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
import { AwPage as _config } from '@AwConfig'
import { conf } from '@AwUtils/component'

export default {
    name: 'AwPageHeadline',

    _config,

    props: {
        title: {
            type: String,
            default: ''
        },

        breadcrumb: {
            type: Object,
            default: null
        },

        titleTag: {
            type: String,
            default() {
                return conf(this, 'titleTag')
            }
        }
    }
}
</script>
