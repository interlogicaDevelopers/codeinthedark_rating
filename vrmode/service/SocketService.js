export default {
    connect: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    }
}