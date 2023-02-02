document.addEventListener('DOMContentLoaded', () => {
    let btn_login = document.getElementById("btn_login");
    let login_input = document.getElementById("login_input");
    let pass_input = document.getElementById("pass_input");
   
    btn_login.addEventListener('click', (e)=>{
        let login_data = {
            UserName: login_input.value,
            Password: pass_input.value,
        };
        console.log(login_data)
    $.ajax({
        type: "POST",
        url: "https://localhost:7020/api/Authentication/login",
        data: JSON.stringify(login_data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        success: function (data) {
            console.log(data.token)
            sessionStorage.setItem("token", data.token);
            let user_or_manager = document.getElementById("UserOrManager");
            if(user_or_manager.value == "User")
            { window.open('main.html') }
            else{ window.open('manager.html')}
           
        },
        error: function ()
        {
            alert("Not corect password or login!")
        }
    });
});

});