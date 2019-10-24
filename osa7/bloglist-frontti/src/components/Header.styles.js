
import styled from 'styled-components'

export const NavigationContainer = styled.div`
  display: flex;
  background: #333;
  color: gray;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  
  width: 95%;
  margin: 0 auto;
  

  a {
    text-decoration: none;
    color: #ccc;
  }
`

export const NavigationGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const NavigationElement = styled.div`
  margin-right: 10px;

  .active {
    color: white;
  }

  
`

export const Button = styled.div`
  width: 80px;
  background: blue;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px;
  text-align: center;
  border: 1px solid white;
  color: white;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

  :hover {
    background: gray;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  }

`