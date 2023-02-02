document.addEventListener('DOMContentLoaded', () => {
    let flag = 0
    let form = document.getElementById("form1");
    let form2 = document.getElementById("form2");
    let btn_add_gadget = document.getElementById("add_gadget");
    let btn_new_manager = document.getElementById("add_manager");
    console.log(sessionStorage.getItem("token"));
    $.ajax({
        type: "GET",
        url: "https://localhost:7020/Category/Get Categorys",
        headers:{
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
        success: function (response) {
            console.log(response)
            for (const item of response) {
                let main = document.getElementById("container");
          
                let cart = document.createElement('div');
                cart.className = "cart";
                cart.id = item['id'];
                cart.style.width = "250px";
                cart.style.height = "50px";
                cart.style.borderStyle = "solid";
                cart.style.borderWidth = "2px";
                cart.style.textAlign = "center";
                main.append(cart);
    
                let name_category = document.createElement('div');
                name_category.className = "name_category";
                name_category.innerHTML = `<h4>${item['name']}<h4>`;
                cart.append(name_category);

                cart.addEventListener('click', (e)=>{
                    btn_add_gadget.style.display = "inline";
                    btn_add_gadget.style.display = "block"
                    
                    form.style.display = "none";
                    form2.style.display = "none";

                    console.log(flag)
                    let delElm = document.querySelectorAll('.row');
                    if(flag==1) {
                        delElm.forEach( e => e.remove() );
                        console.log("in if")
                    }
                    $.ajax({
                        type: "GET",
                        url: `https://localhost:7020/Gadget/Get Gadget by Id_Category?id=${item['id']}`,
                        headers:{
                            "Authorization": "Bearer " + sessionStorage.getItem("token")
                        },
                        success: function (response2) {
                            console.log(response2)
                            for (const item of response2) 
                            {
                                let table = document.getElementById("table_gadgets");
                                let tr = document.createElement('tr');

                                tr.className = "row";
                                tr.id = item['id'];
                                table.append(tr);

                                let img_gadget = document.createElement('img');
                                img_gadget.className = "img_gadget";
                                img_gadget.src = `${item['image']}`;
                                tr.append(img_gadget);

                                let name_gadget = document.createElement('td');
                                name_gadget.className = "cart_gadget";
                                name_gadget.innerHTML = `${item['name']}`;
                                tr.append(name_gadget);

                                let model_gadget = document.createElement('td');
                                model_gadget.className = "cart_gadget";
                                model_gadget.innerHTML = `${item['model']}`;
                                tr.append(model_gadget);

                                let price_gadget = document.createElement('td');
                                price_gadget.className = "cart_gadget";
                                price_gadget.innerHTML = `${item['price']}`;
                                tr.append(price_gadget);

                                let quantity_gadget = document.createElement('td');
                                quantity_gadget.className = "cart_gadget";
                                quantity_gadget.innerHTML = `${item['quantity']}`;
                                tr.append(quantity_gadget);

                                let sold_gadget = document.createElement('td');
                                sold_gadget.className = "cart_gadget";
                                sold_gadget.innerHTML = `${item['sold']}`;
                                tr.append(sold_gadget);

                                let status_gadget = document.createElement('td');
                                status_gadget.className = "cart_gadget";
                                status_gadget.innerHTML = `${item['status']}`;
                                tr.append(status_gadget);

                                let form_for_btns = document.createElement('td');
                                form_for_btns.id = "form_for_btns";
                                tr.append(form_for_btns);

                                let update = document.createElement('button')
                                update.className = "Btn";
                                update.id = "UpdateBtn";
                                update.textContent = "Update";
                                form_for_btns.append(update);

                                update.addEventListener('click', (e)=>{

                                    form2.style.display = "inline";
                                    form2.style.display = "flex";     

                                    let img_update_gadget = document.getElementById("img_update_gadget"); 
                                    let name_update_gadget = document.getElementById("name_update_gadget");  
                                    let model_update_gadget = document.getElementById("model_update_gadget"); 
                                    let price_update_gadget = document.getElementById("price_update_gadget");
                                    let quantity_update_gadget = document.getElementById("quantity_update_gadget");
                                    let status_update_gadget = document.getElementById("status_update_gadget");
                                    let select_update_category = document.getElementById("select_update_category");
                                    let sold_update_gadget = document.getElementById("sold_update_gadget");
                                    let btn_update_gadget = document.getElementById("update_gadget");

                                    img_update_gadget.value = img_gadget.src;
                                    name_update_gadget.value = name_gadget.textContent;
                                    model_update_gadget.value = model_gadget.textContent;
                                    price_update_gadget.value = price_gadget.textContent;
                                    quantity_update_gadget.value = quantity_gadget.textContent;
                                    sold_update_gadget.value = sold_gadget.textContent;

                                    btn_update_gadget.addEventListener('click', (e)=>{

                                        var status2 = false;
                                        let id = parseInt(item['id']);
                                        if(status_update_gadget.value=="true")
                                        {
                                            status2 = true;
                                        }

                                        let gadget_data = {
                                            Id: id,
                                            Image: img_update_gadget.value,
                                            Name: name_update_gadget.value,
                                            Model: model_update_gadget.value,
                                            Price: parseFloat(price_update_gadget.value),
                                            Quantity: parseInt(quantity_update_gadget.value),
                                            Sold: parseInt(sold_update_gadget.value),
                                            Status: status2,
                                            IdCategory: parseInt(select_update_category.value)
                                        };
                                        console.log(gadget_data)
                                        $.ajax({
                                            type: "POST",
                                            url: "https://localhost:7020/Gadget/Update Gadget by Id",
                                            data: JSON.stringify(gadget_data),
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                "Authorization": "Bearer " + sessionStorage.getItem("token")
                                                },
                                            success: function(data) {
                                                console.log(data);
                                            }
                                        })
                                        tr.remove();
                                    });
                                })

                                let dell = document.createElement('button')
                                dell.className = "Btn";
                                dell.id = "DellBtn";
                                dell.textContent = "X";
                                form_for_btns.append(dell);
                                
                                dell.addEventListener('click', (e)=>{
                                    let id = parseInt(item['id']);
                                    console.log(id)
                                    $.ajax({
                                        type: "POST",
                                        url: "https://localhost:7020/Gadget/Remove Gadget by Id",
                                        data: JSON.stringify(id),
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            "Authorization": "Bearer " + sessionStorage.getItem("token")
                                            },
                                        success: function(data) {
                                            console.log(data);
                                        }
                                    })
                                    tr.remove();
                                })


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
    btn_add_gadget.style.display = "block";
        btn_add_gadget.addEventListener('click', (e)=>{     
                        
                btn_add_gadget.style.display = "none";

                let img_new_gadget = document.getElementById("img_new_gadget"); 
                let name_new_gadget = document.getElementById("name_new_gadget");  
                let model_new_gadget = document.getElementById("model_new_gadget"); 
                let price_new_gadget = document.getElementById("price_new_gadget");
                let quantity_new_gadget = document.getElementById("quantity_new_gadget");
                let status_new_gadget = document.getElementById("status_new_gadget");
                let select_category = document.getElementById("select_category");
                let btn_creat_gadget = document.getElementById("create_gadget");

                form.style.display = "inline";
                form.style.display = "flex";     

                btn_creat_gadget.addEventListener('click', (e)=>{  
                    form.style.display = "none";
                    var status = false;
                    if(status_new_gadget.value=="true")
                    {
                        status = true;
                    }
                    let new_gadget = {
                        Image: img_new_gadget.value,
                        Name: name_new_gadget.value,
                        Model: model_new_gadget.value,
                        Price: parseFloat(price_new_gadget.value),
                        Quantity: parseInt(quantity_new_gadget.value),
                        Status: status,
                        IdCategory: parseInt(select_category.value)
                    };
                    console.log(new_gadget);
                    $.ajax({
                        type: "POST",
                        url: "https://localhost:7020/Gadget/Add Gadget",
                        data: JSON.stringify(new_gadget),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + sessionStorage.getItem("token")
                            },
                        success: function(data) {
                            console.log(data);
                            location.reload();
                        }
                    })
                    location.reload();
                    btn_add_gadget.style.display = "inline";
                    btn_add_gadget.style.display = "block"
                });
        });
    btn_new_manager.addEventListener('click', (e)=>{
        window.open('register_manager.html')
        });
})