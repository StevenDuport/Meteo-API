const meteo = {

    loadMeteoFromAPi: function (event){
        event.preventDefault();
        const requestValue = document.querySelector('input').value;
        console.log(requestValue)
        console.log("Methode LoadMeteoFromApi")
        const urlRoot = 'http://api.weatherstack.com/current?access_key=';

        fetch(urlRoot + '&query=' + requestValue )
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(meteoFromApi){
                console.log(meteoFromApi);
                const countryTodisplay = document.getElementById('country')
                const villeTodisplay = document.getElementById('ville');
                const tempTodisplay = document.getElementById('temp');
                const infoTodiplay = document.getElementById('info');
                const img = document.getElementById('logo');
                villeTodisplay.textContent = meteoFromApi.location.name;
                tempTodisplay.textContent = meteoFromApi.current.temperature + "°";

                const infoFromApi = meteoFromApi.current.weather_descriptions[0];
                const resultInfo = meteo.findComma(infoFromApi);
                infoTodiplay.textContent = resultInfo;

                countryTodisplay.textContent = meteoFromApi.location.country;
                const input = document.querySelector("input");
                input.value = '';

                if (meteoFromApi.current.is_day === "yes"){
                    img.src='soleil.png';
                    document.body.style.background='-webkit-gradient(linear, left top, left bottom, from(var(--day-color)), to(var(--dayLighter))) fixed';
                }else{
                    img.src='lune.png';
                    const body = document.body.style.background;
                    document.body.style.background='-webkit-gradient(linear, left top, left bottom, from(var(--night-color)), to(var(--nightLighter))) fixed';
                }
                console.log(meteoFromApi.location.name);
                console.log(meteoFromApi.current.weather_descriptions[0]);
                console.log(meteoFromApi.current.is_day);
                input.classList.remove("input_error");
            }
        )
        .catch(function(error) {
            const input = document.querySelector("input");
            input.classList.add("input_error");
        })
        
    },

    findComma: function(someString){
        const text= someString
        if (text.indexOf(',') != -1){
            text.substring(0, text.indexOf(','))
            return text
        }else{
            return text
        }
    },

    getCity: function(event){
        event.preventDefault();
        const requestValue = document.querySelector('input').value;
        console.log(requestValue)
    }
};

document.addEventListener('submit', meteo.loadMeteoFromAPi);