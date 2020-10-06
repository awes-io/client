export function mergeRoutes(existingRoutes, newRoutes) {
    newRoutes.forEach(newRoute => {
        const existing = existingRoutes.find(
            ({ path }) => path === newRoute.path
        )

        if (existing && existing.children && newRoute.children) {
            return mergeRoutes(existing.children, newRoute.children)
        }

        if (!existing) {
            existingRoutes.push(newRoute)
        }
    })
}
