// Promise Success
function fetchData() {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
            const data = { id: 12, name: 'Milan Kumar' };
            if (data) {
                resolve(data); // Resolve the promise with the fetched data
            } else {
                reject(new Error('Failed to fetch data.')); // Reject the promise with an error
            }
        }, 2000);
    });
}

// Usage of the custom promise
fetchData().then((data) => { console.log('Data:', data); }).catch((error) => { console.error('Error:', error); });

// Promise Failure
function fetchData1() {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous API call
        setTimeout(() => {
            const data = null;
            if (data) {
                resolve(data); // Resolve the promise with the fetched data
            } else {
                reject(new Error('Failed to fetch data.')); // Reject the promise with an error
            }
        }, 2000);
    });
}
