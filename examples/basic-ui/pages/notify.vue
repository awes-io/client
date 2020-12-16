<template>
    <AwPage title="$notify">
        <AwForm @submit.prevent="notify">
            <h3>Position</h3>
            <AwSelect
                v-model="positionVertical"
                label="Vertical"
                :options="['top', 'bottom']"
                class="mt-2"
            />
            <AwSelect
                v-model="positionHorizontal"
                label="Horizontal"
                :options="['left', 'center', 'right']"
                class="mt-2"
            />

            <h3>Content</h3>
            <AwInput v-model="title" label="Title" required />
            <AwTextarea v-model="text" label="Text" class="mt-2" />
            <AwSelect
                v-model="icon"
                label="Icon"
                :options="$options.icons"
                class="mt-2"
            />

            <h3>Other</h3>
            <AwInput
                :value="timeout"
                @input="_setTimeout"
                label="Timeout"
                class="mt-2"
            />
            <AwSelect
                v-model="type"
                label="Type"
                :options="['info', 'success', 'warning', 'error']"
                class="mt-2"
            />
            <AwButton text="Notify" type="submit" class="mt-2" />
        </AwForm>

        <AwCodeSnippet v-if="lastSended" v-text="lastSended" class="mt-4" />
    </AwPage>
</template>

<script>
import { filter } from 'rambdax'

const icons = [
    false,
    'check-circle',
    'check-solid',
    'close-circle',
    'circle',
    'location',
    'search'
]
const DEFAULT_ICON = 'check-circle'

const DEFAULT_TYPE = 'info'

const DEFAULT_TIMEOUT = 4000

const DEFAULT_POSITION = 'center bottom'

export default {
    name: 'Notify',

    head() {
        return {
            title: this._getMetaTitle('$notify'),
            meta: [this._getMetaDescription('$notify')]
        }
    },

    data() {
        return {
            title: 'Important message',
            text: 'Hello user! This is a notification!',
            timeout: DEFAULT_TIMEOUT,
            type: DEFAULT_TYPE,
            icon: DEFAULT_ICON,
            lastSended: '',
            positionHorizontal: 'right',
            positionVertical: 'bottom'
        }
    },

    computed: {
        position() {
            return `${this.positionHorizontal} ${this.positionVertical}`
        }
    },

    methods: {
        notify() {
            const notify = this._getNotify()
            this.$notify(notify)
            this.lastSended = `this.$notify(${JSON.stringify(notify, null, 4)})`
        },

        _getNotify() {
            return filter(val => val !== null, {
                position:
                    this.position !== DEFAULT_POSITION ? this.position : null,
                title: this.title,
                text: this.text || null,
                type: this.type !== DEFAULT_TYPE ? this.type : null,
                icon: this.icon !== DEFAULT_ICON ? this.icon : null,
                timeout: this.timeout !== DEFAULT_TIMEOUT ? this.timeout : null
            })
        },

        _setTimeout($event) {
            const timeout = parseInt($event)
            this.timeout = isNaN(timeout) ? 0 : timeout
        }
    },

    icons
}
</script>
