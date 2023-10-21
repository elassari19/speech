import './App.css'
import useSpeechRecognition from './useSpeechRecognition'

function App() {

  const { text, isListening, start, stop, hasRecgonitionSupport} = useSpeechRecognition()

  return (
    <>
      {
        hasRecgonitionSupport
        ? (<div>
            {isListening && <p>is listening</p>}
            <button onClick={() => start()}>start</button>
            <button onClick={() => stop()}>end</button>
            <div>
              {
                text
              }
            </div>
        </div>)
        : (<h1>not support speech recognition</h1>)
      }
      
    </>
  )
}

export default App
