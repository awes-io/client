<template>
    <AwPage :title="headline">
        <Transition name="fade-from-bottom" mode="out-in">
            <div v-if="!key || !showAddress" key="key">
                <AwInput v-model="key" label="Enter maps API key" />
                <AwButton
                    class="mt-4"
                    text="load"
                    @click="key ? (showAddress = true) : null"
                />
            </div>
            <div v-else key="address">
                <AwAddress
                    v-for="button in buttons"
                    :key="`item-${button}`"
                    :gm-key="key"
                    gm-language="de"
                    label="Your address"
                    class="mt-4"
                    @input="setText"
                />
                <AwButton class="mt-4" text="add filed" @click="++buttons" />
                <p class="h3">Response</p>
                <AwCodeSnippet v-text="text" />
            </div>
        </Transition>

        <!-- phone -->
        <AwSwitcher v-model="disablePhone" label="Disable phone" class="mt-8" />
        <AwForm url="//httpbin.org/post">
            <AwInput required label="Test" />
            <AwTel
                v-model="phone"
                label="Enter phone number"
                name="phone"
                :disabled="disablePhone"
                required
                placeholder="+111 222 33 44"
                class="mt-4"
            />
            <AwButton type="submit" class="mt-2" text="Submit" />
        </AwForm>
        <AwCodeSnippet v-text="phone" class="mt-4" />
    </AwPage>
</template>

<script>
export default {
    name: 'FormsAddressPage',

    data() {
        return {
            title: 'AwAddress',
            headline: this._getTitle('AwAddress'),
            phone: null,
            text: 'Response will show up here...',
            key: '',
            showAddress: false,
            disablePhone: false,
            buttons: 1
        }
    },

    methods: {
        setText(obj) {
            this.text = JSON.stringify(obj, null, 2)
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
