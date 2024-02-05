const AppRoutes = {

    home: {
        label: 'Home',
        route: '/'
    },
    communities: {
        label: 'communities',
        route: 'communities'
    },
    communityDetailPage: {
        label: 'Community Detail',
        route: 'community/:id',
        baseRoute: '/community'
    },
    postDetailPage: {
        label: 'Community Detail',
        route: 'post/:id',
        baseRoute: 'post'
    },
    createPost: {
        label: 'Create Post',
        route: 'create-post'
    },
    profile: {
        label: 'profile',
        route: 'profile/:id',
        baseRoute: 'profile'
    }


}
export { AppRoutes }