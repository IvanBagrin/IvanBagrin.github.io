async function f() {
    //Функция создает блок с данными товара
    function createProduct(product) {
        let catalogItem = document.querySelector('.catalog-item__wrapper');
        let newProduct = document.createElement('div');
        newProduct.className = 'catalog-item__content';
        newProduct.innerHTML = `
                <img src="${product.img}" alt="catalog_photo" class="catalog-item__img">
                <div class="catalog-item__subtitle">${product.name}</div>
                <div class="catalog-item__price">${addCommas(product.price)} ₽</div>
                <button class="button button_buy">КУПИТЬ</button>`
    
                catalogItem.append(newProduct);   
    }


    //разбиение числа на триады
    function addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return x1 + x2;
    }
    
    //запрашиваем данные из файла product.json
    await fetch(`product/product.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        for (let key in data){
            for(let keyProduct of data[key]) {
    
                createProduct(keyProduct)
                console.log(keyProduct);
            }
    
            
        }
    });
  

    //после добавления товаров запускаем jquery
    await $(document).ready(function() {
    
        //появление модального окна и вывод названия товара по которому кликнули
        $('.button_buy').each(function(i) {
            $(this).on('click', function() {
                console.log('jquery')
                $('#buy').val($('.catalog-item__subtitle').eq(i).text());
              //  $('#buy').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('slow');
            })
        })
    
        //отработака "Крестика", закрытие модального окна
        $('.modal__close').on('click', function() {
            $('.overlay, #order, .modal_mini').fadeOut('slow');
    
        });
        
        //Маска для ввода телефона
        $("input[name=phone]").mask("+7 (999) 999-99-99");
    
    
        //отработка клика Купить в модальном окне
        $('form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $("#order").fadeOut('slow');
                $('.modal_mini').fadeIn('slow');
    
    
    
                $('form').trigger('reset');
            })
            return false;
        });
    
    });
    
  }
  
  f();

