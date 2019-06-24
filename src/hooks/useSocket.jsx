import { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import ss from "socket.io-stream";
import OpusToPCM from "opus-to-pcm";
import { withWaveHeader, appendBuffer } from "../constants/waveHeader";

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const url =
  process.env.NODE_ENV === "production"
    ? `${window.location.hostname}:${window.location.port}`
    : `${window.location.hostname}:3002`;

const socket = socketClient(url, { autoConnect: false, forceNew: true });

let bufferSource = null;
let activeSource = null;
let isPlaying = false
let startAt = 0
let playWhileLoadingDuration = 0
let audioBuffer = null
let streamLength = 0

export default function useSocket(onStream) {
  const [msg, setMsg] = useState("");
  const [didDisconnect, setDidDisconnect] = useState(false);

  socket.on("isConnected", msg => {
    setMsg(msg);
  });
  socket.on("disconnect", () => {
    setMsg("Disconnected!");
  });
  socket.on("total-length", length => {
    console.log("total-length: ", length);
    streamLength = length;
  });

  /* socket.on("ytdl-data", data => {
    console.log("Data from ytdl-data: ", data)
  }) */

  const connect = user => {
    console.log("User is logged in, connecting to socket: ", socket);
    setMsg("Connecting...");
    socket.open();
    console.log("Emitting handshake");
    socket.emit(
      "completeHandshake",
      `User with uid ${user ? user.uid : "null"} is connected`
    );
  };

  const disconnect = user => {
    setMsg("Disconnecting...");
    console.log("Disconnecting...");
    socket.emit(
      "tryDisconnect",
      `${user ? user.uid : "null"} is trying to disconnect`
    );
    socket.disconnect();
    setDidDisconnect(true);
  };

  const playWhileLoading = (duration = 0) => {
    if(activeSource) { activeSource.stop() }
    console.log("playing while loading with duration: ", duration)
    bufferSource.connect(audioCtx.destination);
    isPlaying = true
    bufferSource.start(0, duration);
    activeSource = bufferSource;
  }

  const play = (resumeTime = 0) => {
    if(activeSource) { activeSource.stop() }
    bufferSource = audioCtx.createBufferSource();
    bufferSource.buffer = audioBuffer;
    console.log("playing with resumeTime: ", resumeTime)
    bufferSource.connect(audioCtx.destination);
    isPlaying = true
    bufferSource.start(0, resumeTime);
    activeSource = bufferSource
  };

  const whileLoadingInterval = setInterval(() => {
    if(startAt) {
      const inSec = (Date.now() - startAt) / 1000;
      if (playWhileLoadingDuration && inSec >= playWhileLoadingDuration) {
        playWhileLoading(playWhileLoadingDuration);
        playWhileLoadingDuration = bufferSource.buffer.duration
      }
    } else if(bufferSource) {
      playWhileLoadingDuration = bufferSource.buffer.duration;
      startAt = Date.now();
      playWhileLoading();
    }
  }, 500);

  const stop = () => bufferSource && bufferSource.stop(0);

  const processAudioData = (stream, streamSize) => {
    
    //TODO
    //FIX BUFFERING AND bufferSource.play bug

    let rate = 0;
     let isData = false;
     stream.on('data', async (data) => {
       const audioBufferChunk = await audioCtx.decodeAudioData(withWaveHeader(data, 2, 44100));
       const newaudioBuffer = (bufferSource && bufferSource.buffer)
         ? appendBuffer(bufferSource.buffer, audioBufferChunk, audioCtx)
         : audioBufferChunk;
       bufferSource = audioCtx.createBufferSource();
       bufferSource.buffer = newaudioBuffer;

       const loadRate = (data.length * 100 ) / streamSize;
       rate = rate + loadRate;

       console.log("loadRate: ", loadRate)
       console.log("rate: ", rate)

       if(rate >= 100) {
         clearInterval(whileLoadingInterval);
         audioBuffer = bufferSource.buffer;
         const inSec = (Date.now() - startAt) / 1000;
         play(inSec);
       }
       isData = true;
       // first time load
       /* if(isData && rate === loadRate) {
         const duration = (100 / loadRate) * audioBufferChunk.duration;
         setDuration(duration)
       } */
     });
  }

  useEffect(() => {
    let timer = false
    if (socket.connected) {
      console.log("Socket is connected");
      //audioCtx.resume();
      let serverTime = 0
      const getCombined = false
      socket.on("time-elapsed", time => serverTime = time)
      if(getCombined){
        socket.on("combined-data", async data => {
          let startTime = new Date()
          console.log("Got combined data from socket: ", data)
          let audioBuffer = await audioCtx.decodeAudioData(withWaveHeader(data.combinedData, 2, 48000));
          bufferSource = audioCtx.createBufferSource();
          bufferSource.buffer = audioBuffer;
          bufferSource.connect(audioCtx.destination);
          bufferSource.start(0);
          let endTime = new Date()
          let clientTimeDiff = endTime - startTime
          console.log(`Time elapsed processing data is ${clientTimeDiff}ms`)
          let totalTimeSpent = clientTimeDiff + serverTime
          console.log(`Total time before playing is ${totalTimeSpent}ms`)
        })
      }

      const getFromStream = true
      if(getFromStream){
        ss(socket).on("track-stream", (stream, { stat }) => {
          console.log("stream: ", stream);
          processAudioData(stream, stat.size)

/*           let writable = Writable(audioCtx.destination, {
            channels: 2,
            sampleRate: 48000,
            samplesPerFrame: 960,
            mode: Writable.BUFFER_MODE,
            autoend: true
          }); */

          //Is missing node-opus or opusscript
          /* const decoder = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 })
          stream.pipe(decoder)
          decoder.on("data", async data => {
            console.log("Data decoded through prism: ", data)
            const decodedData = await audioCtx.decodeAudioData(data)
            console.log("Prism data decoded by audioCtx: ", decodedData)
          }) */

          stream.on("data", async data => {
            if(!timer){
              timer = true
              console.time("Stream time")
            }
            /* try {
              //Checks 4 first chunks of data
              if (checked < 4) {
                console.log("streamLength: ", streamLength);
                console.log("data: ", data);
                console.log("data.buffer: ", data.buffer);
                checked++;
              }
              const bufferLength = data.length;
              dataChecked += bufferLength;
              console.log(`${bufferLength} => ${dataChecked}/${streamLength}`);

              try {
                let audioBuffer = await audioCtx.decodeAudioData(
                  withWaveHeader(data, 2, 48000)
                );

                let endTime = new Date()
                let clientTimeDiff = endTime - startTime
                console.log(`Time elapsed processing data is ${clientTimeDiff}ms`)
                let totalTimeSpent = clientTimeDiff + serverTime
                console.log(`Total time before playing is ${totalTimeSpent}ms`)

                const newAudioBuffer =
                  bufferSource && bufferSource.buffer
                    ? appendBuffer(bufferSource.buffer, audioBuffer, audioCtx)
                    : audioBuffer;
                console.log("newAudioBuffer: ", newAudioBuffer);

                bufferSource = audioCtx.createBufferSource();
                bufferSource.buffer = newAudioBuffer;

                const loadRate = (data.length * 100) / streamLength;
                rate = rate + loadRate;
                console.log("loadRate: ", loadRate);
                console.log("rate: ", rate);
                console.log(
                  "duration: ",
                  (100 / loadRate) * audioBuffer.duration
                );

                if (rate >= 100) {
                }

                console.log("audioBuffer.duration: ", audioBuffer.duration);
                console.log("bufferSource.buffer.duration: ", bufferSource.buffer.duration)
                bufferSource.connect(audioCtx.destination);
                bufferSource.start(bufferSource.buffer.duration);
              } catch (err) {
                console.error("error on audioBuffer: ", err);
              }

              //Maybe use arrayBufferToAudioBuffer?
            } catch (err) {
              console.warn(err);
            } */
          });

          /* bufferSource.connect(audioCtx.destination)
        bufferSource.start(0) */

          /* console.log("Connected to stream ", stream);
        bufferSource.pipe(Writable(audioCtx.destination))
        Readable(audioCtx).on("data", audioBuffer => {
          console.log("audioBuffer: ", audioBuffer)
        })
        ss(socket).emit("returnStream", stream) */

          //onStream(stream)
          //stream.on("data", data => {
          //console.log("Receiving data");
          //onStream(data)
          /*let writable = Writable(audioContext.destination, {
            context: audioContext,
            channels: 2,
            sampleRate: audioContext.sampleRate,
            mode: Writable.BUFFER_MODE,
            autoend: true
          }) */
          /*const audioBufferChunk = audioCtx.decodeAudioData(
            withWaveHeader(data, 2, 44100)
          );
          const newaudioBuffer =
            source && source.buffer
              ? appendBuffer(source.buffer, audioBufferChunk, audioCtx)
              : audioBufferChunk;
          source = audioCtx.createBufferSource();
          source.buffer = newaudioBuffer;

          const play = () => {
            source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;

            source.connect(audioCtx.destination);
            source.start();
          };
          play();*/
          //});
          stream.on("end", data => {
            console.log("Stream ended")
            if(timer){
              console.timeEnd("Stream time")
            }
              /* bufferSource.connect(audioCtx.destination);
              bufferSource.start(0); */
          });
        });
      }
    }
  });

  return [socket, connect, disconnect, msg, didDisconnect];
}
