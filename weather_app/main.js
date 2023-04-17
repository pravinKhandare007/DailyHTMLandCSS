const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather",
  };

document.getElementById("search-box").addEventListener('keypress').set_query();

function set_query(){
    console.log("enter pressed")
}