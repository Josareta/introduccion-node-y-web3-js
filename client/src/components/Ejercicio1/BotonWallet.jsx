import { useState } from 'react'
import Web3 from 'web3'

export default function BotonWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState(null)

  const connectWallet = async () => {
    try {
        //Comprobación de que tenemos Metamask y creamos instancia
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum)

        // Comprobación de conexión
        //Opción en desuso: await window.ethereum.enable()
        await window.ethereum.request({method: 'eth_requestAccounts'})
        
        //obtenemos cuentas
        const accounts = await web3Instance.eth.getAccounts()

        //Validación de la existencia de cuentas
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } else {
        console.error('No se encontró una billetera Ethereum en este navegador.')
      }

    } catch (error) {
      console.error('Error al conectar la billetera: ', error)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    window.ethereum.disable()
  }

    return (
        <div>
      {isConnected ? (
        <div>
          {account && (
            <p>
              Dirección de la cuenta: {account.substring(0, 8)}...{account.substring(account.length - 8)}
            </p>
          )}
          <button onClick={disconnectWallet}>Desconectar Billetera</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Conectar Billetera</button>
      )}
    </div>
  )
}




