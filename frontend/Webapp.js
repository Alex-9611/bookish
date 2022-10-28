async function userInput(username, password) {
    const userInfo_object = {
        username: username,
        password: password,
    };

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });
    const responseText = await response.text();
    if (responseText.length === 169) {
        console.log(responseText);
        alert("Your encrypted key is : " + responseText);
    } else {
        alert(responseText);
    }
}