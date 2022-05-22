import React from 'react';
import { textSpanOverlapsWith } from 'typescript';
import './App.css';
import TitleText from './Components/TitleText/TitleText';
import { useTwitchAuth, useTwitchContext } from './Hooks/Twitch/TwitchHooks';

function App() {
  const twitchContext = useTwitchContext();
  const twitchAuth = useTwitchAuth();
  return (
    <div className="App">
      <TitleText><img src='Twitch Icon.png' alt="badge"/> Cheeseypi</TitleText>
      {
        (twitchContext.hostingInfo && <TitleText>Hosting! Peep the other streamer!</TitleText>) || (
          (twitchContext.game && <TitleText title={twitchContext.game === "Just Chatting" ? "" : "Playing: "}>{twitchContext.game}</TitleText>)
          || <TitleText>'Till Next Time!</TitleText>
        )
      }
      <nav aria-label="links" className="links">
        <a title="About" aria-label="About" href="https://doto.gay/" target="_blank" rel="noopener noreferrer"><div className="ImageLink PersonLink"></div></a>
        <a title="Twitter" aria-label="Twitter" href="https://twitter.com/cheeseypi" target="_blank" rel="noopener noreferrer"><div className="ImageLink TwitterLink"></div></a>
        <a title="TikTok" aria-label="TikTok" href="https://tiktok.com/@cheeseypi" target="_blank" rel="noopener noreferrer"><div className="ImageLink TikTokLink"></div></a>
        <a title="Discord" aria-label="Discord" href="https://discord.gg/8sMdNGzsvu" target="_blank" rel="noopener noreferrer"><div className="ImageLink DiscordLink"></div></a>
        <a title="GitHub" aria-label="GitHub" href="https://github.com/cheeseypi" target="_blank" rel="noopener noreferrer"><div className="ImageLink GitHubLink"></div></a>
      </nav>
      {
        twitchContext.hlsLatencyBroadcaster && <TitleText title="Latency: ">{twitchContext.hlsLatencyBroadcaster}s</TitleText>
      }
    </div>
  );
}

export default App;