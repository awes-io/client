export const actions = {
    async UPDATE_AVATAR(ctx, imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile, 'avatar.png')

        await this.$axios.request({
            url: '/api/profile/avatar',
            method: 'post',
            data: formData
        })

        this.$auth.fetchUser()
    },

    async DELETE_AVATAR() {
        await this.$axios.delete('/api/profile/avatar')

        this.$auth.fetchUser()
    }
}

export default {
    actions
}
