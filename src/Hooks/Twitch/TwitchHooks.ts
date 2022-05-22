import {useState, useEffect} from 'react';

export interface TwitchContextResponse {
    arePlayerControlsVisible: boolean
    bitrate: number
    bufferSize: number
    displayResolution: string
    game: string
    hlsLatencyBroadcaster: number
    hostingInfo: object
    isFullScreen: boolean
    isMuted: boolean
    isPaused: boolean
    isTheatreMode: boolean
    language: string
    mode: string
    playbackMode: string
    theme: string
    videoResolution: string
    volume: number
}

export interface TwitchContextObject extends TwitchContextResponse{}

export interface TwitchAuthResponse {
  channelId: string;
  clientId: string;
  helixToken: string;
  token: string;
  userId: string;
}

export interface TwitchAuthObject extends TwitchAuthResponse {
  authorized: boolean;
}

interface TwitchContext extends Window{
    Twitch: {
        ext: {
            onContext: (callback: CallableFunction) => void;
            onAuthorized: (callback: CallableFunction) => void;
        }
    }
}

export const useTwitchContext = () => {
    const [twitchContext, setTwitchContext] = useState({} as TwitchContextObject)

    useEffect(() => {
        const twitchWindowContext = window as Window as TwitchContext;
        const isTwitch = twitchWindowContext.Twitch?.ext;
        if(isTwitch){
            twitchWindowContext.Twitch.ext.onContext(
                (resp: TwitchContextResponse) => {
                    setTwitchContext(resp)
                }
            )
        }
    }, [])
    
    return twitchContext;
}

export const useTwitchAuth = () => {
    const [twitchAuth, setTwitchAuth] = useState({} as TwitchAuthObject)

    useEffect(() => {
        const twitchWindowContext = window as Window as TwitchContext;
        const isTwitch = twitchWindowContext.Twitch?.ext;
        if(isTwitch){
            twitchWindowContext.Twitch.ext.onAuthorized(
                (resp: TwitchAuthResponse) => {
                    setTwitchAuth({authorized: true, ...resp})
                }
            )
        }
    }, [twitchAuth.channelId, twitchAuth.clientId, twitchAuth.token, twitchAuth.userId, twitchAuth.helixToken])
    
    return twitchAuth;
}