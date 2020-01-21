<template>
    <AwPage title="Typography">
        <h2>Headings</h2>
        <hr />
        <Component v-for="level in 6" :key="level" :is="`h${level}`">
            Heading {{ level }}
        </Component>

        <!-- eslint-disable prettier/prettier -->
        <AwCodeSnippet class="my-4" language="javascript">/**
 * Sum function with very very very very very very long description
 */

function sum(a, b) {
    return a + b
};</AwCodeSnippet>

<AwCodeSnippet class="my-4" v-text="'<!-- Markup example -->\n\n<AwButton>\n\tClick me!\n</AwButton>'" />
        <!-- eslint-enable prettier/prettier -->

        <h2>Example content <code>heading 2</code></h2>
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
    </AwPage>
</template>

<script>
export default {
    name: 'Typography',

    head() {
        return {
            title: 'Typography'
        }
    }
}
</script>
