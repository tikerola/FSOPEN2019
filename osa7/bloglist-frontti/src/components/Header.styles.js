
import styled from 'styled-components'

export const NavigationContainer = styled.div`
  display: flex;
  background: #333;
  color: gray;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  width: 100%;

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

export const LogoutButton = styled.div`
  width: 80px;
  background: blue;
  border-radius: 5px;
  cursor: pointer;
  padding: 4px;
  text-align: center;
  border: 1px solid white;
  color: white;

  :hover {
    background: gray;
  }

`