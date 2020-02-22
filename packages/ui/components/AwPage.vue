<template>
    <div :class="className">
        <div class="flex items-end container">
            <div class="flex-auto">
                <!-- title -->
                <Component
                    :is="titleTag"
                    :class="[elClasses.title]"
                    :key="title.key || title"
                >
                    <!-- Breadcrumb link back to catalog -->
                    <slot name="breadcrumb">
                        <!-- if prop breadctumb is empty, block is empty too -->
                        <div
                            v-if="
                                breadcrumb &&
                                    breadcrumb.href &&
                                    breadcrumb.title
                            "
                        >
                            <span class="hidden sm:inline-block">
                                <AwLink :href="breadcrumb.href" class="mr-2">{{
                                    breadcrumb.title
                                }}</AwLink>
                                <span
                                    class="text-sm text-disabled align-middle mr-4"
                                    >&#47;</span
                                >
                            </span>
                            <span class="sm:hidden">
                                <AwButton
                                    :href="breadcrumb.href"
                                    :title="breadcrumb.title"
                                    class="mr-4 min-w-0 px-2"
                                    size="sm"
                                    color="default"
                                >
                                    <AwIcon name="chevron-l" />
                                </AwButton>
                            </span>
                        </div>
                    </slot>
                    <!-- Title of the page -->
                    <slot name="title" :title="title">
                        <!-- Empty string -->
                        {{ title }}
                    </slot>
                </Component>
            </div>
            <div v-if="!!$slots.buttons" class="py-4 flex-none pl-4">
                <slot name="buttons"></slot>
            </div>
        </div>

        <!-- subnav -->
        <div>
            <slot name="subnav">
                <div v-if="subnav.length" class="border-b bg-muted">
                    <div class="container">
                        <AwTabNav
                            :items="subnav"
                            class="border-transparent -mb-px -mx-3"
                        />
                    </div>
                </div>
            </slot>
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
import { conf } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'

export default {
    name: 'AwPage',

    _config,

    props: {
        // Main headline on the page
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

        // Subnavigation for the page
        subnav: {
            type: Array,
            default: () => []
        },

        // Breadcrumb object with title and href to return back
        breadcrumb: {
            type: Object,
            default: () => {},
            validator(params) {
                if (
                    typeof params.title !== 'undefined' &&
                    typeof params.href !== 'undefined'
                ) {
                    return true
                }
                return false
            }
        }
    },
    head() {
        return {
            title: this.getTitle
        }
    },
    computed: {
        getTitle() {
            let title = this.title
            if (this.breadcrumb) {
                title += ' / ' + this.breadcrumb.title
            }
            return title
        },
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
