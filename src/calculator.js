export default function Calculator(){
    const [command, setCommand] = useState(null)
    const [digit, setDigit] = useState(null)
    const [previousDigit, setPreviousDigit] = useState(digit)
    
    return(
      <div>
        <h1>!!! Calculator !!!</h1>
        <table>
        <tr><Display command={command} digit={digit}/></tr>
        <tr>
          <td><Button text={'1'} onClick={() => setDigit(1)} /></td>
          <td><Button text={'2'} onClick={() => setDigit(2)} /></td>
          <td><Button text={'3'} onClick={() => setDigit(3)} /></td>
          <td><Button text={'+'} onClick={() => {
            setCommand('+')
            setPreviousDigit(digit)
            }} /></td>
        </tr>
  
        <tr>
          <td><Button text={'4'} onClick={() => setDigit(4)} /></td>
          <td><Button text={'5'} onClick={() => setDigit(5)} /></td>
          <td><Button text={'6'} onClick={() => setDigit(6)} /></td>
          <td><Button text={'-'} onClick={() => {
            setCommand('-')
            setPreviousDigit(digit)
            }} /></td>
        </tr>
  
        <tr>
          <td><Button text={'7'} onClick={() => setDigit(7)} /></td>
          <td><Button text={'8'} onClick={() => setDigit(8)} /></td>
          <td><Button text={'9'} onClick={() => setDigit(9)} /></td>
          <td><Button text={'x'} onClick={() => {
            setCommand('x')
            setPreviousDigit(digit)
            }} /></td>
        </tr>
  
        <tr>
          <td><Button text={'0'} onClick={() => setDigit(0)} /></td>
          <td><Button text='r' onClick={() => setDigit(null)}/></td>
          <td ><Button text={'='} onClick={() => {
            if (command === '+'){
              setDigit(digit + previousDigit)
            } else if(command === '-'){
              setDigit(previousDigit - digit)
            } else if(command === '/'){
              setDigit(previousDigit / digit)
            } else if(command === 'x'){
              setDigit(previousDigit * digit)
            }
            setCommand(null);
          }} /></td>
          <td><Button text={'/'} onClick={() => {
            setCommand('/')
            setPreviousDigit(digit)
            }} /></td>
        </tr>
      </table>
      </div>    
    );
  }
  
  function Display({command,digit}){
    return (
      <tr>
        <td>{digit}</td>
        <td>{command}</td>
      </tr>
    )
  }
  
  function Button({text, onClick}){
    return (<button onClick={onClick}>{text}</button>);
  }
  