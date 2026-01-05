let page = "default"

export default defineContentScript({
  matches: ['*://*.bandcamp.com/*'],
  main() {
    if (document.URL.includes("/album")) {
      page = "album"
    } else if (document.URL.includes("/track")) {
      page = "track"
    }
    console.log('Hello content.\n\n\n\n')
   
    //console.log(scrapeInlinePlayer())
    
    var mainLoopId = setInterval(function(){
      console.log(scrapeCarouselPlayerInner())
    }, 1000);
  },
});

function scrapeCarouselPlayerInner() { //default
  let element = document.querySelector(".carousel-player-inner")
  
  //check if present first
  let album = element?.querySelector(".title")
  let artist = element?.querySelector(".artist")?.lastElementChild
  let track = element?.querySelector(".info-progress")?.querySelector(".title")?.firstElementChild?.lastElementChild
  
  let timeElapsed = element?.querySelector(".pos-dur")?.firstElementChild
  let timeTotal = element?.querySelector(".pos-dur")?.lastElementChild

  return {
    artist: artist?.innerHTML.trim(),
    album: album?.innerHTML.trim(),
    track: track?.innerHTML.trim(),
    time_elapsed: timeElapsed?.innerHTML,
    time_total: timeTotal?.innerHTML
  }
}

function scrapeInlinePlayer() { //album, track
  let element = document.querySelector(".inline_player")
  let track = element?.querySelector(".title")

  let nameSection = document.getElementById("name-section")
  let album = nameSection?.querySelector(".trackTitle")

  let artist
  if (page === "album") {
    artist = nameSection?.lastElementChild?.lastElementChild?.lastElementChild
  } else {
    album = nameSection?.lastElementChild?.firstElementChild?.lastElementChild?.firstElementChild
    artist = nameSection?.lastElementChild?.lastElementChild?.firstElementChild
    track = nameSection?.querySelector(".trackTitle")
  }

  let timeElapsed = element?.querySelector(".time_elapsed")
  let timeTotal = element?.querySelector(".time_total")

  return {
    artist: artist?.innerHTML.trim(),
    album: album?.innerHTML.trim(),
    track: track?.innerHTML.trim(),
    time_elapsed: timeElapsed?.innerHTML,
    time_total: timeTotal?.innerHTML
  }
}