<template>
    <AwPage :title="title">
        <h2><span class="text-info">#</span> Colors</h2>

        <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <BuiColorCard
                v-for="(value, name) in styles.default.colors"
                :key="name"
                :color="name"
                :text="value"
            />
        </div>

        <h2>
            <span class="text-info">#</span> System Icons Mono
            <code>&lt;AwIconSystemMono :name="name"/&gt;</code>
        </h2>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <BuiIconCard
                v-for="(value, name) in monoIcons"
                :key="name"
                :text="name"
                ><AwIconSystemMono :name="name"
            /></BuiIconCard>
        </div>

        <h2>
            <span class="text-info">#</span> System Icons Multicolor
            <code>&lt;AwIconSystemColor :name="name"/&gt;</code>
        </h2>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <BuiIconCard
                v-for="(value, name) in multicolorIcons"
                :key="name"
                :text="name"
                ><AwIconSystemColor :name="name" class="h-8 w-8"
            /></BuiIconCard>
        </div>

        <h2><span class="text-info">#</span> Headings</h2>
        <Component v-for="level in 6" :key="level" :is="`h${level}`">
            Heading {{ level }}
        </Component>

        <h2><span class="text-info">#</span> Code Editor</h2>
        <AwCodeSnippet
            class="my-4"
            v-text="
                '<!-- Markup example -->\n\n<AwButton>\n\tClick me!\n</AwButton>'
            "
        />
        <!-- eslint-enable prettier/prettier -->

        <h2>
            <span class="text-info">#</span> Example content
            <code>heading 2</code>
        </h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
            repellendus magnam architecto <a href="#">modi</a> nesciunt odio
            molestias neque blanditiis, vitae,
            <code>impedit voluptates</code> saepe commodi aspernatur deserunt
            alias! Numquam, incidunt, qui? Consequatur cum voluptate, dolores
            recusandae!
        </p>
        <pre>
{
    const someVar = 123

    function someFunction() {
        return someVar
    }
}
</pre
        >
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
            repellendus magnam architecto modi nesciunt odio molestias neque
            blanditiis, vitae.
        </p>
        <h3>Heading 3</h3>
        <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
            <li>Lorem ipsum dolor.</li>
        </ul>
        <h4>Heading 4</h4>
        <ol>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet, <a href="#">consectetur.</a></li>
            <li>Lorem ipsum dolor.</li>
        </ol>
        <hr />
        <blockquote>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
                magni?
            </p>
            <cite>Lorem ipsum.</cite>
        </blockquote>

        <h2><span class="text-info">#</span> Comma</h2>

        <p><code>.comma</code> class adds comma before current element</p>

        <h5>Example:</h5>

        <div>
            <span v-for="item in items" :key="item" class="comma">
                {{ item }}
            </span>
        </div>

        <AwCodeSnippet v-text="codeComma" class="mt-3" />

        <h2><span class="text-info">#</span> Keyboard keys</h2>

        <p>
            List: <kbd v-for="key in keys" :key="key">{{ key }}</kbd
            >. Please press: <kbd>⌘</kbd><kbd>V</kbd> or <kbd>⌘</kbd
            ><kbd>V</kbd>
        </p>

        <AwCodeSnippet v-text="codeKeys" class="mt-3" />
    </AwPage>
</template>

<script>
import styles from '@awes-io/ui/assets/js/styles'
import monoIcons from '@awes-io/ui/assets/js/icons/mono'
import multicolorIcons from '@awes-io/ui/assets/js/icons/multicolor'
import BuiColorCard from '~/components/BuiColorCard.vue'
import BuiIconCard from '~/components/BuiIconCard.vue'

export default {
    name: 'AdditionalPage',

    data() {
        return {
            title: 'Typography',
            items: [
                'Lorem',
                'ipsum',
                'dolor',
                'sit',
                'amet',
                'consectetur',
                'adipisicing',
                'elit'
            ],
            keys: [
                '~',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                'Enter'
            ],
            styles,
            monoIcons,
            multicolorIcons
        }
    },

    components: {
        BuiColorCard,
        BuiIconCard
    },

    computed: {
        codeComma() {
            const arr = [
                '<div>',
                '   <span class="comma">Lorem</span>',
                '   <span class="comma">ipsum</span>',
                '   <span class="comma">dolor</span>',
                '   <span class="comma">sit</span>',
                '   <span class="comma">amet</span>',
                '   <span class="comma">consectetur</span>',
                '   <span class="comma">adipisicing</span>',
                '   <span class="comma">elit</span>',
                '</div>'
            ]
            return arr.join('\n')
        },

        codeKeys() {
            return this.keys.map((el) => `<kbd>${el}</kbd>`).join('\n')
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
