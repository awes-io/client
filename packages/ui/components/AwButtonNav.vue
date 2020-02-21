<script>
import { clone } from 'rambdax'
import AwTabNav from './AwTabNav.vue'

const AwButtonNav = clone(AwTabNav)

AwButtonNav.name = 'AwButtonNav'
AwButtonNav._config.baseClass = 'aw-button-nav'

export default AwButtonNav
</script>
