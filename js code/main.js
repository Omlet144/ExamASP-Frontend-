document.addEventListener('DOMContentLoaded', () => {
    let flag = 0
    let tokern = sessionStorage.getItem("token");
    console.log(tokern);
    let title = document.getElementById("title");
    title.addEventListener('click', (e)=>{
        location.reload();
    });
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/Category/Get Categorys",
        success: function (response) {
            console.log(response)
            for (const item of response) {
                let main = document.getElementById("container");

                let name_category = document.createElement('div');
                name_category.className = "name_category";
                name_category.id = item['id'];
                name_category.innerHTML = `${item['name']}`;
                main.append(name_category);

                name_category.addEventListener('click', (e)=>{

                    console.log(flag)
                    let delElm = document.querySelectorAll('.cart');
                    if(flag==1) {
                        delElm.forEach( e => e.remove() );
                        console.log("in if")
                    }
                    $.ajax({
                        type: "GET",
                        url: `https://localhost:7020/Gadget/Get Gadget by Id_Category?id=${item['id']}`,
                        success: function (response2) {
                            console.log(response2)
                            for (const item of response2) 
                            {
                                let main2 = document.getElementById("container-tovarov");
                                let cart = document.createElement('div');

                                cart.className = "cart";
                                cart.id = item['id'];
                                cart.style.width = "250px";
                                cart.style.height = "250px";
                                cart.style.borderStyle = "solid";
                                cart.style.borderWidth = "2px";
                                main2.append(cart);
                              
                                let img_gadget = document.createElement('img');
                                img_gadget.className = "img_gadget";
                                img_gadget.src = `${item['image']}`;
                                cart.append(img_gadget);

                                let name_gadget = document.createElement('div');
                                name_gadget.className = "cart_gadget";
                                name_gadget.innerHTML = `<b>${item['name']}</b>`;
                                cart.append(name_gadget);

                                let model_gadget = document.createElement('div');
                                model_gadget.className = "cart_gadget";
                                model_gadget.innerHTML = `${item['model']}`;
                                cart.append(model_gadget);

                                let price_gadget = document.createElement('div');
                                price_gadget.className = "cart_gadget";
                                price_gadget.innerHTML = `<b>${item['price']}₴</b>`;
                                
                                cart.append(price_gadget);

                                let btn_buy = document.createElement('button')
                                btn_buy.className = "BuyBtn";
                                btn_buy.textContent = "Buy";
                                cart.append(btn_buy);
                                
                               
                                btn_buy.addEventListener('click', (e)=>{
                                    
                                    if(tokern==null)
                                    {
                                        alert("You need to Login!")
                                    }
                                    else{
                                        alert("Congratulations you Buy it!")
                                    }
                                });

                                flag=1;
                                console.log(flag)

                               
                            }
                          
                        }
                    })
                })
            }    
        },
        error: function(){
            $('#dataDiv').text('error in js!');
        }
    });
    $.ajax({
        type: "GET",
        url: `https://localhost:7020/Gadget/Get Gadgets`,
        success: function (response2) {
            console.log(response2)
            for (const item of response2) 
            {
                let main2 = document.getElementById("container-tovarov");
                let cart = document.createElement('div');

                cart.className = "cart";
                cart.id = item['id'];
                cart.style.width = "250px";
                cart.style.height = "250px";
                cart.style.borderStyle = "solid";
                cart.style.borderWidth = "2px";
                main2.append(cart);
              
                let img_gadget = document.createElement('img');
                img_gadget.className = "img_gadget";
                img_gadget.src = `${item['image']}`;
                cart.append(img_gadget);

                let name_gadget = document.createElement('div');
                name_gadget.className = "cart_gadget";
                name_gadget.innerHTML = `<b>${item['name']}</b>`;
                cart.append(name_gadget);

                let model_gadget = document.createElement('div');
                model_gadget.className = "cart_gadget";
                model_gadget.innerHTML = `${item['model']}`;
                cart.append(model_gadget);

                let price_gadget = document.createElement('div');
                price_gadget.className = "cart_gadget";
                price_gadget.innerHTML = `<b>${item['price']}₴</b>`;
                
                cart.append(price_gadget);

                let btn_buy = document.createElement('button')
                btn_buy.className = "BuyBtn";
                btn_buy.textContent = "Buy";
                cart.append(btn_buy);

                btn_buy.addEventListener('click', (e)=>{
                    if(tokern==null)
                    {
                        alert("You need to Login!")
                    }
                    else{
                        alert("Congratulations you Buy it!")
                    }
                });

                flag=1;
                console.log(flag)

               
            }
          
        }
    })
})