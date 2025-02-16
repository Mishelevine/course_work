export const sidebarLinks = [
    {
        label: 'Учёт ПО',
        route: "/software",
        min_needed_role: 1,
        // imgUrl: '/icons/Home.svg'
    },
    {
        label: 'Учёт комплекса ТС',
        route: '/equipment',
        min_needed_role: 2,
        // imgUrl: '/icons/activities.svg'
    },
    {
        label: 'Пользователи',
        route: '/users',
        min_needed_role: 4,
        // imgUrl: '/icons/organisations.svg'
    },
    {
        label: 'Бэкап БД',
        route: '/backup',
        min_needed_role: 4,
        // imgUrl: '/icons/organisations.svg'
    }
]

export const WebSiteName = 'HSE SATS'
export const API_URL = 'http://localhost:8000'
export const WEBSITE_URL = 'http://localhost:3000'

export const PC_CENTER_PAGE = 'https://perm.hse.ru/pc_centre/'

export const signingPages = [
    '/sign-in'
]

export const imgExtensions = [
    '.jpg', '.jpeg', '.png', '.svg'
]

export const closedPages = [
    '/sign-up'
]

export const firstRolePages = [
    '/software'
]

export const secondRolePages = [
    '/software', '/equipment'
]

export const thirdRolePages = [
    '/software', '/equipment', '/characteristics'
]
