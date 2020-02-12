<template>
    <div class="border-b">
        <div class="container">
            <AwTabNav :items="subnav" class="-mb-px border-transparent" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AwTranslationNav',

    computed: {
        subnav() {
            return [
                {
                    text: 'Edit',
                    href: this.localePath({
                        path: this._config.route
                    })
                },
                {
                    text: 'Add',
                    href: this.localePath({
                        path: this._config.route + 'add'
                    })
                }
            ]
        }
    }
}
</script>
