document.addEventListener('DOMContentLoaded', () => {
    let btn_regist = document.getElementById("btn_regist");
    let login_input_regist = document.getElementById("login_input_regist");
    let email_input = document.getElementById("email_input");
    let pass_input_regist = document.getElementById("pass_input_regist");
   
    btn_regist.addEventListener('click', (e)=>{
        let regist_data = {
            UserName: login_input_regist.value,
            Email: email_input.value,
            Password: pass_input_regist.value,
        };
        console.log(regist_data)
    $.ajax({
        type: "POST",
        url: "https://localhost:7020/api/Authentication/regUser",
        data: JSON.stringify(regist_data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        success: function (data) {
            window.open('login.html')
        },
        error: function ()
        {
            alert("Something is wrong!")
        }
    });
});

});