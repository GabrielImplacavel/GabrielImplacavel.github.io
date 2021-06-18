function mostrarMais() {
	var pontos = document.getElementById("pontos");
	var showmore = document.getElementById("showmore");
	var btnshowmore = document.getElementById("btnshowmore");

	if (pontos.style.display === "none") {
		pontos.style.display = "inline";
		showmore.style.display = "none";
		btnshowmore.innerHTML = "+ Carregar mais filmes";
	} else {
		pontos.style.display = "none";
		showmore.style.display = "inline";
		btnshowmore.innerHTML = "- Carregar menos filmes";
	}
}
function more() {
	var pontos = document.getElementById("etc");
	var showmore = document.getElementById("showmore1");
	var btnshowmore = document.getElementById("btn1");

	if (pontos.style.display === "none") {
		pontos.style.display = "inline";
		showmore.style.display = "none";
		btnshowmore.innerHTML = "+ Carregar mais avaliações";
	} else {
		pontos.style.display = "none";
		showmore.style.display = "inline";
		btnshowmore.innerHTML = "- Carregar menos avaliações";
	}
}
function btnshow() {
	var pontos = document.getElementById("point");
	var showmore = document.getElementById("making");
	var btnshowmore = document.getElementById("showmaking");

	if (pontos.style.display === "none") {
		pontos.style.display = "inline";
		showmore.style.display = "none";
		btnshowmore.innerHTML = "+ Carregar mais Making of's";
	} else {
		pontos.style.display = "none";
		showmore.style.display = "inline";
		btnshowmore.innerHTML = "- Carregar menos Making of's";
	}
}




function mudar(element, result) {
	let allBox = document.querySelectorAll(element);
	for (let index = 0; index < allBox.length; index++) {
		allBox[index].style.display = result;
	}
}

function Verificar(element, busca) {
	let conjunto = busca.includes(element);
	if (conjunto === true) {
		mudar('#nothing', "none");
		mudar(`#${element}`, "inline");
		return true;
	}
	else
		return false;
}

var Main = document.getElementById("Main");
var Pesquisa = document.getElementById("pesquisa");


var busca = [];
var search = false;
$(function () {
	$('input, txtBusca').on('keypress', function (e) {

		if (e.code === 'Enter') {
			busca = document.getElementById("txtBusca").value.toLowerCase();
			Main.style.display = 'none'
			Pesquisa.style.display = 'inline'
			e.preventDefault();

			mudar('#netflix', "none");
			mudar('#disney', "none");
			mudar('#telecine', "none");
			mudar('#youtube', "none");

			let netflix = Verificar('netflix', busca);
			let disney = Verificar('disney', busca);
			let telecine = Verificar('telecine', busca);
			let youtube = Verificar('youtube', busca);
			if (netflix === true || disney === true || telecine === true || youtube === true) {
				mudar('#nothing', "none");
			} else {
				mudar('#nothing', "block");
			}

		}


	});
});





let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageUrl = 'https://image.tmdb.org/t/p/w500';


var titulo = document.getElementById('Titulo');
var estreia = document.getElementById('Data');
var descricao = document.getElementById('Descricao');
var Genero = document.getElementById('Gen');
var popup = document.getElementById('popup');

var img = document.createElement("IMG");
img.style.width = "100%";
img.style.height = "100%";

var links = document.createElement("a");
links.style.color = "#0076A3";
var Text = document.createTextNode("Mais sobre o filme");
links.setAttribute('target', "_blank")
links.appendChild(Text);
var generos = " ";



var closer = document.getElementById('popup-closer');
closer.onclick = function () {
	popup.style.display = 'none';
	closer.blur();
	clear("Titulo");
	clear("Data");
	clear("Image");
	clear("Gen");
	clear("Descricao");
	clear("Link");

	return true;
};


function clear(find) {
	let alvo = document.getElementById(find);

	alvo.innerText = "";
}

function abrir(id) {
	document.getElementById(id).style.display = "block";

}


var descendentes = document.querySelectorAll("#popup-open");
for (var i = 0; i < descendentes.length; i++) {
	descendentes[i].addEventListener("click", function (e) {
		var code = e.path[1].name;
		var url = `https://api.themoviedb.org/3/movie/${code}?api_key=1443e02b3d4d8b4bef2aea839b2fefc2`;
		console.log(url);

		fetch(url)
			.then((result) => {
				return result.json();
			})
			.then((data) => {
				var Title = data.title;
				var Data = data.release_date;
				var Image = baseImageUrl + data.poster_path;
				var Description = data.overview;
				var Link = data.homepage;
				console.log(data.genres.length)

				titulo.innerHTML = Title;
				estreia.innerHTML = Data;
				img.src = Image;
				descricao.innerHTML = Description;

				document.getElementById('Image').appendChild(img);

				links.setAttribute('href', Link);
				document.getElementById("Link").appendChild(links);

				for (var i = 0; i < data.genres.length; i++) {
					if (i == data.genres.length - 1)
						generos = generos + data.genres[i]['name'] + "  ";
					else
						generos = generos + data.genres[i]['name'] + ",  ";


				}
				Genero.innerHTML = generos;
				generos = ""
			});

	})
}


