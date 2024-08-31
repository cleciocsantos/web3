const form = document.querySelector('.form_exemplo');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const conf_senha = document.getElementById('conf_senha');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        conf_senha: conf_senha.value
    };

    try{
        const response = await fetch('/send-information', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        // alert("Nome: " + result.nome + "\nSobrenome: " + result.sobrenome);
        if(result.status == 'failed'){
            document.getElementById('message').innerHTML = result.message;
        }
        else{
            document.getElementById('message').innerHTML = result.message;
            nome.value = '';
            email.value= '';
            senha.value = '';
            conf_senha.value = '';
        }
    } catch (error){
        console.log('Error: ', error);
    }
});