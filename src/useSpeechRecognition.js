import { useEffect, useState } from "react"


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'en-US'


const useSpeechRecognition = () => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    handleListen()
  
  }, [isListening])

  const handleListen = () => {
    if (!isListening){
      recognition.stop()
      recognition.onend = () => {
        recognition.stop()
        setText('')
      }
      return;
    }
    if (isListening) {
      recognition.start()
      recognition.onend = () => {
        recognition.start()
      }
    }

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setText(transcript)
      recognition.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const start = () => setIsListening(true)
  const stop = () => setIsListening(false)

  return {
    text,
    start,
    stop,
    isListening,
    hasRecgonitionSupport: !!recognition
  }
}

export default useSpeechRecognition
