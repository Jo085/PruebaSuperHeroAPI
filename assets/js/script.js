$(document).ready(function () {  
    function busqueda(id){
        $.ajax({ // consulta API
            type: "GET",
            url: "https://superheroapi.com/api.php/4905856019427443/" + id,
            dataType: "json",
            success: function (data) {
              console.log(data);          
              mostrarResultado(data) // Muestra el resultado de la búsqueda en el html      
            },
            error: function(error) {
            console.log('No fue posible obtener la información.'); 
            }
        });
      }

    $("form").on("submit", function (event) {
          event.preventDefault();
          let characterId = $("#numId").val(); // Rescata el valor del input
          
          if (characterId > 732 || characterId == 0) { //comprueba si el n° ingresado corresponde a un id valido
              ocultarResultado(); // Mantiene oculta la card y gráfico del héroe 
              alert(`El valor " ${characterId} " no corresponde a ningun héroe. Por favor, ingrese un número de id entre 1 y 732`);
          } else if (validarSiEsNumero(characterId)) { //comprueba si el valor ingresado es un número
              busqueda(characterId); // se ejecuta la busqueda y muestra el resultado
          } else { // si no es un  número muestra una alerta 
              ocultarResultado();// La sección resultado se mantiene oculta (card y gráfico) 
              alert(`"${characterId}" no es válido. Por favor, ingrese un número`);
          }      
    });

    function mostrarResultado(data){ // función para renderizar la info en la card y gráfico
      // Información héroe 
        $(".resultado").removeClass('d-none');
        $("#imagen").attr(`src`, data.image.url);
        $("#Nombre").html(`${data.name}`);
        $("#Conexiones").html(`Conexiones: ${data.connections["group-affiliation"]}`);
        $("#PublicadoPor").html(`Publicado por: ${data.biography.publisher}`);
        $("#Ocupacion").html(`Ocupación: ${data.work.occupation}`);
        $("#PrimeraAparicion").html(`Primera Aparición: ${data.biography["first-appearance"]}`);
        $("#Altura").html(`Altura: ${data.appearance.height.join(' - ')}`);
        $("#Peso").html(`Peso: ${data.appearance.weight.join(' - ')}`);
        $("#Alianzas").html(`Alianzas: ${data.biography.aliases}`); 

      // Información gráfico
        var options = {
          animationEnabled: true,         
          title: {
            text: "Estadísticas de poder para " + data.name,
            fontFamily: "Segoe UI",
            fontSize: 26,
            fontWeight: 500,
          },
                      
          data: [
            {
              type: "pie",
              startAngle: 240,
              yValueFormatString: '##0.00"%"',
              indexLabel: "{label} {y}",
              dataPoints: [
                { y: data.powerstats.combat, label: "Combate" },
                { y: data.powerstats.durability, label: "Durabilidad" },
                { y: data.powerstats.intelligence, label: "inteligencia" },
                { y: data.powerstats.power, label: "Poder" },
                { y: data.powerstats.speed, label: "Velocidad" },
                { y: data.powerstats.strength, label: "Fuerza" },
              ],
            },
          ],
        };
        $("#chartContainer").CanvasJSChart(options);
    }

    // Valida si el valor ingresado por el usuario es un número
    function validarSiEsNumero(characterId) {
        return /^([0-9])*$/.test(characterId);
    }

    // Mantiene oculta la sección del resultado de la búsqueda
    function ocultarResultado(){ 
      return $(".resultado").addClass('d-none');        
    }
    
});
 
