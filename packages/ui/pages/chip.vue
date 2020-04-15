<template>
    <AwPage title="AwChip">
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

        <AwChip
            text="With text, color, bg and button"
            color="error"
            class="bgcolor-muted-dark mb-2"
            @click="alert('Click!')"
        />

        <!-- chips with events -->
        <button class="text-left mb-2" @click="alert('Close!')">
            <AwChip text="With text, color, bg and button" class="bg-error">
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
                class="bg-error"
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

        <!-- chips select -->
        <h2>Chip select</h2>

        <div @click="bubbled = true">
            <AwChipSelect
                :value="status"
                filled
                @input="setStatus"
                :loading="statusLoading"
                :options="[
                    { id: 1, text: 'New', color: 'info', icon: 'plus-solid' },
                    {
                        id: 2,
                        text: 'Removed',
                        color: 'error',
                        icon: 'close-solid'
                    },
                    {
                        id: 3,
                        text: 'Active',
                        color: 'success',
                        icon: 'check-solid'
                    },
                    {
                        id: 4,
                        text: 'The one with very very very long name',
                        color: 'warning',
                        icon: 'triangle-solid-r'
                    },
                    {
                        id: 5,
                        text: 'In Work',
                        color: 'link',
                        icon: 'pie-chart-empty',
                        scale: 0.6
                    },
                    {
                        id: 6,
                        text: 'Error',
                        color: 'error',
                        icon: 'attention',
                        scale: 0.65
                    },
                    {
                        id: 7,
                        text: 'Pause',
                        color: 'warning',
                        icon: 'pause'
                    },
                    {
                        id: 8,
                        text: 'In progress',
                        color: 'link',
                        icon: 'progress',
                        scale: 0.85,
                        rotate: true
                    }
                ]"
            />
        </div>

        <p>Bubbled: {{ bubbled }}</p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            numquam, dignissimos fugiat magnam saepe sunt, illum rem, vero,
            velit quos quidem. Facere excepturi voluptates temporibus minima
            architecto nulla neque aliquid.
        </p>
    </AwPage>
</template>

<script>
export default {
    name: 'ChipPage',

    data() {
        return {
            loading: false,
            status: 1,
            statusLoading: false,
            bubbled: false
        }
    },

    methods: {
        alert(text) {
            alert(text)
        },

        setStatus(id) {
            this.statusLoading = true
            setTimeout(() => {
                this.status = id
                this.statusLoading = false
            }, 2000)
        }
    }
}
</script>
