var currentSong = 0; //playlist index

function audioPlayer(){
    $("#audioPlayer")[0].src = $("#playlist li a")[0]; //put 1st song into player
    $("#audioPlayer")[0].play(); // play 1st song automaticlly
    $("#playlist li a").click(function(e){ //play the song by click the song name
        e.preventDefault(); // not play the song in a new tab
        $("#audioPlayer")[0].src = this;
        $("#audioPlayer")[0].play(); //play song automaticlly (not work in macbook chrome)
        $("#playlist li").removeClass("current-song");
         currentSong = $(this).parent().index();
         $(this).parent().addClass("current-song"); //change the color of song name
    });

    $("#audioPlayer")[0].addEventListener("ended", function(){ //when the song end
        currentSong++; //move to the next song
        if(currentSong == $("#playlist li a").length) //if the song is the last in the playlist
            currentSong = 0; //go back to the first
        $("#playlist li").removeClass("current-song");
        $("#playlist li:eq("+currentSong+")").addClass("current-song");
        $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
        $("#audioPlayer")[0].play();
    });  
}

function nextSong(){
    currentSong++;
    if(currentSong == $("#playlist li a").length)
        currentSong = 0;
    $("#playlist li").removeClass("current-song");
    $("#playlist li:eq("+currentSong+")").addClass("current-song");
    $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
    $("#audioPlayer")[0].play();
}


