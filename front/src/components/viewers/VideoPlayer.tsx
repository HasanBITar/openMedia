import './player.css';

import { useEffect, useRef, useState } from 'react';

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import { textTracks } from './tracks';

const VideoPlayer = ({ streamUrl, thumbnail, title }) => {
  let player = useRef<MediaPlayerInstance>(null),
    [src, setSrc] = useState('');

  useEffect(() => {
    // Initialize src.
    // @ts-ignore
    setSrc({ src: streamUrl, type: 'video/mp4' })
    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      // console.log('is audio view?', '->', viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  const customFetch = (input, init = {}) => {
    // @ts-ignore
    const headers = new Headers(init.headers || {});
    // @ts-ignore
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, {
      ...init,
      headers,
    });
  };

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // 
  }

  return (
    <>
      <MediaPlayer
        className="player myvideoplayer !rounded-xl overflow-hidden"
        title={title}
        src={src}
        crossOrigin
        autoPlay={true}
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={thumbnail}
            alt="video player"
          />
        </MediaProvider>

        {/* Layouts */}
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={thumbnail}
        />
      </MediaPlayer>
    </>
  );
}


export default VideoPlayer;