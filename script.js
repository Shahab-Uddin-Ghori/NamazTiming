//// digital watch
let watch = new Date()
let hours = watch.getHours()
let min = watch.getMinutes()
let sec = watch.getSeconds()

// functions
setInterval(function(){
    if (sec == 60){
        min++
        sec = 0
    }
    if (min == 60){
        hours++
        min = 0
    }
    if ( hours > 13 ){
        hours = hours - 12
    }           
    document.getElementById("sec").innerHTML = ++sec
    document.getElementById("min").innerHTML = min
    document.getElementById("hours").innerHTML = hours
},1000)
//// digital watch end




document.getElementById("check").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("output").innerHTML = "";
  let cityName = document.getElementById("cityName").value

  // List of valid city names in Pakistan
  // const validCities = [
  //   "karachi",
  //   "lahore",
  //   "islamabad",
  //   "faisalabad",
  //   "rawalpindi",
  //   "multan",
  //   "gujranwala",
  //   "peshawar",
  //   "quetta",
  //   "sargodha",
  //   "sialkot",
  //   "bahawalpur",
  //   "sukkur",
  //   "jhang",
  //   "sheikhupura",
  //   "gujrat",
  //   "mardan",
  //   "larkana",
  //   "rahim yar khan",
  //   "kasur",
  //   "rahim yar khan",
  //   "sahiwal",
  //   "okara",
  //   "wah cantonment",
  //   "dera ghazi khan",
  //   "mirpur khas",
  //   "jhelum",
  //   "sanghar",
  //   "mandi bahauddin",
  //   "hafizabad",
  //   "jacobabad",
  //   "kohat",
  //   "shikarpur",
  //   "muzaffargarh",
  //   "khanewal",
  //   "hassan abdal",
  //   "dera ismail khan",
  //   "chiniot",
  //   "sukkur",
  //   "atd",
  //   "layyah",
  //   "swabi",
  //   "khushab",
  //   "abad",
  //   "lala musa",
  //   "vehari",
  //   "hyderabad"
  // ];

  // // Check if the entered city name exists in the list of valid cities
  // if (!validCities.includes(cityName.toLowerCase())) {
  //   document.getElementById("output").innerHTML =
  //     "Please enter a valid city name of Pakistan.";
  //   return;
  // }

  let date = new Date().toISOString().slice(0, 10);
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${cityName}&country=Pakistan`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        let timings = data.data.timings;
        let prayerTimes = `
          Fajr: ${timings.Fajr}<br>
          Dhuhr: ${timings.Dhuhr}<br>
          Asr: ${timings.Asr}<br>
          Maghrib: ${timings.Maghrib}<br>
          Isha: ${timings.Isha}
        `;
        document.getElementById(
          "output"
        ).innerHTML = `Prayer timings for ${cityName} (${date}):<br>${prayerTimes}`;
      } else {
        document.getElementById(
          "output"
        ).innerHTML = `Sorry, could not find prayer timings for ${cityName} (${date})`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("output").innerHTML = `Error: ${error.message}`;
    });
});

// const URL = `https://api.collectapi.com/pray/all?data.city=karachi`;
// const getNamazTiming = async () => {
//   console.log("getting data....");
//   let response = await fetch(URL)
//   console.log(response); //JSON format
//   let data = await response.json();
//   console.log(data);
// };
