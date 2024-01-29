import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Poster from "./Poster";
import Search from "./Search";
import Track from "./Track";
import axios from "axios";
import ShowRec from './ShowRec';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);


  const onSubmit = async () => {
    const result = await axios.get("http://127.0.0.1:5000/fetch")
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  // New Releases...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  const [open, setOpen] = React.useState(false);
  const handleOpenRec = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section className="ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases
            .slice(0, 4)
            .map((track) => (
              <Poster
                key={track.id}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))
          : searchResults
            .slice(0, 4)
            .map((track) => (
              <Poster
                key={track.id}
                track={track}
                chooseTrack={chooseTrack}
              />
            ))}
      </div>

      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Genres */}
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="text-white bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out" style={{ backgroundColor: "#ec5c0c", borderColor: "#ec5c0c", fontStyle: "italic", fontWeight: "bold" }} >
            All Genres
          </button>

          <button type="button" className="text-white text-[13px] py-3.5 px-4 rounded-2xl mb-2 mt-2 w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out" style={{ backgroundColor: "#ec5c0c", borderColor: "#ec5c0c", fontStyle: "italic", fontWeight: "bold" }} onClick={handleOpenRec}>
            Get recommendations!
          </button>
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            <Box>
              <ShowRec />
            </Box>
          </StyledModal>

          <button onClick={() => onSubmit()} className="text-white bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out" style={{ backgroundColor: "#ec5c0c", borderColor: "#ec5c0c", fontStyle: "italic", fontWeight: "bold" }} >
            Find Lyrics
          </button>
        </div>

        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {searchResults.length === 0
              ? newReleases
                .slice(4, newReleases.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))
              : searchResults
                .slice(4, searchResults.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
