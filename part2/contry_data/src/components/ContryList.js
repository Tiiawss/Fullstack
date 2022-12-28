import { useState, useEffect } from 'react'
import axios from 'axios'
import Onecontry from "./Onecontry"


const ContryList = ({ contries, filter, listContry, handleshow }) => {
    contries = contries.filter( contry => {
      if (filter === '') {
          return true
      }
      else if (contry.name.common.toLowerCase().includes(filter.toLowerCase()) ) {
          return true
      } else {
  
          return false
      }
      }) 
      if (listContry.length === undefined) {
        return (
          <>
            <Onecontry contry={listContry} />
          </>
        )
      }
      else if (contries.length ===1) {
        console.log("contrys in list")
        return (
          <div>
          <Onecontry contry={contries[0]} />
        </div>
          )
        }
        else if (contries.length <=10) {
          return (
            <div>
            {contries.map( contry => {
            return(
              <div key = {contry.name.common}>
              {contry.name.common} 
              <button onClick={() => handleshow(contry)}>show</button>
          </div>
            )}
            )}
        </div>
        )
      }
      else {
        return <p>Too many matches, specify another filter</p>
      }
  }
  export default ContryList