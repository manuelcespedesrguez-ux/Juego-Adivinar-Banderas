import confetti from './node_modules/canvas-confetti/dist/confetti.module.mjs';
import { nombresAlternativos } from './nombres.js';

const form = document.querySelector('#form');
const inputPais = document.querySelector('#pais');
const boton = document.getElementById('botonResponder');
const resultado = document.querySelector('#resultado');
const aciertos = document.querySelector('#aciertos');
const fallos = document.querySelector('#fallos');

const todosPaises = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Caribbean Netherlands',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'DRC',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'England',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern and Antarctic Lands',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'North Korea',
  'North Macedonia',
  'Northern Ireland',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn Islands',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Saudi Arabia',
  'Scotland',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syria',
  'São Tomé and Príncipe',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'United States Minor Outlying Islands',
  'United States Virgin Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Wales',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands',
];

let paisAleatorio = '';
let contadorAciertos = 0;
let contadorFallos = 0;
let respondido = true;
const totalRondas = 10;
let rondas = 0;

async function buscarPaisesRandom() {
  respondido = true;
  form.hidden = true; //input y botón ocultos hasta que se cargue la bandera

  paisAleatorio = todosPaises[Math.floor(Math.random() * todosPaises.length)];
  const API_KEY = 'rc_live_cb1fceda25404a5cb9115691a936c71a';
  try {
    const response = await fetch(
      'https://api.restcountries.com/countries/v5?q=' + paisAleatorio,
      { headers: { Authorization: 'Bearer ' + API_KEY } }
    );
    const infoPais = await response.json();
    resultado.innerHTML = `<img src="${infoPais.data.objects[0].flag.url_svg}"/>`;
    // bandera visible asi que se puede responder
    respondido = false;
    form.hidden = false;
    inputPais.focus(); // para escribir directamente sin hacer clic
  } catch (error) {
    console.error('Error al cargar la API:', error);
  }
}

// Quita mayúsculas, tildes y signos para comparar sin ser estrictos
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Quita prefijos como "Islas" o "República" para aceptar "Vaticano" o "Malvinas"
function sinPrefijo(texto) {
  return normalizar(texto).replace(
    /^(islas|isla|republica|ciudad del|ciudad de|islands|island) /,
    ''
  );
}

// Acepta el nombre en inglés o cualquiera de sus variantes en español
function esRespuestaCorrecta(respuesta) {
  const intento = normalizar(respuesta);
  const intentoCorto = sinPrefijo(respuesta);
  const validos = [
    paisAleatorio,
    ...(nombresAlternativos[paisAleatorio] ?? []),
  ];
  return validos.some(
    (nombre) =>
      normalizar(nombre) === intento || sinPrefijo(nombre) === intentoCorto
  );
}

function comprobarPais(event) {
  event.preventDefault();
  if (respondido) return; // ya respondida esta ronda: evita contar dos veces
  respondido = true;
  form.hidden = true;
  const acierto = esRespuestaCorrecta(inputPais.value);
  if (acierto) {
    contadorAciertos++;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); // celebración al acertar
    aciertos.textContent = `Aciertos: ${contadorAciertos}`;
  } else {
    contadorFallos++;
    fallos.textContent = `Fallos: ${contadorFallos}`;
  }
  rondas++;
  const ultima = rondas === totalRondas;
  resultado.innerHTML = `
    <p style="color: ${acierto ? 'green' : 'red'};">
      ${acierto ? '¡Correcto!' : 'Fallaste.'} Era ${paisAleatorio}
    </p>
    ${
      ultima //si es la ultima ronda se muestran los contadores y un boton de jugar otra vez
        ? `<h2>Puntuación final: ${contadorAciertos}/${totalRondas}</h2>
           <button type="button" id="botonReiniciar">Jugar otra vez</button>`
        : `<button type="button" id="botonSiguiente">Siguiente</button>`
    }
  `;
  inputPais.value = ''; // se limpia el input para la próxima bandera
  // el botón recibe el foco para poder pulsarlo con Intro
  const botonSiguienteRonda = document.getElementById(
    ultima ? 'botonReiniciar' : 'botonSiguiente'
  );
  botonSiguienteRonda.addEventListener(
    'click',
    ultima ? () => location.reload() : buscarPaisesRandom
  );
  botonSiguienteRonda.focus();
}

boton.addEventListener('click', comprobarPais); 

buscarPaisesRandom(); 