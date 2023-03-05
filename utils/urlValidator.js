/* eslint-disable node/no-unsupported-features/es-syntax */
import dns from 'dns';

export default function isValidUrl(url) {
    // Remove the protocol from the URL (if any)
    url = url.replace(/^(https?|ftp):\/\//, '');

    // Get the hostname from the URL
    const hostname = url.split('/')[0];

    // Use dns.lookup() to check if the hostname is valid
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (err, address) => {
            if (err) {
                // The hostname is not valid
                reject(err);
            } else {
                // The hostname is valid
                resolve(true);
            }
        });
    });
}
