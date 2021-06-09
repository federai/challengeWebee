function verSensores(event){
    let nombre = document.getElementById('name');
    let active = document.getElementById('active');
    let minval = document.getElementById('minval');
    let maxval = document.getElementById('maxval');


    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

fetch('http://localhost:3000/sensors', requestOptions)
.then((result)=> console.log(result.json()));
}

verSensores();