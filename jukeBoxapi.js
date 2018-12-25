class JukeBox{
	//songsName is string of array that represents the names of the songs
	constructor(songsName)
{	
	
	this.tracks = [];//empty array that represent one audio file that I will listen to stars all of the songs
	this.index = 0;//startign position
	this.addSong(songsName);//
	//this.currentTrack = this.tracks[this.index];//keeps track of the tracks we are playing, this is an object
	this.currentTrack = this.tracks[this.index];//currentTrack is empty, so we have to put songs in it
	
}
//thik of what you want not of what is happening. 
//dont focus on the techninal stuff, focus on what you want it to happen then make it happen

	 addSong(songId){

	// 	// //songId is an array of songs that user input or gives to the program to run
	//we want every song from current track
	for(var i =0; i < songId.length; i++){
		//add songs to thea array
		this.tracks.push(new Audio(songId[i]));//makes a variable instead of array
	 }


	}

	play(){//function to play
		if(this.tracks.length === 0){
			 console.log("there is no song in the the jukeBox");
			 return;
		}
		this.currentTrack.play();//plays the at the current index could be first second ..

	}
	pause(){
		
		this.currentTrack.pause();//pauses the song
	}
	next(){
		//increment each user press next
		this.index++;
		//this if statement is to check the larst song from the array
		if(this.index > this.tracks.length - 1 ){
			this.index = 0;// go back to the first array element or song
		}
		this.load();
		this.currentTrack = this.tracks[this.index];//changning current track

		//this means local or part of the class
		this.play();//plays the song

	}
	previous(){
		this.index--;//if user press previous, go back to one song
		//checks if index is greater than or equal to 0
		if(this.index < 0){//it prevents the index from being a negative number or index-- when the user press previous bottom
			this.index = 0;
		}
		this.load();//at the 
		this.currentTrack = this.tracks[this.index];
		this.play();
	}
	load(){//load method makes the song start from the beginning/it refresh 
		this.currentTrack.load();
	}
 

}


$(document).ready(function(){
	// $.ajax({
	// 	 	url: "http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4", 
	// 	 	success: function(result){
	// 	 		 // jukeBox = new JukeBox();
 //         		//result.tracks.forEach((elem)=> $('#songList').append(`<li data-song=${elem.previewURL} onClick="jukebox.clikedOn(this)">${elem.name}</li>`));
 //         		result.tracks.forEach((elem)=> $('#songList').append(`<li data-song=${elem.previewURL} onClick="jukebox.clikedOn(this)">${elem.name}</li>`));         

 //            }});
//in the express, we used to make it a page and we can put info inside of it (dynamically). 
//The information we can use it whenver we want as you 
//ask for it, access to the company databaase. This is what api is, some companies do not want their info to be public.
//we use json to get acess to the api, we are converting data to json
	var jukeBox;
	var songArray = [];
	function getJSON(url,success){
		$.ajax({//This json is a fuction that we use to make an ajax call to create other function
			type:'GET',
			url:url,
			dataType: 'json',
			success:function(response){//response is the information displayed on the url json format
				success(response);
			}
		})
	}
	$('.container').hide();
	//var author;
	//currently we are trying to submit the form. 
	$('form').on('submit',function(event){
		//user inputs the  author's name. We will put the userInput in variable called author  		
		var author = $('#userInput').val();
		console.log(author);
		event.preventDefault();//prevents page from loading when the user insert information
		//path and information of where 
		$.getJSON(`https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=
			${author}&type=artist`,function(response){
			var idOfartist = response.search.order[0];//gets the id of the artist throgh searcholder
			var path = 'https://api.napster.com/v2.2/artists/' + idOfartist + 
			'/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&';//path of the song
			console.log(idOfartist);

			$.getJSON(path,function(response2){
				
				console.log(response2.tracks);
				for(var songLoop = 0; songLoop < response2.tracks.length; songLoop++){
					songArray.push(response2.tracks[songLoop].previewURL);//pushed the url into the array called songArray
					console.log(response2.tracks[songLoop].previewURL)
				}
				console.log(response2);
				
				jukeBox = new JukeBox(songArray);


				});

		})
				var isPlaying = false;
				$('#playOrpause').on('click',function(){
					if(isPlaying){
						isPlaying = false;
						jukeBox.pause();
					}
					else{
						isPlaying = true;
						jukeBox.play();
					}
				})

				$('#next').on('click',function(){
					jukeBox.next();
				})

				$('#prev').on('click',function(){
					jukeBox.previous();
				})

		})
		
	});

		
	

	 