import * as Secret from './Secret';

export async function fetchVideos() {
    try {
        const result = await fetch(`https://api.vimeo.com/users/${ Secret.VIMEO_USER_ID }/videos`, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Bearer ${ Secret.VIMEO_PRIVATE_ACCESS_TOKEN }`
            })
        });
        return await result.json();
    } catch (error) {
        console.error(error);
    }
};