import { fromPairs } from 'rambdax'
import Accordions from './Accordions.vue'
import Buttons from './Buttons.vue'
import Chart from './Chart.vue'
import Dropdowns from './Dropdowns.vue'
import Filter from './Filter.vue'
import Grid from './Grid.vue'
import Forms from './Forms.vue'
import FormsAddress from './Forms_Address.vue'
import FormsCheckbox from './Forms_Checkbox.vue'
import FormsCode from './Forms_Code.vue'
import FormsDate from './Forms_Date.vue'
import FormsRadio from './Forms_Radio.vue'
import FormsText from './Forms_Text.vue'
import Subnav from './_subnav.vue'
import FormsSelect from './Forms_Select.vue'
import FormsSearch from './Forms_Search.vue'
import FormsSelectObject from './Forms_Select_Object.vue'
import FormsSelectAjax from './Forms_Select_Ajax.vue'
import Icons from './Icons.vue'
import Modals from './Modals.vue'
import Markdown from './Markdown.vue'
import Profile from './Profile.vue'
import ProfileSecurity from './Profile_Security.vue'
import Tabs from './Tabs.vue'
import Timeline from './Timeline.vue'
import Table from './Table.vue'
import Typography from './Typography.vue'

const routes = [
    {
        path: '/accordions',
        component: Accordions,
        meta: { title: 'Accordions and also test menu item with long text' }
    },
    {
        path: '/buttons',
        component: Buttons,
        meta: { title: 'Links and Buttons' }
    },
    { path: '/dropdowns', component: Dropdowns, meta: { title: 'Dropdowns' } },
    { path: '/filter', component: Filter, meta: { title: 'Filter' } },
    {
        path: '/forms',
        meta: { title: 'Form controls' },
        component: Subnav,
        children: [
            {
                path: '',
                components: {
                    default: Subnav,
                    subnav: Forms
                },
                meta: { title: 'Form controls', showInAside: false }
            },
            {
                path: 'address',
                components: {
                    default: Subnav,
                    subnav: FormsAddress
                },
                meta: { title: 'Address and Phone fields' }
            },
            {
                path: 'checkbox',
                components: {
                    default: Subnav,
                    subnav: FormsCheckbox
                },
                meta: { title: 'Checkbox fields' }
            },
            {
                path: 'code',
                components: {
                    default: Subnav,
                    subnav: FormsCode
                },
                meta: { title: 'Code fields' }
            },
            {
                path: 'date',
                components: {
                    default: Subnav,
                    subnav: FormsDate
                },
                meta: { title: 'Date fields' }
            },
            {
                path: 'radio',
                components: {
                    default: Subnav,
                    subnav: FormsRadio
                },
                meta: { title: 'Radio fields' }
            },
            {
                path: 'text',
                components: {
                    default: Subnav,
                    subnav: FormsText
                },
                meta: { title: 'Text fields' }
            },
            {
                path: 'search',
                components: {
                    default: Subnav,
                    subnav: FormsSearch
                },
                meta: { title: 'Search fields' }
            },
            {
                path: 'select',
                components: {
                    default: Subnav,
                    subnav: Subnav
                },
                meta: {
                    title: 'Select fields',
                    subnav: [
                        { text: 'Text', href: '/forms/select' },
                        { text: 'Object', href: '/forms/select/object' },
                        { text: 'Ajax', href: '/forms/select/ajax' }
                    ]
                },
                children: [
                    {
                        path: 'object',
                        components: {
                            default: Subnav,
                            subnav: FormsSelectObject
                        },
                        meta: {
                            title: 'Select object',
                            subnav: [
                                { text: 'Text', href: '/forms/select' },
                                {
                                    text: 'Object',
                                    href: '/forms/select/object'
                                },
                                { text: 'Ajax', href: '/forms/select/ajax' }
                            ]
                        }
                    },
                    {
                        path: 'Ajax',
                        components: {
                            default: Subnav,
                            subnav: FormsSelectAjax
                        },
                        meta: {
                            title: 'Select Ajax',
                            subnav: [
                                { text: 'Text', href: '/forms/select' },
                                {
                                    text: 'Object',
                                    href: '/forms/select/object'
                                },
                                { text: 'Ajax', href: '/forms/select/ajax' }
                            ]
                        }
                    },
                    {
                        path: '',
                        components: {
                            default: Subnav,
                            subnav: FormsSelect
                        },
                        meta: {
                            title: 'Select text',
                            subnav: [
                                { text: 'Text', href: '/forms/select' },
                                {
                                    text: 'Object',
                                    href: '/forms/select/object'
                                },
                                { text: 'Ajax', href: '/forms/select/ajax' }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    { path: '/icons', component: Icons, meta: { title: 'Icons' } },
    { path: '/grid', component: Grid, meta: { title: 'Grid component' } },
    {
        path: '/modals',
        component: Modals,
        meta: { title: 'Modals' }
    },
    {
        path: '/markdown',
        component: Markdown,
        meta: { title: 'Markdown Editor' }
    },
    {
        path: '/profile',
        component: Subnav,
        meta: {
            title: 'Profile',
            subnav: [
                { text: 'Profile', href: '/profile' },
                { text: 'Security', href: '/profile/security' }
            ]
        },
        children: [
            {
                path: '',
                components: {
                    default: Subnav,
                    subnav: Profile
                },
                meta: {
                    title: 'Profile',
                    subnav: [
                        { text: 'Profile', href: '/profile' },
                        { text: 'Security', href: '/profile/security' }
                    ]
                }
            },
            {
                path: 'security',
                components: {
                    default: Subnav,
                    subnav: ProfileSecurity
                },
                meta: {
                    title: 'Security',
                    subnav: [
                        { text: 'Profile', href: '/profile' },
                        { text: 'Security', href: '/profile/security' }
                    ]
                }
            }
        ]
    },
    {
        path: '/tabs',
        component: Tabs,
        meta: { title: 'Tabs' }
    },
    {
        path: '/chart',
        component: Chart,
        meta: { title: 'Chart' }
    },
    {
        path: '/timeline',
        component: Timeline,
        meta: { title: 'Timeline' }
    },
    {
        path: '/table',
        component: Table,
        meta: { title: 'Table' }
    },
    {
        path: '/typography',
        component: Typography,
        meta: { title: 'Typography' }
    }
]

export const menu = fromPairs(
    routes
        .filter(({ showInAside = true }) => showInAside)
        .map(({ path, meta, children }, i) => [
            `item-${i}`,
            {
                order: i * 10,
                props: {
                    href: path,
                    text: meta.title,
                    icon: meta.icon || 'minus'
                },
                children:
                    (children &&
                        meta.showChildrenInAside !== false &&
                        children.map((child, i) => ({
                            order: i * 10,
                            props: {
                                href: `${path}/${child.path}`,
                                text: child.meta.title
                            }
                        }))) ||
                    []
            }
        ])
)

export default routes
