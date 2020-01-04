<template>
    <main>
        <div class="border p-4 my-8">
            <p class="font-bold mb-4">Pattern</p>
            <AwInput v-model="pattern" label="Pattern" />
            <p class="font-bold my-4">Errors</p>
            <div class="flex -mx-2">
                <div class="p-2">
                    <AwButton text="Set error" @click="_setError(errorText)" />
                    <AwButton text="Reset error" @click="_setError()" />
                </div>
                <div class="p-2">
                    <AwInput v-model="errorText" label="Error text" />
                </div>
            </div>
        </div>

        <!-- test form -->
        <AwForm ref="form" class="py-8" @submit.prevent="_logData">
            <AwCode name="code" :pattern="pattern" ref="code" />
            <AwButton type="submit" text="Submit" class="mt-2" />
        </AwForm>

        <!-- result -->
        <pre class="py-8">{{ submitData }}</pre>
    </main>
</template>

<script>
import { AwCode } from '../../config/awes-io'

export default {
    name: 'FormCodePage',

    data() {
        return {
            pattern: AwCode.pattern,
            errorText: 'This is an error',
            submitData: {}
        }
    },

    watch: {
        pattern() {
            this.$refs.code.inputValue = ''
        }
    },

    methods: {
        _setError(err = '') {
            this.$refs.form.setErrors({
                code: err
            })
        },

        _logData($event) {
            const form = $event.target
            const data = new FormData(form)
            let result = {}

            for (let [name, value] of data.entries()) {
                result[name] = value
            }

            this.submitData = result
        }
    }
}
</script>
