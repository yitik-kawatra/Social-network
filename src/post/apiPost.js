export const create = async (userId, token, post) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: post
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const posts = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};