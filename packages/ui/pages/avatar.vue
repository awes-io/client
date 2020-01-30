<template>
    <AwPage title="AwAvatar">
        <h3>AwAvatar variants</h3>
        <div class="flex">
            <AwAvatar
                src="https://profilepicture7.com/bao/bao_dongman/1/541997966.jpg"
                name="Artsiom San"
                :size="100"
            />
            <AwAvatar
                :size="60"
                src=""
                name="Artsiom San TEst Rest"
                @click="test"
            />
            <AwAvatar src="" name="Artsiom San" type="empty" />
            <AwAvatar src="" name="Artsiom San" type="no-img" color />
            <AwAvatar src="" name="Artsiom San" color />
            <div>
                <AwAvatar
                    src="https://profilepicture7.com/bao/bao_dongman/1/541997966.jpg"
                    name="Donald Duck"
                    :size="200"
                >
                    <template #default="{ name, size, color, src, initials }">
                        <ul
                            class="absolute top-1/2 left-1/2"
                            style="transform: translate(-50%, -50%);"
                        >
                            <li>Slot</li>
                            <li>{{ name }}</li>
                            <li>{{ size }}</li>
                            <li>{{ color }}</li>
                            <li>{{ src }}</li>
                            <li>{{ initials }}</li>
                        </ul>
                    </template>
                </AwAvatar>
            </div>
        </div>
        <h3>AwUserpic variants</h3>
        <div>
            <AwUserpic
                src="https://profilepicture7.com/bao/bao_dongman/1/541997966.jpg"
                name="Artsiom San"
                with-name
            />
            <AwUserpic
                src="https://profilepicture7.com/bao/bao_dongman/1/541997966.jpg"
                name="Artsiom San"
            />
        </div>
    </AwPage>
</template>

<script>
export default {
    head() {
        return {
            title: 'AwAvatar'
        }
    },

    methods: {
        test() {
            alert(123)
        }
    }
}
</script>
