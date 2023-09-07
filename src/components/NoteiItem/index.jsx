import {Container} from "./styles"
import { FiPlus, FiX } from "react-icons/fi"

export function NoteItem({value, onClick, isnew = false, ...rest}){
  return(
    <Container  isnew={isnew}>
      
      <input 
      
        type="text"
        value={value}
        readOnly={!isnew}
        {...rest} 
      />

      <button
        type="button"
        onClick={onClick}
        className={isnew ? "button-add" : "button-delete"}
      >
        {isnew ? <FiPlus/> : <FiX/> }
      </button>

    </Container>
  )
}