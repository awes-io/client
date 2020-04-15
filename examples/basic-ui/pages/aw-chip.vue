<template>
    <AwPage :title="headline">
        <!-- minimal usage -->
        <h2>Simple</h2>

        <AwChip icon="quote" />

        <AwChip color="warning" text="With text" />

        <button @click="loading = !loading">
            <AwChip text="With loading (click to toggle)" :loading="loading" />
        </button>

        <AwChip text="With text and icon" color="info" icon="search" />

        <AwChip text="With text and icon" color="error" icon="close" />

        <!-- chips with background -->
        <h2>With background</h2>

        <AwChip
            text="With text, color and bg"
            color="error"
            class="bgcolor-muted-dark mb-2"
        />

        <AwChip
            text="With text, color and bg"
            color="warning"
            class="bg-error mb-2"
        />

        <!-- chips with events -->
        <button class="text-left mb-2" @click="alert('Close!')">
            <AwChip
                text="With text, color, bg and button"
                class="bg-error mb-2"
            >
                <template #right="{ color }">
                    <AwIcon
                        name="close-circle"
                        class="mr-1"
                        :class="{ [`text-${color}`]: color }"
                    />
                </template>
            </AwChip>
        </button>

        <button class="text-left mb-2" @click="alert('Icon close!')">
            <AwChip
                text="With text, color, bg and button"
                class="bg-error mb-2"
                icon="close-circle"
            >
                <template #right="{ color }">
                    <AwIcon
                        name="close-circle"
                        class="mr-1"
                        :class="{ [`text-${color}`]: color }"
                    />
                </template>
            </AwChip>
        </button>

        <!-- loading indicator example -->
        <h2>Loading</h2>
        <AwChip class="bgcolor-muted-dark">
            <AwSvgImage name="spinner" slot="left" class="h-5 w-5" />
            Loading
        </AwChip>

        <!-- chips with image -->
        <h2>With Image</h2>
        <AwChip
            image="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"
        >
            Only image
        </AwChip>

        Some text to show alignment

        <AwChip color="warning" text="Simple with text" />

        <AwChip icon="eye" text="With icon" />

        One more text

        <button @click="alert('Close image!')">
            <AwChip
                image="https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg"
                color="white"
                class="bg-info"
                text="Image and close"
            >
                <template #right="{ color }">
                    <AwIcon
                        name="close-circle"
                        class="mr-1"
                        :class="{ [`text-${color}`]: color }"
                    />
                </template>
            </AwChip>
        </button>

        <!-- rotating chips -->
        <h2>Rotating chips</h2>
        <AwChip color="link" icon="progress" scale="0.85" rotate>
            In Progress
        </AwChip>

        <!-- Filled chips -->
        <h2>Filled chips</h2>
        <AwChip color="warning" icon="pause" filled>
            Stop
        </AwChip>
    </AwPage>
</template>

<script>
export default {
    name: 'ChipPage',

    data() {
        return {
            title: 'AwChip',
            headline: this._getTitle('AwChip'),
            loading: false
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    },

    methods: {
        alert(text) {
            alert(text)
        }
    }
}
</script>
