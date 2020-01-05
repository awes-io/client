<template>
    <div class="aw-timeline-builder">
        <div
            v-for="({ title, subtitle, author, createdAt }, index) in items"
            :key="`item-${index}`"
            class="flex"
            :class="{ 'mt-2': index }"
        >
            <!-- decor -->
            <div aria-hidden="true" class="w-6 flex flex-col items-center">
                <AwIcon name="circle" size="sm" class="text-accent mt-1 mb-2" />
                <div class="w-px flex-grow bgcolor-overlay opacity-20"></div>
            </div>

            <!-- content -->
            <div class="pl-2 pb-4">
                <slot v-bind="{ title, subtitle, author, createdAt }">
                    <!-- info -->
                    <div class="font-bold">{{ title }}</div>
                    <div class="mb-2">{{ subtitle }}</div>

                    <!-- author -->
                    <div v-if="author" class="flex items-center">
                        <AwAvatar
                            class="w-5"
                            :src="author.avatar"
                            :name="author.fullName"
                        />
                        <span class="ml-2 opacity-50">
                            {{ author.fullName }}
                        </span>
                    </div>

                    <!-- time -->
                    <div class="text-xs mt-2 opacity-50">
                        {{ createdAt }}
                    </div>
                </slot>
            </div>
        </div>

        <!-- fetch button -->
        <AwLink
            class="text-sm text-overlay opacity-50 ml-3 mt-3"
            @click="fetch"
        >
            {{ $t('AwTimelineBuilder.more') }}
        </AwLink>
    </div>
</template>

<script>
export default {
    name: 'AwTimelineBuilder',

    props: {
        collection: {
            type: Object,
            required: true,
            validator(obj) {
                return (
                    Array.isArray(obj.models) &&
                    typeof obj.fetch === 'function' &&
                    typeof obj.on === 'function'
                )
            }
        }
    },

    data() {
        return {
            items: [],
            page: 0
        }
    },

    mounted() {
        this.$nextTick(this.fetch)
    },

    methods: {
        async fetch() {
            ++this.page
            const {
                response: {
                    data: { data }
                }
            } = await this.collection.fetch({ params: { page: this.page } })
            this.items = [...this.items, ...data]
        }
    }
}
</script>
