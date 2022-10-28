async function userInput(username, password) {
    alert(username + password);
    const userInfo_object = {
        username: username,
        password: password,
    };

    const response = await fetch("/authentication", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const blah = await response.text();
    alert('Your encrypted key is : ' + blah)
}
