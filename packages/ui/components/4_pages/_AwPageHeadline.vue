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

        <AwPageButtons :breakpoint="buttonsBreakpoint">
            <slot name="buttons"></slot>
        </AwPageButtons>
    </div>
</template>

<script>
import { AwPage as _config } from '@AwConfig'
import { conf } from '@AwUtils/component'
import AwPageButtons from '@AwPages/_AwPageButtons.vue'

export default {
    name: 'AwPageHeadline',

    _config,

    components: {
        AwPageButtons
    },

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
        },

        buttonsBreakpoint: {
            type: String,
            default: null
        }
    }
}
</script>
