export const lang = {
    locales: ['ru', 'en'],
    locale: 'ru',
    fetchTranslation: (locale) => ({
        url: 'api/translations',
        params: { locale },
        transformResponse: [
            (data) => {
                try {
                    const response = JSON.parse(data)
                    return response.data
                } catch (e) {
                    return {}
                }
            }
        ]
    })
}
