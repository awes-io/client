export default [
    {
        id: 1,
        email: 'employee@example.com',
        password: 'secret'
        // no permissions at all
    },
    {
        id: 2,
        email: 'admin@example.com',
        password: 'secret',
        permissions: [
            {
                action: 'manage',
                subject: 'Appointments'
            },
            {
                action: 'view',
                subject: 'Settings'
            }
        ]
    }
]
