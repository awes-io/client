<template>
    <AwPage :title="headline" :breadcrumb="breadcrumb">
        <section class="mt-8">
            <h2 class="h3">Orderable</h2>

            <p>
                You can enable ordering by adding <code>orderable</code> prop to
                <code>AwTableCol</code>. Prop can be <code>Boolean</code> or
                <code>Object</code>. If boolean, then default config will be
                used
            </p>

            <p>
                Default config:

                <AwCodeSnippet
                    v-text="orderableConfigCode"
                    class="mt-3 shadow"
                    language="javascript"
                />
            </p>

            <p>
                Also you can specify orderable config for the whole table by
                adding orderable prop to <code>AwTableBuilder</code>

                Also you can specify orderable config globally in
                <code>nuxt.config.js</code>
                <br />
                For example

                <AwCodeSnippet
                    v-text="globalConfigCode"
                    class="my-3 shadow"
                    language="javascript"
                />

                <AwCard title="NOTE" class="my-8 border-l-4 border-error">
                    If global <code>default</code> property will be set to
                    <code>true</code>, then first orderable col of each table
                    will be set as default
                </AwCard>
            </p>

            <h5>Basic example:</h5>

            <AwTableBuilder
                :collection="oredableManagers"
                :scroll-on-page="false"
                :orderable="{
                    ascTemplate: '%s_asc'
                }"
                defaultHeight="50vh"
            >
                <AwTableCol field="id" :orderable="{ default: true }" />

                <AwTableCol
                    title="User name"
                    :orderable="{ templateValue: 'first_name' }"
                >
                    <template #default="{ cell }">
                        {{ cell.first_name }} {{ cell.last_name }}
                    </template>
                </AwTableCol>

                <AwTableCol title="Job title" field="position" />
            </AwTableBuilder>

            <AwCodeSnippet v-text="configExampleCode" class="mt-8 shadow" />
        </section>
    </AwPage>
</template>

<script>
import { BaseModel, BaseCollection } from '@awes-io/vue-mc'

class Managers extends BaseCollection {
    model() {
        return BaseModel
    }

    routes() {
        return {
            fetch: 'api/managers'
        }
    }
}

export default {
    name: 'TableOrderablePage',

    data() {
        return {
            title: 'AwTableBuilder',
            headline: this._getTitle('AwTableBuilder'),
            oredableManagers: new Managers(),
            breadcrumb: {
                title: 'Table',
                href: '/table/'
            }
        }
    },

    computed: {
        orderableConfigCode() {
            const arr = [
                '{',
                "   param: 'orderBy', // <-- GET-param name in browser query string",
                "   ascTemplate: '%s', // <-- template, where '%s' is replaced with column field prop",
                "   descTemplate: '%s_desc' // <-- template, where '%s' is replaced with column field prop",
                '   templateValue: null // <-- column field prop will be replaced with this prop value, if present',
                '   default: true // <-- if true, sets current sorting column as default',
                '}'
            ]

            return arr.join('\n')
        },

        globalConfigCode() {
            const arr = [
                'export default {',
                '    // ...',
                '    awesIo: {',
                '        ui: {',
                '            components: {',
                '                AwTableBuilder: {',
                "                   param: 'order'",
                "                   ascTemplate: '%s_asc'",
                '                }',
                '            }',
                '        }',
                '    }',
                '}'
            ]
            return arr.join('\n')
        },

        configExampleCode() {
            const arr = [
                '<AwTableBuilder',
                '    :collection="oredableManagers"',
                '    :scroll-on-page="false"',
                '    :orderable="{',
                "        ascTemplate: '%s_asc'",
                '    }"',
                '    defaultHeight="50vh"',
                '>',
                '    <AwTableCol field="id" :orderable="{ default: true }" />',
                '',
                '    <AwTableCol',
                '        title="User name"',
                '        :orderable="{ templateValue: \'first_name\' }"',
                '    >',
                '        <template #default="{ cell }">',
                '            {{ cell.first_name }} {{ cell.last_name }}',
                '        </template>',
                '    </AwTableCol>',
                '',
                '    <AwTableCol title="Job title" field="position" />',
                '</AwTableBuilder>'
            ]
            return arr.join('\n')
        }
    },

    methods: {
        clickRow(val) {
            console.log(val)
        },

        exampleClickRow() {
            alert('Row click')
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
