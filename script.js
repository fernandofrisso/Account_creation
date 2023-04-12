B7Validator ={

    handleSubmit:(event) =>{ //recebe o evento de submit
        event.preventDefault() // para o evento de submit = previna o comportamento padrão que é de enviar o formulário

        let send = true; // eu vou enviar o formulário ? sim

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors(); // essa função serve para limpar a mensagem de erro quando voce não preenche o formulário

        for(let i=0; i < inputs.length;i++){ // vou fazer um loop em cada um dos campos 

            let input = inputs[i];

            let check = B7Validator.checkInput(input);

            if(check !== true){ // se essa função (check) não retornar true, signifca wue deu erro naquela campo e 

                send = false; // para n enviar o formulário

                B7Validator.showError(input, check)

                //exibir o erro

                console.log(check)
            }

        }

        if(send){

            form.submit(); // envie o formulário
        }

    },

    checkInput:(input) => {

        let rules = input.getAttribute('data-rules')

        if(rules!== null){

            rules = rules.split('|');

            for(let k in rules){

                let rDetails = rules[k].split('=');

            switch(rDetails[0]){

                case 'required':

                if(input.value == ""){

                    return 'Campo não pode ser vazio'
                }

                break;

                case 'min':

                if(input.value.length < rDetails[1]){ //se a quantidade de caracteres que está no campo for menor que a quantidade mínima (esse [1] significa o segundo parametro no meu "date-rules")

                    return "Campo tem que ter pelo menos " +rDetails[1]+ " caracteres"
                }

                break;

                case 'email':

                    if(input.value != ''){ // se o input está diferente de vazio, ou seja, está preenchido, nós fazemos a verificação do e-mail

                    // isso é uma expressão regular, que verifica com excelencia se é um e-mail valido

                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if(!regex.test(input.value.toLowerCase())){

                    return "E-mail digitado não é valido"

                    }

                }

                break;

            }
        }

    }

        return true

    }, 

    showError:(input, error) => { 

        input.style.borderColor = '#FF0000'; // vai mostrar a borda vermelha quando não for preenchido o formulário

        let errorElement = document.createElement('div');  //cria um div

        errorElement.classList.add('error'); // vai adicionar uma class

        errorElement.innerHTML= error; // adciona o texto do elemento da função

        input.parentElement.insertBefore(errorElement, input.elementSibling); // eu vou para o label (é o elemento acima do input), e insiro o "error element" no proximo elemnto depois do input. Desta forma vai aparecer uma mensagem abaixo do campo "seu nome" dizendo sobre a obrogatoriedade de preencher o campo

    },

    clearErrors:() =>{

        let inputs = form.querySelectorAll('input')

        for(let i=0; i < inputs.length; i++){ // faço um loop neles e removo a borda vermelha

            inputs[i].style = "";
        }

        let errorElements = document.querySelectorAll('.error'); //seleciono o erro

        for(let i=0; i < errorElements.length; i++){ // faço um loop neles e removo um por um 

            errorElements[i].remove(); // removo eles
        }
    }
}   

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);
