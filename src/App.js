import QRCode from 'qrcode'
import { useState } from 'react'
import './App.css'

function App() {
    const [url, setUrl] = useState('')
    const [qr, setQr] = useState('')
    const [qrColor, setQrColor] = useState('#2A2A8D')
    const [qrSize, setQrSize] = useState({ width: '', height: '' })

    const GenerateQRCode = () => {
        QRCode.toDataURL(url, {
            width: qrSize.width,
            height: qrSize.height,
            margin: 2,
            color: {
                dark: qrColor,
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)

            console.log(url)
            setQr(url)
        })
    }

    return (
        <div className="app">
            <h1>QR Code Generator</h1>
            <div className="row">
            <input 
                type="text"
                placeholder="Enter text or url"
                value={url}
                onChange={e => setUrl(e.target.value)} />
                <input 
                    id="colorPicker"
                    placeholder="select color"
                    type="color"
                    value={qrColor}
                    onChange={e => setQrColor(e.target.value)} />
            </div>
            <div className="row">
                <input 
                    id="widthInput"
                    type="number"
                    value={qrSize.width}
                    placeholder="Enter width min 400"
                    onChange={e => setQrSize({ ...qrSize, width: parseInt(e.target.value) })} />
                <input 
                    id="heightInput"
                    type="number"
                    value={qrSize.height}
                    placeholder="Enter height min 400"
                    onChange={e => setQrSize({ ...qrSize, height: parseInt(e.target.value) })} />
            </div>
            <button onClick={GenerateQRCode}>Generate QR Code</button>
            {qr && <>
                <img src={qr} alt="QR Code" />
                <a href={qr} download="qrcode.png">Download</a>
            </>}
        </div>
    )
}

export default App
