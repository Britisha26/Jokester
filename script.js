const jokeDiv = document.querySelector(".joke-div");
let joke = document.querySelector("#joke");
const btnGenerate = document.querySelector('button');
let category = document.querySelector('#category');
let lang = document.querySelector('#lang');

const jester = async () =>{
    joke.style.textAlign="center";
    joke.innerText = "Loading..."
    const resolve = await fetch(`https://v2.jokeapi.dev/joke/${category.value}?lang=${lang.value}&format=json&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`)
    .then((resolve)=>{
        return resolve.json();
    })
    .then((data)=>{
        joke.style.textAlign="justify";
        if(data.type=="single"){
            console.log(data.joke);
            joke.innerText = data.joke;
        }
        else if(data.type=="twopart"){
            joke.innerText = `${data.setup} \n${data.delivery}`;
         }
         else {
            joke.innerText = "Oops no jokes found, try something else...";
         }
        jokeDiv.style.display = "inline-block";
    })
    .catch((e)=>{
        console.log(e);
        joke.innerText = "Couldn't fetch a joke. Try another category/language.";
        alert("Please try another language or category");
    })
}

btnGenerate.addEventListener('click', jester);
