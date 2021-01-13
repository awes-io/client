<script>
import AwTabNav from '@AwMolecules/AwTabNav.vue'

export default {
    name: 'AwButtonNav',

    extends: AwTabNav,

    _config: {
        ...AwTabNav._config,
        baseClass: 'aw-button-nav'
    }
}
</script>
