export function generateRandomCoordinates(maxBoundary) {
    return {
        x: Math.floor((Math.random() * maxBoundary)),
        y: Math.floor((Math.random() * maxBoundary))
    }
}