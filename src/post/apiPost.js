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

export const singlePost = async postId => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const postsByUser = async (userId, token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const remove = async (postId, token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const update = async (postId, token, post) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
            method: "PUT",
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