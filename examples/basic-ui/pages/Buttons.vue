<template>
    <AwPage title="Examples / Buttons">
        <h3>Links</h3>
        Lorem ipsum dolor sit amet, <AwLink>Default link</AwLink> consectetur
        adipisicing elit. Blanditiis expedita autem quo aspernatur
        necessitatibus reiciendis amet. Totam accusantium ducimus, minima
        excepturi, blanditiis ea ipsum repudiandae hic ipsam nemo dolorum
        veritatis.

        <h3>Buttons</h3>
        Default button: <AwButton>Button</AwButton>
        <AwButton href="/dropdowns">
            Route
        </AwButton>
        <AwButton href="//google.com">Google link</AwButton>
        <AwButton icon="intelligence" color="info">
            With icon
        </AwButton>

        <br />

        Sizes:
        <AwButton v-for="size in sizes" :size="size" :key="size" class="m-1">
            {{ size }}
        </AwButton>
        <br />
        Colors:
        <AwButton
            v-for="color in colors"
            :color="color"
            :key="color"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>
        <br />
        Outline theme:
        <AwButton
            v-for="color in colors"
            theme="outline"
            :color="color"
            :key="`outline-${color}`"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>
        <br />
        Ghost theme:
        <AwButton
            v-for="color in colors"
            theme="ghost"
            :color="color"
            :key="`ghost-${color}`"
            class="m-1"
        >
            {{ color || 'default' }}
        </AwButton>
        <div class="h3 mt-8 mb-4">Button groups</div>
        <div class="aw-button-group">
            <AwButton
                v-for="color in colors"
                :color="color"
                :key="color"
                class="m-1"
            >
                {{ color || 'default' }}
            </AwButton>
        </div>
        <div class="aw-button-group mt-4">
            <AwButton
                v-for="color in colors"
                :color="color"
                :key="color"
                theme="outline"
            >
                {{ color || 'default' }}
            </AwButton>
        </div>
        <div class="aw-button-group mt-4">
            <AwButton
                v-for="i in 6"
                color="gray"
                :key="i"
                theme="outline"
                size="sm"
            >
                button {{ i }}
            </AwButton>
        </div>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            sizes: ['sm', 'md', 'lg'],
            colors: ['', 'info', 'success', 'warning', 'error']
        }
    }
}
</script>
