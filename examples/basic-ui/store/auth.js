export const state = () => ({
    // mock authorized user
    user: {
        name: 'User Name',
        info: 'Standart until 10 November<br />5 users $500 per month',
        avatar: {
            w96: '/img/icon.jpg',
            w500: '/img/icon.jpg'
        },
        additional: [
            {
                key: 'darkTheme',
                order: 1,
                item: {
                    component: 'AwSwitcher',
                    listeners: {
                        click: () => {
                            console.log('click switcher dark')
                        }
                    },
                    props: {
                        text: 'Dark theme',
                        value: false
                    }
                }
            }
        ]
    }
})
