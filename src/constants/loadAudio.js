import ss from 'socket.io-stream';
import { withWaveHeader, appendBuffer } from './waveHeader';

const loadAudio = (audioContext, socket) => new Promise(async (resolve, reject) => {
 try {
   let source = null;
   let playWhileLoadingDuration = 0;
   let startAt = 0;
   let audioBuffer = null;
   let activeSource = null;

   // create audio context
   const gainNode = audioContext.createGain();

   const playWhileLoading = (duration = 0) => {
     source.connect(audioContext.destination);
     source.connect(gainNode);
     source.start(0, duration);
     activeSource = source;
   };

   const play = (resumeTime = 0) => {
     // create audio source
     source = audioContext.createBufferSource();
     source.buffer = audioBuffer;

     source.connect(audioContext.destination);
     source.connect(gainNode);
     gainNode.connect(audioContext.destination);

     source.start(0, resumeTime);
   };

   const whileLoadingInterval = setInterval(() => {
     if(startAt) {
       const inSec = (Date.now() - startAt) / 1000;
       if (playWhileLoadingDuration && inSec >= playWhileLoadingDuration) {
         playWhileLoading(playWhileLoadingDuration);
         playWhileLoadingDuration = source.buffer.duration
       }
     } else if(source) {
       playWhileLoadingDuration = source.buffer.duration;
       startAt = Date.now();
       playWhileLoading();
     }
   }, 500);

   const stop = () => source && source.stop(0);

   // load file while socket
   socket.emit('track', (e) => {});
   ss(socket).on('track-stream', (stream, { stat }) => {
     let rate = 0;
     stream.on('data', async (data) => {
       const audioBufferChunk = await audioContext.decodeAudioData(withWaveHeader(data, 2, 44100));
       const newaudioBuffer = (source && source.buffer)
         ? appendBuffer(source.buffer, audioBufferChunk, audioContext)
         : audioBufferChunk;
       source = audioContext.createBufferSource();
       source.buffer = newaudioBuffer;

       const loadRate = (data.length * 100 ) / stat.size;
       rate = rate + loadRate;

       if(rate >= 100) {
         clearInterval(whileLoadingInterval);
         audioBuffer = source.buffer;
         const inSec = (Date.now() - startAt) / 1000;
         activeSource.stop();
         play(inSec);
         resolve({ play, stop });
       }
     });
   });
 } catch (e) {
   reject(e)
 }
});

export default loadAudio