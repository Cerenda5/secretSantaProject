'use strict';

document.addEventListener('DOMContentLoaded', function ()
{
    let execute = document.getElementById('execute');
    let resultat = document.getElementById('resultat');


    execute.addEventListener('click', function(e)
    {
        e.preventDefault();
        let choix = $('[name=text]:checked').val();
        console.log(choix);
        
        switch (choix) 
        {
            case 'html':
                $.get('text.html', function(html)
                {
                    resultat.innerHTML = html;
                });
                break;
            case 'jison':
                let get = $.getJSON( 'http://localhost/PHP/exoAjax/php/jison.php' , function(succes)
                {
                    console.log(succes);
                    let ul = document.createElement('ul');
                    succes.forEach(element => 
                        {
                            let li = document.createElement('li');
                            li.innerText = element['name'] + ' ==> ' + element['phone'];
                            ul.appendChild(li);
                        });
                        resultat.innerHTML = '';
                        resultat.appendChild(ul);
                });

                break;
            case 'film':
                $.get('http://localhost/PHP/exoAjax/php/film.php', function(html)
                {
                    resultat.innerHTML = html;
                });
                
                break;
        
            default:
                break;
        }
    })
    
});