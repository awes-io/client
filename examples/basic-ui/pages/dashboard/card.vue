<template>
    <AwPage :title="headline">
        <section>
            <AwGrid :col="{ md: 3, lg: 4 }">
                <AwDashboardCard
                    title="Revenue"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    icon="settings"
                    color="info"
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Top services
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>
            </AwGrid>

            <AwCodeSnippet v-text="code" class="mt-3" />
        </section>

        <section class="mt-8">
            <h4>Color</h4>

            <AwGrid :col="{ md: 3, lg: 4 }">
                <AwDashboardCard
                    title="Info"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    color="info"
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Info
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>

                <AwDashboardCard
                    title="Warning"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    color="warning"
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Warning
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>

                <AwDashboardCard
                    title="Error"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    color="error"
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Error
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>

                <AwDashboardCard
                    title="Success"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    color="success"
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Success
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>
            </AwGrid>
        </section>

        <section class="mt-8">
            <h4>Icon</h4>

            List of all available icons you can find
            <nuxt-link to="/aw-icon" target="_blank" class="text-link">
                here
            </nuxt-link>
        </section>

        <section class="mt-8">
            <h4>No hidden content</h4>

            <AwGrid :col="{ md: 3, lg: 4 }">
                <AwDashboardCard
                    title="Revenue"
                    number="$1 930"
                    description="This year"
                    footer="TOTAL VISITS: 20"
                    color="info"
                    hide-button
                >
                    <template #content>
                        <div class="px-5 py-4">
                            <h5
                                class="text-3xl font-bold mb-1"
                                style="margin-bottom: 7px;"
                            >
                                Top services
                            </h5>

                            <ul
                                class="text-xs font-body"
                                style="margin: 0;"
                                v-html="getList()"
                            />
                        </div>
                    </template>
                </AwDashboardCard>
            </AwGrid>

            <AwCodeSnippet v-text="hiddenCode" class="mt-3" />
        </section>

        <section class="mt-8">
            <h4>Default Slot</h4>

            <p>
                You can change layout of card by passing default slot.
                Background and hidden content height will adjust automatically
            </p>

            <AwGrid :col="{ md: 3, lg: 4 }">
                <AwDashboardCard>
                    <template #default>
                        <div>
                            <h3>Custom header</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </p>

                            <div class="mt-10 flex justify-end">
                                <a
                                    href="https://www.google.com/"
                                    target="_blank"
                                    >Footer link</a
                                >
                            </div>
                        </div>
                    </template>

                    <template #content>
                        <div class="px-5 py-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Aut necessitatibus assumenda eos sed quo
                            illum, molestias recusandae, totam odit animi amet
                            quod blanditiis architecto explicabo debitis ab
                            dolor, corrupti nemo. Lorem ipsum, dolor sit amet
                            consectetur adipisicing elit. Aut necessitatibus
                            assumenda eos sed quo illum, molestias recusandae,
                            totam odit animi amet quod blanditiis architecto
                            explicabo debitis ab dolor, corrupti nemo.
                        </div>
                    </template>
                </AwDashboardCard>
            </AwGrid>

            <AwCodeSnippet v-text="defaultSlotCode" class="mt-3" />
        </section>
    </AwPage>
</template>

<script>
export default {
    data() {
        return {
            title: 'AwDashboardDonut',
            headline: this._getTitle('AwDashboardDonut')
        }
    },

    computed: {
        code() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard',
                '        title="Revenue"',
                '        number="$1 930"',
                '        description="This year"',
                '        footer="TOTAL VISITS: 20"',
                '        icon="settings"',
                '        color="info"',
                '    >',
                '        <template #content>',
                '            <!-- Hidden content here -->',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]

            return arr.join('\n')
        },

        hiddenCode() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard',
                '        title="Revenue"',
                '        number="$1 930"',
                '        description="This year"',
                '        footer="TOTAL VISITS: 20"',
                '        color="info"',
                '        hide-button',
                '    >',
                '        <template #content>',
                '            <!-- Hidden content here -->',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]

            return arr.join('\n')
        },

        defaultSlotCode() {
            const arr = [
                '<AwGrid :col="{ md: 3, lg: 4 }">',
                '    <AwDashboardCard>',
                '        <template #default>',
                '            <div>',
                '                <h3>Custom header</h3>',
                '                <p>',
                '                    Lorem ipsum dolor sit amet consectetur,',
                '                    adipisicing elit.',
                '                </p>',
                '                <div class="mt-10 flex justify-end">',
                '                    <a href="https://www.google.com/" target="_blank">Footer link</a>',
                '                </div>',
                '            </div>',
                '        </template>',
                '',
                '        <template #content>',
                '            <div class="px-5 py-4">',
                '                Hidden content',
                '            </div>',
                '        </template>',
                '    </AwDashboardCard>',
                '</AwGrid>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        getList() {
            const tags = [
                { title: 'Manicure', num: 55 },
                { title: 'Pedicure', num: 25 },
                { title: 'Eyebrow modeling and coloring', num: 15 },
                { title: 'Manicure', num: 55 },
                { title: 'Pedicure', num: 25 },
                { title: 'Eyebrow modeling and coloring', num: 15 }
            ]
            return tags
                .map(el => {
                    return this.getLi(this.getContent(el))
                })
                .join('')
        },

        getLi(content) {
            return `<li class="flex justify-between border-dashed border-b border-surface py-2">${content}</li>`
        },

        getContent(item) {
            return `${item.title} <span class="font-bold">${item.num}%</span>`
        }
    },

    head() {
        return {
            title: this._getMetaTitle(this.title),
            meta: [this._getMetaDescription(this.title)]
        }
    }
}
</script>
