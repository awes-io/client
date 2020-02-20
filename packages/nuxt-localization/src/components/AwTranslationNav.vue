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
            const subnav = [
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

            if (this._config.export) {
                subnav.push({
                    text: 'Export',
                    href: this.localePath({
                        path: this._config.route + 'export'
                    })
                })
            }

            return subnav
        }
    }
}
</script>
