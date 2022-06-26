import React from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        {/* <img src={discover_weekly?.images[0].url} alt="" /> */}
        <img src="https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/_HxV4mGnp8WkD5VSifiSTrg8zkr1WkVrhny3jeV90vVFXZSSEBbd6Ho9gxzMKJZDUSfOSGH2KK0SE7CIzilhxgHZFekiYvZ8C2bfJ6qqsvNGrLzqOd8_onDnG2cGGB4cGszY2pbK1Z_lHRItgqjRrqoaaqL9zW3zbLCoTIchQsxUkI_cc2O0FD02LoowzZ9-OMh-ukLdGbBfquCpRbPK4km9L8-1cZEXsRadmLCSJ_dS4EkqOK9T-sXd9Hdk3CfGA8FZmrh_VjTGeJqGJsn9x1OyHKjFPdJK4EfFPUdAKKgUBiSmZTnuIQ38xt2eWyKFv8AfN9vZ8nYWwwuuRsmeiI_x6maltknh5C8docB1L15G6NMTOpwH_4ePkE4412zdGVcYESB5diLtQoI8ZkLTas2kijJitUThuFtsPirc2rQ=/ODI6NDM6MjFUMjAtMjAtMg==" alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
