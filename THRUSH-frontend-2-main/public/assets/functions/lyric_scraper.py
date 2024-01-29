 
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import lyricsgenius

#Lyricsgenius and Spotipy objects with secret tokens
genius = lyricsgenius.Genius('jXq1yC5onaRC1ylei-Bl3k06LiD2S5zjq9zzdWrqltVB1T9AP6_-FjW7WtkFe90I')
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id='79397bceb4274a179eb010642f347ee2',
                                               client_secret='2a1e47f0ebea4937bb11318f0f65a8a8',
                                               redirect_uri="http://localhost:3000/api/auth/callback/spotify",
                                               scope="user-read-playback-state"))

# Function that returns the playback info of user's from Spotify
# Returns song, artist and device info
def get_playback_info():
    result = sp.current_playback()
    song = result["item"]["name"]
    artist = result["item"]["artists"][0]["name"]
    d_name = result["device"]["name"]
    d_type = result["device"]["type"]
    return song,artist,d_name,d_type

# Functions that query the lyrics
# Input: takes in the song and artist name
# Returns the lyrics stored in an array
def get_lyrics(song ,artist):
    song = genius.search_song(song,artist)
    return song.lyrics