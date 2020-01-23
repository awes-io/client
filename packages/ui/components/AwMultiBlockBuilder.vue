<template>
    <div>
        <div
            v-for="(model, index) in models"
            :key="model.id || `new-block-${index}`"
            :class="{ 'mt-4': index > 0 }"
        >
            <!-- block title -->
            <slot
                name="title"
                v-bind="{
                    title,
                    iteration: index + 1,
                    collection,
                    model,
                    collectionCount
                }"
            >
                <h5 class="flex items-center draggable">
                    <span>
                        {{
                            $t('AwMultiBlockBuilder.title', {
                                title,
                                iteration: index + 1
                            })
                        }}
                    </span>
                    <AwButton
                        icon="close"
                        theme="icon"
                        :text="$t('AwMultiBlockBuilder.remove')"
                        @click="collection.remove(model)"
                    />
                </h5>
            </slot>

            <!-- block content -->
            <slot :model="model" />
        </div>

        <!-- add button -->
        <div class="mt-8" v-if="collectionCount < max">
            <slot name="add" v-bind="{ collection, title }">
                <AwLink
                    class="text-sm font-bold uppercase"
                    @click.prevent="collection.add()"
                >
                    {{ $t('AwMultiBlockBuilder.add', { title }) }}
                </AwLink>
            </slot>
        </div>

        <!-- save button -->
        <slot name="save" v-bind="{ collectionChanged, collection }">
            <div class="mt-8">
                <AwButton
                    :disabled="!collectionChanged || collectionRequest"
                    @click="collection.save()"
                >
                    {{ $t('AwMultiBlockBuilder.save') }}
                </AwButton>
            </div>
        </slot>
    </div>
</template>

<script>
import { equals, prop, isNil, clone } from 'rambdax'
import { validateBySchema } from '../assets/js/component'

export default {
    name: 'AwMultiBlockBuilder',

    props: {
        collection: {
            type: Object,
            required: true,
            validator: validateBySchema({
                fetch: 'function',
                save: 'function',
                add: 'function',
                remove: 'function',
                models: 'array'
            })
        },

        title: {
            type: String,
            default: ''
        },

        max: {
            type: Number,
            default: Infinity
        }
    },

    data() {
        return {
            modelsSnapshot: []
        }
    },

    computed: {
        models() {
            return this.collection.models
        },

        currentModels() {
            return this.models.map(prop('_attributes'))
        },

        collectionCount() {
            return this.models.length
        },

        collectionChanged() {
            return !equals(this.modelsSnapshot, this.currentModels)
        },

        collectionRequest() {
            return this.collection.saving || this.collection.loading
        }
    },

    mounted() {
        const fetchListener = this.getEventListener('fetch')
        const saveListener = this.getEventListener('save')

        this.collection.on('fetch', fetchListener)
        this.collection.on('save', saveListener)

        this.$once('hook:beforeDestroy', () => {
            this._removeCollectionListener('fetch', fetchListener)
            this._removeCollectionListener('save', saveListener)
        })

        // initial fetch
        this.collection.fetch()
    },

    methods: {
        getEventListener(name) {
            return $event => {
                if (isNil($event.error)) {
                    this.updateSnapshot()
                }

                this.$emit(`after-${name}`, this.collection, $event)
            }
        },

        updateSnapshot() {
            this.modelsSnapshot = clone(this.currentModels)
        },

        _removeCollectionListener(event, listener) {
            const listeners = this.collection._listeners[event] || []
            const index = listeners.indexOf(listener)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }
}
</script>
