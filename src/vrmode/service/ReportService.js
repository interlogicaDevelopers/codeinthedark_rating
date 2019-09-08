
export default {

    report(msg, type = 'error') {

        return fetch('/report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    type,
                    userAgent: navigator.userAgent, 
                    msg
                }
            )
        })
        .then(() => {return true;})
        .catch((err) => {return false;})
    }
}